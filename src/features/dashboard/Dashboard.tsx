import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { getZoneMeta } from '../../domain/usage/zoneCalculator';
import { evaluateAppLimit } from '../../domain/limits/limitEvaluator';
import { Card, Button } from '../../components/common/UI';
import { X, ArrowRight, Brain, AlertCircle, Settings } from 'lucide-react';

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
    setIsSettingsModalOpen,
    nudges,
    dismissNudge,
  } = useApp();

  const zoneMeta = getZoneMeta(currentZone);
  const sortedApps = [...apps].sort((a, b) => b.usageMinutes - a.usageMinutes);
  const topApps = sortedApps.slice(0, 3);

  // Time based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6 pb-20">
      
      {/* 1. Header Bar: Greeting + Settings Entry */}
      <div className="pt-1 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-fostera-brand">
            Today
          </span>
          <h1 className="text-xs font-medium text-fostera-text-secondary mt-0.5">
            {greeting}, {profile.userName}
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setIsSettingsModalOpen(true)}
          aria-label="Settings and preferences"
          className="w-9 h-9 rounded-full bg-fostera-surface border border-fostera-border text-fostera-text-secondary hover:text-fostera-text-primary hover:bg-fostera-surface-hover flex items-center justify-center transition-all duration-150 shadow-soft active:scale-95"
        >
          <Settings size={17} strokeWidth={2} />
        </button>
      </div>

      {/* 2. Hero: Total Screen Time & Zone Adherence */}
      <div className="pt-1">
        <div className="mb-2">
          <div className="text-[4rem] leading-none font-bold tracking-tighter text-fostera-text-primary mb-1">
            {formatMinutes(totalUsageMinutes)}
          </div>
          <div className="text-sm text-fostera-text-secondary font-medium">
            screen time today
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                currentZone === 'GREEN'
                  ? 'bg-emerald-500'
                  : currentZone === 'BLUE'
                  ? 'bg-blue-500'
                  : currentZone === 'YELLOW'
                  ? 'bg-amber-500'
                  : currentZone === 'ORANGE'
                  ? 'bg-orange-500'
                  : 'bg-rose-500'
              }`}
            />
            <span className="text-sm font-semibold text-fostera-text-primary">{zoneMeta.name}</span>
          </div>
          <div className="text-right">
            <div
              className={`text-sm font-semibold ${
                isOverGoal ? 'text-rose-600 dark:text-rose-400' : 'text-fostera-text-secondary'
              }`}
            >
              {formatMinutes(goalDiffMinutes)} {isOverGoal ? 'over target' : 'remaining'}
            </div>
            <div className="text-[11px] text-fostera-text-secondary opacity-70">
              Target: {formatMinutes(profile.dailyGoalMinutes)}
            </div>
          </div>
        </div>

        {/* Target Progress Bar */}
        <div className="w-full bg-fostera-surface-soft h-2 rounded-full overflow-hidden mt-3 p-0.5 border border-fostera-border-subtle">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              isOverGoal ? 'bg-rose-500' : 'bg-fostera-brand'
            }`}
            style={{ width: `${Math.min((totalUsageMinutes / profile.dailyGoalMinutes) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* 3. Active Focus Banner (if active) */}
      {activeFocus && activeFocus.status === 'active' && (
        <Card className="!p-4 bg-fostera-focal !border-0 text-white flex items-center justify-between shadow-elevated">
          <div className="flex items-center space-x-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <div className="font-bold text-sm">Focus Session Active</div>
              <div className="text-xs text-slate-300 opacity-90">
                {Math.floor(activeFocus.remainingSeconds / 60)}m {activeFocus.remainingSeconds % 60}s remaining
              </div>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setActiveTab('FOCUS')}
            className="!bg-white !text-fostera-focal hover:!bg-slate-100"
          >
            View
          </Button>
        </Card>
      )}

      {/* 4. Nudges */}
      {nudges.length > 0 && (
        <div className="space-y-3">
          {nudges.slice(0, 1).map(nudge => (
            <Card
              key={nudge.id}
              className="!p-4 !bg-fostera-surface-soft !border-fostera-border flex justify-between items-start"
            >
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-fostera-brand shrink-0 mt-0.5" />
                <div className="text-sm font-medium text-fostera-text-primary leading-snug">
                  {nudge.message}
                </div>
              </div>
              <button
                onClick={() => dismissNudge(nudge.id)}
                className="text-fostera-text-secondary hover:text-fostera-text-primary ml-2 shrink-0 p-1"
                aria-label="Dismiss nudge"
              >
                <X size={16} />
              </button>
            </Card>
          ))}
        </div>
      )}

      {/* 5. Top Consuming Apps */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pl-1">
          <h2 className="text-xs font-bold text-fostera-text-secondary uppercase tracking-wider">
            Biggest Distractions
          </h2>
          <span className="text-[11px] text-fostera-text-secondary font-medium">
            Tap to manage limits
          </span>
        </div>

        <div className="space-y-2">
          {topApps.map(app => {
            const limit = limits[app.appId];
            const evalLimit = evaluateAppLimit(app.usageMinutes, limit);

            return (
              <div
                key={app.appId}
                onClick={() => setSelectedAppForDetail(app)}
                className="p-3.5 rounded-[20px] bg-fostera-surface border border-fostera-border/70 hover:border-fostera-border flex items-center justify-between cursor-pointer active:scale-[0.985] transition-all shadow-soft"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-fostera-surface-soft flex items-center justify-center font-bold text-sm text-fostera-text-primary border border-fostera-border/40">
                    {app.appName.slice(0, 1)}
                  </div>
                  <div>
                    <div className="font-semibold text-[15px] text-fostera-text-primary">
                      {app.appName}
                    </div>
                    {limit?.enabled && (
                      <div className="text-[11px] text-fostera-text-secondary mt-0.5 font-medium">
                        Limit: {formatMinutes(limit.limitMinutes)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right flex flex-col items-end justify-center">
                  <div className="font-bold text-[15px] text-fostera-text-primary">
                    {formatMinutes(app.usageMinutes)}
                  </div>
                  {evalLimit.status === 'EXCEEDED' && (
                    <div className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mt-0.5">
                      Exceeded
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Coach Observation */}
      <Card className="!p-6 space-y-4 !bg-fostera-brand-soft !border-0 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-10 text-fostera-brand-dark">
          <Brain size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold text-fostera-brand-dark uppercase tracking-wider">
              A small observation
            </span>
          </div>
          <div className="text-[15px] text-fostera-brand-dark leading-relaxed font-medium mb-5">
            YouTube and Instagram account for nearly <strong>63%</strong> of your screen time today.
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => setActiveTab('FOCUS')}
            className="w-full !bg-fostera-brand-dark hover:!bg-fostera-focal !text-white shadow-sm"
          >
            Start Focus Session <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>
      </Card>
      
    </div>
  );
};
