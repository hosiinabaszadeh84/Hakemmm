import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Volume2, VolumeX, RefreshCw, Heart, Footprints, Droplets, Wind } from 'lucide-react';
import { getBoxBreathingState, BreathingState } from '../utils/recoveryLogic';
import { ambientSound } from '../utils/audioSynth';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRelapseGuide: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose, onOpenRelapseGuide }) => {
  const [seconds, setSeconds] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [breathingState, setBreathingState] = useState<BreathingState>(getBoxBreathingState(0));
  const [resistedCount, setResistedCount] = useState<number>(0);

  // Timer loop for box breathing
  useEffect(() => {
    if (!isOpen) {
      if (isPlayingAudio) {
        ambientSound.stop();
        setIsPlayingAudio(false);
      }
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => {
        const next = prev + 1;
        setBreathingState(getBoxBreathingState(next));
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isPlayingAudio]);

  const toggleSound = () => {
    const active = ambientSound.toggle();
    setIsPlayingAudio(active);
  };

  const handleResistedUrge = () => {
    setResistedCount(prev => prev + 1);
  };

  if (!isOpen) return null;

  // Determine breathing visual scale based on phase
  let circleScale = 'scale-100';
  let ringColor = 'border-emerald-400';
  let phaseBg = 'bg-emerald-500/10';

  if (breathingState.phase === 'inhale') {
    circleScale = 'scale-125';
    ringColor = 'border-teal-400';
    phaseBg = 'bg-teal-500/20';
  } else if (breathingState.phase === 'hold-in') {
    circleScale = 'scale-125 ring-4 ring-teal-400/30';
    ringColor = 'border-teal-300';
    phaseBg = 'bg-teal-500/30';
  } else if (breathingState.phase === 'exhale') {
    circleScale = 'scale-90';
    ringColor = 'border-indigo-400';
    phaseBg = 'bg-indigo-500/20';
  } else {
    circleScale = 'scale-90 ring-2 ring-slate-600';
    ringColor = 'border-slate-500';
    phaseBg = 'bg-slate-800/30';
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="ترمز اضطراری ذهن"
    >
      <div className="relative w-full max-w-2xl bg-[#0d1424] border border-rose-500/30 rounded-3xl p-6 sm:p-8 text-right shadow-2xl shadow-rose-950/50 space-y-7 my-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                پناهگاه و ترمز اضطراری SOS
              </h2>
              <p className="text-xs text-rose-300">
                موج تحریک ۳ تا ۷ دقیقه است؛ با هم از آن عبور می‌کنیم.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-teal-950 border-teal-500 text-teal-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title={isPlayingAudio ? 'قطع صوت آرامش' : 'پخش صوت باران/اقیانوس'}
            >
              {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{isPlayingAudio ? 'صوت آرامش فعال' : 'صوت آرامش'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="بستن پنجره اضطراری"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Compassionate Reminder */}
        <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p className="font-semibold text-white mb-1">
            یک نفس عمیق بکش و به یاد داشته باش:
          </p>
          <p>
            «تو آدم ضعیفی نیستی؛ فقط ناقل‌های شیمیایی مغزت در حال فریب دادن تو هستند. اگر الان ۵ دقیقه دست نگه داری، کنترل عقل دوباره برقرار می‌شود.»
          </p>
        </div>

        {/* Interactive Guided Box Breathing Circle */}
        <div className="flex flex-col items-center justify-center py-4 space-y-4">
          <div className="relative flex items-center justify-center w-52 h-52">
            
            {/* Outer animated ring */}
            <div
              className={`absolute inset-0 rounded-full border-4 ${ringColor} ${phaseBg} transition-all duration-1000 ease-in-out ${circleScale}`}
            />

            {/* Inner Content */}
            <div className="relative text-center space-y-1 z-10">
              <span className="text-4xl font-extrabold text-white tabular-nums">
                {breathingState.phaseSecondsRemaining}
              </span>
              <p className="text-xs font-bold text-emerald-300 px-3 py-1">
                {breathingState.phaseLabel}
              </p>
              <span className="text-[10px] text-slate-400 block">
                چرخه ۱۶ ثانیه‌ای تنفس جعبه‌ای
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Wind className="w-4 h-4 text-teal-400" />
            <span>زمان سپری شده در پناهگاه: {Math.floor(seconds / 60)} دقیقه و {seconds % 60} ثانیه</span>
          </div>
        </div>

        {/* 3 Physical Grounding Shocks */}
        <div className="space-y-2.5">
          <p className="text-xs font-bold text-slate-300">
            ۳ اقدام شوک‌دهنده فوری برای تغییر شیمی مغز:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-start gap-2.5">
              <Footprints className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">۱. تغییر محیط</strong>
                <span className="text-slate-400">همین ثانیه از تخت یا اتاقت بیرون برو.</span>
              </div>
            </div>

            <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-start gap-2.5">
              <Droplets className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">۲. شوک آب سرد</strong>
                <span className="text-slate-400">به صورت و مچ دست‌هایت آب خنک بزن.</span>
              </div>
            </div>

            <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-start gap-2.5">
              <Heart className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">۳. یک لیوان آب</strong>
                <span className="text-slate-400">یک لیوان آب خنک با جرعه‌های آرام بنوش.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs">
          <button
            onClick={() => {
              handleResistedUrge();
              onClose();
            }}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all cursor-pointer shadow-md"
          >
            ✓ احساس آرامش پیدا کردم، متشکرم
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenRelapseGuide();
            }}
            className="text-slate-400 hover:text-white transition-colors underline cursor-pointer"
          >
            متاسفانه لغزیدم؛ پروتکل ساعت اول بعد از لغزش چیست؟
          </button>
        </div>

      </div>
    </div>
  );
};
