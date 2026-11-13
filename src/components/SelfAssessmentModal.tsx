import React, { useState } from 'react';
import { X, HelpCircle, CheckCircle2, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { evaluateAssessmentAnswers, AssessmentResult } from '../utils/recoveryLogic';

interface SelfAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReadArticle: (id: string) => void;
  onOpenSos: () => void;
}

interface Question {
  text: string;
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    text: 'معمولاً چه زمان‌هایی کشش بیشتری به سمت پورن یا خودارضایی حس می‌کنید؟',
    options: [
      { label: 'فقط در مواقع بیکاری یا کسالت تصادفی', score: 0 },
      { label: 'انتهای شب در رختخواب همراه با گوشی هوشمند', score: 2 },
      { label: 'وقتی دچار استرس کاری، احساس تنهایی، خستگی یا اضطراب هستم', score: 3 }
    ]
  },
  {
    text: 'پس از لغزش، احساس غالب و واکنش ذهنی شما چیست؟',
    options: [
      { label: 'عادی، سعی می‌کنم روز بعد به زندگی عادی ادامه دهم', score: 0 },
      { label: 'کمی ناراحتی و ناامیدی، اما بعد از چند ساعت بهتر می‌شوم', score: 1 },
      { label: 'احساس عذاب وجدان شدید، تنفر از خود، و تمایل به تکرار چندباره در همان روز', score: 3 }
    ]
  },
  {
    text: 'تاکنون تجربه استفاده از روزشمارها یا قول‌های ترک چگونه بوده است؟',
    options: [
      { label: 'به‌ندرت پیگیر روزشماری بوده‌ام', score: 0 },
      { label: 'چند بار تا چند هفته پیش رفتم ولی با یک لغزش انگیزه را از دست دادم', score: 2 },
      { label: 'مدام درگیر شمارش وسواس‌گونه روزها و ترس از خراب شدن عدد بوده‌ام', score: 3 }
    ]
  },
  {
    text: 'هنگام مواجهه با وسوسه، چه مدت طول می‌کشد تا کنترل خود را به دست بیاورید؟',
    options: [
      { label: 'می‌توانم به سرعت محیط را ترک کنم و به کار دیگری مشغول شوم', score: 0 },
      { label: 'چند دقیقه مقاومت می‌کنم اما اگر به گوشی دسترسی داشته باشم تسلیم می‌شوم', score: 2 },
      { label: 'مثل حالت خلسه ناخودآگاه است و قبل از اینکه متوجه شوم اتفاق افتاده است', score: 3 }
    ]
  }
];

export const SelfAssessmentModal: React.FC<SelfAssessmentModalProps> = ({
  isOpen,
  onClose,
  onReadArticle,
  onOpenSos
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  if (!isOpen) return null;

  const handleSelectOption = (score: number) => {
    const updated = [...selectedAnswers, score];
    setSelectedAnswers(updated);

    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finished
      const evalResult = evaluateAssessmentAnswers(updated);
      setResult(evalResult);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setResult(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="آزمون خودشناسی وضعیت وابستگی"
    >
      <div className="relative w-full max-w-xl bg-[#0d1424] border border-slate-800 rounded-3xl p-6 sm:p-8 text-right shadow-2xl space-y-6 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                سنجش سریع الگوی ذهنی و وسوسه (۳ دقیقه)
              </h2>
              <p className="text-[11px] text-slate-400">
                بدون قضاوت و کاملاً محرمانه در مرورگر شما
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Flow */}
        {!result ? (
          <div className="space-y-6">
            
            {/* Progress indicator */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>پرسش {currentStep + 1} از {questions.length}</span>
                <span className="tabular-nums">{Math.round(((currentStep) / questions.length) * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              {questions[currentStep].text}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {questions[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.score)}
                  className="w-full p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 text-right text-xs sm:text-sm text-slate-200 hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span className="leading-relaxed">{opt.label}</span>
                  <div className="w-5 h-5 rounded-full border border-slate-700 group-hover:border-emerald-400 flex items-center justify-center shrink-0 mr-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>

          </div>
        ) : (
          /* Result View */
          <div className="space-y-6 text-right">
            
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>نتیجه تحلیل الگوی ذهنی شما</span>
            </div>

            <div className={`p-5 rounded-2xl border ${
              result.level === 'mild'
                ? 'bg-emerald-950/20 border-emerald-500/30'
                : result.level === 'moderate'
                ? 'bg-teal-950/20 border-teal-500/30'
                : 'bg-amber-950/20 border-amber-500/30'
            } space-y-2`}>
              <h3 className="text-lg font-bold text-white">
                {result.headline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800 space-y-1.5 text-xs sm:text-sm">
              <strong className="text-emerald-400 block font-semibold">
                نقشه راه پیشنهادی برای شما:
              </strong>
              <p className="text-slate-300 leading-relaxed">
                {result.recommendedAction}
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onClose();
                    if (result.level === 'high') {
                      onReadArticle('relapse');
                    } else if (result.level === 'moderate') {
                      onReadArticle('triggers');
                    } else {
                      onReadArticle('start');
                    }
                  }}
                  className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer text-center"
                >
                  مطالعه راهنمای متناسب با شرایط من
                </button>

                <a
                  href="https://myket.ir/app/ir.hakemzehn.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all text-center"
                >
                  نصب رایگان اپلیکیشن از مایکت
                </a>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>پاسخ مجدد به سوالات</span>
                </button>

                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  بستن پنجره
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
