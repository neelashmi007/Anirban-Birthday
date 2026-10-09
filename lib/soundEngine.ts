'use client';

import { AUDIO_CONFIG } from '@/content/audio';

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private bgmAudio: HTMLAudioElement | null = null;
  private sfxAudioCache: Map<string, HTMLAudioElement> = new Map();
  private isBgmPlaying: boolean = false;
  private synthBgmTimer: NodeJS.Timeout | null = null;
  private synthBgmStep: number = 0;

  public muted: boolean = false;
  public bgmEnabled: boolean = true; // default ON for instant autoplay
  public sfxEnabled: boolean = true;
  public volume: number = 0.5;

  private listeners: Array<() => void> = [];

  constructor() {
    // Audio context will be lazy-initialized on first user gesture
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public subscribe(cb: () => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private initAudioContext() {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public async toggleMute(): Promise<boolean> {
    this.muted = !this.muted;
    if (this.muted) {
      this.pauseBgm();
    } else if (this.bgmEnabled) {
      this.playBgm();
    }
    this.notify();
    return this.muted;
  }

  public async toggleBgm(): Promise<boolean> {
    this.bgmEnabled = !this.bgmEnabled;
    if (this.bgmEnabled && !this.muted) {
      await this.playBgm();
    } else {
      this.pauseBgm();
    }
    this.notify();
    return this.bgmEnabled;
  }

  public toggleSfx(): boolean {
    this.sfxEnabled = !this.sfxEnabled;
    if (this.sfxEnabled && !this.muted) {
      this.playSfx('click');
    }
    this.notify();
    return this.sfxEnabled;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.bgmAudio) {
      this.bgmAudio.volume = this.volume;
    }
    this.notify();
  }

  public async playBgm() {
    if (this.muted || !this.bgmEnabled) return;
    this.initAudioContext();

    if (!this.bgmAudio) {
      const audio = new Audio(AUDIO_CONFIG.bgm.src);
      audio.loop = true;
      audio.volume = this.volume;
      this.bgmAudio = audio;
    }

    try {
      await this.bgmAudio.play();
      this.isBgmPlaying = true;
      this.notify();
    } catch {
      // Audio file missing or autoplay blocked -> Fall back to synthesized ambient cyber theme
      this.startSynthBgm();
    }
  }

  public pauseBgm() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
    this.stopSynthBgm();
    this.isBgmPlaying = false;
    this.notify();
  }

  public getStatus() {
    return {
      muted: this.muted,
      bgmEnabled: this.bgmEnabled,
      sfxEnabled: this.sfxEnabled,
      isBgmPlaying: this.isBgmPlaying,
      volume: this.volume,
    };
  }

  public playSfx(type: 'click' | 'achievement' | 'confetti' | 'glitch' | 'scan' | 'success' | 'ecg') {
    if (this.muted || !this.sfxEnabled) return;

    if (type === 'ecg') {
      this.synthSfx('ecg');
      return;
    }

    const src = AUDIO_CONFIG.sfx[type as keyof typeof AUDIO_CONFIG.sfx];
    if (src) {
      let audio = this.sfxAudioCache.get(type);
      if (!audio) {
        audio = new Audio(src);
        audio.volume = Math.min(1, this.volume * 1.2);
        this.sfxAudioCache.set(type, audio);
      }
      audio.currentTime = 0;
      audio.play().catch(() => {
        this.synthSfx(type);
      });
    } else {
      this.synthSfx(type);
    }
  }

  // Pure Web Audio API synthesizers for instant guaranteed feedback
  private synthSfx(type: 'click' | 'achievement' | 'confetti' | 'glitch' | 'scan' | 'success' | 'ecg') {
    const ctx = this.initAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const masterGain = this.volume;

    switch (type) {
      case 'ecg':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.3 * masterGain, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      case 'click':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(240, now + 0.05);
        gain.gain.setValueAtTime(0.3 * masterGain, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;

      case 'scan':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.15);
        osc.frequency.linearRampToValueAtTime(440, now + 0.25);
        gain.gain.setValueAtTime(0.2 * masterGain, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
        break;

      case 'glitch':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.setValueAtTime(360, now + 0.04);
        osc.frequency.setValueAtTime(90, now + 0.08);
        gain.gain.setValueAtTime(0.35 * masterGain, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
        break;

      case 'achievement': {
        // Major chord fanfare: C5, E5, G5, C6
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'sine';
          o.frequency.setValueAtTime(freq, now + idx * 0.08);
          g.gain.setValueAtTime(0.25 * masterGain, now + idx * 0.08);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(now + idx * 0.08);
          o.stop(now + idx * 0.08 + 0.35);
        });
        break;
      }

      case 'confetti':
      case 'success': {
        // Happy celebratory arpeggio: G4, B4, D5, G5
        const chimeNotes = [392.0, 493.88, 587.33, 783.99];
        chimeNotes.forEach((freq, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, now + idx * 0.06);
          g.gain.setValueAtTime(0.28 * masterGain, now + idx * 0.06);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(now + idx * 0.06);
          o.stop(now + idx * 0.06 + 0.4);
        });
        break;
      }
    }
  }

  // Synthesized Cyber Ambient Loop (when local mp3 is not present)
  private startSynthBgm() {
    if (this.synthBgmTimer) return;
    this.isBgmPlaying = true;
    this.notify();

    // Relaxed cyberpunk synth progression: Am - F - C - G
    const melodyScale = [220, 261.63, 329.63, 392, 440, 523.25]; // A minor pentatonic
    this.synthBgmStep = 0;

    const playPulse = () => {
      if (!this.bgmEnabled || this.muted) return;
      const ctx = this.initAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const note = melodyScale[this.synthBgmStep % melodyScale.length];
      this.synthBgmStep++;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, now);
      gain.gain.setValueAtTime(0.06 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.7);
    };

    playPulse();
    this.synthBgmTimer = setInterval(playPulse, 850);
  }

  private stopSynthBgm() {
    if (this.synthBgmTimer) {
      clearInterval(this.synthBgmTimer);
      this.synthBgmTimer = null;
    }
  }
}

export const soundEngine = new SoundEngine();
