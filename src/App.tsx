import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  KidsProfile,
  WidgetConfig,
  ShortcutItem,
  RoleType,
  ThemeType
} from './types';
import { StorageService } from './services/storageService';
import { ROLE_DEFINITIONS } from './data/roles';
import { THEME_DEFINITIONS } from './data/themes';
import { WidgetRegistryService } from './services/widgetRegistry';

// Components
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { TopBar } from './components/navigation/TopBar';
import { SmartSearchBar } from './components/search/SmartSearchBar';
import { ShortcutsGrid } from './components/shortcuts/ShortcutsGrid';
import { WidgetRenderer } from './components/widgets/WidgetRenderer';
import { NewsSection } from './components/news/NewsSection';
import { CustomizeBar } from './components/customizer/CustomizeBar';
import { WidgetLibraryModal } from './components/customizer/WidgetLibraryModal';
import { ThemeModal } from './components/customizer/ThemeModal';
import { SettingsModal } from './components/settings/SettingsModal';
import { KidsDashboard } from './components/kids/KidsDashboard';
import { ShowcaseWebsite } from './components/showcase/ShowcaseWebsite';
import { DownloadTab } from './components/download/DownloadTab';

import {
  GripVertical,
  X,
  Maximize2,
  Minimize2,
  CheckCircle,
  EyeOff,
  Clock,
  Calendar,
  Sparkles
} from 'lucide-react';

const PROFILE_KEY = 'user_profile';
const WIDGETS_KEY = 'user_widgets';
const SHORTCUTS_KEY = 'user_shortcuts';
const KIDS_PROFILE_KEY = 'kids_profile';

