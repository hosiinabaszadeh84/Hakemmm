import React, { useState } from 'react';
import { Layers, ShieldCheck, Download, Sparkles, Check, Brain, Timer, Sliders, Lock, Zap } from 'lucide-react';

interface FeaturesViewProps {
  onOpenSos: () => void;
}

export const FeaturesView: React.FC<FeaturesViewProps> = ({ onOpenSos }) => {
  const [activeTab, setActiveTab] = useState<'easyPeasy' | 'dualTrack' | 'sos' | 'analytics' | 'privacy'>('dualTrack');

  const featureDetails = {
    dualTrack: {
      tag: 'نوآوری اختصاصی نسخه ۱.۸',
      title: 'ثبت جداگانه پورن و خودارضایی (تغذیه ورودی vs خروجی جسم)',
      desc: 'بزرگ‌ترین نقیصه برنامه‌های دیگر، یکی دانستن تماشای تصویر با عمل فیزیکی است. در حاکم ذهن، اگر ناخواسته تصویری دیدید یا لغزش چشمی داشتید، روزهای مقاومت فیزیکی شما صفر نمی‌شود و چرخه عذاب وجدان شکل نمی‌گیرد.',
      image: '/assets/dashboard.webp',
      bulletPoints: [
        'کنتور مجزا برای پورن و کنتور مجزا برای خودارضایی',
        'عدم صفرشدن پیشرفت تجمعی و جلوگیری از اثر دومینو',
        'ثبت یادداشت و محرک در هنگام بروز لغزش برای شناسایی الگوی تکرار'
      ]
    },
    easyPeasy: {
      tag: 'مبتنی بر روان‌شناسی شناختی',
      title: '۳۰ گام روش آسان (EasyPeasy Method) بدون جنگ با اراده',
      desc: 'روش آسان ثابت می‌کند که مبارزه با دندان‌قروچه شکست می‌خورد؛ چون فرد هنوز فکر می‌کند پورن دارد به او آرامش یا لذت می‌دهد. با خواندن روزانه ۱ گام کوتاه، باورهای کاذب فرو می‌ریزند و میل ناخودآگاه خاموش می‌شود.',
      image: '/assets/brain-preview.webp',
      bulletPoints: [
        '۳۰ مرحله کوتاه و روان قابل مطالعه در ۲ تا ۳ دقیقه روزانه',
        'بررسی ریشه‌ای مفهوم شستشوی مغزی و تله دوپامین',
        'تثبیت دیدگاه رهایی بدون احساس قربانی‌بودن یا محرومیت'
      ]
    },
    sos: {
      tag: 'ابزار اضطراری در جیب شما',
      title: 'کلید ترمز فوری SOS و تنفس هدایت‌شده ۱۶ ثانیه‌ای',
      desc: 'وقتی در نیمه‌شب تکانه شدید میل می‌آید، زمان خواندن کتاب یا منطق نیست. ابزار SOS سیستم عصبی را از حالت جنگ‌وگریز خارج می‌کند و در ۳ تا ۵ دقیقه نبض و هیجان را پایین می‌آورد.',
      image: '/assets/sos-preview.webp',
      bulletPoints: [
        'تنفس جعبه‌ای ۴-۴-۴-۴ با راهنمای بصری و شمارش معکوس',
        'صوت آرامش‌بخش فرکانس پایین و نویز تسکین‌دهنده',
        'دستورالعمل‌های شوک حسی برای انحراف فوری جریان خون از مدارهای لیمبیک'
      ]
    },
    analytics: {
      tag: 'بسته طلایی و پیشرفته',
      title: 'تحلیل هوشمند محرک‌ها و نمودارهای روند پاکی',
      desc: 'با نمودارهای تفکیکی، زمان‌ها و روزهایی که بیشترین وسوسه به سراغتان آمده را روی نقشه زمانی مشاهده می‌کنید تا قبل از رسیدن به آن ساعت‌ها، محیط خود را ایمن‌سازی کنید.',
      image: '/assets/analytics-preview.webp',
      bulletPoints: [
        'نمودار مقایسه‌ای کاهش تدریجی دفعات لغزش',
        'شناسایی ساعات بحرانی شبانه‌روز و روزهای آخر هفته',
        'مدال‌های پیشرفت بر اساس تاب‌آوری و مقاومت در برابر تکانه'
      ]
    },
    privacy: {
      tag: 'امنیت ۱۰۰٪ آفلاین',
      title: 'بدون حساب کاربری، بدون شماره همراه، با قفل اثر انگشت',
      desc: 'حریم خصوصی شما شوخی‌بردار نیست. در حاکم ذهن هیچ ثبت‌نامی وجود ندارد. حتی اگر اینترنت قطع باشد برنامه کامل کار می‌کند و هیچکس نمی‌تواند به داده‌های گوشی شما دسترسی پیدا کند.',
      image: '/assets/dashboard.webp',
      bulletPoints: [
        'پشتیبانی از سنسور اثر انگشت و پین‌کد اختصاصی',
        'استتار آیکون اپلیکیشن در لیست برنامه‌ها',
        'ذخیره محلی روی دیتابیس رمزگذاری‌شده دستگاه شما'
      ]
    }
  };

  const current = featureDetails[activeTab];

  return (
    <div className="py-12 bg-[#0b101b] min-h-screen text-right">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <Layers className="w-4 h-4" />
            <span>امکانات نسخه ۱.۸ و بسته طلایی</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            تکنولوژی در خدمت آرامش ذهن تو
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            بررسی قابلیت‌هایی که حاکم ذهن را از تمام روزشمارهای سطحی و استرس‌زا متمایز کرده است.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl max-w-3xl mx-auto">
          <button
            onClick={() => setActiveTab('dualTrack')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'dualTrack'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ثبت جداگانه پورن و خودارضایی
          </button>

          <button
            onClick={() => setActiveTab('easyPeasy')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'easyPeasy'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ۳۰ گام روش آسان
          </button>

          <button
            onClick={() => setActiveTab('sos')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'sos'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ترمز فوری SOS
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            تحلیل الگوها
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            قفل محلی و امنیت
          </button>
        </div>

        {/* Feature Spotlight Card */}
        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Feature Description (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">
                {current.tag}
              </span>

              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {current.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {current.desc}
              </p>

              <div className="space-y-3 pt-2">
                {current.bulletPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="https://myket.ir/app/ir.hakemzehn.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>دریافت نسخه ۱.۸ از مایکت</span>
                </a>

                {activeTab === 'sos' && (
                  <button
                    onClick={onOpenSos}
                    className="px-5 py-3 bg-rose-600/90 hover:bg-rose-500 text-white font-bold rounded-xl text-sm transition-all cursor-pointer"
                  >
                    تست آنلاین ترمز اضطراری
                  </button>
                )}
              </div>
            </div>

            {/* Feature Visual Mockup (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] aspect-[9/18] bg-slate-950 rounded-[2.2rem] p-3 border-4 border-slate-700 shadow-xl overflow-hidden flex flex-col">
                <div className="w-20 h-3.5 bg-slate-800 rounded-full mx-auto mb-2 shrink-0" />
                <div className="relative flex-1 rounded-[1.5rem] overflow-hidden bg-slate-900 border border-slate-800">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="w-24 h-1 bg-slate-700 rounded-full mx-auto mt-2 shrink-0" />
              </div>
            </div>

          </div>
        </div>

        {/* Comparison Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">مسیر ۲۰ هفته‌ای (۱۴۰ روزه)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              تقسیم‌بندی مسیر به مراحل کوتاه ۵ و ۱۰ روزه تا دستیابی به تعادل کامل مدارهای دوپامین، بدون وعده جادویی یا تضمین کاذب.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">ژورنال ثبت حالات روحی</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              ثبت احساس خستگی، تنهایی، اضطراب یا کسالت هنگام میل، تا ذهن متوجه شود پورن یک مسئله جنسی نیست بلکه فرار از هیجان منفی است.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">آیکون استتار و قفل بیومتریک</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              امکان تغییر آیکون و نام برنامه در صفحه اصلی گوشی به شکل یک ابزار یادداشت روزانه یا تقویم ساده جهت حفظ ۱۰۰٪ محرمانگی.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
