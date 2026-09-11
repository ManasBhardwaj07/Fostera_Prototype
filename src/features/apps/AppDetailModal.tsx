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
    setIsSchedulesModalOpen,
    setIsReductionModalOpen,
  } = useApp();

  if (!selectedAppForDetail) return null;

  const app = selectedAppForDetail;
  const limit = limits[app.appId];
  const evalLimit = evaluateAppLimit(app.usageMinutes, limit);
  const share = totalUsageMinutes > 0 ? Math.round((app.usageMinutes / totalUsageMinutes) * 100) : 0;

  const handleStartFocus = () => {
    setSelectedAppForDetail(null);
    setActiveTab('FOCUS');
  };

  const handleSetLimit = () => {
    setSelectedAppForDetail(null);
    setSelectedAppForLimit(app);
  };

  const handleOpenSchedule = () => {
    setSelectedAppForDetail(null);
    setIsSchedulesModalOpen(true);
  };

  const handleOpenReduction = () => {
    setSelectedAppForDetail(null);
    setIsReductionModalOpen(true);
  };

  return (
    <Modal
      isOpen={true}
      onClose={() => setSelectedAppForDetail(null)}
      title={app.appName}
      subtitle={app.category}
    >
      <div className="space-y-4">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Today's Usage</span>
            <div className="text-xl font-bold text-slate-900">{formatMinutes(app.usageMinutes)}</div>
            <div className="text-xs text-slate-500">{share}% of daily total</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Daily Limit</span>
            <div className="text-xl font-bold text-slate-900">
              {limit && limit.enabled ? formatMinutes(limit.limitMinutes) : 'None'}
            </div>
            <div className="text-xs text-slate-500">
              <StatusBadge status={evalLimit.status} text={evalLimit.statusText} />
            </div>
          </div>
        </div>

        {/* Status Notice */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center justify-between">
          <span className="text-slate-600 font-medium">Current Status:</span>
          <StatusBadge status={evalLimit.status} text={evalLimit.statusText} />
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <Button
            variant="primary"
            size="md"
            onClick={handleSetLimit}
            className="w-full"
          >
            {limit && limit.enabled ? 'Adjust Daily Limit' : 'Set Daily Limit'}
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={handleStartFocus}
            className="w-full"
          >
            Start Focus Session
          </Button>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              variant="subtle"
              size="sm"
              onClick={handleOpenSchedule}
              className="border border-slate-200 bg-white"
            >
              Add to Schedule
            </Button>
            <Button
              variant="subtle"
              size="sm"
              onClick={handleOpenReduction}
              className="border border-slate-200 bg-white"
            >
              Gradual Detox
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
