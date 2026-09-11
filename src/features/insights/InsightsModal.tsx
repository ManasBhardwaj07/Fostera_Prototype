import { useApp } from '../../context/AppContext';

export const InsightsModal = () => {
  const { isInsightsModalOpen, setIsInsightsModalOpen, insights, setActiveTab, setSelectedAppForLimit, apps } = useApp();

  if (!isInsightsModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4 animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl md:rounded-3xl p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Deterministic AI Coach</span>
            <h2 className="text-xl font-bold text-white">Actionable Insights</h2>
          </div>
          <button
            onClick={() => setIsInsightsModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          {insights.map(ins => (
            <div key={ins.id} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-100 text-sm">{ins.title}</h3>
                <span className="text-xs">{ins.type === 'alert' ? '🚨' : '💡'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{ins.description}</p>
              {ins.actionLabel && (
                <div className="pt-1">
                  <button
                    onClick={() => {
                      setIsInsightsModalOpen(false);
                      if (ins.actionType === 'focus') setActiveTab('FOCUS');
                      else if (ins.actionType === 'progress') setActiveTab('PROGRESS');
                      else if (ins.actionType === 'limit') {
                        const target = apps.find(a => a.appId === (ins.targetAppId || 'youtube'));
                        if (target) setSelectedAppForLimit(target);
                      }
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold"
                  >
                    {ins.actionLabel} →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
