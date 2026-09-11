import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';

export const ProgressView = () => {
  const { reward } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-28 pt-4 px-4 max-w-md mx-auto space-y-6">
      <header className="pt-2">
        <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">Behavioral Feedback</span>
        <h1 className="text-2xl font-bold tracking-tight text-white">Habit & Progress</h1>
        <p className="text-xs text-slate-400 mt-1">
          Reinforcing positive habit loops through streaks, badges, and measurable reduction.
        </p>
      </header>

      <div className="bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-2xl flex items-center justify-center shadow-lg shadow-amber-500/10">
              🔥
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Focus Streak</div>
              <div className="text-3xl font-extrabold text-white">{reward.streakDays} Days</div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Weekly Gain</span>
            <span className="text-sm font-bold text-emerald-400">+{reward.weeklyImprovementPercent}%</span>
          </div>
        </div>

        <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Next milestone: 7-Day Streak</span>
            <span className="text-indigo-400 font-semibold">{reward.streakDays}/7 Days</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min((reward.streakDays / 7) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <span className="text-slate-400 text-[10px] uppercase block">Today's Focus</span>
            <span className="text-base font-bold text-white">{formatMinutes(reward.todayFocusMinutes)}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <span className="text-slate-400 text-[10px] uppercase block">Sessions Done</span>
            <span className="text-base font-bold text-white">{reward.completedFocusSessions}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Achievement Badges</h2>
          <span className="text-xs text-slate-400">
            {reward.badges.filter(b => b.unlocked).length}/{reward.badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {reward.badges.map(badge => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all ${
                badge.unlocked
                  ? 'bg-slate-900/90 border-slate-800 shadow-md'
                  : 'bg-slate-900/30 border-slate-800/40 opacity-50'
              }`}
            >
              <div className="text-2xl mb-2">{badge.icon}</div>
              <div className="font-bold text-sm text-slate-100 flex items-center space-x-1.5">
                <span>{badge.title}</span>
                {badge.unlocked && <span className="text-emerald-400 text-xs">✓</span>}
              </div>
              <div className="text-xs text-slate-400 mt-1 leading-tight">{badge.description}</div>
              {badge.unlocked && badge.unlockedAt && (
                <div className="text-[10px] text-indigo-400/80 font-mono mt-2">Earned {badge.unlockedAt}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-[11px] text-slate-400 leading-relaxed">
        <span className="font-semibold text-slate-300">Prototype Architecture Note:</span> This reward layer reinforces behavioral momentum locally without introducing server-side leaderboard dependencies or fake backend score synchronization.
      </div>
    </div>
  );
};
