import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const SchedulesModal = () => {
  const { isSchedulesModalOpen, setIsSchedulesModalOpen, scheduleRules, toggleScheduleRule, addScheduleRule, apps } = useApp();
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('12:00');
  const [selectedApps] = useState<string[]>(['youtube', 'instagram']);

  if (!isSchedulesModalOpen) return null;

  const handleCreate = () => {
    if (!name.trim()) return;
    addScheduleRule({
      name,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      startTime,
      endTime,
      restrictedAppIds: selectedApps,
      enabled: true,
    });
    setName('');
    setIsCreating(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4 animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl md:rounded-3xl p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Scheduled Blocking</h2>
            <p className="text-xs text-slate-400">Automatic routines for study, work, or sleep</p>
          </div>
          <button
            onClick={() => setIsSchedulesModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          {scheduleRules.map(rule => (
            <div
              key={rule.id}
              className={`p-4 rounded-2xl border transition-all ${
                rule.enabled
                  ? 'bg-slate-800/80 border-slate-700/80'
                  : 'bg-slate-900/50 border-slate-800/60 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">{rule.name}</h3>
                  <div className="text-xs text-indigo-400 font-medium mt-0.5">
                    {rule.startTime} – {rule.endTime} • {rule.days.join(', ')}
                  </div>
                </div>
                <button
                  onClick={() => toggleScheduleRule(rule.id)}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                    rule.enabled ? 'bg-indigo-600 justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                </button>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-700/50 flex flex-wrap gap-1.5">
                {rule.restrictedAppIds.map(appId => {
                  const app = apps.find(a => a.appId === appId);
                  return (
                    <span key={appId} className="px-2 py-0.5 bg-slate-900 rounded-md text-[10px] text-slate-300">
                      {app?.appName || appId}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {!isCreating ? (
          <button
            onClick={() => setIsCreating(true)}
            className="w-full py-3 px-4 rounded-xl border border-dashed border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-semibold transition-all"
          >
            + Create New Schedule Rule
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">New Routine</h4>
            <input
              type="text"
              placeholder="e.g. Deep Work Morning"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                />
              </div>
            </div>
            <div className="flex space-x-2 pt-2">
              <button
                onClick={handleCreate}
                className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
              >
                Save Schedule
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="py-2 px-3 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
