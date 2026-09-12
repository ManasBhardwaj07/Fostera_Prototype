import { useApp, AppProvider } from './context/AppContext';
import { Dashboard } from './features/dashboard/Dashboard';
import { FocusView } from './features/focus/FocusView';
import { ProgressView } from './features/progress/ProgressView';
import { Onboarding } from './features/onboarding/OnboardingFlow';
import { BottomNavigationBar } from './components/Navigation';
import { SettingsModal } from './features/settings/SettingsModal';
import { AppDetailModal } from './features/apps/AppDetailModal';
import { SetLimitModal } from './features/limits/SetLimitModal';
import { DevControlsModal } from './features/dev/DevControlsModal';
import { InsightsModal } from './features/insights/InsightsModal';
import { SchedulesModal } from './features/schedules/SchedulesModal';
import { ReductionModal } from './features/reduction/ReductionModal';
import { FocusCompletionModal } from './features/focus/FocusCompletionModal';

function AppContent() {
  const { activeTab, profile } = useApp();

  if (!profile.onboardingComplete) {
    return (
      <div className="w-full h-full min-h-screen sm:min-h-0 bg-fostera-bg flex flex-col">
        <Onboarding />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-fostera-bg relative overflow-hidden">
      {/* Scrollable Main Area */}
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 no-scrollbar relative">
        <div key={activeTab} className="view-enter">
          {activeTab === 'TODAY' && <Dashboard />}
          {activeTab === 'FOCUS' && <FocusView />}
          {activeTab === 'PROGRESS' && <ProgressView />}
        </div>
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNavigationBar />

      {/* Modals and Sheets */}
      <SettingsModal />
      <AppDetailModal />
      <SetLimitModal />
      <DevControlsModal />
      <InsightsModal />
      <SchedulesModal />
      <ReductionModal />
      <FocusCompletionModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      {/* Outer presentation backdrop: full viewport on mobile, centered canvas on desktop */}
      <div className="w-full min-h-screen bg-fostera-backdrop flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8 transition-colors duration-200">
        <div className="w-full h-[100dvh] sm:h-[880px] sm:max-h-[92vh] sm:max-w-[420px] bg-fostera-bg sm:rounded-[36px] sm:shadow-elevated sm:border sm:border-fostera-border relative flex flex-col overflow-hidden transition-colors duration-200">
          <AppContent />
        </div>
      </div>
    </AppProvider>
  );
}
