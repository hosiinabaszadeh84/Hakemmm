/**
 * Pure reference math, dopamine curve state, perspective shift, app showcase data,
 * and search/SEO helpers. Mirrors logic in public/design-system/reference.js for node:test verification.
 */

export function computeLoopArcDashOffset(step: number, circumference = 565.48): number {
  const clamped = Math.min(4, Math.max(1, step));
  return Number((circumference * (1 - clamped / 4)).toFixed(2));
}

export function formatReadingProgressPersian(scrollTop: number, scrollableHeight: number): string {
  const ratio = scrollableHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollableHeight)) : 0;
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const pct = Math.round(ratio * 100)
    .toString()
    .replace(/\d/g, (d) => persianDigits[Number(d)]);
  return `${pct}٪`;
}

export interface SearchEntry {
  id: string;
  title: string;
  body: string;
}

export function filterReferenceEntries(entries: SearchEntry[], query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return entries.filter(
    (item) => item.title.toLowerCase().includes(q) || item.body.toLowerCase().includes(q)
  );
}

export type DopaminePhase = 'supernormal' | 'crash' | 'recovery';

export interface DopamineCurveState {
  phase: DopaminePhase;
  peakLabel: string;
  baselineRatio: number;
  dotX: number;
  dotY: number;
  telemetryLevel: string;
  curvePath: string;
}

export function getDopamineCurveState(phase: DopaminePhase): DopamineCurveState {
  switch (phase) {
    case 'supernormal':
      return {
        phase: 'supernormal',
        peakLabel: 'جهش مصنوعی غیرطبیعی',
        baselineRatio: 0.92,
        dotX: 156,
        dotY: 32,
        telemetryLevel: '۲ برابر خط پایه',
        curvePath: 'M 12 112 C 68 112, 108 32, 156 32 C 204 32, 232 126, 288 130 C 334 133, 372 114, 408 112'
      };
    case 'crash':
      return {
        phase: 'crash',
        peakLabel: 'افت پایین‌تر از خط تعادل (خلأ و بی‌قراری)',
        baselineRatio: 0.28,
        dotX: 198,
        dotY: 178,
        telemetryLevel: 'افت زیر خط پایه',
        curvePath: 'M 12 112 C 74 112, 128 178, 198 178 C 268 178, 328 122, 408 116'
      };
    case 'recovery':
      return {
        phase: 'recovery',
        peakLabel: 'تعادل پایدار و حساسیت طبیعی پاداش',
        baselineRatio: 0.65,
        dotX: 214,
        dotY: 92,
        telemetryLevel: 'تعادل ۱۰۰٪ پایه',
        curvePath: 'M 12 114 C 84 108, 146 92, 214 92 C 282 92, 340 98, 408 94'
      };
  }
}

export interface PerspectiveState {
  value: number;
  dominantMode: 'willpower' | 'balanced' | 'easypeasy';
  curtainRatio: number;
}

export function computePerspectiveState(rawValue: number): PerspectiveState {
  const value = Math.min(100, Math.max(0, Math.round(rawValue)));
  const dominantMode = value < 38 ? 'willpower' : value > 62 ? 'easypeasy' : 'balanced';
  return {
    value,
    dominantMode,
    curtainRatio: Number((value / 100).toFixed(2))
  };
}

export interface SeoMetaCheck {
  validTitle: boolean;
  validDescription: boolean;
  validCanonical: boolean;
}

export function validateSeoMeta(title: string, description: string, canonicalUrl: string): SeoMetaCheck {
  const tLen = title.trim().length;
  const dLen = description.trim().length;
  return {
    validTitle: tLen >= 25 && tLen <= 75,
    validDescription: dLen >= 100 && dLen <= 175,
    validCanonical: /^https:\/\/hakemzehn\.ir\/[a-z0-9-]*(\.html)?$/.test(canonicalUrl.trim())
  };
}

export type ScenarioKey = 'night-bed' | 'explore-scroll' | 'work-stress' | 'afternoon-alone';

export interface TonightProtocolPlan {
  key: ScenarioKey;
  title: string;
  cueInsight: string;
  steps: [string, string, string];
}

