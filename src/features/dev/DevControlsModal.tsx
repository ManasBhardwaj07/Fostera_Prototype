import { useApp } from '../../context/AppContext';

export const DevControlsModal = () => {
  const { isDevModalOpen, setIsDevModalOpen, resetAllDemoData, restartOnboarding, profile, updateDailyGoal } = useApp();

  if (!isDevModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4 animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl md:rounded-3xl p-6 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Assessment Settings</span>
            <h2 className="text-lg font-bold text-white">System Controls</h2>
          </div>
          <button
            onClick={() => setIsDevModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Daily Target (Current: {Math.floor(profile.dailyGoalMinutes / 60)}h):</label>
          <div className="grid grid-cols-3 gap-2">
            {[180, 240, 300].map(mins => (
              <button
                key={mins}
                onClick={() => updateDailyGoal(mins)}
                className={`py-2 rounded-xl text-xs font-semibold border ${
                  profile.dailyGoalMinutes === mins
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                {mins / 60} Hours
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              restartOnboarding();
              setIsDevModalOpen(false);
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all text-left flex items-center justify-between"
          >
            <span>Replay Onboarding Flow</span>
            <span>↺</span>
          </button>

          <button
            onClick={() => {
              resetAllDemoData();
              setIsDevModalOpen(false);
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/40 border border-rose-800/40 text-rose-300 text-xs font-semibold transition-all text-left flex items-center justify-between"
          >
            <span>Reset Demo to Scenario Defaults</span>
            <span>⚠️</span>
          </button>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <span className="font-semibold text-slate-300">Telemetry Provider:</span> MockUsageDataProvider (Deterministic 4h 32m). In production, replaced via UsageStatsManager on Android.
        </div>
      </div>
    </div>
  );
};
