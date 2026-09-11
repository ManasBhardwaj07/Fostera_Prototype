import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMinutes, formatSeconds } from '../../utils/format';
import type { FocusPurpose } from '../../types';
import { Card, Button, PageHeader } from '../../components/common/UI';

export const FocusView = () => {
  const {
    activeFocus,
    startFocusSession,
    endFocusSession,
    completeFocusSession,
    apps,
  } = useApp();

  const [selectedDuration, setSelectedDuration] = useState<number>(25);
  const [selectedApps, setSelectedApps] = useState<string[]>(['youtube', 'instagram']);
  const [purpose, setPurpose] = useState<FocusPurpose>('Study');

  const durations = [
    { label: '15 min', minutes: 15 },
    { label: '25 min', minutes: 25, badge: 'Standard' },
    { label: '45 min', minutes: 45 },
    { label: '60 min', minutes: 60 },
  ];

  const purposes: FocusPurpose[] = ['Study', 'Work', 'Deep Focus'];

  const toggleApp = (appId: string) => {
    setSelectedApps(prev =>
      prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
    );
  };

  const handleStart = () => {
    if (selectedApps.length === 0) return;
    startFocusSession(selectedDuration, selectedApps, purpose);
  };

  // ACTIVE FOCUS EXPERIENCE (Section 21 & 22)
  if (activeFocus && activeFocus.status === 'active') {
    return (
      <div className="max-w-xl mx-auto space-y-6 pt-2 pb-16 md:pb-6 animate-fade-in">
        <div className="text-center space-y-1">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#2F855A] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>FOCUS MODE ACTIVE</span>
          </span>
          <h1 className="text-2xl font-bold text-slate-900 pt-1">{activeFocus.purpose} Session</h1>
          <p className="text-xs text-slate-500">Distractions are restricted until timer expires.</p>
        </div>

        {/* Purpose-built timer card (Deep Navy background for maximum focus) */}
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-12 text-center shadow-lg space-y-4">
          <div className="text-6xl sm:text-7xl font-mono font-extrabold tracking-tight text-white">
            {formatSeconds(activeFocus.remainingSeconds)}
          </div>
          <div className="text-xs text-slate-400 font-medium">
            {activeFocus.durationMinutes}-minute planned focus window
          </div>
        </div>

        {/* Restricted Apps List */}
        <Card className="p-4 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
            Restricted Apps ({activeFocus.selectedAppIds.length})
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {activeFocus.selectedAppIds.map(appId => {
              const app = apps.find(a => a.appId === appId);
              if (!app) return null;
              return (
                <span
                  key={appId}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
                >
                  <span>{app.appName}</span>
                  <span className="text-rose-600 font-bold text-[10px]">Restricted</span>
                </span>
              );
            })}
          </div>
        </Card>

        {/* Session Controls */}
        <div className="space-y-2 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={completeFocusSession}
            className="w-full"
          >
            Complete Session (Fast-Forward)
          </Button>

          <Button
            variant="subtle"
            size="sm"
            onClick={endFocusSession}
            className="w-full text-slate-500 hover:text-rose-600"
          >
            Cancel Session
          </Button>
        </div>
      </div>
    );
  }

  // IDLE SETUP VIEW
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-16 md:pb-6">
      <PageHeader
        title="Focus Mode"
        subtitle="Temporarily restrict distracting applications to protect deep work or study routines."
      />

      {/* Duration Selection */}
      <Card className="p-5 space-y-3">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Duration</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {durations.map(d => {
            const isSelected = selectedDuration === d.minutes;
            return (
              <button
                key={d.minutes}
                onClick={() => setSelectedDuration(d.minutes)}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                }`}
              >
                {d.badge && (
                  <span
                    className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                      isSelected ? 'bg-emerald-500 text-slate-900' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {d.badge}
                  </span>
                )}
                <div className="text-base font-bold">{d.label}</div>
                <div className={`text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                  Deep focus
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Purpose */}
      <Card className="p-5 space-y-3">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Session Purpose</h2>
        <div className="grid grid-cols-3 gap-2">
          {purposes.map(p => {
            const isSelected = purpose === p;
            return (
              <button
                key={p}
                onClick={() => setPurpose(p)}
                className={`py-2.5 px-3 rounded-xl text-center text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Apps to Restrict */}
      <Card className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Apps to Restrict</h2>
          <span className="text-xs font-semibold text-[#2F855A]">{selectedApps.length} selected</span>
        </div>

        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {apps.map(app => {
            const isChecked = selectedApps.includes(app.appId);
            return (
              <button
                key={app.appId}
                onClick={() => toggleApp(app.appId)}
                className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isChecked
                    ? 'bg-emerald-50/70 border-emerald-300 text-slate-900'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                    {app.appName.slice(0, 1)}
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-slate-900">{app.appName}</div>
                    <div className="text-[11px] text-slate-400">{formatMinutes(app.usageMinutes)} today</div>
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                    isChecked ? 'bg-[#2F855A] border-[#2F855A] text-white' : 'border-slate-300'
                  }`}
                >
                  {isChecked && '✓'}
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Start Button */}
      <Button
        variant="primary"
        size="lg"
        onClick={handleStart}
        disabled={selectedApps.length === 0}
        className="w-full"
      >
        Start {selectedDuration}-Minute Focus Session
      </Button>
    </div>
  );
};
