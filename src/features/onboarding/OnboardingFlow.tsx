import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatMinutes } from '../../utils/format';

export const OnboardingFlow = () => {
  const { completeOnboarding, apps } = useApp();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedGoal, setSelectedGoal] = useState<number>(240);
  const [isCustomGoal, setIsCustomGoal] = useState(false);
  const [customGoalInput, setCustomGoalInput] = useState('240');
  const [selectedDistractions, setSelectedDistractions] = useState<string[]>(['youtube', 'instagram']);

  const goalPresets = [
    { label: '3 Hours', minutes: 180, desc: 'Strict & focused' },
    { label: '4 Hours', minutes: 240, desc: 'Balanced baseline (Recommended)' },
    { label: '5 Hours', minutes: 300, desc: 'Gradual adaptation' },
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 max-w-md mx-auto relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between pt-4 pb-8 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
            F
          </div>
          <span className="text-sm font-semibold tracking-wider uppercase text-slate-300">Fostera</span>
        </div>
        <div className="flex space-x-1.5">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === i ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="flex-1 flex flex-col justify-center space-y-6 z-10 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium w-fit">
            <span>✨</span>
            <span>Digital Well-Being & Productivity</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-white leading-tight">
              Take control of your screen.<br />
              <span className="text-indigo-400">Take control of your time.</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Fostera goes beyond passive tracking. It understands your digital habits, actively intervenes during distraction loops, and rewards true focus.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
              <span className="text-xl">🎯</span>
              <h3 className="text-sm font-semibold text-slate-200 mt-2">Active Intervention</h3>
              <p className="text-xs text-slate-400 mt-1">Focus Mode & smart limits before fatigue sets in.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
              <span className="text-xl">🏆</span>
              <h3 className="text-sm font-semibold text-slate-200 mt-2">Habit Rewards</h3>
              <p className="text-xs text-slate-400 mt-1">Streaks, milestones, and measurable progress.</p>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col justify-center space-y-6 z-10 animate-fade-in">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">Step 2 of 3</span>
            <h2 className="text-2xl font-bold text-white">Daily Screen-Time Goal</h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Define your personal daily ceiling. Fostera calculates your real-time Zone and nudges you before you cross it.
            </p>
          </div>

          <div className="space-y-3">
            {goalPresets.map(preset => {
              const isSelected = !isCustomGoal && selectedGoal === preset.minutes;
              return (
                <button
                  key={preset.minutes}
                  onClick={() => {
                    setSelectedGoal(preset.minutes);
                    setIsCustomGoal(false);
                  }}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-600/15 border-indigo-500/60 shadow-lg shadow-indigo-600/10'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-slate-100 text-base">{preset.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{preset.desc}</div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-indigo-500 bg-indigo-500 text-white text-xs' : 'border-slate-700'
                    }`}
                  >
                    {isSelected && '✓'}
                  </div>
                </button>
              );
            })}

            <button
              onClick={() => setIsCustomGoal(true)}
              className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                isCustomGoal
                  ? 'bg-indigo-600/15 border-indigo-500/60'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="font-semibold text-slate-100 text-base">Custom Goal</div>
                <div className="text-xs text-slate-400 mt-0.5">Specify your target in minutes</div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isCustomGoal ? 'border-indigo-500 bg-indigo-500 text-white text-xs' : 'border-slate-700'
                }`}
              >
                {isCustomGoal && '✓'}
              </div>
            </button>

            {isCustomGoal && (
              <div className="pt-2 px-1">
                <label className="text-xs text-slate-400 block mb-1">Target in minutes:</label>
                <input
                  type="number"
                  value={customGoalInput}
                  onChange={e => setCustomGoalInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. 240 (4 hours)"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex-1 flex flex-col justify-center space-y-6 z-10 animate-fade-in">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">Step 3 of 3</span>
            <h2 className="text-2xl font-bold text-white">Identify Distractions</h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Select apps that consume most of your attention. Fostera will prioritize limits and Focus Mode protection for these.
            </p>
          </div>

          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {apps.map(app => {
              const isSelected = selectedDistractions.includes(app.appId);
              return (
                <button
                  key={app.appId}
                  onClick={() => toggleDistraction(app.appId)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    isSelected
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
                      <div className="text-xs text-slate-400">Typical: {formatMinutes(app.usageMinutes)} today</div>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs ${
                      isSelected ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700'
                    }`}
                  >
                    {isSelected && '✓'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="pt-6 z-10 space-y-3">
        {step < 3 ? (
          <button
            onClick={() => setStep((step + 1) as 2 | 3)}
            className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all active:scale-[0.99] flex items-center justify-center space-x-2"
          >
            <span>Continue</span>
            <span>→</span>
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/25 transition-all active:scale-[0.99] flex items-center justify-center space-x-2"
          >
            <span>Enter Fostera Dashboard</span>
            <span>✓</span>
          </button>
        )}

        {step > 1 && (
          <button
            onClick={() => setStep((step - 1) as 1 | 2)}
            className="w-full py-2 text-center text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
};
