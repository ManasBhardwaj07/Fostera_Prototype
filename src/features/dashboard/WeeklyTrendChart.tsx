import type { DailyProgress } from '../../types';
import { formatMinutes } from '../../utils/format';

interface WeeklyTrendChartProps {
  trend: DailyProgress[];
  goalMinutes: number;
}

export const WeeklyTrendChart = ({ trend, goalMinutes }: WeeklyTrendChartProps) => {
  const maxMinutes = Math.max(...trend.map(t => t.totalUsageMinutes), goalMinutes + 60, 300);

  return (
    <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/80">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Weekly Trend</h3>
          <p className="text-xs text-slate-300 mt-0.5">Daily usage vs {formatMinutes(goalMinutes)} goal</p>
        </div>
        <div className="flex items-center space-x-3 text-[11px] text-slate-400">
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block" />
            <span>Usage</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-3 border-t border-dashed border-amber-400 inline-block" />
            <span>Goal</span>
          </span>
        </div>
      </div>

      <div className="relative h-36 pt-4 pb-2 flex items-end justify-between space-x-2">
        <div
          className="absolute left-0 right-0 border-t border-dashed border-amber-400/70 z-10 pointer-events-none flex justify-end"
          style={{
            bottom: `${(goalMinutes / maxMinutes) * 100}%`,
          }}
        >
          <span className="text-[10px] font-mono text-amber-400/90 -mt-4 bg-slate-900/90 px-1 rounded">
            Goal: {formatMinutes(goalMinutes)}
          </span>
        </div>

        {trend.map((item, index) => {
          const heightPercent = Math.min(Math.round((item.totalUsageMinutes / maxMinutes) * 100), 100);
          const isOver = item.totalUsageMinutes > goalMinutes;
          const isToday = item.isToday;

          return (
            <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group relative z-20">
              <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap shadow-md z-30">
                {formatMinutes(item.totalUsageMinutes)}
              </div>

              <div className="w-full max-w-[28px] h-full flex items-end">
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    isToday
                      ? isOver
                        ? 'bg-gradient-to-t from-rose-600 to-rose-400 shadow-lg shadow-rose-500/20 ring-1 ring-rose-400'
                        : 'bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-400'
                      : isOver
                      ? 'bg-rose-500/40 hover:bg-rose-500/60'
                      : 'bg-slate-700/60 hover:bg-slate-600/80'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              <span
                className={`text-[11px] mt-2 font-medium ${
                  isToday ? 'text-indigo-400 font-bold' : 'text-slate-400'
                }`}
              >
                {item.dayName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
