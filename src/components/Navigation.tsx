import { useApp } from '../context/AppContext';
import type { NavigationTab } from '../types';
import { TodayIcon, FocusIcon, ProgressIcon } from './common/Icons';

export const BottomNavigationBar = () => {
  const { activeTab, setActiveTab, activeFocus } = useApp();

  const tabs: { id: NavigationTab; label: string; icon: typeof TodayIcon }[] = [
    { id: 'TODAY', label: 'Today', icon: TodayIcon },
    { id: 'FOCUS', label: 'Focus', icon: FocusIcon },
    { id: 'PROGRESS', label: 'Progress', icon: ProgressIcon },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-fostera-warm/95 backdrop-blur-xl border-t border-black/5 px-6 pb-6 pt-3 z-40 flex items-center justify-around">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        const hasActiveFocus = tab.id === 'FOCUS' && activeFocus?.status === 'active';

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-col items-center justify-center py-2 px-6 rounded-2xl transition-all duration-200 ${
              isActive ? 'text-fostera-brand' : 'text-fostera-text-secondary hover:text-fostera-text-primary'
            }`}
          >
            {isActive && (
              <div className="absolute inset-0 bg-fostera-brand-soft rounded-xl -z-10 animate-fade-in" />
            )}
            
            <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-fostera-brand' : 'text-fostera-text-secondary'}`} />
            <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>

            {hasActiveFocus && (
              <span className="absolute top-2 right-4 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
