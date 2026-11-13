import React, { useState } from 'react';
import { ShieldAlert, Download, Menu, X, BookOpen, Layers, ShieldCheck, Home } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'guides' | 'features' | 'privacy';
  onNavigate: (tab: 'home' | 'guides' | 'features' | 'privacy') => void;
  onOpenSos: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate, onOpenSos }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: 'home' | 'guides' | 'features' | 'privacy') => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0b101b]/90 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark (Single text element wordmark as per constitution) */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 text-right group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
          aria-label="صفحه اصلی حاکم ذهن"
        >
          <img
            src="/assets/icon.png"
            alt="لوگوی حاکم ذهن"
            className="w-10 h-10 rounded-xl shadow-md group-hover:scale-105 transition-transform"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors whitespace-nowrap">
              حاکم ذهن
            </span>
            <span className="text-[11px] text-slate-400 font-normal tracking-wider uppercase">
              SOVEREIGN MIND
            </span>
          </div>
        </button>

        {/* Zone 2: 4 Clean Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300" aria-label="منوی اصلی">
          <button
            onClick={() => handleNav('home')}
            className={`transition-colors whitespace-nowrap hover:text-white py-1 relative ${
              activeTab === 'home' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            صفحه اصلی
            {activeTab === 'home' && (
              <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-emerald-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('guides')}
            className={`transition-colors whitespace-nowrap hover:text-white py-1 relative ${
              activeTab === 'guides' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            کتابخانه شناخت (۱۱ راهنما)
            {activeTab === 'guides' && (
              <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-emerald-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('features')}
            className={`transition-colors whitespace-nowrap hover:text-white py-1 relative ${
              activeTab === 'features' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            امکانات نسخه ۱.۸
            {activeTab === 'features' && (
              <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-emerald-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNav('privacy')}
            className={`transition-colors whitespace-nowrap hover:text-white py-1 relative ${
              activeTab === 'privacy' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            حریم خصوصی و امنیت
            {activeTab === 'privacy' && (
              <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-emerald-400 rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: Action Buttons (Emergency SOS button always 1-click away + Myket download) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSos}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 active:scale-95 rounded-xl shadow-lg shadow-rose-950/40 transition-all border border-rose-500/30 whitespace-nowrap cursor-pointer"
            aria-label="ترمز اضطراری ذهن SOS"
            title="ترمز فوری در لحظه وسوسه"
          >
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>ترمز فوری SOS</span>
          </button>

          <a
            href="https://myket.ir/app/ir.hakemzehn.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 active:scale-95 rounded-xl shadow-md transition-all whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>نصب از مایکت</span>
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
            aria-label={mobileMenuOpen ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0f172a] px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => handleNav('home')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-right ${
              activeTab === 'home' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>صفحه اصلی</span>
          </button>

          <button
            onClick={() => handleNav('guides')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-right ${
              activeTab === 'guides' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>کتابخانه شناخت (۱۱ راهنمای تخصصی)</span>
          </button>

          <button
            onClick={() => handleNav('features')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-right ${
              activeTab === 'features' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>امکانات نسخه ۱.۸</span>
          </button>

          <button
            onClick={() => handleNav('privacy')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-right ${
              activeTab === 'privacy' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>حریم خصوصی و ذخیره محلی</span>
          </button>

          <div className="pt-2">
            <a
              href="https://myket.ir/app/ir.hakemzehn.app"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-900 bg-emerald-400 rounded-xl"
            >
              <Download className="w-4 h-4" />
              <span>نصب رایگان اپلیکیشن از مایکت</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
