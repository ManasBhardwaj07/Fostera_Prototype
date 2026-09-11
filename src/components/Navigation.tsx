import { useApp } from '../context/AppContext';
import type { NavigationTab } from '../types';
import { TodayIcon, FocusIcon, ProgressIcon, SettingsIcon } from './common/Icons';

export const DesktopSidebar = () => {
  const { activeTab, setActiveTab, activeFocus, setIsDevModalOpen } = useApp();

  const tabs: { id: NavigationTab; label: string; icon: typeof TodayIcon }[] = [
    { id: 'TODAY', label: 'Today', icon: TodayIcon },
    { id: 'FOCUS', label: 'Focus Mode', icon: FocusIcon },
    { id: 'PROGRESS', label: 'Progress & Habits', icon: ProgressIcon },
  ];

  return (
    <aside className="hidden md:flex flex-col justify-between w-60 bg-white border-r border-slate-200/90 h-screen sticky top-0 p-5 select-none shrink-0">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center space-x-3 px-2 pt-1">
          <div className="w-8 h-8 rounded-lg bg-[#2F855A] flex items-center justify-center font-bold text-white shadow-xs">
            F
          </div>
          <div>
            <div className="font-bold text-base tracking-tight text-slate-900 leading-tight">Fostera</div>
            <div className="text-[11px] text-slate-500 font-medium">Digital Well-Being</div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5 pt-2">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            const hasActiveFocus = tab.id === 'FOCUS' && activeFocus?.status === 'active';

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </div>

                {hasActiveFocus && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Settings & Telemetry Status */}
      <div className="pt-4 border-t border-slate-100 space-y-2">
        <button
          onClick={() => setIsDevModalOpen(true)}
          className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <SettingsIcon className="w-4 h-4" />
          <span>System Controls</span>
        </button>

        <div className="px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100 text-[10px] text-slate-400 leading-tight">
          Telemetry: MockProvider<br />
          Deterministic: 4h 32m
        </div>
      </div>
    </aside>
  );
};

export const MobileNavigation = () => {
  const { activeTab, setActiveTab, activeFocus } = useApp();

  const tabs: { id: NavigationTab; label: string; icon: typeof TodayIcon }[] = [
    { id: 'TODAY', label: 'Today', icon: TodayIcon },
    { id: 'FOCUS', label: 'Focus', icon: FocusIcon },
    { id: 'PROGRESS', label: 'Progress', icon: ProgressIcon },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-6 py-2 z-40 flex items-center justify-around">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        const hasActiveFocus = tab.id === 'FOCUS' && activeFocus?.status === 'active';

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-col items-center justify-center py-1 px-4 rounded-lg transition-colors ${
              isActive ? 'text-[#2F855A] font-semibold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-[#2F855A]' : 'text-slate-500'}`} />
            <span className="text-[11px] tracking-tight">{tab.label}</span>

            {hasActiveFocus && (
              <span className="absolute top-1 right-2 flex h-2 w-2">
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
