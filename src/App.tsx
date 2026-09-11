import { AppProvider, useApp } from './context/AppContext';
import { OnboardingFlow } from './features/onboarding/OnboardingFlow';
import { Dashboard } from './features/dashboard/Dashboard';
import { FocusView } from './features/focus/FocusView';
import { ProgressView } from './features/progress/ProgressView';
import { BottomNavigationBar } from './components/Navigation';

// Modals
import { AppDetailModal } from './features/apps/AppDetailModal';
import { SetLimitModal } from './features/limits/SetLimitModal';
import { FocusCompletionModal } from './features/focus/FocusCompletionModal';
import { SchedulesModal } from './features/schedules/SchedulesModal';
import { ReductionModal } from './features/reduction/ReductionModal';
import { InsightsModal } from './features/insights/InsightsModal';
import { DevControlsModal } from './features/dev/DevControlsModal';

const AppContent = () => {
  const { profile, activeTab, setIsDevModalOpen } = useApp();

  if (!profile.onboardingComplete) {
    return <OnboardingFlow />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-0 sm:p-4 md:p-8 overflow-hidden bg-[#e5e7eb]">
      {/* Mobile Application Canvas (max 430px wide) */}
      <div className="w-full h-[100dvh] sm:h-[850px] sm:max-h-[90vh] sm:max-w-[430px] bg-fostera-warm sm:rounded-[2.5rem] sm:shadow-2xl sm:ring-1 sm:ring-slate-900/5 relative flex flex-col overflow-hidden">
        
        {/* Mobile Header */}
        <header className="flex-none px-6 py-4 flex items-center justify-between bg-fostera-warm z-10 pt-safe">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-fostera-brand flex items-center justify-center font-bold text-white text-sm shadow-sm">
              F
            </div>
            <span className="font-bold tracking-tight text-fostera-text-primary text-lg">Fostera</span>
          </div>
          <button 
            onClick={() => setIsDevModalOpen(true)}
            className="w-8 h-8 flex items-center justify-center text-fostera-text-secondary hover:bg-black/5 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative pb-28">
          <div className="px-6 py-2">
            {activeTab === 'TODAY' && <Dashboard />}
            {activeTab === 'FOCUS' && <FocusView />}
            {activeTab === 'PROGRESS' && <ProgressView />}
          </div>
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNavigationBar />
      </div>

      {/* Global Modals (must also be constrained to look good on desktop) */}
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
