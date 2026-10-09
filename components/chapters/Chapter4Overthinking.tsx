'use client';

import React, { useState } from 'react';
import { Cpu, Heart, ArrowRight, RotateCcw, Award, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { BIRTHDAY_CONTENT } from '@/content/birthday';
import { soundEngine } from '@/lib/soundEngine';

interface Chapter4Props {
  onContinue: () => void;
  onUnlockAchievement: (id: string) => void;
}

export const Chapter4Overthinking: React.FC<Chapter4Props> = ({
  onContinue,
  onUnlockAchievement,
}) => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [hasUnlockedAchievement, setHasUnlockedAchievement] = useState(false);

  const overthinking = BIRTHDAY_CONTENT.overthinking;
  const activeChoice = overthinking.choices.find((c) => c.id === selectedChoiceId);

  const handleSelect = (choiceId: string) => {
    soundEngine.playSfx('click');
    setSelectedChoiceId(choiceId);

    if (!hasUnlockedAchievement) {
      setHasUnlockedAchievement(true);
      onUnlockAchievement(overthinking.unlockedAchievementId);
      soundEngine.playSfx('achievement');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Chapter Title */}
      <div className="space-y-2 text-center sm:text-left border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950/60 text-purple-400 text-xs font-mono border border-purple-500/30">
          <Cpu className="w-3.5 h-3.5" />
          <span>NEURAL ARCHITECTURE DIAGNOSTICS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
          {overthinking.title}
        </h2>
        <p className="text-sm text-slate-400 font-sans">
          {overthinking.subtitle}
        </p>
      </div>

      {/* Interactive Scenario Card */}
      <div className="glass-panel-accent rounded-2xl p-6 border border-purple-500/30 space-y-6">
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span>INTERACTIVE HYPOTHESIS TEST</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-white font-sans">
            {overthinking.scenarioPrompt}
          </p>
        </div>

        {/* Choices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {overthinking.choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id;
            return (
              <button
                key={choice.id}
                onClick={() => handleSelect(choice.id)}
                className={`p-3.5 rounded-xl border text-left font-mono text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-purple-950/70 border-purple-400 text-purple-200 shadow-md shadow-purple-500/20 scale-[1.01]'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-800/90 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="font-semibold text-slate-200">{choice.label}</div>
                  <div className="text-[10px] text-purple-400/80 mt-0.5">
                    CPU Load: {choice.cpuUsage}
                  </div>
                </div>
                <span className="text-purple-400 text-xs shrink-0">›</span>
              </button>
            );
          })}
        </div>

        {/* Active Choice Response */}
        {activeChoice && (
          <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/40 text-slate-200 space-y-2 animate-fadeIn glow-purple font-mono text-xs">
            <div className="flex items-center justify-between text-purple-300 font-bold border-b border-purple-500/30 pb-2">
              <span className="flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-purple-400" />
                {activeChoice.responseTitle}
              </span>
              <span className="text-[10px] text-purple-400 px-2 py-0.5 rounded bg-black/60 border border-purple-500/40">
                CPU: {activeChoice.cpuUsage}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed pt-1">
              {activeChoice.responseBody}
            </p>
          </div>
        )}

        {/* Affectionate Counterbalance Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-purple-950/30 border border-emerald-500/40 space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-400 font-mono text-xs font-bold tracking-wide">
            <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
            <span>INVESTIGATOR DEDUCTION</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white font-mono">
            {overthinking.heartfeltCounterbalance.quote}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            {overthinking.heartfeltCounterbalance.reflection}
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="text-xs text-slate-400 font-sans">
          Neural tabs archived. Proceeding to vocal mimicry evaluation...
        </div>

        <button
          id="btn-continue-to-mimicry"
          onClick={() => {
            soundEngine.playSfx('click');
            onContinue();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>PROCEED TO CHAPTER 6: MIMICRY HALL OF FAME</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
