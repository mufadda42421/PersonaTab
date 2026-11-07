import React, { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

const FACTS = [
  { topic: 'Outer Space 🚀', text: 'One day on Venus is longer than one whole year on Earth! Venus spins backward very slowly.' },
  { topic: 'Dinosaurs 🦕', text: 'Some dinosaurs were smaller than chickens, while the Argentinosaurus was as long as three school buses!' },
  { topic: 'Deep Oceans 🐙', text: 'Octopuses have THREE hearts, and their blood is royal blue because it carries copper instead of iron!' },
  { topic: 'Animals 🦒', text: 'A giraffe’s tongue is over 45 centimeters (18 inches) long and dark purple to protect it from sunburn!' }
];

export const KidsScienceFact: React.FC = () => {
  const [idx, setIdx] = useState(0);

  const next = () => {
    setIdx((prev) => (prev + 1) % FACTS.length);
  };

  const fact = FACTS[idx];

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Amazing Science Fact</span>
          </div>
          <button
            onClick={next}
            className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300"
            title="Next fact"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-950/70 to-slate-900 border border-amber-500/30">
          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide">
            {fact.topic}
          </span>
          <p className="text-slate-100 text-xs mt-1.5 leading-relaxed font-medium">
            {fact.text}
          </p>
        </div>
      </div>
    </div>
  );
};
