import React, { useState } from 'react';
import { DiagnosisItem } from '../types';
import { Lock, ChevronRight, Activity, BrainCircuit } from 'lucide-react';

interface DiagnosisProps {
  isSubscribed: boolean;
  userCoins: number;
  onUnlock: (cost: number, title: string) => void;
}

type TabType = 'diagnosis' | 'training';

export const Diagnosis: React.FC<DiagnosisProps> = ({ isSubscribed, userCoins, onUnlock }) => {
  const [activeTab, setActiveTab] = useState<TabType>('diagnosis');

  const DIAGNOSIS_LIST: DiagnosisItem[] = [
    { id: 'd1', title: '부부관계 종합 진단', description: '5가지 핵심 영역 분석', isCompleted: false, isLocked: false, coinPrice: 0 },
    { id: 'd2', title: '갈등 패턴 정밀 분석', description: '반복되는 싸움의 원인 찾기', isCompleted: false, isLocked: !isSubscribed, coinPrice: 20 },
    { id: 'd3', title: '성인 애착 유형 검사', description: '나의 애착 유형이 관계에 미치는 영향', isCompleted: false, isLocked: !isSubscribed, coinPrice: 20 },
    { id: 'd4', title: '감정 조절 능력 평가', description: '나의 감정 그릇 크기는?', isCompleted: false, isLocked: !isSubscribed, coinPrice: 20 },
  ];

  const TRAINING_LIST = [
    { id: 't1', title: '7일 감정 관리 루틴', duration: '7 Days', isLocked: !isSubscribed, price: 30, color: 'bg-emerald-100 text-emerald-600' },
    { id: 't2', title: '14일 부부 소통 마스터', duration: '2 Weeks', isLocked: !isSubscribed, price: 50, color: 'bg-indigo-100 text-indigo-600' },
    { id: 't3', title: '3일 갈등 디톡스', duration: '3 Days', isLocked: !isSubscribed, price: 20, color: 'bg-rose-100 text-rose-600' },
    { id: 't4', title: '30분 관계 회복 응급처치', duration: '30 Mins', isLocked: false, price: 0, color: 'bg-amber-100 text-amber-600' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white px-5 pt-6 pb-2 sticky top-0 z-20">
         <h1 className="text-2xl font-bold text-slate-900 mb-4">진단 & 트레이닝</h1>
         <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('diagnosis')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
              activeTab === 'diagnosis' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            진단
          </button>
          <button
            onClick={() => setActiveTab('training')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
              activeTab === 'training' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            트레이닝
          </button>
        </div>
      </div>

      <div className="p-5 space-y-6 pb-32">
        {activeTab === 'diagnosis' ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="text-sm text-slate-500 font-medium px-1">
              정확한 진단이 해결의 첫걸음입니다.
            </div>
            {DIAGNOSIS_LIST.map(item => (
              <div key={item.id} className="bg-white rounded-3xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden group hover:border-indigo-100 transition-colors">
                {item.isLocked && (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center gap-3">
                    <div className="bg-white p-3 rounded-full shadow-lg">
                       <Lock className="text-slate-400" size={20} />
                    </div>
                    <button 
                      onClick={() => onUnlock(item.coinPrice || 0, item.title)}
                      className="bg-indigo-600 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-lg hover:bg-indigo-700 transition-colors active:scale-95"
                    >
                      {item.coinPrice} 코인으로 열기
                    </button>
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${item.isLocked ? 'bg-slate-50 text-slate-400' : 'bg-indigo-50 text-indigo-600'}`}>
                    <Activity size={24} strokeWidth={2.5} />
                  </div>
                  {!item.isLocked && (
                     <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${item.isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                       {item.isCompleted ? 'COMPLETED' : 'READY'}
                     </span>
                  )}
                </div>
                
                <h3 className="font-bold text-lg text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">{item.description}</p>
                
                {!item.isLocked && (
                  <button className="w-full py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-[0.98]">
                    {item.isCompleted ? '결과 리포트 보기' : '검사 시작하기'}
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="text-sm text-slate-500 font-medium px-1">
              매일 조금씩, 관계 근육을 키우세요.
            </div>
            {TRAINING_LIST.map(item => (
              <button key={item.id} className="w-full text-left">
                <div className="bg-white rounded-3xl p-4 shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center gap-5 relative overflow-hidden group hover:-translate-y-0.5 transition-transform">
                    {item.isLocked && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                        <div 
                        onClick={(e) => { e.stopPropagation(); onUnlock(item.price, item.title); }}
                        className="bg-slate-900/90 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl cursor-pointer hover:bg-black transition-colors"
                        >
                        {item.price} 코인으로 잠금해제
                        </div>
                    </div>
                    )}
                    
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.isLocked ? 'bg-slate-100 text-slate-300' : item.color}`}>
                    <BrainCircuit size={28} strokeWidth={2} />
                    </div>
                    
                    <div className="flex-1 min-w-0 py-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 truncate text-base">{item.title}</h3>
                        {item.isLocked && <Lock size={12} className="text-slate-400 flex-shrink-0" />}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                        {item.duration}
                        </span>
                    </div>
                    </div>
                    
                    <div className="bg-slate-50 p-2 rounded-full text-slate-300 group-hover:text-indigo-500 group-hover:bg-indigo-50 transition-colors">
                    <ChevronRight size={20} />
                    </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};