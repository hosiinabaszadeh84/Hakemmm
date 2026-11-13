import React, { useState } from 'react';
import { XCircle, CheckCircle2, SlidersHorizontal, ArrowLeftRight } from 'lucide-react';

export const CompareMethod: React.FC = () => {
  const [activeDimension, setActiveDimension] = useState<number>(0);

  const comparisons = [
    {
      title: 'واکنش به یک لحظه لغزش',
      oldMethod: {
        headline: 'صفرشدن کل عدد و احساس تباهی کامل',
        detail: 'روزشمار معمولی با اولین لغزش عدد ۳۰ را به صفر تبدیل می‌کند. کاربر احساس می‌کند تمام زحماتش سوخته و وارد توهم «آب که از سر گذشت چه یک وجب چه صد وجب» می‌شود.'
      },
      hakemZehn: {
        headline: 'حفظ تاب‌آوری و تفکیک مستقل',
        detail: 'در حاکم ذهن روزهای مقاومت شما پاک نمی‌شوند. لغزش تنها به عنوان یک داده ثبت می‌شود و مسیر بازسازی دوپامین مغز ادامه می‌یابد بدون عذاب وجدان ویرانگر.'
      }
    },
    {
      title: 'تفکیک پورن از خودارضایی',
      oldMethod: {
        headline: 'ترکیب و یکی دانستن هر دو رفتار',
        detail: 'اگر فقط یک عکس یا ویدیوی کوتاه ببیند، روزشمار را صفر می‌کند یا خودارضایی می‌کند چون فکر می‌کند فرقی ندارد!'
      },
      hakemZehn: {
        headline: 'دو فیلد جداگانه: ورودی مغز در برابر خروجی جسم',
        detail: 'پورن اعتیاد بینایی و اختلال در دوپامین است و خودارضایی تخلیه جسمی. تفکیک این دو در نسخه ۱.۸ ریشه وسوسه را شفاف و مهارپذیر می‌کند.'
      }
    },
    {
      title: 'شیوه روان‌شناسی و ترک',
      oldMethod: {
        headline: 'جنگ اراده فرساینده و وسواس روزها',
        detail: 'فرد هر روز با دندان‌قروچه با میل خود می‌جنگد و مدام روزها را می‌شمارد. این تمرکز دائم روی «ترک کردن»، خودش محرک وسوسه می‌شود.'
      },
      hakemZehn: {
        headline: 'روش آسان (ایزی‌پیسی) ۳۰ گام',
        detail: 'به‌جای جنگ با اراده، مغز متوجه می‌شود که پورن هیچ لذت یا فایده واقعی ندارد. وقتی باورهای غلط بیفتند، میل خود‌به‌خود رنگ می‌بازد.'
      }
    },
    {
      title: 'امکانات در لحظه وسوسه',
      oldMethod: {
        headline: 'یک صفحه ساکت و یک عدد خشک',
        detail: 'وقتی هوس ساعت ۱۲ شب می‌آید، روزشمار فقط نشان می‌دهد روز ۵ هستی! هیچ کمکی برای پایین آوردن فشار خون و ترمز مغز ندارد.'
      },
      hakemZehn: {
        headline: 'کلید ترمز فوری SOS و تنفس هدایت‌شده',
        detail: 'با یک لمس ابزار SOS باز می‌شود: تنفس جعبه‌ای ۱۶ ثانیه‌ای، صدای آرامش، تکنیک شوک حسی و تاخیر ۵ دقیقه‌ای تا موج هوس رد شود.'
      }
    }
  ];

  return (
    <section className="py-16 bg-[#0b101b] border-b border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <p className="text-xs font-semibold tracking-wider text-teal-400 uppercase">
            علم رفتار در برابر شمارش وسواس‌گونه
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            چرا روزشمارهای معمولی شکست می‌خورند؟
          </h2>
          <p className="text-sm text-slate-400">
            تفاوت اساسی تفکر سنتی با متد علمی ثبت مستقل حاکم ذهن
          </p>
        </div>

        {/* Interactive Dimension Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {comparisons.map((c, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDimension(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeDimension === idx
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-transparent'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Old Streak App Card */}
          <div className="bg-slate-900/40 rounded-2xl border border-rose-950/40 p-6 sm:p-7 flex flex-col justify-between space-y-5 text-right relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-rose-400/80">
                  رویکرد شکست‌خورده
                </span>
                <div className="w-8 h-8 rounded-lg bg-rose-950/40 text-rose-400 flex items-center justify-center">
                  <XCircle className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-200">
                اپلیکیشن‌های روزشمار معمولی
              </h3>

              <div className="bg-rose-950/20 rounded-xl p-4 border border-rose-900/20 space-y-2">
                <p className="text-sm font-bold text-rose-300">
                  {comparisons[activeDimension].oldMethod.headline}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {comparisons[activeDimension].oldMethod.detail}
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-400 pt-1">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>ایجاد اضطراب وسواس‌گونه پیرامون عدد روزها</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>احساس شرم مضاعف و شروع دوباره چرخه وسوسه</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>بدون در نظر گرفتن نقش پورن به عنوان ورودی محرک</span>
                </li>
              </ul>
            </div>

            <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-800/60">
              نتیجه: ۸۰٪ کاربران پس از اولین لغزش برنامه را پاک می‌کنند یا چند بار پشت‌سر‌هم تکرار می‌کنند.
            </div>
          </div>

          {/* Hakem Zehn Method Card */}
          <div className="bg-slate-900/80 rounded-2xl border border-emerald-500/30 p-6 sm:p-7 flex flex-col justify-between space-y-5 text-right relative overflow-hidden shadow-xl shadow-emerald-950/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400">
                  متد علمی و اختصاصی
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>متد ثبت مستقل حاکم ذهن</span>
                <span className="text-[11px] text-emerald-400/80 font-normal">نسخه ۱.۸</span>
              </h3>

              <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-500/20 space-y-2">
                <p className="text-sm font-bold text-emerald-300">
                  {comparisons[activeDimension].hakemZehn.headline}
                </p>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {comparisons[activeDimension].hakemZehn.detail}
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 pt-1">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>تفکیک دو شمارشگر مستقل (پورن جداگانه، خودارضایی جداگانه)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>آموزش‌های ۳۰ گام روش آسان و مسیر ۲۰ هفته‌ای</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>ابزار ترمز اضطراری لحظه‌ای SOS و ذخیره ۱۰۰٪ محلی</span>
                </li>
              </ul>
            </div>

            <div className="text-[11px] text-emerald-300/80 pt-3 border-t border-emerald-900/30 flex items-center justify-between">
              <span>نتیجه: کاهش تدریجی میل ناخودآگاه و بازگشت آرامش طبیعی مغز</span>
              <a
                href="https://myket.ir/app/ir.hakemzehn.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-400 hover:text-emerald-300 underline"
              >
                نصب از مایکت
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
