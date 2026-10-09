'use client';

import React, { useState } from 'react';
import { Ruler, Plane, AlertTriangle, ArrowRight, CheckCircle2, Radar, Award } from 'lucide-react';
import { BIRTHDAY_CONTENT } from '@/content/birthday';
import { soundEngine } from '@/lib/soundEngine';

interface Chapter3Props {
  onContinue: () => void;
  onUnlockAchievement: (id: string) => void;
}

export const Chapter3Height: React.FC<Chapter3Props> = ({
  onContinue,
  onUnlockAchievement,
}) => {
  const [measuring, setMeasuring] = useState(false);
  const [measured, setMeasured] = useState(false);
  const [airspaceChecking, setAirspaceChecking] = useState(false);
  const [airspaceResult, setAirspaceResult] = useState(false);
  const [activeStepText, setActiveStepText] = useState('');

  const heightData = BIRTHDAY_CONTENT.height;

  const handleMeasure = () => {
    soundEngine.playSfx('scan');
    setMeasuring(true);
    setMeasured(false);

    const states = heightData.measuringStates;
    let idx = 0;
    setActiveStepText(states[0]);

    const interval = setInterval(() => {
      idx++;
      if (idx < states.length) {
        setActiveStepText(states[idx]);
        soundEngine.playSfx('scan');
      } else {
        clearInterval(interval);
        setMeasuring(false);
        setMeasured(true);
        soundEngine.playSfx('achievement');
        onUnlockAchievement(heightData.unlockedAchievementId);
      }
    }, 600);
  };

  const handleAirspaceCheck = () => {
    soundEngine.playSfx('scan');
    setAirspaceChecking(true);
    setAirspaceResult(false);

    setTimeout(() => {
      setAirspaceChecking(false);
      setAirspaceResult(true);
      soundEngine.playSfx('achievement');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="space-y-2 text-center sm:text-left border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 text-xs font-mono border border-cyan-500/30">
          <Ruler className="w-3.5 h-3.5" />
          <span>BUREAU OF VERTICAL ANOMALIES</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
          {heightData.title}
        </h2>
        <p className="text-sm text-slate-400 font-sans">
          {heightData.subtitle}
        </p>
      </div>

      {/* Official Dispatches Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {heightData.dispatches.map((dispatch, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 font-mono text-xs flex items-start gap-2.5 text-slate-300 hover:border-cyan-500/30 transition-colors"
          >
            <span className="text-cyan-400 font-bold">0{idx + 1} //</span>
            <span className="font-sans text-xs text-slate-200">{dispatch}</span>
          </div>
        ))}
      </div>

      {/* Interactive Measuring Station */}
      <div className="glass-panel-accent rounded-2xl p-6 border border-cyan-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
              <Ruler className="w-4 h-4 text-cyan-400" />
              VERTICAL SENSOR & AIRSPACE DIAGNOSTIC STATION
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Test vertical parameters using optical lasers and civil aviation radar.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            id="btn-measure-anirban"
            onClick={handleMeasure}
            disabled={measuring}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Ruler className={`w-4 h-4 ${measuring ? 'animate-spin' : ''}`} />
            <span>{measuring ? 'CALIBRATING SENSORS...' : heightData.measurementButtonLabel}</span>
          </button>

          <button
            id="btn-airspace-clearance"
            onClick={handleAirspaceCheck}
            disabled={airspaceChecking}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plane className={`w-4 h-4 ${airspaceChecking ? 'animate-bounce' : ''}`} />
            <span>{airspaceChecking ? 'SCANNING RADAR...' : heightData.airspaceButtonLabel}</span>
          </button>
        </div>

        {/* Measuring Progress Feed */}
        {measuring && (
          <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/40 font-mono text-xs text-cyan-300 flex items-center gap-2 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>{activeStepText}</span>
          </div>
        )}

        {/* Absurd Measurement Result */}
        {measured && (
          <div className="p-5 rounded-xl bg-cyan-950/40 border-2 border-cyan-500/50 space-y-3 font-mono text-xs animate-fadeIn glow-cyan">
            <div className="flex items-center justify-between text-cyan-300 font-bold border-b border-cyan-500/30 pb-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                {heightData.measurementResult.headline}
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 text-cyan-400 border border-cyan-500/40">
                AUDIT COMPLETE
              </span>
            </div>

            <div className="text-slate-200 font-sans text-xs sm:text-sm">
              <span className="font-mono text-cyan-400 font-semibold">{heightData.measurementResult.clearanceStatus}</span>
              <p className="mt-1 text-slate-300">{heightData.measurementResult.recommendation}</p>
            </div>

            <div className="pt-2 flex items-center gap-2 text-emerald-400">
              <Award className="w-4 h-4" />
              <span>ACHIEVEMENT UNLOCKED: Certified Tall Person</span>
            </div>
          </div>
        )}

        {/* Airspace Radar Result */}
        {airspaceResult && (
          <div className="p-5 rounded-xl bg-purple-950/40 border-2 border-purple-500/50 space-y-3 font-mono text-xs animate-fadeIn glow-purple">
            <div className="flex items-center justify-between text-purple-300 font-bold border-b border-purple-500/30 pb-2">
              <span className="flex items-center gap-1.5">
                <Radar className="w-4 h-4 text-purple-400 animate-spin" />
                {heightData.airspaceResult.headline}
              </span>
              <span className="text-[10px] text-pink-400">{heightData.airspaceResult.code}</span>
            </div>

            <p className="text-slate-200 font-sans text-xs sm:text-sm leading-relaxed">
              {heightData.airspaceResult.details}
            </p>
          </div>
        )}

        {/* Visual Ruler Scale SVG Graphic */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500 select-none overflow-x-auto gap-2">
          <span>0.00m (Ground)</span>
          <span className="text-slate-400">1.75m (Average Human)</span>
          <span className="text-cyan-400 font-bold">1.83m — ANIRBAN THRESHOLD ⚠️</span>
          <span className="text-purple-400">Stratosphere</span>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="text-xs text-slate-400 font-sans">
          Vertical clearance documented. Directing sensors to internal brain CPU...
        </div>

        <button
          id="btn-continue-to-overthinking"
          onClick={() => {
            soundEngine.playSfx('click');
            onContinue();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>PROCEED TO CHAPTER 5: OVERTHINKING SIMULATOR</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
