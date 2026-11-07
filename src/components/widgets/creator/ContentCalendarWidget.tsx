import React, { useState } from 'react';
import { Calendar, Video, Clock } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  stage: 'Scripting' | 'Filming' | 'Editing' | 'Scheduled';
  date: string;
}

export const ContentCalendarWidget: React.FC = () => {
  const [items] = useState<ContentItem[]>([
    { id: '1', title: 'Why Everyone Is Learning Rust in 2025', stage: 'Editing', date: 'Sunday' },
    { id: '2', title: 'Top 5 Productivity Chrome Extensions', stage: 'Scheduled', date: 'Wednesday' },
    { id: '3', title: 'Behind the Scenes: My Minimal Desk Tour', stage: 'Scripting', date: 'Next Week' }
  ]);

  const stageColor = (stage: string) => {
    switch (stage) {
      case 'Scheduled': return 'bg-emerald-950 text-emerald-400 border-emerald-800';
      case 'Editing': return 'bg-indigo-950 text-indigo-400 border-indigo-800';
      case 'Filming': return 'bg-amber-950 text-amber-400 border-amber-800';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Content Production Calendar</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Q1 Schedule</span>
        </div>

        <div className="space-y-1.5">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between"
            >
              <div className="truncate mr-2">
                <div className="text-slate-100 font-medium truncate">{item.title}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Target: {item.date}</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${stageColor(item.stage)}`}>
                {item.stage}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