export function recommendTonightProtocol(key: ScenarioKey): TonightProtocolPlan {
  switch (key) {
    case 'night-bed':
      return {
        key: 'night-bed',
        title: 'سناریوی آسیب‌پذیری آخر شب در رختخواب',
        cueInsight:
          'پژوهش‌های fMRI نشان می‌دهند نشانه‌های محیطی پیش‌بینی‌کننده (تخت + گوشی در تاریکی) پیش از دیدن تصویر، موج اشتیاق را در جسم مخطط روشن می‌کنند.',
        steps: [
          'شارژر گوشی را همین امشب به بیرون اتاق خواب منتقل کن و یک ساعت زنگ ساده کنار تخت بگذار.',
          'تا واقعاً پلک‌هایت سنگین نشده وارد رختخواب نشو؛ اگر ۲۰ دقیقه بیدار ماندی بیرون اتاق برو.',
          'حالت خاکستری (Grayscale) یا زمان استراحت صفحه را از ساعت ۲۲:۳۰ فعال کن.'
        ]
      };
    case 'explore-scroll':
      return {
        key: 'explore-scroll',
        title: 'سناریوی شروع تصادفی از اکسپلور و تلگرام',
        cueInsight:
          'بیش از نیمی از لغزش‌ها با تصمیم دیدن پورن شروع نمی‌شوند؛ با مواجههٔ تصادفی با تصاویر نیمه‌تحریک‌آمیز در فید عادی کلید می‌خورند.',
        steps: [
          'تمامی کانال‌ها و ربات‌های محرک تلگرام را همین الان ترک و آرشیو پنهان را حذف کن.',
          'روی جست‌وجوهای اینستاگرام موضوعات فنی، طبیعت یا ورزشی بگذار و گزینه‌های محرک را «علاقه‌مند نیستم» بزن.',
          'DNS امن خانواده و SafeSearch گوگل را در مرورگر گوشی قفل کن تا پل «فقط یه چک» بسته بماند.'
        ]
      };
    case 'work-stress':
      return {
        key: 'work-stress',
        title: 'سناریوی فشار کاری، اضطراب یا ناکامی روزانه',
        cueInsight:
          'در لحظهٔ تنش هیجانی، مغز به دنبال سریع‌ترین کاهش کوتاه‌مدت کورتیزول است، حتی اگر یک ساعت بعد کلافگی بیشتری تحویل بگیرد.',
        steps: [
          'پیش از دست‌زدن به گوشی، ۵ دقیقه جایت را عوض کن و یک لیوان آب خنک بنوش (قانون ۵ ثانیه به عقب).',
          'فشار واقعی را با یک خروجی فیزیکی سبک (۱۵ دقیقه پیاده‌روی تند یا دوش ولرم) تخلیه کن.',
          'به خودت یادآوری کن: پورن اضطراب کار را حل نمی‌کند، فقط یک لایه خستگی تازه رویش می‌گذارد.'
        ]
      };
    case 'afternoon-alone':
      return {
        key: 'afternoon-alone',
        title: 'سناریوی تنهایی و خلأ بی‌برنامه در خانه',
        cueInsight:
          'وقتی در ساعتی از روز بدون نقشه در خانه تنها می‌مانی، کسالت فوری ذهن را مستقیم به تکراری‌ترین پاداش دسترس هدایت می‌کند.',
        steps: [
          'گوشی را روی میز کار سالن بگذار و در فضای مشترک و روشن خانه بمان.',
          'برای همان بازهٔ تکراری تنهایی یک فعالیت ازپیش‌آماده (پادکست، کاردستی، مطالعه یا خروج از خانه) تعریف کن.',
          'تماس کوتاه با یک دوست یا عضو خانواده ارتباط اجتماعی واقعی را جایگزین انزوای صفحه می‌کند.'
        ]
      };
  }
}

export type AppTourModuleId = 'dashboard' | 'sos' | 'mirror' | 'easypeasy';

export interface AppTourModuleSpec {
  id: AppTourModuleId;
  kicker: string;
  title: string;
  summary: string;
  screenshot: string;
  highlights: [string, string, string];
  linkHref: string;
}

