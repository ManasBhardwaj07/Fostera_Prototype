import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMinutes, formatSeconds } from '../../utils/format';
import type { FocusPurpose } from '../../types';

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
    { label: '25 min', minutes: 25, badge: 'Popular' },
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

  if (activeFocus && activeFocus.status === 'active') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 pb-28 pt-6 px-4 max-w-md mx-auto flex flex-col justify-between">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span>FOCUS MODE ACTIVE</span>
          </div>
          <h1 className="text-xl font-bold text-white pt-1">{activeFocus.purpose} Session</h1>
        </div>

        <div className="my-8 flex flex-col items-center justify-center relative">
          <div className="w-64 h-64 rounded-full border-4 border-slate-800/80 flex items-center justify-center relative bg-gradient-to-b from-indigo-950/20 to-slate-900/60 shadow-2xl">
            <div className="text-center space-y-1 z-10">
              <div className="text-5xl font-mono font-extrabold tracking-tight text-white">
                {formatSeconds(activeFocus.remainingSeconds)}
              </div>
              <div className="text-xs text-indigo-300 font-medium">
                {activeFocus.durationMinutes}m planned session
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">
            Restricted Apps ({activeFocus.selectedAppIds.length})
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {activeFocus.selectedAppIds.map(appId => {
              const app = apps.find(a => a.appId === appId);
              if (!app) return null;
              return (
                <span
                  key={appId}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200"
                >
                  <span>{app.icon}</span>
                  <span>{app.appName}</span>
                  <span className="text-rose-400 text-[10px]">⛔</span>
                </span>
              );
            })}
          </div>
        </div>

        <div className="pt-8 space-y-2.5">
          <button
            onClick={completeFocusSession}
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2"
          >
            <span>Complete Session (Fast-Forward)</span>
            <span>✓</span>
          </button>

          <button
            onClick={endFocusSession}
            className="w-full py-2.5 text-center text-xs text-slate-500 hover:text-rose-400 transition-colors"
          >
            Cancel Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-28 pt-4 px-4 max-w-md mx-auto space-y-6">
      <header className="pt-2">
        <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">Intervention Tool</span>
        <h1 className="text-2xl font-bold tracking-tight text-white">Focus Mode</h1>
        <p className="text-xs text-slate-400 mt-1">
          Lock out your highest friction apps to protect deep work or study time.
        </p>
      </header>

      <div className="space-y-2.5">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Duration</span>
        <div className="grid grid-cols-2 gap-2.5">
          {durations.map(d => {
            const isSelected = selectedDuration === d.minutes;
            return (
              <button
                key={d.minutes}
                onClick={() => setSelectedDuration(d.minutes)}
                className={`p-3 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {d.badge && (
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-indigo-500 text-[9px] font-bold text-white uppercase">
                    {d.badge}
                  </span>
                )}
                <div className="text-base font-bold">{d.label}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Distraction-free</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2.5">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Session Purpose</span>
        <div className="grid grid-cols-3 gap-2">
          {purposes.map(p => {
            const isSelected = purpose === p;
            return (
              <button
                key={p}
                onClick={() => setPurpose(p)}
                className={`py-2.5 px-2 rounded-xl text-center text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Restricted Apps</span>
          <span className="text-xs text-indigo-400">{selectedApps.length} selected</span>
        </div>

        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {apps.map(app => {
            const isChecked = selectedApps.includes(app.appId);
            return (
              <button
                key={app.appId}
                onClick={() => toggleApp(app.appId)}
                className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  isChecked
                    ? 'bg-indigo-600/15 border-indigo-500/50'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                    style={{ backgroundColor: `${app.color}25`, color: app.color }}
                  >
                    {app.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200 text-sm">{app.appName}</div>
                    <div className="text-[11px] text-slate-400">{formatMinutes(app.usageMinutes)} today</div>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs ${
                    isChecked ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700'
                  }`}
                >
                  {isChecked && '✓'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={handleStart}
          disabled={selectedApps.length === 0}
          className="w-full py-4 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 transition-all active:scale-[0.99] flex items-center justify-center space-x-2"
        >
          <span>Start {selectedDuration}-Minute Focus</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
