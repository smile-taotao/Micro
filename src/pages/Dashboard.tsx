import { Search, Bell, RotateCw, ChevronLeft, ChevronRight, MessageSquare, Mic, FileText, Calculator, MoreHorizontal, Inbox } from 'lucide-react';
import Sidebar from '../components/Sidebar';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex-1 flex bg-[#f5f6f8] overflow-hidden">
        {/* Left column */}
        <div className="w-[320px] bg-white m-4 rounded-lg shadow-sm flex flex-col shrink-0">
          <div className="p-4 flex justify-between items-center border-b border-gray-100">
            <span className="font-bold text-gray-800 text-lg">待办关注</span>
            <span className="text-blue-500 text-sm cursor-pointer flex items-center">收起 <ChevronLeft size={16} /></span>
          </div>
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="关键字搜索" className="w-full bg-gray-100 rounded-sm py-2 pl-9 pr-4 text-sm focus:outline-none" />
            </div>
            <div className="flex space-x-3">
              <div className="flex-1 bg-gradient-to-br from-[#4a8df3] to-[#296be4] rounded-sm p-3 text-white shadow-sm relative overflow-hidden h-24">
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="text-xs opacity-90 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5"></span>审批待办</div>
                  <div className="text-2xl font-bold mt-1">0 <span className="text-xs font-normal opacity-80">条</span></div>
                </div>
                <Inbox className="absolute right-2 bottom-2 text-white/20" size={40} />
              </div>
              <div className="flex-1 bg-gradient-to-br from-[#f86561] to-[#e44641] rounded-sm p-3 text-white shadow-sm relative overflow-hidden h-24">
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="text-xs opacity-90 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5"></span>营销待办</div>
                  <div className="text-2xl font-bold mt-1">0 <span className="text-xs font-normal opacity-80">条</span></div>
                </div>
                <Inbox className="absolute right-2 bottom-2 text-white/20" size={40} />
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex-1 flex flex-col m-4 ml-0 overflow-hidden">
          {/* Top bar */}
          <div className="h-14 bg-white rounded-lg shadow-sm flex items-center justify-end px-4 mb-4 shrink-0 space-x-6">
            <div className="relative cursor-pointer">
              <Bell className="text-red-500" size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center text-blue-500 cursor-pointer">
              <RotateCw size={16} className="mr-1" />
              <span>刷新</span>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="全局搜索" className="w-full border border-gray-200 rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none" />
            </div>
            <div className="flex items-center bg-gray-100 rounded-full p-1 cursor-pointer">
               <div className="bg-red-500 text-white rounded-full px-4 py-1 text-xs">A面</div>
            </div>
          </div>

          {/* Banner */}
          <div className="bg-[#1b2b52] rounded-t-lg h-64 relative overflow-hidden shrink-0 flex items-center justify-center">
             {/* Abstract background representation */}
             <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center"></div>
             
             {/* Honeycomb overlay */}
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'173.2\' viewBox=\'0 0 100 173.2\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50 0L100 28.86V86.6L50 115.47L0 86.6V28.86L50 0ZM50 173.2L100 144.33V86.6L50 57.73L0 86.6V144.33L50 173.2Z\' fill=\'none\' stroke=\'%23ffffff\' stroke-width=\'2\'/%3E%3C/svg%3E")', backgroundSize: '120px 207px', backgroundPosition: 'center' }}></div>
             
             {/* Main Title Badge */}
             <div className="relative z-10 ml-auto mr-16 bg-blue-500/20 backdrop-blur-sm border border-blue-300/50 p-8 rounded-xl shadow-2xl flex flex-col items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', width: '280px', height: '240px' }}>
               <div className="text-3xl font-bold tracking-widest text-white drop-shadow-lg mb-2">智慧</div>
               <div className="text-3xl font-bold tracking-widest text-white drop-shadow-lg mb-6">小微平台</div>
               <div className="px-6 py-2 bg-gradient-to-r from-blue-400/80 to-blue-600/80 rounded border border-blue-300 text-white font-bold text-2xl tracking-widest shadow-lg transform -skew-x-12">
                  <div className="transform skew-x-12">上线了!</div>
               </div>
             </div>
             
             <div className="absolute bottom-4 flex space-x-2">
               <div className="w-2 h-2 rounded-full bg-white"></div>
               <div className="w-2 h-2 rounded-full bg-red-500"></div>
             </div>
          </div>

          {/* Announcement */}
          <div className="bg-white px-4 py-3 flex items-center border-b border-gray-100 shrink-0">
             <div className="flex items-center text-blue-400 mr-4">
                <MessageSquare size={20} className="mr-2" />
                <span className="font-medium">系统公告</span>
             </div>
             <span className="text-gray-500 text-sm border-l border-gray-200 pl-4">暂无系统公告</span>
          </div>

          {/* Grid menu */}
          <div className="bg-white rounded-b-lg flex-1 p-6 relative">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 cursor-pointer p-2"><ChevronLeft size={32} /></div>
             <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 cursor-pointer p-2"><ChevronRight size={32} /></div>
             
             <div className="flex justify-center items-center h-full space-x-6 w-full max-w-4xl mx-auto px-16">
               <div className="flex flex-col items-center cursor-pointer flex-1">
                  <div className="w-20 h-24 border border-gray-100 rounded-xl flex items-center justify-center mb-3 hover:shadow-md transition-shadow bg-white shadow-sm">
                     <FileText size={32} className="text-blue-500" />
                  </div>
                  <span className="text-gray-700 text-sm">申请管理</span>
               </div>
               <div className="flex flex-col items-center cursor-pointer flex-1">
                  <div className="w-20 h-24 border border-gray-100 rounded-xl flex items-center justify-center mb-3 hover:shadow-md transition-shadow bg-white shadow-sm">
                     <Calculator size={32} className="text-blue-500" />
                  </div>
                  <span className="text-gray-700 text-sm">计算器</span>
               </div>
               <div className="flex flex-col items-center cursor-pointer flex-1" onClick={() => onNavigate('recording')}>
                  <div className="w-20 h-24 border border-gray-100 rounded-xl flex items-center justify-center mb-3 hover:shadow-md transition-shadow bg-white shadow-sm">
                     <Mic size={32} className="text-blue-500" />
                  </div>
                  <span className="text-gray-700 text-sm">录音录像</span>
               </div>
               <div className="flex flex-col items-center cursor-pointer flex-1" onClick={() => onNavigate('marketingLog')}>
                  <div className="w-20 h-24 border border-gray-100 rounded-xl flex items-center justify-center mb-3 hover:shadow-md transition-shadow bg-white shadow-sm">
                     <FileText size={32} className="text-blue-500" />
                  </div>
                  <span className="text-gray-700 text-sm">营销日志</span>
               </div>
               <div className="flex flex-col items-center cursor-pointer flex-1">
                  <div className="w-20 h-24 border border-gray-100 rounded-xl flex items-center justify-center mb-3 hover:shadow-md transition-shadow bg-white shadow-sm">
                     <MoreHorizontal size={32} className="text-blue-500" />
                  </div>
                  <span className="text-gray-700 text-sm">更多</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
