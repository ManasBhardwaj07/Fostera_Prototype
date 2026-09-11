import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { OnboardingFlow } from './features/onboarding/OnboardingFlow';
import { Dashboard } from './features/dashboard/Dashboard';
import { FocusView } from './features/focus/FocusView';
import { ProgressView } from './features/progress/ProgressView';
import { Navigation } from './components/Navigation';

// Modals
import { AppDetailModal } from './features/apps/AppDetailModal';
import { SetLimitModal } from './features/limits/SetLimitModal';
import { FocusCompletionModal } from './features/focus/FocusCompletionModal';
import { SchedulesModal } from './features/schedules/SchedulesModal';
import { ReductionModal } from './features/reduction/ReductionModal';
import { InsightsModal } from './features/insights/InsightsModal';
import { DevControlsModal } from './features/dev/DevControlsModal';

const AppContent: React.FC = () => {
  const { profile, activeTab } = useApp();

  // If onboarding is not completed, show onboarding flow
  if (!profile.onboardingComplete) {
    return <OnboardingFlow />;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start text-slate-100">
      {/* Mobile Shell Container */}
      <div className="w-full max-w-md min-h-screen bg-slate-950 shadow-2xl relative flex flex-col justify-between">
        <main className="flex-1">
          {activeTab === 'TODAY' && <Dashboard />}
          {activeTab === 'FOCUS' && <FocusView />}
          {activeTab === 'PROGRESS' && <ProgressView />}
        </main>

        {/* Global Navigation Bar */}
        <Navigation />

        {/* Global Modals & Overlays */}
        <AppDetailModal />
        <SetLimitModal />
        <FocusCompletionModal />
        <SchedulesModal />
        <ReductionModal />
        <InsightsModal />
        <DevControlsModal />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
