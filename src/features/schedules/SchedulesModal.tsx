import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal, Button } from '../../components/common/UI';

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
    <Modal
      isOpen={isSchedulesModalOpen}
      onClose={() => setIsSchedulesModalOpen(false)}
      title="Scheduled Blocking"
      subtitle="Automated routines for deep work, study, or sleep."
      
    >
      <div className="space-y-3">
        {/* Rules List (Section 24) */}
        {scheduleRules.map(rule => (
          <div
            key={rule.id}
            className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
              rule.enabled ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200 opacity-60'
            }`}
          >
            <div>
              <div className="font-bold text-xs text-slate-900">{rule.name}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {rule.startTime} – {rule.endTime} • {rule.days.join(', ')}
              </div>
              <div className="flex gap-1.5 mt-2">
                {rule.restrictedAppIds.map(appId => {
                  const app = apps.find(a => a.appId === appId);
                  return (
                    <span key={appId} className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-700">
                      {app?.appName || appId}
                    </span>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => toggleScheduleRule(rule.id)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                rule.enabled ? 'bg-[#2F855A]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                  rule.enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}

        {!isCreating ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsCreating(true)}
            className="w-full border-dashed"
          >
            + Create New Schedule Rule
          </Button>
        ) : (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="font-bold text-slate-900">New Schedule Rule</div>
            <input
              type="text"
              placeholder="e.g. Deep Work Morning"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#2F855A]"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-500 block mb-1">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-900"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-1">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-900"
                />
              </div>
            </div>
            <div className="flex space-x-2 pt-1">
              <Button variant="primary" size="sm" onClick={handleCreate} className="flex-1">
                Save Rule
              </Button>
              <Button variant="subtle" size="sm" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
