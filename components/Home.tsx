import React, { useState } from 'react';
import { User, ContentItem } from '../types';
import { Button } from './Button';
import { CheckCircle2, Circle, Flame, Heart, MessageSquare, ChevronRight, PlayCircle, BookOpen } from 'lucide-react';
import { geminiService } from '../services/geminiService';

interface HomeProps {
  user: User;
  onNavigate: (tab: any) => void;
}

export const Home: React.FC<HomeProps> = ({ user, onNavigate }) => {
  const [bambooText, setBambooText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const handleBambooSubmit = async () => {
    if(!bambooText) return;
    const cheer = await geminiService.getQuickCheerUp(bambooText);
    setToastMessage(cheer);
    setBambooText('');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const RECOMENDED_CONTENTS = [
    { id: 101, title: '대화가 안 통하는 남편 다루기', type: 'video', duration: '10:00', imgColor: 'bg-rose-100' },
    { id: 102, title: '자존감 높이는 셀프 코칭', type: 'column', readTime: '5min', imgColor: 'bg-emerald-100' },
    { id: 103, title: '부부싸움 후 화해의 기술', type: 'workbook', duration: '3일 코스', imgColor: 'bg-blue-100' },
  ];

  return (
    <div className="p-5 space-y-8 pb-32">
      {/* Header Summary */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="relative z-10 flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <span className="bg-white/20 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase text-indigo-50">Level 3</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">{user.profile.nickname}님</h1>
            <p className="text-indigo-100 text-sm mt-1 font-medium">
              오늘도 나를 위한 시간을 가져보세요.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 flex flex-col items-center min-w-[70px]">
             <Flame className="text-orange-300 fill-orange-300 drop-shadow-sm mb-1" size={20} />
             <span className="text-xl font-bold">{user.streakDays}일</span>
             <span className="text-[10px] text-indigo-200">연속</span>
          </div>
        </div>
        
        <div className="relative z-10 flex gap-3">
          <div className="flex-1 bg-black/20 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center border border-white/5">
            <span className="text-xs text-indigo-200 mb-1">완료 미션</span>
            <span className="font-bold text-lg">{user.missionsCompleted}</span>
          </div>
          <div className="flex-1 bg-black/20 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center border border-white/5">
             <span className="text-xs text-indigo-200 mb-1">읽은 콘텐츠</span>
             <span className="font-bold text-lg">{user.contentsViewed}</span>
          </div>
        </div>
      </div>

      {/* Emotion Check-in */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Heart className="text-rose-500 fill-rose-500" size={18} />
            오늘의 기분
          </h2>
          <span className="text-xs text-slate-400">매일 기록해보세요</span>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 flex justify-between items-center">
           {['😡', '😢', '😐', '🙂', '🥰'].map((emoji, idx) => (
             <button 
               key={idx} 
               onClick={() => setSelectedMood(idx)}
               className={`relative group transition-all duration-300 ${selectedMood === idx ? 'scale-125 -translate-y-1' : 'hover:scale-110'}`}
             >
               <span className="text-4xl filter drop-shadow-sm">{emoji}</span>
               {selectedMood === idx && (
                 <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-indigo-600 whitespace-nowrap animate-in fade-in slide-in-from-bottom-1">
                   {['화남', '슬픔', '그저그럼', '좋음', '행복함'][idx]}
                 </span>
               )}
             </button>
           ))}
        </div>
      </section>

      {/* Daily Missions */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
           <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
             <CheckCircle2 className="text-emerald-600" size={18} />
             오늘의 미션
           </h2>
           <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold">1/3 달성</span>
        </div>
        <div className="space-y-3">
          {[
            { id: 1, text: '배우자에게 "고마워" 라고 말하기', done: true, tag: '표현' },
            { id: 2, text: '오늘 있었던 일 1가지 공유하기', done: false, tag: '대화' },
            { id: 3, text: '자기 전 5분 스마트폰 내려놓기', done: false, tag: '습관' },
          ].map((mission) => (
            <button key={mission.id} className="w-full text-left group">
              <div className={`relative overflow-hidden p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                mission.done 
                  ? 'bg-emerald-50/50 border-emerald-100' 
                  : 'bg-white border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5'
              }`}>
                 <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                   mission.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 text-transparent'
                 }`}>
                   <CheckCircle2 size={14} className="fill-current" strokeWidth={3} />
                 </div>
                 <div className="flex-1">
                   <div className="flex items-center gap-2 mb-0.5">
                     <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${mission.done ? 'bg-emerald-200 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                       {mission.tag}
                     </span>
                   </div>
                   <span className={`text-sm font-medium transition-colors ${mission.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                     {mission.text}
                   </span>
                 </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Bamboo Forest */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <MessageSquare className="text-indigo-600" size={18} />
            속마음 대나무숲
          </h2>
        </div>
        <div className="relative group">
          <div className="absolute inset-0 bg-indigo-500 rounded-3xl blur opacity-10 group-hover:opacity-15 transition-opacity"></div>
          <div className="relative bg-white p-1 rounded-3xl border border-indigo-50 shadow-sm">
            <textarea 
              className="w-full resize-none h-28 p-4 text-sm outline-none placeholder:text-slate-400 bg-transparent rounded-2xl"
              placeholder="임금님 귀는 당나귀 귀! 답답한 마음을 여기에 털어놓으세요. AI 코치가 위로해드릴게요."
              value={bambooText}
              onChange={(e) => setBambooText(e.target.value)}
            />
            <div className="flex justify-between items-center px-2 pb-2 mt-1">
               <span className="text-[10px] text-slate-400 ml-2">익명은 100% 보장됩니다.</span>
               <Button size="sm" onClick={handleBambooSubmit} disabled={!bambooText} className="rounded-xl px-4">털어놓기</Button>
            </div>
          </div>
        </div>
        
        {/* Toast */}
        {toastMessage && (
           <div className="fixed bottom-24 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
             <div className="bg-slate-800/90 backdrop-blur-md text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
               <span className="text-xl">💌</span>
               <p className="text-sm font-medium leading-relaxed">{toastMessage}</p>
             </div>
           </div>
        )}
      </section>

      {/* Recommended Content */}
      <section>
         <div className="flex items-center justify-between mb-4 px-1">
           <h2 className="text-lg font-bold text-slate-800">
             {user.profile.nickname}님을 위한 추천
           </h2>
           <button onClick={() => onNavigate('content')} className="text-xs text-slate-400 hover:text-indigo-600 font-medium">전체보기</button>
         </div>
         <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5 snap-x">
            {RECOMENDED_CONTENTS.map(content => (
              <button 
                key={content.id} 
                onClick={() => onNavigate('content')}
                className="flex-shrink-0 w-40 snap-start group text-left"
              >
                <div className={`h-40 rounded-2xl ${content.imgColor} mb-3 relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                     {content.type === 'video' ? <PlayCircle size={32} className="text-slate-900/50" /> : <BookOpen size={32} className="text-slate-900/50" />}
                  </div>
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-700">
                    {content.type === 'video' ? 'VIDEO' : content.type === 'workbook' ? 'COURSE' : 'READ'}
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 text-sm leading-tight mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {content.title}
                </h3>
                <span className="text-xs text-slate-400">
                  {content.duration || content.readTime}
                </span>
              </button>
            ))}
         </div>
      </section>
    </div>
  );
};