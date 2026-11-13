import React from 'react';
import { Download, ShieldAlert, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'guides' | 'features' | 'privacy') => void;
  onOpenSos: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSos }) => {
  return (
    <footer className="bg-[#070b13] border-t border-slate-800 text-right text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/icon.png"
                alt="لوگوی حاکم ذهن"
                className="w-9 h-9 rounded-xl"
                onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
              />
              <div>
                <span className="text-lg font-bold text-white block">حاکم ذهن</span>
                <span className="text-[10px] text-slate-400 font-normal uppercase tracking-wider">
                  SOVEREIGN MIND · HAKEMZEHN.IR
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              پلتفرم و اپلیکیشن علمی و بدون قضاوت رهایی از پورنوگرافی و خودارضایی؛ با متد ثبت مستقل، روش آسان و ترمز اضطراری لحظه‌ای.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={onOpenSos}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-rose-600/80 hover:bg-rose-500 rounded-lg cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>ترمز اضطراری فوری SOS</span>
              </button>
            </div>
          </div>

          {/* Layer Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              لایه‌های سایت و دسترسی سریع
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  صفحه اصلی (ویترین و شروع)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guides')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  کتابخانه شناخت (۱۱ مقاله تخصصی)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('features')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  امکانات نسخه ۱.۸ و بسته طلایی
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  حریم خصوصی و ذخیره محلی
                </button>
              </li>
            </ul>
          </div>

          {/* Official Releases (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              دریافت نسخه رسمی اندروید
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              نسخه ۱.۸ برای اندروید ۷ به بالا در فروشگاه مایکت منتشر شده است:
            </p>
            <a
              href="https://myket.ir/app/ir.hakemzehn.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-xs font-bold text-white hover:text-emerald-300 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>صفحه حاکم ذهن در مایکت</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 mr-auto" />
            </a>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 space-y-3 text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong className="text-slate-400 font-semibold">یادداشت حقوقی و سلامت: </strong>
            محتوا و ابزارهای حاکم ذهن بر پایه روان‌شناسی شناختی-رفتاری، آموزش‌های روش آسان (ایزی‌پیسی) و تجربیات زیسته طراحی شده‌اند و جنبه خودیاری و ارتقای کیفیت زندگی دارند. در صورت وجود وسواس‌های شدید بالینی یا افسردگی حاد، مشاوره با روان‌شناس یا روان‌پزشک همواره توصیه می‌شود.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-slate-400">
            <span>© تمامی حقوق برای حاکم ذهن (Hakemzehn.ir) محفوظ است.</span>
            <span>طراحی شده با احترام به شأن و آرامش ذهن انسان</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
