import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { Modal, Button } from '../../components/common/UI';

export const FocusCompletionModal = () => {
  const { completedSessionData, clearCompletedSessionData, setActiveTab, reward } = useApp();

  if (!completedSessionData) return null;

  const handleGoToProgress = () => {
    clearCompletedSessionData();
    setActiveTab('PROGRESS');
  };

  return (
    <Modal
      isOpen={true}
      onClose={clearCompletedSessionData}
      title="Focus Session Complete"
      subtitle="Intervention successfully concluded."
    >
      <div className="space-y-4 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#2F855A] flex items-center justify-center mx-auto text-xl font-bold shadow-xs">
          ✓
        </div>

        <div className="space-y-1">
          <h4 className="text-lg font-bold text-slate-900">Great focus today</h4>
          <p className="text-xs text-slate-500">
            You protected your attention and reinforced your daily habit loop.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-left text-xs">
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-bold block">Focused Time</span>
            <span className="text-lg font-bold text-slate-900">{completedSessionData.durationMinutes}m</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-bold block">Apps Restricted</span>
            <span className="text-lg font-bold text-slate-900">{completedSessionData.appsCount}</span>
          </div>
          <div className="col-span-2 pt-2 border-t border-slate-200 flex items-center justify-between">
            <span className="text-slate-500">Today's total focus:</span>
            <span className="font-bold text-[#2F855A]">{formatMinutes(completedSessionData.todayFocusTotal)}</span>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-left flex items-center space-x-3 text-xs">
          <span className="text-lg">🔥</span>
          <div>
            <div className="font-bold text-amber-900">Focus Streak: {reward.streakDays} Days</div>
            <div className="text-[11px] text-amber-800">Weekly progress score updated.</div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Button
            variant="primary"
            size="md"
            onClick={handleGoToProgress}
            className="w-full"
          >
            View Progress & Badges →
          </Button>
          <Button
            variant="subtle"
            size="sm"
            onClick={clearCompletedSessionData}
            className="w-full text-slate-500 hover:text-slate-800"
          >
            Back to Today
          </Button>
        </div>
      </div>
    </Modal>
  );
};
