import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { evaluateAppLimit } from '../../domain/limits/limitEvaluator';

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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4 animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl md:rounded-3xl p-6 space-y-6 shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-md"
              style={{ backgroundColor: `${app.color}25`, color: app.color }}
            >
              {app.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{app.appName}</h2>
              <span className="text-xs text-slate-400">{app.category}</span>
            </div>
          </div>
          <button
            onClick={() => setSelectedAppForDetail(null)}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Today's Usage</span>
            <div className="text-2xl font-bold text-white">{formatMinutes(app.usageMinutes)}</div>
            <div className="text-xs text-indigo-400 font-medium">{share}% of total screen time</div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Daily Limit</span>
            <div className="text-2xl font-bold text-white">
              {limit && limit.enabled ? formatMinutes(limit.limitMinutes) : 'None'}
            </div>
            <div className={`text-xs font-semibold ${evalLimit.isOver ? 'text-rose-400' : 'text-slate-400'}`}>
              {evalLimit.statusText}
            </div>
          </div>
        </div>

        <div
          className={`p-3.5 rounded-2xl border flex items-center justify-between ${
            evalLimit.status === 'EXCEEDED'
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              : evalLimit.status === 'AT_LIMIT'
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              : evalLimit.status === 'UNDER'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-slate-800/50 border-slate-700 text-slate-300'
          }`}
        >
          <div className="flex items-center space-x-2">
            <span>{evalLimit.status === 'EXCEEDED' ? '🚨' : evalLimit.status === 'UNDER' ? '✓' : 'ℹ️'}</span>
            <span className="text-xs font-semibold uppercase tracking-wider">
              {evalLimit.status === 'NO_LIMIT' ? 'No Active Limit' : evalLimit.status}
            </span>
          </div>
          <span className="text-xs font-medium">{evalLimit.statusText}</span>
        </div>

        <div className="space-y-2 pt-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Available Actions</span>

          <button
            onClick={handleSetLimit}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-between"
          >
            <span>{limit && limit.enabled ? 'Adjust Limit' : 'Set Daily Limit'}</span>
            <span>⏱️</span>
          </button>

          <button
            onClick={handleStartFocus}
            className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700 transition-all flex items-center justify-between"
          >
            <span>Start Focus Session</span>
            <span>🎯</span>
          </button>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleOpenSchedule}
              className="py-2.5 px-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/70 transition-all"
            >
              ⏰ Add to Schedule
            </button>
            <button
              onClick={handleOpenReduction}
              className="py-2.5 px-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/70 transition-all"
            >
              📉 Gradual Detox
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
