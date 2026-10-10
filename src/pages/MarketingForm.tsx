import { useState } from 'react';
import { Camera, MapPin, Plus, ChevronDown, Calendar as CalendarIcon, Clock, Wand2, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useAppContext, Recording } from '../context/AppContext';

interface MarketingFormProps {
  onBack: () => void;
}

export default function MarketingForm({ onBack }: MarketingFormProps) {
  const { isRecording, isRecordingPaused, recordingTranscript, recordings } = useAppContext();
  const [isExtracting, setIsExtracting] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectedRecordingId, setSelectedRecordingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessName: '',
    businessDate: '',
    idCard: '',
    address: '',
    landline: '',
    otherContact: '',
    result: '',
    content: '',
  });

  const handleSmartFill = () => {
    setIsExtracting(true);
    setShowSelectModal(false);
    // 模拟智能提取过程，直接填充演示数据
    setTimeout(() => {
      setFormData({
        name: '张三',
        phone: '18166668666',
        businessName: '阿刁个人工作室',
        businessDate: '2020-03-03',
        idCard: '110101199607289700',
        address: '杭州市西湖区',
        landline: '0380-5152316',
        otherContact: '17788886666',
        result: '1',
        content: '客户有贷款意向，预计申请50万额度，已初步沟通客户资质，经营状况良好，名下工作室正常运转。建议后续跟进收集详细财务流水并进行现场尽调。',
      });
      setIsExtracting(false);
    }, 600);
  };

  const onSmartFillClick = () => {
    if (isRecording || isRecordingPaused) {
      handleSmartFill();
    } else {
      setShowSelectModal(true);
    }
  };

  const InputGroup = ({ label, required, value, placeholder, icon, type = 'text', width = 'w-full', onChange }: any) => (
    <div className={`flex items-center border border-gray-200 rounded-full px-4 py-2 bg-white ${width} focus-within:border-blue-500 transition-colors`}>
      <span className="text-gray-600 whitespace-nowrap min-w-[70px]">
        {required && <span className="text-red-500 mr-1">*</span>}
        {label}
      </span>
      <span className="text-gray-300 mx-3">|</span>
      {icon && <span className="text-gray-400 mr-2">{icon}</span>}
      <input 
         type={type} 
         className="flex-1 outline-none text-gray-800 bg-transparent text-sm w-full" 
         value={value} 
         onChange={(e) => onChange && onChange(e.target.value)}
         placeholder={placeholder} 
      />
      {type === 'dropdown' && <ChevronDown size={16} className="text-gray-400 ml-2" />}
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full bg-[#f5f6f8] relative">
      <PageHeader 
        title="营销登记" 
        onBack={onBack}
        rightContent={
          <div 
             className="flex items-center bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full cursor-pointer hover:bg-yellow-500 transition-colors text-sm font-medium shadow-sm"
             onClick={onSmartFillClick}
          >
             {isExtracting ? <div className="w-4 h-4 border-2 border-yellow-900 border-t-transparent rounded-full animate-spin mr-1"></div> : <Wand2 size={16} className="mr-1" />}
             智能填写
          </div>
        }
      />
      
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="bg-white m-4 rounded-lg shadow-sm p-6 max-w-7xl mx-auto">
          
          {/* Section 1 */}
          <div className="flex justify-between items-center mb-4">
             <div className="flex items-center">
               <div className="w-1 h-5 bg-blue-500 mr-2 rounded-sm"></div>
               <span className="text-lg font-bold text-blue-600">基本信息</span>
             </div>
             <div className="flex space-x-6 text-blue-500 text-sm">
                <div className="flex items-center cursor-pointer hover:opacity-80"><span className="mr-1">OCR识别营业执照</span> <Camera size={18} /></div>
                <div className="flex items-center cursor-pointer hover:opacity-80"><span className="mr-1">OCR识别身份证</span> <Camera size={18} /></div>
             </div>
          </div>

          <div className="text-sm text-blue-600 mb-6 bg-blue-50/50 p-2.5 rounded text-center">
             蓝色边框信息已经填全，且当前营销时间为截止时间，往前推半年，单一营销客户界面“营销成果”处有两次为“①有效回访”客户，该客户为白名单客户
          </div>

          <div className="grid grid-cols-12 gap-x-6 gap-y-4 mb-8">
            <div className="col-span-4"><InputGroup label="客户名称" required value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} /></div>
            <div className="col-span-4"><InputGroup label="手机号" required value={formData.phone} onChange={(v: string) => setFormData({...formData, phone: v})} /></div>
            <div className="col-span-4"><InputGroup label="经营主体名称" value={formData.businessName} onChange={(v: string) => setFormData({...formData, businessName: v})} /></div>
            
            <div className="col-span-4"><InputGroup label="客户来源" required value="1" type="dropdown" /></div>
            <div className="col-span-4"><InputGroup label="经营主体成立时间" value={formData.businessDate} onChange={(v: string) => setFormData({...formData, businessDate: v})} icon={<CalendarIcon size={14}/>} /></div>
            <div className="col-span-4"><InputGroup label="所属行业" placeholder="请选择" type="dropdown" /></div>
            
            <div className="col-span-12">
               <div className="w-full flex items-center border border-gray-200 rounded-full px-4 py-2 bg-white">
                  <span className="text-gray-600 whitespace-nowrap min-w-[70px]">经营地点</span>
                  <span className="text-gray-300 mx-3">|</span>
                  <div className="w-[30%] flex items-center">
                     <input type="text" className="flex-1 outline-none text-gray-800 bg-transparent text-sm min-w-0" placeholder="请选择" readOnly />
                     <ChevronDown size={16} className="text-gray-400 mx-2" />
                  </div>
                  <span className="text-gray-300 mx-4 shrink-0">请选择省市区</span>
                  <span className="text-gray-300 mx-4">/</span>
                  <div className="flex-1 flex items-center">
                     <input type="text" className="flex-1 outline-none text-gray-800 bg-transparent text-sm w-full" placeholder="地址补充 (选填)" readOnly />
                     <MapPin size={16} className="text-blue-500 ml-2" />
                  </div>
               </div>
            </div>

            <div className="col-span-4"><InputGroup label="身份证号" value={formData.idCard} onChange={(v: string) => setFormData({...formData, idCard: v})} /></div>
            <div className="col-span-4"><InputGroup label="登记地址" value={formData.address} onChange={(v: string) => setFormData({...formData, address: v})} /></div>
            <div className="col-span-4"><InputGroup label="固定电话" value={formData.landline} onChange={(v: string) => setFormData({...formData, landline: v})} /></div>
            
            <div className="col-span-4"><InputGroup label="登记时间" value="2026-08-24 15:08:19" icon={<Clock size={14}/>} /></div>
            <div className="col-span-4"><InputGroup label="其他联系方式" value={formData.otherContact} onChange={(v: string) => setFormData({...formData, otherContact: v})} /></div>
            <div className="col-span-4"></div>
          </div>

          {/* Section 2 */}
          <div className="flex items-center mb-6">
            <div className="w-1 h-5 bg-blue-500 mr-2 rounded-sm"></div>
            <span className="text-lg font-bold text-blue-600">营销信息</span>
          </div>

          <div className="grid grid-cols-12 gap-x-6 gap-y-4">
            <div className="col-span-3"><InputGroup label="营销成果" value={formData.result} onChange={(v: string) => setFormData({...formData, result: v})} placeholder="请选择营销成果" /></div>
            <div className="col-span-3"><InputGroup label="营销方式" value="1" type="dropdown" /></div>
            <div className="col-span-3"><InputGroup label="下次回访时间" value="2026-09-24" icon={<CalendarIcon size={14}/>} /></div>
            <div className="col-span-3"><InputGroup label="个性化特征" value="" placeholder=" " /></div>
            
            <div className="col-span-3 flex flex-col">
              <InputGroup label="营销名单类型" value="2" type="dropdown" />
              <a href="#" className="text-blue-500 text-xs mt-2 underline ml-2">如何区分黑白灰名单？</a>
            </div>
            <div className="col-span-3"><InputGroup label="标签" value="" placeholder=" " /></div>
            <div className="col-span-3"><InputGroup label="营销登记人" value="admin" type="dropdown" /></div>
            <div className="col-span-3"><InputGroup label="营销跟进人" value="admin" /></div>
          </div>

          <div className="mt-6 border border-gray-200 rounded-lg p-4 relative flex flex-col">
             <div className="flex text-sm mb-2 h-full">
                <span className="text-gray-600 mr-4 font-medium shrink-0">内容登记</span>
                <textarea 
                   className="w-full text-gray-800 outline-none resize-none bg-transparent min-h-[80px]"
                   value={formData.content}
                   onChange={e => setFormData({...formData, content: e.target.value})}
                />
             </div>
             <div className="absolute bottom-2 right-2 text-gray-400">.</div>
          </div>

          {/* Recording Select Modal */}
          {showSelectModal && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
              <div className="bg-white rounded-xl w-[400px] flex flex-col shadow-2xl overflow-hidden">
                 <div className="h-14 bg-gradient-to-r from-[#0f2468] to-[#0c3bb2] text-white flex items-center justify-between px-6 shrink-0">
                    <span className="font-medium text-lg">选择历史录音</span>
                    <button onClick={() => { setShowSelectModal(false); setSelectedRecordingId(null); }} className="p-1 hover:bg-white/10 rounded">
                      <X size={20} />
                    </button>
                 </div>
                 <div className="p-4 max-h-[50vh] overflow-y-auto space-y-2">
                    {recordings.map(rec => (
                       <div 
                          key={rec.id} 
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedRecordingId === rec.id ? 'bg-blue-50 border-blue-500' : 'border-gray-200 hover:bg-gray-50'}`}
                          onClick={() => setSelectedRecordingId(rec.id)}
                       >
                          <div className={`font-medium ${selectedRecordingId === rec.id ? 'text-blue-600' : 'text-gray-800'}`}>{rec.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{rec.date}</div>
                       </div>
                    ))}
                    {recordings.length === 0 && (
                       <div className="text-center text-gray-400 py-6">暂无历史录音</div>
                    )}
                 </div>
                 <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                    <button onClick={() => { setShowSelectModal(false); setSelectedRecordingId(null); }} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                       取消
                    </button>
                    <button 
                       onClick={() => {
                         if (selectedRecordingId) {
                           handleSmartFill();
                           setSelectedRecordingId(null);
                         }
                       }} 
                       disabled={!selectedRecordingId}
                       className={`px-4 py-2 rounded-lg transition-colors ${selectedRecordingId ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-300 text-white cursor-not-allowed'}`}
                    >
                       确认
                    </button>
                 </div>
              </div>
            </div>
          )}

          <div className="mt-6">
             <div className="w-28 h-28 border border-dashed border-gray-300 rounded bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                <Plus size={32} className="text-gray-300 mb-1" />
                <span className="text-sm text-gray-400">新增图像</span>
             </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex items-center justify-center space-x-6 px-4 z-20">
         <button className="px-16 py-2.5 rounded-full border border-blue-500 text-blue-500 bg-white hover:bg-blue-50 font-medium text-lg">保存</button>
         <button className="px-16 py-2.5 rounded-full bg-blue-500 text-white hover:bg-blue-600 font-medium shadow-md shadow-blue-200 text-lg">立即申请</button>
      </div>
      
    </div>
  );
}
