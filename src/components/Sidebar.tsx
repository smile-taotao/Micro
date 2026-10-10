import { User, Grid, Briefcase, BarChart2, FilePlus, ClipboardCheck, FileText, Calendar, QrCode } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: User, label: '名称' },
    { icon: Grid, label: '工作台', active: true },
    { icon: Briefcase, label: '营销管理' },
    { icon: BarChart2, label: '客户管理' },
    { icon: FilePlus, label: '快速申请' },
    { icon: ClipboardCheck, label: '尽职调查' },
    { icon: FileText, label: '合同管理' },
    { icon: Calendar, label: '贷后日志' },
  ];

  return (
    <div className="w-[80px] bg-[#14234b] text-white flex flex-col items-center py-4 h-full shrink-0">
      <div className="flex-1 flex flex-col items-center space-y-4 w-full mt-2">
        {menuItems.map((item, idx) => (
          <div key={idx} className={`flex flex-col items-center w-full py-3 cursor-pointer ${item.active ? 'bg-[#29427e]' : 'hover:bg-[#1f3362]'}`}>
            <div className={`p-2 rounded-full ${item.active ? 'bg-blue-500' : 'bg-transparent'}`}>
              <item.icon size={20} className={item.active ? 'text-white' : 'text-[#8598c8]'} />
            </div>
            <span className={`text-xs mt-1 ${item.active ? 'text-white' : 'text-[#8598c8]'}`}>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mt-auto cursor-pointer hover:bg-[#1f3362] w-full py-3">
        <div className="p-2 rounded-md bg-blue-500">
           <QrCode size={20} className="text-white" />
        </div>
        <span className="text-xs mt-1 text-[#8598c8]">二维码</span>
      </div>
    </div>
  );
}
