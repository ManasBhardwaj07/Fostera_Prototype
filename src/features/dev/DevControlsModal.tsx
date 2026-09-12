import { useApp } from '../../context/AppContext';
import { Modal, Button } from '../../components/common/UI';

export const DevControlsModal = () => {
  const {
    isDevModalOpen,
    setIsDevModalOpen,
    resetAllDemoData,
    restartOnboarding,
    profile,
    updateDailyGoal,
  } = useApp();

  if (!isDevModalOpen) return null;

  return (
    <Modal
      isOpen={isDevModalOpen}
      onClose={() => setIsDevModalOpen(false)}
      title="Assessment Controls"
      subtitle="Scenario controls & telemetry boundary"
      position="bottom"
    >
      <div className="space-y-5 text-xs">
        <div className="space-y-2">
          <label className="font-semibold text-fostera-text-primary block">
            Daily Target (Current: {Math.floor(profile.dailyGoalMinutes / 60)}h):
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[180, 240, 300].map(mins => (
              <button
                key={mins}
                onClick={() => updateDailyGoal(mins)}
                className={`py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  profile.dailyGoalMinutes === mins
                    ? 'bg-fostera-focal border-fostera-focal text-white'
                    : 'bg-fostera-surface border-fostera-border text-fostera-text-secondary hover:text-fostera-text-primary hover:bg-fostera-surface-soft'
                }`}
              >
                {mins / 60} Hours
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-fostera-border">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              restartOnboarding();
              setIsDevModalOpen(false);
            }}
            className="w-full text-left justify-between"
          >
            <span>Replay Onboarding Flow</span>
            <span>&olarr;</span>
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              resetAllDemoData();
              setIsDevModalOpen(false);
            }}
            className="w-full text-left justify-between"
          >
            <span>Reset Demo to Scenario Defaults</span>
            <span>&Delta;</span>
          </Button>
        </div>

        <div className="p-3 bg-fostera-surface-soft rounded-2xl border border-fostera-border text-[11px] text-fostera-text-secondary leading-relaxed">
          <span className="font-semibold text-fostera-text-primary">Telemetry Provider:</span>{' '}
          MockUsageDataProvider (Deterministic 4h 32m). In production, replaced via UsageStatsManager on Android without modifying the product layer.
        </div>
      </div>
    </Modal>
  );
};