export function getAppTourModule(id: AppTourModuleId): AppTourModuleSpec {
  switch (id) {
    case 'dashboard':
      return {
        id: 'dashboard',
        kicker: 'تب داشبورد و ثبت مستقل · مسیر ۱۴۰ روزه',
        title: 'داشبورد «امروز، یک قدم روشن» و تفکیک پورن از خودارضایی',
        summary:
          'در اپلیکیشن حاکم ذهن، مسیر ۱۴۰ روزه در سه فاز ۷ هفته‌ای پیوسته جلو می‌رود و هر روز «دوری از پورن» و «دوری از خودارضایی» جدا از هم ثبت می‌شوند تا لغزش در یکی، انگیزهٔ کل مسیرت را خراب نکند.',
        screenshot: '/assets/dashboard.webp',
        highlights: [
          'مسیر ۱۴۰ روزه: فاز ۱ (سم‌زدایی پایه، روز ۱ تا ۴۹)، فاز ۲ (بازسازی عصبی، روز ۵۰ تا ۹۸) و فاز ۳ (تثبیت و تسلط، روز ۹۹ تا ۱۴۰)',
          'ثبت مستقل پاک‌ماندن از پورن و پاک‌ماندن از خودارضایی کنار ۱۶ عادت رشد، ۳ عادت صبحگاهی و وضعیت خواب و شارژر بیرون اتاق',
          'امکان تنظیم «ریتم امروز» و امتیازدهی روزانهٔ ۰ تا ۱۰۰ بر پایهٔ پیشرفت واقعی، نه شعارهای غیرعلمی'
        ],
        linkHref: '/features.html#roadmap-140'
      };
    case 'sos':
      return {
        id: 'sos',
        kicker: 'پناهگاه لحظهٔ خطر · قانون ۵ دقیقه',
        title: 'سپر SOS برای شکستن موج وسوسه بدون سرزنش',
        summary:
          'وقتی وسط شب موج فشار می‌آید، قرار نیست به تنهایی با آن بجنگی. سپر SOS با ۳ حالت ورودی («معمولی»، «الان نمی‌توانم فکر کنم» و «زمین‌گیر شدن بعد از لغزش») کنار توست و روی «قانون ۵ دقیقه» بنا شده است.',
        screenshot: '/assets/sos-preview.webp',
        highlights: [
          'تکیه بر «قانون ۵ دقیقه»: فقط ۵ دقیقه هیچ تصمیمی نگیر، گوشی را زمین بگذار و جایت را عوض کن',
          'راهنمای رایگان تنفس ۱۰ ثانیه‌ای (۴ ثانیه دم، ۶ ثانیه بازدم با ریتم آزاد)، زمین‌گیر شدن حسی، تغییر محیط و فاصله از گوشی',
          'در نسخهٔ طلایی PRO: تشخیص محرک HALT (گرسنگی، عصبانیت، تنهایی، خستگی)، مربی تطبیقی SOS از داده‌های ۹۰ روز خودت و صوت اضطراری'
        ],
        linkHref: '/features.html#sos-shield'
      };
    case 'mirror':
      return {
        id: 'mirror',
        kicker: 'آینهٔ رفتاری · نقشهٔ ۱۴۰ گره در ۷ ناحیه',
        title: 'شناخت الگوهای پنهان و رادار ساعات خطر روی گوشی خودت',
        summary:
          'اپ حاکم ذهن به‌جای نصیحت کلی، از ثبت‌های روزانهٔ خودت یک آینهٔ شفاف می‌سازد: چه ساعتی از شبانه‌روز، در چه حالی و به کدام بهانه موج بیشتر می‌آید. نقشهٔ ۱۴۰ گره در ۷ ناحیه پیشرفت و همراهی رفتارها را تصویرسازی می‌کند.',
        screenshot: '/assets/analytics-preview.webp',
        highlights: [
          'نقشهٔ بصری ۱۴۰ گره در ۷ بخش: قشر پیش‌پیشانی، پیشانی، آهیانه‌ای، پس‌سری، گیجگاهی، لیمبیک و مخچه/ساقهٔ مغز',
          'سلب‌مسئولیت صادقانه: این تصویر سنجش پزشکی مغز نیست؛ مقدار دادهٔ ثبت‌شده و همراهی رفتارها را نشان می‌دهد، نه علت یا پیش‌بینی',
          'تحلیل همبستگی‌های ۳۰ و ۹۰ روزه و ساعات اوج وسوسه در نسخهٔ طلایی PRO کاملاً روی دستگاه خودت'
        ],
        linkHref: '/features.html#neural-mirror'
      };
    case 'easypeasy':
      return {
        id: 'easypeasy',
        kicker: 'پناهگاه روش آسان · ۷ فاز، ۲۱ وظیفه و ۳۰ فصل کتاب',
        title: 'شست‌وشوی مغزی را باز کن، نه زور اراده را بیشتر',
        summary:
          'بخش «روش آسان» در اپ ترکیب ساختاریافته‌ای از کتاب ۱۹۸ صفحه‌ای «ترک پورنوگرافی به روش آسان» (۳۰ فصل) و دورهٔ ۷ فازی با ۲۱ وظیفهٔ ترتیبی است تا هم «هیولای کوچک» شیمیایی را بشناسی و هم «هیولای بزرگ»ِ فریب ذهنی را خاموش کنی.',
        screenshot: '/src/assets/images/curtain_illusion_break_1794517421527.jpg',
        highlights: [
          'تمایز شفاف: ۳۰ گام یعنی ۳۰ فصل کامل کتاب روش آسان؛ در کنار آن ۷ فاز (هر فاز ۳ وظیفه، جمعاً ۲۱ وظیفه) برای اجرای عملی گام‌به‌گام طراحی شده‌اند',
          'تخلیهٔ هیولای کوچک (میل شیمیایی) از ۱۰۰ به ۰ ظرف ۲۸ روز در کنار بازکردن باورهای فریبندهٔ هیولای بزرگ',
          'در صورت لغزش، دانش فاز ۰ تا ۲ هرگز پاک نمی‌شود و مسیر از روز ۸ ادامه پیدا می‌کند؛ گام‌های ۱ تا ۵ کتاب برای همیشه رایگان است'
        ],
        linkHref: '/features.html#easypeasy-engine'
      };
  }
}

