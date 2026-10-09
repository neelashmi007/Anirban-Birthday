'use client';

import React, { useState } from 'react';
import { Coffee, FileText, Zap, BookMarked, Scroll, Stethoscope, Award, ArrowRight, CheckCircle2, Sparkles, Heart, Pill, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { BIRTHDAY_CONTENT, InventoryItem } from '@/content/birthday';
import { soundEngine } from '@/lib/soundEngine';

interface Chapter7Props {
  onContinue: () => void;
  onUnlockAchievement: (id: string) => void;
}

export const Chapter7MbbsSurvival: React.FC<Chapter7Props> = ({
  onContinue,
  onUnlockAchievement,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [collectedItems, setCollectedItems] = useState<Set<string>>(new Set());
  const [hasUnlockedSurvivalBadge, setHasUnlockedSurvivalBadge] = useState(false);

  const survivalData = BIRTHDAY_CONTENT.mbbsSurvival;
  const items = survivalData.items;
  const rx = survivalData.prescription;

  const getItemIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-amber-400" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-cyan-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'BookMarked':
        return <BookMarked className="w-5 h-5 text-purple-400" />;
      case 'Scroll':
        return <Scroll className="w-5 h-5 text-rose-400" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-emerald-400" />;
      case 'Award':
      default:
        return <Award className="w-5 h-5 text-pink-400" />;
    }
  };

  const handleInspectItem = (item: InventoryItem) => {
    soundEngine.playSfx('click');
    setSelectedItemId(item.id);

    const updated = new Set([...collectedItems, item.id]);
    setCollectedItems(updated);

    if (updated.size === items.length && !hasUnlockedSurvivalBadge) {
      setHasUnlockedSurvivalBadge(true);
      soundEngine.playSfx('achievement');
      onUnlockAchievement('survived_another_day_of_mbbs');
    }
  };

  const activeItem = items.find((i) => i.id === selectedItemId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10 animate-fadeIn">
      {/* Chapter Title */}
      <div className="space-y-2 text-center sm:text-left border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 text-emerald-400 text-xs font-mono border border-emerald-500/30">
          <Pill className="w-3.5 h-3.5 text-emerald-400" />
          <span>MBBS SURVIVAL LOGISTICS & OFFICIAL PRESCRIPTION</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
          {survivalData.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-sans">
          {survivalData.subtitle}
        </p>
      </div>

      {/* Interactive Collectible Inventory Bag */}
      <div className="glass-panel-accent rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
              <Scroll className="w-4 h-4 text-emerald-400" />
              THE MBBS SURVIVAL INVENTORY
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              {survivalData.inventoryIntro}
            </p>
          </div>

          <div className="px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold self-start sm:self-center">
            COLLECTED: {collectedItems.size} / {items.length}
          </div>
        </div>

        {/* 7 Item Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {items.map((item) => {
            const isCollected = collectedItems.has(item.id);
            const isSelected = selectedItemId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleInspectItem(item)}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-between text-center transition-all min-h-[110px] cursor-pointer group ${
                  isSelected
                    ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-500/20 scale-105'
                    : isCollected
                    ? 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-emerald-500/40'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-black/50 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getItemIcon(item.icon)}
                </div>

                <span className="text-[11px] font-sans font-semibold line-clamp-2 mt-1 leading-tight">
                  {item.name}
                </span>

                <span className={`text-[9px] font-mono mt-1 ${isCollected ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
                  {isCollected ? 'INSPECTED' : 'TAP TO EXAMINE'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Item Detail Card */}
        {activeItem && (
          <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/40 space-y-2 animate-fadeIn glow-green font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-2">
                {getItemIcon(activeItem.icon)}
                {activeItem.name}
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                RARITY: {activeItem.rarity}
              </span>
            </div>
            <p className="text-slate-200 text-sm">{activeItem.description}</p>
            <p className="text-slate-400 italic text-xs pt-1 border-t border-slate-900">
              "{activeItem.flavorText}"
            </p>
          </div>
        )}

        {/* Final Survival Badge Unlock Banner */}
        {hasUnlockedSurvivalBadge && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/50 via-teal-950/40 to-slate-900 border border-emerald-500/60 flex items-center justify-between gap-3 animate-fadeIn glow-green">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> ACHIEVEMENT UNLOCKED!
                </div>
                <div className="text-sm font-bold text-white">Survived Another Day of MBBS</div>
                <div className="text-[11px] text-slate-300 font-sans">
                  All 7 relics acquired. Academic survival guaranteed until next session.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* The Fake Prescription Pad Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#0f1320] to-[#0a0d16] border-2 border-emerald-500/40 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Prescription Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-700/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-mono text-xl font-black">
              Rx
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white font-mono tracking-tight">
                {rx.padHeader}
              </h4>
              <p className="text-xs text-slate-400 font-sans">
                {rx.hospital}
              </p>
            </div>
          </div>

          <div className="font-mono text-xs text-slate-300 sm:text-right space-y-0.5">
            <div>Patient: <span className="text-emerald-400 font-bold">{rx.patient}</span></div>
            <div>Age/Sex: <span className="text-slate-400">{rx.ageGender}</span></div>
            <div>Date: <span className="text-slate-400">{rx.date}</span></div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs space-y-1">
          <span className="text-rose-400 font-bold uppercase">Clinical Diagnosis:</span>
          <p className="text-slate-200 font-sans text-xs sm:text-sm">{rx.diagnosis}</p>
        </div>

        {/* Rx Directives List */}
        <div className="space-y-3 font-sans text-xs sm:text-sm">
          <div className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Pill className="w-4 h-4 text-emerald-400" /> AUTHORIZED CLINICAL PRESCRIPTION (SIG):
          </div>

          <div className="space-y-2">
            {rx.rxList.map((item, idx) => {
              const isSOS = item.startsWith('SOS:');
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                    isSOS
                      ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-200'
                  }`}
                >
                  <span className="font-mono font-bold text-emerald-400">0{idx + 1}.</span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-xs font-mono text-slate-400">
            {rx.duration}
          </div>
        </div>

        {/* Doctor Stamp & Signature Box */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="border-2 border-emerald-500/60 rounded-xl p-3 bg-emerald-950/30 text-center sm:text-left space-y-1">
            <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              OFFICIAL DR. STAMP
            </div>
            <div className="text-xs font-mono text-slate-200 font-bold">
              {rx.doctorStamp}
            </div>
          </div>

          <span className="text-[10px] font-mono text-slate-400 text-center sm:text-right">
            {rx.disclaimer}
          </span>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="text-xs text-slate-400 font-sans">
          Prescription authorized. Proceeding to official achievements & legend rank...
        </div>

        <button
          id="btn-continue-to-achievements"
          onClick={() => {
            soundEngine.playSfx('click');
            onContinue();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>PROCEED TO CHAPTER 8: ACHIEVEMENTS & LEGEND RANK</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
