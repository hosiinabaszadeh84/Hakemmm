import React, { useState, useMemo } from 'react';
import {
  BookOpen, Search, ArrowRight, ArrowLeft, Clock,
  ChevronDown, ChevronUp, Download, CheckCircle2,
  Sparkles, Filter, Share2
} from 'lucide-react';
import { guidesData, GuideItem } from '../data/guidesData';

interface GuidesLibraryViewProps {
  initialArticleId?: string | null;
  onClearInitialArticle?: () => void;
  onOpenSos: () => void;
}

export const GuidesLibraryView: React.FC<GuidesLibraryViewProps> = ({
  initialArticleId,
  onClearInitialArticle,
  onOpenSos
}) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(initialArticleId || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter guides
  const filteredGuides = useMemo(() => {
    return guidesData.filter((g) => {
      const matchCat = selectedCategory === 'all' || g.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        g.title.includes(searchQuery) ||
        g.description.includes(searchQuery) ||
        g.sections.some(s => s.title.includes(searchQuery) || s.content.some(c => c.includes(searchQuery)));
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Current active article if viewing
  const activeArticle = useMemo(() => {
    if (!selectedArticleId) return null;
    return guidesData.find(g => g.id === selectedArticleId) || null;
  }, [selectedArticleId]);

  // Toggle step accordion
  const toggleSection = (secId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [secId]: prev[secId] === undefined ? false : !prev[secId] // default open first time unless toggled
    }));
  };

  const handleSelectArticle = (id: string) => {
    setSelectedArticleId(id);
    setOpenSections({}); // reset
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLibrary = () => {
    setSelectedArticleId(null);
    if (onClearInitialArticle) onClearInitialArticle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // If viewing a single article
  if (activeArticle) {
    // Next and previous article
    const currentIndex = guidesData.findIndex(g => g.id === activeArticle.id);
    const prevArticle = currentIndex > 0 ? guidesData[currentIndex - 1] : null;
    const nextArticle = currentIndex < guidesData.length - 1 ? guidesData[currentIndex + 1] : null;

    return (
      <div className="py-12 bg-[#0b101b] min-h-screen text-right">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Navigation Bar & Back */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <button
              onClick={handleBackToLibrary}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت به کتابخانه شناخت (۱۱ راهنما)</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
                title="کپی لینک این راهنما"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'لینک کپی شد!' : 'اشتراک‌گذاری'}</span>
              </button>

              <button
                onClick={onOpenSos}
                className="px-3 py-1.5 text-xs font-bold text-white bg-rose-600/90 hover:bg-rose-500 rounded-lg cursor-pointer"
              >
                ترمز SOS
              </button>
            </div>
          </div>

          {/* Article Header */}
          <header className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-emerald-400 font-semibold">{activeArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeArticle.readTime} زمان مطالعه</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>رویکرد علمی بدون قضاوت</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              {activeArticle.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {activeArticle.description}
            </p>
          </header>

          {/* 30-Second Executive Summary Box (Mandatory Constitution Rule) */}
          <div className="bg-emerald-950/30 rounded-2xl border-2 border-emerald-500/30 p-5 sm:p-6 shadow-xl shadow-emerald-950/20">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-3">
              <Sparkles className="w-5 h-5" />
              <span>خلاصه اجرایی ۳۰ ثانیه‌ای (نکات طلایی برای کاربری که عجله دارد)</span>
            </div>
            
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
              {activeArticle.summary.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step-by-Step Sections (Accordion Style to eliminate the 'Text Wall') */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">
                مطالعه مرحله‌به‌مرحله (گام‌های کاربردی)
              </h2>
              <span className="text-xs text-slate-400">
                هر بخش را لمس کن تا باز شود
              </span>
            </div>

            {activeArticle.sections.map((section, sIdx) => {
              // Default open first section, others closed unless user interacted
              const isDefaultOpen = sIdx === 0;
              const isSectionOpen = openSections[section.id] !== undefined
                ? openSections[section.id]
                : isDefaultOpen;

              return (
                <div
                  key={section.id}
                  className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-right hover:bg-slate-800/40 transition-colors cursor-pointer focus:outline-none"
                    aria-expanded={isSectionOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-800 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                        {sIdx + 1}
                      </span>
                      <span className="font-bold text-sm sm:text-base text-slate-100">
                        {section.title}
                      </span>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mr-3 text-slate-400">
                      {isSectionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isSectionOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/60 space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {section.content.map((paragraph, pIdx) => (
                        <p key={pIdx}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom App Connection CTA Bar (Mandatory Architecture) */}
          <div className="p-6 rounded-2xl bg-gradient-to-l from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-5 text-right">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white">
                می‌خواهی این تمرین و روش را عملی روی گوشیت اجرا کنی؟
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                اپلیکیشن حاکم ذهن با ثبت مستقل، ۳۰ گام روزانه و ابزار ترمز اضطراری لحظه‌ای به تو کمک می‌کند.
              </p>
            </div>

            <a
              href="https://myket.ir/app/ir.hakemzehn.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl shadow-lg transition-all shrink-0 flex items-center gap-2 text-sm cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>نصب رایگان از مایکت</span>
            </a>
          </div>

          {/* Next / Previous Article Footer Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            {prevArticle ? (
              <button
                onClick={() => handleSelectArticle(prevArticle.id)}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-right transition-colors cursor-pointer space-y-1"
              >
                <span className="text-[11px] text-slate-400 block">← راهنمای قبلی</span>
                <span className="text-xs sm:text-sm font-bold text-slate-200 hover:text-white line-clamp-1">
                  {prevArticle.shortTitle}
                </span>
              </button>
            ) : <div />}

            {nextArticle ? (
              <button
                onClick={() => handleSelectArticle(nextArticle.id)}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-right sm:text-left transition-colors cursor-pointer space-y-1"
              >
                <span className="text-[11px] text-slate-400 block">راهنمای بعدی →</span>
                <span className="text-xs sm:text-sm font-bold text-slate-200 hover:text-white line-clamp-1">
                  {nextArticle.shortTitle}
                </span>
              </button>
            ) : <div />}
          </div>

        </div>
      </div>
    );
  }

  // Browse mode: show all 11 guides in an organized directory
  return (
    <div className="py-12 bg-[#0b101b] min-h-screen text-right">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <BookOpen className="w-4 h-4" />
            <span>کتابخانه جامع شناخت و آموزش رهایی</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ۱۱ راهنمای تخصصی حاکم ذهن
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            مطالعه عمیق، مستند به مقالات عصب‌شناسی و روان‌شناسی اعتیاد؛ بدون قضاوت، بدون بزرگ‌نمایی خرافی و با گام‌های عملی.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-slate-800">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              همه ({guidesData.length})
            </button>
            <button
              onClick={() => setSelectedCategory('شروع و رهایی')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                selectedCategory === 'شروع و رهایی'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              شروع و رهایی (۴)
            </button>
            <button
              onClick={() => setSelectedCategory('علم، عوارض و شناخت')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                selectedCategory === 'علم، عوارض و شناخت'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              علم و عوارض (۴)
            </button>
            <button
              onClick={() => setSelectedCategory('مخاطبان و زاویه‌ها')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                selectedCategory === 'مخاطبان و زاویه‌ها'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              مخاطبان و زاویه‌ها (۳)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در عنوان یا متن مقالات..."
              className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <article
              key={guide.id}
              onClick={() => handleSelectArticle(guide.id)}
              className="group bg-slate-900/60 hover:bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-emerald-500/40 p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer text-right hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-emerald-950/20"
            >
              <div className="space-y-4">
                
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-emerald-400">{guide.category}</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{guide.readTime}</span>
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {guide.title}
                </h2>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {guide.excerpt || guide.description}
                </p>

                {/* 30-sec preview snippet */}
                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 text-[11px] text-slate-300">
                  <span className="font-bold text-emerald-400 block mb-0.5">خلاصه ۳۰ ثانیه‌ای:</span>
                  <p className="line-clamp-2">
                    {guide.summary[0]}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-emerald-400 transition-colors">
                <span>مطالعه مقاله و گام‌های عملی</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
            <p className="text-slate-400 text-sm">
              هیچ مقاله‌ای با عبارت «{searchQuery}» پیدا نشد.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-xs text-emerald-400 hover:underline"
            >
              پاک کردن فیلترها و مشاهده همه
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