export interface ProMatrixItem {
  id: string;
  tier: 'free' | 'pro';
  feature: string;
  freeDetail: string;
  proDetail: string;
}

export const APP_FEATURE_MATRIX: ProMatrixItem[] = [
  {
    id: 'book-chapters',
    tier: 'free',
    feature: 'فصل‌های کتاب روش آسان (۳۰ گام)',
    freeDetail: 'فصل‌های ۱ تا ۵ به صورت کامل و رایگان',
    proDetail: 'تمام ۳۰ فصل (فصل ۶ تا ۳۰ + صوت و نکتهٔ محوری هر گام)'
  },
  {
    id: 'sos-core',
    tier: 'free',
    feature: 'سپر SOS و قانون ۵ دقیقه',
    freeDetail: 'تنفس ۱۰ ثانیه‌ای (۴ دم / ۶ بازدم)، زمین‌گیر شدن حسی، تغییر محیط و ۳ بازقاب‌بندی',
    proDetail: 'تشخیص HALT (گرسنگی/عصبانیت/تنهایی/خستگی)، مربی تطبیقی از ۹۰ روز و صوت اضطراری'
  },
  {
    id: 'dual-tracker',
    tier: 'free',
    feature: 'ثبت روزانهٔ دوگانه و ۱۶ عادت رشد',
    freeDetail: 'ثبت مستقل پورن و خودارضایی، عادت‌های پایه، حدیث روز و یادداشت کوتاه',
    proDetail: 'فعال‌سازی همهٔ عادت‌های روتین (routine_*) و ساخت عادت‌های کاملاً سفارشی'
  },
  {
    id: 'deep-analytics',
    tier: 'pro',
    feature: 'آنالیز عمیق ۳۰ و ۹۰ روزه + رادار ساعات خطر',
    freeDetail: 'نمای پایهٔ داشبورد، پیشرفت روزشمار ۱۴۰ روزه و آینهٔ اولیه',
    proDetail: 'همبستگی دقیق خواب و محرک‌ها در ۳۰/۹۰ روز گذشته، نمودار ساعتی و گزارش کامل الگوها'
  },
  {
    id: 'billing-privacy',
    tier: 'free',
    feature: 'مدل قیمت، حریم خصوصی و تأیید خرید',
    freeDetail: 'رایگان برای همیشه، بدون ثبت‌نام، بدون شمارهٔ تلفن و بدون تاریخ انقضا',
    proDetail: '۹۹٬۰۰۰ تومان یک‌باره و دائمی در مایکت (به جای ۱۴۹٬۰۰۰ تومان) با امضای آفلاین RSA'
  }
];

