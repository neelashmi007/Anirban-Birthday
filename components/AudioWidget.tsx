'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, BellRing, SlidersHorizontal, Check } from 'lucide-react';
import { soundEngine } from '@/lib/soundEngine';

export const AudioWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(soundEngine.getStatus());

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe(() => {
      setStatus(soundEngine.getStatus());
    });
    return () => unsubscribe();
  }, []);

  const handleToggleMute = async () => {
    await soundEngine.toggleMute();
    soundEngine.playSfx('click');
  };

  const handleToggleBgm = async () => {
    await soundEngine.toggleBgm();
  };

  const handleToggleSfx = () => {
    soundEngine.toggleSfx();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    soundEngine.setVolume(val);
  };

  const handleTestSfx = () => {
    soundEngine.playSfx('achievement');
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-700/60 rounded-full px-2 py-1 shadow-md backdrop-blur-md">
        {/* Main Mute / Unmute Button */}
        <button
          id="btn-audio-mute-toggle"
          onClick={handleToggleMute}
          aria-label={status.muted ? 'Unmute Audio' : 'Mute Audio'}
          className={`p-1.5 rounded-full transition-colors flex items-center justify-center ${
            status.muted
              ? 'text-rose-400 hover:bg-rose-950/40'
              : 'text-emerald-400 hover:bg-emerald-950/40'
          }`}
          title={status.muted ? 'Audio Muted' : 'Audio Active'}
        >
          {status.muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* BGM Indicator / Quick Toggle */}
        <button
          id="btn-bgm-quick-toggle"
          onClick={handleToggleBgm}
          aria-label="Toggle Background Music"
          className={`px-2 py-0.5 rounded-full text-xs font-mono flex items-center gap-1 transition-all ${
            status.bgmEnabled && !status.muted
              ? 'bg-purple-950/60 text-purple-300 border border-purple-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Toggle BGM"
        >
          <Music className={`w-3 h-3 ${status.bgmEnabled && !status.muted ? 'animate-pulse text-purple-400' : ''}`} />
          <span className="hidden sm:inline">BGM</span>
          {status.bgmEnabled && !status.muted && (
            <span className="flex space-x-0.5 items-end h-2.5">
              <span className="w-0.5 bg-purple-400 h-2 animate-bounce" />
              <span className="w-0.5 bg-purple-400 h-3 animate-bounce [animation-delay:0.15s]" />
              <span className="w-0.5 bg-purple-400 h-1.5 animate-bounce [animation-delay:0.3s]" />
            </span>
          )}
        </button>

        {/* Audio Settings Panel Opener */}
        <button
          id="btn-audio-settings-drawer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Audio Settings"
          className="p-1 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          title="Audio Settings"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Popover Settings Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 p-4 rounded-xl glass-panel-accent z-50 shadow-2xl border border-emerald-500/30 text-xs font-mono">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-700/60">
            <span className="text-emerald-400 font-bold tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" /> AUDIO CONTROL MATRIX
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white px-1.5 py-0.5 rounded hover:bg-slate-800"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            {/* Master Volume */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Master Volume</span>
                <span className="text-emerald-400">{Math.round(status.volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={status.volume}
                onChange={handleVolumeChange}
                className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* BGM Toggle */}
            <div className="flex items-center justify-between py-1 border-t border-slate-800/80">
              <span className="flex items-center gap-2 text-slate-300">
                <Music className="w-3.5 h-3.5 text-purple-400" /> Background Music
              </span>
              <button
                onClick={handleToggleBgm}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                  status.bgmEnabled
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {status.bgmEnabled ? 'ENABLED' : 'MUTED'}
              </button>
            </div>

            {/* SFX Toggle */}
            <div className="flex items-center justify-between py-1 border-t border-slate-800/80">
              <span className="flex items-center gap-2 text-slate-300">
                <BellRing className="w-3.5 h-3.5 text-cyan-400" /> Sound Effects (SFX)
              </span>
              <button
                onClick={handleToggleSfx}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                  status.sfxEnabled
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {status.sfxEnabled ? 'ACTIVE' : 'OFF'}
              </button>
            </div>

            {/* Test SFX Button */}
            <button
              onClick={handleTestSfx}
              className="w-full mt-2 py-1.5 px-3 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-center transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Test Achievement Fanfare
            </button>

            <p className="text-[10px] text-slate-400 leading-relaxed pt-1">
              * Supports local audio files in <code className="text-emerald-400">/public/audio/</code> with built-in Web Audio synthesis fallback.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
