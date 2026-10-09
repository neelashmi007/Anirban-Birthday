'use client';

import React, { useState, useEffect } from 'react';
import { ChapterId } from '@/lib/types';
import { Navbar } from '@/components/Navbar';
import { SecretTerminalModal } from '@/components/SecretTerminalModal';
import { SecretClearanceModal } from '@/components/SecretClearanceModal';
import { Chapter0Greeting } from '@/components/chapters/Chapter0Greeting';
import { Chapter1MedicalCase } from '@/components/chapters/Chapter1MedicalCase';
import { Chapter2SyllabusAutopsy } from '@/components/chapters/Chapter2SyllabusAutopsy';
import { Chapter3VivaNightmare } from '@/components/chapters/Chapter3VivaNightmare';
import { Chapter3Height } from '@/components/chapters/Chapter3Height';
import { Chapter4Overthinking } from '@/components/chapters/Chapter4Overthinking';
import { Chapter5Mimicry } from '@/components/chapters/Chapter5Mimicry';
import { Chapter7MbbsSurvival } from '@/components/chapters/Chapter7MbbsSurvival';
import { Chapter6Achievements } from '@/components/chapters/Chapter6Achievements';
import { Chapter7Gallery } from '@/components/chapters/Chapter7Gallery';
import { Chapter8Letter } from '@/components/chapters/Chapter8Letter';
import { soundEngine } from '@/lib/soundEngine';
import { Terminal, Stethoscope, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONTENT } from '@/content/birthday';

