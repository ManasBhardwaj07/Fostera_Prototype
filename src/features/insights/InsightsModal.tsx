import { useApp } from '../../context/AppContext';
import { Modal, Button } from '../../components/common/UI';

export const InsightsModal = () => {
  const { isInsightsModalOpen, setIsInsightsModalOpen, insights, setActiveTab, setSelectedAppForLimit, apps } = useApp();

  if (!isInsightsModalOpen) return null;

  return (
    <Modal
      isOpen={isInsightsModalOpen}
      onClose={() => setIsInsightsModalOpen(false)}
      title="Fostera Coach"
      subtitle="Contextual digital well-being guidance based on today's telemetry."
    >
      <div className="space-y-3">
        {insights.map(ins => (
          <div key={ins.id} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">{ins.title}</h3>
              <span className="text-slate-400 text-[10px] uppercase font-semibold">{ins.type}</span>
            </div>
            <p className="text-slate-600 leading-relaxed">{ins.description}</p>
            {ins.actionLabel && (
              <div className="pt-1">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setIsInsightsModalOpen(false);
                    if (ins.actionType === 'focus') setActiveTab('FOCUS');
                    else if (ins.actionType === 'progress') setActiveTab('PROGRESS');
                    else if (ins.actionType === 'limit') {
                      const target = apps.find(a => a.appId === (ins.targetAppId || 'youtube'));
                      if (target) setSelectedAppForLimit(target);
                    }
                  }}
                >
                  {ins.actionLabel} →
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
};
