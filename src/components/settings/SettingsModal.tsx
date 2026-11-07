import React, { useState, useEffect } from 'react';
import {
  Settings,
  X,
  User,
  Palette,
  Search,
  Newspaper,
  Shield,
  Download,
  Upload,
  RotateCcw,
  ExternalLink,
  Check,
  Code2,
  Key,
  Globe
} from 'lucide-react';
import { UserProfile, RoleType, SearchEngineType } from '../../types';
import { StorageService } from '../../services/storageService';
import { ROLE_DEFINITIONS } from '../../data/roles';
import { ExtensionExporter } from '../../services/extensionExporter';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const SettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'role' | 'search' | 'news' | 'extension' | 'data'>('general');
  const [userName, setUserName] = useState(profile.name);
  const [clockFormat24, setClockFormat24] = useState(profile.clockFormat24);
  const [showSeconds, setShowSeconds] = useState(profile.showSeconds);
  const [greetingCustom, setGreetingCustom] = useState(profile.greetingCustom || '');
  const [searchEngine, setSearchEngine] = useState<SearchEngineType>(profile.searchEngine);
  const [freeNewsApiKey, setFreeNewsApiKey] = useState('');
  const [customNewsApiKey, setCustomNewsApiKey] = useState('');
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    StorageService.getItem<string>('freenewsapi_key', '').then(setFreeNewsApiKey);
    StorageService.getItem<string>('custom_news_api_key', '').then(setCustomNewsApiKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const saveGeneral = () => {
    const updated: UserProfile = {
      ...profile,
      name: userName,
      clockFormat24,
      showSeconds,
      greetingCustom,
      searchEngine
    };
    onUpdateProfile(updated);
    showNotice('Preferences updated successfully!');
  };

  const handleRoleSwitch = (newRole: RoleType) => {
    const updated: UserProfile = {
      ...profile,
      role: newRole
    };
    onUpdateProfile(updated);
    showNotice(`Switched role to ${ROLE_DEFINITIONS[newRole].title}!`);
  };

  const saveNewsApiKeys = async () => {
    await StorageService.setItem('freenewsapi_key', freeNewsApiKey.trim());
    await StorageService.setItem('custom_news_api_key', customNewsApiKey.trim());
    showNotice('News API keys saved! Live feed updated.');
  };

  const handleDownloadExtension = async () => {
    setIsDownloadingZip(true);
    try {
      await ExtensionExporter.downloadExtensionZip();
      showNotice('PersonaTab-Chrome-Extension.zip downloaded!');
    } catch (e) {
      console.error('Download error:', e);
      showNotice('Failed to create extension zip package.');
    } finally {
      setIsDownloadingZip(false);
    }
  };

  const handleExportData = async () => {
    const json = await StorageService.exportAllData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `personatab-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showNotice('Dashboard backup exported!');
  };

  const handleImportData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const success = await StorageService.importAllData(text);
    if (success) {
      showNotice('Data restored successfully! Reloading...');
      setTimeout(() => window.location.reload(), 1000);
    } else {
      showNotice('Failed to restore data. Invalid JSON format.');
    }
  };

  const handleResetData = async () => {
    if (confirm('Are you sure you want to reset all PersonaTab settings to default?')) {
      await StorageService.clearAll();
      showNotice('Reset complete. Reloading...');
      setTimeout(() => window.location.reload(), 800);
    }
  };

  const showNotice = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-slate-100 text-base">PersonaTab Settings</h3>
          </div>
          <div className="flex items-center gap-2">
            {!StorageService.isRunningInChromeExtension() && (
              <button
                onClick={handleDownloadExtension}
                disabled={isDownloadingZip}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isDownloadingZip ? 'Packing...' : 'Download (.zip)'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className="bg-emerald-950 border-b border-emerald-800/80 px-4 py-2 text-emerald-300 text-xs font-medium flex items-center gap-2">
            <Check className="w-3.5 h-3.5" />
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-56 p-3 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 space-y-1 text-xs shrink-0">
            {[
              { id: 'general', label: 'General & Clock', icon: User },
              { id: 'role', label: 'Persona Identity', icon: Palette },
              { id: 'search', label: 'Smart Search', icon: Search },
              { id: 'news', label: 'FreeNewsAPI.io', icon: Newspaper },
              { id: 'extension', label: 'Install Chrome Extension', icon: Code2 },
              { id: 'data', label: 'Privacy & Backup', icon: Shield }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full px-3 py-2 rounded-xl text-left font-medium flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Pane */}
          <div className="flex-1 overflow-y-auto p-5 text-xs space-y-5">
            {/* General Tab */}
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-100 text-sm mb-1">User & Display Preferences</h4>
                  <p className="text-slate-400 text-xs">Configure your greeting name and time display options.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-slate-300 block mb-1 font-semibold">Your Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1 font-semibold">Custom Greeting Quote (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Let’s build something extraordinary today."
                      value={greetingCustom}
                      onChange={(e) => setGreetingCustom(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">24-Hour Military Format</span>
                      <input
                        type="checkbox"
                        checked={clockFormat24}
                        onChange={(e) => setClockFormat24(e.target.checked)}
                        className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">Show Live Seconds</span>
                      <input
                        type="checkbox"
                        checked={showSeconds}
                        onChange={(e) => setShowSeconds(e.target.checked)}
                        className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  <button
                    onClick={saveGeneral}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Role Tab */}
            {activeTab === 'role' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-100 text-sm mb-1">Switch Your Active Persona</h4>
                  <p className="text-slate-400 text-xs">
                    Change your persona at any time without losing custom widgets or notes.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
                  {Object.values(ROLE_DEFINITIONS).map((r) => (
                    <div
                      key={r.id}
                      onClick={() => handleRoleSwitch(r.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        profile.role === r.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{r.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{r.subtitle}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Tab */}
            {activeTab === 'search' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-100 text-sm mb-1">Default Search Engine</h4>
                  <p className="text-slate-400 text-xs">Select your preferred central new tab search engine.</p>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'google', name: 'Google Search' },
                    { id: 'duckduckgo', name: 'DuckDuckGo (Private)' },
                    { id: 'bing', name: 'Microsoft Bing' },
                    { id: 'brave', name: 'Brave Search' },
                    { id: 'youtube', name: 'YouTube' },
                    { id: 'github', name: 'GitHub Code' }
                  ].map((engine) => (
                    <div
                      key={engine.id}
                      onClick={() => {
                        setSearchEngine(engine.id as SearchEngineType);
                        onUpdateProfile({ ...profile, searchEngine: engine.id as SearchEngineType });
                        showNotice(`Default search set to ${engine.name}`);
                      }}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                        profile.searchEngine === engine.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{engine.name}</span>
                      {profile.searchEngine === engine.id && <Check className="w-4 h-4 text-indigo-400" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* News API Tab (FreeNewsAPI.io) */}
            {activeTab === 'news' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-100 text-sm mb-1">Real Live News API Integration</h4>
                  <p className="text-slate-400 text-xs">
                    PersonaTab only shows real, authentic news. Connect your <strong>FreeNewsAPI.io</strong> key below for 5,000 real news requests per day.
                  </p>
                </div>

                {/* FreeNewsAPI.io Integration Box */}
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-indigo-300">
                      <Globe className="w-4 h-4 text-indigo-400" />
                      <span>FreeNewsAPI.io (Recommended)</span>
                    </div>
                    <a
                      href="https://freenewsapi.io"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-indigo-400 hover:text-indigo-300 underline flex items-center gap-1 font-medium"
                    >
                      <span>Get Free API Key</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    FreeNewsAPI.io gives 5,000 requests/day for real-time global news across Technology, Business, Science, Entertainment, and World topics.
                  </p>

                  <div className="space-y-1.5">
                    <label className="text-[11px] text-slate-400 font-semibold block">FreeNewsAPI.io API Key</label>
                    <input
                      type="password"
                      placeholder="Paste your FreeNewsAPI.io key..."
                      value={freeNewsApiKey}
                      onChange={(e) => setFreeNewsApiKey(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 font-mono text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Secondary NewsAPI.org Option */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-semibold text-slate-300 block text-xs">Optional: Alternative NewsAPI.org Key</span>
                  <input
                    type="password"
                    placeholder="Optional NewsAPI.org key..."
                    value={customNewsApiKey}
                    onChange={(e) => setCustomNewsApiKey(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-slate-100 text-xs focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400">
                    Live fallbacks: Spaceflight News & BBC verified feeds active.
                  </span>
                  <button
                    onClick={saveNewsApiKeys}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md"
                  >
                    Save API Key
                  </button>
                </div>
              </div>
            )}

            {/* Chrome Extension Load Tab */}
            {activeTab === 'extension' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-100 text-sm mb-1">Download & Install in Chrome</h4>
                  <p className="text-slate-400 text-xs">
                    Download the complete unpacked Chrome Extension package (.zip) and install it in seconds.
                  </p>
                </div>

                {/* Prominent Download Button */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-950 to-purple-950/80 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h5 className="font-bold text-slate-100 text-sm">PersonaTab Extension (.ZIP)</h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Includes Manifest V3, relative bundle assets, and ready-to-load package.
                    </p>
                  </div>

                  <button
                    onClick={handleDownloadExtension}
                    disabled={isDownloadingZip}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/20 whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isDownloadingZip ? 'Packaging Extension...' : 'Download Extension (.ZIP)'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="font-bold text-indigo-400 text-xs uppercase tracking-wide">
                    Installation Steps (Takes ~30 seconds):
                  </span>
                  <ol className="list-decimal list-inside space-y-2 text-slate-300 text-xs leading-relaxed">
                    <li>
                      Click <strong>Download Extension (.ZIP)</strong> above and extract the zip file to any folder on your computer.
                    </li>
                    <li>
                      In Google Chrome, open a new tab and go to: <code className="text-indigo-300 font-mono font-bold">chrome://extensions</code>
                    </li>
                    <li>
                      Turn on <strong>Developer mode</strong> using the toggle switch in the top-right corner.
                    </li>
                    <li>
                      Click <strong>Load unpacked</strong> in the top-left corner.
                    </li>
                    <li>
                      Select the extracted folder containing <code className="text-indigo-300 font-mono">manifest.json</code>.
                    </li>
                    <li>
                      Open a new Chrome tab — PersonaTab is now your active new tab page!
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {/* Privacy & Data Tab */}
            {activeTab === 'data' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-100 text-sm mb-1">Privacy & Data Management</h4>
                  <p className="text-slate-400 text-xs">
                    All your settings, notes, and customizations are stored strictly on your local machine using Chrome Extension Local Storage. No external tracking or telemetry.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleExportData}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex flex-col items-center justify-center gap-2 text-slate-200 transition-colors"
                  >
                    <Download className="w-5 h-5 text-indigo-400" />
                    <span className="font-semibold text-xs">Export Backup JSON</span>
                  </button>

                  <label className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex flex-col items-center justify-center gap-2 text-slate-200 cursor-pointer transition-colors">
                    <Upload className="w-5 h-5 text-emerald-400" />
                    <span className="font-semibold text-xs">Restore from JSON</span>
                    <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <button
                    onClick={handleResetData}
                    className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/80 text-rose-300 font-bold flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Extension Data</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
