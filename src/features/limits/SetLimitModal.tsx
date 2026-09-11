import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { Modal, Button } from '../../components/common/UI';

export const SetLimitModal = () => {
  const { selectedAppForLimit, setSelectedAppForLimit, setAppLimit, removeAppLimit, limits } = useApp();
  const [minutes, setMinutes] = useState<number>(60);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (selectedAppForLimit) {
      const existing = limits[selectedAppForLimit.appId];
      if (existing) {
        setMinutes(existing.limitMinutes);
        setEnabled(existing.enabled);
      } else {
        setMinutes(60);
        setEnabled(true);
      }
    }
  }, [selectedAppForLimit, limits]);

  if (!selectedAppForLimit) return null;

  const handleSave = () => {
    if (enabled) { setAppLimit(selectedAppForLimit.appId, minutes); } else { removeAppLimit(selectedAppForLimit.appId); }
    setSelectedAppForLimit(null);
  };

  return (
    <Modal
      isOpen={true}
      onClose={() => setSelectedAppForLimit(null)}
      title={`Set ${selectedAppForLimit.appName} Limit`}
      position="bottom"
    >
      <div className="space-y-6">
        
        <div className="flex justify-between items-center">
          <div>
            <div className="text-[13px] font-bold text-fostera-text-secondary uppercase tracking-wider">Current Usage</div>
            <div className="text-xl font-bold text-fostera-text-primary mt-1">{formatMinutes(selectedAppForLimit.usageMinutes)}</div>
          </div>
          <label className="flex items-center cursor-pointer">
            <span className="mr-3 text-sm font-semibold text-fostera-text-primary">Enable Limit</span>
            <div className="relative">
              <input type="checkbox" checked={enabled} onChange={e => setEnabled(e.target.checked)} className="sr-only" />
              <div className={`block w-12 h-7 rounded-full transition-colors ${enabled ? 'bg-fostera-brand' : 'bg-black/10'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${enabled ? 'transform translate-x-5' : ''}`}></div>
            </div>
          </label>
        </div>

        {enabled && (
          <div className="bg-fostera-warm rounded-[24px] p-6 text-center space-y-4">
             <div className="text-[13px] font-bold text-fostera-text-secondary uppercase tracking-wider">Daily Limit Amount</div>
             <div className="flex items-center justify-center space-x-6">
               <button onClick={() => setMinutes(Math.max(15, minutes - 15))} className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-xl font-bold shadow-sm active:scale-95">-</button>
               <div className="text-4xl font-extrabold text-fostera-focal w-24">{minutes}m</div>
               <button onClick={() => setMinutes(minutes + 15)} className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-xl font-bold shadow-sm active:scale-95">+</button>
             </div>
          </div>
        )}

        <div className="pt-2">
          <Button variant="primary" size="lg" onClick={handleSave} className="w-full">
            Save Limit
          </Button>
        </div>
      </div>
    </Modal>
  );
};
