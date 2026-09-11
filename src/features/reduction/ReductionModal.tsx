import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { Modal, Button } from '../../components/common/UI';

export const ReductionModal = () => {
  const { isReductionModalOpen, setIsReductionModalOpen, reductionPlan, toggleReductionPlan } = useApp();

  if (!isReductionModalOpen) return null;

  return (
    <Modal
      isOpen={isReductionModalOpen}
      onClose={() => setIsReductionModalOpen(false)}
      title="Gradual Habit Reduction"
      subtitle="Gentle 5-day habit step-down plan to avoid friction."
    >
      <div className="space-y-4 text-xs">
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
          <div>
            <div className="font-bold text-sm text-slate-900">Reduce {reductionPlan.appName}</div>
            <div className="text-slate-500 mt-0.5">
              Target: {formatMinutes(reductionPlan.targetAllowance)}/day (from {formatMinutes(reductionPlan.startingAllowance)})
            </div>
          </div>
          <Button
            variant={reductionPlan.enabled ? 'primary' : 'secondary'}
            size="sm"
            onClick={toggleReductionPlan}
          >
            {reductionPlan.enabled ? 'Enabled' : 'Paused'}
          </Button>
        </div>

        {/* Step-down breakdown */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">5-Day Schedule</span>
          {reductionPlan.steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-2.5 rounded-lg border ${
                step.isCurrent
                  ? 'bg-[#0F172A] border-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <span>{step.day}</span>
              <span className="font-mono font-medium">{formatMinutes(step.allowanceMinutes)}</span>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
          <span className="font-semibold text-slate-700">Prototype Methodology:</span> Allowance reduces by {reductionPlan.stepMinutes} minutes per interval to build sustainable habit changes.
        </div>
      </div>
    </Modal>
  );
};