export function filterProFeatureMatrix(tier: 'all' | 'free' | 'pro'): ProMatrixItem[] {
  if (tier === 'all') return APP_FEATURE_MATRIX;
  return APP_FEATURE_MATRIX.filter((item) => item.tier === tier);
}

export type DockStateKey = 'craving' | 'tonight' | 'privacy';

export interface DockStateGuidance {
  key: DockStateKey;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  showBreather: boolean;
}

export function computeDockRingDashOffset(scrollRatio: number, radius = 19): number {
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(1, Math.max(0, scrollRatio));
  return Number((circumference * (1 - clamped)).toFixed(2));
}

export function getDockStateGuidance(key: DockStateKey): DockStateGuidance {
  switch (key) {
    case 'craving':
      return {
        key: 'craving',
        title: 'الان موج وسوسه اومده؟ قانون ۵ دقیقه رو اجرا کن',
        body: 'قرار نیست برای همیشه تصمیم بگیری؛ فقط ۵ دقیقه گوشی رو زمین بذار، جایت رو عوض کن و با دایرهٔ زیر ۴ ثانیه دم / ۶ ثانیه بازدم بگیر.',
        ctaLabel: 'باز کردن سپر SOS اپلیکیشن ←',
        ctaHref: '/features.html#sos-shield',
        showBreather: true
      };
    case 'tonight':
      return {
        key: 'tonight',
        title: 'شروع عملی همین امشب در کمتر از ۵ دقیقه',
        body: 'شارژر گوشی رو بیرون اتاق خواب ببر، DNS امن روشن کن و فقط فصل ۱ کتاب «روش آسان» رو در اپلیکیشن بدون فشار بخون.',
        ctaLabel: 'چک‌لیست محیطی امشب ←',
        ctaHref: '/tark-porn.html#tonight',
        showBreather: false
      };
    case 'privacy':
      return {
        key: 'privacy',
        title: 'نگهداری محلی، بدون شماره تلفن و رمزنگاری AES-256',
        body: 'ثبت‌های روزانه در دیتابیس محلی گوشی خودت می‌ماند، بکاپ ابری خودکار اندروید خاموش است و قفل اثر انگشت + جلوگیری از اسکرین‌شات فعال می‌شود.',
        ctaLabel: 'جزئیات فنی حریم خصوصی ←',
        ctaHref: '/privacy.html',
        showBreather: false
      };
  }
}

export interface HeroParallaxState {
  progress: number;
  mediaTranslateY: number;
  mediaScale: number;
  mediaOpacity: number;
  glowShiftY: number;
  copyTranslateY: number;
  copyOpacity: number;
}

export function computeHeroParallaxState(
  scrollTop: number,
  viewportHeight: number,
  reducedMotion = false
): HeroParallaxState {
  if (reducedMotion || viewportHeight <= 0) {
    return {
      progress: 0,
      mediaTranslateY: 0,
      mediaScale: 1,
      mediaOpacity: 1,
      glowShiftY: 0,
      copyTranslateY: 0,
      copyOpacity: 1
    };
  }
  const safeScroll = Math.max(0, scrollTop);
  const progress = Math.min(1, safeScroll / Math.max(480, viewportHeight));
  return {
    progress: Number(progress.toFixed(4)),
    mediaTranslateY: Number((progress * 68).toFixed(2)),
    mediaScale: Number((1 + progress * 0.13).toFixed(4)),
    mediaOpacity: Number((1 - progress * 0.56).toFixed(3)),
    glowShiftY: Number((-progress * 26).toFixed(2)),
    copyTranslateY: Number((-progress * 28).toFixed(2)),
    copyOpacity: Number((1 - progress * 0.72).toFixed(3))
  };
}

export interface CoverImageBox {
  offsetX: number;
  offsetY: number;
  renderedWidth: number;
  renderedHeight: number;
}

export function computeCoverImageBox(
  containerW: number,
  containerH: number,
  naturalW: number,
  naturalH: number,
  posXRatio = 0.5,
  posYRatio = 0.5
): CoverImageBox {
  if (containerW <= 0 || containerH <= 0 || naturalW <= 0 || naturalH <= 0) {
    return { offsetX: 0, offsetY: 0, renderedWidth: containerW, renderedHeight: containerH };
  }
  const scale = Math.max(containerW / naturalW, containerH / naturalH);
  const renderedWidth = naturalW * scale;
  const renderedHeight = naturalH * scale;
  const offsetX = (containerW - renderedWidth) * posXRatio;
  const offsetY = (containerH - renderedHeight) * posYRatio;
  return {
    offsetX: Number(offsetX.toFixed(2)),
    offsetY: Number(offsetY.toFixed(2)),
    renderedWidth: Number(renderedWidth.toFixed(2)),
    renderedHeight: Number(renderedHeight.toFixed(2))
  };
}

