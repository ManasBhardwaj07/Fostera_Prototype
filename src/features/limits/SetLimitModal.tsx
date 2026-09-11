import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';

export const SetLimitModal = () => {
  const { selectedAppForLimit, setSelectedAppForLimit, limits, setAppLimit, removeAppLimit } = useApp();

  if (!selectedAppForLimit) return null;

  const app = selectedAppForLimit;
  const currentLimit = limits[app.appId];
  const [selectedMinutes, setSelectedMinutes] = useState<number>(currentLimit?.limitMinutes || 60);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>(
    currentLimit?.limitMinutes ? currentLimit.limitMinutes.toString() : '60'
  );

  const presets = [
    { label: '30 min', minutes: 30 },
    { label: '1 hour', minutes: 60 },
    { label: '2 hours', minutes: 120 },
  ];

  const handleSave = () => {
    const minutesToSave = isCustom ? parseInt(customInput, 10) || 60 : selectedMinutes;
    setAppLimit(app.appId, minutesToSave);
    setSelectedAppForLimit(null);
  };

  const handleRemove = () => {
    removeAppLimit(app.appId);
    setSelectedAppForLimit(null);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4 animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl md:rounded-3xl p-6 space-y-6 shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold"
              style={{ backgroundColor: `${app.color}25`, color: app.color }}
            >
              {app.icon}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Set Limit for {app.appName}</h2>
              <span className="text-xs text-slate-400">Current today's usage: {formatMinutes(app.usageMinutes)}</span>
            </div>
          </div>
          <button
            onClick={() => setSelectedAppForLimit(null)}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Daily Allowance</span>
          <div className="grid grid-cols-3 gap-2">
            {presets.map(p => {
              const isSelected = !isCustom && selectedMinutes === p.minutes;
              return (
                <button
                  key={p.minutes}
                  onClick={() => {
                    setSelectedMinutes(p.minutes);
                    setIsCustom(false);
                  }}
                  className={`py-3 px-2 rounded-xl text-center font-semibold text-xs border transition-all ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setIsCustom(true)}
            className={`w-full py-2.5 px-4 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between ${
              isCustom
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200'
                : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>Custom Allowance</span>
            <span className="font-mono">{isCustom ? `${customInput} mins` : 'Custom'}</span>
          </button>

          {isCustom && (
            <div className="pt-2">
              <input
                type="number"
                value={customInput}
                onChange={e => setCustomInput(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Minutes (e.g. 45)"
              />
            </div>
          )}
        </div>

        <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs text-slate-300">
          💡 If you set <span className="font-bold text-white">{formatMinutes(isCustom ? (parseInt(customInput, 10) || 60) : selectedMinutes)}</span>,
          with current usage of <span className="font-bold text-white">{formatMinutes(app.usageMinutes)}</span>,
          the status will immediately become{' '}
          <span className="font-bold text-rose-400">
            {app.usageMinutes > (isCustom ? (parseInt(customInput, 10) || 60) : selectedMinutes) ? 'EXCEEDED' : 'UNDER LIMIT'}
          </span>.
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={handleSave}
            className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all"
          >
            Save Limit
          </button>

          {currentLimit && (
            <button
              onClick={handleRemove}
              className="w-full py-2.5 text-center text-xs text-rose-400 hover:text-rose-300 transition-colors"
            >
              Remove Limit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
