import React, { useState } from 'react';
import { Dices, Sparkles } from 'lucide-react';

interface GamePick {
  title: string;
  genre: string;
  rating: string;
  vibe: string;
}

const PICKS: GamePick[] = [
  { title: 'Baldur’s Gate 3', genre: 'RPG / Story', rating: '96/100', vibe: 'Unparalleled narrative freedom & tactical combat.' },
  { title: 'Hollow Knight: Silksong', genre: 'Metroidvania', rating: 'Top Wishlist', vibe: 'Tight platforming and gothic hand-drawn world.' },
  { title: 'Elden Ring', genre: 'Action RPG', rating: '96/100', vibe: 'Vast mysterious open-world with punishing boss battles.' },
  { title: 'Balatro', genre: 'Roguelike Deckbuilder', rating: '90/100', vibe: 'Hypnotic poker synergy loops with endless depth.' },
  { title: 'Cyberpunk 2077', genre: 'Sci-Fi Action', rating: '86/100', vibe: 'Dense futuristic metropolis and high-octane gunplay.' },
  { title: 'Helldivers 2', genre: 'Co-op Shooter', rating: '82/100', vibe: 'Hilarious chaotic galactic democracy with squadmates.' }
];

export const GamerRecommenderWidget: React.FC = () => {
  const [pick, setPick] = useState<GamePick>(PICKS[0]);

  const roll = () => {
    const next = PICKS[Math.floor(Math.random() * PICKS.length)];
    setPick(next);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Dices className="w-4 h-4 text-pink-400" />
            <span>Game Roulette</span>
          </div>
          <button
            onClick={roll}
            className="px-2 py-0.5 rounded bg-pink-600 hover:bg-pink-500 text-white flex items-center gap-1 text-[11px] font-medium"
          >
            <Sparkles className="w-3 h-3" />
            <span>Reroll</span>
          </button>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex justify-between items-start mb-1">
            <h4 className="text-slate-100 font-bold text-sm">{pick.title}</h4>
            <span className="font-mono text-[10px] text-pink-400 bg-pink-950/60 px-1.5 py-0.5 rounded">
              {pick.rating}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">{pick.genre}</span>
          <p className="text-slate-300 text-[11px] mt-1.5 leading-relaxed">{pick.vibe}</p>
        </div>
      </div>
    </div>
  );
};
