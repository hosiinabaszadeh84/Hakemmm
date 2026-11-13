import React from 'react';
import { ArrowLeft, Clock, BookOpen, Compass, AlertCircle, Moon } from 'lucide-react';
import { guidesData, GuideItem } from '../data/guidesData';

interface FeaturedGuidesProps {
  onOpenArticle: (id: string) => void;
  onViewAllGuides: () => void;
}

export const FeaturedGuides: React.FC<FeaturedGuidesProps> = ({ onOpenArticle, onViewAllGuides }) => {
  // Select the 3 top requested guides:
  // 1. start (شروع در ۴۸ ساعت اول)
  // 2. avarze-khod-arzaei (عوارض و شایعات)
  // 3. tark-khod-arzaei or triggers (خواب، تختخواب و محرک‌ها)
  const featuredIds = ['start', 'avarze-khod-arzaei', 'triggers'];
  const featured = featuredIds
    .map(id => guidesData.find(g => g.id === id))
    .filter(Boolean) as GuideItem[];

  const getIcon = (id: string) => {
    switch (id) {
      case 'start': return <Compass className="w-5 h-5 text-emerald-400" />;
      case 'avarze-khod-arzaei': return <AlertCircle className="w-5 h-5 text-cyan-400" />;
      default: return <Moon className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section className="py-16 bg-[#090d16] border-b border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with View All Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-right">
          <div>
            <p className="text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-1">
              کتابخانه شناخت · گلچین مقالات
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              ۳ راهنمای پرمخاطب برای شروع
            </h2>
          </div>

          <button
            onClick={onViewAllGuides}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>مشاهده همه ۱۱ راهنمای تخصصی</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Clean Airy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((guide) => (
            <article
              key={guide.id}
              onClick={() => onOpenArticle(guide.id)}
              className="group bg-slate-900/60 hover:bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-emerald-500/40 p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer text-right hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-emerald-950/20"
            >
              <div className="space-y-4">
                
                {/* Clean unboxed metadata with dot separators */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    {getIcon(guide.id)}
                    <span className="font-medium text-slate-300">{guide.category}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{guide.readTime} مطالعه</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {guide.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {guide.excerpt || guide.description}
                </p>

                {/* 30-sec teaser box preview */}
                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 text-[11px] text-slate-300 space-y-1">
                  <span className="font-bold text-emerald-400 block">نکته کلیدی:</span>
                  <p className="line-clamp-2">
                    {guide.summary[0]}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-emerald-400 transition-colors">
                <span>مطالعه خلاصه و گام‌های عملی</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        {/* Quiet Footnote */}
        <div className="text-center mt-10">
          <p className="text-xs text-slate-400">
            تمام ۱۱ راهنمای حاکم ذهن به دور از قضاوت و با استناد به مبانی عصب‌شناسی و تجربیات زیسته نوشته شده‌اند.
          </p>
        </div>

      </div>
    </section>
  );
};
