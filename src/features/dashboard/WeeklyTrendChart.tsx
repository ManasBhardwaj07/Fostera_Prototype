import type { DailyProgress } from '../../types';
import { formatMinutes } from '../../utils/format';
import { Card } from '../../components/common/UI';

interface WeeklyTrendChartProps {
  trend: DailyProgress[];
  goalMinutes: number;
}

export const WeeklyTrendChart = ({ trend, goalMinutes }: WeeklyTrendChartProps) => {
  const maxMinutes = Math.max(...trend.map(t => t.totalUsageMinutes), goalMinutes + 60, 300);

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weekly Trend</h2>
          <p className="text-xs text-slate-600 mt-0.5">Daily usage vs. {formatMinutes(goalMinutes)} goal</p>
        </div>
        <div className="flex items-center space-x-3 text-[11px] text-slate-500">
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-800 inline-block" />
            <span>Usage</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-3 border-t border-dashed border-amber-500 inline-block" />
            <span>Goal</span>
          </span>
        </div>
      </div>

      <div className="relative h-36 pt-4 pb-1 flex items-end justify-between space-x-2">
        {/* Goal line */}
        <div
          className="absolute left-0 right-0 border-t border-dashed border-amber-500/80 z-10 pointer-events-none flex justify-end"
          style={{ bottom: `${(goalMinutes / maxMinutes) * 100}%` }}
        >
          <span className="text-[10px] font-mono text-amber-700 -mt-3.5 bg-white px-1.5 rounded border border-amber-200">
            Goal: {formatMinutes(goalMinutes)}
          </span>
        </div>

        {trend.map((item, index) => {
          const heightPercent = Math.min(Math.round((item.totalUsageMinutes / maxMinutes) * 100), 100);
          const isOver = item.totalUsageMinutes > goalMinutes;
          const isToday = item.isToday;

          return (
            <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group relative z-20">
              {/* Tooltip */}
              <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap shadow-xs z-30">
                {formatMinutes(item.totalUsageMinutes)}
              </div>

              {/* Bar */}
              <div className="w-full max-w-[28px] h-full flex items-end">
                <div
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    isToday
                      ? isOver
                        ? 'bg-rose-500 shadow-xs'
                        : 'bg-[#2F855A] shadow-xs'
                      : isOver
                      ? 'bg-rose-200 hover:bg-rose-300'
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              {/* Day label */}
              <span
                className={`text-[11px] mt-2 ${
                  isToday ? 'font-bold text-slate-900' : 'text-slate-400 font-medium'
                }`}
              >
                {item.dayName}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
