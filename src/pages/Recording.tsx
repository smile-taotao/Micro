import { useState } from 'react';
import { Mic, Video, Music, Play, X, FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useAppContext, Recording as IRecording } from '../context/AppContext';

interface RecordingProps {
  onBack: () => void;
}

export default function Recording({ onBack }: RecordingProps) {
  const { recordings, setIsRecordingWidgetOpen } = useAppContext();
  const [selectedTranscript, setSelectedTranscript] = useState<IRecording | null>(null);

  return (
    <div className="flex flex-col w-full h-full bg-[#f5f6f8] relative">
      <PageHeader title="录音录像" onBack={onBack} />
      
      <div className="bg-white flex flex-col items-center py-16 shrink-0 border-b border-gray-100">
        <div className="flex space-x-24">
          <div 
             className="flex flex-col items-center cursor-pointer group"
             onClick={() => setIsRecordingWidgetOpen(true)}
          >
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#776bd3] to-[#5a4cb1] flex items-center justify-center shadow-md mb-4 group-hover:scale-105 transition-transform">
              <Mic size={40} className="text-white transform -rotate-12" />
            </div>
            <span className="text-gray-700 font-medium">录音</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer group">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#f878a8] to-[#f45671] flex items-center justify-center shadow-md mb-4 group-hover:scale-105 transition-transform">
              <Video size={40} className="text-white" />
            </div>
            <span className="text-gray-700 font-medium">录像</span>
          </div>
        </div>
      </div>

      <div className="flex-1 mt-4 bg-white flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 font-medium text-gray-800">
          录制文件
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-5xl mx-auto w-full pb-24">
          {recordings.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-[#fcfcfd] p-4 rounded-xl border border-gray-100/60 shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6b5cd8] to-[#5143b9] rounded-lg flex items-center justify-center mr-4">
                   <Music size={24} className="text-white" />
                </div>
                <div className="flex flex-col">
                   <span className="text-gray-700 font-medium">{item.name}</span>
                   <span className="text-gray-400 text-xs mt-1">{item.date}</span>
                </div>
              </div>
              <div className="flex space-x-3 items-center">
                <button 
                   className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors"
                   onClick={() => setSelectedTranscript(item)}
                   title="详情"
                >
                  <FileText size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#6a73e5] text-white flex items-center justify-center hover:bg-[#5a62d0] shadow-sm">
                  <Play size={18} className="ml-1" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#fc5464] text-white flex items-center justify-center hover:bg-[#e44654] shadow-sm">
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
          {recordings.length === 0 && (
             <div className="text-center text-gray-400 py-10">暂无录制文件</div>
          )}
        </div>
      </div>

      {/* Transcript Details Modal */}
      {selectedTranscript && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[500px] max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
             <div className="h-14 bg-gradient-to-r from-[#0f2468] to-[#0c3bb2] text-white flex items-center justify-between px-6 shrink-0">
                <span className="font-medium text-lg">录音文本详情</span>
                <button onClick={() => setSelectedTranscript(null)} className="p-1 hover:bg-white/10 rounded">
                  <X size={20} />
                </button>
             </div>
             <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col">
                <span className="font-medium text-gray-800">{selectedTranscript.name}</span>
                <span className="text-gray-500 text-xs mt-1">{selectedTranscript.date}</span>
             </div>
             <div className="flex-1 overflow-y-auto p-6 bg-white">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-sm">
                   {selectedTranscript.transcript || '（暂无文本内容）'}
                </div>
             </div>
             <div className="p-4 bg-white border-t border-gray-100 flex justify-end">
                <button onClick={() => setSelectedTranscript(null)} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                   关闭
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
