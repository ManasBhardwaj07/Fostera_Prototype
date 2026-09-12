import { useEffect, useState } from 'react';
import { useApp, AppProvider } from './context/AppContext';
import { Dashboard } from './features/dashboard/Dashboard';
import { FocusView } from './features/focus/FocusView';
import { ProgressView } from './features/progress/ProgressView';
import { Onboarding } from './features/onboarding/OnboardingFlow';
import { BottomNavigationBar } from './components/Navigation';
import { AppDetailModal } from './features/apps/AppDetailModal';
import { SetLimitModal } from './features/limits/SetLimitModal';
import { DevControlsModal } from './features/dev/DevControlsModal';
import { InsightsModal } from './features/insights/InsightsModal';
import { SchedulesModal } from './features/schedules/SchedulesModal';
import { ReductionModal } from './features/reduction/ReductionModal';
import { Moon, Sun } from 'lucide-react';

function AppContent() {
  const { activeTab, profile } = useApp();

  if (!profile.onboardingComplete) {
    return <Onboarding />;
  }

  return (
    <div className="flex flex-col h-full bg-fostera-bg">
      <main className="flex-1 overflow-y-auto px-4 pt-6 pb-24">
        {activeTab === 'TODAY' && <Dashboard />}
        {activeTab === 'FOCUS' && <FocusView />}
        {activeTab === 'PROGRESS' && <ProgressView />}
      </main>
      
      <BottomNavigationBar />
      
      <AppDetailModal />
      <SetLimitModal />
      <DevControlsModal />
      <InsightsModal />
      <SchedulesModal />
      <ReductionModal />
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <AppProvider>
      <div className="min-h-screen bg-fostera-bg flex justify-center w-full transition-colors duration-300">
        <div className="w-full max-w-[430px] shadow-2xl relative overflow-hidden flex flex-col h-screen border-x border-fostera-border">
          
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-6 right-4 z-40 w-10 h-10 rounded-full bg-fostera-surface-soft text-fostera-text-secondary flex items-center justify-center hover:bg-fostera-surface border border-fostera-border shadow-sm transition-all"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <AppContent />
        </div>
      </div>
    </AppProvider>
  );
}