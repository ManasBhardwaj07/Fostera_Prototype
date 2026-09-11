import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { Modal, Button } from '../../components/common/UI';

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

  const activeAllowance = isCustom ? parseInt(customInput, 10) || 60 : selectedMinutes;

  return (
    <Modal
      isOpen={true}
      onClose={() => setSelectedAppForLimit(null)}
      title={`Daily Limit: ${app.appName}`}
      subtitle={`Current usage today: ${formatMinutes(app.usageMinutes)}`}
    >
      <div className="space-y-4">
        {/* Preset Buttons */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Allowance</span>
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
                  className={`py-2.5 px-3 rounded-lg text-center font-semibold text-xs border transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setIsCustom(true)}
            className={`w-full py-2 px-3 rounded-lg text-left text-xs font-medium border transition-all flex items-center justify-between ${
              isCustom
                ? 'bg-slate-900 border-slate-900 text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <span>Custom Allowance</span>
            <span>{isCustom ? `${customInput} mins` : 'Custom'}</span>
          </button>

          {isCustom && (
            <div className="pt-1">
              <input
                type="number"
                value={customInput}
                onChange={e => setCustomInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#2F855A]"
                placeholder="Minutes (e.g. 45)"
              />
            </div>
          )}
        </div>

        {/* Consequence Preview */}
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
          💡 If you set <strong>{formatMinutes(activeAllowance)}</strong>, with <strong>{formatMinutes(app.usageMinutes)}</strong> used, status will immediately evaluate to{' '}
          <strong className={app.usageMinutes > activeAllowance ? 'text-rose-600' : 'text-emerald-700'}>
            {app.usageMinutes > activeAllowance ? 'EXCEEDED' : 'UNDER LIMIT'}
          </strong>.
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-1">
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            className="w-full"
          >
            Save Limit
          </Button>

          {currentLimit && (
            <Button
              variant="danger"
              size="sm"
              onClick={handleRemove}
              className="w-full"
            >
              Remove Limit
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
