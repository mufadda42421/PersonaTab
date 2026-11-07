import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, ExternalLink, ArrowRight } from 'lucide-react';
import { SearchEngineType } from '../../types';

interface Props {
  defaultEngine?: SearchEngineType;
  onEngineChange?: (engine: SearchEngineType) => void;
}

interface EngineInfo {
  id: SearchEngineType;
  name: string;
  searchUrl: (q: string) => string;
  placeholder: string;
}

const ENGINES: Record<SearchEngineType, EngineInfo> = {
  google: {
    id: 'google',
    name: 'Google',
    searchUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
    placeholder: 'Search with Google or enter URL...'
  },
  duckduckgo: {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    searchUrl: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
    placeholder: 'Search privately with DuckDuckGo...'
  },
  bing: {
    id: 'bing',
    name: 'Bing',
    searchUrl: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
    placeholder: 'Search the web with Bing...'
  },
  brave: {
    id: 'brave',
    name: 'Brave',
    searchUrl: (q) => `https://search.brave.com/search?q=${encodeURIComponent(q)}`,
    placeholder: 'Search independently with Brave...'
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    searchUrl: (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
    placeholder: 'Search videos, tutorials, music...'
  },
  github: {
    id: 'github',
    name: 'GitHub',
    searchUrl: (q) => `https://github.com/search?q=${encodeURIComponent(q)}`,
    placeholder: 'Search repositories, code, topics...'
  }
};

export const SmartSearchBar: React.FC<Props> = ({ defaultEngine = 'google', onEngineChange }) => {
  const [engine, setEngine] = useState<SearchEngineType>(defaultEngine);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Keyboard shortcut: '/' to focus, 'Escape' to blur
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const trimmed = query.trim();

    // Check if directly a URL
    if (/^(http:\/\/|https:\/\/|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i.test(trimmed)) {
      const url = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
      window.location.href = url;
      return;
    }

    const targetUrl = ENGINES[engine].searchUrl(trimmed);
    window.location.href = targetUrl;
  };

  const selectEngine = (eng: SearchEngineType) => {
    setEngine(eng);
    if (onEngineChange) onEngineChange(eng);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-4 relative">
      <form
        onSubmit={handleSearch}
        className={`relative flex items-center bg-slate-900/80 backdrop-blur-xl border rounded-2xl shadow-xl transition-all duration-300 ${
          isFocused
            ? 'border-indigo-500/80 ring-4 ring-indigo-500/15 shadow-indigo-500/10'
            : 'border-slate-800/80 hover:border-slate-700'
        }`}
      >
        {/* Engine dropdown button */}
        <div className="pl-3 pr-2 flex items-center border-r border-slate-800">
          <select
            value={engine}
            onChange={(e) => selectEngine(e.target.value as SearchEngineType)}
            className="bg-transparent text-xs font-semibold text-slate-300 focus:outline-none cursor-pointer py-2 pr-1"
          >
            {Object.values(ENGINES).map((eng) => (
              <option key={eng.id} value={eng.id} className="bg-slate-900 text-slate-100">
                {eng.name}
              </option>
            ))}
          </select>
        </div>

        {/* Input */}
        <div className="flex-1 flex items-center px-3">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder={ENGINES[engine].placeholder}
            className="w-full bg-transparent py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
          />
        </div>

        {/* Shortcut badge / submit button */}
        <div className="pr-3 flex items-center gap-1.5">
          {query ? (
            <button
              type="submit"
              className="p-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800/80 rounded-md border border-slate-700">
              /
            </kbd>
          )}
        </div>
      </form>
    </div>
  );
};
