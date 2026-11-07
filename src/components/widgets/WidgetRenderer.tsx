import React from 'react';
import { WidgetConfig } from '../../types';

// Business
import { GstCalculatorWidget } from './business/GstCalculatorWidget';
import { ProfitMarginWidget } from './business/ProfitMarginWidget';
import { EmiCalculatorWidget } from './business/EmiCalculatorWidget';
import { ExpenseTrackerWidget } from './business/ExpenseTrackerWidget';
import { MarketIndicesWidget } from './business/MarketIndicesWidget';
import { CurrencyConverterWidget } from './business/CurrencyConverterWidget';

// Developer
import { CodeSnippetsWidget } from './developer/CodeSnippetsWidget';
import { JsonFormatterWidget } from './developer/JsonFormatterWidget';
import { RegexTesterWidget } from './developer/RegexTesterWidget';
import { Base64ToolWidget } from './developer/Base64ToolWidget';
import { GitReferenceWidget } from './developer/GitReferenceWidget';
import { GithubTrendingWidget } from './developer/GithubTrendingWidget';
import { HtmlScratchpadWidget } from './developer/HtmlScratchpadWidget';

// Student
import { PomodoroWidget } from './student/PomodoroWidget';
import { FlashcardsWidget } from './student/FlashcardsWidget';
import { ScientificCalculatorWidget } from './student/ScientificCalculatorWidget';
import { TimetableWidget } from './student/TimetableWidget';
import { StudyGoalsWidget } from './student/StudyGoalsWidget';
import { UnitConverterWidget } from './student/UnitConverterWidget';

// Gamer
import { GamerCountdownsWidget } from './gamer/GamerCountdownsWidget';
import { GamerDealsWidget } from './gamer/GamerDealsWidget';
import { GamerRecommenderWidget } from './gamer/GamerRecommenderWidget';

// Creator
import { IdeaSparkWidget } from './creator/IdeaSparkWidget';
import { HashtagsWidget } from './creator/HashtagsWidget';
import { ContentCalendarWidget } from './creator/ContentCalendarWidget';

// Designer
import { PaletteGeneratorWidget } from './designer/PaletteGeneratorWidget';
import { GradientStudioWidget } from './designer/GradientStudioWidget';

// Freelancer
import { ProjectPipelineWidget } from './freelancer/ProjectPipelineWidget';
import { TimeTrackerWidget } from './freelancer/TimeTrackerWidget';

// Trader
import { CompoundGrowthWidget } from './trader/CompoundGrowthWidget';

// Teacher
import { LessonPlannerWidget } from './teacher/LessonPlannerWidget';

// Job Seeker
import { ApplicationTrackerWidget } from './jobseeker/ApplicationTrackerWidget';

// Writer
import { WordCounterWidget } from './writer/WordCounterWidget';

// General
import { WeatherWidget } from './general/WeatherWidget';
import { QuickNotesWidget } from './general/QuickNotesWidget';
import { TodoListWidget } from './general/TodoListWidget';
import { PocketCalculatorWidget } from './general/PocketCalculatorWidget';
import { ClockCalendarWidget } from './general/ClockCalendarWidget';

// Kids
import { KidsMathQuest } from './kids/KidsMathQuest';
import { KidsDrawingStudio } from './kids/KidsDrawingStudio';
import { KidsScienceFact } from './kids/KidsScienceFact';
import { KidsQuizWidget } from './kids/KidsQuizWidget';
import { KidsReadingCorner } from './kids/KidsReadingCorner';

interface Props {
  widget: WidgetConfig;
}

