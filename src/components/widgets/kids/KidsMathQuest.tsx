import React, { useState } from 'react';
import { Rocket, Star, Sparkles, Check, X } from 'lucide-react';

export const KidsMathQuest: React.FC = () => {
  const [num1, setNum1] = useState(7);
  const [num2, setNum2] = useState(5);
  const [op, setOp] = useState<'+' | '-' | '×'>('+');
  const [userAnswer, setUserAnswer] = useState('');
  const [stars, setStars] = useState(12);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const correctAnswer = op === '+' ? num1 + num2 : op === '-' ? num1 - num2 : num1 * num2;

  const nextProblem = () => {
    const ops: ('+' | '-' | '×')[] = ['+', '-', '×'];
    const nextOp = ops[Math.floor(Math.random() * ops.length)];
    let n1 = Math.floor(Math.random() * 10) + 1;
    let n2 = Math.floor(Math.random() * 10) + 1;
    if (nextOp === '-' && n1 < n2) {
      const temp = n1;
      n1 = n2;
      n2 = temp;
    }
    setNum1(n1);
    setNum2(n2);
    setOp(nextOp);
    setUserAnswer('');
    setFeedback(null);
  };

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer) return;

    if (parseInt(userAnswer) === correctAnswer) {
      setFeedback('correct');
      setStars((s) => s + 1);
      setTimeout(() => {
        nextProblem();
      }, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <Rocket className="w-4 h-4 text-pink-400" />
            <span>Math Galaxy Quest</span>
          </div>
          <div className="flex items-center gap-1 bg-amber-950/70 border border-amber-600/50 px-2 py-0.5 rounded-full font-bold text-amber-300 font-mono">
            <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span>{stars} Stars</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-950/80 to-purple-950/80 p-4 rounded-2xl border border-indigo-500/30 text-center my-1 shadow-md">
          <span className="text-[10px] text-indigo-300 font-medium">Solve to launch rocket!</span>
          <div className="text-3xl font-extrabold font-mono text-white tracking-widest my-2">
            {num1} {op} {num2} = ?
          </div>

          <form onSubmit={check} className="flex justify-center items-center gap-2 mt-2">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Answer"
              autoFocus
              className="w-24 px-3 py-1.5 rounded-xl bg-slate-900 border-2 border-indigo-400 text-center font-bold text-lg text-white font-mono focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold hover:scale-105 active:scale-95 transition-transform"
            >
              Go!
            </button>
          </form>

          {feedback === 'correct' && (
            <div className="mt-2 text-emerald-400 font-bold flex items-center justify-center gap-1 animate-bounce">
              <Sparkles className="w-4 h-4" />
              <span>Great Job! +1 Star</span>
            </div>
          )}

          {feedback === 'wrong' && (
            <div className="mt-2 text-rose-400 font-bold flex items-center justify-center gap-1">
              <X className="w-4 h-4" />
              <span>Try again! You can do it!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
