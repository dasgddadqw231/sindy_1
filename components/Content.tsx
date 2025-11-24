import React, { useState } from 'react';
import { ContentItem } from '../types';
import { Lock, PlayCircle, BookOpen, FileText } from 'lucide-react';

interface ContentProps {
  isSubscribed: boolean;
  onUnlock: (cost: number, title: string) => void;
}

export const Content: React.FC<ContentProps> = ({ isSubscribed, onUnlock }) => {
  const [filter, setFilter] = useState('all');

  const CONTENTS: ContentItem[] = [
    { id: 'c1', title: '화내지 않고 내 마음 말하는 3단계 공식', category: 'column', imageUrl: '', isLocked: false, coinPrice: 0 },
    { id: 'c2', title: '부부싸움 골든타임 30분', category: 'video', duration: '5:20', imageUrl: '', isLocked: false, coinPrice: 0 },
    { id: 'c3', title: '권태기 극복을 위한 30일 워크북', category: 'workbook', imageUrl: '', isLocked: !isSubscribed, coinPrice: 50 },
    { id: 'c4', title: '배우자의 외도, 그 후의 심리학', category: 'column', imageUrl: '', isLocked: !isSubscribed, coinPrice: 10 },
    { id: 'c5', title: '섹스리스 탈출 가이드 (심화)', category: 'workbook', imageUrl: '', isLocked: !isSubscribed, coinPrice: 40 },
    { id: 'c6', title: '시댁 스트레스 현명하게 대처하기', category: 'column', imageUrl: '', isLocked: false, coinPrice: 0 },
  ];

  const filtered = filter === 'all' ? CONTENTS : CONTENTS.filter(c => c.category === filter);

  const getIcon = (cat: string) => {
    if (cat === 'video') return <PlayCircle size={14} className="fill-current" />;
    if (cat === 'workbook') return <BookOpen size={14} className="fill-current" />;
    return <FileText size={14} className="fill-current" />;
  };

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
        case 'column': return '칼럼';
        case 'video': return '영상';
        case 'workbook': return '워크북';
        default: return '';
    }
  }

  const getCategoryColor = (cat: string) => {
    switch(cat) {
        case 'column': return 'text-emerald-600 bg-emerald-50';
        case 'video': return 'text-rose-600 bg-rose-50';
        case 'workbook': return 'text-indigo-600 bg-indigo-50';
        default: return 'text-slate-600 bg-slate-50';
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
       <div className="bg-white px-5 pt-6 pb-4 sticky top-0 z-20 border-b border-slate-50">
         <h1 className="text-2xl font-bold text-slate-900 mb-4">콘텐츠 라이브러리</h1>
         <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['all', 'column', 'video', 'workbook'].map(cat => (
            <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                filter === cat 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                }`}
            >
                {cat === 'all' ? '전체' : cat === 'column' ? '칼럼' : cat === 'video' ? '영상' : '워크북'}
            </button>
            ))}
        </div>
      </div>

      <div className="p-5 pb-32 grid grid-cols-1 gap-5">
        {filtered.map(item => (
          <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 group relative transition-transform hover:-translate-y-1">
            {item.isLocked && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center gap-3">
                <div className="bg-white/10 p-4 rounded-full backdrop-blur-md">
                   <Lock className="text-white" size={24} />
                </div>
                <button 
                  onClick={() => onUnlock(item.coinPrice || 0, item.title)}
                  className="bg-amber-400 text-amber-950 text-xs font-bold px-5 py-2.5 rounded-full hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/20"
                >
                  {item.coinPrice} 코인으로 잠금해제
                </button>
              </div>
            )}
            
            {/* Thumbnail */}
            <div className={`h-40 w-full ${item.isLocked ? 'bg-slate-200' : 'bg-gradient-to-br from-indigo-50 to-white'} flex items-center justify-center relative`}>
               <span className="text-5xl opacity-80 filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-500">
                 {item.category === 'video' ? '🎬' : item.category === 'workbook' ? '📔' : '📝'}
               </span>
               {!item.isLocked && item.category === 'video' && (
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <PlayCircle size={10} /> {item.duration}
                  </div>
               )}
            </div>
            
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                 <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${getCategoryColor(item.category)}`}>
                    {getIcon(item.category)}
                    {getCategoryLabel(item.category)}
                 </span>
                 {item.isLocked && (
                   <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                     PREMIUM
                   </span>
                 )}
              </div>
              
              <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2">
                {item.title}
              </h3>
              
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span>#관계회복</span>
                <span>#심리코칭</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};