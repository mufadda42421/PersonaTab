import React, { useState } from 'react';
import {
  Download,
  CheckCircle,
  FolderArchive,
  Terminal,
  Copy,
  Check,
  ShieldCheck,
  Chrome,
  ArrowRight,
  ExternalLink,
  Sparkles,
  HelpCircle,
  FileCode,
  Laptop
} from 'lucide-react';
import { ExtensionExporter } from '../../services/extensionExporter';

interface Props {
  onGoToShowcase: () => void;
  onLaunchDashboard?: () => void;
}

export const DownloadTab: React.FC<Props> = ({ onGoToShowcase, onLaunchDashboard }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);
    try {
      await ExtensionExporter.downloadExtensionZip();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (err) {
      console.error('Error downloading extension:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const copyExtensionsUrl = () => {
    navigator.clipboard.writeText('chrome://extensions');
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 max-w-5xl mx-auto space-y-12 animate-in fade-in duration-300">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Chrome Manifest V3 · Ready to Install</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Download PersonaTab Extension
        </h1>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Get the complete, self-contained Chrome New Tab extension. All 13 personas, 30+ working tools, calculators, FreeNewsAPI.io integration, and theme customizers are bundled and ready to run locally in your browser.
        </p>

        {/* Primary Download Card */}
        <div className="pt-4 flex flex-col items-center justify-center gap-3">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>
              {isDownloading
                ? 'Packaging Extension ZIP...'
                : downloadSuccess
                ? 'Downloaded Successfully!'
                : 'Download Extension (.ZIP)'}
            </span>
          </button>

          {/* Unboxed Metadata */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 font-medium">
            <span>Version 1.0.1</span>
            <span>·</span>
            <span>Pre-compiled Assets</span>
            <span>·</span>
            <span>920 KB</span>
            <span>·</span>
            <span>Manifest V3</span>
            <span>·</span>
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Private & Local
            </span>
          </div>

          {downloadSuccess && (
            <div className="mt-2 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>PersonaTab-Chrome-Extension.zip saved! Follow the 5 quick steps below to load it into Chrome.</span>
            </div>
          )}
        </div>
      </div>

      {/* Button Fix Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-3 shadow-lg">
        <div className="w-8 h-8 rounded-xl bg-indigo-950 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-800/40">
          <FileCode className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <div className="font-bold text-white text-sm">Standalone Pre-compiled Bundle</div>
          <p className="text-slate-400 leading-relaxed">
            All buttons, calculators, and tools are pre-compiled into self-contained production assets with relative paths. You don't need Node.js, Vite, or terminal commands—everything runs immediately inside Google Chrome.
          </p>
        </div>
      </div>

      {/* Step-by-Step Installation Guide */}
      <div className="space-y-6">
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-extrabold text-white">How to Install in 30 Seconds</h2>
          <p className="text-xs text-slate-400 mt-1">
            PersonaTab uses standard Chrome Manifest V3 developer loading.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-sm text-white">Extract ZIP</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extract <code className="text-indigo-300 font-mono text-[11px]">PersonaTab-Chrome-Extension.zip</code> to any folder on your machine.
              </p>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">Unzip archive</div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-sm text-white">Open Extensions</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                In Chrome, go to <span className="text-indigo-300 font-mono text-[11px]">chrome://extensions</span>
              </p>
            </div>
            <button
              onClick={copyExtensionsUrl}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold flex items-center justify-between border border-slate-700 transition-colors"
            >
              <span>Copy URL</span>
              {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
            </button>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-sm text-white">Developer Mode</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Turn on the <strong>Developer mode</strong> switch located in the top-right corner.
              </p>
            </div>
            <div className="text-[11px] text-indigo-400 font-medium">Toggle switch ON</div>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                4
              </div>
              <h3 className="font-bold text-sm text-white">Load Unpacked</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Click <strong>Load unpacked</strong> button in top-left, then select the extracted folder.
              </p>
            </div>
            <div className="text-[11px] text-emerald-400 font-medium">Select folder</div>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                5
              </div>
              <h3 className="font-bold text-sm text-white">Open New Tab</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Press <kbd className="px-1 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">Ctrl+T</kbd> / <kbd className="px-1 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">Cmd+T</kbd> and click "Keep it".
              </p>
            </div>
            <div className="text-[11px] text-cyan-400 font-medium">Ready to work!</div>
          </div>
        </div>
      </div>

      {/* Package Contents & Browser Support Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Archive Manifest V3 Tree */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <FolderArchive className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-sm text-white">What's Inside the ZIP Archive</h3>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs text-slate-300 space-y-1.5 border border-slate-800/80">
            <div className="text-indigo-400">PersonaTab-Chrome-Extension/</div>
            <div className="pl-4 text-emerald-400">├── manifest.json <span className="text-slate-500 font-sans">· Chrome Manifest V3</span></div>
            <div className="pl-4 text-slate-200">├── index.html <span className="text-slate-500 font-sans">· New tab entry point</span></div>
            <div className="pl-4 text-slate-400">├── INSTALLATION_INSTRUCTIONS.txt</div>
            <div className="pl-4 text-indigo-400">├── assets/</div>
            <div className="pl-8 text-cyan-400">├── index-*.js <span className="text-slate-500 font-sans">· Compiled app engine</span></div>
            <div className="pl-8 text-pink-400">└── index-*.css <span className="text-slate-500 font-sans">· Tailored styling</span></div>
            <div className="pl-4 text-indigo-400">└── icons/</div>
            <div className="pl-8 text-slate-400">├── icon16.png, icon48.png, icon128.png</div>
          </div>

          <p className="text-[11px] text-slate-400">
            Zero external CDN dependencies needed at runtime. Clean, self-contained, and lightning fast.
          </p>
        </div>

        {/* Compatibility & Requirements */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Laptop className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-sm text-white">Chromium Browser Compatibility</h3>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-200 font-medium">Google Chrome 88+</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-200 font-medium">Brave Browser</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-200 font-medium">Microsoft Edge</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-200 font-medium">Arc & Vivaldi</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onGoToShowcase}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Explore Product Showcase</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {onLaunchDashboard && (
              <button
                onClick={onLaunchDashboard}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                Preview Live Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
