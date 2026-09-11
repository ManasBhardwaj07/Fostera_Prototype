import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';

export const ReductionModal = () => {
  const { isReductionModalOpen, setIsReductionModalOpen, reductionPlan, toggleReductionPlan } = useApp();

  if (!isReductionModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4 animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl md:rounded-3xl p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Digital Detox</span>
            <h2 className="text-xl font-bold text-white">Gradual Habit Reduction</h2>
          </div>
          <button
            onClick={() => setIsReductionModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-base">Reduce {reductionPlan.appName}</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Target: {formatMinutes(reductionPlan.targetAllowance)} / day (from {formatMinutes(reductionPlan.startingAllowance)})
              </div>
            </div>
            <button
              onClick={toggleReductionPlan}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                reductionPlan.enabled
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {reductionPlan.enabled ? 'Enabled' : 'Paused'}
            </button>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-700/60">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">5-Day Step Breakdown</span>
            {reductionPlan.steps.map((step, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-2 rounded-xl text-xs ${
                  step.isCurrent
                    ? 'bg-indigo-600/20 border border-indigo-500/40 text-white font-semibold'
                    : 'bg-slate-900/50 text-slate-300'
                }`}
              >
                <span>{step.day}</span>
                <span className="font-mono">{formatMinutes(step.allowanceMinutes)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <span className="font-semibold text-slate-300">Methodology Note:</span> Fostera's gradual reduction algorithm gently steps down daily screen allowance by {reductionPlan.stepMinutes} minutes per interval to avoid friction-induced user dropoff.
        </div>
      </div>
    </div>
  );
};
