import React, { useState } from 'react';
import {
  Download,
  LayoutDashboard,
  Shield,
  Newspaper,
  Terminal,
  Briefcase,
  Gamepad2,
  GraduationCap,
  Palette,
  Sparkles,
  Smile,
  ArrowRight,
  Check,
  Globe,
  Sliders,
  ExternalLink,
  Code,
  Laptop,
  TrendingUp,
  BookMarked,
  Compass,
  PenTool
} from 'lucide-react';
import { ExtensionExporter } from '../../services/extensionExporter';
import { StorageService } from '../../services/storageService';

interface Props {
  onLaunchDashboard: () => void;
  onGoToDownload?: () => void;
}

const PERSONA_PREVIEWS = {
  developer: {
    title: 'Developer / Programmer',
    tagline: 'Code Snippets, JSON Formatter, Regex Tester & Git Reference',
    accent: 'border-indigo-500/50 bg-indigo-950/20',
    badge: 'Code Engine',
    features: [
      'Instant JSON Formatter & Syntax Validator (Minify / Prettify)',
      'Interactive Regular Expression Tester with live match highlighting',
      'Code Snippets Vault for TypeScript, Python, Go, and Shell',
      'Git Command Reference cheat-sheet with 1-click clipboard copy',
      'Live HackerNews & TechCrunch API feeds + GitHub Trending Repos',
      'HTML/CSS/JS Sandbox Scratchpad for quick code experiments'
    ]
  },
  businessman: {
    title: 'Businessman / Entrepreneur',
    tagline: 'GST/VAT, Profit Margin, EMI Calculator & Expense Tracker',
    accent: 'border-blue-500/50 bg-blue-950/20',
    badge: 'Executive',
    features: [
      'Indian GST & Global VAT Calculator with CGST/SGST breakdown',
      'Profit Margin & Markup multiplier calculator with real-time recalculation',
      'Loan EMI Amortization calculator with tenure and interest sliders',
      'Business Expense Tracker categorized by Software, Marketing & Operations',
      'Multi-Currency Converter (USD, EUR, GBP, INR, JPY, CAD, AUD)',
      'Global Indices Watchlist (NIFTY 50, SENSEX, S&P 500, NASDAQ, BTC)'
    ]
  },
  student: {
    title: 'Student / Academic',
    tagline: 'Study Timetable, Pomodoro Focus, Scientific Calc & Flashcards',
    accent: 'border-emerald-500/50 bg-emerald-950/20',
    badge: 'Scholar',
    features: [
      'Pomodoro Focus Timer (25m Deep Work / 5m Restorative Breaks)',
      'Active Recall Study Flashcards with self-rating & flip animation',
      'Full Scientific Calculator (sin, cos, tan, square roots, powers, constants)',
      'Weekly Class Timetable Monday-Friday schedule organizer',
      'Daily Study Goals tracker with milestone check-offs',
      'Universal Unit Converter (length, mass, temperature, velocity)'
    ]
  },
  gamer: {
    title: 'Gamer / Streamer',
    tagline: 'Upcoming Game Countdowns, Deals Tracker & Game Roulette',
    accent: 'border-pink-500/50 bg-pink-950/20',
    badge: 'Pro Gamer',
    features: [
      'Live Blockbuster Game Release Countdowns (GTA VI, Monster Hunter)',
      'Verified Deals & Discounts from Steam, Epic Games Store, and GOG',
      'Game Recommendation Roulette based on genre & mood',
      'Direct quick links to Steam, Epic, Twitch, and Discord',
      'AMOLED Pure Black and custom gaming wallpaper themes'
    ]
  },
  designer: {
    title: 'Designer / UI/UX',
    tagline: 'Harmonic Palette Generator, CSS Gradient Studio & Font Tester',
    accent: 'border-purple-500/50 bg-purple-950/20',
    badge: 'Creative',
    features: [
      '5-Color Harmonic Color Palette Generator with color locks & HEX copy',
      'CSS Gradient Studio with live linear/radial angles & color stops',
      'Curated Typography Pairings and scale tester',
      'Quick access to Figma, Dribbble, Behance, and Mobbin',
      'Frosted glassmorphism aesthetic with custom blur controls'
    ]
  },
  kids: {
    title: 'Kid Mode (Safe & Fun)',
    tagline: 'Math Galaxy Quest, Drawing Studio, Quizzes & Parental PIN',
    accent: 'border-amber-500/50 bg-amber-950/20',
    badge: 'Kids Adventure',
    features: [
      'Math Galaxy Quest arithmetic challenge with star reward system',
      'Magic HTML5 Drawing Studio with color palette & artwork downloader',
      'Daily Science Facts & fun animal/space trivia quizzes',
      'Curated kid-safe reading recommendations and encyclopedia links',
      'Dedicated PIN-Protected Parental Controls with screen time limits & website blocking'
    ]
  }
};

