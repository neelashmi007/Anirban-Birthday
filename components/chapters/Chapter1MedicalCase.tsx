'use client';

import React, { useState, useEffect } from 'react';
import { Stethoscope, HeartPulse, Activity, AlertCircle, FileText, CheckCircle2, Award, ArrowRight, ShieldAlert, Sparkles, Play, SkipForward, RotateCcw } from 'lucide-react';
import { BIRTHDAY_CONTENT } from '@/content/birthday';
import { soundEngine } from '@/lib/soundEngine';

interface Chapter1Props {
  onContinue: () => void;
  onOpenClearanceEasterEgg: () => void;
  onTriggerMedicalEasterEgg: (eggKey: string) => void;
}

export const Chapter1MedicalCase: React.FC<Chapter1Props> = ({
  onContinue,
  onOpenClearanceEasterEgg,
  onTriggerMedicalEasterEgg,
}) => {
  const [activeSectionId, setActiveSectionId] = useState('gpe');
  const [badgeClicks, setBadgeClicks] = useState(0);
  const [stethoscopeClicks, setStethoscopeClicks] = useState(0);
  const [showStethoscopeToast, setShowStethoscopeToast] = useState(false);
  const [showEmergencyCrossToast, setShowEmergencyCrossToast] = useState(false);

  // Diagnostic runner states
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(true);
  const [isDiagnosticComplete, setIsDiagnosticComplete] = useState(false);

  const caseData = BIRTHDAY_CONTENT.medicalCaseFile;
  const steps = BIRTHDAY_CONTENT.investigation.diagnosticSteps;

  // Diagnostic runner
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

  // Stethoscope easter egg
  const handleStethoscopeClick = () => {
    soundEngine.playSfx('ecg');
    setStethoscopeClicks((prev) => prev + 1);
    setShowStethoscopeToast(true);
    onTriggerMedicalEasterEgg('stethoscope');
    setTimeout(() => setShowStethoscopeToast(false), 4500);
  };

  // Medical Red Cross easter egg
  const handleCrossClick = () => {
    soundEngine.playSfx('glitch');
    setShowEmergencyCrossToast(true);
    onTriggerMedicalEasterEgg('medicalCross');
    setTimeout(() => setShowEmergencyCrossToast(false), 4500);
  };

  // Secret badge click
  const handleBadgeClick = () => {
    const newCount = badgeClicks + 1;
    setBadgeClicks(newCount);
    soundEngine.playSfx('click');
    if (newCount >= 5) {
      setBadgeClicks(0);
      onOpenClearanceEasterEgg();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Chapter Title & Header */}
      <div className="space-y-2 text-center sm:text-left border-b border-slate-800 pb-5">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 text-emerald-400 text-xs font-mono border border-emerald-500/30">
            <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
            <span>CONFIDENTIAL MBBS CASE SHEET</span>
          </div>

          <button
            onClick={handleCrossClick}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-950/70 text-rose-400 text-xs font-mono border border-rose-500/40 hover:scale-105 transition-transform cursor-pointer"
            title="Emergency Alert"
          >
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse text-rose-400" />
            <span>CODE: SYLLABUS EMERGENCY</span>
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight flex items-center justify-center sm:justify-start gap-2">
          <span>{caseData.title}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-sans">
          {caseData.subtitle} • Case ID: <code className="text-emerald-400">{caseData.caseNo}</code>
        </p>
      </div>

      {/* Easter Egg Toasts */}
      {showStethoscopeToast && (
        <div className="p-4 rounded-xl bg-cyan-950/80 border-2 border-cyan-500 text-cyan-200 font-mono text-xs flex items-center gap-3 animate-fadeIn glow-cyan">
          <Stethoscope className="w-5 h-5 text-cyan-400 shrink-0 animate-bounce" />
          <div>
            <div className="font-bold text-cyan-300">AUSCULTATION RESULT #01:</div>
            <div className="text-slate-100 font-sans">{BIRTHDAY_CONTENT.easterEggs.medicalEasterEggs.stethoscope.message}</div>
          </div>
        </div>
      )}

      {showEmergencyCrossToast && (
        <div className="p-4 rounded-xl bg-rose-950/80 border-2 border-rose-500 text-rose-200 font-mono text-xs flex items-center gap-3 animate-fadeIn glow-red">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 animate-pulse" />
          <div>
            <div className="font-bold text-rose-300">{BIRTHDAY_CONTENT.easterEggs.medicalEasterEggs.medicalCross.title}</div>
            <div className="text-slate-100 font-sans">{BIRTHDAY_CONTENT.easterEggs.medicalEasterEggs.medicalCross.message}</div>
          </div>
        </div>
      )}

      {/* Patient Monitor Vitals HUD */}
      <div className="glass-panel-accent rounded-2xl p-5 border border-emerald-500/30 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
            <HeartPulse className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>BEDSIDE PATIENT MONITOR // TELEMETRY FEED</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 animate-pulse flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> LIVE TRACE
          </span>
        </div>

        {/* Animated ECG Rhythm Line */}
        <div className="w-full h-12 bg-black/70 rounded-lg overflow-hidden border border-slate-800 relative flex items-center px-2">
          <svg className="w-full h-8 text-emerald-400 opacity-90" viewBox="0 0 500 40" preserveAspectRatio="none">
            <path
              d="M 0 20 L 60 20 L 70 5 L 80 35 L 90 10 L 100 20 L 160 20 L 170 8 L 180 32 L 190 12 L 200 20 L 260 20 L 270 5 L 280 35 L 290 10 L 300 20 L 360 20 L 370 8 L 380 32 L 390 12 L 400 20 L 500 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="animate-pulse"
            />
          </svg>
          <div className="absolute right-3 top-2 text-[10px] font-mono text-emerald-400 font-bold">
            RHYTHM: SINUS TACHYCARDIA
          </div>
        </div>

        {/* Vitals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 font-mono text-xs">
          {caseData.vitals.map((vital, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1 hover:border-emerald-500/40 transition-colors"
            >
              <div className="text-[10px] text-slate-400">{vital.label}</div>
              <div className="text-sm font-bold text-emerald-400">{vital.value}</div>
              <div className="text-[9px] text-slate-400 font-sans line-clamp-1">{vital.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Case Sheet Parody Card */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-700/70 space-y-6 relative overflow-hidden">
        {/* Rubber Stamp Badge */}
        <div className="absolute top-4 right-4 sm:right-6 rotate-6 select-none pointer-events-none">
          <div className="border-2 border-rose-500/70 px-3 py-1 rounded text-rose-400 font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-widest bg-rose-950/40 opacity-85">
            PROGNOSIS: LEGEND
          </div>
        </div>

        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <button
            onClick={handleStethoscopeClick}
            className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Click stethoscope for auscultation"
          >
            <Stethoscope className="w-6 h-6 animate-pulse" />
          </button>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white font-mono">
              PATIENT: {caseData.patient.name}
            </h3>
            <div className="text-xs font-mono text-slate-400">
              {caseData.patient.ageGender} • {caseData.patient.department}
            </div>
          </div>
        </div>

        {/* Patient Case Findings */}
        <div className="space-y-3 font-sans text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90 space-y-1">
            <span className="font-mono text-xs font-bold text-rose-400 uppercase">Chief Complaint:</span>
            <p className="text-slate-200">{caseData.patient.chiefComplaint}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90 space-y-1">
            <span className="font-mono text-xs font-bold text-amber-400 uppercase">History of Present Illness:</span>
            <p className="text-slate-200">{caseData.patient.historyOfPresentIllness}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
              <span className="font-mono text-xs font-bold text-purple-400 uppercase">Associated Symptoms:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
                {caseData.patient.associatedSymptoms.map((sym, idx) => (
                  <li key={idx}>{sym}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase">Positive Findings:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-200 text-xs">
                {caseData.patient.positiveFindings.map((find, idx) => (
                  <li key={idx} className="font-medium">{find}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-purple-300 uppercase">Provisional Diagnosis:</span>
              <button
                onClick={handleBadgeClick}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/70 text-purple-200 border border-purple-400/50 hover:bg-purple-800 transition-colors"
                title="Classification badge"
              >
                Classification: Certified Legend {badgeClicks > 0 ? `(${badgeClicks}/5)` : ''}
              </button>
            </div>
            <p className="text-slate-200 font-bold font-mono text-xs sm:text-sm text-purple-200">
              {caseData.patient.provisionalDiagnosis}
            </p>
            <p className="text-xs text-slate-300 pt-1">
              <span className="font-bold text-emerald-400">Prognosis:</span> {caseData.patient.prognosis}
            </p>
          </div>
        </div>

        {/* Interactive Clickable Report Tabs */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono text-slate-400 font-bold uppercase">
            Clickable Clinical Investigation Sections:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {caseData.sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => {
                  soundEngine.playSfx('click');
                  setActiveSectionId(sec.id);
                  if (sec.id === 'labs') {
                    onTriggerMedicalEasterEgg('labResult');
                  }
                }}
                className={`p-2.5 rounded-xl font-mono text-xs text-left border transition-all cursor-pointer ${
                  activeSectionId === sec.id
                    ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold">{sec.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">› View notes</div>
              </button>
            ))}
          </div>

          {/* Active Section Content */}
          {caseData.sections.find((s) => s.id === activeSectionId) && (
            <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 text-slate-200 text-xs sm:text-sm font-sans space-y-1 animate-fadeIn">
              <div className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                FINDINGS: {caseData.sections.find((s) => s.id === activeSectionId)?.name}
              </div>
              <p className="text-slate-300 leading-relaxed pt-1">
                {caseData.sections.find((s) => s.id === activeSectionId)?.findings}
              </p>
            </div>
          )}
        </div>

        <div className="text-[10px] font-mono text-slate-400 text-center pt-2">
          {caseData.disclaimer}
        </div>
      </div>

      {/* Live Diagnostic Telemetry Terminal (Preserving Chapter 1 Diagnostics) */}
      <div className="glass-panel-accent rounded-2xl p-6 border border-emerald-500/30 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>AUTOMATED DIAGNOSTIC TELEMETRY RUNNER</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {isDiagnosticComplete ? 'SCAN COMPLETE' : 'SCANNING SUBJECT...'}
          </span>
        </div>

        <div className="bg-black/70 p-4 rounded-xl border border-slate-800 min-h-[140px] max-h-[180px] overflow-y-auto font-mono text-xs space-y-2">
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
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          {!isDiagnosticComplete ? (
            <button
              onClick={() => {
                soundEngine.playSfx('click');
                setCurrentStepIndex(steps.length - 1);
                setIsDiagnosticComplete(true);
                setIsDiagnosticRunning(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs flex items-center gap-1.5"
            >
              <SkipForward className="w-3.5 h-3.5" /> Skip Telemetry
            </button>
          ) : (
            <button
              onClick={() => {
                soundEngine.playSfx('click');
                setCurrentStepIndex(0);
                setIsDiagnosticComplete(false);
                setIsDiagnosticRunning(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Re-run Telemetry
            </button>
          )}

          <span className="text-[11px] font-mono text-emerald-400">
            Diagnosis: Certified Legend Confirmed
          </span>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="text-xs text-slate-400 font-sans">
          Clinical case file verified. Escalating to forensic syllabus autopsy...
        </div>

        <button
          id="btn-continue-to-syllabus-autopsy"
          onClick={() => {
            soundEngine.playSfx('click');
            onContinue();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>PROCEED TO CHAPTER 2: SYLLABUS AUTOPSY</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