export const WidgetRenderer: React.FC<Props> = ({ widget }) => {
  switch (widget.id) {
    // General
    case 'general_weather':
      return <WeatherWidget />;
    case 'general_clock_calendar':
      return <ClockCalendarWidget />;
    case 'quick_notes':
      return <QuickNotesWidget />;
    case 'general_todo':
      return <TodoListWidget />;
    case 'general_calculator':
      return <PocketCalculatorWidget />;

    // Business
    case 'biz_markets':
      return <MarketIndicesWidget />;
    case 'biz_gst_calc':
      return <GstCalculatorWidget />;
    case 'biz_margin_calc':
      return <ProfitMarginWidget />;
    case 'biz_emi_calc':
      return <EmiCalculatorWidget />;
    case 'biz_expense_tracker':
      return <ExpenseTrackerWidget />;
    case 'currency_converter':
      return <CurrencyConverterWidget />;

    // Developer
    case 'dev_code_snippets':
      return <CodeSnippetsWidget />;
    case 'dev_json_formatter':
      return <JsonFormatterWidget />;
    case 'dev_regex_tester':
      return <RegexTesterWidget />;
    case 'dev_base64':
      return <Base64ToolWidget />;
    case 'dev_git_ref':
      return <GitReferenceWidget />;
    case 'dev_github_trending':
      return <GithubTrendingWidget />;
    case 'dev_html_scratchpad':
      return <HtmlScratchpadWidget />;

    // Student
    case 'student_pomodoro':
      return <PomodoroWidget />;
    case 'student_flashcards':
      return <FlashcardsWidget />;
    case 'student_sci_calc':
      return <ScientificCalculatorWidget />;
    case 'student_timetable':
      return <TimetableWidget />;
    case 'student_goals':
      return <StudyGoalsWidget />;
    case 'student_unit_converter':
      return <UnitConverterWidget />;

    // Gamer
    case 'gamer_countdowns':
      return <GamerCountdownsWidget />;
    case 'gamer_deals':
      return <GamerDealsWidget />;
    case 'gamer_recommender':
      return <GamerRecommenderWidget />;

    // Creator
    case 'creator_idea_spark':
      return <IdeaSparkWidget />;
    case 'creator_hashtags':
      return <HashtagsWidget />;
    case 'creator_calendar':
      return <ContentCalendarWidget />;
    case 'creator_script_notes':
      return <QuickNotesWidget />;

    // Designer
    case 'designer_palette_gen':
      return <PaletteGeneratorWidget />;
    case 'designer_gradient_tool':
      return <GradientStudioWidget />;
    case 'designer_font_pairer':
    case 'designer_inspiration':
      return <QuickNotesWidget />;

    // Freelancer
    case 'freelance_projects':
      return <ProjectPipelineWidget />;
    case 'freelance_time_tracker':
      return <TimeTrackerWidget />;
    case 'freelance_rate_calc':
      return <ProfitMarginWidget />;
    case 'freelance_invoice_calc':
      return <GstCalculatorWidget />;

    // Trader
    case 'trader_watchlist':
      return <MarketIndicesWidget />;
    case 'trader_compound_calc':
      return <CompoundGrowthWidget />;
    case 'trader_risk_calc':
      return <ProfitMarginWidget />;

    // Teacher
    case 'teacher_lesson_planner':
      return <LessonPlannerWidget />;
    case 'teacher_quiz_creator':
      return <FlashcardsWidget />;
    case 'teacher_timetable':
      return <TimetableWidget />;
    case 'teacher_assignment_tracker':
      return <TodoListWidget />;

    // Job Seeker
    case 'job_application_tracker':
      return <ApplicationTrackerWidget />;
    case 'job_interview_countdown':
      return <GamerCountdownsWidget />;
    case 'job_prep_star':
      return <QuickNotesWidget />;
    case 'job_resume_checklist':
      return <TodoListWidget />;

    // Writer
    case 'writer_word_counter':
      return <WordCounterWidget />;
    case 'writer_sprint_timer':
      return <PomodoroWidget />;
    case 'writer_daily_goal':
      return <StudyGoalsWidget />;
    case 'writer_thesaurus':
      return <QuickNotesWidget />;

    // Kids
    case 'kids_math_game':
      return <KidsMathQuest />;
    case 'kids_drawing_canvas':
      return <KidsDrawingStudio />;
    case 'kids_science_fact':
      return <KidsScienceFact />;
    case 'kids_quiz':
      return <KidsQuizWidget />;
    case 'kids_reading_recommendations':
      return <KidsReadingCorner />;

    default:
      return <QuickNotesWidget />;
  }
};
