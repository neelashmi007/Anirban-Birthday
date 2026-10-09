'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Play, SkipForward, RotateCcw, ArrowRight, UserCheck, Activity, Award } from 'lucide-react';
import { BIRTHDAY_CONTENT } from '@/content/birthday';
import { soundEngine } from '@/lib/soundEngine';

interface Chapter1Props {
  onContinue: () => void;
  onOpenClearanceEasterEgg: () => void;
}

export const Chapter1Investigation: React.FC<Chapter1Props> = ({
  onContinue,
  onOpenClearanceEasterEgg,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(true);
  const [isDiagnosticComplete, setIsDiagnosticComplete] = useState(false);
  const [badgeClicks, setBadgeClicks] = useState(0);

  const steps = BIRTHDAY_CONTENT.investigation.diagnosticSteps;
  const profile = BIRTHDAY_CONTENT.investigation.profile;

  // Step runner
  useEffect(() => {
    if (!isDiagnosticRunning || isDiagnosticComplete) return;

    if (currentStepIndex < steps.length) {
      const step = steps[currentStepIndex];
      soundEngine.playSfx('scan');
      const timer = setTimeout(() => {
        if (currentStepIndex + 1 < steps.length) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsDiagnosticComplete(true);
          setIsDiagnosticRunning(false);
          soundEngine.playSfx('achievement');
        }
      }, step.duration);
      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, isDiagnosticRunning, isDiagnosticComplete, steps]);

  const handleSkipAnimation = () => {
    soundEngine.playSfx('click');
    setCurrentStepIndex(steps.length - 1);
    setIsDiagnosticComplete(true);
    setIsDiagnosticRunning(false);
  };

  const handleReplayDiagnostics = () => {
    soundEngine.playSfx('click');
    setCurrentStepIndex(0);
    setIsDiagnosticComplete(false);
    setIsDiagnosticRunning(true);
  };

  // Easter Egg: Click Classification badge 5 times
  const handleBadgeClick = () => {
    const newCount = badgeClicks + 1;
    setBadgeClicks(newCount);
    soundEngine.playSfx('click');
    if (newCount >= 5) {
      setBadgeClicks(0);
      onOpenClearanceEasterEgg();
    }
  };

  // Fake funny progress calculation (jumps around comically)
  const calculateProgress = () => {
    if (isDiagnosticComplete) return 100;
    const base = ((currentStepIndex + 1) / steps.length) * 100;
    // comical dips
    if (currentStepIndex === 4) return 22; // searching for syllabus
    if (currentStepIndex === 6) return 31; // searching recycling bin
    if (currentStepIndex === 7) return 15; // zero syllabus found
    return Math.min(99, Math.round(base));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Chapter Title & Header */}
      <div className="space-y-2 text-center sm:text-left border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 text-xs font-mono border border-emerald-500/30">
          <Activity className="w-3.5 h-3.5" />
          <span>{BIRTHDAY_CONTENT.investigation.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
          {BIRTHDAY_CONTENT.investigation.title}
        </h2>
        <p className="text-sm text-slate-400 font-sans">
          Unauthorized biological and behavioral audit conducted by close associates.
        </p>
      </div>

      {/* Subject Dossier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-700/60 space-y-5 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-slate-200 font-mono text-sm font-bold">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>PRIMARY SUBJECT PROFILE</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">ID: ANIRBAN-01</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
              <span className="text-slate-400">SUBJECT:</span>
              <span className="font-bold text-white text-sm">{profile.subject}</span>
            </div>

            {/* Clickable Easter Egg Badge */}
            <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
              <span className="text-slate-400">CLASSIFICATION:</span>
              <button
                onClick={handleBadgeClick}
                className="group px-2.5 py-1 rounded bg-purple-950/80 text-purple-300 font-bold border border-purple-500/40 hover:border-purple-400 hover:scale-105 transition-all flex items-center gap-1 cursor-pointer"
                title="Tap repeatedly for secret clearance"
              >
                <Award className="w-3.5 h-3.5 text-purple-400" />
                <span>{profile.classification}</span>
                {badgeClicks > 0 && badgeClicks < 5 && (
                  <span className="text-[10px] text-pink-400 font-normal">({badgeClicks}/5)</span>
                )}
              </button>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
              <span className="text-slate-400">HEIGHT STATUS:</span>
              <span className="text-cyan-400 font-bold">{profile.heightStatus}</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
              <span className="text-slate-400">ACADEMIC STATUS:</span>
              <span className="text-rose-400 font-bold">{profile.academicStatus}</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
              <span className="text-slate-400">MIMICRY CAPABILITY:</span>
              <span className="text-amber-400 font-bold">{profile.mimicryCapability}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-slate-400">RELIABILITY INDEX:</span>
              <span className="text-emerald-400 font-bold">{profile.reliabilityIndex}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-sans leading-relaxed">
            <span className="font-mono text-emerald-400 font-bold">Investigator Note:</span> While the subject displays extreme procrastination tendencies regarding syllabi, loyalty sensors indicate a rare 100% friend dependability quotient.
          </div>
        </div>

        {/* Live Diagnostics Terminal */}
        <div className="glass-panel-accent rounded-2xl p-6 border border-emerald-500/30 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>DIAGNOSTIC TELEMETRY MATRIX</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {isDiagnosticComplete ? 'SCAN FINISHED' : 'STREAMING...'}
            </span>
          </div>

          {/* Progress Gauge */}
          <div className="space-y-1.5 font-mono">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Diagnostic Calibration:</span>
              <span className="text-emerald-400 font-bold">{calculateProgress()}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-purple-500 transition-all duration-300"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
          </div>

          {/* Terminal Console Output */}
          <div className="bg-black/70 p-4 rounded-xl border border-slate-800 min-h-[170px] max-h-[220px] overflow-y-auto font-mono text-xs space-y-2">
            {steps.slice(0, currentStepIndex + 1).map((step: { text: string; duration: number }, idx: number) => {
              const isCurrent = idx === currentStepIndex;
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-2 ${
                    isCurrent ? 'text-emerald-300 font-bold' : 'text-slate-400'
                  }`}
                >
                  <span className="text-slate-600 select-none">›</span>
                  <span>{step.text}</span>
                  {isCurrent && !isDiagnosticComplete && (
                    <span className="inline-block w-1.5 h-3 bg-emerald-400 animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Diagnostic Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
            {!isDiagnosticComplete ? (
              <button
                onClick={handleSkipAnimation}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs flex items-center gap-1.5 transition-all"
              >
                <SkipForward className="w-3.5 h-3.5" /> Skip Telemetry
              </button>
            ) : (
              <button
                onClick={handleReplayDiagnostics}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Re-scan Subject
              </button>
            )}

            <span className="text-[11px] font-mono text-slate-400">
              {isDiagnosticComplete ? 'Status: Scan Validated' : 'Auditing Anirban...'}
            </span>
          </div>
        </div>
      </div>

      {/* Continue Section */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="text-xs text-slate-400 font-sans">
          Preliminary dossier accepted. Escalating inquiry to academic records...
        </div>

        <button
          id="btn-continue-to-syllabus"
          onClick={() => {
            soundEngine.playSfx('click');
            onContinue();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>PROCEED TO CHAPTER 2: SYLLABUS CRISIS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
