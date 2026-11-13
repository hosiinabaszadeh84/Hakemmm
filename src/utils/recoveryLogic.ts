/**
 * Core pure calculation and state-machine logic for Hakem Zehn
 * Decoupled from React DOM for deterministic unit testing.
 */

export interface TrackingRecord {
  pornCleanDays: number;
  masturbationCleanDays: number;
  totalAttempts: number;
  resistedUrgesCount: number;
}

export type BreathingPhase = 'inhale' | 'hold-in' | 'exhale' | 'hold-out';

export interface BreathingState {
  phase: BreathingPhase;
  phaseLabel: string;
  phaseSecondsRemaining: number;
  phaseProgressPercent: number;
  totalCycleSeconds: number;
}

/**
 * Calculates recovery resilience score (0 to 100).
 * Hakem Zehn method values cumulative progress and resisted impulses,
 * preventing the demotivating "streak reset to zero = total failure" spiral.
 */
export function calculateResilienceScore(record: TrackingRecord): number {
  const { pornCleanDays, masturbationCleanDays, resistedUrgesCount } = record;
  
  // Independent weighting: Porn reduction is critical for dopamine stabilization (60% weight),
  // physical reset (30% weight), plus resisted urges (bonus resilience).
  const pornScore = Math.min(pornCleanDays * 2.5, 50);
  const physicalScore = Math.min(masturbationCleanDays * 1.5, 30);
  const urgeBonus = Math.min(resistedUrgesCount * 4, 20);

  const raw = pornScore + physicalScore + urgeBonus;
  return Math.min(100, Math.max(0, Math.round(raw)));
}

/**
 * Box breathing 16-second cycle logic (4s inhale, 4s hold, 4s exhale, 4s hold).
 * Returns the exact phase and countdown for any given timestamp.
 */
export function getBoxBreathingState(elapsedSeconds: number): BreathingState {
  const cycleSeconds = 16;
  const mod = ((elapsedSeconds % cycleSeconds) + cycleSeconds) % cycleSeconds;
  
  if (mod < 4) {
    const elapsedInPhase = mod;
    return {
      phase: 'inhale',
      phaseLabel: 'دم آرام و عمیق (از بینی)',
      phaseSecondsRemaining: Math.ceil(4 - elapsedInPhase),
      phaseProgressPercent: (elapsedInPhase / 4) * 100,
      totalCycleSeconds: cycleSeconds
    };
  } else if (mod < 8) {
    const elapsedInPhase = mod - 4;
    return {
      phase: 'hold-in',
      phaseLabel: 'حبس نفس با آرامش',
      phaseSecondsRemaining: Math.ceil(4 - elapsedInPhase),
      phaseProgressPercent: (elapsedInPhase / 4) * 100,
      totalCycleSeconds: cycleSeconds
    };
  } else if (mod < 12) {
    const elapsedInPhase = mod - 8;
    return {
      phase: 'exhale',
      phaseLabel: 'بازدم آهسته و پیوسته (از دهان)',
      phaseSecondsRemaining: Math.ceil(4 - elapsedInPhase),
      phaseProgressPercent: (elapsedInPhase / 4) * 100,
      totalCycleSeconds: cycleSeconds
    };
  } else {
    const elapsedInPhase = mod - 12;
    return {
      phase: 'hold-out',
      phaseLabel: 'مکث و تخلیه کامل ریه‌ها',
      phaseSecondsRemaining: Math.ceil(4 - elapsedInPhase),
      phaseProgressPercent: (elapsedInPhase / 4) * 100,
      totalCycleSeconds: cycleSeconds
    };
  }
}

/**
 * Self-assessment score interpreter
 */
export type AssessmentResultLevel = 'mild' | 'moderate' | 'high';

export interface AssessmentResult {
  score: number;
  level: AssessmentResultLevel;
  headline: string;
  description: string;
  recommendedAction: string;
}

export function evaluateAssessmentAnswers(answers: number[]): AssessmentResult {
  const total = answers.reduce((acc, curr) => acc + curr, 0);
  
  if (total <= 4) {
    return {
      score: total,
      level: 'mild',
      headline: 'عادت اولیه و قابل مهار سریع',
      description: 'وابستگی عصبی شما در سطح خفیف است. بیشتر در مواقع بی‌حوصلگی یا خستگی سراغ این رفتار می‌روید.',
      recommendedAction: 'تغییر محل گوشی هنگام خواب و اجرای برنامه ۴۸ ساعت اول برای قطع کامل محرک‌ها کافی است.'
    };
  } else if (total <= 8) {
    return {
      score: total,
      level: 'moderate',
      headline: 'وابستگی عادتی و الگوی پاسخ به استرس',
      description: 'مغز شما پورن یا خودارضایی را به عنوان مسکن روانی برای فرار از اضطراب، تنهایی یا نشخوار فکری شرطی کرده است.',
      recommendedAction: 'تفکیک ثبت پورن و خودارضایی در اپلیکیشن + استفاده از ابزار SOS در لحظه اوج وسوسه (۳ تا ۷ دقیقه اول).'
    };
  } else {
    return {
      score: total,
      level: 'high',
      headline: 'الگوی چرخه‌ای عذاب وجدان و تکانشگری (Chaser Effect)',
      description: 'پس از هر لغزش دچار سرخوردگی شدید می‌شوید و همین عذاب وجدان شما را به لغزش‌های پیاپی بعدی هدایت می‌کند.',
      recommendedAction: 'استفاده فوری از پروتکل ساعت اول پس از لغزش بدون صفرکردن مسیر، به همراه فعال‌سازی قفل محلی اپلیکیشن.'
    };
  }
}
