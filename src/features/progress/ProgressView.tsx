import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { PageHeader, Card } from '../../components/common/UI';
import { Flame, Trophy, Lock, CheckCircle2 } from 'lucide-react';

export const ProgressView = () => {
  const { reward } = useApp();

  return (
    <div className="space-y-6 pb-20">
      <PageHeader
        title="Your week"
        subtitle="Reflecting on consistency and focus"
      />

      <div className="space-y-6">
        {/* 1. Streak Reflection Hero */}
        <div className="pt-1">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 text-amber-700 dark:text-amber-300 px-3.5 py-1.5 rounded-full font-bold text-xs mb-3 border border-amber-500/20">
            <Flame size={15} strokeWidth={2.5} />
            <span>{reward.streakDays} day streak</span>
          </div>
          <h2 className="text-[24px] sm:text-[26px] leading-tight font-bold text-fostera-text-primary tracking-tight">
            You're building a steady habit.
          </h2>
          <p className="text-xs sm:text-sm text-fostera-text-secondary mt-1 font-medium">
            Small daily boundaries create lasting change over time.
          </p>
        </div>

        {/* 2. Target Adherence Card */}
        <Card className="!p-5 space-y-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-fostera-text-secondary uppercase tracking-wider">
                Target adherence
              </h3>
              <span className="text-[11px] font-semibold text-fostera-brand">
                4 of 5 days within target
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                const isMet = i < 4;
                const isFuture = i >= 5;

                return (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-fostera-text-secondary">
                      {day}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                        isMet
                          ? 'bg-fostera-brand text-white shadow-xs'
                          : isFuture
                          ? 'bg-fostera-surface-soft text-fostera-text-secondary/40 border border-fostera-border/50'
                          : 'bg-fostera-surface-soft text-fostera-text-secondary border border-fostera-border'
                      }`}
                    >
                      {isMet ? (
                        <CheckCircle2 size={16} strokeWidth={2.5} />
                      ) : (
                        <span className="text-xs font-bold">&ndash;</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-fostera-border pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold text-fostera-text-secondary uppercase tracking-wider mb-0.5">
                  Today's Deep Focus
                </h3>
                <p className="text-lg font-bold text-fostera-text-primary tracking-tight">
                  {formatMinutes(reward.todayFocusMinutes)} completed
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  +{reward.weeklyImprovementPercent}% this week
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* 3. Milestones */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pl-1">
            <h3 className="text-xs font-bold text-fostera-text-secondary uppercase tracking-wider">
              Milestones
            </h3>
            <span className="text-[11px] text-fostera-text-secondary font-medium">
              {reward.badges.filter(b => b.unlocked).length} of {reward.badges.length} unlocked
            </span>
          </div>

          <div className="space-y-2">
            {reward.badges.map((badge, idx) => {
              const Icon = idx === 0 ? Trophy : Lock;

              return (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-2xl flex items-center space-x-3.5 transition-all border ${
                    badge.unlocked
                      ? 'bg-fostera-surface border-fostera-border/80 shadow-soft'
                      : 'bg-fostera-surface-soft/40 border-fostera-border/40 opacity-60'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      badge.unlocked
                        ? 'bg-fostera-brand-soft text-fostera-brand-dark'
                        : 'bg-fostera-surface-soft text-fostera-text-secondary'
                    }`}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-fostera-text-primary truncate">
                      {badge.title}
                    </div>
                    <div className="text-xs text-fostera-text-secondary mt-0.5 leading-snug">
                      {badge.description}
                    </div>
                  </div>
                  {badge.unlocked && (
                    <div className="shrink-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-fostera-brand bg-fostera-brand-soft px-2 py-0.5 rounded-md">
                        Achieved
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
