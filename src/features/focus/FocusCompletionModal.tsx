import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';

export const FocusCompletionModal = () => {
  const { completedSessionData, clearCompletedSessionData, setActiveTab, reward } = useApp();

  if (!completedSessionData) return null;

  const handleGoToProgress = () => {
    clearCompletedSessionData();
    setActiveTab('PROGRESS');
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-sm bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 text-center space-y-6 shadow-2xl relative overflow-hidden animate-scale-up">
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          🎯
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Intervention Succeeded</span>
          <h2 className="text-2xl font-extrabold text-white">Focus Session Complete</h2>
          <p className="text-xs text-slate-300">
            You defended your attention and built meaningful habit momentum.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 text-left">
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-semibold block">Focused Time</span>
            <span className="text-xl font-bold text-white">{completedSessionData.durationMinutes}m</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-semibold block">Apps Restricted</span>
            <span className="text-xl font-bold text-indigo-400">{completedSessionData.appsCount}</span>
          </div>
          <div className="pt-2 border-t border-slate-700/60 col-span-2 flex items-center justify-between">
            <span className="text-xs text-slate-400">Today's focused total:</span>
            <span className="text-xs font-bold text-emerald-400">{formatMinutes(completedSessionData.todayFocusTotal)}</span>
          </div>
        </div>

        <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-3 flex items-center space-x-3 text-left">
          <span className="text-2xl">🔥</span>
          <div>
            <div className="text-xs font-bold text-white">Streak: {reward.streakDays} Days!</div>
            <div className="text-[11px] text-slate-400">Reward points & milestone progress updated.</div>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleGoToProgress}
            className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all"
          >
            View Progress & Rewards →
          </button>
          <button
            onClick={clearCompletedSessionData}
            className="w-full py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
