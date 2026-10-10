import { Search, PlusCircle, Navigation, FileSearch } from 'lucide-react';
import PageHeader from '../components/PageHeader';

interface MarketingLogProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export default function MarketingLog({ onBack, onNavigate }: MarketingLogProps) {
  return (
    <div className="flex flex-col w-full h-full bg-[#f5f6f8]">
      <PageHeader 
        title="营销日志" 
        onBack={onBack} 
        rightContent={
          <>
            <div className="flex items-center cursor-pointer hover:bg-blue-600/50 px-2 py-1 rounded" onClick={() => onNavigate('marketingForm')}>
              <PlusCircle size={16} className="mr-1" />
              <span className="text-sm">新增</span>
            </div>
            <div className="flex items-center cursor-pointer ml-4 hover:bg-blue-600/50 px-2 py-1 rounded">
              <Navigation size={16} className="mr-1" />
              <span className="text-sm">地址转换</span>
            </div>
          </>
        }
      />
      
      <div className="bg-white flex items-center justify-between px-6 py-3 shrink-0 shadow-sm z-10">
         <div className="flex items-center text-gray-700">
           <Search size={18} className="mr-2 text-gray-500" />
           <span className="font-medium">选择搜索条件</span>
         </div>
         <div className="text-gray-400">
           &gt;
         </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center mt-[-60px]">
         <div className="w-40 h-40 flex items-center justify-center relative mb-4">
           {/* Custom abstract icon to match the empty state */}
           <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="30" y="20" width="60" height="70" rx="4" fill="#e2e8f0"/>
              <rect x="40" y="30" width="50" height="70" rx="4" fill="#cbd5e1"/>
              <rect x="45" y="55" width="25" height="6" rx="3" fill="#ffffff"/>
              <rect x="45" y="70" width="15" height="6" rx="3" fill="#ffffff"/>
              
              <ellipse cx="60" cy="100" rx="40" ry="10" fill="#f1f5f9"/>
              
              <path d="M25 85 Q 20 70 25 60 Q 30 70 25 85 Z" fill="#cbd5e1"/>
              <path d="M95 90 Q 90 75 95 65 Q 100 75 95 90 Z" fill="#cbd5e1"/>
           </svg>
         </div>
         <span className="text-gray-500">未搜索到任何结果</span>
      </div>
    </div>
  );
}
