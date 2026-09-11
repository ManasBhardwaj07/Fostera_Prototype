import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { getZoneMeta } from '../../domain/usage/zoneCalculator';
import { evaluateAppLimit } from '../../domain/limits/limitEvaluator';
import { Card, Button } from '../../components/common/UI';

export const Dashboard = () => {
  const {
    profile,
    totalUsageMinutes,
    currentZone,
    goalDiffMinutes,
    isOverGoal,
    apps,
    limits,
    activeFocus,
    setActiveTab,
    setSelectedAppForDetail,
    
    setIsInsightsModalOpen,
    nudges,
    dismissNudge,
  } = useApp();

  const zoneMeta = getZoneMeta(currentZone);
  const sortedApps = [...apps].sort((a, b) => b.usageMinutes - a.usageMinutes);
  const topApps = sortedApps.slice(0, 3);

  return (
    <div className="space-y-6 pb-16 animate-fade-in px-1">
      
      {/* 1. Hero: Total Time & Zone */}
      <div className="pt-2">
        <h1 className="text-sm font-semibold text-fostera-text-secondary mb-1">
          Today
        </h1>
        <div className="flex items-end justify-between">
          <div className="text-[3.5rem] leading-none font-extrabold tracking-tight text-fostera-text-primary">
            {formatMinutes(totalUsageMinutes)}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900">
              {zoneMeta.name}
            </span>
          </div>
          <div className="text-right">
            <div className={`text-sm font-semibold ${isOverGoal ? 'text-rose-600' : 'text-fostera-text-secondary'}`}>
              {formatMinutes(goalDiffMinutes)} {isOverGoal ? 'over target' : 'remaining'}
            </div>
            <div className="text-[11px] text-slate-400">Target: {formatMinutes(profile.dailyGoalMinutes)}</div>
          </div>
        </div>
      </div>

      {/* Target Progress Bar */}
      <div className="w-full bg-black/5 h-2 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${isOverGoal ? 'bg-amber-400' : 'bg-fostera-brand'}`}
          style={{ width: `${Math.min((totalUsageMinutes / profile.dailyGoalMinutes) * 100, 100)}%` }}
        />
      </div>

      {/* Active Focus Banner */}
      {activeFocus && activeFocus.status === 'active' && (
        <Card className="!p-4 bg-fostera-focal !border-0 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <span className="flex h-3 w-3 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
             </span>
             <div>
               <div className="font-bold">Focusing</div>
               <div className="text-xs text-slate-300 opacity-90">{Math.floor(activeFocus.remainingSeconds / 60)}m {activeFocus.remainingSeconds % 60}s remaining</div>
             </div>
          </div>
          <Button variant="primary" size="sm" onClick={() => setActiveTab('FOCUS')} className="!bg-white !text-fostera-focal">
            View
          </Button>
        </Card>
      )}

      {/* Nudges */}
      {nudges.length > 0 && (
        <div className="space-y-3">
          {nudges.slice(0, 1).map(nudge => (
            <Card key={nudge.id} className="!p-4 !bg-fostera-surface-soft !border-0">
              <div className="flex justify-between items-start">
                <div className="text-sm font-semibold text-fostera-text-primary">{nudge.message}</div>
                <button onClick={() => dismissNudge(nudge.id)} className="text-fostera-text-secondary ml-2">✕</button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Top Consuming Apps (Not in a card, directly on surface for breathability) */}
      <div className="pt-2 space-y-3">
        <h2 className="text-[13px] font-bold text-fostera-text-secondary uppercase tracking-wider pl-1">
          Top Distractions
        </h2>
        <div className="space-y-2">
          {topApps.map(app => {
            const limit = limits[app.appId];
            const evalLimit = evaluateAppLimit(app.usageMinutes, limit);
            
            return (
              <div
                key={app.appId}
                onClick={() => setSelectedAppForDetail(app)}
                className="p-3.5 rounded-[20px] bg-white border border-black/5 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-fostera-surface-soft flex items-center justify-center font-bold text-sm text-fostera-text-primary">
                    {app.appName.slice(0, 1)}
                  </div>
                  <div>
                    <div className="font-semibold text-[15px] text-fostera-text-primary">{app.appName}</div>
                    {limit?.enabled && (
                      <div className="text-[11px] text-fostera-text-secondary mt-0.5">
                        Limit: {formatMinutes(limit.limitMinutes)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[15px] text-fostera-text-primary">{formatMinutes(app.usageMinutes)}</div>
                  {evalLimit.status === 'EXCEEDED' && (
                    <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wider mt-0.5">Exceeded</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coach Insight */}
      <Card className="!p-5 space-y-4 !bg-[#E4F0E9] !border-0">
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-bold text-fostera-brand-dark uppercase tracking-wider">
            Coach Insight
          </span>
          <button onClick={() => setIsInsightsModalOpen(true)} className="text-xs text-fostera-brand-dark font-medium underline">
            All Insights
          </button>
        </div>
        <div className="text-[15px] text-fostera-brand-dark leading-relaxed">
          YouTube and Instagram account for nearly <strong>63%</strong> of your screen time today.
        </div>
        <Button variant="primary" size="md" onClick={() => setActiveTab('FOCUS')} className="w-full !bg-fostera-brand-dark">
          Start Focus Session
        </Button>
      </Card>
      
    </div>
  );
};
