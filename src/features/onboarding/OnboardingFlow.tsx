import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';
import { Button, Card } from '../../components/common/UI';

export const OnboardingFlow = () => {
  const { completeOnboarding, apps } = useApp();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedGoal, setSelectedGoal] = useState<number>(240);
  const [isCustomGoal, setIsCustomGoal] = useState(false);
  const [customGoalInput, setCustomGoalInput] = useState('240');
  const [selectedDistractions, setSelectedDistractions] = useState<string[]>(['youtube', 'instagram']);

  const goalPresets = [
    { label: '3 Hours', minutes: 180, desc: 'Strict daily boundary' },
    { label: '4 Hours', minutes: 240, desc: 'Balanced baseline (Recommended)' },
    { label: '5 Hours', minutes: 300, desc: 'Gradual reduction ceiling' },
  ];

  const toggleDistraction = (appId: string) => {
    setSelectedDistractions(prev =>
      prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
    );
  };

  const handleFinish = () => {
    const goalToSave = isCustomGoal ? (parseInt(customGoalInput, 10) || 240) : selectedGoal;
    completeOnboarding(goalToSave, selectedDistractions);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
        {/* Header with Step Dots */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#2F855A] flex items-center justify-center font-bold text-white text-xs shadow-xs">
              F
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-900">Fostera</span>
          </div>

          <div className="flex space-x-1.5">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  step === i ? 'w-5 bg-[#2F855A]' : 'w-1.5 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="space-y-2">
              <span className="text-[11px] font-semibold tracking-wider text-[#2F855A] uppercase">
                Digital Well-Being
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 leading-snug">
                Take control of your screen.<br />
                <span className="text-slate-600">Take control of your time.</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Fostera helps you understand your digital behavior, sets calm boundaries, and intervenes before screen fatigue takes over.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <Card className="p-3.5 bg-slate-50 border-slate-200/80">
                <div className="font-semibold text-xs text-slate-800">Mindful Tracking</div>
                <div className="text-[11px] text-slate-500 mt-1">Automatic usage zones and pattern insights.</div>
              </Card>
              <Card className="p-3.5 bg-slate-50 border-slate-200/80">
                <div className="font-semibold text-xs text-slate-800">Focus Intervention</div>
                <div className="text-[11px] text-slate-500 mt-1">Temporary restrictions to defend deep work.</div>
              </Card>
            </div>
          </div>
        )}

        {/* Step 2: Daily Goal */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold tracking-wider text-[#2F855A] uppercase">Step 2 of 3</span>
              <h2 className="text-xl font-bold text-slate-900">Daily Screen-Time Goal</h2>
              <p className="text-xs text-slate-500">
                Set a daily target. Fostera will calculate your current zone and provide gentle nudges.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {goalPresets.map(preset => {
                const isSelected = !isCustomGoal && selectedGoal === preset.minutes;
                return (
                  <button
                    key={preset.minutes}
                    onClick={() => {
                      setSelectedGoal(preset.minutes);
                      setIsCustomGoal(false);
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {preset.label}
                      </div>
                      <div className={`text-xs ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {preset.desc}
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                        isSelected ? 'border-white bg-white text-slate-900' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && '✓'}
                    </div>
                  </button>
                );
              })}

              <button
                onClick={() => setIsCustomGoal(true)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isCustomGoal
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className={`font-semibold text-sm ${isCustomGoal ? 'text-white' : 'text-slate-900'}`}>
                    Custom Target
                  </div>
                  <div className={`text-xs ${isCustomGoal ? 'text-slate-300' : 'text-slate-500'}`}>
                    Specify target in minutes
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                    isCustomGoal ? 'border-white bg-white text-slate-900' : 'border-slate-300'
                  }`}
                >
                  {isCustomGoal && '✓'}
                </div>
              </button>

              {isCustomGoal && (
                <div className="pt-2">
                  <input
                    type="number"
                    value={customGoalInput}
                    onChange={e => setCustomGoalInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#2F855A]"
                    placeholder="e.g. 240 (4 hours)"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Distractions */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold tracking-wider text-[#2F855A] uppercase">Step 3 of 3</span>
              <h2 className="text-xl font-bold text-slate-900">Distracting Apps</h2>
              <p className="text-xs text-slate-500">
                Choose apps you frequently lose time in. Fostera prioritizes these for Focus Mode.
              </p>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {apps.map(app => {
                const isChecked = selectedDistractions.includes(app.appId);
                return (
                  <button
                    key={app.appId}
                    onClick={() => toggleDistraction(app.appId)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isChecked
                        ? 'bg-emerald-50/70 border-emerald-300 text-slate-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-700">
                        {app.appName.slice(0, 1)}
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-slate-900">{app.appName}</div>
                        <div className="text-[11px] text-slate-500">{formatMinutes(app.usageMinutes)} today</div>
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
          </div>
        )}

        {/* Footer Actions */}
        <div className="space-y-2 pt-2">
          {step < 3 ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep((step + 1) as 2 | 3)}
              className="w-full"
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={handleFinish}
              className="w-full"
            >
              Finish Setup & Enter Dashboard
            </Button>
          )}

          {step > 1 && (
            <button
              onClick={() => setStep((step - 1) as 1 | 2)}
              className="w-full text-center text-xs text-slate-400 hover:text-slate-600 transition-colors py-1.5"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
