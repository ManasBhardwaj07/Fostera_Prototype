import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatSeconds } from '../../utils/format';
import { Button, PageHeader } from '../../components/common/UI';
import { Check, ArrowRight, CheckCircle2, Shield } from 'lucide-react';

export const FocusView = () => {
  const {
    activeFocus,
    startFocusSession,
    endFocusSession,
    completeFocusSession,
    apps,
    setActiveTab,
  } = useApp();

  const [selectedDuration, setSelectedDuration] = useState<number>(25);
  const [selectedApps, setSelectedApps] = useState<string[]>(['youtube', 'instagram']);

  const durations = [15, 25, 45, 60];

  const toggleApp = (appId: string) => {
    setSelectedApps(prev =>
      prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
    );
  };

  const handleStart = () => {
    if (selectedApps.length === 0) return;
    startFocusSession(selectedDuration, selectedApps, 'Deep Focus');
  };

  // 1. ACTIVE SESSION (Contained in phone canvas)
  if (activeFocus && activeFocus.status === 'active') {
    return (
      <div className="absolute inset-0 z-40 bg-fostera-focal flex flex-col h-full px-6 py-8 text-white view-enter select-none">
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold">
              <Shield size={13} />
              <span>Deep Focus Mode</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Stay present.</h1>
            <p className="text-xs font-medium text-slate-400">
              {activeFocus.selectedAppIds.length} distractions silenced
            </p>
          </div>

          <div className="text-[5rem] sm:text-[6rem] leading-none font-mono font-bold tracking-tighter text-white">
            {formatSeconds(activeFocus.remainingSeconds)}
          </div>

          <div className="text-xs text-slate-400 font-medium max-w-[240px] leading-relaxed">
            Put your phone face down and protect this block of time.
          </div>
        </div>

        <div className="space-y-3 mt-auto w-full pb-safe mb-8">
          <Button
            variant="primary"
            size="lg"
            onClick={completeFocusSession}
            className="w-full !bg-white !text-fostera-focal hover:!bg-slate-100 shadow-md font-bold"
          >
            Complete Session
          </Button>
          <Button
            variant="subtle"
            size="md"
            onClick={endFocusSession}
            className="w-full !text-slate-400 hover:!text-white hover:!bg-white/10"
          >
            End Early
          </Button>
        </div>
      </div>
    );
  }

  // 2. COMPLETION STATE
  if (activeFocus && activeFocus.status === 'completed') {
    return (
      <div className="flex flex-col h-full min-h-[70vh] pb-8 view-enter px-2">
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8 py-10">
          <div className="w-20 h-20 bg-fostera-brand-soft text-fostera-brand rounded-full flex items-center justify-center shadow-inner">
            <CheckCircle2 size={42} strokeWidth={2.5} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-fostera-text-primary tracking-tight">
              Session complete
            </h1>
            <p className="text-sm font-medium text-fostera-text-secondary">
              {activeFocus.durationMinutes} minutes of uninterrupted focus achieved.
            </p>
          </div>
          <div className="bg-fostera-surface-soft border border-fostera-border px-8 py-4 rounded-2xl flex flex-col items-center shadow-soft">
            <div className="text-[11px] uppercase tracking-wider text-fostera-text-secondary font-bold mb-1.5">
              Daily Streak
            </div>
            <div className="flex items-center gap-3 text-xl font-bold text-fostera-text-primary">
              <span>4</span>
              <ArrowRight size={18} className="text-fostera-brand" strokeWidth={2.5} />
              <span className="text-fostera-brand">5 days</span>
            </div>
          </div>
        </div>

        <div className="mt-auto w-full pt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              endFocusSession();
              setActiveTab('PROGRESS');
            }}
            className="w-full shadow-soft"
          >
            View Progress
          </Button>
        </div>
      </div>
    );
  }

  // 3. SETUP VIEW
  return (
    <div className="space-y-6 pb-20">
      <PageHeader
        title="Focus"
        subtitle="Silence notifications and create quiet space."
      />

      <div className="space-y-6">
        {/* App selection */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between pl-1">
            <h2 className="text-xs font-bold text-fostera-text-secondary uppercase tracking-wider">
              Restrict Apps
            </h2>
            <span className="text-[11px] text-fostera-text-secondary font-medium">
              {selectedApps.length} selected
            </span>
          </div>

          <div className="space-y-2">
            {apps.map(app => {
              const isChecked = selectedApps.includes(app.appId);
              return (
                <button
                  key={app.appId}
                  type="button"
                  onClick={() => toggleApp(app.appId)}
                  className={`w-full p-3.5 rounded-2xl transition-all duration-150 flex items-center justify-between border active:scale-[0.985] ${
                    isChecked
                      ? 'bg-fostera-brand-soft/50 border-fostera-brand/40 text-fostera-text-primary shadow-soft'
                      : 'bg-fostera-surface border-fostera-border text-fostera-text-secondary hover:bg-fostera-surface-soft hover:text-fostera-text-primary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-fostera-surface-soft flex items-center justify-center font-bold text-xs text-fostera-text-primary border border-fostera-border/40">
                      {app.appName.slice(0, 1)}
                    </div>
                    <span className="font-semibold text-sm text-fostera-text-primary">{app.appName}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-fostera-brand border-fostera-brand text-white'
                        : 'border-fostera-border bg-fostera-surface'
                    }`}
                  >
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration selection */}
        <div className="space-y-2.5">
          <h2 className="text-xs font-bold text-fostera-text-secondary uppercase tracking-wider pl-1">
            Duration
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {durations.map(m => {
              const isSelected = selectedDuration === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedDuration(m)}
                  className={`py-3 rounded-2xl font-bold text-sm transition-all duration-150 border active:scale-95 ${
                    isSelected
                      ? 'bg-fostera-focal border-fostera-focal text-white shadow-soft'
                      : 'bg-fostera-surface border-fostera-border text-fostera-text-secondary hover:bg-fostera-surface-soft hover:text-fostera-text-primary'
                  }`}
                >
                  {m}m
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={handleStart}
            disabled={selectedApps.length === 0}
            className="w-full shadow-soft"
          >
            Start Focus Session
          </Button>
        </div>
      </div>
    </div>
  );
};
