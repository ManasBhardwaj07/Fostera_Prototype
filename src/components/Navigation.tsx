import { useApp } from '../context/AppContext';
import type { NavigationTab } from '../types';
import { Home, Focus, BarChart2 } from 'lucide-react';

export const BottomNavigationBar = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs: { id: NavigationTab; label: string; icon: any }[] = [
    { id: 'TODAY', label: 'Today', icon: Home },
    { id: 'FOCUS', label: 'Focus', icon: Focus },
    { id: 'PROGRESS', label: 'Progress', icon: BarChart2 },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-fostera-surface/90 backdrop-blur-md border-t border-fostera-border pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center w-16 pt-2 pb-1 transition-colors ${
                isActive ? 'text-fostera-brand font-semibold' : 'text-fostera-text-secondary hover:text-fostera-text-primary'
              }`}
            >
              <div className={`mb-1 p-1.5 rounded-full transition-colors ${isActive ? 'bg-fostera-brand-soft text-fostera-brand-dark' : 'bg-transparent'}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] tracking-wide">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