const DEFAULT_PROFILE: UserProfile = {
  onboardingCompleted: false,
  name: '',
  role: 'developer',
  secondaryInterests: [],
  rolePreferences: {},
  theme: 'dark',
  backgroundBlur: 0,
  borderRadius: 'rounded',
  searchEngine: 'google',
  clockFormat24: true,
  showSeconds: true,
  greetingCustom: '',
  sidebarCollapsed: false,
  gridColumns: 3
};

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [kidsProfile, setKidsProfile] = useState<KidsProfile | null>(null);
  const [widgets, setWidgets] = useState<WidgetConfig[]>([]);
  const [shortcuts, setShortcuts] = useState<ShortcutItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // View States (Website defaults to 'showcase', installed Chrome extension defaults to 'dashboard')
  const isExtensionRuntime = StorageService.isRunningInChromeExtension();
  const [activeView, setActiveView] = useState<'showcase' | 'download' | 'dashboard'>(
    isExtensionRuntime ? 'dashboard' : 'showcase'
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [backupWidgets, setBackupWidgets] = useState<WidgetConfig[]>([]);

  // Modals
  const [widgetLibraryOpen, setWidgetLibraryOpen] = useState<boolean>(false);
  const [themeModalOpen, setThemeModalOpen] = useState<boolean>(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Time state for live clock
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load from Storage
  useEffect(() => {
    const initData = async () => {
      try {
        const loadedProfile = await StorageService.getItem<UserProfile>(PROFILE_KEY, DEFAULT_PROFILE);
        const loadedKids = await StorageService.getItem<KidsProfile | null>(KIDS_PROFILE_KEY, null);

        let initialWidgets: WidgetConfig[] = [];
        let initialShortcuts: ShortcutItem[] = [];

        if (loadedProfile.onboardingCompleted) {
          const roleDef = ROLE_DEFINITIONS[loadedProfile.role] || ROLE_DEFINITIONS.developer;
          initialWidgets = await StorageService.getItem<WidgetConfig[]>(
            `${WIDGETS_KEY}_${loadedProfile.role}`,
            roleDef.defaultWidgets
          );
          initialShortcuts = await StorageService.getItem<ShortcutItem[]>(
            `${SHORTCUTS_KEY}_${loadedProfile.role}`,
            roleDef.defaultShortcuts
          );
        }

        setProfile(loadedProfile);
        setKidsProfile(loadedKids);
        setWidgets(initialWidgets);
        setShortcuts(initialShortcuts);
      } catch (e) {
        console.error('Failed to initialize storage:', e);
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, []);

  // Sync dark class on documentElement for Tailwind CSS
  useEffect(() => {
    const themeDef = THEME_DEFINITIONS[profile.theme] || THEME_DEFINITIONS.dark;
    if (themeDef.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [profile.theme]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOnboardingComplete = async (newProfile: UserProfile, newKidsProfile?: KidsProfile) => {
    const roleDef = ROLE_DEFINITIONS[newProfile.role];
    const initialWidgets = roleDef.defaultWidgets;
    const initialShortcuts = roleDef.defaultShortcuts;

    setProfile(newProfile);
    if (newKidsProfile) setKidsProfile(newKidsProfile);
    setWidgets(initialWidgets);
    setShortcuts(initialShortcuts);

    await StorageService.setItem(PROFILE_KEY, newProfile);
    if (newKidsProfile) await StorageService.setItem(KIDS_PROFILE_KEY, newKidsProfile);
    await StorageService.setItem(`${WIDGETS_KEY}_${newProfile.role}`, initialWidgets);
    await StorageService.setItem(`${SHORTCUTS_KEY}_${newProfile.role}`, initialShortcuts);

    showToast(`Welcome! Your ${roleDef.title} workspace is ready.`);
  };

  const handleRoleChange = async (newRole: RoleType) => {
    const roleDef = ROLE_DEFINITIONS[newRole];
    const updatedProfile: UserProfile = {
      ...profile,
      role: newRole
    };

    // Load or generate widgets for that role
    const loadedRoleWidgets = await StorageService.getItem<WidgetConfig[]>(
      `${WIDGETS_KEY}_${newRole}`,
      roleDef.defaultWidgets
    );
    const loadedRoleShortcuts = await StorageService.getItem<ShortcutItem[]>(
      `${SHORTCUTS_KEY}_${newRole}`,
      roleDef.defaultShortcuts
    );

    setProfile(updatedProfile);
    setWidgets(loadedRoleWidgets);
    setShortcuts(loadedRoleShortcuts);

    await StorageService.setItem(PROFILE_KEY, updatedProfile);
    showToast(`Switched persona to ${roleDef.title}`);
  };

  // Customization & Edit Mode Handlers
  const handleToggleEditMode = () => {
    if (!isEditMode) {
      setBackupWidgets(JSON.parse(JSON.stringify(widgets)));
      setIsEditMode(true);
    } else {
      setIsEditMode(false);
    }
  };

  const handleSaveChanges = async () => {
    await StorageService.setItem(`${WIDGETS_KEY}_${profile.role}`, widgets);
    await StorageService.setItem(`${SHORTCUTS_KEY}_${profile.role}`, shortcuts);
    await StorageService.setItem(PROFILE_KEY, profile);

    setIsEditMode(false);
    setHasUnsavedChanges(false);
    showToast('Changes saved successfully!');
  };

  const handleCancelChanges = () => {
    setWidgets(backupWidgets);
    setIsEditMode(false);
    setHasUnsavedChanges(false);
    showToast('Changes discarded.');
  };

  const handleResetLayout = () => {
    const roleDef = ROLE_DEFINITIONS[profile.role];
    setWidgets(roleDef.defaultWidgets);
    setShortcuts(roleDef.defaultShortcuts);
    setHasUnsavedChanges(true);
    showToast('Reset to role defaults.');
  };

  const handleAddWidget = (widgetId: string) => {
    const newWidget = WidgetRegistryService.createDefaultConfig(widgetId, widgets.length + 1);
    setWidgets([...widgets, newWidget]);
    setHasUnsavedChanges(true);
    showToast(`Added ${newWidget.title}`);
  };

  const handleRemoveWidget = (id: string) => {
    setWidgets(widgets.filter((w) => w.id !== id));
    setHasUnsavedChanges(true);
  };

  const handleToggleWidgetSize = (id: string) => {
    const sizes: WidgetConfig['size'][] = ['small', 'medium', 'large'];
    setWidgets(
      widgets.map((w) => {
        if (w.id === id) {
          const nextIdx = (sizes.indexOf(w.size) + 1) % sizes.length;
          return { ...w, size: sizes[nextIdx] };
        }
        return w;
      })
    );
    setHasUnsavedChanges(true);
  };

  const handleColumnsChange = (cols: 2 | 3 | 4) => {
    setProfile({ ...profile, gridColumns: cols });
    setHasUnsavedChanges(true);
  };

  // Border radius utility class
  const getRadiusClass = () => {
    switch (profile.borderRadius) {
      case 'sharp': return 'rounded-md';
      case 'soft': return 'rounded-3xl';
      default: return 'rounded-2xl';
    }
  };

  // Widget span class based on size and gridColumns
  const getWidgetSpanClass = (size: WidgetConfig['size']) => {
    if (size === 'large') {
      return 'col-span-1 md:col-span-2 lg:col-span-3';
    }
    if (size === 'medium') {
      return 'col-span-1 md:col-span-2';
    }
    return 'col-span-1';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // If first-time user, render Onboarding Flow
  if (!profile.onboardingCompleted) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  // If role is Kids Mode, render child dashboard
  if (profile.role === 'kids' && kidsProfile) {
    return (
      <KidsDashboard
        kidsProfile={kidsProfile}
        onUpdateKidsProfile={(updated) => {
          setKidsProfile(updated);
          StorageService.setItem(KIDS_PROFILE_KEY, updated);
        }}
        onExitKidMode={() => handleRoleChange('general')}
      />
    );
  }

  const currentTheme = THEME_DEFINITIONS[profile.theme] || THEME_DEFINITIONS.dark;
  const currentRole = ROLE_DEFINITIONS[profile.role] || ROLE_DEFINITIONS.developer;

  // Background style
  const bgImage = profile.customBackgroundUrl || currentTheme.bgImageUrl || currentRole.preferredBackground;

  // Live greeting
  const hour = currentTime.getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const displayGreeting = profile.greetingCustom
    ? profile.greetingCustom
    : `${timeGreeting}, ${profile.name || 'there'}.`;

  const hoursStr = profile.clockFormat24
    ? String(currentTime.getHours()).padStart(2, '0')
    : String(currentTime.getHours() % 12 || 12);
  const minutesStr = String(currentTime.getMinutes()).padStart(2, '0');
  const secondsStr = String(currentTime.getSeconds()).padStart(2, '0');
  const dateFormatted = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={`min-h-screen ${currentTheme.containerClass} flex flex-col relative transition-colors duration-300`}>
      {/* Background Image / Ambient Backing */}
      {bgImage && (
        <div
          className="fixed inset-0 pointer-events-none -z-10 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url('${bgImage}')`,
            filter: `blur(${profile.backgroundBlur}px)`,
            opacity: currentTheme.isDark ? 0.35 : 0.15
          }}
        />
      )}

      {/* Top Navigation Bar */}
      <TopBar
        role={profile.role}
        onRoleChange={handleRoleChange}
        isEditMode={isEditMode}
        onToggleEditMode={handleToggleEditMode}
        onOpenSettings={() => setSettingsModalOpen(true)}
        activeView={activeView}
        onViewChange={setActiveView}
      />

      {/* Edit Mode Customization Toolbar */}
      <CustomizeBar
        isEditMode={isEditMode}
        gridColumns={profile.gridColumns}
        onColumnsChange={handleColumnsChange}
        onOpenWidgetLibrary={() => setWidgetLibraryOpen(true)}
        onOpenThemeSelector={() => setThemeModalOpen(true)}
        onSave={handleSaveChanges}
        onCancel={handleCancelChanges}
        onReset={handleResetLayout}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/50 text-emerald-300 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Viewport Content */}
      {activeView === 'showcase' ? (
        <ShowcaseWebsite
          onLaunchDashboard={() => setActiveView('dashboard')}
          onGoToDownload={() => setActiveView('download')}
        />
      ) : activeView === 'download' ? (
        <DownloadTab
          onGoToShowcase={() => setActiveView('showcase')}
          onLaunchDashboard={() => setActiveView('dashboard')}
        />
      ) : (
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* Header / Hero Glance (Clock, Greeting & Search) */}
            <div className="text-center pt-2 pb-4 space-y-2">
              {/* Personalized Greeting */}
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100 flex items-center justify-center gap-2">
                <span>{displayGreeting}</span>
              </h1>

              {/* Large Clock & Date */}
              <div className="flex items-center justify-center gap-3">
                <div className="text-4xl sm:text-6xl font-extrabold font-mono tabular-nums tracking-tight text-white drop-shadow-md">
                  {hoursStr}:{minutesStr}
                  {profile.showSeconds && (
                    <span className="text-xl sm:text-2xl text-indigo-400 font-semibold ml-1.5">
                      :{secondsStr}
                    </span>
                  )}
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>{dateFormatted}</span>
                <span>·</span>
                <span className="capitalize text-indigo-400 font-semibold">{currentRole.badge}</span>
              </div>

              {/* Smart Central Search Bar */}
              <SmartSearchBar
                defaultEngine={profile.searchEngine}
                onEngineChange={(eng) => {
                  setProfile({ ...profile, searchEngine: eng });
                  StorageService.setItem(PROFILE_KEY, { ...profile, searchEngine: eng });
                }}
              />

              {/* Quick Bookmarks / Shortcuts Grid */}
              <ShortcutsGrid
                shortcuts={shortcuts}
                onUpdateShortcuts={(updated) => {
                  setShortcuts(updated);
                  StorageService.setItem(`${SHORTCUTS_KEY}_${profile.role}`, updated);
                }}
                isEditMode={isEditMode}
              />
            </div>

            {/* DASHBOARD WIDGETS GRID */}
            <div
              className={`grid gap-4 transition-all ${
                  profile.gridColumns === 2
                    ? 'grid-cols-1 md:grid-cols-2'
                    : profile.gridColumns === 4
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {widgets.map((widget) => (
                  <div
                    key={widget.id}
                    className={`relative group ${currentTheme.cardClass} ${getRadiusClass()} ${getWidgetSpanClass(
                      widget.size
                    )} flex flex-col justify-between overflow-hidden transition-all duration-200 ${
                      isEditMode ? 'ring-2 ring-indigo-500/40 hover:ring-indigo-400' : ''
                    }`}
                  >
                    {/* Edit Mode Overlay Handles */}
                    {isEditMode && (
                      <div className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-slate-950/90 backdrop-blur-md p-1 rounded-xl border border-slate-700 shadow-md">
                        <button
                          onClick={() => handleToggleWidgetSize(widget.id)}
                          className="p-1 rounded-lg hover:bg-slate-800 text-slate-300"
                          title="Toggle size (Small / Medium / Large)"
                        >
                          <Maximize2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleRemoveWidget(widget.id)}
                          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-rose-400"
                          title="Remove from dashboard"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {/* Widget Content Component */}
                    <WidgetRenderer widget={widget} />
                  </div>
                ))}
              </div>

            {/* Role-Adapted News Intelligence */}
            <NewsSection role={profile.role} onOpenSettings={() => setSettingsModalOpen(true)} />
          </main>
      )}

      {/* Modals */}
      <WidgetLibraryModal
        isOpen={widgetLibraryOpen}
        onClose={() => setWidgetLibraryOpen(false)}
        userRole={profile.role}
        activeWidgetIds={widgets.map((w) => w.id)}
        onAddWidget={handleAddWidget}
      />

      <ThemeModal
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
        currentTheme={profile.theme}
        backgroundBlur={profile.backgroundBlur}
        borderRadius={profile.borderRadius}
        customBackgroundUrl={profile.customBackgroundUrl}
        onSaveThemeSettings={(settings) => {
          setProfile({
            ...profile,
            ...settings
          });
          setHasUnsavedChanges(true);
        }}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        profile={profile}
        onUpdateProfile={(updated) => {
          setProfile(updated);
          StorageService.setItem(PROFILE_KEY, updated);
        }}
      />
    </div>
  );
}
