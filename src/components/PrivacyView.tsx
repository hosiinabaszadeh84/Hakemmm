import React from 'react';
import { ShieldCheck, Lock, EyeOff, Smartphone, Database, CheckCircle2, AlertCircle } from 'lucide-react';

export const PrivacyView: React.FC = () => {
  return (
    <div className="py-12 bg-[#0b101b] min-h-screen text-right">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>امنیت، محرمانگی و اعتماد کامل</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            حریم خصوصی؛ امنیت ۱۰۰٪ آفلاین روی گوشی تو
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            موضوع رهایی از عادات رفتاری حساس‌ترین اطلاعات شخصی یک انسان است. حاکم ذهن با معماری Zero-Knowledge و آفلاین کامل طراحی شده است.
          </p>
        </div>

        {/* 4 Pillars of Privacy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <EyeOff className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">بدون نیاز به هویت یا ثبت‌نام</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              برای ورود به برنامه هیچ نام، شماره تلفن، ایمیل، یا اتصال به حساب‌های گوگل/مایکت لازم نیست. شما بلافاصله پس از نصب وارد محیط برنامه می‌شوید.
            </p>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">ذخیره‌سازی کاملاً محلی (Local)</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تمام تاریخ‌ها، یادداشت‌های لغزش، احساسات و تنظیمات تنها در حافظه رمزگذاری‌شده گوشی خودتان قرار دارند و هیچ سرور آنلاینی وجود ندارد.
            </p>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">قفل اثر انگشت و پین‌کد</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              می‌توانید برنامه را به قفل بیومتریک گوشی مجهز کنید تا حتی اگر گوشی شما دست دیگران بیفتد، هیچکس امکان ورود به برنامه را نداشته باشد.
            </p>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">عدم دسترسی به مجوزهای حساس</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              حاکم ذهن به هیچ مجوزی از قبیل مخاطبین، گالری، پیامک، موقعیت مکانی (GPS) یا میکروفون دسترسی ندارد و حتی اتصال اینترنت برای کارکرد برنامه الزامی نیست.
            </p>
          </div>
        </div>

        {/* Detailed Privacy Statement Box */}
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>پاسخ صریح به سوالات امنیتی کاربران</span>
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong className="text-white">آیا سازندگان حاکم ذهن می‌توانند بفهمند من چند روز پاک هستم یا چه یادداشت‌هایی نوشته‌ام؟</strong>
              <br />
              خیر؛ به لحاظ معماری نرم‌افزار، امکان فنی برای دیدن یادداشت‌ها یا روزهای شما وجود ندارد. کد برنامه بدون هیچ API ارسال داده عمل می‌کند.
            </p>

            <p>
              <strong className="text-white">در صورت تعویض گوشی یا پاک کردن برنامه چه می‌شود؟</strong>
              <br />
              از آنجا که داده‌ها در سرور ذخیره نمی‌شوند، با پاک کردن کش یا حذف برنامه اطلاعات پاک می‌شوند؛ مگر اینکه از قابلیت خروجی پشتیبان (Backup) رمزگذاری‌شده که در تنظیمات قرار دارد استفاده کنید و فایل آن را در جای امنی نگه دارید.
            </p>

            <p>
              <strong className="text-white">پرداخت بسته طلایی در مایکت چگونه مدیریت می‌شود؟</strong>
              <br />
              تراکنش خرید از طریق درگاه رسمی مایکت صورت می‌گیرد و حاکم ذهن فقط وضعیت تایید خرید محلی را از مایکت استعلام می‌کند، بدون دریافت اطلاعات کارت بانکی یا هویت کاربر.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-2">
          <a
            href="https://myket.ir/app/ir.hakemzehn.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl shadow-md transition-all text-sm cursor-pointer"
          >
            <span>نصب اپلیکیشن امن و محرمانه از مایکت</span>
          </a>
        </div>

      </div>
    </div>
  );
};