export interface OrbitPoint3D {
  x: number;
  y: number;
  zDepth: number;
}

export function computeOrbitPoint3D(
  centerX: number,
  centerY: number,
  radiusX: number,
  radiusY: number,
  angle: number,
  tiltRad: number,
  pitchFactor = 0.34
): OrbitPoint3D {
  const lx = Math.cos(angle) * radiusX;
  const ly = Math.sin(angle) * radiusY * pitchFactor;
  const zDepth = Math.sin(angle);
  const cosT = Math.cos(tiltRad);
  const sinT = Math.sin(tiltRad);
  return {
    x: Number((centerX + lx * cosT - ly * sinT).toFixed(2)),
    y: Number((centerY + lx * sinT + ly * cosT).toFixed(2)),
    zDepth: Number(zDepth.toFixed(4))
  };
}

export type AppHeroScreenId = 'dashboard' | 'sos' | 'journey' | 'cortex' | 'mirror';

export type AppHeroOverlayMode = 'none' | 'journey' | 'cortex';

export interface AppHeroScreenSpec {
  id: AppHeroScreenId;
  tabLabel: string;
  badge: string;
  headline: string;
  insight: string;
  imageSrc: string;
  imageAlt: string;
  overlayMode: AppHeroOverlayMode;
}

export function getAppHeroPreviewScreen(id: AppHeroScreenId): AppHeroScreenSpec {
  switch (id) {
    case 'dashboard':
      return {
        id: 'dashboard',
        tabLabel: 'داشبورد',
        badge: 'شروع با ریتم خودت · آرام‌تر، آگاه‌تر، قدرتمندتر',
        headline: 'هر روزت با «حدیث روز»، تمرکز و ثبت مستقل شروع می‌شود',
        insight:
          'تفکیک پاک‌ماندن از پورن و خودارضایی، انتخاب شروع از قدم اول یا واردکردن روز فعلی، ۱۶ عادت رشد و ۳ عادت صبحگاهی.',
        imageSrc: '/assets/dashboard.webp',
        imageAlt: 'نمای واقعی صفحه داشبورد اپلیکیشن حاکم ذهن ۱٫۸ با روز ۱ از ۱۴۰، تمرکز امروز و عادت‌های روزانه',
        overlayMode: 'none'
      };
    case 'sos':
      return {
        id: 'sos',
        tabLabel: 'پناه SOS',
        badge: 'قانون ۵ دقیقه · بدون اجبار و سرزنش',
        headline: 'وسط شب که فشار میاد، لازم نیست برای کل عمرت تصمیم بگیری',
        insight:
          'سه حالت ورود («معمولی»، «الان نمی‌تونم فکر کنم»، «زمین‌گیر شدن بعد از لغزش») + تنفس ۴-۶ و چک HALT در PRO.',
        imageSrc: '/assets/sos-preview.webp',
        imageAlt: 'نمای واقعی صفحه پناه SOS اپلیکیشن حاکم ذهن: لازم نیست همین حالا تصمیم بگیری',
        overlayMode: 'none'
      };
    case 'journey':
      return {
        id: 'journey',
        tabLabel: 'مسیر ۳۰ فصل',
        badge: 'یک کتاب، یک سفر درونی · ۳۰ فصل',
        headline: 'کتاب روش آسان روی جادهٔ کوهستانی ۳۰ قله',
        insight:
          'چهار بخش «مسیر · حقایق · تأمل · SOS» با گام‌های صفحه به صفحه (۵ فصل اول همیشه رایگان).',
        imageSrc: '/assets/app-journey-mountain.jpg',
        imageAlt: 'نمایی از مسیر کوهستانی ۳۰ فصل روش آسان در اپلیکیشن حاکم ذهن ۱٫۸',
        overlayMode: 'journey'
      };
    case 'cortex':
      return {
        id: 'cortex',
        tabLabel: 'نقشهٔ مغز',
        badge: 'کالیبراسیون ۲ دقیقه‌ای · ۱۴۰ گره',
        headline: 'نقشهٔ ۳بعدی کورتکس با پالس‌های کنترل اجرایی',
        insight:
          'چرخاندن لمسی و تطبیق رادار وسوسه با ساعات خطر خودت (سنجش پزشکی مغز نیست).',
        imageSrc: '/assets/app-neural-cortex.jpg',
        imageAlt: 'نمای کورتکس سه بعدی و پالس های سیناپسی در نقشه مغز اپلیکیشن حاکم ذهن ۱٫۸',
        overlayMode: 'cortex'
      };
    case 'mirror':
      return {
        id: 'mirror',
        tabLabel: 'آینهٔ رفتاری',
        badge: 'تحلیل ۳۰ و ۹۰ روز خودت · شناخت من',
        headline: 'ببین دقیقاً کدوم اقدامت، موج وسوسه رو از ۵ به ۲ پایین آورد',
        insight:
          'مقایسهٔ واقعی قبل و بعد اقدام (ثبت سریع این لحظه، خواب و گوشی کنار تخت) روی گوشی خودت؛ بدون آمارهای جعلی.',
        imageSrc: '/assets/analytics-preview.webp',
        imageAlt: 'نمای واقعی بخش شناخت من و آینه رفتاری اپلیکیشن حاکم ذهن با مقایسه قبل و بعد اقدام',
        overlayMode: 'none'
      };
  }
}

