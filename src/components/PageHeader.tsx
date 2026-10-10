import { ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  onBack: () => void;
  rightContent?: React.ReactNode;
}

export default function PageHeader({ title, onBack, rightContent }: PageHeaderProps) {
  return (
    <div className="h-14 bg-gradient-to-r from-[#0f2468] to-[#0c3bb2] text-white flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center cursor-pointer p-1" onClick={onBack}>
        <ChevronLeft size={24} />
      </div>
      <div className="text-lg font-medium">{title}</div>
      <div className="flex items-center space-x-4">
        {rightContent || <div className="w-6" />}
      </div>
    </div>
  );
}
