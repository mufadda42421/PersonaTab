import React from 'react';
import { Flame, Star, GitFork, ExternalLink } from 'lucide-react';

interface RepoItem {
  name: string;
  owner: string;
  desc: string;
  lang: string;
  langColor: string;
  stars: string;
  forks: string;
  url: string;
}

const TRENDING_REPOS: RepoItem[] = [
  {
    owner: 'tailwindlabs',
    name: 'tailwindcss',
    desc: 'A utility-first CSS framework for rapid UI development.',
    lang: 'Rust',
    langColor: '#dea584',
    stars: '82.4k',
    forks: '4.1k',
    url: 'https://github.com/tailwindlabs/tailwindcss'
  },
  {
    owner: 'vitejs',
    name: 'vite',
    desc: 'Next Generation Frontend Tooling. It’s fast!',
    lang: 'TypeScript',
    langColor: '#3178c6',
    stars: '71.2k',
    forks: '6.2k',
    url: 'https://github.com/vitejs/vite'
  },
  {
    owner: 'astral-sh',
    name: 'uv',
    desc: 'An extremely fast Python package and project manager written in Rust.',
    lang: 'Rust',
    langColor: '#dea584',
    stars: '42.8k',
    forks: '1.4k',
    url: 'https://github.com/astral-sh/uv'
  }
];

export const GithubTrendingWidget: React.FC = () => {
  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>Trending Repositories</span>
          </div>
          <a
            href="https://github.com/trending"
            target="_blank"
            rel="noreferrer"
            className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-0.5"
          >
            <span>Explore</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="space-y-2">
          {TRENDING_REPOS.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="block p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-slate-200 font-medium">
                <span className="truncate">
                  <span className="text-slate-400 font-normal">{repo.owner} / </span>
                  <span className="text-indigo-300 font-semibold">{repo.name}</span>
                </span>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono shrink-0">
                  <span className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-amber-400" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <GitFork className="w-3 h-3 text-slate-400" />
                    {repo.forks}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{repo.desc}</p>
              <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-slate-400">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.langColor }} />
                <span>{repo.lang}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
