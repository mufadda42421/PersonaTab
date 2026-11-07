import React, { useState } from 'react';
import { Lightbulb, Sparkles, Copy, Check } from 'lucide-react';

interface IdeaTemplate {
  niche: string;
  hook: string;
  concept: string;
}

const IDEAS: IdeaTemplate[] = [
  { niche: 'Tech & Dev', hook: '“I spent 7 days rewriting this in Rust — here’s the brutal truth.”', concept: 'Build a before/after benchmark comparison emphasizing real performance vs developer ergonomics.' },
  { niche: 'Productivity', hook: '“Stop using 10 productivity apps. Use this 1 setup instead.”', concept: 'Minimalist system teardown showing how friction reduces follow-through.' },
  { niche: 'Finance / Startup', hook: '“How a solo founder reached $15k/MRR with 0 employees.”', concept: 'Deconstruct the tech stack, pricing tier strategy, and distribution loop.' },
  { niche: 'Design / Creative', hook: '“Why 90% of landing pages feel cheap (and the 2 fixes).”', concept: 'Walk through spacing ratio math and anti-pill typography discipline.' }
];

export const IdeaSparkWidget: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const idea = IDEAS[selectedIdx];

  const roll = () => {
    setSelectedIdx((prev) => (prev + 1) % IDEAS.length);
  };

  const copy = () => {
    navigator.clipboard.writeText(`${idea.hook}\nConcept: ${idea.concept}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Video & Hook Idea Spark</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={roll}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Next idea"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </button>
            <button
              onClick={copy}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Copy hook"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-semibold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded">
            {idea.niche}
          </span>
          <p className="text-slate-100 font-bold text-xs mt-2 italic leading-relaxed">
            {idea.hook}
          </p>
          <p className="text-slate-400 text-[11px] mt-2 leading-relaxed">
            {idea.concept}
          </p>
        </div>
      </div>
    </div>
  );
};
