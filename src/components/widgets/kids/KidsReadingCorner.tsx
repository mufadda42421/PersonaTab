import React from 'react';
import { BookOpen, ExternalLink, Sparkles } from 'lucide-react';

interface BookRecommendation {
  title: string;
  author: string;
  age: string;
  tag: string;
  link: string;
}

const BOOKS: BookRecommendation[] = [
  { title: 'The Magic School Bus: Inside the Earth', author: 'Joanna Cole', age: 'Ages 6-10', tag: 'Science & Geology', link: 'https://scholastic.com' },
  { title: 'Ada Twist, Scientist', author: 'Andrea Beaty', age: 'Ages 5-8', tag: 'Curiosity & STEM', link: 'https://abramsbooks.com' },
  { title: 'National Geographic Little Kids First Big Book of Space', author: 'Catherine D. Hughes', age: 'Ages 4-8', tag: 'Astronomy', link: 'https://kids.nationalgeographic.com' }
];

export const KidsReadingCorner: React.FC = () => {
  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Reading Adventure Corner</span>
          </div>
          <span className="text-[10px] text-amber-300 font-mono">Curated Books</span>
        </div>

        <div className="space-y-1.5">
          {BOOKS.map((b) => (
            <a
              key={b.title}
              href={b.link}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between transition-colors block"
            >
              <div className="truncate mr-2">
                <div className="text-slate-100 font-bold truncate">{b.title}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">by {b.author} · {b.age}</div>
              </div>
              <span className="text-[10px] font-bold text-pink-300 bg-pink-950/60 px-2 py-0.5 rounded-full border border-pink-800/40 shrink-0">
                {b.tag}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
