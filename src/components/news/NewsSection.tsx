import React, { useState, useEffect } from 'react';
import { Newspaper, Bookmark, BookmarkCheck, ExternalLink, RefreshCw, Clock, Globe } from 'lucide-react';
import { NewsArticle, RoleType } from '../../types';
import { NewsService, NEWS_CATEGORIES } from '../../services/newsService';

interface Props {
  role: RoleType;
  onOpenSettings?: () => void;
}

export const NewsSection: React.FC<Props> = ({ role, onOpenSettings }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);

  const availableCategories = NEWS_CATEGORIES.filter(
    (c) => c.id === 'all' || c.roles.includes(role)
  );

  const loadArticles = async () => {
    setIsLoading(true);
    try {
      if (showSavedOnly) {
        const saved = await NewsService.getSavedArticles();
        setArticles(saved);
      } else {
        const data = await NewsService.fetchNews(role, category);
        setArticles(data);
      }
    } catch (e) {
      console.error('Failed to load news:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [role, category, showSavedOnly]);

  const toggleBookmark = async (article: NewsArticle, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isSaved = await NewsService.toggleSaveArticle(article);
    setArticles((prev) =>
      prev.map((a) => (a.id === article.id ? { ...a, saved: isSaved } : a))
    );
  };

  return (
    <div className="w-full my-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-slate-100 text-base tracking-tight">Live Real-Time News & Intelligence</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5 font-sans">
            <span>Verified feeds via FreeNewsAPI.io, HackerNews & Spaceflight News</span>
            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className="text-indigo-400 hover:text-indigo-300 underline font-medium text-[11px]"
              >
                (Configure Key)
              </button>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
            {availableCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setShowSavedOnly(false);
                  setCategory(c.id);
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium whitespace-nowrap ${
                  !showSavedOnly && category === c.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Saved Articles Toggle */}
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              showSavedOnly
                ? 'bg-amber-600/20 border-amber-500 text-amber-300'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({articles.filter((a) => a.saved).length})</span>
          </button>

          {/* Refresh button */}
          <button
            onClick={loadArticles}
            disabled={isLoading}
            className="p-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title="Refresh live news feed"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Articles Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-44 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse p-4" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 text-sm">
          {showSavedOnly ? 'You haven’t bookmarked any articles yet.' : 'No articles found in this category. Click Refresh to query live endpoints.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col justify-between p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-sm hover:shadow-md"
            >
              <div>
                {/* Image if available */}
                {article.imageUrl && (
                  <div className="w-full h-32 rounded-xl overflow-hidden mb-3 bg-slate-950 relative border border-slate-800">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Unboxed Metadata per §1.A anti-slop rules */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-sans">
                  <span className="font-semibold text-indigo-400">{article.source}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {article.readTime}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h4>

                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-xs">
                <span className="text-indigo-400 font-medium flex items-center gap-1 group-hover:underline">
                  <span>Read live article</span>
                  <ExternalLink className="w-3 h-3" />
                </span>

                <button
                  onClick={(e) => toggleBookmark(article, e)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    article.saved
                      ? 'text-amber-400 bg-amber-950/60'
                      : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                  title={article.saved ? 'Remove Bookmark' : 'Save Article'}
                >
                  {article.saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
