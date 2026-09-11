import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { evaluateAppLimit } from '../../domain/limits/limitEvaluator';
import { Modal, Button, StatusBadge } from '../../components/common/UI';

export const AppDetailModal = () => {
  const {
    selectedAppForDetail,
    setSelectedAppForDetail,
    setSelectedAppForLimit,
    limits,
    totalUsageMinutes,
    setActiveTab,
  } = useApp();

  if (!selectedAppForDetail) return null;

  const app = selectedAppForDetail;
  const limit = limits[app.appId];
  const evalLimit = evaluateAppLimit(app.usageMinutes, limit);
  const share = totalUsageMinutes > 0 ? Math.round((app.usageMinutes / totalUsageMinutes) * 100) : 0;

  return (
    <Modal
      isOpen={true}
      onClose={() => setSelectedAppForDetail(null)}
      position="bottom"
    >
      <div className="space-y-6">
        
        {/* Header directly in body since title is omitted from Modal wrapper to use custom layout */}
        <div className="text-center space-y-1">
          <div className="w-16 h-16 rounded-3xl bg-fostera-surface-soft border border-black/5 mx-auto flex items-center justify-center text-2xl font-bold text-fostera-text-primary mb-3">
             {app.appName.slice(0,1)}
          </div>
          <h2 className="text-2xl font-bold text-fostera-text-primary">{app.appName}</h2>
          <p className="text-sm text-fostera-text-secondary">{app.category}</p>
        </div>

        {/* Stats */}
        <div className="bg-fostera-warm rounded-[20px] p-4 flex justify-between items-center">
           <div>
             <div className="text-[11px] uppercase tracking-wider font-bold text-fostera-text-secondary mb-1">Today's Usage</div>
             <div className="text-xl font-bold text-fostera-text-primary">{formatMinutes(app.usageMinutes)}</div>
             <div className="text-xs text-fostera-text-secondary mt-0.5">{share}% of total</div>
           </div>
           <div className="text-right">
             <div className="text-[11px] uppercase tracking-wider font-bold text-fostera-text-secondary mb-1">Daily Limit</div>
             <div className="text-xl font-bold text-fostera-text-primary">{limit?.enabled ? formatMinutes(limit.limitMinutes) : 'None'}</div>
             <StatusBadge status={evalLimit.status} text={evalLimit.statusText} className="mt-0.5" />
           </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => { setSelectedAppForDetail(null); setSelectedAppForLimit(app); }}
            className="w-full"
          >
            {limit?.enabled ? 'Adjust Limit' : 'Set Limit'}
          </Button>

          <Button
            variant="primary"
            size="lg"
            onClick={() => { setSelectedAppForDetail(null); setActiveTab('FOCUS'); }}
            className="w-full"
          >
            Focus Instead
          </Button>
        </div>
      </div>
    </Modal>
  );
};
