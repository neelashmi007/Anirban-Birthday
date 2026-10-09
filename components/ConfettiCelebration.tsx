'use client';

import confetti from 'canvas-confetti';
import { soundEngine } from '@/lib/soundEngine';

export const triggerLegendCelebration = () => {
  soundEngine.playSfx('confetti');

  // Multi-cannon confetti bursts
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  const fire = (particleRatio: number, opts: confetti.Options) => {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  };

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#10b981', '#a855f7', '#f59e0b', '#06b6d4'],
  });

  fire(0.2, {
    spread: 60,
    colors: ['#ec4899', '#8b5cf6', '#3b82f6'],
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#10b981', '#fbbf24', '#f43f5e'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#a855f7', '#6366f1', '#34d399'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#ffd700', '#ff69b4', '#00ffff'],
  });

  // Secondary firework bursts after 700ms
  setTimeout(() => {
    soundEngine.playSfx('achievement');
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      zIndex: 9999,
      colors: ['#10b981', '#38bdf8', '#fbbf24'],
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      zIndex: 9999,
      colors: ['#ec4899', '#a855f7', '#4ade80'],
    });
  }, 700);
};
