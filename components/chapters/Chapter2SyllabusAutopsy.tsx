'use client';

import React, { useState } from 'react';
import { BookOpen, FileSpreadsheet, AlertTriangle, ArrowRight, RotateCcw, Award, CheckCircle, Sparkles, Eye, EyeOff, Skull, ShieldAlert } from 'lucide-react';
import { BIRTHDAY_CONTENT, SimulatorOption } from '@/content/birthday';
import { soundEngine } from '@/lib/soundEngine';

interface Chapter2Props {
  onContinue: () => void;
  onUnlockAchievement: (id: string) => void;
}

export const Chapter2SyllabusAutopsy: React.FC<Chapter2Props> = ({
  onContinue,
  onUnlockAchievement,
}) => {
  const [selectedOption, setSelectedOption] = useState<SimulatorOption | null>(null);
  const [simProgress, setSimProgress] = useState(12);
  const [panicClicks, setPanicClicks] = useState(0);
  const [hasUnlockedMaster, setHasUnlockedMaster] = useState(false);
  const [showAcademicEasterEgg, setShowAcademicEasterEgg] = useState(false);

  // Autopsy redaction state
  const [revealedRedactions, setRevealedRedactions] = useState(false);

  const syllabus = BIRTHDAY_CONTENT.syllabus;
  const autopsy = BIRTHDAY_CONTENT.syllabusAutopsy;

  const handleSelectOption = (option: SimulatorOption) => {
    soundEngine.playSfx('click');
    setSelectedOption(option);

    let nextProgress = Math.max(4, Math.min(88, simProgress + option.progressDelta));
    setSimProgress(nextProgress);

    if (option.id === 'panic_professionally') {
      const pClicks = panicClicks + 1;
      setPanicClicks(pClicks);
      if (pClicks >= 4) {
        setShowAcademicEasterEgg(true);
        soundEngine.playSfx('achievement');
      }
    }

    if (!hasUnlockedMaster) {
      setHasUnlockedMaster(true);
      onUnlockAchievement(syllabus.unlockedAchievementId);
      soundEngine.playSfx('achievement');
    }
  };

  const handleResetSimulator = () => {
    soundEngine.playSfx('click');
    setSelectedOption(null);
    setSimProgress(12);
  };

  const handleToggleRedactions = () => {
    soundEngine.playSfx('scan');
    setRevealedRedactions(!revealedRedactions);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Chapter Title */}
      <div className="space-y-2 text-center sm:text-left border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950/60 text-rose-400 text-xs font-mono border border-rose-500/30">
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>DEPARTMENT OF FORENSIC ACADEMIC PATHOLOGY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
          {syllabus.title}
        </h2>
        <p className="text-sm text-slate-400 font-sans">
          {syllabus.subtitle}
        </p>
      </div>

      {/* Hilarious Academic Dashboard Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {syllabus.metrics.map((metric, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 font-mono space-y-1 hover:border-slate-700 transition-colors"
          >
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">
              {metric.label}
            </div>
            <div
              className={`text-xs sm:text-sm font-bold ${
                metric.status === 'critical'
                  ? 'text-rose-400'
                  : metric.status === 'warning'
                  ? 'text-amber-400'
                  : 'text-slate-200'
              }`}
            >
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Simulator Section */}
      <div className="glass-panel-accent rounded-2xl p-6 border border-emerald-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              {syllabus.simulatorTitle}
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              {syllabus.simulatorIntro}
            </p>
          </div>

          <button
            onClick={handleResetSimulator}
            className="self-start sm:self-center px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Simulation
          </button>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-1.5 font-mono">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Syllabus Completion Gauge:</span>
            <span className="text-amber-400 font-bold">{simProgress}% (Negotiable)</span>
          </div>
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-700 relative">
            <div
              className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${simProgress}%` }}
            />
          </div>
        </div>

        {/* Choice Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {syllabus.options.map((opt) => {
            const isSelected = selectedOption?.id === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                className={`p-3.5 rounded-xl border text-left font-mono text-xs transition-all cursor-pointer flex flex-col justify-between min-h-[72px] ${
                  isSelected
                    ? 'bg-emerald-950/70 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-500/20 scale-[1.02]'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-800/90 hover:border-slate-600'
                }`}
              >
                <div className="font-semibold text-slate-200">{opt.label}</div>
                <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                  <span>Delta: {opt.progressDelta > 0 ? `+${opt.progressDelta}%` : `${opt.progressDelta}%`}</span>
                  <span className="text-emerald-400">› Select</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Outcome Display */}
        {selectedOption && (
          <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-slate-200 space-y-2 animate-fadeIn glow-green">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-emerald-400" />
                SIMULATOR RESULT: {selectedOption.resultTitle}
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase px-2 py-0.5 rounded bg-black/60 border border-slate-700">
                Severity: {selectedOption.resultSeverity}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              {selectedOption.resultDescription}
            </p>
          </div>
        )}

        {/* Hidden Academic Easter Egg */}
        {showAcademicEasterEgg && (
          <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-500/50 text-purple-200 font-mono text-xs space-y-1.5 animate-fadeIn glow-purple">
            <div className="flex items-center gap-2 text-purple-300 font-bold">
              <Sparkles className="w-4 h-4 text-purple-400" />
              {BIRTHDAY_CONTENT.easterEggs.academicEasterEggTitle}
            </div>
            <p className="text-slate-300 font-sans text-xs">
              {BIRTHDAY_CONTENT.easterEggs.academicEasterEggBody}
            </p>
          </div>
        )}
      </div>

      {/* Forensic Syllabus Autopsy Screen */}
      <div className="relative rounded-2xl bg-[#0c0e17] border-2 border-rose-500/40 p-6 shadow-2xl space-y-5 overflow-hidden glow-red">
        {/* Top Autopsy Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-500/30 pb-3">
          <div className="flex items-center gap-2 text-rose-400 font-mono text-sm font-bold">
            <Skull className="w-5 h-5 text-rose-500 animate-pulse" />
            <span>POST-EXAMINATION REPORT: SYLLABUS</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-rose-400 px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/40">
              {autopsy.caseNo}
            </span>
            <button
              onClick={handleToggleRedactions}
              className="text-xs font-mono text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 border border-slate-700 flex items-center gap-1 transition-colors"
            >
              {revealedRedactions ? <EyeOff className="w-3.5 h-3.5 text-rose-400" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{revealedRedactions ? 'Hide Redacted Intel' : 'Reveal Redacted Intel'}</span>
            </button>
          </div>
        </div>

        {/* Red Autopsy Stamp */}
        <div className="border border-rose-500/30 bg-rose-950/20 rounded-xl p-3 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs font-mono text-rose-300 font-bold uppercase tracking-wider">
            FORENSIC PATHOLOGY VERDICT:
          </span>
          <span className="px-3 py-1 rounded bg-rose-900/60 text-rose-200 border border-rose-500/60 font-mono font-bold text-xs">
            {autopsy.stampText}
          </span>
        </div>

        {/* Autopsy Details Grid */}
        <div className="space-y-3 font-mono text-xs text-slate-300">
          <div className="p-3 rounded-lg bg-black/60 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">STRUCTURE EXAMINED:</span>
            <span className="text-white font-bold">{autopsy.structureExamined}</span>
          </div>

          <div className="p-3 rounded-lg bg-black/60 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">EXTENT OF COMPLETION:</span>
            <span className={`font-bold transition-colors ${revealedRedactions ? 'text-amber-400' : 'bg-rose-950 text-rose-400 px-2 rounded cursor-pointer'}`} onClick={handleToggleRedactions}>
              {revealedRedactions ? '3.8% Read (Remaining chapters deceased)' : autopsy.extentOfCompletion}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-black/60 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">TIME OF DEATH:</span>
            <span className="text-rose-400 font-bold">{autopsy.timeOfDeath}</span>
          </div>

          <div className="p-3 rounded-lg bg-black/60 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">CAUSE OF DEATH:</span>
            <span className="text-rose-300 font-bold">{autopsy.causeOfDeath}</span>
          </div>

          {/* Contributing Factors */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="font-bold text-rose-400 uppercase text-[11px]">
              Contributing Factors to Academic Tragedy:
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300 font-sans text-xs">
              {autopsy.contributingFactors.map((factor, idx) => (
                <li key={idx}>{factor}</li>
              ))}
            </ul>
          </div>

          {/* Findings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 font-sans text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="font-mono text-emerald-400 font-bold text-[11px]">External Exam:</span>
              <p className="text-slate-300">{autopsy.externalFindings}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="font-mono text-purple-400 font-bold text-[11px]">Internal Exam:</span>
              <p className="text-slate-300">{autopsy.internalFindings}</p>
            </div>
          </div>

          {/* Final Impression */}
          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 font-sans text-xs space-y-1">
            <span className="font-mono text-rose-300 font-bold uppercase text-[11px]">Final Pathological Impression:</span>
            <p className="text-slate-200 leading-relaxed italic">{autopsy.finalImpression}</p>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="text-xs text-slate-400 font-sans">
          Autopsy report sealed. Proceeding to face the oral examination panel...
        </div>

        <button
          id="btn-continue-to-viva"
          onClick={() => {
            soundEngine.playSfx('click');
            onContinue();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>PROCEED TO CHAPTER 3: ANIRBAN’S VIVA NIGHTMARE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
