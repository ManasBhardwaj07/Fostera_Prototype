import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatSeconds } from '../../utils/format';
import { Button, PageHeader } from '../../components/common/UI';
import { Check, ArrowRight, CheckCircle2 } from 'lucide-react';

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
    setSelectedApps(prev => prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]);
  };

  const handleStart = () => {
    if (selectedApps.length === 0) return;
    startFocusSession(selectedDuration, selectedApps, 'Deep Focus');
  };

  // ACTIVE SESSION
  if (activeFocus && activeFocus.status === 'active') {
    return (
      <div className="fixed inset-0 z-50 bg-fostera-focal flex flex-col h-full animate-fade-in px-6">
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-12 py-10">
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">Stay present.</h1>
            <p className="text-sm font-medium text-slate-400">{activeFocus.selectedAppIds.length} distractions silenced.</p>
          </div>
          
          <div className="text-[5.5rem] sm:text-[7rem] leading-none font-mono font-extrabold tracking-tighter text-white drop-shadow-lg">
            {formatSeconds(activeFocus.remainingSeconds)}
          </div>
        </div>

        <div className="space-y-4 mt-auto w-full pb-safe-bottom mb-12">
          <Button variant="primary" size="lg" onClick={completeFocusSession} className="w-full !bg-white !text-fostera-focal hover:!bg-slate-200">
            Complete Session
          </Button>
          <Button variant="subtle" size="md" onClick={endFocusSession} className="w-full !text-slate-400 hover:!text-white hover:!bg-white/10">
            End Early
          </Button>
        </div>
      </div>
    );
  }

  // COMPLETION STATE
  if (activeFocus && activeFocus.status === 'completed') {
    return (
      <div className="flex flex-col h-full min-h-[65vh] pb-10 animate-fade-in px-4">
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-10 py-12">
          <div className="w-24 h-24 bg-fostera-brand-soft text-fostera-brand rounded-full flex items-center justify-center shadow-inner">
            <CheckCircle2 size={48} strokeWidth={2.5} />
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-fostera-text-primary tracking-tight">Session complete</h1>
            <p className="text-base font-medium text-fostera-text-secondary">{activeFocus.durationMinutes} minutes of deep focus achieved.</p>
          </div>
          <div className="bg-fostera-surface-soft px-8 py-5 rounded-[24px] flex flex-col items-center">
             <div className="text-[11px] uppercase tracking-wider text-fostera-text-secondary font-bold mb-2">Daily Streak</div>
             <div className="flex items-center gap-3 text-2xl font-bold text-fostera-text-primary">
                <span>4</span>
                <ArrowRight size={20} className="text-fostera-brand" strokeWidth={3} />
                <span className="text-fostera-brand">5 days</span>
             </div>
          </div>
        </div>

        <div className="mt-auto w-full">
          <Button variant="primary" size="lg" onClick={() => { endFocusSession(); setActiveTab('PROGRESS'); }} className="w-full shadow-lg">
            View Progress
          </Button>
        </div>
      </div>
    );
  }

  // SETUP VIEW
  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      <PageHeader
        title="Focus"
        subtitle="Choose your distractions and make room for what matters."
      />

      <div className="px-2 space-y-8">
        <div className="space-y-4">
          <h2 className="text-[13px] font-bold text-fostera-text-secondary uppercase tracking-wider">Restrict Apps</h2>
          <div className="space-y-2">
            {apps.map(app => {
              const isChecked = selectedApps.includes(app.appId);
              return (
                <button
                  key={app.appId}
                  onClick={() => toggleApp(app.appId)}
                  className={`w-full p-4 rounded-[20px] transition-all flex items-center justify-between ${
                    isChecked ? 'bg-fostera-surface text-fostera-text-primary border border-fostera-brand shadow-sm ring-1 ring-fostera-brand/20' : 'bg-transparent border border-fostera-border text-fostera-text-secondary hover:bg-fostera-surface-soft'
                  }`}
                >
                  <div className="font-semibold text-[15px]">{app.appName}</div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    isChecked ? 'bg-fostera-brand border-fostera-brand text-white' : 'border-fostera-border bg-fostera-surface'
                  }`}>
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-[13px] font-bold text-fostera-text-secondary uppercase tracking-wider">How long?</h2>
          <div className="grid grid-cols-2 gap-3">
            {durations.map(m => (
              <button
                key={m}
                onClick={() => setSelectedDuration(m)}
                className={`py-4.5 rounded-[20px] font-bold text-lg transition-all border ${
                  selectedDuration === m ? 'bg-fostera-focal border-fostera-focal text-white shadow-md' : 'bg-fostera-surface border-fostera-border text-fostera-text-secondary hover:bg-fostera-surface-soft'
                }`}
              >
                {m} min
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Button variant="primary" size="lg" onClick={handleStart} disabled={selectedApps.length === 0} className="w-full shadow-lg">
            Start Focus Session
          </Button>
        </div>
      </div>
    </div>
  );
};
