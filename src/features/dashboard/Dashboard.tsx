import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { getZoneMeta } from '../../domain/usage/zoneCalculator';
import { evaluateAppLimit } from '../../domain/limits/limitEvaluator';
import { WeeklyTrendChart } from './WeeklyTrendChart';
import { Card, Button, StatusBadge } from '../../components/common/UI';
import { SettingsIcon, ChevronRightIcon } from '../../components/common/Icons';

export const Dashboard = () => {
  const {
    profile,
    totalUsageMinutes,
    currentZone,
    weeklyTrend,
    goalDiffMinutes,
    isOverGoal,
    apps,
    limits,
    activeFocus,
    setActiveTab,
    setSelectedAppForDetail,
    setSelectedAppForLimit,
    setIsSchedulesModalOpen,
    setIsReductionModalOpen,
    setIsInsightsModalOpen,
    setIsDevModalOpen,
    nudges,
    dismissNudge,
  } = useApp();

  const zoneMeta = getZoneMeta(currentZone);

  return (
    <div className="space-y-5 pb-16 md:pb-6">
      {/* Mobile Top Header */}
      <header className="flex md:hidden items-center justify-between pb-1">
        <div>
          <span className="text-[11px] font-bold text-[#2F855A] uppercase tracking-wider">Digital Well-Being</span>
          <h1 className="text-xl font-bold text-slate-900">Good evening, {profile.userName}</h1>
        </div>
        <button
          onClick={() => setIsDevModalOpen(true)}
          className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors shadow-xs"
          title="Settings"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>
      </header>

      {/* Desktop Header Greeting */}
      <div className="hidden md:flex items-center justify-between pb-1">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Good evening, {profile.userName}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Here is your digital well-being overview for today.</p>
        </div>
      </div>

      {/* Compact Active Focus Mode Banner (Section 21) */}
      {activeFocus && activeFocus.status === 'active' && (
        <div className="bg-[#0F172A] text-white rounded-xl p-3.5 sm:p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Focus Mode Active
              </div>
              <div className="text-sm text-slate-200">
                {Math.floor(activeFocus.remainingSeconds / 60)}m {activeFocus.remainingSeconds % 60}s remaining •{' '}
                {activeFocus.selectedAppIds.length} apps restricted
              </div>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setActiveTab('FOCUS')}
          >
            View Session →
          </Button>
        </div>
      )}

      {/* Contextual Nudge Banner (Section 27) */}
      {nudges.length > 0 && (
        <div className="space-y-2">
          {nudges.slice(0, 1).map(nudge => (
            <div
              key={nudge.id}
              className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-3 sm:p-3.5 flex items-start justify-between text-xs"
            >
              <div className="flex items-start space-x-2.5">
                <span className="text-amber-700 font-bold mt-0.5">ℹ️</span>
                <div>
                  <div className="font-semibold text-amber-900">Fostera Notice</div>
                  <p className="text-amber-800 mt-0.5">{nudge.message}</p>
                  {nudge.actionable && (
                    <div className="flex items-center space-x-2 mt-2">
                      {nudge.actionType === 'focus' && (
                        <button
                          onClick={() => setActiveTab('FOCUS')}
                          className="px-2.5 py-1 bg-[#2F855A] text-white rounded-md font-medium text-xs hover:bg-[#276749] transition-colors"
                        >
                          Start Focus
                        </button>
                      )}
                      {nudge.actionType === 'limit' && (
                        <button
                          onClick={() => {
                            const yt = apps.find(a => a.appId === 'youtube');
                            if (yt) setSelectedAppForLimit(yt);
                          }}
                          className="px-2.5 py-1 bg-white border border-amber-300 text-amber-900 rounded-md font-medium text-xs hover:bg-amber-100 transition-colors"
                        >
                          Review Limit
                        </button>
                      )}
                      <button
                        onClick={() => dismissNudge(nudge.id)}
                        className="text-amber-700 hover:text-amber-900 text-xs underline pl-1"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => dismissNudge(nudge.id)}
                className="text-amber-500 hover:text-amber-800 text-xs p-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left Column on Desktop (7 cols) */}
        <div className="md:col-span-7 space-y-5">
          {/* PRIMARY METRIC HERO CARD (Deep Navy #0F172A) */}
          <div className="bg-[#0F172A] text-white rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Today's Screen Time
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-1">
                  {formatMinutes(totalUsageMinutes)}
                </div>
              </div>

              {/* Semantic Zone Badge */}
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-900 shadow-xs">
                  {zoneMeta.name}
                </span>
                <div className="text-[11px] text-slate-400 mt-1">{zoneMeta.rangeText}</div>
              </div>
            </div>

            {/* Daily Target Sub-bar */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1.5 text-slate-300">
                <span>Daily Target:</span>
                <span className="font-semibold text-white">{formatMinutes(profile.dailyGoalMinutes)}</span>
              </div>

              <div
                className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                  isOverGoal
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {formatMinutes(goalDiffMinutes)} {isOverGoal ? 'over goal' : 'remaining'}
              </div>
            </div>
          </div>

          {/* Weekly Trend Chart */}
          <WeeklyTrendChart trend={weeklyTrend} goalMinutes={profile.dailyGoalMinutes} />

          {/* Quick Routines (Schedules & Gradual Reduction) */}
          <div className="grid grid-cols-2 gap-3">
            <Card
              onClick={() => setIsReductionModalOpen(true)}
              className="p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900">Gradual Detox</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active
                  </span>
                </div>
                <div className="text-xs text-slate-500">YouTube: 120m → 60m</div>
              </div>
              <div className="text-[11px] font-medium text-[#2F855A] mt-3 flex items-center space-x-1">
                <span>View Detox Plan</span>
                <ChevronRightIcon className="w-3 h-3" />
              </div>
            </Card>

            <Card
              onClick={() => setIsSchedulesModalOpen(true)}
              className="p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900">Scheduled Blocking</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    Enabled
                  </span>
                </div>
                <div className="text-xs text-slate-500">Study Hours (09:00–12:00)</div>
              </div>
              <div className="text-[11px] font-medium text-slate-800 mt-3 flex items-center space-x-1">
                <span>Manage Rules</span>
                <ChevronRightIcon className="w-3 h-3" />
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column on Desktop (5 cols) */}
        <div className="md:col-span-5 space-y-5">
          {/* Key Insight Card (Section 26) */}
          <Card className="p-5 space-y-3 border-l-4 border-l-[#2F855A]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Fostera Coach
              </span>
              <button
                onClick={() => setIsInsightsModalOpen(true)}
                className="text-xs text-[#2F855A] hover:underline font-medium"
              >
                All Insights →
              </button>
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900">Major Usage Concentration</h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                YouTube + Instagram account for <strong>63%</strong> of today's usage (2h 50m).
              </p>
            </div>

            <div className="pt-2 flex items-center space-x-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActiveTab('FOCUS')}
                className="flex-1"
              >
                Start Focus Mode
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  const yt = apps.find(a => a.appId === 'youtube');
                  if (yt) setSelectedAppForLimit(yt);
                }}
              >
                Set Limit
              </Button>
            </div>
          </Card>

          {/* Top Consuming Apps Section (Section 20 & 29) */}
          <Card className="p-5 space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Top Consuming Apps
              </h2>
              <span className="text-[11px] text-slate-400">Click to inspect</span>
            </div>

            <div className="space-y-2 pt-1">
              {apps.map(app => {
                const limit = limits[app.appId];
                const evalLimit = evaluateAppLimit(app.usageMinutes, limit);
                const percent = totalUsageMinutes > 0 ? Math.round((app.usageMinutes / totalUsageMinutes) * 100) : 0;

                return (
                  <div
                    key={app.appId}
                    onClick={() => setSelectedAppForDetail(app)}
                    className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer flex flex-col space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-800 shadow-2xs">
                          {app.appName.slice(0, 1)}
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-slate-900 flex items-center space-x-1.5">
                            <span>{app.appName}</span>
                            <span className="text-[10px] font-normal text-slate-400">({percent}%)</span>
                          </div>
                          <div className="text-[11px] text-slate-500">{app.category}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-900">{formatMinutes(app.usageMinutes)}</div>
                        <StatusBadge
                          status={evalLimit.status}
                          text={evalLimit.statusText}
                          className="mt-0.5"
                        />
                      </div>
                    </div>

                    {/* Usage bar */}
                    <div className="w-full bg-slate-200/80 h-1 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          evalLimit.status === 'EXCEEDED' ? 'bg-rose-500' : 'bg-slate-700'
                        }`}
                        style={{ width: `${Math.min(percent * 2, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
