import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { getZoneMeta } from '../../domain/usage/zoneCalculator';
import { evaluateAppLimit } from '../../domain/limits/limitEvaluator';
import { WeeklyTrendChart } from './WeeklyTrendChart';

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

  const keyInsight = {
    title: 'Dominance Pattern',
    description: "YouTube + Instagram account for 63% of today's usage.",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-28 pt-4 px-4 max-w-md mx-auto space-y-4">
      <header className="flex items-center justify-between pt-2 pb-1">
        <div>
          <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">Digital Well-Being</span>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
            <span>Good evening, {profile.userName}</span>
          </h1>
        </div>
        <button
          onClick={() => setIsDevModalOpen(true)}
          className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center text-sm transition-colors"
          title="Fostera Settings & Demo Controls"
        >
          ⚙️
        </button>
      </header>

      {activeFocus && activeFocus.status === 'active' && (
        <div className="bg-gradient-to-r from-indigo-950/90 to-purple-950/90 border border-indigo-500/40 rounded-2xl p-4 shadow-lg shadow-indigo-500/10 flex items-center justify-between animate-pulse">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🎯</span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">Focus Mode Active</div>
              <div className="text-sm font-semibold text-white">
                {Math.floor(activeFocus.remainingSeconds / 60)}m {activeFocus.remainingSeconds % 60}s remaining
              </div>
              <div className="text-[11px] text-slate-300">
                {activeFocus.selectedAppIds.length} apps restricted
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('FOCUS')}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition-colors"
          >
            View Session
          </button>
        </div>
      )}

      {nudges.length > 0 && (
        <div className="space-y-2">
          {nudges.slice(0, 1).map(nudge => (
            <div
              key={nudge.id}
              className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 flex items-start justify-between space-x-3"
            >
              <div className="flex items-start space-x-2.5">
                <span className="text-lg mt-0.5">⚠️</span>
                <div>
                  <p className="text-xs font-medium text-amber-200 leading-snug">{nudge.message}</p>
                  {nudge.actionable && (
                    <div className="flex items-center space-x-2 mt-2">
                      {nudge.actionType === 'focus' && (
                        <button
                          onClick={() => setActiveTab('FOCUS')}
                          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-amber-950 rounded-lg text-[11px] font-semibold transition-colors"
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
                          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-amber-950 rounded-lg text-[11px] font-semibold transition-colors"
                        >
                          Review Limit
                        </button>
                      )}
                      <button
                        onClick={() => dismissNudge(nudge.id)}
                        className="text-[11px] text-amber-300/70 hover:text-amber-200"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => dismissNudge(nudge.id)}
                className="text-amber-400/60 hover:text-amber-400 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800/80 shadow-xl space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Today's Screen Time</span>
            <div className="text-4xl font-extrabold tracking-tight text-white mt-1">
              {formatMinutes(totalUsageMinutes)}
            </div>
          </div>

          <div className={`px-3 py-1.5 rounded-xl border flex flex-col items-end ${zoneMeta.bgClass} ${zoneMeta.borderClass}`}>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: zoneMeta.hexColor }} />
              <span className={`text-xs font-bold uppercase tracking-wider ${zoneMeta.textClass}`}>
                {zoneMeta.name}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5">{zoneMeta.rangeText}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <span>Daily Target:</span>
            <span className="font-semibold text-slate-200">{formatMinutes(profile.dailyGoalMinutes)}</span>
          </div>

          <div
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 ${
              isOverGoal
                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            <span>{isOverGoal ? '⚠️' : '✓'}</span>
            <span>
              {formatMinutes(goalDiffMinutes)} {isOverGoal ? 'over goal' : 'remaining'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-base">💡</span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Key Insight</span>
          </div>
          <button
            onClick={() => setIsInsightsModalOpen(true)}
            className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300"
          >
            View all →
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          {keyInsight.description}
        </p>

        <div className="pt-1 flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('FOCUS')}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
          >
            Start Focus
          </button>
          <button
            onClick={() => {
              const yt = apps.find(a => a.appId === 'youtube');
              if (yt) setSelectedAppForLimit(yt);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all"
          >
            Set YouTube Limit
          </button>
        </div>
      </div>

      <WeeklyTrendChart trend={weeklyTrend} goalMinutes={profile.dailyGoalMinutes} />

      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Consuming Apps</h2>
          <span className="text-[11px] text-slate-500">Tap app to inspect & set limits</span>
        </div>

        <div className="space-y-2">
          {apps.map(app => {
            const limit = limits[app.appId];
            const evalLimit = evaluateAppLimit(app.usageMinutes, limit);
            const percentOfDailyTotal = totalUsageMinutes > 0 ? Math.round((app.usageMinutes / totalUsageMinutes) * 100) : 0;

            return (
              <div
                key={app.appId}
                onClick={() => setSelectedAppForDetail(app)}
                className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-3.5 transition-all cursor-pointer flex flex-col space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shadow-inner"
                      style={{ backgroundColor: `${app.color}25`, color: app.color }}
                    >
                      {app.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-200 text-sm flex items-center space-x-1.5">
                        <span>{app.appName}</span>
                        <span className="text-[10px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">
                          {percentOfDailyTotal}%
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">{app.category}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-100">{formatMinutes(app.usageMinutes)}</div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md inline-block mt-0.5 ${evalLimit.statusBadgeClass}`}>
                      {evalLimit.statusText}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      evalLimit.status === 'EXCEEDED'
                        ? 'bg-rose-500'
                        : evalLimit.status === 'AT_LIMIT'
                        ? 'bg-amber-400'
                        : 'bg-indigo-500'
                    }`}
                    style={{ width: `${Math.min(percentOfDailyTotal * 2, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={() => setIsReductionModalOpen(true)}
          className="p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-left transition-all group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xl">📉</span>
            <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
              Active
            </span>
          </div>
          <div className="text-xs font-bold text-slate-200">Gradual Reduction</div>
          <div className="text-[11px] text-slate-400 mt-0.5">YouTube: 120m → 60m</div>
        </button>

        <button
          onClick={() => setIsSchedulesModalOpen(true)}
          className="p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-left transition-all group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xl">⏰</span>
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              Enabled
            </span>
          </div>
          <div className="text-xs font-bold text-slate-200">Scheduled Blocking</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Study Hours (09:00–12:00)</div>
        </button>
      </div>
    </div>
  );
};
