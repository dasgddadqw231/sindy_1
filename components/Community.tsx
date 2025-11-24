import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { MessageCircle, ThumbsUp, PenLine, Trophy, ArrowRight } from 'lucide-react';

const BALANCE_DATA = [
  { name: '용서 가능', value: 65 },
  { name: '절대 불가', value: 35 },
];

const POSTS = [
  { id: 1, title: '남편이 주말마다 시댁 가자는데...', content: '진짜 너무 스트레스 받아요. 어떻게 말해야 할까요? 주말에는 좀 쉬고 싶은데 막무가내네요.', comments: 12, likes: 34, tag: '고부갈등', time: '10분 전' },
  { id: 2, title: '육아 참여 안 하는 아내', content: '제가 퇴근하고도 집안일 다 하는데, 아내는 아이랑 놀아주지도 않고 핸드폰만 봐요.', comments: 8, likes: 21, tag: '육아', time: '1시간 전' },
  { id: 3, title: '대화가 통하지 않을 때 팁', content: '저는 일단 문자로 먼저 정리해서 보내요. 말로 하면 감정이 격해지니까요.', comments: 25, likes: 89, tag: '꿀팁', time: '3시간 전' },
];

export const Community: React.FC = () => {
  const [hasVoted, setHasVoted] = useState(false);

  return (
    <div className="pb-32 bg-slate-50 min-h-full">
      <div className="px-5 py-6 space-y-8">
        {/* Header */}
        <div>
           <h1 className="text-2xl font-bold text-slate-900">커뮤니티</h1>
           <p className="text-slate-500 text-sm">나와 같은 고민을 가진 사람들과 이야기해요.</p>
        </div>

        {/* Weekly Balance Game */}
        <section className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded-full">
              THIS WEEK
            </span>
            <span className="text-xs text-slate-400">1,243명 참여 중</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-6 leading-snug">
            배우자가 몰래 <span className="text-rose-500 bg-rose-50 px-1 rounded">전애인 SNS</span><br/> 염탐하다 걸렸다.
          </h3>
          
          {!hasVoted ? (
            <div className="flex gap-3">
              <button 
                onClick={() => setHasVoted(true)}
                className="flex-1 py-4 rounded-2xl bg-slate-50 text-slate-700 font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm border border-slate-200 hover:border-indigo-600 hover:shadow-indigo-200"
              >
                용서 가능
              </button>
              <button 
                onClick={() => setHasVoted(true)}
                className="flex-1 py-4 rounded-2xl bg-slate-50 text-slate-700 font-bold hover:bg-rose-500 hover:text-white transition-all shadow-sm border border-slate-200 hover:border-rose-500 hover:shadow-rose-200"
              >
                절대 불가
              </button>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              <div className="h-16 w-full mb-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={BALANCE_DATA} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barSize={32}>
                    <XAxis type="number" hide />
                    <YAxis type="category" hide />
                    <Bar dataKey="value" radius={[8, 8, 8, 8]} background={{ fill: '#f1f5f9', radius: 8 }}>
                      {BALANCE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#4f46e5' : '#e11d48'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between text-xs font-bold px-1">
                <span className="text-indigo-600">용서 가능 65%</span>
                <span className="text-rose-600">절대 불가 35%</span>
              </div>
            </div>
          )}
        </section>

        {/* Best Solution Talk */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-amber-500 fill-amber-500" size={18} />
            <h3 className="font-bold text-slate-900">Best 해결톡</h3>
          </div>
          <button className="w-full text-left bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 p-5 rounded-3xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-amber-100 rounded-full blur-2xl -mr-8 -mt-8 opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/60 backdrop-blur text-amber-700 text-[10px] px-2 py-0.5 rounded-md font-bold border border-amber-200">
                  HOT TOPIC
                </span>
              </div>
              <h4 className="text-slate-900 font-bold mb-1 group-hover:text-amber-800 transition-colors">
                섹스리스, 이렇게 대화로 풀었어요
              </h4>
              <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed opacity-80">
                처음에는 자존심 상해서 말도 못 꺼냈는데, AI 코치가 알려준 대로 '나는 당신과 더 가까워지고 싶어'라고 시작했더니...
              </p>
            </div>
          </button>
        </section>

        {/* Post List */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">고민 나누기</h3>
            <div className="flex gap-3 text-xs font-medium">
              <button className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">최신순</button>
              <button className="text-slate-400 hover:text-slate-600 px-2 py-1">인기순</button>
            </div>
          </div>

          <div className="space-y-4">
            {POSTS.map(post => (
              <button key={post.id} className="w-full text-left bg-white p-5 rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgb(0,0,0,0.02)] hover:shadow-md transition-all active:scale-[0.99]">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                    {post.tag}
                  </span>
                  <span className="text-[10px] text-slate-400">{post.time}</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2 leading-snug">{post.title}</h4>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium border-t border-slate-50 pt-3">
                  <span className="flex items-center gap-1.5 hover:text-slate-600">
                    <MessageCircle size={16} /> {post.comments}
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-slate-600">
                    <ThumbsUp size={16} /> {post.likes}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* FAB */}
      <div className="fixed bottom-24 right-5 z-20">
        <button className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-[0_8px_30px_rgba(79,70,229,0.3)] flex items-center justify-center hover:bg-indigo-700 hover:scale-110 transition-all active:scale-95">
          <PenLine size={24} />
        </button>
      </div>
    </div>
  );
};