import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

export const TimeTrackerWidget: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [taskName, setTaskName] = useState('Frontend Sprint');
  const [ratePerHour] = useState(75);

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const timeFormatted = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const billableEarned = ((seconds / 3600) * ratePerHour).toFixed(2);

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Clock className="w-4 h-4 text-teal-400" />
            <span>Billable Time Tracker</span>
          </div>
          <span className="font-mono text-[10px] text-teal-400 font-bold">${ratePerHour}/hr</span>
        </div>

        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Client / Task name..."
          className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-100 text-[11px] mb-2 focus:outline-none"
        />
      </div>

      <div className="flex flex-col items-center my-1">
        <div className="text-3xl font-bold font-mono text-slate-100 tabular-nums">
          {timeFormatted}
        </div>
        <div className="text-[11px] text-teal-400 font-mono mt-1 font-semibold">
          Billable: ${billableEarned}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-800">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-3 py-1 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-colors ${
            isRunning ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-teal-600 hover:bg-teal-500 text-white'
          }`}
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isRunning ? 'Pause' : 'Start Timer'}</span>
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setSeconds(0);
          }}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
