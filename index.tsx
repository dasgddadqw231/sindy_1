import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { User, Tab, CoachType } from './types';
import { Onboarding } from './components/Onboarding';
import { Home } from './components/Home';
import { AICoach } from './components/AICoach';
import { Diagnosis } from './components/Diagnosis';
import { Content } from './components/Content';
import { Community } from './components/Community';
import { CoinShop } from './components/CoinShop';
import { Home as HomeIcon, Activity, MessageSquare, BookOpen, Users, UserCircle, Plus, Bell } from 'lucide-react';

const App = () => {
  // -- State --
  const [user, setUser] = useState<User>({
    isOnboarded: false,
    profile: {
      nickname: '',
      age: 0,
      gender: 'female',
      marriageYears: 0,
      hasChildren: false,
      relationshipStatus: '',
      issues: [],
      goals: [],
    },
    streakDays: 3,
    missionsCompleted: 12,
    contentsViewed: 5,
    coins: 0,
    isSubscribed: false,
    activeCoach: CoachType.GRANNY,
  });

  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [isCoinShopOpen, setIsCoinShopOpen] = useState(false);

  // -- Handlers --
  const handleOnboardingComplete = (profile: any) => {
    setUser(prev => ({
      ...prev,
      isOnboarded: true,
      profile: { ...prev.profile, ...profile },
      coins: 50, // Welcome bonus
    }));
  };

  const handleCoinPurchase = (amount: number) => {
    const confirm = window.confirm(`${amount} 코인을 충전하시겠습니까?`);
    if (confirm) {
      setUser(prev => ({ ...prev, coins: prev.coins + amount }));
      alert("충전이 완료되었습니다!");
    }
  };

  const handleSubscribe = () => {
    const confirm = window.confirm("월 9,900원에 구독하시겠습니까?");
    if (confirm) {
      setUser(prev => ({ ...prev, isSubscribed: true }));
      alert("구독이 시작되었습니다! 모든 콘텐츠를 자유롭게 이용하세요.");
    }
  };

  const handleUnlockContent = (cost: number, title: string) => {
    if (user.isSubscribed) {
      return;
    }
    if (user.coins >= cost) {
      const confirm = window.confirm(`'${title}'을(를) ${cost} 코인으로 여시겠습니까?`);
      if (confirm) {
        setUser(prev => ({ ...prev, coins: prev.coins - cost }));
        alert("잠금 해제되었습니다!");
      }
    } else {
      const goShop = window.confirm("코인이 부족합니다. 충전소로 이동할까요?");
      if (goShop) setIsCoinShopOpen(true);
    }
  };

  // -- Render --
  if (!user.isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return <Home user={user} onNavigate={setActiveTab} />;
      case Tab.DIAGNOSIS:
        return <Diagnosis isSubscribed={user.isSubscribed} userCoins={user.coins} onUnlock={handleUnlockContent} />;
      case Tab.COACH:
        return <AICoach userProfile={user.profile} isSubscribed={user.isSubscribed} unlockedCoaches={[CoachType.GRANNY, CoachType.ENERGY, CoachType.TALKER]} />;
      case Tab.CONTENT:
        return <Content isSubscribed={user.isSubscribed} onUnlock={handleUnlockContent} />;
      case Tab.COMMUNITY:
        return <Community />;
      default:
        return <Home user={user} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen relative shadow-2xl overflow-hidden font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md px-5 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="font-extrabold text-2xl tracking-tighter text-indigo-600 flex items-center gap-1 cursor-pointer" onClick={() => setActiveTab(Tab.HOME)}>
          Shindy<span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-3"></span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsCoinShopOpen(true)}
            className="bg-amber-100 hover:bg-amber-200 transition-colors px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-amber-200/50"
          >
            <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">C</div>
            <span className="text-amber-900 font-bold text-sm tabular-nums">{user.coins}</span>
            <Plus size={14} className="text-amber-700" />
          </button>
          <button className="relative text-slate-400 hover:text-indigo-600 transition-colors">
            <Bell size={24} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-screen overflow-y-auto no-scrollbar scroll-smooth pt-2">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-5 left-4 right-4 bg-white/90 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-3xl flex justify-around items-center p-2 z-40">
        {[
          { tab: Tab.HOME, icon: HomeIcon, label: '홈' },
          { tab: Tab.DIAGNOSIS, icon: Activity, label: '진단' },
          { tab: Tab.COACH, icon: MessageSquare, label: 'AI코치' },
          { tab: Tab.CONTENT, icon: BookOpen, label: '콘텐츠' },
          { tab: Tab.COMMUNITY, icon: Users, label: '커뮤니티' },
        ].map(item => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className="flex-1 flex flex-col items-center gap-1 py-2 relative group"
            >
              <div className={`relative transition-all duration-300 ${isActive ? 'translate-y-[-4px]' : 'group-hover:translate-y-[-2px]'}`}>
                 {item.tab === Tab.COACH ? (
                   <div className={`p-3.5 rounded-full shadow-lg transition-all duration-300 ${isActive ? 'bg-indigo-600 text-white shadow-indigo-300 scale-110' : 'bg-indigo-50 text-indigo-500'}`}>
                     <item.icon size={24} fill={isActive ? "currentColor" : "none"} />
                   </div>
                 ) : (
                   <item.icon 
                      size={24} 
                      className={`transition-colors duration-300 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} 
                      strokeWidth={isActive ? 2.5 : 2}
                      fill={isActive && item.tab !== Tab.COMMUNITY && item.tab !== Tab.DIAGNOSIS ? "currentColor" : "none"} // Community/Diagnosis icons filled look weird
                   />
                 )}
              </div>
              {item.tab !== Tab.COACH && (
                  <span className={`text-[10px] font-bold transition-colors duration-300 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {item.label}
                  </span>
              )}
              {isActive && item.tab !== Tab.COACH && (
                 <span className="absolute -bottom-1 w-1 h-1 bg-indigo-600 rounded-full"></span>
              )}
            </button>
          )
        })}
      </div>

      {/* Global Modals */}
      <CoinShop 
        isOpen={isCoinShopOpen} 
        onClose={() => setIsCoinShopOpen(false)} 
        currentCoins={user.coins}
        onPurchase={handleCoinPurchase}
        onSubscribe={handleSubscribe}
        isSubscribed={user.isSubscribed}
      />

    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);