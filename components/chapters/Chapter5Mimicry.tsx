'use client';

import React, { useState } from 'react';
import { Mic, Award, Sparkles, ArrowRight, Star, Volume2, Trophy, CheckCircle2 } from 'lucide-react';
import { BIRTHDAY_CONTENT } from '@/content/birthday';
import { soundEngine } from '@/lib/soundEngine';

interface Chapter5Props {
  onContinue: () => void;
  onUnlockAchievement: (id: string) => void;
}

export const Chapter5Mimicry: React.FC<Chapter5Props> = ({
  onContinue,
  onUnlockAchievement,
}) => {
  const [mimicryActivated, setMimicryActivated] = useState(false);
  const [micClicks, setMicClicks] = useState(0);
  const [showSecretVerdict, setShowSecretVerdict] = useState(false);
  const [hasUnlockedAchievement, setHasUnlockedAchievement] = useState(false);

  const mimicryData = BIRTHDAY_CONTENT.mimicry;

  const handleActivateMimicry = () => {
    soundEngine.playSfx('achievement');
    setMimicryActivated(true);

    if (!hasUnlockedAchievement) {
      setHasUnlockedAchievement(true);
      onUnlockAchievement(mimicryData.unlockedAchievementId);
    }
  };

  const handleMicClick = () => {
    soundEngine.playSfx('click');
    const clicks = micClicks + 1;
    setMicClicks(clicks);
    if (clicks >= 3) {
      setShowSecretVerdict(true);
      soundEngine.playSfx('achievement');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Chapter Title */}
      <div className="space-y-2 text-center sm:text-left border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950/60 text-amber-400 text-xs font-mono border border-amber-500/30">
          <Trophy className="w-3.5 h-3.5" />
          <span>VOCAL IMPRESSION HALL OF FAME</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
          {mimicryData.title}
        </h2>
        <p className="text-sm text-slate-400 font-sans">
          {mimicryData.subtitle}
        </p>
      </div>

      {/* Main Award Showcase Banner */}
      <div className="glass-panel-accent rounded-3xl p-6 sm:p-8 border border-amber-500/40 relative overflow-hidden text-center space-y-6">
        {/* Spotlight Effect Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-amber-500/15 blur-3xl pointer-events-none" />

        {/* Golden Trophy & Mic Badge */}
        <div className="relative z-10 flex flex-col items-center">
          <button
            onClick={handleMicClick}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400/20 via-yellow-500/20 to-amber-600/30 border-2 border-amber-400/60 flex items-center justify-center text-amber-300 hover:scale-110 active:scale-95 transition-all shadow-xl shadow-amber-500/20 cursor-pointer group"
            title="Click the Golden Mic for judge secret verdict!"
          >
            <Mic className="w-10 h-10 text-amber-300 group-hover:animate-pulse" />
          </button>
          <span className="text-[10px] font-mono text-slate-400 mt-2">
            (Tap mic for judging panel verdict)
          </span>
        </div>

        <div className="relative z-10 space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 text-xs font-mono font-bold border border-amber-500/40">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            OFFICIAL CITATION OF EXCELLENCE
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight text-glow-gold">
            {mimicryData.awardTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            {mimicryData.awardCitation}
          </p>
        </div>

        {/* Interactive Activate Button */}
        <div className="relative z-10">
          <button
            id="btn-activate-mimicry"
            onClick={handleActivateMimicry}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-mono font-bold text-xs sm:text-sm shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>{mimicryActivated ? 'RE-AUDIT MIMICRY SCORES' : mimicryData.interactiveButtonLabel}</span>
          </button>
        </div>

        {/* Secret Judge Verdict Easter Egg */}
        {showSecretVerdict && (
          <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-500/60 text-amber-200 font-mono text-xs text-left space-y-1.5 animate-fadeIn glow-purple">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <Sparkles className="w-4 h-4" />
              CONFIDENTIAL JUDGING PANEL VERDICT:
            </div>
            <p className="text-slate-300 font-sans text-xs">
              "We tried to find an impression he couldn't execute with pinpoint comic precision. Our committee failed miserably. Rating: SSS+ Legend."
            </p>
          </div>
        )}
      </div>

      {/* Mimicry Evaluation Cards */}
      {mimicryActivated && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 animate-fadeIn">
          {mimicryData.roster.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">{item.category}</span>
                <span className="text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30">
                  {item.rating}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {item.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Navigation Footer */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="text-xs text-slate-400 font-sans">
          Vocal chameleon credentials verified. Compiling full achievement profile...
        </div>

        <button
          id="btn-continue-to-mbbs-survival"
          onClick={() => {
            soundEngine.playSfx('click');
            onContinue();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>PROCEED TO CHAPTER 7: MBBS SURVIVAL KIT & RX</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