export default function BirthdayApp() {
  const [currentChapter, setCurrentChapter] = useState<ChapterId>(0);
  const [completedChapters, setCompletedChapters] = useState<Set<ChapterId>>(new Set([0]));
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(
    new Set([
      'reliable_when_it_matters',
      'certified_legend',
      'future_doctor_current_menace',
      'friendship_prognosis_excellent',
    ])
  );
  const [secretTerminalOpen, setSecretTerminalOpen] = useState(false);
  const [secretClearanceModalOpen, setSecretClearanceModalOpen] = useState(false);

  // Medical Easter Eggs Tracking
  const [medicalEasterEggsFound, setMedicalEasterEggsFound] = useState<Set<string>>(new Set());
  const [mysteryConquerorAwarded, setMysteryConquerorAwarded] = useState(false);

  // Auto-scroll to top smoothly whenever chapter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentChapter]);

  // Instant background music autoplay the moment the website is started
  useEffect(() => {
    soundEngine.playBgm();

    // Fallback if browser requires interaction before audio unmuting:
    const handleGesture = () => {
      soundEngine.playBgm();
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };

    window.addEventListener('click', handleGesture, { once: true });
    window.addEventListener('touchstart', handleGesture, { once: true });
    window.addEventListener('keydown', handleGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };
  }, []);

  const advanceChapter = (nextCh: ChapterId) => {
    setCompletedChapters((prev) => new Set([...prev, currentChapter, nextCh]));
    setCurrentChapter(nextCh);
  };

  const handleSelectChapter = (ch: ChapterId) => {
    setCurrentChapter(ch);
  };

  const handleUnlockAchievement = (id: string) => {
    setUnlockedAchievements((prev) => new Set([...prev, id]));
  };

  const handleMedicalEasterEgg = (eggKey: string) => {
    const updated = new Set([...medicalEasterEggsFound, eggKey]);
    setMedicalEasterEggsFound(updated);

    // If user has found at least 3 medical easter eggs, award the secret MBBS Mystery Conqueror badge!
    if (updated.size >= 3 && !mysteryConquerorAwarded) {
      setMysteryConquerorAwarded(true);
      handleUnlockAchievement('mbbs_mystery_conqueror');
      soundEngine.playSfx('achievement');
    }
  };

  const handleResetAll = () => {
    setCurrentChapter(0);
    setCompletedChapters(new Set([0]));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07080c] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300 relative">
      {/* Subtle Scanlines and Glow Effects */}
      <div className="fixed inset-0 pointer-events-none scanlines z-30 opacity-40" />

      {/* Persistent Navigation Bar */}
      <Navbar
        currentChapter={currentChapter}
        completedChapters={completedChapters}
        onSelectChapter={handleSelectChapter}
        onOpenTerminal={() => setSecretTerminalOpen(true)}
      />

      {/* Main Chapter Content Container */}
      <main className="flex-1 w-full relative z-10">
        {currentChapter === 0 && (
          <Chapter0Greeting onContinue={() => advanceChapter(1)} />
        )}

        {currentChapter === 1 && (
          <Chapter1MedicalCase
            onContinue={() => advanceChapter(2)}
            onOpenClearanceEasterEgg={() => setSecretClearanceModalOpen(true)}
            onTriggerMedicalEasterEgg={handleMedicalEasterEgg}
          />
        )}

        {currentChapter === 2 && (
          <Chapter2SyllabusAutopsy
            onContinue={() => advanceChapter(3)}
            onUnlockAchievement={handleUnlockAchievement}
          />
        )}

        {currentChapter === 3 && (
          <Chapter3VivaNightmare
            onContinue={() => advanceChapter(4)}
            onUnlockAchievement={handleUnlockAchievement}
            onTriggerMedicalEasterEgg={handleMedicalEasterEgg}
          />
        )}

        {currentChapter === 4 && (
          <Chapter3Height
            onContinue={() => advanceChapter(5)}
            onUnlockAchievement={handleUnlockAchievement}
          />
        )}

        {currentChapter === 5 && (
          <Chapter4Overthinking
            onContinue={() => advanceChapter(6)}
            onUnlockAchievement={handleUnlockAchievement}
          />
        )}

        {currentChapter === 6 && (
          <Chapter5Mimicry
            onContinue={() => advanceChapter(7)}
            onUnlockAchievement={handleUnlockAchievement}
          />
        )}

        {currentChapter === 7 && (
          <Chapter7MbbsSurvival
            onContinue={() => advanceChapter(8)}
            onUnlockAchievement={handleUnlockAchievement}
          />
        )}

        {currentChapter === 8 && (
          <Chapter6Achievements
            unlockedAchievements={unlockedAchievements}
            onContinue={() => advanceChapter(9)}
          />
        )}

        {currentChapter === 9 && (
          <Chapter7Gallery onContinue={() => advanceChapter(10)} />
        )}

        {currentChapter === 10 && (
          <Chapter8Letter
            onRevisitGallery={() => setCurrentChapter(9)}
            onReplayAll={handleResetAll}
          />
        )}
      </main>

      {/* Mystery Conqueror Banner Toast when awarded */}
      {mysteryConquerorAwarded && (
        <aside aria-label="Secret Achievement Notification" className="fixed bottom-4 right-4 z-40 max-w-sm p-4 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-teal-950/90 to-purple-950/90 border-2 border-emerald-500/60 shadow-2xl animate-fadeIn glow-green">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <Stethoscope className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-emerald-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> SECRET BADGE UNLOCKED!
              </div>
              <div className="text-sm font-bold text-white font-mono">MBBS Mystery Conqueror</div>
              <p className="text-[11px] text-slate-300 font-sans mt-0.5">
                {BIRTHDAY_CONTENT.easterEggs.medicalEasterEggs.mysteryConqueror.message}
              </p>
            </div>
          </div>
        </aside>
      )}

      {/* Persistent Bottom Footer */}
      <footer className="w-full border-t border-slate-900 bg-black/60 py-6 px-4 text-center font-mono text-xs text-slate-400 space-y-2 relative z-20">
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
          <span className="text-slate-300">ANIRBAN.EXE // MBBS CHAOS EDITION</span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">DEPARTMENT OF ACADEMIC NEGLIGENCE</span>
          <span>•</span>
          <button
            onClick={() => {
              soundEngine.playSfx('scan');
              setSecretTerminalOpen(true);
            }}
            className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 underline underline-offset-4"
          >
            <Terminal className="w-3 h-3" /> Author Memo
          </button>
          <span>•</span>
          <button
            onClick={handleResetAll}
            className="hover:text-white transition-colors"
          >
            Reset Experience
          </button>
        </div>

        <p className="text-[10px] text-slate-400 font-sans flex items-center justify-center gap-1">
          Made with admiration, caffeine infusions, exaggerated medical case sheets, and zero completed syllabus.
        </p>
      </footer>

      {/* Easter Egg Modals */}
      <SecretTerminalModal
        isOpen={secretTerminalOpen}
        onClose={() => setSecretTerminalOpen(false)}
      />

      <SecretClearanceModal
        isOpen={secretClearanceModalOpen}
        onClose={() => setSecretClearanceModalOpen(false)}
      />
    </div>
  );
}
