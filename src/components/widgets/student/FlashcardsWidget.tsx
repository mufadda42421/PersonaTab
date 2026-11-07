import React, { useState } from 'react';
import { Layers, ChevronLeft, ChevronRight, RotateCw, CheckCircle2 } from 'lucide-react';

interface Flashcard {
  id: string;
  subject: string;
  question: string;
  answer: string;
}

const DEFAULT_CARDS: Flashcard[] = [
  {
    id: '1',
    subject: 'Computer Science',
    question: 'What is the time complexity of searching in a Balanced Binary Search Tree (AVL / Red-Black)?',
    answer: 'O(log n) for search, insert, and delete operations.'
  },
  {
    id: '2',
    subject: 'Physics',
    question: 'State Heisenberg\'s Uncertainty Principle equation and physical implication.',
    answer: 'Δx · Δp ≥ ℏ/2. You cannot simultaneously measure position and momentum with arbitrary precision.'
  },
  {
    id: '3',
    subject: 'Economics',
    question: 'What distinguishes Fiscal Policy from Monetary Policy?',
    answer: 'Fiscal policy is managed by the government (taxation & spending), while monetary policy is managed by the central bank (interest rates & money supply).'
  }
];

export const FlashcardsWidget: React.FC = () => {
  const [cards] = useState<Flashcard[]>(DEFAULT_CARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);

  const card = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const markMastered = () => {
    setMasteredCount((c) => c + 1);
    handleNext();
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Active Recall Flashcards</span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">
            {currentIndex + 1} / {cards.length}
          </span>
        </div>
      </div>

      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="my-2 p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 cursor-pointer min-h-[110px] flex flex-col justify-between shadow-inner hover:border-emerald-500/50 transition-colors"
      >
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span className="font-semibold text-emerald-400">{card.subject}</span>
          <span className="flex items-center gap-1 text-slate-500">
            <RotateCw className="w-3 h-3" />
            <span>{isFlipped ? 'Answer' : 'Tap to Flip'}</span>
          </span>
        </div>

        <div className="text-center py-2 px-1">
          {isFlipped ? (
            <p className="text-emerald-200 font-medium leading-relaxed">{card.answer}</p>
          ) : (
            <p className="text-slate-100 font-semibold leading-relaxed">{card.question}</p>
          )}
        </div>

        <div className="text-[10px] text-center text-slate-500">
          {isFlipped ? 'Click again to see question' : 'Think first, then verify answer'}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNext}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={markMastered}
          className="px-2 py-1 rounded bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/60 flex items-center gap-1 text-[11px]"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Mastered</span>
        </button>
      </div>
    </div>
  );
};
