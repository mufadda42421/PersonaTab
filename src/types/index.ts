export type RoleType =
  | 'businessman'
  | 'developer'
  | 'student'
  | 'gamer'
  | 'creator'
  | 'designer'
  | 'freelancer'
  | 'trader'
  | 'teacher'
  | 'jobseeker'
  | 'writer'
  | 'general'
  | 'kids';

export type ThemeType =
  | 'dark'
  | 'light'
  | 'amoled'
  | 'glassmorphism'
  | 'gradient'
  | 'nature'
  | 'minimal'
  | 'custom';

export type SearchEngineType = 'google' | 'bing' | 'duckduckgo' | 'brave' | 'youtube' | 'github';

export interface ShortcutItem {
  id: string;
  title: string;
  url: string;
  iconName?: string;
  category?: string;
}

export interface WidgetConfig {
  id: string;
  title: string;
  category: string;
  size: 'small' | 'medium' | 'large'; // small: 1 col, medium: 2 col, large: full/3 col
  visible: boolean;
  order: number;
  settings?: Record<string, any>;
}

export interface UserProfile {
  onboardingCompleted: boolean;
  name: string;
  role: RoleType;
  secondaryInterests: string[];
  rolePreferences: Record<string, any>;
  theme: ThemeType;
  customBackgroundUrl?: string;
  backgroundBlur: number; // 0 to 24px
  borderRadius: 'sharp' | 'rounded' | 'soft';
  searchEngine: SearchEngineType;
  clockFormat24: boolean;
  showSeconds: boolean;
  greetingCustom?: string;
  sidebarCollapsed: boolean;
  gridColumns: 2 | 3 | 4;
}

export interface KidsProfile {
  nickname: string;
  ageGroup: '4-6' | '7-9' | '10-12';
  genderPreference: 'boy' | 'girl' | 'neutral';
  favoriteInterests: string[];
  parentPin: string;
  screenTimeLimitMinutes: number;
  bedtimeStartHour: number;
  bedtimeEndHour: number;
  allowedSites: { name: string; url: string; icon: string }[];
  blockedKeywords: string[];
  enabledActivities: string[];
  usageTodayMinutes: number;
  stars: number;
  badges: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  category: string;
  readTime: string;
  imageUrl?: string;
  saved?: boolean;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  color?: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}
