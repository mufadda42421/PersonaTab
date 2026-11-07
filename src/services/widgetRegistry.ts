import { RoleType, WidgetConfig } from '../types';

export interface WidgetMetadata {
  id: string;
  title: string;
  description: string;
  category:
    | 'Productivity'
    | 'Development'
    | 'Business & Finance'
    | 'Study & Academic'
    | 'Gaming'
    | 'Content Creation'
    | 'Design & Creative'
    | 'Career'
    | 'Writing'
    | 'General'
    | 'Kids';
  defaultSize: 'small' | 'medium' | 'large';
  iconName: string;
  supportedRoles: (RoleType | 'all')[];
  defaultSettings?: Record<string, any>;
  tags: string[];
}

export const WIDGET_REGISTRY: Record<string, WidgetMetadata> = {
  // General & Productivity
  general_weather: {
    id: 'general_weather',
    title: 'Live Weather & Forecast',
    description: 'Current local temperature, conditions, humidity, wind speed, and 4-day forecast with Celsius / Fahrenheit toggle.',
    category: 'General',
    defaultSize: 'small',
    iconName: 'CloudSun',
    supportedRoles: ['all'],
    tags: ['weather', 'forecast', 'temperature', 'climate']
  },
  general_clock_calendar: {
    id: 'general_clock_calendar',
    title: 'Clock & Calendar Glance',
    description: 'Precision digital clock with 12/24 hour format, seconds toggle, date display, and day progress tracker.',
    category: 'General',
    defaultSize: 'small',
    iconName: 'Clock',
    supportedRoles: ['all'],
    tags: ['time', 'date', 'calendar', 'clock']
  },
  quick_notes: {
    id: 'quick_notes',
    title: 'Instant Scratchpad & Notes',
    description: 'Persistent markdown-ready scratchpad for quick ideas, meeting minutes, and fleeting thoughts.',
    category: 'Productivity',
    defaultSize: 'small',
    iconName: 'FileText',
    supportedRoles: ['all'],
    tags: ['notes', 'memo', 'scratchpad', 'text']
  },
  general_todo: {
    id: 'general_todo',
    title: 'Priority Task Checklist',
    description: 'Fast to-do list with priority flags (High, Medium, Low), completion tracking, and quick filters.',
    category: 'Productivity',
    defaultSize: 'medium',
    iconName: 'CheckSquare',
    supportedRoles: ['all'],
    tags: ['todo', 'tasks', 'checklist', 'productivity']
  },
  general_calculator: {
    id: 'general_calculator',
    title: 'Pocket Calculator',
    description: 'Fast standard mathematical calculator for quick daily arithmetic and calculations.',
    category: 'General',
    defaultSize: 'small',
    iconName: 'Calculator',
    supportedRoles: ['all'],
    tags: ['calculator', 'math', 'numbers']
  },

  // Business & Finance
  biz_markets: {
    id: 'biz_markets',
    title: 'Global Markets & Indices',
    description: 'Market overview covering NIFTY 50, SENSEX, S&P 500, NASDAQ, Bitcoin, and Ethereum with transparent trend signals.',
    category: 'Business & Finance',
    defaultSize: 'medium',
    iconName: 'TrendingUp',
    supportedRoles: ['businessman', 'trader', 'freelancer'],
    tags: ['stocks', 'markets', 'indices', 'nifty', 'sensex', 'crypto']
  },
  biz_gst_calc: {
    id: 'biz_gst_calc',
    title: 'GST / VAT Tax Calculator',
    description: 'Calculate Indian GST (5%, 12%, 18%, 28%) or global VAT with CGST/SGST splits and Inclusive/Exclusive tax modes.',
    category: 'Business & Finance',
    defaultSize: 'small',
    iconName: 'Percent',
    supportedRoles: ['businessman', 'freelancer', 'trader'],
    tags: ['gst', 'tax', 'vat', 'accounting', 'business']
  },
  biz_margin_calc: {
    id: 'biz_margin_calc',
    title: 'Profit Margin & Markup Calculator',
    description: 'Calculate gross profit, net margin percentage, and markup multiplier from cost and selling price.',
    category: 'Business & Finance',
    defaultSize: 'small',
    iconName: 'DollarSign',
    supportedRoles: ['businessman', 'freelancer'],
    tags: ['profit', 'margin', 'markup', 'revenue', 'cost']
  },
  biz_emi_calc: {
    id: 'biz_emi_calc',
    title: 'EMI & Loan Amortization',
    description: 'Calculate monthly loan repayments, total interest payable, and total cost of borrowing with tenure sliders.',
    category: 'Business & Finance',
    defaultSize: 'small',
    iconName: 'CreditCard',
    supportedRoles: ['businessman', 'trader', 'general'],
    tags: ['loan', 'emi', 'interest', 'finance', 'mortgage']
  },
  biz_expense_tracker: {
    id: 'biz_expense_tracker',
    title: 'Business Expense Tracker',
    description: 'Log and categorize business outlays (Software, Marketing, Travel, Equipment) with running total summaries.',
    category: 'Business & Finance',
    defaultSize: 'medium',
    iconName: 'Receipt',
    supportedRoles: ['businessman', 'freelancer'],
    tags: ['expenses', 'budget', 'spending', 'accounting']
  },
  currency_converter: {
    id: 'currency_converter',
    title: 'Multi-Currency Converter',
    description: 'Convert between USD, EUR, GBP, INR, JPY, CAD, and AUD with accurate baseline conversion coefficients.',
    category: 'Business & Finance',
    defaultSize: 'small',
    iconName: 'ArrowRightLeft',
    supportedRoles: ['businessman', 'trader', 'freelancer', 'general'],
    tags: ['currency', 'fx', 'forex', 'exchange', 'usd', 'inr']
  },

  // Developer & Programming
  dev_code_snippets: {
    id: 'dev_code_snippets',
    title: 'Code Snippets Vault',
    description: 'Save, organize, and copy syntax-highlighted code snippets across TypeScript, Python, Go, and Shell.',
    category: 'Development',
    defaultSize: 'medium',
    iconName: 'Code',
    supportedRoles: ['developer'],
    tags: ['code', 'snippets', 'vault', 'programming']
  },
  dev_json_formatter: {
    id: 'dev_json_formatter',
    title: 'JSON Formatter & Validator',
    description: 'Beautify messy JSON payloads, validate structure, minify for payload efficiency, and copy with 1 click.',
    category: 'Development',
    defaultSize: 'medium',
    iconName: 'FileJson',
    supportedRoles: ['developer'],
    tags: ['json', 'formatter', 'validator', 'minify']
  },
  dev_regex_tester: {
    id: 'dev_regex_tester',
    title: 'Regex Matcher & Tester',
    description: 'Interactive Regular Expression validator with live match count, group extraction, and pattern explanation.',
    category: 'Development',
    defaultSize: 'small',
    iconName: 'ScanText',
    supportedRoles: ['developer'],
    tags: ['regex', 'pattern', 'test', 'matcher']
  },
  dev_base64: {
    id: 'dev_base64',
    title: 'Base64 & URL Encoder/Decoder',
    description: 'Encode and decode strings and tokens instantly between Raw, Base64, and URI encoded formats.',
    category: 'Development',
    defaultSize: 'small',
    iconName: 'Binary',
    supportedRoles: ['developer'],
    tags: ['base64', 'encoder', 'decoder', 'url']
  },
  dev_git_ref: {
    id: 'dev_git_ref',
    title: 'Git Command Reference',
    description: 'Searchable cheat-sheet for everyday and advanced Git workflows with instant 1-click clipboard copy.',
    category: 'Development',
    defaultSize: 'medium',
    iconName: 'GitBranch',
    supportedRoles: ['developer'],
    tags: ['git', 'version-control', 'cli', 'github']
  },
  dev_github_trending: {
    id: 'dev_github_trending',
    title: 'Trending GitHub Repositories',
    description: 'Curated feed of trending open source repositories with language badges, stars count, and direct links.',
    category: 'Development',
    defaultSize: 'medium',
    iconName: 'Flame',
    supportedRoles: ['developer'],
    tags: ['github', 'open-source', 'trending', 'repos']
  },
  dev_html_scratchpad: {
    id: 'dev_html_scratchpad',
    title: 'HTML / JS Sandbox Playground',
    description: 'Mini code sandbox to quickly test HTML elements, Tailwind utility classes, and JS logic in real time.',
    category: 'Development',
    defaultSize: 'large',
    iconName: 'Terminal',
    supportedRoles: ['developer', 'designer'],
    tags: ['sandbox', 'html', 'javascript', 'playground']
  },

  // Student & Academic
  student_pomodoro: {
    id: 'student_pomodoro',
    title: 'Pomodoro Study Focus Timer',
    description: '25-minute focus intervals and 5-minute restorative breaks with audio-visual notifications and streak counters.',
    category: 'Study & Academic',
    defaultSize: 'small',
    iconName: 'Timer',
    supportedRoles: ['student', 'writer', 'freelancer', 'jobseeker'],
    tags: ['pomodoro', 'study', 'focus', 'timer']
  },
  student_flashcards: {
    id: 'student_flashcards',
    title: 'Active Recall Flashcards',
    description: 'Interactive flip cards with spaced repetition self-rating (Easy, Medium, Hard) and custom deck editor.',
    category: 'Study & Academic',
    defaultSize: 'medium',
    iconName: 'Layers',
    supportedRoles: ['student', 'teacher'],
    tags: ['flashcards', 'memorize', 'study', 'exam']
  },
  student_sci_calc: {
    id: 'student_sci_calc',
    title: 'Scientific Calculator',
    description: 'Advanced mathematics calculator supporting trigonometry (sin, cos, tan), square roots, powers, and constants.',
    category: 'Study & Academic',
    defaultSize: 'small',
    iconName: 'Binary',
    supportedRoles: ['student', 'teacher'],
    tags: ['scientific', 'trig', 'math', 'algebra']
  },
  student_timetable: {
    id: 'student_timetable',
    title: 'Weekly Class Schedule',
    description: 'Structured Monday-to-Friday schedule viewer with period timings, room numbers, and subject tags.',
    category: 'Study & Academic',
    defaultSize: 'medium',
    iconName: 'CalendarDays',
    supportedRoles: ['student', 'teacher'],
    tags: ['schedule', 'timetable', 'classes', 'school']
  },
  student_goals: {
    id: 'student_goals',
    title: 'Daily Study Goals',
    description: 'Track chapters read, problem sets completed, and lecture hours logged toward weekly syllabus milestones.',
    category: 'Study & Academic',
    defaultSize: 'small',
    iconName: 'Target',
    supportedRoles: ['student'],
    tags: ['goals', 'milestones', 'study', 'tracker']
  },
  student_unit_converter: {
    id: 'student_unit_converter',
    title: 'Universal Unit Converter',
    description: 'Convert length, mass, temperature, and speed across metric, imperial, and astronomical units.',
    category: 'Study & Academic',
    defaultSize: 'small',
    iconName: 'Ruler',
    supportedRoles: ['student', 'developer'],
    tags: ['units', 'convert', 'metric', 'imperial']
  },

  // Gamer
  gamer_countdowns: {
    id: 'gamer_countdowns',
    title: 'Game Release Countdowns',
    description: 'Live countdown timers for blockbuster upcoming game releases, major DLC drops, and seasonal updates.',
    category: 'Gaming',
    defaultSize: 'medium',
    iconName: 'Hourglass',
    supportedRoles: ['gamer'],
    tags: ['gaming', 'releases', 'countdown', 'steam']
  },
  gamer_deals: {
    id: 'gamer_deals',
    title: 'Game Deals & Weekly Freebies',
    description: 'Curated discounts from Steam, Epic Games Store, and GOG with savings percentages and direct store links.',
    category: 'Gaming',
    defaultSize: 'medium',
    iconName: 'Sparkles',
    supportedRoles: ['gamer'],
    tags: ['deals', 'discounts', 'free-games', 'steam']
  },
  gamer_recommender: {
    id: 'gamer_recommender',
    title: 'Game Recommendation Roulette',
    description: 'Instant game selector based on mood and genre: RPG, Strategy, Roguelike, Tactical FPS, or Cozy.',
    category: 'Gaming',
    defaultSize: 'small',
    iconName: 'Dices',
    supportedRoles: ['gamer'],
    tags: ['games', 'roulette', 'recommendation']
  },

  // Content Creator
  creator_idea_spark: {
    id: 'creator_idea_spark',
    title: 'Video & Content Idea Spark',
    description: 'Generate high-CTR video concepts, viral hook frameworks, and narrative angles for YouTube and TikTok.',
    category: 'Content Creation',
    defaultSize: 'medium',
    iconName: 'Lightbulb',
    supportedRoles: ['creator'],
    tags: ['ideas', 'youtube', 'tiktok', 'hooks']
  },
  creator_hashtags: {
    id: 'creator_hashtags',
    title: 'Hashtag & Caption Optimizer',
    description: 'Curated high-reach hashtag sets tailored for Instagram Reels, YouTube Shorts, and LinkedIn posts with 1-click copy.',
    category: 'Content Creation',
    defaultSize: 'small',
    iconName: 'Hash',
    supportedRoles: ['creator'],
    tags: ['hashtags', 'instagram', 'reach', 'tags']
  },
  creator_calendar: {
    id: 'creator_calendar',
    title: 'Content Production Pipeline',
    description: 'Kanban-style planner tracking video stages: Scripting, Filming, Editing, Thumbnail, Scheduled, and Published.',
    category: 'Content Creation',
    defaultSize: 'medium',
    iconName: 'Calendar',
    supportedRoles: ['creator'],
    tags: ['pipeline', 'production', 'calendar', 'upload']
  },
  creator_script_notes: {
    id: 'creator_script_notes',
    title: 'Script & Retention Notes',
    description: 'Dedicated script notepad with structured 3-second hook, intro re-hook, story payoff, and call-to-action prompts.',
    category: 'Content Creation',
    defaultSize: 'small',
    iconName: 'FileEdit',
    supportedRoles: ['creator'],
    tags: ['script', 'notes', 'hooks', 'copy']
  },

  // Designer
  designer_palette_gen: {
    id: 'designer_palette_gen',
    title: 'Harmonious Color Palette Studio',
    description: 'Generate coordinated 5-color palettes using aesthetic harmonic ratios. Lock favorites and copy HEX values.',
    category: 'Design & Creative',
    defaultSize: 'medium',
    iconName: 'Palette',
    supportedRoles: ['designer', 'creator'],
    tags: ['palette', 'colors', 'hex', 'harmony']
  },
  designer_gradient_tool: {
    id: 'designer_gradient_tool',
    title: 'CSS Gradient Studio',
    description: 'Interactive linear and radial gradient builder with angle control, multi-stops, and instant CSS export.',
    category: 'Design & Creative',
    defaultSize: 'medium',
    iconName: 'Sparkle',
    supportedRoles: ['designer', 'developer'],
    tags: ['gradient', 'css', 'design', 'visual']
  },
  designer_font_pairer: {
    id: 'designer_font_pairer',
    title: 'Typography Pairing & Scale',
    description: 'Preview tested display and body font pairings with line-height ratios and font weights.',
    category: 'Design & Creative',
    defaultSize: 'small',
    iconName: 'Type',
    supportedRoles: ['designer'],
    tags: ['fonts', 'typography', 'pairing', 'design']
  },

  // Freelancer
  freelance_projects: {
    id: 'freelance_projects',
    title: 'Client Project Pipeline',
    description: 'Track client contracts through stages: Lead, Active, Review, Invoiced, and Paid with aggregate invoice volume.',
    category: 'Career',
    defaultSize: 'medium',
    iconName: 'Briefcase',
    supportedRoles: ['freelancer'],
    tags: ['projects', 'clients', 'contracts', 'freelance']
  },
  freelance_time_tracker: {
    id: 'freelance_time_tracker',
    title: 'Billable Time Tracker',
    description: 'Live punch clock timer for client tasks with running hourly accumulation and exportable timesheets.',
    category: 'Career',
    defaultSize: 'small',
    iconName: 'Clock',
    supportedRoles: ['freelancer'],
    tags: ['time', 'tracker', 'billable', 'hours']
  },
  freelance_rate_calc: {
    id: 'freelance_rate_calc',
    title: 'Hourly Rate Calculator',
    description: 'Calculate your minimum sustainable hourly billing rate factoring in target income, taxes, and overhead.',
    category: 'Career',
    defaultSize: 'small',
    iconName: 'Calculator',
    supportedRoles: ['freelancer'],
    tags: ['rate', 'pricing', 'hourly', 'freelance']
  },
  freelance_invoice_calc: {
    id: 'freelance_invoice_calc',
    title: 'Invoice Quick Estimator',
    description: 'Generate instant invoice estimates with itemized services, hourly quantities, discount, and tax rate.',
    category: 'Career',
    defaultSize: 'medium',
    iconName: 'FileCheck',
    supportedRoles: ['freelancer'],
    tags: ['invoice', 'billing', 'estimator', 'pdf']
  },

  // Trader & Investor
  trader_watchlist: {
    id: 'trader_watchlist',
    title: 'Real-time Indices Watchlist',
    description: 'Track NIFTY 50, SENSEX, S&P 500, NASDAQ, BTC, and Gold with percentage indicators and financial disclaimers.',
    category: 'Business & Finance',
    defaultSize: 'medium',
    iconName: 'LineChart',
    supportedRoles: ['trader', 'businessman'],
    tags: ['trader', 'stocks', 'crypto', 'nifty', 'sensex']
  },
  trader_compound_calc: {
    id: 'trader_compound_calc',
    title: 'Compound Interest & SIP Calculator',
    description: 'Model future investment value with initial principal, monthly SIP additions, annual return rate, and time horizons.',
    category: 'Business & Finance',
    defaultSize: 'small',
    iconName: 'TrendingUp',
    supportedRoles: ['trader', 'businessman', 'general'],
    tags: ['compound', 'sip', 'investment', 'wealth']
  },
  trader_risk_calc: {
    id: 'trader_risk_calc',
    title: 'Position Sizing & Risk Calculator',
    description: 'Determine exact share quantity and dollar risk per trade according to portfolio capital and stop-loss level.',
    category: 'Business & Finance',
    defaultSize: 'small',
    iconName: 'ShieldAlert',
    supportedRoles: ['trader'],
    tags: ['risk', 'position-size', 'stop-loss', 'trading']
  },

  // Teacher
  teacher_lesson_planner: {
    id: 'teacher_lesson_planner',
    title: 'Lesson Plan Studio',
    description: 'Structured lesson preparation for objectives, required materials, activities, and homework assignment checks.',
    category: 'Study & Academic',
    defaultSize: 'medium',
    iconName: 'BookMarked',
    supportedRoles: ['teacher'],
    tags: ['lesson', 'curriculum', 'teacher', 'school']
  },
  teacher_quiz_creator: {
    id: 'teacher_quiz_creator',
    title: 'Quick Classroom Quiz Builder',
    description: 'Draft instant multi-choice pop quizzes, assign answer keys, and test student readiness before exams.',
    category: 'Study & Academic',
    defaultSize: 'small',
    iconName: 'HelpCircle',
    supportedRoles: ['teacher'],
    tags: ['quiz', 'test', 'questions', 'teacher']
  },
  teacher_timetable: {
    id: 'teacher_timetable',
    title: 'Teaching Period Timetable',
    description: 'Class schedule organizer highlighting current ongoing period, classroom location, and student rosters.',
    category: 'Study & Academic',
    defaultSize: 'medium',
    iconName: 'Clock',
    supportedRoles: ['teacher'],
    tags: ['timetable', 'periods', 'schedule', 'teaching']
  },

  // Job Seeker
  job_application_tracker: {
    id: 'job_application_tracker',
    title: 'Job Application Pipeline',
    description: 'Manage job applications through Applied, Screening, Technical Interview, Final Round, and Offer statuses.',
    category: 'Career',
    defaultSize: 'medium',
    iconName: 'Briefcase',
    supportedRoles: ['jobseeker'],
    tags: ['job', 'applications', 'career', 'pipeline']
  },
  job_interview_countdown: {
    id: 'job_interview_countdown',
    title: 'Interview Countdown & Agenda',
    description: 'Precision countdown to upcoming job interview appointments with prep notes and interviewer profiles.',
    category: 'Career',
    defaultSize: 'small',
    iconName: 'CalendarClock',
    supportedRoles: ['jobseeker'],
    tags: ['interview', 'countdown', 'meeting', 'career']
  },
  job_prep_star: {
    id: 'job_prep_star',
    title: 'STAR Method Interview Assistant',
    description: 'Frame behavioral interview stories cleanly into Situation, Task, Action, and Result frameworks.',
    category: 'Career',
    defaultSize: 'medium',
    iconName: 'Sparkles',
    supportedRoles: ['jobseeker'],
    tags: ['star', 'interview', 'behavioral', 'prep']
  },
  job_resume_checklist: {
    id: 'job_resume_checklist',
    title: 'Resume & Portfolio Audit Checklist',
    description: 'Verify ATS readability, quantitative metric impact, active action verbs, and portfolio links before applying.',
    category: 'Career',
    defaultSize: 'small',
    iconName: 'CheckCircle2',
    supportedRoles: ['jobseeker'],
    tags: ['resume', 'cv', 'checklist', 'ats']
  },

  // Writer
  writer_word_counter: {
    id: 'writer_word_counter',
    title: 'Live Word & Reading Time Counter',
    description: 'Analyze prose length: real-time word count, character count, sentence count, and average reading duration.',
    category: 'Writing',
    defaultSize: 'medium',
    iconName: 'PenTool',
    supportedRoles: ['writer'],
    tags: ['words', 'reading-time', 'counter', 'writing']
  },
  writer_sprint_timer: {
    id: 'writer_sprint_timer',
    title: 'Focused Writing Sprint Timer',
    description: '15, 30, and 45-minute timed distraction-free writing sprints with start and end word tallies.',
    category: 'Writing',
    defaultSize: 'small',
    iconName: 'Timer',
    supportedRoles: ['writer'],
    tags: ['sprint', 'timer', 'words', 'focus']
  },
  writer_daily_goal: {
    id: 'writer_daily_goal',
    title: 'Daily Word Goal Tracker',
    description: 'Set daily target (e.g. 1,000 words) and view visual completion percentage as you write throughout the day.',
    category: 'Writing',
    defaultSize: 'small',
    iconName: 'Target',
    supportedRoles: ['writer'],
    tags: ['goal', 'words', 'daily', 'writing']
  },
  writer_thesaurus: {
    id: 'writer_thesaurus',
    title: 'Instant Thesaurus & Synonyms',
    description: 'Quick lookup for expressive synonyms, antonyms, and evocative adjectives to enhance literary prose.',
    category: 'Writing',
    defaultSize: 'medium',
    iconName: 'BookOpen',
    supportedRoles: ['writer'],
    tags: ['thesaurus', 'synonyms', 'dictionary', 'vocabulary']
  },

  // Kids Mode
  kids_math_game: {
    id: 'kids_math_game',
    title: 'Math Galaxy Quest',
    description: 'Fun arithmetic challenge with addition, subtraction, multiplication, stars, and level streaks.',
    category: 'Kids',
    defaultSize: 'medium',
    iconName: 'Rocket',
    supportedRoles: ['kids'],
    tags: ['kids', 'math', 'game', 'education']
  },
  kids_drawing_canvas: {
    id: 'kids_drawing_canvas',
    title: 'Magic Drawing Studio',
    description: 'Full HTML5 canvas with cheerful color palette, brush sizes, eraser, undo, and download artwork.',
    category: 'Kids',
    defaultSize: 'medium',
    iconName: 'Palette',
    supportedRoles: ['kids'],
    tags: ['kids', 'drawing', 'canvas', 'art']
  },
  kids_science_fact: {
    id: 'kids_science_fact',
    title: 'Amazing Daily Science Fact',
    description: 'Fascinating kid-friendly trivia about outer space, deep oceans, dinosaurs, and animals.',
    category: 'Kids',
    defaultSize: 'small',
    iconName: 'Sparkles',
    supportedRoles: ['kids'],
    tags: ['kids', 'science', 'facts', 'trivia']
  },
  kids_quiz: {
    id: 'kids_quiz',
    title: 'Super Fun Kid Quiz',
    description: 'Cheery interactive 3-question quiz with instant celebratory feedback and stars.',
    category: 'Kids',
    defaultSize: 'small',
    iconName: 'HelpCircle',
    supportedRoles: ['kids'],
    tags: ['kids', 'quiz', 'game', 'fun']
  },
  kids_reading_recommendations: {
    id: 'kids_reading_recommendations',
    title: 'Reading Adventure Corner',
    description: 'Hand-picked story recommendations, audiobooks, and educational links for young explorers.',
    category: 'Kids',
    defaultSize: 'medium',
    iconName: 'BookOpen',
    supportedRoles: ['kids'],
    tags: ['kids', 'reading', 'books', 'stories']
  }
};

