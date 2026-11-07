import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

export const ClockCalendarWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

  // Day progress percentage (out of 24h)
  const currentMinutes = hours * 60 + time.getMinutes();
  const dayProgress = Math.round((currentMinutes / 1440) * 100);

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Time & Calendar Glance</span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">{time.toLocaleTimeString([], { timeZoneName: 'short' })}</span>
        </div>

        <div className="text-center my-3">
          <div className="text-3xl font-extrabold font-mono tabular-nums tracking-wider text-slate-100">
            {String(hours).padStart(2, '0')}:{minutes}
            <span className="text-base text-indigo-400 font-semibold ml-1">:{seconds}</span>
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{dateStr}</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800">
        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
          <span>Day Progress</span>
          <span className="font-mono">{dayProgress}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${dayProgress}%` }} />
        </div>
      </div>
    </div>
  );
};