export const ShowcaseWebsite: React.FC<Props> = ({ onLaunchDashboard, onGoToDownload }) => {
  const [selectedPersonaTab, setSelectedPersonaTab] = useState<'developer' | 'businessman' | 'student' | 'gamer' | 'designer' | 'kids'>('developer');
  const [isDownloading, setIsDownloading] = useState(false);
  const isInsideExtension = StorageService.isRunningInChromeExtension();

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await ExtensionExporter.downloadExtensionZip();
    } catch (e) {
      console.error('Failed to download extension:', e);
    } finally {
      setIsDownloading(false);
    }
  };

  const preview = PERSONA_PREVIEWS[selectedPersonaTab];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-6 max-w-6xl mx-auto text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Manifest V3 Chrome Extension & Web Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
          The Chrome New Tab Designed Around <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">Who You Are</span>.
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
          Replace Chrome’s empty tab with a personalized powerhouse workspace. Adaptive tools, real live news via FreeNewsAPI.io, 30+ calculators, and distraction-free design for every profession.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          {!isInsideExtension && (
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-sm flex items-center gap-2.5 shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Download className="w-5 h-5" />
              <span>{isDownloading ? 'Packaging Extension...' : 'Download Extension (.ZIP)'}</span>
            </button>
          )}

          <button
            onClick={onLaunchDashboard}
            className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-100 font-bold text-sm flex items-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <LayoutDashboard className="w-5 h-5 text-indigo-400" />
            <span>Open Interactive Dashboard</span>
          </button>
        </div>

        {/* Interactive Persona Switcher Teaser */}
        <div id="personas" className="mt-16 text-left">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-bold text-white">Adaptive by Profession</h2>
              <p className="text-xs text-slate-400 mt-0.5">Click any identity to preview its dedicated toolkit and live widgets</p>
            </div>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-800/40">
              13 Personas Included
            </span>
          </div>

          {/* Persona selector tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-4">
            {[
              { id: 'developer', label: 'Developer', icon: Terminal },
              { id: 'businessman', label: 'Entrepreneur', icon: Briefcase },
              { id: 'student', label: 'Student', icon: GraduationCap },
              { id: 'gamer', label: 'Gamer', icon: Gamepad2 },
              { id: 'designer', label: 'Designer', icon: Palette },
              { id: 'kids', label: 'Kids Mode', icon: Smile }
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedPersonaTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedPersonaTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Persona Showcase Card */}
          <div className={`p-6 sm:p-8 rounded-3xl border ${preview.accent} backdrop-blur-xl shadow-2xl transition-all`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 font-mono">
                  {preview.badge}
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-0.5">{preview.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{preview.tagline}</p>
              </div>

              <button
                onClick={onLaunchDashboard}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 self-start sm:self-auto transition-colors"
              >
                <span>Launch this workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {preview.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-800/40">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-slate-300 font-medium leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars Grid */}
      <section id="features" className="py-16 px-6 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Engineered for Daily Excellence</h2>
          <p className="text-slate-400 text-sm mt-2">
            Not just a pretty skin. Every widget, button, calculation, and feed is genuinely wired and fully functional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Real News Only */}
          <div id="news" className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-950 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-800/50">
                <Newspaper className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">FreeNewsAPI.io & Verified Feeds</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Zero fake or hallucinated headlines. Directly powered by FreeNewsAPI.io, the official Hacker News API, Spaceflight News, and BBC Business with unboxed metadata and read times.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800/60 text-[11px] text-indigo-400 font-medium flex items-center gap-1">
              <span>Filter by Tech, Markets, Science, Gaming</span>
            </div>
          </div>

          {/* Card 2: 30+ Tools & Calculators */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-teal-950 text-teal-400 flex items-center justify-center mb-4 border border-teal-800/50">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">30+ Modular Working Widgets</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                GST/VAT calculators, Profit Margins, EMI loans, JSON beautifier, Regex tester, Pomodoro timer, HTML sandbox, and Active Recall flashcards.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800/60 text-[11px] text-teal-400 font-medium flex items-center gap-1">
              <span>Dynamic Widget Library browser</span>
            </div>
          </div>

          {/* Card 3: Parental Controls */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-pink-950 text-pink-400 flex items-center justify-center mb-4 border border-pink-800/50">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Kids Mode & Parental Controls</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Cheery, safe environment with Math Galaxy Quest, HTML5 Drawing Canvas, and trivia. Protected by a parent PIN with screen time limits and website whitelists.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800/60 text-[11px] text-pink-400 font-medium flex items-center gap-1">
              <span>Protected by 4-digit PIN verification</span>
            </div>
          </div>
        </div>
      </section>

      {/* 30-Second Chrome Installation Walkthrough */}
      <section id="install" className="py-16 px-6 max-w-4xl mx-auto border-t border-white/5 text-center">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Install in Chrome in 30 Seconds</h2>
        <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">
          PersonaTab is built with Manifest V3. No store wait times, no third-party tracking, runs 100% locally.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-left">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h4 className="font-bold text-sm text-slate-100">Download & Unzip</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Click the download button to save <code className="text-indigo-300 font-mono">PersonaTab-Chrome-Extension.zip</code> and extract it anywhere on your computer.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              2
            </span>
            <h4 className="font-bold text-sm text-slate-100">Open Extensions</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              In Chrome, navigate to <code className="text-indigo-300 font-mono font-bold">chrome://extensions</code> and turn on <strong>Developer mode</strong> in the top-right.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              3
            </span>
            <h4 className="font-bold text-sm text-slate-100">Click Load Unpacked</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Click <strong>Load unpacked</strong>, choose the extracted folder, and open a new tab. You’re done!
            </p>
          </div>
        </div>

        {!isInsideExtension && (
          <div className="mt-8">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-sm inline-flex items-center gap-2 shadow-xl shadow-cyan-600/20"
            >
              <Download className="w-5 h-5" />
              <span>{isDownloading ? 'Packaging Extension...' : 'Download Extension (.ZIP) Now'}</span>
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 bg-slate-950 text-slate-500 text-xs text-center flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
            P
          </div>
          <span className="text-slate-400 font-semibold">PersonaTab</span>
          <span>· Manifest V3 Compliant Chrome Extension</span>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={onLaunchDashboard} className="hover:text-slate-300 transition-colors">Launch Dashboard</button>
          {!isInsideExtension && (
            <button
              onClick={onGoToDownload || handleDownload}
              className="hover:text-slate-300 transition-colors"
            >
              Download Tab
            </button>
          )}
          <a href="https://freenewsapi.io" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">FreeNewsAPI.io</a>
        </div>
      </footer>
    </div>
  );
};
