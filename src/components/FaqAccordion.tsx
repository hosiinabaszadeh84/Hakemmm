import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { faqList } from '../data/guidesData';

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-[#0b101b] border-b border-slate-800/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <HelpCircle className="w-4 h-4" />
            <span>پاسخ به ابهامات و دغدغه‌های پرتکرار</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            پرسش‌های کلیدی شما
          </h2>
          <p className="text-sm text-slate-400">
            پاسخ‌های کوتاه و شفاف به مهم‌ترین سوالات پیش از نصب اپلیکیشن
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3.5">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 rounded-2xl border border-slate-800/90 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-right text-slate-100 hover:text-white transition-colors cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base leading-snug">
                    {item.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mr-3 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-400' : 'text-slate-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-right border-t border-slate-800/50">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Security / Privacy reassurance banner */}
        <div className="mt-8 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center gap-3 text-right">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-emerald-400 font-semibold">تضمین محرمانگی: </strong>
            حاکم ذهن فاقد هرگونه پایگاه داده آنلاین یا اتصال به سرورهای خارجی است. تمام داده‌ها تنها روی پردازنده گوشی خودتان باقی می‌مانند.
          </p>
        </div>

      </div>
    </section>
  );
};
