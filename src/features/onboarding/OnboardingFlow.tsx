import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { Card, Button } from '../../components/common/UI';
import { ArrowLeft, Check, Activity, ShieldAlert } from 'lucide-react';

export const Onboarding = () => {
  const { completeOnboarding, apps } = useApp();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedGoal, setSelectedGoal] = useState<number>(240);
  const [isCustomGoal, setIsCustomGoal] = useState(false);
  const [customGoalInput, setCustomGoalInput] = useState<string>('');
  const [selectedDistractions, setSelectedDistractions] = useState<string[]>(['youtube', 'instagram']);

  const goalPresets = [
    { minutes: 120, label: 'Strict', desc: 'Under 2 hours' },
    { minutes: 240, label: 'Balanced', desc: 'Under 4 hours' },
    { minutes: 360, label: 'Lenient', desc: 'Under 6 hours' },
  ];

  const toggleDistraction = (appId: string) => {
    setSelectedDistractions(prev => 
      prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
    );
  };

  const handleFinish = () => {
    const finalGoal = isCustomGoal ? parseInt(customGoalInput) || 240 : selectedGoal;
    completeOnboarding(finalGoal, selectedDistractions);
  };

  return (
    <div className="h-full bg-fostera-bg flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-sm space-y-8">
        
        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="space-y-8 text-center">
            <div className="space-y-3">
              <h1 className="text-[32px] leading-tight font-bold text-fostera-text-primary tracking-tight">
                Let's understand your digital habits.
              </h1>
              <p className="text-[15px] font-medium text-fostera-text-secondary leading-relaxed px-2">
                Fostera helps you measure behavior, set calm boundaries, and intervene before screen fatigue takes over.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
              <Card className="!p-4 bg-fostera-surface-soft border-0">
                <Activity size={20} className="text-fostera-brand mb-2" />
                <div className="font-bold text-sm text-fostera-text-primary">Mindful Tracking</div>
                <div className="text-xs font-medium text-fostera-text-secondary mt-1 leading-snug">Automatic usage zones and insights.</div>
              </Card>
              <Card className="!p-4 bg-fostera-surface-soft border-0">
                <ShieldAlert size={20} className="text-fostera-focal mb-2" />
                <div className="font-bold text-sm text-fostera-text-primary">Focus Modes</div>
                <div className="text-xs font-medium text-fostera-text-secondary mt-1 leading-snug">Restrictions to defend deep work.</div>
              </Card>
            </div>
          </div>
        )}

        {/* Step 2: Daily Goal */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold tracking-wider text-fostera-brand uppercase">Step 2 of 3</span>
              <h2 className="text-[28px] font-bold text-fostera-text-primary tracking-tight leading-tight">Daily Target</h2>
              <p className="text-sm font-medium text-fostera-text-secondary">
                Set a daily target. Fostera will provide gentle nudges based on this.
              </p>
            </div>

            <div className="space-y-3">
              {goalPresets.map(preset => {
                const isSelected = !isCustomGoal && selectedGoal === preset.minutes;
                return (
                  <button
                    key={preset.minutes}
                    onClick={() => { setSelectedGoal(preset.minutes); setIsCustomGoal(false); }}
                    className={`w-full p-4 rounded-[20px] transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-fostera-text-primary text-fostera-surface shadow-md'
                        : 'bg-fostera-surface border border-fostera-border text-fostera-text-primary hover:bg-fostera-surface-soft'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-bold text-[15px]">{preset.label}</div>
                      <div className={`text-xs font-medium mt-0.5 ${isSelected ? 'text-slate-400' : 'text-fostera-text-secondary'}`}>
                        {preset.desc}
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-fostera-surface text-fostera-text-primary' : 'bg-fostera-surface-soft border border-fostera-border'
                    }`}>
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </button>
                );
              })}

              <button
                onClick={() => setIsCustomGoal(true)}
                className={`w-full p-4 rounded-[20px] transition-all flex items-center justify-between ${
                  isCustomGoal
                    ? 'bg-fostera-text-primary text-fostera-surface shadow-md'
                    : 'bg-fostera-surface border border-fostera-border text-fostera-text-primary hover:bg-fostera-surface-soft'
                }`}
              >
                <div className="text-left">
                  <div className="font-bold text-[15px]">Custom Target</div>
                  <div className={`text-xs font-medium mt-0.5 ${isCustomGoal ? 'text-slate-400' : 'text-fostera-text-secondary'}`}>
                    Specify in minutes
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                  isCustomGoal ? 'bg-fostera-surface text-fostera-text-primary' : 'bg-fostera-surface-soft border border-fostera-border'
                }`}>
                  {isCustomGoal && <Check size={12} strokeWidth={3} />}
                </div>
              </button>

              {isCustomGoal && (
                <div className="pt-2 animate-fade-in">
                  <input
                    type="number"
                    value={customGoalInput}
                    onChange={e => setCustomGoalInput(e.target.value)}
                    className="w-full bg-fostera-surface border border-fostera-brand/50 focus:ring-2 focus:ring-fostera-brand rounded-[16px] px-4 py-3.5 text-[15px] font-bold text-fostera-text-primary outline-none transition-all"
                    placeholder="e.g. 240 (4 hours)"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Distractions */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold tracking-wider text-fostera-brand uppercase">Step 3 of 3</span>
              <h2 className="text-[28px] font-bold text-fostera-text-primary tracking-tight leading-tight">Identify Distractions</h2>
              <p className="text-sm font-medium text-fostera-text-secondary">
                Select apps you frequently lose time in. We'll prioritize these for Focus Mode.
              </p>
            </div>

            <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
              {apps.map(app => {
                const isChecked = selectedDistractions.includes(app.appId);
                return (
                  <button
                    key={app.appId}
                    onClick={() => toggleDistraction(app.appId)}
                    className={`w-full p-3.5 rounded-[20px] transition-all flex items-center justify-between ${
                      isChecked
                        ? 'bg-fostera-surface text-fostera-text-primary border border-fostera-brand shadow-sm ring-1 ring-fostera-brand/20'
                        : 'bg-transparent border border-fostera-border text-fostera-text-secondary hover:bg-fostera-surface-soft'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-10 h-10 rounded-[14px] bg-fostera-surface-soft flex items-center justify-center text-sm font-bold text-fostera-text-primary">
                        {app.appName.slice(0, 1)}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-[15px] text-fostera-text-primary">{app.appName}</div>
                        <div className="text-[11px] font-medium text-fostera-text-secondary mt-0.5">{formatMinutes(app.usageMinutes)} today</div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isChecked ? 'bg-fostera-brand border-fostera-brand text-white' : 'border-fostera-border bg-fostera-surface'
                    }`}>
                      {isChecked && <Check size={12} strokeWidth={3} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="space-y-4 pt-4 mt-auto">
          {step < 3 ? (
            <Button variant="primary" size="lg" onClick={() => setStep((step + 1) as 2 | 3)} className="w-full shadow-lg">
              Continue
            </Button>
          ) : (
            <Button variant="primary" size="lg" onClick={handleFinish} className="w-full shadow-lg">
              Enter Dashboard
            </Button>
          )}

          {step > 1 && (
            <button
              onClick={() => setStep((step - 1) as 1 | 2)}
              className="w-full text-center text-[13px] font-bold text-fostera-text-secondary hover:text-fostera-text-primary transition-colors flex items-center justify-center gap-1 py-2"
            >
              <ArrowLeft size={14} /> Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
