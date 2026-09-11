import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { PageHeader } from '../../components/common/UI';

export const ProgressView = () => {
  const { reward } = useApp();

  return (
    <div className="space-y-6 pb-16 animate-fade-in px-1">
      <PageHeader
        title="Progress"
      />

      <div className="px-1 space-y-6">
        
        {/* Reflection Header */}
        <div className="py-4">
          <div className="inline-flex items-center space-x-2 bg-orange-100/80 text-orange-800 px-3 py-1.5 rounded-xl font-bold text-sm mb-3">
            <span>🔥</span>
            <span>{reward.streakDays} day streak</span>
          </div>
          <h2 className="text-2xl font-bold text-fostera-text-primary tracking-tight">You're building a better habit.</h2>
        </div>

        {/* Dense Intentional Weekly Stats */}
        <div className="bg-white border border-black/5 rounded-[24px] p-5 space-y-5 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-fostera-text-primary mb-1">This week</h3>
            <div className="w-full bg-black/5 h-2.5 rounded-full overflow-hidden flex">
               {[1,2,3,4,5,6,7].map((_, i) => (
                  <div key={i} className={`h-full flex-1 border-r border-white/50 ${i < 4 ? 'bg-fostera-brand' : 'bg-transparent'}`} />
               ))}
            </div>
            <p className="text-[13px] text-fostera-text-secondary mt-2 font-medium">4 days within your target</p>
          </div>
          <div className="border-t border-black/5 pt-4">
            <h3 className="text-sm font-bold text-fostera-text-primary mb-1">Today</h3>
            <p className="text-[13px] text-fostera-text-secondary font-medium">{formatMinutes(reward.todayFocusMinutes)} focused</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="pt-2">
           <h3 className="text-[13px] font-bold text-fostera-text-secondary uppercase tracking-wider mb-3 pl-1">Your achievements</h3>
           <div className="space-y-3">
             {reward.badges.map(badge => (
               <div key={badge.id} className={`p-4 rounded-[20px] flex items-start space-x-4 transition-all ${badge.unlocked ? 'bg-white border border-black/5 shadow-sm' : 'bg-transparent border border-black/5 opacity-60'}`}>
                  <div className="text-3xl">{badge.icon}</div>
                  <div>
                    <div className="font-bold text-[15px] text-fostera-text-primary">{badge.title}</div>
                    <div className="text-[13px] text-fostera-text-secondary mt-0.5 leading-snug">{badge.description}</div>
                  </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
};
