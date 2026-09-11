import { AppProvider, useApp } from './context/AppContext';
import { OnboardingFlow } from './features/onboarding/OnboardingFlow';
import { Dashboard } from './features/dashboard/Dashboard';
import { FocusView } from './features/focus/FocusView';
import { ProgressView } from './features/progress/ProgressView';
import { DesktopSidebar, MobileNavigation } from './components/Navigation';

// Modals
import { AppDetailModal } from './features/apps/AppDetailModal';
import { SetLimitModal } from './features/limits/SetLimitModal';
import { FocusCompletionModal } from './features/focus/FocusCompletionModal';
import { SchedulesModal } from './features/schedules/SchedulesModal';
import { ReductionModal } from './features/reduction/ReductionModal';
import { InsightsModal } from './features/insights/InsightsModal';
import { DevControlsModal } from './features/dev/DevControlsModal';

const AppContent = () => {
  const { profile, activeTab } = useApp();

  if (!profile.onboardingComplete) {
    return <OnboardingFlow />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col md:flex-row antialiased">
      {/* Desktop Left Sidebar */}
      <DesktopSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
          {activeTab === 'TODAY' && <Dashboard />}
          {activeTab === 'FOCUS' && <FocusView />}
          {activeTab === 'PROGRESS' && <ProgressView />}
        </main>

        {/* Mobile Persistent Bottom Navigation */}
        <MobileNavigation />
      </div>

      {/* Global Modals */}
      <AppDetailModal />
      <SetLimitModal />
      <FocusCompletionModal />
      <SchedulesModal />
      <ReductionModal />
      <InsightsModal />
      <DevControlsModal />
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
