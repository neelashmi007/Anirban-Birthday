'use client';

import React, { useState } from 'react';
import { ShieldAlert, Award, ArrowRight, RotateCcw, CheckCircle2, AlertCircle, HeartPulse, Dna, Microscope, Pill, Bone, HelpCircle, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONTENT, VivaQuestion } from '@/content/birthday';
import { soundEngine } from '@/lib/soundEngine';

interface Chapter3Props {
  onContinue: () => void;
  onUnlockAchievement: (id: string) => void;
  onTriggerMedicalEasterEgg: (eggKey: string) => void;
}

export const Chapter3VivaNightmare: React.FC<Chapter3Props> = ({
  onContinue,
  onUnlockAchievement,
  onTriggerMedicalEasterEgg,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExaminerEasterEgg, setShowExaminerEasterEgg] = useState(false);

  const viva = BIRTHDAY_CONTENT.vivaSimulator;
  const questions = viva.questions;
  const currentQ = questions[currentQuestionIndex];

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bone':
        return <Bone className="w-4 h-4 text-amber-400" />;
      case 'HeartPulse':
        return <HeartPulse className="w-4 h-4 text-rose-400" />;
      case 'Dna':
        return <Dna className="w-4 h-4 text-purple-400" />;
      case 'Microscope':
        return <Microscope className="w-4 h-4 text-cyan-400" />;
      case 'Pill':
        return <Pill className="w-4 h-4 text-pink-400" />;
      case 'ShieldAlert':
      default:
        return <ShieldAlert className="w-4 h-4 text-emerald-400" />;
    }
  };

  const handleSelectOption = (opt: { id: string; label: string; explanation: string; score: number }) => {
    if (selectedOptionId !== null) return; // Prevent double clicking same question

    soundEngine.playSfx(opt.score >= 2 ? 'achievement' : 'click');
    setSelectedOptionId(opt.id);
    const newScore = score + opt.score;
    setScore(newScore);

    // Unlock individual subject achievements
    if (currentQuestionIndex === 0) onUnlockAchievement('anatomy_survivor');
    if (currentQuestionIndex === 1) onUnlockAchievement('physiology_still_loading');
    if (currentQuestionIndex === 2) onUnlockAchievement('biochemistry_confusion_certified');
  };

  const handleNextQuestion = () => {
    soundEngine.playSfx('click');
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
    } else {
      setIsCompleted(true);
      soundEngine.playSfx('achievement');
      onUnlockAchievement('viva_room_escape_artist');
    }
  };

  const handleRestartViva = () => {
    soundEngine.playSfx('click');
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setScore(0);
    setIsCompleted(false);
  };

  const handleExaminerEggClick = () => {
    soundEngine.playSfx('glitch');
    setShowExaminerEasterEgg(true);
    onTriggerMedicalEasterEgg('examinerChat');
  };

  // Determine final viva result
  const finalResult = viva.results.find((r) => score >= r.minScore) || viva.results[viva.results.length - 1];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Chapter Title */}
      <div className="space-y-2 text-center sm:text-left border-b border-slate-800 pb-5">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950/70 text-amber-400 text-xs font-mono border border-amber-500/30">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>ORAL VIVA SIMULATION GAUNTLET</span>
          </div>

          <button
            onClick={handleExaminerEggClick}
            className="text-[10px] font-mono text-slate-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
            title="Inspect examiner notes"
          >
            (Examiner Telemetry)
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
          {viva.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-sans">
          {viva.subtitle}
        </p>
      </div>

      {/* Secret Examiner Easter Egg Banner */}
      {showExaminerEasterEgg && (
        <div className="p-4 rounded-xl bg-amber-950/80 border-2 border-amber-500 text-amber-200 font-mono text-xs flex items-center justify-between gap-3 animate-fadeIn glow-gold">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
            <div>
              <div className="font-bold text-amber-300">INTERCEPTED FACULTY AUDIO:</div>
              <div className="text-slate-100 font-sans">{BIRTHDAY_CONTENT.easterEggs.medicalEasterEggs.examinerChat.message}</div>
            </div>
          </div>
          <button
            onClick={() => setShowExaminerEasterEgg(false)}
            className="px-2 py-1 bg-amber-900/60 rounded text-amber-300 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Progress & Score Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-700/60 flex items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Station Progress:</span>
          <span className="text-emerald-400 font-bold">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Mini Step Indicators */}
        <div className="flex gap-1.5">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-2 rounded-full transition-all ${
                idx < currentQuestionIndex
                  ? 'bg-emerald-400'
                  : idx === currentQuestionIndex
                  ? 'bg-amber-400 w-5 animate-pulse'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Viva Score:</span>
          <span className="text-amber-400 font-bold">{score} pts</span>
        </div>
      </div>

      {/* Main Interactive Viva Card */}
      {!isCompleted ? (
        <div className="glass-panel-accent rounded-3xl p-6 sm:p-8 border border-amber-500/40 space-y-6">
          {/* Question Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400">
              {getSubjectIcon(currentQ.icon)}
              <span>{currentQ.subject}</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              TABLE: EXTERNAL EXAMINER #1
            </span>
          </div>

          {/* Question Text */}
          <div className="p-4 rounded-2xl bg-black/50 border border-slate-800">
            <h3 className="text-base sm:text-lg font-bold text-white font-sans leading-relaxed">
              "{currentQ.question}"
            </h3>
          </div>

          {/* 3 Answer Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const hasAnswered = selectedOptionId !== null;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-2xl border text-left font-sans text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-950/80 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/20'
                      : hasAnswered
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-900/70 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-amber-500/40 cursor-pointer'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="font-medium">{opt.label}</span>
                  </div>

                  {isSelected && (
                    <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-mono font-bold text-[10px] shrink-0">
                      +{opt.score} PTS
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Entertaining Explanation Box */}
          {selectedOptionId && (
            <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 text-slate-200 space-y-2 animate-fadeIn glow-gold">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  EXAMINER VERDICT & NOTES:
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {currentQ.options.find((o) => o.id === selectedOptionId)?.explanation}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  <span>{currentQuestionIndex + 1 < questions.length ? 'Next Table Question' : 'Complete Viva Evaluation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Viva Completion Result Card */
        <div className="glass-panel-accent rounded-3xl p-6 sm:p-10 border border-emerald-500/50 text-center space-y-6 animate-fadeIn glow-green">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-950/60 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400">
            <Award className="w-10 h-10 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
              {finalResult.grade}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight text-glow-green">
              {finalResult.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-lg mx-auto leading-relaxed">
              {finalResult.description}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 max-w-sm mx-auto font-mono text-xs flex items-center justify-between">
            <span className="text-slate-400">Final Examination Score:</span>
            <span className="text-emerald-400 font-bold text-base">{score} / 18 PTS</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartViva}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Retake Viva
            </button>

            <button
              id="btn-continue-from-viva"
              onClick={() => {
                soundEngine.playSfx('click');
                onContinue();
              }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-mono font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
            >
              <span>PROCEED TO CHAPTER 4: HEIGHT DEPARTMENT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      {!isCompleted && (
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 font-sans">
            Viva simulation in progress. Answer all questions or jump ahead...
          </div>

          <button
            onClick={() => {
              soundEngine.playSfx('click');
              onContinue();
            }}
            className="text-xs font-mono text-slate-400 hover:text-emerald-400 underline underline-offset-4"
          >
            Skip to Chapter 4: Height Department ›
          </button>
        </div>
      )}
    </div>
  );
};
