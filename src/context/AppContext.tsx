import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

export interface Recording {
  id: string;
  name: string;
  transcript: string;
  duration: number;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isShortcut?: boolean;
}

interface AppState {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  recordings: Recording[];
  addRecording: (rec: Recording) => void;
  
  // Assistant
  isAssistantOpen: boolean;
  setAssistantOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  
  // Active Recording
  isRecordingWidgetOpen: boolean;
  setIsRecordingWidgetOpen: (open: boolean) => void;
  isRecording: boolean;
  recordingTranscript: string;
  startRecording: () => void;
  stopRecording: (name?: string) => void;
  pauseRecording: () => void;
  isRecordingPaused: boolean;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [recordings, setRecordings] = useState<Recording[]>([
    { id: '1', name: 'recorder_1787555197999.amr', transcript: '你好，我们是小微贷业务员...', duration: 120, date: '2026-08-24 10:00:00' },
    { id: '2', name: 'recorder_1787555219078.amr', transcript: '这个贷款利率是多少？', duration: 45, date: '2026-08-24 11:30:00' }
  ]);
  
  const [isAssistantOpen, setAssistantOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 'initial', role: 'assistant', content: '您好，我是您的智能业务助手，请问有什么可以帮您？' }
  ]);

  const [isRecordingWidgetOpen, setIsRecordingWidgetOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingPaused, setIsRecordingPaused] = useState(false);
  const [recordingTranscript, setRecordingTranscript] = useState('');
  
  const simulationInterval = useRef<any>(null);

  const addRecording = (rec: Recording) => {
    setRecordings(prev => [rec, ...prev]);
  };

  const addChatMessage = (msg: ChatMessage) => {
    setChatMessages(prev => [...prev, msg]);
  };

  const startRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setIsRecordingPaused(false);
      setRecordingTranscript('');
    } else if (isRecordingPaused) {
      setIsRecordingPaused(false);
    }
  };

  const pauseRecording = () => {
    setIsRecordingPaused(true);
  };

  const stopRecording = (name?: string) => {
    setIsRecording(false);
    setIsRecordingPaused(false);
    setIsRecordingWidgetOpen(false);
    if (recordingTranscript.trim()) {
      addRecording({
        id: Date.now().toString(),
        name: name || `recorder_${Date.now()}.amr`,
        transcript: recordingTranscript,
        duration: Math.floor(Math.random() * 300) + 30, // Mock duration
        date: new Date().toLocaleString()
      });
    }
    setRecordingTranscript('');
  };

  // Simulate transcription updates when recording
  useEffect(() => {
    if (isRecording && !isRecordingPaused) {
      const mockPhrases = [
        "客户您好，感谢您咨询我们的小微贷业务。",
        "请问您需要办理多少额度的贷款呢？",
        "我想要申请大概50万左右。",
        "好的，您的经营主体叫什么名字？",
        "我是阿刁个人工作室的。",
        "好的，我们现在进行一下营销登记。",
        "手机号是18166668666，对吗？",
        "对的。"
      ];
      let phraseIndex = 0;
      
      simulationInterval.current = setInterval(() => {
        if (phraseIndex < mockPhrases.length) {
          setRecordingTranscript(prev => (prev ? prev + '\n' + mockPhrases[phraseIndex] : mockPhrases[phraseIndex]));
          phraseIndex++;
        }
      }, 3000);
    } else {
      if (simulationInterval.current) {
        clearInterval(simulationInterval.current);
      }
    }

    return () => {
      if (simulationInterval.current) {
        clearInterval(simulationInterval.current);
      }
    };
  }, [isRecording, isRecordingPaused]);

  return (
    <AppContext.Provider value={{
      currentPage, setCurrentPage,
      recordings, addRecording,
      isAssistantOpen, setAssistantOpen,
      chatMessages, addChatMessage,
      isRecordingWidgetOpen, setIsRecordingWidgetOpen,
      isRecording, recordingTranscript, isRecordingPaused,
      startRecording, stopRecording, pauseRecording
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
