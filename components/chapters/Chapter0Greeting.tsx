'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, AlertTriangle, ArrowRight, ShieldCheck, Cake, PartyPopper } from 'lucide-react';
import { BIRTHDAY_CONTENT } from '@/content/birthday';
import { soundEngine } from '@/lib/soundEngine';

interface Chapter0Props {
  onContinue: () => void;
}

export const Chapter0Greeting: React.FC<Chapter0Props> = ({ onContinue }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    soundEngine.playBgm();
    // Show system complaint notice automatically after 3 seconds if user hasn't clicked yet
    const timer = setTimeout(() => {
      setShowNotification(true);
      soundEngine.playSfx('glitch');
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  const handleStartInvestigation = () => {
    setInteracted(true);
    soundEngine.playSfx('click');
    soundEngine.playBgm(); // User interaction unlocks audio on browser
    if (!showNotification) {
      setShowNotification(true);
      soundEngine.playSfx('glitch');
      // Smoothly advance after dramatic flash
      setTimeout(() => {
        onContinue();
      }, 1600);
    } else {
      onContinue();
    }
  };

  const handlePopNotice = () => {
    soundEngine.playSfx('glitch');
    setShowNotification(true);
  };

  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-4 py-12 overflow-hidden cyber-grid">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Birthday Accents */}
      <div className="relative z-10 max-w-2xl w-full mx-auto text-center space-y-6">
        {/* Top Protocol Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <Cake className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
          <span>OFFICIAL BIRTHDAY DISPATCH // PROTOCOL: ANIRBAN.EXE</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-mono leading-none">
            HAPPY BIRTHDAY, <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent text-glow-green">
              {BIRTHDAY_CONTENT.subject.name}.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-sans max-w-xl mx-auto leading-relaxed pt-2">
            {BIRTHDAY_CONTENT.greeting.subheadline}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="btn-begin-investigation"
            onClick={handleStartInvestigation}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-mono font-bold text-base shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <span>{BIRTHDAY_CONTENT.greeting.ctaButton}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {!showNotification && (
            <button
              onClick={handlePopNotice}
              className="text-xs font-mono text-slate-400 hover:text-slate-200 underline underline-offset-4 transition-colors"
            >
              (Check Incoming Dispatch)
            </button>
          )}
        </div>

        {/* Absurd System Notification Reveal */}
        {showNotification && (
          <div className="mt-8 animate-fadeIn p-4 sm:p-5 rounded-xl bg-rose-950/40 border-2 border-rose-500/50 text-rose-200 text-left font-mono glow-red transition-all">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-900/60 text-rose-300 shrink-0">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between text-[11px] text-rose-400 font-bold">
                  <span>{BIRTHDAY_CONTENT.greeting.initialNotice.tag}</span>
                  <span>{BIRTHDAY_CONTENT.greeting.initialNotice.timestamp}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
                  {BIRTHDAY_CONTENT.greeting.initialNotice.message}
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      soundEngine.playSfx('click');
                      onContinue();
                    }}
                    className="text-xs font-mono text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 underline underline-offset-4"
                  >
                    Open Case Dossier <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subtle Bottom Metadata */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Friendship Clearance: Verified
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1">
            <PartyPopper className="w-3.5 h-3.5 text-purple-400" />
            Celebration Protocol Active
          </span>
        </div>
      </div>
    </section>
  );
};
