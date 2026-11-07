import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface Props {
  onExit: () => void;
}

export const FocusModeView: React.FC<Props> = ({ onExit }) => {
  const [time, setTime] = useState(new Date());
  const [task, setTask] = useState('Write core architecture documentation');
  const [isDone, setIsDone] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 4-4-4 box breathing cycle
  useEffect(() => {
    const phases: ('Inhale' | 'Hold' | 'Exhale')[] = ['Inhale', 'Hold', 'Exhale'];
    let idx = 0;
    const breathTimer = setInterval(() => {
      idx = (idx + 1) % phases.length;
      setBreathPhase(phases[idx]);
    }, 4000);
    return () => clearInterval(breathTimer);
  }, []);

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-[85vh] flex flex-col justify-between items-center p-6 text-center text-slate-100 select-none">
      <div className="w-full flex justify-between items-center max-w-4xl">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-xs font-medium text-slate-300 border border-white/5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Dashboard</span>
        </button>

        <span className="text-[10px] font-mono tracking-widest text-indigo-400/80 uppercase">
          Zen Focus Mode
        </span>
      </div>

      {/* Main Focus Clock & Breath */}
      <div className="my-auto space-y-6">
        <div className="text-6xl sm:text-8xl font-extrabold font-mono tabular-nums tracking-tight text-white drop-shadow-2xl">
          {hours}:{minutes}
        </div>
        <p className="text-slate-400 text-sm sm:text-base font-medium">{dateStr}</p>

        {/* Breathing Orb */}
        <div className="py-4 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <div
              className={`w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-500/20 to-teal-500/20 border border-indigo-400/30 flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${
                breathPhase === 'Inhale'
                  ? 'scale-125 shadow-2xl shadow-indigo-500/20 border-indigo-400'
                  : breathPhase === 'Hold'
                  ? 'scale-125 border-teal-400'
                  : 'scale-90 opacity-70 border-slate-600'
              }`}
            >
              <span className="text-xs font-bold text-slate-200 tracking-wider uppercase font-mono">
                {breathPhase}
              </span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400 mt-3 font-mono">4-second rhythmic calming loop</span>
        </div>

        {/* Single Focus Task */}
        <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl">
          <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block mb-1">
            Current Primary Focus
          </span>
          <div className="flex items-center justify-between gap-3">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className={`w-full bg-transparent text-sm font-semibold text-slate-100 focus:outline-none ${
                isDone ? 'line-through text-slate-500' : ''
              }`}
            />
            <button
              onClick={() => setIsDone(!isDone)}
              className={`p-1.5 rounded-xl border transition-colors shrink-0 ${
                isDone
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
              title="Mark Complete"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 font-mono">
        No distractions · Deep work in progress
      </div>
    </div>
  );
};
