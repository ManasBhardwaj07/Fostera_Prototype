import { useApp } from '../../context/AppContext';
import { Modal, Button } from '../../components/common/UI';
import { Sun, Moon, Laptop, Sliders, Check, ShieldCheck } from 'lucide-react';
import type { ThemeMode } from '../../context/AppContext';

export const SettingsModal = () => {
  const {
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    themeMode,
    setThemeMode,
    profile,
    updateDailyGoal,
    setIsDevModalOpen,
  } = useApp();

  if (!isSettingsModalOpen) return null;

  const themeOptions: { id: ThemeMode; label: string; icon: typeof Sun }[] = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Laptop },
  ];

  const goalOptions = [
    { minutes: 180, label: '3 Hours' },
    { minutes: 240, label: '4 Hours' },
    { minutes: 300, label: '5 Hours' },
  ];

  return (
    <Modal
      isOpen={isSettingsModalOpen}
      onClose={() => setIsSettingsModalOpen(false)}
      title="Settings"
      subtitle="Preferences and prototype controls"
      position="bottom"
    >
      <div className="space-y-6 pt-1">
        {/* 1. Appearance / Theme */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-fostera-text-secondary">
              Appearance
            </label>
            <span className="text-[11px] text-fostera-text-secondary capitalize font-medium">
              {themeMode} mode active
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 p-1 bg-fostera-surface-soft rounded-2xl border border-fostera-border">
            {themeOptions.map(opt => {
              const Icon = opt.icon;
              const isSelected = themeMode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setThemeMode(opt.id)}
                  className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-xl text-xs font-semibold transition-all select-none ${
                    isSelected
                      ? 'bg-fostera-surface text-fostera-text-primary shadow-sm ring-1 ring-fostera-border'
                      : 'text-fostera-text-secondary hover:text-fostera-text-primary hover:bg-fostera-surface/50'
                  }`}
                  aria-pressed={isSelected}
                >
                  <Icon size={16} className={`mb-1.5 ${isSelected ? 'text-fostera-brand' : 'opacity-70'}`} />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Daily Goal Target */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-fostera-text-secondary">
              Daily Target
            </label>
            <span className="text-[11px] font-semibold text-fostera-brand">
              {Math.floor(profile.dailyGoalMinutes / 60)}h goal
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {goalOptions.map(opt => {
              const isSelected = profile.dailyGoalMinutes === opt.minutes;
              return (
                <button
                  key={opt.minutes}
                  type="button"
                  onClick={() => updateDailyGoal(opt.minutes)}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-fostera-brand-soft border-fostera-brand/30 text-fostera-brand-dark'
                      : 'bg-fostera-surface border-fostera-border text-fostera-text-secondary hover:text-fostera-text-primary hover:bg-fostera-surface-soft'
                  }`}
                >
                  {isSelected && <Check size={13} strokeWidth={3} />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Scenario & Dev Controls (Moved from consumer home screen) */}
        <div className="pt-3 border-t border-fostera-border space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-fostera-text-secondary mb-1">
            Assessment Environment
          </div>
          
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              setIsSettingsModalOpen(false);
              setIsDevModalOpen(true);
            }}
            className="w-full justify-between !py-3 !text-xs !bg-fostera-surface-soft !border-fostera-border hover:!bg-fostera-surface"
          >
            <div className="flex items-center gap-2 text-fostera-text-primary font-semibold">
              <Sliders size={15} className="text-fostera-text-secondary" />
              <span>Telemetry Scenario & Reset Controls</span>
            </div>
            <span className="text-[11px] text-fostera-text-secondary font-medium">Manage &rarr;</span>
          </Button>
        </div>

        {/* 4. Prototype info */}
        <div className="pt-1 text-center space-y-1 pb-1">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-fostera-text-secondary opacity-80">
            <ShieldCheck size={13} className="text-fostera-brand" />
            <span>Fostera Prototype • Pre-joining Assessment</span>
          </div>
          <p className="text-[10px] text-fostera-text-secondary opacity-60">
            Measure &rarr; Understand &rarr; Intervene &rarr; Reward
          </p>
        </div>
      </div>
    </Modal>
  );
};
