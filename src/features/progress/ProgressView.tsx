import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { Card, PageHeader } from '../../components/common/UI';

export const ProgressView = () => {
  const { reward } = useApp();

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-16 md:pb-6">
      <PageHeader
        title="Habit & Progress"
        subtitle="Measurable habit improvement, streaks, and focus milestones."
      />

      {/* Main Focus Streak Card (Deep Navy) */}
      <div className="bg-[#0F172A] text-white rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-2xl flex items-center justify-center">
              🔥
            </div>
            <div>
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                Focus Streak
              </span>
              <div className="text-3xl font-extrabold text-white">{reward.streakDays} Days</div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Weekly Gain</span>
            <span className="text-sm font-bold text-emerald-400">+{reward.weeklyImprovementPercent}%</span>
          </div>
        </div>

        {/* Milestone Tracker */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Next milestone: 7-Day Streak</span>
            <span className="font-semibold text-emerald-400">{reward.streakDays}/7 Days</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#2F855A] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min((reward.streakDays / 7) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Today's Focus Stats */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80">
            <span className="text-slate-400 text-[10px] uppercase block">Today's Focus</span>
            <span className="text-base font-bold text-white">{formatMinutes(reward.todayFocusMinutes)}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80">
            <span className="text-slate-400 text-[10px] uppercase block">Completed Sessions</span>
            <span className="text-base font-bold text-white">{reward.completedFocusSessions}</span>
          </div>
        </div>
      </div>

      {/* Achievement Badges Grid */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Achievement Badges</h2>
          <span className="text-xs text-slate-500 font-medium">
            {reward.badges.filter(b => b.unlocked).length} of {reward.badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {reward.badges.map(badge => (
            <div
              key={badge.id}
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                badge.unlocked
                  ? 'bg-slate-50/80 border-slate-200'
                  : 'bg-white border-slate-100 opacity-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">{badge.icon}</span>
                  {badge.unlocked && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                      Unlocked
                    </span>
                  )}
                </div>
                <div className="font-bold text-xs text-slate-900">{badge.title}</div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{badge.description}</div>
              </div>

              {badge.unlocked && badge.unlockedAt && (
                <div className="text-[10px] text-slate-400 font-mono mt-3 pt-1 border-t border-slate-200/60">
                  Earned {badge.unlockedAt}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