export type CompanionMilestoneId = 'night1' | 'day7' | 'day28' | 'day49' | 'day98' | 'day140';

export interface CompanionMilestoneSpec {
  id: CompanionMilestoneId;
  dayLabel: string;
  phaseLabel: string;
  progressPercent: number;
  litNodes: number;
  title: string;
  whatHappensInBody: string;
  howAppHelpsToday: string;
  slipSafetyRule: string;
}

export function getCompanionDayMilestone(id: CompanionMilestoneId): CompanionMilestoneSpec {
  switch (id) {
    case 'night1':
      return {
        id: 'night1',
        dayLabel: 'شب اول',
        phaseLabel: 'فاز ۱ · سم‌زدایی پایه (روز ۱ تا ۴۹)',
        progressPercent: 4,
        litNodes: 3,
        title: 'ورود بدون ثبت‌نام، بدون شمارهٔ تلفن و بدون قضاوت',
        whatHappensInBody:
          'ذهن عادت دارد شب اول دنبال وعدهٔ سنگین یا فرار از کلافگی باشد. تمرکز امشب فقط «نصب آرامش و بستن درزهای فوری» است.',
        howAppHelpsToday:
          'چک شارژر بیرون از اتاق، تنظیم ریتم امروز، خواندن فصل ۱ کتاب روش آسان (رایگان) و آماده‌باش کامل دکمهٔ SOS با قانون ۵ دقیقه.',
        slipSafetyRule: 'اگر امشب خسته شدی، به جای قول‌های یک‌ساله فقط مکث ۵ دقیقه‌ای را بزن.'
      };
    case 'day7':
      return {
        id: 'day7',
        dayLabel: 'روز ۷',
        phaseLabel: 'فاز ۱ · سم‌زدایی پایه (روز ۱ تا ۴۹)',
        progressPercent: 14,
        litNodes: 14,
        title: 'عبور از موج‌های بی‌قراری اولیه و شناخت ساعت خطر خودت',
        whatHappensInBody:
          'در هفتهٔ اول سطح دوپامین به نبود سوخت فراهنجار واکنش نشان می‌دهد؛ ممکن است موج‌های کوتاه هوس یا بی‌حوصلگی بیاید.',
        howAppHelpsToday:
          'تکمیل وظایف فاز ۰ تا ۲ روش آسان، ثبت مستقل روزهای پاکِ پورن و خودارضایی و روشن‌شدن اولین رگه‌های الگو در بخش «شناخت من».',
        slipSafetyRule: 'حتی اگر در خودارضایی لغزشی بود، شمارش دوری از پورن و دانش فاز ۰–۲ پاک نمی‌شود.'
      };
    case 'day28':
      return {
        id: 'day28',
        dayLabel: 'روز ۲۸',
        phaseLabel: 'فاز ۱ · سم‌زدایی پایه (روز ۱ تا ۴۹)',
        progressPercent: 32,
        litNodes: 42,
        title: 'آب‌شدن «هیولای کوچک» از ۱۰۰ به ۰ و بیدارشدن لذت‌های واقعی',
        whatHappensInBody:
          'وابستگی شیمیایی لحظه‌ای («هیولای کوچک») ظرف ۲۸ روز افت محسوسی می‌کند و کیفیت خواب و تمرکز صبحگاهی به شکل ملموسی بالا می‌آید.',
        howAppHelpsToday:
          'فصل‌های عمیق روش آسان، جایگزینی با ۱۶ عادت رشد (مطالعه، ورزش سبک، تغذیه) و بررسی ۳۰ روزهٔ ماشه‌ها در آینهٔ رفتاری.',
        slipSafetyRule: 'اگر وسوسه از تنهایی یا خستگی آمد، چک HALT و قانون ۵ دقیقه سریع ریشه را جدا می‌کند.'
      };
    case 'day49':
      return {
        id: 'day49',
        dayLabel: 'روز ۴۹',
        phaseLabel: 'پایان فاز ۱ ← ورود به فاز ۲ (بازسازی عصبی)',
        progressPercent: 52,
        litNodes: 68,
        title: 'عبور موفق از ۷ هفتهٔ اول و ورود به فاز دوم بازسازی',
        whatHappensInBody:
          'عادت‌های شبانه جایگزین شده‌اند، اسکرول بی‌هدف دیگر حکم خودکار ندارد و قشر پیش‌پیشانی فرصت نظم‌دهی دوباره پیدا کرده است.',
        howAppHelpsToday:
          'تثبیت کارهای روزهای ۴۰ و نزدیک‌شدن به چالش‌های رشد، فعال‌شدن بیش از نیمی از گره‌های ناحیهٔ پیشانی و آهیانه‌ای در نقشهٔ پیشرفت.',
        slipSafetyRule: 'فراموشی فریب «یه بار که اشکال نداره» با مرور یادداشت‌های شخصی روزهای سخت گذشته.'
      };
    case 'day98':
      return {
        id: 'day98',
        dayLabel: 'روز ۹۸',
        phaseLabel: 'پایان فاز ۲ ← ورود به فاز ۳ (تثبیت و تسلط)',
        progressPercent: 78,
        litNodes: 112,
        title: 'آرامش عصبی ۹۰ روزه و کاهش چشمگیر قدرت محرک‌های قبلی',
        whatHappensInBody:
          'محرک‌های قدیمی دیگر مثل آژیر خطر عمل نمی‌کنند؛ بین فکر گذرا و اقدام عملی یک فاصلهٔ امن و خودآگاه شکل گرفته است.',
        howAppHelpsToday:
          'همبستگی‌های ۹۰ روزه در آینهٔ رفتاری، تکمیل وظایف رشد تا روز ۸۰ به بعد، و ثبات ۳ عادت صبحگاهی بدون نیاز به جنگ ذهنی.',
        slipSafetyRule: 'مسیر ۱۴۰ روزه یادآوری می‌کند ثبات بدون سخت‌گیری خشک از دل ریتم آرام ساخته می‌شود.'
      };
    case 'day140':
      return {
        id: 'day140',
        dayLabel: 'روز ۱۴۰',
        phaseLabel: 'فاز ۳ کامل · پایان هفتهٔ ۲۰ (حاکمیت ذهن)',
        progressPercent: 100,
        litNodes: 140,
        title: 'حاکمیت ذهن: آزادی پایدار بدون حس محرومیت یا شمردن روزها',
        whatHappensInBody:
          'دیگر احساس نمی‌کنی چیزی را باخته‌ای یا با خودت می‌جنگی؛ ذهن به تعادل طبیعی پاداش‌های واقعی زندگی برگشته است.',
        howAppHelpsToday:
          'تکمیل هر ۱۴۰ گره در ۷ ناحیهٔ نقشهٔ همراهی رفتارها، اتمام کل ۳ فاز ۷ هفته‌ای و نگهداری امن دستاوردهای رمزنگاری‌شدهٔ `.hzbackup`.',
        slipSafetyRule: 'حاکم ذهن همراه همیشگی تو در جیب می‌ماند؛ حتی پس از اتمام دورهٔ ۱۴۰ روزه.'
      };
  }
}




