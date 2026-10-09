'use client';

import React from 'react';
import { Award, ShieldCheck, X, CheckCircle2, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONTENT } from '@/content/birthday';
import { soundEngine } from '@/lib/soundEngine';

interface SecretClearanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretClearanceModal: React.FC<SecretClearanceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-[#0f1422] to-[#0a0d16] border-2 border-purple-500/60 rounded-2xl shadow-2xl p-6 glow-purple text-center">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playSfx('click');
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Badge */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
          <Award className="w-9 h-9 text-purple-400 animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 text-purple-300 text-xs font-mono font-bold border border-purple-500/40 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          {BIRTHDAY_CONTENT.easterEggs.secretClearanceCode}
        </div>

        <h3 className="text-lg font-bold text-slate-100 font-mono tracking-tight mb-2">
          {BIRTHDAY_CONTENT.easterEggs.secretClearanceTitle}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-5">
          {BIRTHDAY_CONTENT.easterEggs.secretClearanceBody}
        </p>

        {/* Verified Parameters */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-left space-y-2 mb-6 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span>Special Status:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> IMMUNE TO AUDITS
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Friendship Level:</span>
            <span className="text-purple-400 font-bold">UNCONDITIONAL S-TIER</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Syllabus Obligation:</span>
            <span className="text-amber-400">POSTPONED UNTIL TOMORROW</span>
          </div>
        </div>

        <button
          onClick={() => {
            soundEngine.playSfx('achievement');
            onClose();
          }}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> CLAIM CLEARANCE PRIVILEGES
        </button>
      </div>
    </div>
  );
};
