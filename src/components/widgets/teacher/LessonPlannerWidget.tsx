import React, { useState } from 'react';
import { BookMarked, Save, Check } from 'lucide-react';

export const LessonPlannerWidget: React.FC = () => {
  const [topic, setTopic] = useState('Photosynthesis & Cellular Energy');
  const [grade, setGrade] = useState('Grade 9 Biology');
  const [objective, setObjective] = useState('Students will understand light-dependent reactions in thylakoid membranes.');
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <BookMarked className="w-4 h-4 text-sky-400" />
            <span>Lesson Plan Studio</span>
          </div>
          <button
            onClick={save}
            className="p-1 rounded bg-sky-600 hover:bg-sky-500 text-white flex items-center gap-1 px-1.5"
          >
            {saved ? <Check className="w-3 h-3 text-emerald-300" /> : <Save className="w-3 h-3" />}
            <span>Save</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1.5 mb-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Topic"
            className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-100 font-medium"
          />
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Class / Grade"
            className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-100"
          />
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-0.5">Core Objective</label>
          <textarea
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            rows={2}
            className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-200 text-[11px] resize-none"
          />
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between">
        <span>Curriculum: Active</span>
        <span>Estimated Duration: 45 min</span>
      </div>
    </div>
  );
};
