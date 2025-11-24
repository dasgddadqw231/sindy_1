import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Button } from './Button';
import { ChevronRight, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    nickname: '',
    issues: [],
    goals: [],
  });

  const handleNext = () => setStep(p => p + 1);
  
  const toggleSelection = (field: 'issues' | 'goals', value: string) => {
    setFormData(prev => {
      const list = prev[field] || [];
      if (list.includes(value)) {
        return { ...prev, [field]: list.filter(i => i !== value) };
      }
      if (list.length >= 3) return prev; // Limit to 3
      return { ...prev, [field]: [...list, value] };
    });
  };

  const finish = () => {
    if (formData.nickname) {
      onComplete(formData as UserProfile);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <div className="mb-6 flex justify-between items-center text-xs font-semibold text-indigo-200">
          <span>STEP {step}/5</span>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
              <div key={i} className={`h-1.5 w-6 rounded-full ${i <= step ? 'bg-indigo-600' : 'bg-slate-100'}`} />
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right fade-in">
            <h2 className="text-2xl font-bold text-slate-900">반가워요!<br/>어떻게 불러드릴까요?</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">닉네임</label>
              <input 
                type="text" 
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="예: 행복한엄마, 긍정파워"
                value={formData.nickname}
                onChange={e => setFormData({...formData, nickname: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">나이</label>
              <input 
                type="number" 
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="만 나이 입력"
                onChange={e => setFormData({...formData, age: parseInt(e.target.value)})}
              />
            </div>
            <Button fullWidth onClick={handleNext} disabled={!formData.nickname}>다음</Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right fade-in">
            <h2 className="text-2xl font-bold text-slate-900">결혼 생활에 대해<br/>알려주세요.</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">결혼 연차</label>
              <input 
                type="number" 
                className="w-full p-4 border border-slate-200 rounded-xl outline-none"
                placeholder="예: 5"
                onChange={e => setFormData({...formData, marriageYears: parseInt(e.target.value)})}
              />
            </div>
            <div className="flex gap-4">
               <button 
                onClick={() => setFormData({...formData, hasChildren: true})}
                className={`flex-1 p-4 rounded-xl border-2 font-medium ${formData.hasChildren === true ? 'border-indigo-600 text-indigo-600 bg-indigo-50' : 'border-slate-100 text-slate-500'}`}
               >
                 자녀 있음
               </button>
               <button 
                onClick={() => setFormData({...formData, hasChildren: false})}
                className={`flex-1 p-4 rounded-xl border-2 font-medium ${formData.hasChildren === false ? 'border-indigo-600 text-indigo-600 bg-indigo-50' : 'border-slate-100 text-slate-500'}`}
               >
                 자녀 없음
               </button>
            </div>
            <Button fullWidth onClick={handleNext}>다음</Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right fade-in">
             <h2 className="text-2xl font-bold text-slate-900">지금 관계는<br/>어떠신가요?</h2>
             <div className="space-y-3">
               {['매우 좋음', '보통', '약간의 거리감', '잦은 다툼', '위기 상태'].map(status => (
                 <button
                   key={status}
                   onClick={() => setFormData({...formData, relationshipStatus: status})}
                   className={`w-full text-left p-4 rounded-xl border transition-all ${formData.relationshipStatus === status ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-100 hover:bg-slate-50'}`}
                 >
                   <span className="font-medium text-slate-800">{status}</span>
                 </button>
               ))}
             </div>
             <Button fullWidth onClick={handleNext} disabled={!formData.relationshipStatus}>다음</Button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in slide-in-from-right fade-in">
             <h2 className="text-2xl font-bold text-slate-900">가장 큰 고민을<br/>3가지 골라주세요.</h2>
             <div className="grid grid-cols-2 gap-3">
               {['소통 단절', '잦은 싸움', '육아 갈등', '경제 문제', '성적 불만', '배우자 무관심', '고부/장서 갈등', '성격 차이'].map(issue => (
                 <button
                   key={issue}
                   onClick={() => toggleSelection('issues', issue)}
                   className={`p-3 rounded-xl border text-sm font-medium transition-all ${formData.issues?.includes(issue) ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-200 text-slate-600'}`}
                 >
                   {issue}
                 </button>
               ))}
             </div>
             <Button fullWidth onClick={handleNext} disabled={(formData.issues?.length || 0) === 0}>다음</Button>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-in slide-in-from-right fade-in">
             <h2 className="text-2xl font-bold text-slate-900">어떤 변화를<br/>원하시나요?</h2>
             <div className="space-y-3">
               {['내 감정 돌보기', '싸움 줄이기', '대화 늘리기', '배우자 이해하기', '이혼 고민 해결'].map(goal => (
                 <button
                   key={goal}
                   onClick={() => toggleSelection('goals', goal)}
                   className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${formData.goals?.includes(goal) ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'}`}
                 >
                   <span className="font-medium text-slate-800">{goal}</span>
                   {formData.goals?.includes(goal) && <Check size={18} className="text-indigo-600" />}
                 </button>
               ))}
             </div>
             <Button fullWidth onClick={finish} disabled={(formData.goals?.length || 0) === 0}>
               신디 시작하기
             </Button>
          </div>
        )}
      </div>
    </div>
  );
};