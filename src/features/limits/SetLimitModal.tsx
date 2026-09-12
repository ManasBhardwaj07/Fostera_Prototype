import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { Modal, Button } from '../../components/common/UI';
import { Minus, Plus } from 'lucide-react';

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
      title={`Limit ${selectedAppForLimit.appName}`}
      position="bottom"
    >
      <div className="space-y-8">
        
        <div className="flex justify-between items-center bg-fostera-surface-soft p-4 rounded-[20px]">
          <div>
            <div className="text-[11px] font-bold text-fostera-text-secondary uppercase tracking-wider">Current Usage</div>
            <div className="text-lg font-bold text-fostera-text-primary mt-0.5">{formatMinutes(selectedAppForLimit.usageMinutes)}</div>
          </div>
          <label className="flex items-center cursor-pointer select-none">
            <span className="mr-3 text-[13px] font-bold text-fostera-text-primary">Enable</span>
            <div className="relative">
              <input type="checkbox" checked={enabled} onChange={e => setEnabled(e.target.checked)} className="sr-only" />
              <div className={`block w-12 h-7 rounded-full transition-colors ${enabled ? 'bg-fostera-brand' : 'bg-fostera-border'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform shadow-sm ${enabled ? 'transform translate-x-5' : ''}`}></div>
            </div>
          </label>
        </div>

        {enabled && (
          <div className="text-center space-y-6">
             <div className="text-[12px] font-bold text-fostera-text-secondary uppercase tracking-wider">Daily Limit Amount</div>
             <div className="flex items-center justify-center space-x-6">
               <button onClick={() => setMinutes(Math.max(15, minutes - 15))} className="w-14 h-14 rounded-full bg-fostera-surface-soft hover:bg-fostera-border flex items-center justify-center transition-colors active:scale-95 text-fostera-text-primary">
                 <Minus size={24} />
               </button>
               <div className="text-[3.5rem] leading-none font-extrabold tracking-tighter text-fostera-text-primary w-28 tabular-nums">
                 {minutes}<span className="text-2xl text-fostera-text-secondary font-bold">m</span>
               </div>
               <button onClick={() => setMinutes(minutes + 15)} className="w-14 h-14 rounded-full bg-fostera-surface-soft hover:bg-fostera-border flex items-center justify-center transition-colors active:scale-95 text-fostera-text-primary">
                 <Plus size={24} />
               </button>
             </div>
          </div>
        )}

        <div className="pt-4">
          <Button variant="primary" size="lg" onClick={handleSave} className="w-full shadow-md">
            Save Limit
          </Button>
        </div>
      </div>
    </Modal>
  );
};
