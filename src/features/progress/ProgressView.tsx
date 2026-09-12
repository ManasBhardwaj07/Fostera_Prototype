import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { PageHeader, Card } from '../../components/common/UI';
import { Flame, Trophy, Lock, CheckCircle2 } from 'lucide-react';

export const ProgressView = () => {
  const { reward } = useApp();

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      <PageHeader
        title="Your week"
      />

      <div className="px-2 space-y-10">
        
        {/* Reflection Header */}
        <div className="pt-2">
          <div className="inline-flex items-center space-x-2 bg-orange-500/10 text-orange-600 px-4 py-2 rounded-full font-bold text-sm mb-4">
            <Flame size={18} strokeWidth={2.5} />
            <span>{reward.streakDays} day streak</span>
          </div>
          <h2 className="text-[28px] leading-tight font-bold text-fostera-text-primary tracking-tight pr-4">
            You're building a better habit.
          </h2>
        </div>

        {/* Weekly Stats */}
        <Card className="!p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-fostera-text-secondary uppercase tracking-wider mb-4">Target adherence</h3>
            <div className="flex justify-between items-center mb-2">
               {[1,2,3,4,5,6,7].map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-medium text-fostera-text-secondary">
                      {['M','T','W','T','F','S','S'][i]}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      i < 4 ? 'bg-fostera-brand text-white' : 'bg-fostera-surface-soft text-transparent'
                    }`}>
                      <CheckCircle2 size={16} strokeWidth={3} />
                    </div>
                  </div>
               ))}
            </div>
            <p className="text-[14px] text-fostera-text-primary mt-4 font-semibold text-center">4 of 5 days within target</p>
          </div>
          
          <div className="border-t border-fostera-border pt-5">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-xs font-bold text-fostera-text-secondary uppercase tracking-wider mb-1">Today's Focus</h3>
                <p className="text-lg font-bold text-fostera-text-primary">{formatMinutes(reward.todayFocusMinutes)} focused</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <div className="pt-2">
           <h3 className="text-[13px] font-bold text-fostera-text-secondary uppercase tracking-wider mb-4 pl-1">Milestones</h3>
           <div className="space-y-3">
             {reward.badges.map((badge, idx) => {
               // Assigning icons based on index for the mock
               const Icon = idx === 0 ? Trophy : Lock;
               
               return (
                 <div key={badge.id} className={`p-4 rounded-[24px] flex items-center space-x-4 transition-all border ${
                   badge.unlocked 
                    ? 'bg-fostera-surface border-fostera-border shadow-sm' 
                    : 'bg-transparent border-transparent opacity-50'
                 }`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                      badge.unlocked ? 'bg-fostera-brand-soft text-fostera-brand-dark' : 'bg-fostera-surface-soft text-fostera-text-secondary'
                    }`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-[15px] text-fostera-text-primary">{badge.title}</div>
                      <div className="text-[13px] text-fostera-text-secondary mt-0.5 leading-snug pr-2">{badge.description}</div>
                    </div>
                 </div>
               )
             })}
           </div>
        </div>

      </div>
    </div>
  );
};
