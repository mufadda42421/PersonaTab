import React, { useState } from 'react';
import { Briefcase, Plus, Check } from 'lucide-react';

interface Project {
  id: string;
  client: string;
  amount: number;
  stage: 'Lead' | 'Active' | 'Review' | 'Paid';
}

export const ProjectPipelineWidget: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', client: 'Acme SaaS Redesign', amount: 4800, stage: 'Active' },
    { id: '2', client: 'Fintech API Docs', amount: 1600, stage: 'Review' },
    { id: '3', client: 'Mobile Flutter App', amount: 6200, stage: 'Paid' }
  ]);

  const totalValue = projects.reduce((s, p) => s + p.amount, 0);

  const cycleStage = (id: string) => {
    const stages: Project['stage'][] = ['Lead', 'Active', 'Review', 'Paid'];
    setProjects(
      projects.map((p) => {
        if (p.id === id) {
          const nextIdx = (stages.indexOf(p.stage) + 1) % stages.length;
          return { ...p, stage: stages[nextIdx] };
        }
        return p;
      })
    );
  };

  const stageBadge = (stage: Project['stage']) => {
    switch (stage) {
      case 'Paid': return 'bg-emerald-950 text-emerald-400 border-emerald-800';
      case 'Review': return 'bg-amber-950 text-amber-400 border-amber-800';
      case 'Active': return 'bg-teal-950 text-teal-400 border-teal-800';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Briefcase className="w-4 h-4 text-teal-400" />
            <span>Client Project Pipeline</span>
          </div>
          <div className="text-right font-mono">
            <span className="text-[10px] text-slate-400 block">Total Pipeline</span>
            <span className="text-sm font-bold text-teal-400">${totalValue.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => cycleStage(p.id)}
              className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors"
            >
              <div className="truncate mr-2">
                <div className="text-slate-100 font-medium truncate">{p.client}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Click to advance stage</div>
              </div>
              <div className="flex items-center gap-2 font-mono shrink-0">
                <span className="text-slate-200 font-semibold">${p.amount.toLocaleString()}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${stageBadge(p.stage)}`}>
                  {p.stage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
