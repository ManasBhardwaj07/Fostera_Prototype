import { useApp } from '../../context/AppContext';
import { Modal, Button } from '../../components/common/UI';
import { ArrowRight, Brain } from 'lucide-react';

export const InsightsModal = () => {
  const { insights, isInsightsModalOpen, setIsInsightsModalOpen, apps, setSelectedAppForLimit, setActiveTab } = useApp();

  return (
    <Modal
      isOpen={isInsightsModalOpen}
      onClose={() => setIsInsightsModalOpen(false)}
      title="Observations"
      subtitle="Contextual insights based on today's telemetry."
      position="bottom"
    >
      <div className="space-y-4">
        {insights.map(ins => (
          <div key={ins.id} className="p-5 rounded-[20px] bg-fostera-surface-soft space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-fostera-brand">
                <Brain size={18} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-sm text-fostera-text-primary">{ins.title}</h3>
                  <span className="text-fostera-text-secondary text-[10px] uppercase font-bold tracking-wider">{ins.type}</span>
                </div>
                <p className="text-[13px] text-fostera-text-secondary leading-relaxed font-medium">{ins.description}</p>
              </div>
            </div>
            
            {ins.actionLabel && (
              <div className="pt-2">
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
                  className="w-full text-xs font-semibold !bg-fostera-surface hover:!bg-white !text-fostera-text-primary border border-fostera-border shadow-sm"
                >
                  {ins.actionLabel} <ArrowRight size={14} className="ml-1 opacity-70" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
};
