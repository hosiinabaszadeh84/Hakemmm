import React, { useState } from 'react';
import { Compass, AlertTriangle, RefreshCw, CheckCircle2, ArrowLeft, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

interface NeedHelpWizardProps {
  onOpenSos: () => void;
  onReadArticle: (articleId: string) => void;
}

export const NeedHelpWizard: React.FC<NeedHelpWizardProps> = ({ onOpenSos, onReadArticle }) => {
  const [selectedState, setSelectedState] = useState<'start' | 'urge' | 'relapse'>('start');

  return (
    <section className="py-16 bg-[#090d16] border-b border-slate-800/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <p className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            مسیر اختصاصی بر اساس وضعیت لحظه‌ای تو
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            الان در چه وضعیتی هستی و چه کمکی می‌خواهی؟
          </h2>
          <p className="text-sm text-slate-400">
            برای دریافت راهکار فوری و متناسب، وضعیت خود را انتخاب کن:
          </p>
        </div>

        {/* 3 Tactile Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
          
          <button
            onClick={() => setSelectedState('start')}
            className={`flex items-center justify-between p-4 rounded-2xl border text-right transition-all cursor-pointer ${
              selectedState === 'start'
                ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/30'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                selectedState === 'start' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}>
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <p className={`font-bold text-sm ${selectedState === 'start' ? 'text-white' : 'text-slate-200'}`}>
                  می‌خواهم شروع کنم
                </p>
                <p className="text-xs text-slate-400">
                  شروع کاهش یا قطع کامل
                </p>
              </div>
            </div>
            {selectedState === 'start' && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
          </button>

          <button
            onClick={() => setSelectedState('urge')}
            className={`flex items-center justify-between p-4 rounded-2xl border text-right transition-all cursor-pointer ${
              selectedState === 'urge'
                ? 'bg-rose-950/40 border-rose-500/60 shadow-lg shadow-rose-950/30 ring-1 ring-rose-500/30'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                selectedState === 'urge' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-300'
              }`}>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className={`font-bold text-sm ${selectedState === 'urge' ? 'text-white' : 'text-slate-200'}`}>
                  الان وسوسه دارم
                </p>
                <p className="text-xs text-slate-400">
                  ترمز فوری و نجات در ۵ دقیقه
                </p>
              </div>
            </div>
            {selectedState === 'urge' && <span className="w-2 h-2 rounded-full bg-rose-400" />}
          </button>

          <button
            onClick={() => setSelectedState('relapse')}
            className={`flex items-center justify-between p-4 rounded-2xl border text-right transition-all cursor-pointer ${
              selectedState === 'relapse'
                ? 'bg-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-950/30 ring-1 ring-amber-500/30'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                selectedState === 'relapse' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}>
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <p className={`font-bold text-sm ${selectedState === 'relapse' ? 'text-white' : 'text-slate-200'}`}>
                  لغزیدم و دلسردم
                </p>
                <p className="text-xs text-slate-400">
                  توقف عذاب وجدان و شروع نو
                </p>
              </div>
            </div>
            {selectedState === 'relapse' && <span className="w-2 h-2 rounded-full bg-amber-400" />}
          </button>

        </div>

        {/* Detailed Action Blueprint Card based on Selection */}
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 sm:p-8 backdrop-blur-sm">
          
          {selectedState === 'start' && (
            <div className="space-y-6 text-right">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>برنامه ۴۸ ساعت اول؛ بدون پیچیدگی و سردرگمی</span>
              </div>
              
              <h3 className="text-xl font-bold text-white">
                قدم اول: قطع دسترسی به محرک‌های فیزیکی، نه مبارزه فرساینده با ذهن
              </h3>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                اشتباه اکثر افراد این است که فکر می‌کنند باید با یک «اراده فولادین» روبه‌روی صفحه گوشی بنشینند و تسلیم نشوند. روش آسان به ما یاد می‌دهد که اراده مثل یک باتری محدود تخلیه می‌شود. همین امشب با ۳ قدم ساده بازی را عوض کن:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 space-y-1.5">
                  <span className="text-emerald-400 font-bold text-sm">۱. قانون رختخواب</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    گوشی را حداقل ۳ متر دورتر از تخت شارژ کن. ۸۵٪ لغزش‌ها در خلوت نیمه‌هوشیار رختخواب رخ می‌دهند.
                  </p>
                </div>
                <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 space-y-1.5">
                  <span className="text-emerald-400 font-bold text-sm">۲. نصب حاکم ذهن</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    ثبت مجزای پورن و خودارضایی را در برنامه فعال کن و مطالعه روزانه ۳۰ گام روش آسان را آغاز کن.
                  </p>
                </div>
                <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 space-y-1.5">
                  <span className="text-emerald-400 font-bold text-sm">۳. هدف ۴۸ ساعته</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    به «تا آخر عمر پاک ماندن» فکر نکن! فقط هدف بگذار که این دو روز اول را هوشیار و با محیط امن بگذرانی.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onReadArticle('start')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>مطالعه نقشه راه ۴۸ ساعت اول</span>
                </button>
                <a
                  href="https://myket.ir/app/ir.hakemzehn.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  <span>دانلود مستقیم اپلیکیشن از مایکت</span>
                  <ArrowLeft className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {selectedState === 'urge' && (
            <div className="space-y-6 text-right">
              <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>پروتکل اضطراری در لحظه وسوسه (۳ تا ۷ دقیقه طلایی)</span>
              </div>
              
              <h3 className="text-xl font-bold text-white">
                تو بد نیستی؛ فقط مغزت دنبال دوپامین سریع و ارزان است
              </h3>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                موج تحریک شیمیایی مغز مثل یک موج دریاست: اوج می‌گیرد و پس از ۵ دقیقه فروکش می‌کند. اگر الان بتوانی بدون تسلیم شدن فقط این ۵ دقیقه را مدیریت کنی، برنده شده‌ای:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-rose-950/20 rounded-xl p-4 border border-rose-900/30 space-y-1.5">
                  <span className="text-rose-400 font-bold text-sm">۱. شوک فیزیکی سریع</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    همین ثانیه از جایت بلند شو. از آن اتاق بیرون برو و یک لیوان آب خنک با جرعه‌های آرام بنوش.
                  </p>
                </div>
                <div className="bg-rose-950/20 rounded-xl p-4 border border-rose-900/30 space-y-1.5">
                  <span className="text-rose-400 font-bold text-sm">۲. تنفس ۴-۴-۴-۴</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    تنفس جعبه‌ای سیستم عصبی پاراسمپاتیک را فعال می‌کند و ضربان قلب و التهاب مغز را فورا پایین می‌آورد.
                  </p>
                </div>
                <div className="bg-rose-950/20 rounded-xl p-4 border border-rose-900/30 space-y-1.5">
                  <span className="text-rose-400 font-bold text-sm">۳. قانون تاخیر ۵ دقیقه‌ای</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    به خودت بگو: «من فقط ۵ دقیقه صبر می‌کنم، بعد تصمیم می‌گیرم». این تاخیر کنترل را به کورتکس بازمی‌گرداند.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenSos}
                  className="flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-rose-950/40 transition-all cursor-pointer"
                >
                  <ShieldAlert className="w-5 h-5 animate-pulse" />
                  <span>اجرای آنلاین ترمز فوری و تنفس هدایت‌شده SOS</span>
                </button>
                <button
                  onClick={() => onReadArticle('triggers')}
                  className="text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>تکنیک شناخت محرک‌ها در ۵ دقیقه</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {selectedState === 'relapse' && (
            <div className="space-y-6 text-right">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                <RefreshCw className="w-4 h-4" />
                <span>پروتکل پس از لغزش؛ شکستن چاه بی‌پایان عذاب وجدان</span>
              </div>
              
              <h3 className="text-xl font-bold text-white">
                لغزش به معنی صفر شدن مسیر و تباهی نیست!
              </h3>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                بزرگ‌ترین خطر پس از لغزش، خود عمل نیست؛ بلکه احساس تحقیر، نفرت از خود و جملهٔ ویرانگر <em>«من دیگر درست‌بشو نیستم»</em> است. این توهم (Chaser Effect) باعث می‌شود فرد چند بار پشت سر هم کار را تکرار کند. حقیقت علمی چیست؟
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-amber-950/20 rounded-xl p-4 border border-amber-900/30 space-y-1.5">
                  <span className="text-amber-400 font-bold text-sm">۱. عدم تخریب پیشرفت</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    مدارهای عصبی که در هفته‌های پاکی ساخته‌ای از بین نرفته‌اند. مثل این است که در یک پیاده‌روی ۲۰ کیلومتری پایت پیچ خورده باشد؛ به نقطه شروع بازنگشته‌ای!
                  </p>
                </div>
                <div className="bg-amber-950/20 rounded-xl p-4 border border-amber-900/30 space-y-1.5">
                  <span className="text-amber-400 font-bold text-sm">۲. پاک‌کردن ردپاها</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    تب‌های مرورگر را ببند، تاریخچه را پاک کن، دوش آب ولرم بگیر و لباس‌هایت را عوض کن. به مغز پیام تغییر وضعیت بده.
                  </p>
                </div>
                <div className="bg-amber-950/20 rounded-xl p-4 border border-amber-900/30 space-y-1.5">
                  <span className="text-amber-400 font-bold text-sm">۳. ثبت بدون عذاب وجدان</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    در اپلیکیشن فقط بنویس: «محرک چه بود؟ گرسنگی؟ خستگی؟ تنهایی؟» و فورا ادامه بده بدون صفرکردن کل زندگی‌ات.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onReadArticle('relapse')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>راهنمای ساعت اول بعد از لغزش</span>
                </button>
                <a
                  href="https://myket.ir/app/ir.hakemzehn.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  <span>بازگشت آرام با اپلیکیشن حاکم ذهن</span>
                  <ArrowLeft className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
