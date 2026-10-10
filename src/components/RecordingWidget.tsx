import { useState } from 'react';
import { Mic, Pause, Square, Play, FileText, X, ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function RecordingWidget() {
  const { isRecordingWidgetOpen, isRecording, isRecordingPaused, startRecording, pauseRecording, stopRecording, recordingTranscript } = useAppContext();
  const [showDetails, setShowDetails] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [recordingName, setRecordingName] = useState('');

  if (!isRecordingWidgetOpen) return null;

  const handleStopClick = () => {
    setRecordingName(`recorder_${Date.now()}.amr`);
    setShowRenameModal(true);
  };

  const handleConfirmStop = () => {
    setShowRenameModal(false);
    stopRecording(recordingName);
  };

  if (isMinimized) {
    return (
      <div className="fixed right-6 bottom-24 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-2 z-40 flex items-center space-x-3 animate-in fade-in zoom-in duration-300">
        {!isRecording ? (
          <>
            <div className="flex items-center cursor-pointer px-2" onClick={() => setIsMinimized(false)}>
              <span className="text-sm font-medium text-gray-600">准备录音</span>
            </div>
            <button onClick={startRecording} className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-sm">
              <Mic size={16} />
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center cursor-pointer px-2" onClick={() => setIsMinimized(false)}>
              {isRecordingPaused ? (
                <><span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span><span className="text-sm font-medium text-yellow-600">已暂停</span></>
              ) : (
                <><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></span><span className="text-sm font-medium text-red-500">录音中</span></>
              )}
            </div>
            {isRecordingPaused ? (
              <button onClick={startRecording} className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" title="继续">
                <Play size={16} className="ml-0.5" />
              </button>
            ) : (
              <button onClick={pauseRecording} className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors" title="暂停">
                <Pause size={16} />
              </button>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="fixed right-6 bottom-24 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-4 z-40 w-72 flex flex-col items-center animate-in slide-in-from-right-8 duration-300">
        <button onClick={() => setIsMinimized(true)} className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors" title="收起面板">
           <ChevronDown size={16} />
        </button>
        {!isRecording ? (
          <>
            <div className="flex items-center text-gray-500 font-medium text-sm mb-4">
              <span>准备录音</span>
            </div>
            <div className="flex items-center justify-center w-full">
               <button onClick={startRecording} className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-md">
                 <Mic size={24} />
               </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2 text-red-500 font-medium text-sm mb-4">
               {isRecordingPaused ? (
                 <>
                   <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                   <span className="text-yellow-600">已暂停</span>
                 </>
               ) : (
                 <>
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                   <span>正在录音中...</span>
                 </>
               )}
            </div>
            
            <div className="flex items-center justify-center space-x-4 w-full">
               {isRecordingPaused ? (
                  <button onClick={startRecording} className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" title="继续">
                    <Play size={20} className="ml-1" />
                  </button>
               ) : (
                  <button onClick={pauseRecording} className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors" title="暂停">
                    <Pause size={20} />
                  </button>
               )}
               
               <button onClick={handleStopClick} className="w-12 h-12 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors" title="停止">
                 <Square size={18} />
               </button>
               
               <button onClick={() => setShowDetails(true)} className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" title="查看详情">
                 <FileText size={20} />
               </button>
            </div>
          </>
        )}
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[500px] max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
             <div className="h-14 bg-gradient-to-r from-[#0f2468] to-[#0c3bb2] text-white flex items-center justify-between px-6 shrink-0">
                <span className="font-medium text-lg">实时转写详情</span>
                <button onClick={() => setShowDetails(false)} className="p-1 hover:bg-white/10 rounded">
                  <X size={20} />
                </button>
             </div>
             <div className="flex-1 overflow-y-auto p-6 bg-[#f8fafc]">
                {recordingTranscript ? (
                   <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-sm">
                      {recordingTranscript}
                   </div>
                ) : (
                   <div className="text-gray-400 text-center py-10 flex flex-col items-center">
                     <Mic size={32} className="mb-2 opacity-50" />
                     <span>等待语音输入...</span>
                   </div>
                )}
             </div>
             <div className="p-4 bg-white border-t border-gray-100 flex justify-end">
                <button onClick={() => setShowDetails(false)} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                   关闭
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Rename Modal */}
      {showRenameModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[400px] flex flex-col shadow-2xl overflow-hidden">
             <div className="h-14 bg-gradient-to-r from-[#0f2468] to-[#0c3bb2] text-white flex items-center justify-between px-6 shrink-0">
                <span className="font-medium text-lg">保存录音</span>
                <button onClick={() => setShowRenameModal(false)} className="p-1 hover:bg-white/10 rounded">
                  <X size={20} />
                </button>
             </div>
             <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">录音名称</label>
                <input 
                   type="text" 
                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                   value={recordingName}
                   onChange={(e) => setRecordingName(e.target.value)}
                   autoFocus
                />
             </div>
             <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                <button onClick={() => setShowRenameModal(false)} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                   取消
                </button>
                <button onClick={handleConfirmStop} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                   确认保存
                </button>
             </div>
          </div>
        </div>
      )}
    </>
  );
}
