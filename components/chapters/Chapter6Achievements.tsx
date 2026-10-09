'use client';

import React, { useState } from 'react';
import { Crown, BookOpen, Ruler, Cpu, Mic, ShieldCheck, Award, ArrowRight, HeartPulse, Dna, Bone, Stethoscope, HeartHandshake, ShieldAlert, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONTENT, Achievement } from '@/content/birthday';
import { soundEngine } from '@/lib/soundEngine';

interface Chapter8Props {
  unlockedAchievements: Set<string>;
  onContinue: () => void;
}

export const Chapter6Achievements: React.FC<Chapter8Props> = ({
  unlockedAchievements,
  onContinue,
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'medical' | 'friendship' | 'personality' | 'academic'>('all');
  const achData = BIRTHDAY_CONTENT.achievementsChapter;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-amber-400" />;
      case 'Ruler':
        return <Ruler className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Mic':
        return <Mic className="w-5 h-5 text-pink-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Bone':
        return <Bone className="w-5 h-5 text-amber-300" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case 'Dna':
        return <Dna className="w-5 h-5 text-purple-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-cyan-400" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-teal-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-pink-400" />;
      case 'Award':
        return <Award className="w-5 h-5 text-yellow-400" />;
      case 'Crown':
      default:
        return <Crown className="w-5 h-5 text-yellow-400" />;
    }
  };

  const filteredAchievements = filterCategory === 'all'
    ? achData.allAchievements
    : achData.allAchievements.filter((a) => a.category === filterCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Chapter Title */}
      <div className="space-y-2 text-center sm:text-left border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 text-xs font-mono border border-emerald-500/30">
          <Award className="w-3.5 h-3.5" />
          <span>OFFICIAL GAMING PROFILE & MEDICAL HONORS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
          {achData.title}
        </h2>
        <p className="text-sm text-slate-400 font-sans">
          {achData.subtitle}
        </p>
      </div>

      {/* Character Profile Card (RPG + MBBS Style) */}
      <div className="glass-panel-accent rounded-2xl p-6 border border-emerald-500/30 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
              PLAYER CHARACTER SHEET
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white font-mono">
              ANIRBAN // {achData.characterProfile.level}
            </h3>
            <div className="text-xs font-mono text-purple-300">
              Class: {achData.characterProfile.charClass} • HP: {achData.characterProfile.hp}
            </div>
          </div>

          <div className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold self-start sm:self-center">
            ACTIVE RANK: FUTURE DOCTOR // S-TIER LEGEND
          </div>
        </div>

        {/* Humorous RPG Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
          {achData.characterProfile.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1 text-center"
            >
              <div className="text-[10px] text-slate-400">{stat.name}</div>
              <div className="text-sm font-bold text-emerald-400">{stat.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            UNLOCKED BADGES ({unlockedAchievements.size} / {achData.allAchievements.length})
          </h3>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
            {(['all', 'medical', 'friendship', 'personality', 'academic'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playSfx('click');
                  setFilterCategory(cat);
                }}
                className={`px-2.5 py-1 rounded-full border transition-colors capitalize ${
                  filterCategory === cat
                    ? 'bg-emerald-500 text-black font-bold border-emerald-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {filteredAchievements.map((ach) => {
            const isUnlocked = ach.unlockedByDefault || unlockedAchievements.has(ach.id);

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  isUnlocked
                    ? 'bg-slate-900/90 border-slate-700/80 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10'
                    : 'bg-slate-950/60 border-slate-900 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0">
                    {getIcon(ach.icon)}
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      isUnlocked
                        ? 'bg-emerald-950/70 text-emerald-400 border-emerald-500/30'
                        : 'bg-slate-900 text-slate-500 border-slate-800'
                    }`}
                  >
                    {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-emerald-400/80 font-bold">
                    {ach.subtitle}
                  </div>
                  <h4 className="text-sm font-bold text-white font-sans">
                    {ach.title}
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* The Legend Award Transition Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-emerald-950/40 border border-purple-500/40 space-y-3 text-center sm:text-left glow-purple">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-900/60 text-purple-300 text-xs font-mono font-bold border border-purple-500/40">
          <Crown className="w-3.5 h-3.5 text-yellow-400" />
          {achData.legendAward.title}
        </div>
        <p className="text-sm sm:text-base text-slate-200 font-sans italic leading-relaxed">
          "{achData.legendAward.quote}"
        </p>
        <div className="text-xs font-mono text-purple-300/80 pt-1">
          Transitioning from clinical diagnostics to our photographic friendship archives...
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="text-xs text-slate-400 font-sans">
          All badges accounted for. Opening the friendship photo scrapbook...
        </div>

        <button
          id="btn-continue-to-gallery"
          onClick={() => {
            soundEngine.playSfx('click');
            onContinue();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>PROCEED TO CHAPTER 9: FRIENDSHIP GALLERY</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
