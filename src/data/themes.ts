import { ThemeType } from '../types';

export interface ThemeDefinition {
  id: ThemeType;
  name: string;
  description: string;
  previewBg: string;
  containerClass: string;
  cardClass: string;
  textClass: string;
  mutedTextClass: string;
  borderClass: string;
  bgImageUrl?: string;
  isDark: boolean;
}

export const THEME_DEFINITIONS: Record<ThemeType, ThemeDefinition> = {
  dark: {
    id: 'dark',
    name: 'Obsidian Dark',
    description: 'Refined deep slate with subtle contrast and hairline dividers',
    previewBg: 'bg-slate-900',
    containerClass: 'bg-slate-950 text-slate-100',
    cardClass: 'bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-sm',
    textClass: 'text-slate-100',
    mutedTextClass: 'text-slate-400',
    borderClass: 'border-slate-800',
    isDark: true
  },
  light: {
    id: 'light',
    name: 'Architectural Light',
    description: 'Clean gallery white with crisp typography and subtle slate borders',
    previewBg: 'bg-slate-100',
    containerClass: 'bg-slate-50 text-slate-900',
    cardClass: 'bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm',
    textClass: 'text-slate-900',
    mutedTextClass: 'text-slate-500',
    borderClass: 'border-slate-200',
    isDark: false
  },
  amoled: {
    id: 'amoled',
    name: 'AMOLED Pure Black',
    description: 'True pitch-black canvas with sharp contrast and zero battery waste',
    previewBg: 'bg-black',
    containerClass: 'bg-black text-neutral-100',
    cardClass: 'bg-neutral-950 border border-neutral-800/90 shadow-none',
    textClass: 'text-neutral-100',
    mutedTextClass: 'text-neutral-400',
    borderClass: 'border-neutral-800',
    isDark: true
  },
  glassmorphism: {
    id: 'glassmorphism',
    name: 'Aurora Glass',
    description: 'Luminous frosted glass with ethereal aurora ambient backdrops',
    previewBg: 'bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950',
    containerClass: 'bg-slate-950 text-slate-100',
    cardClass: 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-lg',
    textClass: 'text-slate-100',
    mutedTextClass: 'text-slate-300',
    borderClass: 'border-white/10',
    bgImageUrl: '/src/assets/images/glass_aurora_gradient_1794041617718.jpg',
    isDark: true
  },
  gradient: {
    id: 'gradient',
    name: 'Deep Twilight',
    description: 'Subtle atmospheric dusk gradient with rich violet and cyan undertones',
    previewBg: 'bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900',
    containerClass: 'bg-gradient-to-br from-slate-950 via-indigo-950/70 to-slate-950 text-slate-100',
    cardClass: 'bg-slate-900/70 backdrop-blur-lg border border-indigo-500/15 shadow-md',
    textClass: 'text-slate-100',
    mutedTextClass: 'text-indigo-200/70',
    borderClass: 'border-indigo-500/20',
    isDark: true
  },
  nature: {
    id: 'nature',
    name: 'Alpine Mist',
    description: 'Majestic misty mountain peak at sunrise with calm cinematic warmth',
    previewBg: 'bg-emerald-950',
    containerClass: 'bg-slate-950 text-slate-100',
    cardClass: 'bg-slate-900/75 backdrop-blur-xl border border-white/15 shadow-xl',
    textClass: 'text-white',
    mutedTextClass: 'text-slate-200',
    borderClass: 'border-white/15',
    bgImageUrl: '/src/assets/images/nature_mountain_landscape_1794041617421.jpg',
    isDark: true
  },
  minimal: {
    id: 'minimal',
    name: 'Nordic Minimal',
    description: 'Stripped of all noise — ultra-legible typography and subtle hairlines',
    previewBg: 'bg-neutral-900',
    containerClass: 'bg-neutral-900 text-neutral-100',
    cardClass: 'bg-transparent border border-neutral-800 shadow-none',
    textClass: 'text-neutral-100',
    mutedTextClass: 'text-neutral-400',
    borderClass: 'border-neutral-800',
    isDark: true
  },
  custom: {
    id: 'custom',
    name: 'Custom Backdrop',
    description: 'Personalized wallpaper with customizable blur and opacity',
    previewBg: 'bg-slate-800',
    containerClass: 'bg-slate-950 text-slate-100',
    cardClass: 'bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-md',
    textClass: 'text-slate-100',
    mutedTextClass: 'text-slate-300',
    borderClass: 'border-white/10',
    isDark: true
  }
};
