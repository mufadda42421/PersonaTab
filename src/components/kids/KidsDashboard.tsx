import React, { useState } from 'react';
import {
  Sparkles,
  Rocket,
  Shield,
  Star,
  Search,
  ExternalLink,
  Gamepad2,
  BookOpen,
  Palette,
  Heart
} from 'lucide-react';
import { KidsProfile } from '../../types';
import { KidsMathQuest } from '../widgets/kids/KidsMathQuest';
import { KidsDrawingStudio } from '../widgets/kids/KidsDrawingStudio';
import { KidsScienceFact } from '../widgets/kids/KidsScienceFact';
import { KidsQuizWidget } from '../widgets/kids/KidsQuizWidget';
import { KidsReadingCorner } from '../widgets/kids/KidsReadingCorner';
import { KidsParentalControlsModal } from '../widgets/kids/KidsParentalControlsModal';

interface Props {
  kidsProfile: KidsProfile;
  onUpdateKidsProfile: (updated: KidsProfile) => void;
  onExitKidMode: () => void;
}

export const KidsDashboard: React.FC<Props> = ({
  kidsProfile,
  onUpdateKidsProfile,
  onExitKidMode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [parentalModalOpen, setParentalModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Check if query contains any blocked keywords
    const lower = searchQuery.toLowerCase();
    const hasBlocked = kidsProfile.blockedKeywords.some((w) => lower.includes(w));
    if (hasBlocked) {
      alert('This search topic is blocked by parental safe search filters.');
      return;
    }

    // Safe Kiddle search
    window.location.href = `https://www.kiddle.co/s.php?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900/60 via-indigo-950/80 to-purple-950 text-white selection:bg-pink-500 pb-12">
      {/* Background artwork */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{ backgroundImage: `url('/src/assets/images/kids_playful_landscape_1794041618451.jpg')` }}
      />

      {/* Top Header */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 flex items-center justify-center text-xl shadow-lg shadow-pink-500/30">
            🌟
          </div>
          <div>
            <h2 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              <span>PersonaTab Kids</span>
              <span className="px-2 py-0.5 rounded-full bg-pink-500/30 border border-pink-400/40 text-[10px] text-pink-300 font-bold uppercase">
                Adventure Mode
              </span>
            </h2>
            <p className="text-xs text-indigo-200">Welcome, Explorer {kidsProfile.nickname}!</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Star Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-xs shadow-md">
            <Star className="w-4 h-4 fill-current text-amber-400" />
            <span>{kidsProfile.stars} Stars Earned</span>
          </div>

          {/* Parental Controls Gate */}
          <button
            onClick={() => setParentalModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-300 transition-colors shadow-sm"
          >
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>Parents</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-4 space-y-6">
        {/* Child Safe Search */}
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search safe kid-friendly facts, animals, space..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-slate-900/80 border-2 border-indigo-400/40 text-sm text-white placeholder-indigo-300/60 shadow-xl focus:outline-none focus:border-pink-400"
            />
            <Search className="w-5 h-5 absolute left-3.5 top-4 text-indigo-300" />
            <button
              type="submit"
              className="absolute right-2 top-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              Explore!
            </button>
          </form>

          {/* Safe Discovery Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs">
            {kidsProfile.allowedSites.map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-pink-400/50 text-indigo-200 hover:text-white transition-all text-xs font-semibold shadow-sm"
              >
                <span>{site.name}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            ))}
          </div>
        </div>

        {/* Kids Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Math Galaxy Quest */}
          <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-indigo-500/20 shadow-xl overflow-hidden">
            <KidsMathQuest />
          </div>

          {/* Magic Drawing Studio */}
          <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-pink-500/20 shadow-xl overflow-hidden">
            <KidsDrawingStudio />
          </div>

          {/* Fun Kid Quiz */}
          <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-purple-500/20 shadow-xl overflow-hidden">
            <KidsQuizWidget />
          </div>

          {/* Amazing Science Fact */}
          <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/20 shadow-xl overflow-hidden">
            <KidsScienceFact />
          </div>

          {/* Reading Adventure Corner */}
          <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-teal-500/20 shadow-xl overflow-hidden md:col-span-2">
            <KidsReadingCorner />
          </div>
        </div>
      </div>

      {/* Parental Controls Modal */}
      <KidsParentalControlsModal
        isOpen={parentalModalOpen}
        onClose={() => setParentalModalOpen(false)}
        kidsProfile={kidsProfile}
        onUpdateProfile={onUpdateKidsProfile}
        onExitKidMode={onExitKidMode}
      />
    </div>
  );
};
