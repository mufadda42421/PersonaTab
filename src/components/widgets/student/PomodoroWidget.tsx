import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Coffee } from 'lucide-react';

export const PomodoroWidget: React.FC = () => {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(3);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (mode === 'work') {
        setCompletedSessions((c) => c + 1);
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('work');
        setTimeLeft(25 * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const toggleRun = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalDuration = mode === 'work' ? 25 * 60 : 5 * 60;
  const progressPct = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Timer className="w-4 h-4 text-emerald-400" />
            <span>Study Pomodoro</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] text-slate-400">
            <span>Sessions:</span>
            <strong className="text-emerald-400">{completedSessions}</strong>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <button
            onClick={() => switchMode('work')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              mode === 'work' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Deep Focus (25m)
          </button>
          <button
            onClick={() => switchMode('break')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
              mode === 'break' ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coffee className="w-3 h-3" />
            <span>Break (5m)</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center my-2">
        <div className="text-4xl font-bold font-mono tabular-nums tracking-wider text-slate-100">
          {formattedTime}
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${mode === 'work' ? 'bg-emerald-500' : 'bg-teal-400'}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-800">
        <button
          onClick={toggleRun}
          className={`px-4 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-colors ${
            isRunning
              ? 'bg-amber-600/80 hover:bg-amber-600 text-white'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
        </button>
        <button
          onClick={resetTimer}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
          title="Reset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
