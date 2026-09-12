import { useApp } from '../context/AppContext';
import type { NavigationTab } from '../types';
import { Home, Focus, BarChart2 } from 'lucide-react';

export const BottomNavigationBar = () => {
  const { activeTab, setActiveTab, activeFocus } = useApp();

  const tabs: { id: NavigationTab; label: string; icon: typeof Home }[] = [
    { id: 'TODAY', label: 'Today', icon: Home },
    { id: 'FOCUS', label: 'Focus', icon: Focus },
    { id: 'PROGRESS', label: 'Progress', icon: BarChart2 },
  ];

  return (
    <nav
      role="tablist"
      aria-label="Primary destinations"
      className="absolute bottom-0 left-0 right-0 bg-fostera-surface/95 backdrop-blur-lg border-t border-fostera-border z-30 transition-colors duration-150 pb-[max(env(safe-area-inset-bottom),10px)] pt-1.5 shadow-[0_-2px_12px_-2px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center justify-around px-4 max-w-[420px] mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          const hasFocusSession = tab.id === 'FOCUS' && activeFocus?.status === 'active';

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 px-3 rounded-2xl transition-all duration-150 relative select-none active:scale-95 ${
                isActive
                  ? 'text-fostera-brand'
                  : 'text-fostera-text-secondary hover:text-fostera-text-primary'
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-7 rounded-full transition-all duration-200 relative ${
                  isActive
                    ? 'bg-fostera-brand-soft text-fostera-brand-dark dark:text-emerald-300'
                    : 'text-fostera-text-secondary'
                }`}
              >
                <Icon size={19} strokeWidth={isActive ? 2.4 : 1.9} />
                {hasFocusSession && (
                  <span className="absolute top-0 right-0 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] mt-0.5 tracking-tight transition-colors ${
                  isActive ? 'font-bold text-fostera-text-primary' : 'font-medium text-fostera-text-secondary'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
