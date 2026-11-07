import React, { useState } from 'react';
import { Shield, Lock, X, Check, AlertTriangle, Clock, Globe, Plus, Trash2, LogOut } from 'lucide-react';
import { KidsProfile } from '../../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  kidsProfile: KidsProfile;
  onUpdateProfile: (updated: KidsProfile) => void;
  onExitKidMode: () => void;
}

export const KidsParentalControlsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  kidsProfile,
  onUpdateProfile,
  onExitKidMode
}) => {
  const [pinEntered, setPinEntered] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'limits' | 'websites' | 'activities' | 'exit'>('limits');

  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteUrl, setNewSiteUrl] = useState('');
  const [newBlockedWord, setNewBlockedWord] = useState('');

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinEntered === (kidsProfile.parentPin || '1234')) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleAddAllowedSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSiteName.trim() || !newSiteUrl.trim()) return;
    const updated = {
      ...kidsProfile,
      allowedSites: [
        ...kidsProfile.allowedSites,
        { name: newSiteName.trim(), url: newSiteUrl.trim(), icon: 'Globe' }
      ]
    };
    onUpdateProfile(updated);
    setNewSiteName('');
    setNewSiteUrl('');
  };

  const handleRemoveAllowedSite = (url: string) => {
    const updated = {
      ...kidsProfile,
      allowedSites: kidsProfile.allowedSites.filter((s) => s.url !== url)
    };
    onUpdateProfile(updated);
  };

  const handleAddBlockedWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockedWord.trim()) return;
    const updated = {
      ...kidsProfile,
      blockedKeywords: [...kidsProfile.blockedKeywords, newBlockedWord.trim().toLowerCase()]
    };
    onUpdateProfile(updated);
    setNewBlockedWord('');
  };

  const handleRemoveBlockedWord = (w: string) => {
    const updated = {
      ...kidsProfile,
      blockedKeywords: kidsProfile.blockedKeywords.filter((item) => item !== w)
    };
    onUpdateProfile(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-slate-100 text-sm">Parental Controls & Safety Center</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Auth Gate */}
        {!isAuthenticated ? (
          <form onSubmit={handlePinSubmit} className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-indigo-950/70 border border-indigo-500/40 text-indigo-400 mx-auto flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-base">Parent Verification Required</h4>
              <p className="text-xs text-slate-400 mt-1">
                Enter your 4-digit Parent PIN to configure screen time, blocked domains, or exit Kid Mode (Default: <code className="text-indigo-300 font-mono font-bold">1234</code>)
              </p>
            </div>

            <input
              type="password"
              maxLength={4}
              value={pinEntered}
              onChange={(e) => {
                setPinEntered(e.target.value);
                setPinError(false);
              }}
              placeholder="••••"
              autoFocus
              className="w-32 mx-auto text-center font-mono text-2xl tracking-widest px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-indigo-500 block"
            />

            {pinError && (
              <p className="text-rose-400 text-xs font-medium">Incorrect PIN. Please try again.</p>
            )}

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-colors"
            >
              Verify PIN
            </button>
          </form>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setActiveTab('limits')}
                className={`flex-1 py-1.5 rounded-md transition-colors ${
                  activeTab === 'limits' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Screen Limits
              </button>
              <button
                onClick={() => setActiveTab('websites')}
                className={`flex-1 py-1.5 rounded-md transition-colors ${
                  activeTab === 'websites' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Web Filters
              </button>
              <button
                onClick={() => setActiveTab('exit')}
                className={`flex-1 py-1.5 rounded-md transition-colors ${
                  activeTab === 'exit' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Exit Kid Mode
              </button>
            </div>

            {/* Limits Tab */}
            {activeTab === 'limits' && (
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Daily Screen Limit</span>
                    <span className="font-mono text-indigo-400 font-bold">{kidsProfile.screenTimeLimitMinutes} mins</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="240"
                    step="15"
                    value={kidsProfile.screenTimeLimitMinutes}
                    onChange={(e) =>
                      onUpdateProfile({ ...kidsProfile, screenTimeLimitMinutes: Number(e.target.value) })
                    }
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>30m</span>
                    <span>1h</span>
                    <span>2h</span>
                    <span>4h</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Bedtime Lockout Hour</span>
                    <span className="font-mono text-indigo-400 font-bold">{kidsProfile.bedtimeStartHour}:00 PM</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="22"
                    step="1"
                    value={kidsProfile.bedtimeStartHour}
                    onChange={(e) =>
                      onUpdateProfile({ ...kidsProfile, bedtimeStartHour: Number(e.target.value) })
                    }
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400">
                    After this time, dashboard games are replaced with gentle story time and bedtime reminders.
                  </p>
                </div>
              </div>
            )}

            {/* Websites Tab */}
            {activeTab === 'websites' && (
              <div className="space-y-4 text-xs">
                {/* Transparency Notice */}
                <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-900/50 flex gap-2 text-[11px] text-amber-300/90 leading-relaxed">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <span>
                    <strong>Safety Notice:</strong> Chrome extension-level filters govern shortcuts, search suggestions, and dashboard routing. They cannot guarantee complete device-wide operating system network blocking.
                  </span>
                </div>

                <div>
                  <h5 className="font-semibold text-slate-200 mb-1.5">Approved Safe Websites</h5>
                  <form onSubmit={handleAddAllowedSite} className="flex gap-1.5 mb-2">
                    <input
                      type="text"
                      placeholder="Name (e.g. Duolingo)"
                      value={newSiteName}
                      onChange={(e) => setNewSiteName(e.target.value)}
                      className="flex-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500"
                    />
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newSiteUrl}
                      onChange={(e) => setNewSiteUrl(e.target.value)}
                      className="flex-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </form>

                  <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                    {kidsProfile.allowedSites.map((site) => (
                      <div
                        key={site.url}
                        className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]"
                      >
                        <span className="font-medium text-slate-200 truncate">{site.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-500 text-[10px] truncate max-w-[140px]">{site.url}</span>
                          <button
                            onClick={() => handleRemoveAllowedSite(site.url)}
                            className="text-slate-500 hover:text-rose-400 p-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-slate-200 mb-1.5">Search Keyword Blacklist</h5>
                  <form onSubmit={handleAddBlockedWord} className="flex gap-1.5 mb-2">
                    <input
                      type="text"
                      placeholder="Add blocked keyword or phrase..."
                      value={newBlockedWord}
                      onChange={(e) => setNewBlockedWord(e.target.value)}
                      className="flex-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-slate-100"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
                    >
                      Block
                    </button>
                  </form>

                  <div className="flex flex-wrap gap-1">
                    {kidsProfile.blockedKeywords.map((w) => (
                      <span
                        key={w}
                        className="px-2 py-0.5 rounded-full bg-rose-950/60 border border-rose-900/60 text-rose-300 font-mono text-[10px] flex items-center gap-1"
                      >
                        <span>{w}</span>
                        <X
                          onClick={() => handleRemoveBlockedWord(w)}
                          className="w-2.5 h-2.5 cursor-pointer hover:text-white"
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Exit Kid Mode Tab */}
            {activeTab === 'exit' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-rose-950/60 text-rose-400 mx-auto flex items-center justify-center border border-rose-900/50">
                  <LogOut className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-sm">Exit Kid Mode</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Switch back to standard adult workspace or select another professional profile.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onExitKidMode();
                    onClose();
                  }}
                  className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Confirm Exit Kid Mode
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
