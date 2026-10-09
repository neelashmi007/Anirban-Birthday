'use client';

import React, { useState } from 'react';
import { Heart, Sparkles, RotateCcw, Image as ImageIcon, ShieldCheck, CheckCircle2, PartyPopper } from 'lucide-react';
import { BIRTHDAY_CONTENT } from '@/content/birthday';
import { soundEngine } from '@/lib/soundEngine';
import { triggerLegendCelebration } from '@/components/ConfettiCelebration';

interface Chapter8Props {
  onRevisitGallery: () => void;
  onReplayAll: () => void;
}

export const Chapter8Letter: React.FC<Chapter8Props> = ({
  onRevisitGallery,
  onReplayAll,
}) => {
  const [accepted, setAccepted] = useState(false);
  const letter = BIRTHDAY_CONTENT.finalLetter;

  const handleAcceptStatus = () => {
    setAccepted(true);
    triggerLegendCelebration();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10 animate-fadeIn">
      {/* Quiet, Cinematic Transition Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-400 font-mono text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{letter.transitionSubtitle}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif tracking-normal text-white font-medium">
          {letter.prelude}
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto opacity-70" />
      </div>

      {/* The Heartfelt Birthday Letter Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#111420] via-[#0e101a] to-[#090b12] border border-amber-500/20 p-6 sm:p-10 shadow-2xl space-y-6">
        {/* Soft Ambient Warm Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Letter Paragraphs */}
        <div className="relative z-10 space-y-5 font-serif text-slate-200 text-sm sm:text-base leading-relaxed tracking-wide sm:tracking-normal">
          {letter.mbbsCallback && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              {letter.mbbsCallback}
            </div>
          )}

          {letter.paragraphs.map((p, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === letter.paragraphs.length - 1;
            const isHighlight = p.includes('December 2025 and January 2026');

            if (isFirst) {
              return (
                <p key={idx} className="text-lg sm:text-xl font-medium text-amber-200/95 font-serif">
                  {p}
                </p>
              );
            }

            if (isHighlight) {
              return (
                <div
                  key={idx}
                  className="my-4 p-4 rounded-2xl bg-amber-950/20 border-l-4 border-amber-400/80 text-amber-100/90 font-serif text-sm sm:text-base leading-relaxed"
                >
                  {p}
                </div>
              );
            }

            if (isLast) {
              return (
                <p
                  key={idx}
                  className="text-sm sm:text-base font-mono font-bold text-emerald-400 pt-2 tracking-normal"
                >
                  {p}
                </p>
              );
            }

            return (
              <p key={idx} className="text-slate-300">
                {p}
              </p>
            );
          })}
        </div>

        {/* Signature Box */}
        <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-amber-300/80">
            <Heart className="w-3.5 h-3.5 fill-amber-400/30 text-amber-400" /> From someone who is grateful to know you
          </span>
          <span>Verified Friendship Record</span>
        </div>
      </div>

      {/* Acceptance & Final Celebration Section */}
      <div className="text-center space-y-6">
        {!accepted ? (
          <button
            id="btn-accept-legend-status"
            onClick={handleAcceptStatus}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-mono font-bold text-sm sm:text-base shadow-2xl shadow-amber-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>{letter.acceptButtonLabel}</span>
          </button>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            {/* Celebration Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-purple-950/30 to-amber-950/30 border-2 border-emerald-500/60 shadow-2xl text-center space-y-2 glow-green">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                VERDICT FINALIZED
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white font-mono tracking-tight text-glow-green">
                {letter.congratulationTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-md mx-auto">
                {letter.congratulationNote}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  soundEngine.playSfx('confetti');
                  triggerLegendCelebration();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 font-mono text-xs border border-emerald-500/40 flex items-center justify-center gap-2 transition-all"
              >
                <PartyPopper className="w-4 h-4 text-emerald-400" /> Launch More Confetti
              </button>

              <button
                onClick={() => {
                  soundEngine.playSfx('click');
                  onRevisitGallery();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <ImageIcon className="w-4 h-4 text-cyan-400" /> Revisit Photo Gallery
              </button>

              <button
                onClick={() => {
                  soundEngine.playSfx('click');
                  onReplayAll();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <RotateCcw className="w-4 h-4 text-purple-400" /> Replay From Start
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
