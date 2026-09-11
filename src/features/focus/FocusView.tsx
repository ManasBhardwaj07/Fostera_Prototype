import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatSeconds } from '../../utils/format';

import { Button, PageHeader } from '../../components/common/UI';

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
      <div className="flex flex-col h-full min-h-[60vh] pb-10 animate-fade-in px-2">
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-10 py-10">
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-fostera-text-primary tracking-tight">Stay present.</h1>
            <p className="text-sm text-fostera-text-secondary">{activeFocus.selectedAppIds.length} distractions selected.</p>
          </div>
          
          {/* Massive Timer, no card wrapper */}
          <div className="text-[5rem] sm:text-[6rem] leading-none font-mono font-extrabold tracking-tight text-fostera-focal">
            {formatSeconds(activeFocus.remainingSeconds)}
          </div>
        </div>

        <div className="space-y-3 mt-auto w-full">
          <Button variant="focal" size="lg" onClick={completeFocusSession} className="w-full">
            Complete Session
          </Button>
          <Button variant="subtle" size="md" onClick={endFocusSession} className="w-full">
            End Early
          </Button>
        </div>
      </div>
    );
  }

  // COMPLETION STATE
  if (activeFocus && activeFocus.status === 'completed') {
    return (
      <div className="flex flex-col h-full min-h-[60vh] pb-10 animate-fade-in px-2">
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8 py-10">
          <div className="w-20 h-20 bg-fostera-brand-soft text-fostera-brand rounded-full flex items-center justify-center text-4xl mb-2">
            ✓
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-fostera-text-primary tracking-tight">Session complete</h1>
            <p className="text-base text-fostera-text-secondary">{activeFocus.durationMinutes} minutes focused.</p>
          </div>
          <div className="bg-white px-6 py-4 rounded-[20px] border border-black/5 shadow-sm">
             <div className="text-[11px] uppercase tracking-wider text-fostera-text-secondary font-bold mb-1">Your Streak</div>
             <div className="text-2xl font-bold text-fostera-text-primary">4 <span className="text-fostera-brand mx-2">→</span> 5 days</div>
          </div>
        </div>

        <div className="mt-auto w-full">
          <Button variant="primary" size="lg" onClick={() => { endFocusSession(); setActiveTab('PROGRESS'); }} className="w-full">
            View Progress
          </Button>
        </div>
      </div>
    );
  }

  // SETUP VIEW
  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      <PageHeader
        title="Focus"
        subtitle="Choose your distractions and make room for what matters."
      />

      <div className="px-2 space-y-6">
        <div className="space-y-3">
          <h2 className="text-[13px] font-bold text-fostera-text-secondary uppercase tracking-wider">Restrict Apps</h2>
          <div className="space-y-2">
            {apps.map(app => {
              const isChecked = selectedApps.includes(app.appId);
              return (
                <button
                  key={app.appId}
                  onClick={() => toggleApp(app.appId)}
                  className={`w-full p-3.5 rounded-[20px] border transition-all flex items-center justify-between ${
                    isChecked ? 'bg-fostera-surface text-fostera-text-primary border-fostera-brand ring-1 ring-fostera-brand shadow-sm' : 'bg-transparent border-black/10 text-fostera-text-secondary'
                  }`}
                >
                  <div className="font-semibold text-[15px]">{app.appName}</div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                    isChecked ? 'bg-fostera-brand border-fostera-brand text-white' : 'border-black/20'
                  }`}>
                    {isChecked && '✓'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-[13px] font-bold text-fostera-text-secondary uppercase tracking-wider">How long?</h2>
          <div className="grid grid-cols-2 gap-3">
            {durations.map(m => (
              <button
                key={m}
                onClick={() => setSelectedDuration(m)}
                className={`py-4 rounded-[20px] border font-bold text-lg transition-all ${
                  selectedDuration === m ? 'bg-fostera-focal border-fostera-focal text-white shadow-md' : 'bg-white border-black/5 text-fostera-text-secondary hover:border-black/10'
                }`}
              >
                {m} min
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Button variant="primary" size="lg" onClick={handleStart} disabled={selectedApps.length === 0} className="w-full">
            Start Focus
          </Button>
        </div>
      </div>
    </div>
  );
};
