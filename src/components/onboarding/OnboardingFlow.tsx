import React, { useState } from 'react';
import {
  Briefcase,
  Terminal,
  GraduationCap,
  Gamepad2,
  Video,
  Palette,
  Laptop,
  TrendingUp,
  BookMarked,
  Compass,
  PenTool,
  Sparkles,
  Smile,
  ArrowRight,
  ArrowLeft,
  Check,
  LayoutDashboard
} from 'lucide-react';
import { RoleType, ThemeType, UserProfile, KidsProfile } from '../../types';
import { ROLE_DEFINITIONS } from '../../data/roles';
import { THEME_DEFINITIONS } from '../../data/themes';

interface Props {
  onComplete: (profile: UserProfile, kidsProfile?: KidsProfile) => void;
}

export const OnboardingFlow: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedRole, setSelectedRole] = useState<RoleType>('developer');
  const [userName, setUserName] = useState<string>('');
  const [secondaryInterests, setSecondaryInterests] = useState<string[]>([]);
  const [rolePreferenceChoice, setRolePreferenceChoice] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('dark');

  // Kids-specific onboarding states if 'kids' role selected
  const [kidNickname, setKidNickname] = useState('');
  const [kidAgeGroup, setKidAgeGroup] = useState<'4-6' | '7-9' | '10-12'>('7-9');
  const [kidGender, setKidGender] = useState<'boy' | 'girl' | 'neutral'>('neutral');

  const currentRoleDef = ROLE_DEFINITIONS[selectedRole];

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else finalizeSetup();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleInterest = (interest: string) => {
    if (secondaryInterests.includes(interest)) {
      setSecondaryInterests(secondaryInterests.filter((i) => i !== interest));
    } else {
      setSecondaryInterests([...secondaryInterests, interest]);
    }
  };

  const finalizeSetup = () => {
    const profile: UserProfile = {
      onboardingCompleted: true,
      name: selectedRole === 'kids' ? kidNickname || 'Explorer' : userName || 'Friend',
      role: selectedRole,
      secondaryInterests,
      rolePreferences: {
        focus: rolePreferenceChoice || currentRoleDef.preferenceQuestion.options[0]?.id
      },
      theme: selectedTheme,
      backgroundBlur: selectedTheme === 'glassmorphism' || selectedTheme === 'nature' ? 12 : 0,
      borderRadius: 'rounded',
      searchEngine: 'google',
      clockFormat24: true,
      showSeconds: true,
      greetingCustom: '',
      sidebarCollapsed: false,
      gridColumns: 3
    };

    let kidsProfile: KidsProfile | undefined;
    if (selectedRole === 'kids') {
      kidsProfile = {
        nickname: kidNickname || 'Explorer',
        ageGroup: kidAgeGroup,
        genderPreference: kidGender,
        favoriteInterests: secondaryInterests.length > 0 ? secondaryInterests : ['Space', 'Dinosaurs', 'Drawing'],
        parentPin: '1234',
        screenTimeLimitMinutes: 90,
        bedtimeStartHour: 20,
        bedtimeEndHour: 7,
        allowedSites: [
          { name: 'PBS Kids', url: 'https://pbskids.org', icon: 'Gamepad2' },
          { name: 'NASA Kids', url: 'https://nasa.gov/kidsclub', icon: 'Rocket' },
          { name: 'Scratch Coding', url: 'https://scratch.mit.edu', icon: 'Code' }
        ],
        blockedKeywords: ['violence', 'horror', 'adult', 'gambling'],
        enabledActivities: ['math', 'drawing', 'quiz', 'reading'],
        usageTodayMinutes: 15,
        stars: 10,
        badges: ['First Flight', 'Star Reader']
      };
    }

    onComplete(profile, kidsProfile);
  };

  const renderRoleIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 shrink-0' };
    switch (iconName) {
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Terminal': return <Terminal {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Gamepad2': return <Gamepad2 {...props} />;
      case 'Video': return <Video {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Laptop': return <Laptop {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'BookMarked': return <BookMarked {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'PenTool': return <PenTool {...props} />;
      case 'Smile': return <Smile {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-slate-100 p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-2xl p-6 sm:p-10 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold shadow-md shadow-indigo-500/20">
              P
            </div>
            <span className="font-bold text-base tracking-tight text-slate-100">PersonaTab</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
            <span>Step {step} of 5</span>
            <div className="flex gap-1 ml-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`w-6 h-1 rounded-full transition-all duration-300 ${
                    s === step ? 'bg-indigo-500 w-8' : s < step ? 'bg-indigo-500/50' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* SCREEN 1: WELCOME */}
        {step === 1 && (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/10">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
                Your browser. Your world.
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                A modern, personalized workspace designed around who you are. Tailored tools, feeds, and shortcuts for every profession.
              </p>
            </div>

            <div className="max-w-xs mx-auto text-left">
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">What should we call you? (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Alex, Maya, or Nick"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 inline-flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* SCREEN 2: CHOOSE YOUR ROLE */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">What best describes you?</h2>
              <p className="text-xs text-slate-400 mt-1">
                Select your primary identity. PersonaTab will calibrate its widgets, calculators, and feeds.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {Object.values(ROLE_DEFINITIONS).map((role) => {
                const isSelected = selectedRole === role.id;
                return (
                  <div
                    key={role.id}
                    onClick={() => {
                      setSelectedRole(role.id);
                      if (role.preferredBackground) {
                        setSelectedTheme(role.id === 'kids' ? 'nature' : 'dark');
                      }
                    }}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/10 scale-[1.02]'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300'}`}>
                        {renderRoleIcon(role.iconName)}
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                    </div>
                    <div className="font-semibold text-xs text-slate-100">{role.title}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{role.subtitle}</div>
                  </div>
                );
              })}
            </div>

            {/* Secondary Interests */}
            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">
                Secondary interests (Optional)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {currentRoleDef.sampleInterests.map((interest) => {
                  const active = secondaryInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                        active
                          ? 'bg-indigo-600 text-white font-medium'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-medium flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: PERSONALIZED PREFERENCES */}
        {step === 3 && (
          <div className="space-y-5">
            {selectedRole === 'kids' ? (
              // Kid Mode specific onboarding form
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-pink-400">Welcome to Kid Mode! 🌟</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Let’s set up your fun, safe adventure dashboard with math games, quizzes, and drawing!
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-semibold">What’s your nickname?</label>
                    <input
                      type="text"
                      placeholder="e.g. Leo, Mia, Captain Sam"
                      value={kidNickname}
                      onChange={(e) => setKidNickname(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-semibold">Age Group</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['4-6', '7-9', '10-12'] as const).map((ag) => (
                        <button
                          key={ag}
                          onClick={() => setKidAgeGroup(ag)}
                          className={`py-2 rounded-xl border text-xs font-bold transition-colors ${
                            kidAgeGroup === ag ? 'bg-pink-600 border-pink-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'
                          }`}
                        >
                          {ag} Years
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-semibold">Avatar Preference</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'boy', label: 'Boy Explorer' },
                        { id: 'girl', label: 'Girl Explorer' },
                        { id: 'neutral', label: 'Star Voyager' }
                      ].map((g) => (
                        <button
                          key={g.id}
                          onClick={() => setKidGender(g.id as any)}
                          className={`py-2 rounded-xl border text-xs font-bold transition-colors ${
                            kidGender === g.id ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Standard Role tailored question
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">{currentRoleDef.preferenceQuestion.title}</h2>
                  <p className="text-xs text-slate-400 mt-1">{currentRoleDef.preferenceQuestion.description}</p>
                </div>

                <div className="space-y-2">
                  {currentRoleDef.preferenceQuestion.options.map((opt) => {
                    const isSelected = rolePreferenceChoice === opt.id || (!rolePreferenceChoice && opt === currentRoleDef.preferenceQuestion.options[0]);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setRolePreferenceChoice(opt.id)}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-indigo-600/20 border-indigo-500 text-slate-100'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="font-medium text-xs">{opt.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-medium flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: THEME SELECTION */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">Choose your aesthetic</h2>
              <p className="text-xs text-slate-400 mt-1">
                Select a visual atmosphere. You can fine-tune backgrounds and blur anytime.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.values(THEME_DEFINITIONS).map((theme) => {
                const isSelected = selectedTheme === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-indigo-500 ring-2 ring-indigo-500/30 scale-[1.02]'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/50'
                    }`}
                  >
                    <div className={`w-full h-12 rounded-xl ${theme.previewBg} mb-2 border border-white/10 flex items-center justify-center`}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div className="font-semibold text-xs text-slate-100">{theme.name}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{theme.description}</div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-medium flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md flex items-center gap-1.5"
              >
                <span>Preview Ready</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 5: COMPLETE SETUP */}
        {step === 5 && (
          <div className="space-y-6 text-center py-2">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
                Your workspace is ready!
              </h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                PersonaTab configured your dashboard with role-specific widgets, verified news feeds, and your chosen theme.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 max-w-md mx-auto p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 block">ROLE</span>
                <span className="text-indigo-400 font-semibold truncate block capitalize">{selectedRole}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">THEME</span>
                <span className="text-slate-200 font-semibold truncate block capitalize">{selectedTheme}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">WIDGETS</span>
                <span className="text-emerald-400 font-semibold block">{currentRoleDef.defaultWidgets.length} Ready</span>
              </div>
            </div>

            <button
              onClick={finalizeSetup}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 inline-flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Launch My Dashboard</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
