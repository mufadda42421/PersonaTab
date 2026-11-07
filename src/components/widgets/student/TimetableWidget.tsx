import React, { useState } from 'react';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

interface PeriodItem {
  time: string;
  subject: string;
  room: string;
  code: string;
}

const SCHEDULE: Record<string, PeriodItem[]> = {
  Mon: [
    { time: '09:00 - 10:30', subject: 'Linear Algebra', room: 'Hall B-12', code: 'MATH 201' },
    { time: '11:00 - 12:30', subject: 'Data Structures', room: 'Lab 4', code: 'CS 210' },
    { time: '14:00 - 15:30', subject: 'Microeconomics', room: 'Auditorium 2', code: 'ECON 105' }
  ],
  Tue: [
    { time: '10:00 - 11:30', subject: 'Operating Systems', room: 'Lab 2', code: 'CS 320' },
    { time: '13:00 - 14:30', subject: 'Technical Writing', room: 'Room 304', code: 'ENG 112' }
  ],
  Wed: [
    { time: '09:00 - 10:30', subject: 'Linear Algebra', room: 'Hall B-12', code: 'MATH 201' },
    { time: '11:00 - 12:30', subject: 'Database Systems', room: 'Lab 1', code: 'CS 240' }
  ],
  Thu: [
    { time: '10:00 - 12:00', subject: 'Algorithms Lab', room: 'CS Center', code: 'CS 310' },
    { time: '14:00 - 15:30', subject: 'Microeconomics', room: 'Auditorium 2', code: 'ECON 105' }
  ],
  Fri: [
    { time: '11:00 - 12:30', subject: 'Seminar: AI Ethics', room: 'Virtual', code: 'PHIL 205' },
    { time: '13:30 - 15:00', subject: 'Study Group Review', room: 'Library Pod 4', code: 'STUDY' }
  ]
};

export const TimetableWidget: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const [activeDay, setActiveDay] = useState<string>('Mon');

  const classes = SCHEDULE[activeDay] || [];

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <CalendarDays className="w-4 h-4 text-teal-400" />
            <span>Weekly Class Timetable</span>
          </div>
        </div>

        <div className="flex gap-1 mb-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className={`flex-1 py-1 rounded text-center font-medium transition-colors ${
                activeDay === d ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5 flex-1 overflow-y-auto max-h-36 pr-1">
        {classes.length === 0 ? (
          <div className="text-center py-4 text-slate-500 italic">No classes scheduled for {activeDay}.</div>
        ) : (
          classes.map((c, i) => (
            <div
              key={i}
              className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors"
            >
              <div className="flex justify-between items-center text-slate-200 font-semibold">
                <span>{c.subject}</span>
                <span className="text-[10px] font-mono text-teal-400 bg-teal-950/60 px-1.5 py-0.5 rounded border border-teal-800/40">
                  {c.code}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {c.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {c.room}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
