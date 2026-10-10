import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Mic, FileText, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Assistant() {
  const { 
    isAssistantOpen, setAssistantOpen, 
    chatMessages, addChatMessage, 
    setCurrentPage, 
    isRecordingWidgetOpen, setIsRecordingWidgetOpen,
    isRecording, isRecordingPaused, recordingTranscript
  } = useAppContext();
  
  const [inputText, setInputText] = useState('');
  const [isVoiceInput, setIsVoiceInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({
      x: window.innerWidth - 384 - 24,
      y: window.innerHeight / 2 - (window.innerHeight * 0.65) / 2
    });
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialPos.current = { ...position };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      x: initialPos.current.x + (e.clientX - dragStartPos.current.x),
      y: initialPos.current.y + (e.clientY - dragStartPos.current.y)
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    addChatMessage({ id: Date.now().toString(), role: 'user', content: inputText });
    
    // Check intent
    if (inputText.includes('营销登记') || inputText.includes('营销日志')) {
      setTimeout(() => {
        addChatMessage({
          id: Date.now().toString(),
          role: 'assistant',
          content: '好的，你可以打开营销日志功能，点击新增后，进行相关的营销活动记录。',
          isShortcut: true
        });
      }, 500);
    } else {
      setTimeout(() => {
        addChatMessage({
          id: Date.now().toString(),
          role: 'assistant',
          content: '已收到您的反馈，正在为您处理...'
        });
      }, 500);
    }
    
    setInputText('');
  };

  const handleShortcutClick = (path: string) => {
    if (path === 'marketingLog') setCurrentPage('marketingLog');
    if (path === 'marketingForm') setCurrentPage('marketingForm');
  };

  return (
    <>
      {/* Floating Icon */}
      {!isAssistantOpen && (
        <div 
          className="fixed right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-blue-500 rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors z-40"
          onClick={() => setAssistantOpen(true)}
        >
          <MessageSquare className="text-white" size={24} />
        </div>
      )}

      {/* Chat Panel */}
      <div 
        className={`fixed w-96 h-[65vh] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl flex flex-col z-50 origin-center ${isAssistantOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} ${isDragging ? '' : 'transition-all duration-300'}`}
        style={{ left: position.x, top: position.y }}
      >
        <div 
          className="h-14 bg-gradient-to-r from-[#0f2468] to-[#0c3bb2] rounded-t-2xl text-white flex items-center justify-between px-4 shrink-0 cursor-move"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="flex items-center pointer-events-none">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <MessageSquare size={18} />
            </div>
            <span className="font-medium">智能助手</span>
          </div>
          <button onPointerDown={(e) => e.stopPropagation()} onClick={() => setAssistantOpen(false)} className="p-1 hover:bg-white/10 rounded cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-[#f5f6f8] flex flex-col space-y-4">
          {chatMessages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-tr-sm' : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100'}`}>
                <div className="whitespace-pre-wrap">{msg.content}</div>
                
                {/* Shortcut Render */}
                {msg.isShortcut && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center space-x-1 flex-wrap text-xs">
                     <span className="text-gray-500 mb-1">功能导航:</span>
                     <div className="flex items-center text-blue-500 mb-1 bg-blue-50 px-2 py-1 rounded cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => handleShortcutClick('marketingLog')}>
                        营销日志
                     </div>
                     <ChevronRight size={14} className="text-gray-400 mb-1" />
                     <div className="flex items-center text-blue-500 mb-1 bg-blue-50 px-2 py-1 rounded cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => handleShortcutClick('marketingForm')}>
                        新增
                     </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 bg-white border-t border-gray-100 shrink-0">
          {/* Quick Actions */}
          <div className="flex space-x-2 mb-3">
             <button 
                onClick={() => setIsRecordingWidgetOpen(true)}
                disabled={isRecordingWidgetOpen}
                className={`flex items-center text-xs px-3 py-1.5 rounded-full ${isRecordingWidgetOpen ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'}`}
             >
                <Mic size={14} className="mr-1" /> 发起录音
             </button>
          </div>
          
          <div className="flex items-end border border-gray-200 rounded-xl bg-gray-50 p-2 focus-within:border-blue-400 focus-within:bg-white transition-colors">
            {isVoiceInput ? (
               <div className="flex-1 flex items-center justify-center py-2 text-blue-500 font-medium animate-pulse cursor-pointer" onClick={() => setIsVoiceInput(false)}>
                  <Mic className="mr-2" size={20} /> 正在聆听... 点击结束
               </div>
            ) : (
              <textarea 
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="请输入您的问题..."
                className="flex-1 max-h-24 bg-transparent outline-none resize-none text-sm py-1 px-2"
                rows={1}
              />
            )}
            
            <div className="flex space-x-2 ml-2 pb-1 shrink-0">
              {!isVoiceInput && !inputText.trim() && (
                 <button onClick={() => setIsVoiceInput(true)} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                    <Mic size={20} />
                 </button>
              )}
              {(!isVoiceInput && inputText.trim()) && (
                 <button onClick={handleSend} className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded-full transition-colors shadow-sm">
                    <Send size={18} />
                 </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
