import React, { useState, useEffect, useRef } from 'react';
import { CoachType, ChatMessage, UserProfile } from '../types';
import { geminiService } from '../services/geminiService';
import { Button } from './Button';
import { Send, Lock, Sparkles, MessageCircle } from 'lucide-react';

interface AICoachProps {
  userProfile: UserProfile;
  isSubscribed: boolean;
  unlockedCoaches: CoachType[];
}

const COACHES = [
  { type: CoachType.GRANNY, desc: '속 시원한 욕쟁이', icon: '👵', color: 'bg-orange-100 text-orange-700' },
  { type: CoachType.HEALER, desc: '숲속의 힐러', icon: '🌿', color: 'bg-green-100 text-green-700' },
  { type: CoachType.ENERGY, desc: '파워 응원단장', icon: '🔥', color: 'bg-red-100 text-red-700' },
  { type: CoachType.SHERLOCK, desc: '냉철한 분석가', icon: '🕵️‍♂️', color: 'bg-slate-100 text-slate-700' },
  { type: CoachType.TALKER, desc: '대화의 기술', icon: '🗣️', color: 'bg-blue-100 text-blue-700' },
];

export const AICoach: React.FC<AICoachProps> = ({ userProfile, isSubscribed, unlockedCoaches }) => {
  const [selectedCoach, setSelectedCoach] = useState<CoachType>(CoachType.GRANNY);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isCoachLocked = (type: CoachType) => {
    if (isSubscribed) return false;
    // Granny, Energy, Talker are free. Healer, Sherlock are paid/sub only in MVP logic
    if (type === CoachType.HEALER || type === CoachType.SHERLOCK) return true;
    return false;
  };

  useEffect(() => {
    // Initial Greeting
    geminiService.startChat(selectedCoach, userProfile);
    setMessages([
      {
        id: 'init',
        role: 'model',
        text: getGreeting(selectedCoach, userProfile.nickname),
        timestamp: new Date(),
      }
    ]);
  }, [selectedCoach]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getGreeting = (type: CoachType, name: string) => {
    switch (type) {
      case CoachType.GRANNY: return `아이고 우리 ${name}, 또 무슨 일로 속이 문드러져서 왔어! 털어놔봐.`;
      case CoachType.HEALER: return `${name}님, 마음이 힘드신가요? 잠시 이곳에서 쉬어가세요.`;
      case CoachType.ENERGY: return `와우! ${name}님! 오늘도 파이팅 넘치게 시작해볼까요? 무슨 고민 있으세요!`;
      case CoachType.SHERLOCK: return `${name}님. 상황을 객관적으로 분석해드리겠습니다. 사건의 개요(고민)를 말씀해주시죠.`;
      case CoachType.TALKER: return `안녕하세요 ${name}님. 오늘은 어떤 대화가 어려우셨나요? 예쁘게 말하는 법을 연습해봐요.`;
      default: return '안녕하세요.';
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsLoading(true);

    const replyText = await geminiService.sendMessage(input);

    const replyMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: replyText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, replyMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Coach Selector */}
      <div className="bg-white p-4 border-b border-slate-100 shadow-sm z-10">
        <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Sparkles className="text-indigo-600" size={20} />
          나만의 코치 선택
        </h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {COACHES.map((coach) => {
            const locked = isCoachLocked(coach.type);
            const active = selectedCoach === coach.type;
            return (
              <button
                key={coach.type}
                onClick={() => !locked && setSelectedCoach(coach.type)}
                className={`flex-shrink-0 relative w-24 h-32 rounded-xl p-2 flex flex-col items-center justify-center gap-2 transition-all border-2 ${
                  active ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white'
                }`}
              >
                {locked && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] rounded-xl z-20 flex items-center justify-center">
                    <Lock size={20} className="text-slate-400" />
                  </div>
                )}
                <div className={`text-3xl p-2 rounded-full ${coach.color}`}>
                  {coach.icon}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-900 truncate w-full">{coach.type}</p>
                  <p className="text-[10px] text-slate-500 truncate w-full">{coach.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
               <div className="flex gap-1">
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75" />
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150" />
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="relative flex items-center gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="코치에게 고민을 털어놓으세요..."
            className="flex-1 p-3 pr-12 rounded-full bg-slate-100 border-none focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 placeholder:text-slate-400"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-indigo-600 text-white rounded-full disabled:bg-slate-300 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};