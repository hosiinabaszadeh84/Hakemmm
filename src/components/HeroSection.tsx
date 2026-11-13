import React, { useState } from 'react';
import { Download, Sparkles, CheckCircle2, Shield, HeartPulse, ChevronLeft, HelpCircle } from 'lucide-react';

interface HeroSectionProps {
  onOpenSos: () => void;
  onOpenAssessment: () => void;
  onExploreGuides: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenSos,
  onOpenAssessment,
  onExploreGuides
}) => {
  const [activePreviewTab, setActivePreviewTab] = useState<'dashboard' | 'sos' | 'analytics'>('dashboard');

  const previews = {
    dashboard: {
      title: 'داشبورد هوشمند',
      desc: 'ثبت مجزای پاکی پورن و خودارضایی بدون صفرشدن کل مسیر در یک لغزش',
      image: '/assets/dashboard.webp'
    },
    sos: {
      title: 'ترمز اضطراری SOS',
      desc: 'پروتکل ۳ تا ۷ دقیقه‌ای ترمز ذهن با تنفس جعبه‌ای در اوج هوس',
      image: '/assets/sos-preview.webp'
    },
    analytics: {
      title: 'تحلیل الگوهای وسوسه',
      desc: 'شناسایی زمان‌ها و احساسات پرخطر برای بستن رخنه‌های ناخودآگاه',
      image: '/assets/analytics-preview.webp'
    }
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800/60 bg-gradient-to-b from-[#0e1628] via-[#0b101b] to-[#090d16]">
      {/* Subtle background ambient mesh */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Column (7 cols) */}
          <div className="lg:col-span-7 text-right space-y-6">
            
            {/* Unboxed natural editorial subtitle / release indicator */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-emerald-400 font-medium">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>نسخه ۱.۸ منتشر شد</span>
              <span className="text-slate-500" aria-hidden="true">·</span>
              <span>رسمی و رایگان در مایکت</span>
              <span className="text-slate-500" aria-hidden="true">·</span>
              <span className="text-slate-400">۱۰۰٪ آفلاین و محرمانه</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight sm:leading-snug">
              حاکم ذهن؛
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                رهایی علمی از پورن و خودارضایی.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              اگر از قول‌های خسته‌کننده و روزشمارهای معمولی که با یک لغزش تمام زحماتت را صفر می‌کنند بریده‌ای، 
              حاکم ذهن یک پناهگاه علمی روی گوشی توست: 
              <strong className="text-white font-semibold"> روش آسان (ایزی‌پیسی) </strong> 
              به‌جای جنگ فرساینده با اراده، 
              <strong className="text-white font-semibold"> ثبت مستقل پورن و خودارضایی </strong> 
              و 
              <strong className="text-white font-semibold"> ابزار SOS </strong> 
              برای لحظه اوج وسوسه.
            </p>

            {/* Core Value Micro-Pillars (Clean text without bulky boxes) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>عدم صفرشدن مسیر در یک لغزش</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>بدون حساب کاربری و ذخیره سروری</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ترمز ذهن در ۳ تا ۷ دقیقه بحرانی</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://myket.ir/app/ir.hakemzehn.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-950/30 transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>دریافت رایگان از مایکت</span>
              </a>

              <button
                onClick={onOpenAssessment}
                className="flex items-center gap-2 px-5 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold rounded-xl border border-slate-700 hover:border-slate-600 transition-all text-sm sm:text-base cursor-pointer"
              >
                <HelpCircle className="w-5 h-5 text-teal-400" />
                <span>سنجش وضعیت من (تست ۳ دقیقه‌ای)</span>
              </button>

              <button
                onClick={onExploreGuides}
                className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1 py-2 cursor-pointer"
              >
                <span>مطالعه ۱۱ راهنمای تخصصی</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Mockup Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-xl mb-4 text-xs">
              <button
                onClick={() => setActivePreviewTab('dashboard')}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium cursor-pointer ${
                  activePreviewTab === 'dashboard'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                داشبورد اصلی
              </button>
              <button
                onClick={() => setActivePreviewTab('sos')}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium cursor-pointer ${
                  activePreviewTab === 'sos'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ترمز SOS
              </button>
              <button
                onClick={() => setActivePreviewTab('analytics')}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium cursor-pointer ${
                  activePreviewTab === 'analytics'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                تحلیل روند
              </button>
            </div>

            {/* Smartphone Display Card */}
            <div className="relative w-full max-w-[320px] aspect-[9/18.5] bg-slate-950 rounded-[2.5rem] p-3.5 border-4 border-slate-700/80 shadow-2xl shadow-emerald-950/20 glow-emerald overflow-hidden flex flex-col">
              
              {/* Speaker / Camera Notch */}
              <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 shrink-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-900" />
              </div>

              {/* Screen Content Container */}
              <div className="relative flex-1 rounded-[1.75rem] overflow-hidden bg-slate-900 border border-slate-800/80 flex flex-col">
                <img
                  src={previews[activePreviewTab].image}
                  alt={previews[activePreviewTab].title}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  onError={(e) => {
                    // Fallback container when webp isn't supported
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Fallback & Overlay Caption */}
                <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent text-right">
                  <p className="text-xs font-bold text-white mb-0.5">
                    {previews[activePreviewTab].title}
                  </p>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    {previews[activePreviewTab].desc}
                  </p>
                </div>
              </div>

              {/* Home indicator bar */}
              <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-2 shrink-0" />
            </div>

            {/* Direct tactile button on phone */}
            <p className="text-xs text-slate-400 mt-3 text-center">
              نمای واقعی محیط اپلیکیشن در اندروید
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
