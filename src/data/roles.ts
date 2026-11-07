import { RoleType, ShortcutItem, WidgetConfig } from '../types';

export interface RoleDefinition {
  id: RoleType;
  title: string;
  subtitle: string;
  iconName: string;
  badge: string;
  accentColor: string;
  defaultTheme: string;
  preferredBackground?: string;
  preferenceQuestion: {
    title: string;
    description: string;
    options: { id: string; label: string; icon?: string }[];
  };
  defaultWidgets: WidgetConfig[];
  defaultShortcuts: ShortcutItem[];
  sampleInterests: string[];
}

export const ROLE_DEFINITIONS: Record<RoleType, RoleDefinition> = {
  businessman: {
    id: 'businessman',
    title: 'Businessman / Entrepreneur',
    subtitle: 'High-leverage business metrics, market intelligence, finances & calculators',
    iconName: 'Briefcase',
    badge: 'Executive',
    accentColor: '#3b82f6',
    defaultTheme: 'dark',
    sampleInterests: ['Startups', 'Venture Capital', 'Fintech', 'Global Markets', 'SaaS', 'Leadership'],
    preferenceQuestion: {
      title: 'What drives your business operations?',
      description: 'Select your core focus areas to tune financial feeds and calculators',
      options: [
        { id: 'b2b_saas', label: 'B2B SaaS / Tech Venture' },
        { id: 'ecommerce', label: 'E-commerce & Retail' },
        { id: 'services', label: 'Consulting & Agencies' },
        { id: 'investment', label: 'Angel Investing & Funds' }
      ]
    },
    defaultWidgets: [
      { id: 'biz_markets', title: 'Global Indices & Markets', category: 'Finance', size: 'medium', visible: true, order: 1 },
      { id: 'biz_gst_calc', title: 'GST / VAT Calculator', category: 'Business', size: 'small', visible: true, order: 2 },
      { id: 'biz_margin_calc', title: 'Margin & Profit Calculator', category: 'Business', size: 'small', visible: true, order: 3 },
      { id: 'biz_emi_calc', title: 'EMI & Loan Calculator', category: 'Finance', size: 'small', visible: true, order: 4 },
      { id: 'biz_expense_tracker', title: 'Business Expenses', category: 'Business', size: 'medium', visible: true, order: 5 },
      { id: 'currency_converter', title: 'Currency Converter', category: 'Finance', size: 'small', visible: true, order: 6 },
      { id: 'quick_notes', title: 'Executive Memo', category: 'Productivity', size: 'small', visible: true, order: 7 }
    ],
    defaultShortcuts: [
      { id: 's1', title: 'Google Workspace', url: 'https://workspace.google.com', iconName: 'Mail' },
      { id: 's2', title: 'Stripe Dashboard', url: 'https://dashboard.stripe.com', iconName: 'CreditCard' },
      { id: 's3', title: 'Crunchbase', url: 'https://crunchbase.com', iconName: 'TrendingUp' },
      { id: 's4', title: 'Bloomberg', url: 'https://bloomberg.com', iconName: 'LineChart' },
      { id: 's5', title: 'LinkedIn', url: 'https://linkedin.com', iconName: 'Users' }
    ]
  },

  developer: {
    id: 'developer',
    title: 'Developer / Programmer',
    subtitle: 'Streamlined developer utilities, code snippets, formatter & trending repos',
    iconName: 'Terminal',
    badge: 'Code Engine',
    accentColor: '#6366f1',
    defaultTheme: 'dark',
    preferredBackground: '/src/assets/images/developer_dark_workspace_1794041619243.jpg',
    sampleInterests: ['TypeScript', 'Rust', 'Go', 'AI/LLM Infra', 'Next.js', 'DevOps', 'Docker'],
    preferenceQuestion: {
      title: 'What is your primary engineering stack?',
      description: 'We will personalize code snippets, docs, and trending libraries',
      options: [
        { id: 'fullstack_web', label: 'Full-Stack Web (React, Node, Next)' },
        { id: 'systems_backend', label: 'Backend / Systems (Go, Rust, K8s)' },
        { id: 'ai_data', label: 'AI, Data Science & Python' },
        { id: 'mobile_embedded', label: 'Mobile / Embedded Systems' }
      ]
    },
    defaultWidgets: [
      { id: 'dev_code_snippets', title: 'Code Snippets Vault', category: 'Development', size: 'medium', visible: true, order: 1 },
      { id: 'dev_json_formatter', title: 'JSON Formatter & Validator', category: 'Development', size: 'medium', visible: true, order: 2 },
      { id: 'dev_regex_tester', title: 'Regex Matcher & Tester', category: 'Development', size: 'small', visible: true, order: 3 },
      { id: 'dev_base64', title: 'Base64 & URL Encoder', category: 'Development', size: 'small', visible: true, order: 4 },
      { id: 'dev_git_ref', title: 'Git Command Reference', category: 'Development', size: 'medium', visible: true, order: 5 },
      { id: 'dev_github_trending', title: 'Trending Repositories', category: 'Development', size: 'medium', visible: true, order: 6 },
      { id: 'dev_html_scratchpad', title: 'HTML / JS Scratchpad', category: 'Development', size: 'large', visible: true, order: 7 }
    ],
    defaultShortcuts: [
      { id: 'd1', title: 'GitHub', url: 'https://github.com', iconName: 'Github' },
      { id: 'd2', title: 'Stack Overflow', url: 'https://stackoverflow.com', iconName: 'Layers' },
      { id: 'd3', title: 'MDN Web Docs', url: 'https://developer.mozilla.org', iconName: 'BookOpen' },
      { id: 'd4', title: 'Hacker News', url: 'https://news.ycombinator.com', iconName: 'Radio' },
      { id: 'd5', title: 'Vercel / Cloud', url: 'https://vercel.com', iconName: 'Cloud' }
    ]
  },

  student: {
    id: 'student',
    title: 'Student / Academic',
    subtitle: 'Study timetables, flashcards, scientific calculator & focus pomodoro',
    iconName: 'GraduationCap',
    badge: 'Scholar',
    accentColor: '#10b981',
    defaultTheme: 'glassmorphism',
    sampleInterests: ['Computer Science', 'Medicine', 'Mathematics', 'Economics', 'Literature', 'Physics'],
    preferenceQuestion: {
      title: 'What is your current level of study?',
      description: 'Configures academic calendars, exam countdowns, and calculators',
      options: [
        { id: 'high_school', label: 'High School / Prep' },
        { id: 'undergrad', label: 'Undergraduate Degree' },
        { id: 'postgrad', label: 'Masters / Graduate Program' },
        { id: 'phd_research', label: 'PhD / Postdoc Research' }
      ]
    },
    defaultWidgets: [
      { id: 'student_pomodoro', title: 'Pomodoro Study Focus', category: 'Study', size: 'small', visible: true, order: 1 },
      { id: 'student_flashcards', title: 'Smart Study Flashcards', category: 'Study', size: 'medium', visible: true, order: 2 },
      { id: 'student_sci_calc', title: 'Scientific Calculator', category: 'Study', size: 'small', visible: true, order: 3 },
      { id: 'student_timetable', title: 'Weekly Class Schedule', category: 'Study', size: 'medium', visible: true, order: 4 },
      { id: 'student_goals', title: 'Daily Study Goals', category: 'Study', size: 'small', visible: true, order: 5 },
      { id: 'student_unit_converter', title: 'Unit Converter', category: 'Study', size: 'small', visible: true, order: 6 }
    ],
    defaultShortcuts: [
      { id: 'st1', title: 'Google Classroom', url: 'https://classroom.google.com', iconName: 'BookOpen' },
      { id: 'st2', title: 'Notion', url: 'https://notion.so', iconName: 'FileText' },
      { id: 'st3', title: 'Wolfram Alpha', url: 'https://wolframalpha.com', iconName: 'Cpu' },
      { id: 'st4', title: 'Google Scholar', url: 'https://scholar.google.com', iconName: 'Search' },
      { id: 'st5', title: 'Wikipedia', url: 'https://wikipedia.org', iconName: 'Globe' }
    ]
  },

  gamer: {
    id: 'gamer',
    title: 'Gamer / Streamer',
    subtitle: 'Upcoming release countdowns, deals tracker, game recommendations & library',
    iconName: 'Gamepad2',
    badge: 'Pro Gamer',
    accentColor: '#ec4899',
    defaultTheme: 'amoled',
    sampleInterests: ['RPG / Action', 'FPS / Tactical', 'Indie Gems', 'Steam Sales', 'Esports', 'MMORPG'],
    preferenceQuestion: {
      title: 'What platforms do you primarily game on?',
      description: 'Sync release countdowns and deal alerts to your setup',
      options: [
        { id: 'pc_steam', label: 'PC (Steam / Epic / GOG)' },
        { id: 'playstation', label: 'PlayStation 5' },
        { id: 'xbox', label: 'Xbox Series X/S' },
        { id: 'nintendo', label: 'Nintendo Switch' }
      ]
    },
    defaultWidgets: [
      { id: 'gamer_countdowns', title: 'Upcoming Releases Countdown', category: 'Gaming', size: 'medium', visible: true, order: 1 },
      { id: 'gamer_deals', title: 'Game Deals & Freebies', category: 'Gaming', size: 'medium', visible: true, order: 2 },
      { id: 'gamer_recommender', title: 'Game Roulette & Recommendations', category: 'Gaming', size: 'small', visible: true, order: 3 },
      { id: 'quick_notes', title: 'Quest & Build Notes', category: 'Productivity', size: 'small', visible: true, order: 4 },
      { id: 'gamer_shortcuts', title: 'Gaming Hub Links', category: 'Gaming', size: 'small', visible: true, order: 5 }
    ],
    defaultShortcuts: [
      { id: 'g1', title: 'Steam Store', url: 'https://store.steampowered.com', iconName: 'Gamepad' },
      { id: 'g2', title: 'Epic Games', url: 'https://store.epicgames.com', iconName: 'ShoppingBag' },
      { id: 'g3', title: 'Twitch', url: 'https://twitch.tv', iconName: 'Tv' },
      { id: 'g4', title: 'Discord', url: 'https://discord.com', iconName: 'MessageSquare' },
      { id: 'g5', title: 'IGN News', url: 'https://ign.com', iconName: 'Flame' }
    ]
  },

  creator: {
    id: 'creator',
    title: 'Content Creator',
    subtitle: 'Video idea spark, caption & hashtag helper, upload schedule & script hooks',
    iconName: 'Video',
    badge: 'Studio',
    accentColor: '#f59e0b',
    defaultTheme: 'glassmorphism',
    preferredBackground: '/src/assets/images/glass_aurora_gradient_1794041617718.jpg',
    sampleInterests: ['YouTube Shorts', 'Instagram Reels', 'TikTok', 'Podcasting', 'Video Editing', 'Thumbnails'],
    preferenceQuestion: {
      title: 'Where do you publish most often?',
      description: 'We will calibrate tags, idea prompts, and scheduling cadences',
      options: [
        { id: 'youtube', label: 'YouTube Long-form & Shorts' },
        { id: 'instagram_tiktok', label: 'Instagram Reels & TikTok' },
        { id: 'podcasts', label: 'Audio Podcasts & Newsletters' },
        { id: 'linkedin_x', label: 'Written Articles & X/Twitter' }
      ]
    },
    defaultWidgets: [
      { id: 'creator_idea_spark', title: 'Video & Hook Generator', category: 'Creator', size: 'medium', visible: true, order: 1 },
      { id: 'creator_hashtags', title: 'Caption & Hashtag Helper', category: 'Creator', size: 'small', visible: true, order: 2 },
      { id: 'creator_calendar', title: 'Content Production Calendar', category: 'Creator', size: 'medium', visible: true, order: 3 },
      { id: 'creator_script_notes', title: 'Hook & Script Notes', category: 'Creator', size: 'small', visible: true, order: 4 },
      { id: 'quick_notes', title: 'Sponsorship Notes', category: 'Productivity', size: 'small', visible: true, order: 5 }
    ],
    defaultShortcuts: [
      { id: 'c1', title: 'YouTube Studio', url: 'https://studio.youtube.com', iconName: 'Youtube' },
      { id: 'c2', title: 'CapCut / Editing', url: 'https://capcut.com', iconName: 'Scissors' },
      { id: 'c3', title: 'Canva', url: 'https://canva.com', iconName: 'Palette' },
      { id: 'c4', title: 'Instagram Web', url: 'https://instagram.com', iconName: 'Camera' },
      { id: 'c5', title: 'Substack', url: 'https://substack.com', iconName: 'Feather' }
    ]
  },

  designer: {
    id: 'designer',
    title: 'Designer / UI/UX',
    subtitle: 'Dynamic palette generator, CSS gradient tool, typography tester & inspiration',
    iconName: 'Palette',
    badge: 'Creative',
    accentColor: '#8b5cf6',
    defaultTheme: 'dark',
    sampleInterests: ['UI/UX Design', 'Design Systems', '3D Graphics', 'Typography', 'Figma Plugins', 'Branding'],
    preferenceQuestion: {
      title: 'What is your core design domain?',
      description: 'Tailors font suggestions, color schemes, and portfolio feeds',
      options: [
        { id: 'ui_ux', label: 'Product Design & UI/UX' },
        { id: 'branding_graphic', label: 'Branding & Graphic Design' },
        { id: 'motion_3d', label: 'Motion Graphics & 3D' },
        { id: 'design_systems', label: 'Design Systems & Tokens' }
      ]
    },
    defaultWidgets: [
      { id: 'designer_palette_gen', title: 'Color Palette Harmonizer', category: 'Design', size: 'medium', visible: true, order: 1 },
      { id: 'designer_gradient_tool', title: 'CSS Gradient Studio', category: 'Design', size: 'medium', visible: true, order: 2 },
      { id: 'designer_font_pairer', title: 'Font Pairing & Sizing', category: 'Design', size: 'small', visible: true, order: 3 },
      { id: 'designer_inspiration', title: 'Curated Inspiration', category: 'Design', size: 'small', visible: true, order: 4 },
      { id: 'quick_notes', title: 'Design Review Checklist', category: 'Productivity', size: 'small', visible: true, order: 5 }
    ],
    defaultShortcuts: [
      { id: 'ds1', title: 'Figma', url: 'https://figma.com', iconName: 'Figma' },
      { id: 'ds2', title: 'Dribbble', url: 'https://dribbble.com', iconName: 'Dribbble' },
      { id: 'ds3', title: 'Behance', url: 'https://behance.net', iconName: 'Globe' },
      { id: 'ds4', title: 'Mobbin', url: 'https://mobbin.com', iconName: 'Smartphone' },
      { id: 'ds5', title: 'Fontshare', url: 'https://fontshare.com', iconName: 'Type' }
    ]
  },

  freelancer: {
    id: 'freelancer',
    title: 'Freelancer / Consultant',
    subtitle: 'Client project pipeline, hourly rate calculator, time tracker & bill generator',
    iconName: 'Laptop',
    badge: 'Independent',
    accentColor: '#14b8a6',
    defaultTheme: 'dark',
    sampleInterests: ['Contracting', 'Proposal Writing', 'Invoicing', 'Remote Work', 'Client Management'],
    preferenceQuestion: {
      title: 'How do you bill your freelance clients?',
      description: 'Pre-configures project pipelines and financial conversion rates',
      options: [
        { id: 'hourly', label: 'Hourly Rate & Retainers' },
        { id: 'fixed_project', label: 'Fixed Price Milestones' },
        { id: 'value_pricing', label: 'Value-Based / Equity' },
        { id: 'agency', label: 'Subcontracting / Boutique' }
      ]
    },
    defaultWidgets: [
      { id: 'freelance_projects', title: 'Project Pipeline Tracker', category: 'Freelance', size: 'medium', visible: true, order: 1 },
      { id: 'freelance_time_tracker', title: 'Billable Time Tracker', category: 'Freelance', size: 'small', visible: true, order: 2 },
      { id: 'freelance_rate_calc', title: 'Hourly Rate Calculator', category: 'Freelance', size: 'small', visible: true, order: 3 },
      { id: 'freelance_invoice_calc', title: 'Invoice & Tax Estimator', category: 'Freelance', size: 'medium', visible: true, order: 4 },
      { id: 'currency_converter', title: 'Cross-Border Converter', category: 'Finance', size: 'small', visible: true, order: 5 },
      { id: 'quick_notes', title: 'Client Meeting Minutes', category: 'Productivity', size: 'small', visible: true, order: 6 }
    ],
    defaultShortcuts: [
      { id: 'fl1', title: 'Upwork', url: 'https://upwork.com', iconName: 'Briefcase' },
      { id: 'fl2', title: 'Invoice Ninja / Stripe', url: 'https://stripe.com', iconName: 'FileCheck' },
      { id: 'fl3', title: 'Clockify', url: 'https://clockify.me', iconName: 'Clock' },
      { id: 'fl4', title: 'Wise / PayPal', url: 'https://wise.com', iconName: 'CreditCard' },
      { id: 'fl5', title: 'Trello / Linear', url: 'https://linear.app', iconName: 'CheckSquare' }
    ]
  },

  trader: {
    id: 'trader',
    title: 'Trader / Investor',
    subtitle: 'NIFTY, SENSEX, global indices, watchlist, compound interest & risk calculator',
    iconName: 'TrendingUp',
    badge: 'Markets',
    accentColor: '#10b981',
    defaultTheme: 'amoled',
    sampleInterests: ['Equities', 'Crypto', 'Options / Derivatives', 'Macroeconomics', 'Commodities', 'ETFs'],
    preferenceQuestion: {
      title: 'What markets do you monitor most closely?',
      description: 'Customizes your central watchlist and economic calendar',
      options: [
        { id: 'india_nse_bse', label: 'Indian Equities (NIFTY / SENSEX)' },
        { id: 'us_global', label: 'US Equities (S&P 500 / NASDAQ)' },
        { id: 'crypto_defi', label: 'Cryptocurrency & Digital Assets' },
        { id: 'forex_commodities', label: 'Forex, Gold & Commodities' }
      ]
    },
    defaultWidgets: [
      { id: 'trader_watchlist', title: 'Market Watchlist & Indices', category: 'Trading', size: 'medium', visible: true, order: 1 },
      { id: 'trader_compound_calc', title: 'Compound Growth Calculator', category: 'Trading', size: 'small', visible: true, order: 2 },
      { id: 'trader_risk_calc', title: 'Position Size & Risk Calculator', category: 'Trading', size: 'small', visible: true, order: 3 },
      { id: 'currency_converter', title: 'FX Rates & Currency', category: 'Finance', size: 'small', visible: true, order: 4 },
      { id: 'quick_notes', title: 'Trading Journal & Rules', category: 'Productivity', size: 'medium', visible: true, order: 5 }
    ],
    defaultShortcuts: [
      { id: 'tr1', title: 'TradingView', url: 'https://tradingview.com', iconName: 'LineChart' },
      { id: 'tr2', title: 'Zerodha / Broker', url: 'https://zerodha.com', iconName: 'Activity' },
      { id: 'tr3', title: 'Yahoo Finance', url: 'https://finance.yahoo.com', iconName: 'DollarSign' },
      { id: 'tr4', title: 'CoinGecko', url: 'https://coingecko.com', iconName: 'Coins' },
      { id: 'tr5', title: 'Investopedia', url: 'https://investopedia.com', iconName: 'BookOpen' }
    ]
  },

  teacher: {
    id: 'teacher',
    title: 'Teacher / Educator',
    subtitle: 'Lesson planning studio, class timetable, instant quiz builder & assignment logs',
    iconName: 'BookMarked',
    badge: 'Educator',
    accentColor: '#0ea5e9',
    defaultTheme: 'glassmorphism',
    sampleInterests: ['Pedagogy', 'STEM Curriculum', 'EdTech', 'Classroom Management', 'Gamified Learning'],
    preferenceQuestion: {
      title: 'What age group or subject do you teach?',
      description: 'Shapes quiz templates, lesson outlines, and classroom tools',
      options: [
        { id: 'primary_k5', label: 'Primary / Elementary (K-5)' },
        { id: 'middle_high', label: 'Middle / High School (6-12)' },
        { id: 'higher_ed', label: 'University / Higher Education' },
        { id: 'coaching_online', label: 'Test Prep & Online Tutoring' }
      ]
    },
    defaultWidgets: [
      { id: 'teacher_lesson_planner', title: 'Lesson Plan Studio', category: 'Teaching', size: 'medium', visible: true, order: 1 },
      { id: 'teacher_quiz_creator', title: 'Quick Quiz & Poll Builder', category: 'Teaching', size: 'small', visible: true, order: 2 },
      { id: 'teacher_timetable', title: 'Class & Period Schedule', category: 'Teaching', size: 'medium', visible: true, order: 3 },
      { id: 'teacher_assignment_tracker', title: 'Assignment Grading Log', category: 'Teaching', size: 'small', visible: true, order: 4 },
      { id: 'quick_notes', title: 'Parent-Teacher Notes', category: 'Productivity', size: 'small', visible: true, order: 5 }
    ],
    defaultShortcuts: [
      { id: 'tc1', title: 'Google Classroom', url: 'https://classroom.google.com', iconName: 'GraduationCap' },
      { id: 'tc2', title: 'Kahoot!', url: 'https://kahoot.com', iconName: 'Sparkles' },
      { id: 'tc3', title: 'Quizlet', url: 'https://quizlet.com', iconName: 'Layers' },
      { id: 'tc4', title: 'Edmodo / LMS', url: 'https://instructure.com/canvas', iconName: 'BookOpen' },
      { id: 'tc5', title: 'Khan Academy', url: 'https://khanacademy.org', iconName: 'Globe' }
    ]
  },

  jobseeker: {
    id: 'jobseeker',
    title: 'Job Seeker / Career Explorer',
    subtitle: 'Job application pipeline, interview countdown, STAR method prep & checklist',
    iconName: 'Compass',
    badge: 'Career',
    accentColor: '#f97316',
    defaultTheme: 'dark',
    sampleInterests: ['Software Engineering', 'Product Management', 'Remote Roles', 'Resume Building', 'Interviewing'],
    preferenceQuestion: {
      title: 'What stage is your career search currently in?',
      description: 'Prioritizes interview prep, application pipelines, or resume tune-ups',
      options: [
        { id: 'actively_interviewing', label: 'Actively Interviewing' },
        { id: 'submitting_applications', label: 'Submitting Applications & Resumes' },
        { id: 'exploring_passive', label: 'Exploring New Opportunities' },
        { id: 'new_grad', label: 'Recent Graduate Entering Workforce' }
      ]
    },
    defaultWidgets: [
      { id: 'job_application_tracker', title: 'Application Pipeline', category: 'Career', size: 'medium', visible: true, order: 1 },
      { id: 'job_interview_countdown', title: 'Upcoming Interview Countdown', category: 'Career', size: 'small', visible: true, order: 2 },
      { id: 'job_prep_star', title: 'STAR Interview Prep Assistant', category: 'Career', size: 'medium', visible: true, order: 3 },
      { id: 'job_resume_checklist', title: 'Resume & Portfolio Checklist', category: 'Career', size: 'small', visible: true, order: 4 },
      { id: 'quick_notes', title: 'Target Companies & Contacts', category: 'Productivity', size: 'small', visible: true, order: 5 }
    ],
    defaultShortcuts: [
      { id: 'js1', title: 'LinkedIn Jobs', url: 'https://linkedin.com/jobs', iconName: 'Briefcase' },
      { id: 'js2', title: 'Indeed', url: 'https://indeed.com', iconName: 'Search' },
      { id: 'js3', title: 'Wellfound (AngelList)', url: 'https://wellfound.com', iconName: 'Globe' },
      { id: 'js4', title: 'Glassdoor', url: 'https://glassdoor.com', iconName: 'Building' },
      { id: 'js5', title: 'LeetCode', url: 'https://leetcode.com', iconName: 'Code' }
    ]
  },

  writer: {
    id: 'writer',
    title: 'Writer / Journalist / Author',
    subtitle: 'Live word & reading time counter, writing sprint timer, dictionary & goal tracker',
    iconName: 'PenTool',
    badge: 'Author',
    accentColor: '#06b6d4',
    defaultTheme: 'nature',
    preferredBackground: '/src/assets/images/nature_mountain_landscape_1794041617421.jpg',
    sampleInterests: ['Fiction Novels', 'Journalism', 'Technical Writing', 'Copywriting', 'Essays', 'Screenwriting'],
    preferenceQuestion: {
      title: 'What format do you write most often?',
      description: 'Sets word count targets and writing sprint intervals',
      options: [
        { id: 'books_fiction', label: 'Novels & Fiction Manuscripts' },
        { id: 'articles_journalism', label: 'Journalism & Editorial Columns' },
        { id: 'copywriting', label: 'Marketing Copy & Brand Stories' },
        { id: 'academic_papers', label: 'Research Papers & Essays' }
      ]
    },
    defaultWidgets: [
      { id: 'writer_word_counter', title: 'Live Word & Read Time Counter', category: 'Writing', size: 'medium', visible: true, order: 1 },
      { id: 'writer_sprint_timer', title: 'Writing Sprint Timer', category: 'Writing', size: 'small', visible: true, order: 2 },
      { id: 'writer_daily_goal', title: 'Daily Word Goal Tracker', category: 'Writing', size: 'small', visible: true, order: 3 },
      { id: 'writer_thesaurus', title: 'Instant Thesaurus & Dictionary', category: 'Writing', size: 'medium', visible: true, order: 4 },
      { id: 'quick_notes', title: 'Draft Snippets & Quotes', category: 'Productivity', size: 'small', visible: true, order: 5 }
    ],
    defaultShortcuts: [
      { id: 'wr1', title: 'Google Docs', url: 'https://docs.google.com', iconName: 'FileText' },
      { id: 'wr2', title: 'Grammarly', url: 'https://grammarly.com', iconName: 'CheckCircle' },
      { id: 'wr3', title: 'Merriam-Webster', url: 'https://merriam-webster.com', iconName: 'Book' },
      { id: 'wr4', title: 'Thesaurus.com', url: 'https://thesaurus.com', iconName: 'Search' },
      { id: 'wr5', title: 'Medium', url: 'https://medium.com', iconName: 'Feather' }
    ]
  },

  general: {
    id: 'general',
    title: 'General User / Daily Driver',
    subtitle: 'Clean everyday clock, forecast, quick notes, checklist & entertainment picks',
    iconName: 'Sparkles',
    badge: 'Essential',
    accentColor: '#6366f1',
    defaultTheme: 'glassmorphism',
    preferredBackground: '/src/assets/images/nature_mountain_landscape_1794041617421.jpg',
    sampleInterests: ['World News', 'Tech Trends', 'Productivity', 'Culture', 'Health & Fitness', 'Travel'],
    preferenceQuestion: {
      title: 'What does your daily browser routine center on?',
      description: 'Organizes your top shortcuts and morning glance widgets',
      options: [
        { id: 'productivity_focus', label: 'Productivity, Notes & Tasks' },
        { id: 'news_discovery', label: 'News, Articles & Information' },
        { id: 'entertainment_media', label: 'Streaming, Entertainment & Social' },
        { id: 'minimal_zen', label: 'Clean, Distraction-Free Zen' }
      ]
    },
    defaultWidgets: [
      { id: 'general_weather', title: 'Weather & Forecast', category: 'General', size: 'small', visible: true, order: 1 },
      { id: 'general_clock_calendar', title: 'Clock & Calendar Glance', category: 'General', size: 'small', visible: true, order: 2 },
      { id: 'general_todo', title: 'Daily Tasks & Checklist', category: 'Productivity', size: 'medium', visible: true, order: 3 },
      { id: 'quick_notes', title: 'Scratchpad Notes', category: 'Productivity', size: 'small', visible: true, order: 4 },
      { id: 'general_calculator', title: 'Pocket Calculator', category: 'General', size: 'small', visible: true, order: 5 },
      { id: 'general_entertainment', title: 'Trending Media & Podcasts', category: 'General', size: 'medium', visible: true, order: 6 }
    ],
    defaultShortcuts: [
      { id: 'gn1', title: 'Google Mail', url: 'https://mail.google.com', iconName: 'Mail' },
      { id: 'gn2', title: 'YouTube', url: 'https://youtube.com', iconName: 'Youtube' },
      { id: 'gn3', title: 'Reddit', url: 'https://reddit.com', iconName: 'MessageSquare' },
      { id: 'gn4', title: 'Wikipedia', url: 'https://wikipedia.org', iconName: 'Globe' },
      { id: 'gn5', title: 'Amazon', url: 'https://amazon.com', iconName: 'ShoppingBag' }
    ]
  },

  kids: {
    id: 'kids',
    title: 'Kid Mode (Safe & Playful)',
    subtitle: 'Math games, drawing canvas, science trivia, educational quests & parental PIN controls',
    iconName: 'Smile',
    badge: 'Kids',
    accentColor: '#ec4899',
    defaultTheme: 'nature',
    preferredBackground: '/src/assets/images/kids_playful_landscape_1794041618451.jpg',
    sampleInterests: ['Space & Rockets', 'Dinosaurs', 'Ocean Creatures', 'Drawing & Coloring', 'Lego & Building', 'Fun Math'],
    preferenceQuestion: {
      title: 'What do you love exploring most?',
      description: 'Your adventure dashboard will show games and stories you love!',
      options: [
        { id: 'space_science', label: 'Outer Space & Astronauts' },
        { id: 'dinosaurs_animals', label: 'Dinosaurs & Wild Animals' },
        { id: 'art_drawing', label: 'Drawing, Painting & Crafts' },
        { id: 'puzzles_math', label: 'Brain Teasers & Math Games' }
      ]
    },
    defaultWidgets: [
      { id: 'kids_math_game', title: 'Math Galaxy Quest', category: 'Kids', size: 'medium', visible: true, order: 1 },
      { id: 'kids_drawing_canvas', title: 'Magic Drawing Studio', category: 'Kids', size: 'medium', visible: true, order: 2 },
      { id: 'kids_science_fact', title: 'Amazing Daily Science Fact', category: 'Kids', size: 'small', visible: true, order: 3 },
      { id: 'kids_quiz', title: 'Super Fun Kid Quiz', category: 'Kids', size: 'small', visible: true, order: 4 },
      { id: 'kids_reading_recommendations', title: 'Reading Adventure Corner', category: 'Kids', size: 'medium', visible: true, order: 5 }
    ],
    defaultShortcuts: [
      { id: 'kd1', title: 'PBS Kids Games', url: 'https://pbskids.org', iconName: 'Gamepad2' },
      { id: 'kd2', title: 'NASA Kids Club', url: 'https://www.nasa.gov/kidsclub', iconName: 'Rocket' },
      { id: 'kd3', title: 'National Geographic Kids', url: 'https://kids.nationalgeographic.com', iconName: 'Globe' },
      { id: 'kd4', title: 'Scratch Coding', url: 'https://scratch.mit.edu', iconName: 'Code' },
      { id: 'kd5', title: 'Khan Academy Kids', url: 'https://learn.khanacademy.org', iconName: 'GraduationCap' }
    ]
  }
};
