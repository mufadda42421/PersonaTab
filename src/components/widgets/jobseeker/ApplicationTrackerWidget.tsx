import React, { useState } from 'react';
import { Briefcase, Building2, Plus } from 'lucide-react';

interface Application {
  id: string;
  company: string;
  role: string;
  stage: 'Applied' | 'Screen' | 'Technical' | 'Final' | 'Offer';
  date: string;
}

export const ApplicationTrackerWidget: React.FC = () => {
  const [apps, setApps] = useState<Application[]>([
    { id: '1', company: 'Linear', role: 'Staff Frontend Engineer', stage: 'Technical', date: '3d ago' },
    { id: '2', company: 'Vercel', role: 'Solutions Architect', stage: 'Screen', date: '5d ago' },
    { id: '3', company: 'Stripe', role: 'Senior Product Engineer', stage: 'Applied', date: '1w ago' }
  ]);

  const cycleStage = (id: string) => {
    const stages: Application['stage'][] = ['Applied', 'Screen', 'Technical', 'Final', 'Offer'];
    setApps(
      apps.map((a) => {
        if (a.id === id) {
          const nextIdx = (stages.indexOf(a.stage) + 1) % stages.length;
          return { ...a, stage: stages[nextIdx] };
        }
        return a;
      })
    );
  };

  const stageBadge = (stage: Application['stage']) => {
    switch (stage) {
      case 'Offer': return 'bg-emerald-950 text-emerald-400 border-emerald-800';
      case 'Final': return 'bg-purple-950 text-purple-400 border-purple-800';
      case 'Technical': return 'bg-orange-950 text-orange-400 border-orange-800';
      case 'Screen': return 'bg-blue-950 text-blue-400 border-blue-800';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Briefcase className="w-4 h-4 text-orange-400" />
            <span>Job Application Pipeline</span>
          </div>
          <span className="font-mono text-[10px] text-orange-400">{apps.length} Active Searches</span>
        </div>

        <div className="space-y-1.5">
          {apps.map((a) => (
            <div
              key={a.id}
              onClick={() => cycleStage(a.id)}
              className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors"
            >
              <div className="truncate mr-2">
                <div className="text-slate-100 font-semibold truncate flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-500" />
                  <span>{a.company}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">{a.role}</div>
              </div>
              <div className="flex items-center gap-2 font-mono shrink-0">
                <span className="text-[10px] text-slate-500">{a.date}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${stageBadge(a.stage)}`}>
                  {a.stage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
