import { useApp } from '../context/AppContext';
import type { NavigationTab } from '../types';

export const Navigation = () => {
  const { activeTab, setActiveTab, activeFocus } = useApp();

  const tabs: { id: NavigationTab; label: string; icon: string }[] = [
    { id: 'TODAY', label: 'Today', icon: '📊' },
    { id: 'FOCUS', label: 'Focus', icon: '🎯' },
    { id: 'PROGRESS', label: 'Progress', icon: '🏆' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 px-6 py-2.5 z-40 flex items-center justify-around">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const hasActiveFocus = tab.id === 'FOCUS' && activeFocus?.status === 'active';

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all duration-200 ${
              isActive ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-xl mb-0.5">{tab.icon}</span>
            <span className="text-xs tracking-wide uppercase font-medium">{tab.label}</span>

            {isActive && (
              <span className="absolute -top-1 w-6 h-0.5 bg-indigo-500 rounded-full animate-pulse" />
            )}

            {hasActiveFocus && (
              <span className="absolute top-1 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