export const WidgetRegistryService = {
  getWidgetMetadata(id: string): WidgetMetadata | undefined {
    return WIDGET_REGISTRY[id];
  },

  getAllWidgets(): WidgetMetadata[] {
    return Object.values(WIDGET_REGISTRY);
  },

  getWidgetsForRole(role: RoleType): WidgetMetadata[] {
    return Object.values(WIDGET_REGISTRY).filter(
      (w) => w.supportedRoles.includes('all') || w.supportedRoles.includes(role)
    );
  },

  getWidgetsByCategory(category: string): WidgetMetadata[] {
    if (category === 'All') return Object.values(WIDGET_REGISTRY);
    return Object.values(WIDGET_REGISTRY).filter((w) => w.category === category);
  },

  getCategories(): string[] {
    const cats = new Set<string>();
    Object.values(WIDGET_REGISTRY).forEach((w) => cats.add(w.category));
    return ['All', ...Array.from(cats)];
  },

  createDefaultConfig(id: string, order: number): WidgetConfig {
    const meta = WIDGET_REGISTRY[id];
    return {
      id,
      title: meta ? meta.title : id,
      category: meta ? meta.category : 'General',
      size: meta ? meta.defaultSize : 'small',
      visible: true,
      order,
      settings: meta?.defaultSettings || {}
    };
  },

  registerWidget(meta: WidgetMetadata) {
    WIDGET_REGISTRY[meta.id] = meta;
  }
};
