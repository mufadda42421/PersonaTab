import React, { useState } from 'react';
import { HelpCircle, Sparkles, Check, RefreshCw } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    question: 'Which planet is called the "Red Planet"?',
    options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
    correct: 1,
    explanation: 'Mars is red because its surface is covered in rusty iron dust!'
  },
  {
    question: 'How many legs does an octopus have?',
    options: ['6', '8', '10', '12'],
    correct: 1,
    explanation: 'Octopuses have 8 arms covered in clever suction cups!'
  },
  {
    question: 'What is the fastest land animal in the world?',
    options: ['Lion', 'Cheetah', 'Horse', 'Greyhound'],
    correct: 1,
    explanation: 'Cheetahs can sprint up to 110 kilometers per hour (70 mph)!'
  }
];

export const KidsQuizWidget: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const q = QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelectedOpt(idx);
    setAnswered(true);
  };

  const next = () => {
    setSelectedOpt(null);
    setAnswered(false);
    setCurrentIdx((prev) => (prev + 1) % QUESTIONS.length);
  };

  const isCorrect = selectedOpt === q.correct;

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-bold text-pink-300">
            <HelpCircle className="w-4 h-4 text-pink-400" />
            <span>Super Fun Quiz</span>
          </div>
          <span className="font-mono text-[10px] text-pink-300">
            Q {currentIdx + 1}/{QUESTIONS.length}
          </span>
        </div>

        <p className="text-slate-100 font-bold text-xs mb-2">{q.question}</p>

        <div className="grid grid-cols-2 gap-1.5 mb-2">
          {q.options.map((opt, i) => {
            let style = 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800';
            if (answered) {
              if (i === q.correct) style = 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold';
              else if (i === selectedOpt) style = 'bg-rose-950 border-rose-500 text-rose-300';
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`p-2 rounded-xl border text-center font-medium transition-colors ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {answered ? (
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <span className={`text-[11px] font-bold ${isCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
            {isCorrect ? '🎉 Correct! Woohoo!' : 'Good try! Learn every day!'}
          </span>
          <button
            onClick={next}
            className="px-2.5 py-1 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-[11px]"
          >
            Next Question
          </button>
        </div>
      ) : (
        <div className="text-[10px] text-slate-500 text-center">Tap an answer to see if you are right!</div>
      )}
    </div>
  );
};
