import React from 'react';
import { Button } from './Button';
import { Crown, Sparkles, Coins } from 'lucide-react';
import { Modal } from './Modal';

interface CoinShopProps {
  isOpen: boolean;
  onClose: () => void;
  currentCoins: number;
  onPurchase: (amount: number) => void;
  onSubscribe: () => void;
  isSubscribed: boolean;
}

export const CoinShop: React.FC<CoinShopProps> = ({ 
  isOpen, onClose, currentCoins, onPurchase, onSubscribe, isSubscribed 
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="스토어">
      <div className="space-y-6">
        {/* Current Balance */}
        <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between">
          <span className="text-slate-600 font-medium">보유 코인</span>
          <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xl">
            <Coins size={20} className="fill-current" />
            {currentCoins}
          </div>
        </div>

        {/* Subscription Plan */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-amber-300 bg-amber-50 p-5">
          <div className="absolute top-0 right-0 bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 rounded-bl-xl">
            BEST VALUE
          </div>
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-amber-100 rounded-full text-amber-600">
              <Crown size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">올인원 구독 패스</h4>
              <p className="text-sm text-slate-600 mt-1">
                모든 유료 진단, 트레이닝 무제한.<br/>
                프리미엄 AI 코치 잠금 해제.
              </p>
            </div>
          </div>
          <Button 
            variant="gold" 
            fullWidth 
            onClick={onSubscribe}
            disabled={isSubscribed}
          >
            {isSubscribed ? "구독 중" : "월 9,900원으로 시작"}
          </Button>
        </div>

        {/* Coin Packages */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900">코인 충전</h4>
          {[
            { amount: 10, price: '5,000원' },
            { amount: 30, price: '14,000원', bonus: '+10%' },
            { amount: 50, price: '22,000원', bonus: '+15%' },
            { amount: 100, price: '40,000원', bonus: 'BEST' },
          ].map((pkg) => (
            <button 
              key={pkg.amount}
              onClick={() => onPurchase(pkg.amount)}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
            >
              <div className="flex items-center gap-2">
                <Coins size={18} className="text-amber-500 fill-current" />
                <span className="font-bold text-slate-800">{pkg.amount} 코인</span>
                {pkg.bonus && (
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold">
                    {pkg.bonus}
                  </span>
                )}
              </div>
              <span className="text-slate-600 group-hover:text-indigo-600 font-medium">
                {pkg.price}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};