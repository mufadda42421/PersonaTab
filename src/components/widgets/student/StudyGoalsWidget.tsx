import React, { useState } from 'react';
import { Target, CheckCircle, Plus } from 'lucide-react';

interface GoalItem {
  id: string;
  text: string;
  targetMinutes: number;
  completed: boolean;
}

export const StudyGoalsWidget: React.FC = () => {
  const [goals, setGoals] = useState<GoalItem[]>([
    { id: '1', text: 'Read Chapter 4 (Calculus)', targetMinutes: 45, completed: true },
    { id: '2', text: 'Solve 10 LeetCode Easy', targetMinutes: 60, completed: false },
    { id: '3', text: 'Draft literature essay thesis', targetMinutes: 30, completed: false }
  ]);
  const [newText, setNewText] = useState('');

  const toggle = (id: string) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g)));
  };

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    setGoals([...goals, { id: Date.now().toString(), text: newText.trim(), targetMinutes: 30, completed: false }]);
    setNewText('');
  };

  const completedCount = goals.filter((g) => g.completed).length;
  const pct = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>Daily Study Goals</span>
          </div>
          <span className="font-mono text-emerald-400 font-bold">{pct}% Done</span>
        </div>

        <form onSubmit={add} className="flex gap-1 mb-2">
          <input
            type="text"
            placeholder="New study goal..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="flex-1 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            className="p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      <div className="space-y-1 flex-1 overflow-y-auto max-h-36 pr-1">
        {goals.map((g) => (
          <div
            key={g.id}
            onClick={() => toggle(g.id)}
            className={`p-1.5 rounded flex items-center justify-between cursor-pointer transition-colors border ${
              g.completed
                ? 'bg-emerald-950/30 border-emerald-900/40 text-slate-400 line-through'
                : 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-slate-700'
            }`}
          >
            <span className="truncate mr-2">{g.text}</span>
            <CheckCircle
              className={`w-3.5 h-3.5 shrink-0 ${
                g.completed ? 'text-emerald-400' : 'text-slate-600'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
