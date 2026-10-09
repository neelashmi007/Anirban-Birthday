'use client';

import React, { useState } from 'react';
import { Terminal, Compass, ChevronLeft, ChevronRight, CheckCircle2, Lock } from 'lucide-react';
import { BIRTHDAY_CONTENT } from '@/content/birthday';
import { ChapterId } from '@/lib/types';
import { AudioWidget } from './AudioWidget';
import { soundEngine } from '@/lib/soundEngine';

interface NavbarProps {
  currentChapter: ChapterId;
  completedChapters: Set<ChapterId>;
  onSelectChapter: (chapter: ChapterId) => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentChapter,
  completedChapters,
  onSelectChapter,
  onOpenTerminal,
}) => {
  const [isChapterMenuOpen, setIsChapterMenuOpen] = useState(false);

  const chapters = BIRTHDAY_CONTENT.chapters;
  const currentChapterObj = chapters.find((c) => c.id === currentChapter) || chapters[0];
  const progressPercent = Math.round((currentChapter / (chapters.length - 1)) * 100);

  const handlePrev = () => {
    if (currentChapter > 0) {
      soundEngine.playSfx('click');
      onSelectChapter((currentChapter - 1) as ChapterId);
    }
  };

  const handleNext = () => {
    if (currentChapter < chapters.length - 1) {
      soundEngine.playSfx('click');
      onSelectChapter((currentChapter + 1) as ChapterId);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 backdrop-blur-md">
        {/* Top Slim Progress Bar */}
        <div className="w-full bg-slate-900/90 h-1">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-purple-500 to-amber-400 transition-all duration-500"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2">
          {/* Brand & Codename */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playSfx('click');
                onSelectChapter(0);
              }}
              className="flex items-center gap-2 group text-left"
              title="Return to Greeting"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs group-hover:scale-105 transition-transform">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-bold text-xs tracking-wider text-slate-100 group-hover:text-emerald-400 transition-colors">
                  ANIRBAN.EXE
                </span>
                <span className="text-[9px] font-mono text-emerald-500/80 hidden xs:inline">
                  THE BIRTHDAY INCIDENT
                </span>
              </div>
            </button>
          </div>

          {/* Chapter Selector & Quick Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Chapter Navigator Pill */}
            <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-full px-2 py-0.5 text-xs font-mono">
              <button
                onClick={handlePrev}
                disabled={currentChapter === 0}
                className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Previous Chapter"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playSfx('click');
                  setIsChapterMenuOpen(true);
                }}
                className="px-2 py-0.5 text-slate-300 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
                title="View All Chapters"
              >
                <Compass className="w-3 h-3 text-emerald-400" />
                <span className="font-bold text-emerald-400">CH {currentChapter}</span>
                <span className="hidden md:inline text-slate-400 font-normal">
                  / {chapters.length - 1}: {currentChapterObj.navLabel}
                </span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentChapter >= chapters.length - 1}
                className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Next Chapter"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Secret Terminal Icon */}
            <button
              onClick={() => {
                soundEngine.playSfx('scan');
                onOpenTerminal();
              }}
              className="p-2 rounded-full bg-slate-900/80 border border-slate-800 text-emerald-400 hover:bg-emerald-950/60 hover:border-emerald-500/50 transition-all hover:scale-105"
              title="Open Secret Dev Terminal"
              aria-label="Open Secret Dev Terminal"
            >
              <Terminal className="w-3.5 h-3.5" />
            </button>

            {/* Persistent Audio Controls */}
            <AudioWidget />
          </div>
        </div>
      </header>

      {/* Chapter Selection Drawer Modal */}
      {isChapterMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsChapterMenuOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#0d111a] border border-emerald-500/40 rounded-2xl p-5 shadow-2xl space-y-4 font-mono text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-emerald-400 font-bold tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4" /> INVESTIGATION CHAPTER INDEX
              </span>
              <button
                onClick={() => setIsChapterMenuOpen(false)}
                className="text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <p className="text-[11px] text-slate-400 font-sans">
              Jump directly to any chapter. Revisit memories or review past diagnostics at any time:
            </p>

            <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
              {chapters.map((ch) => {
                const isCurrent = ch.id === currentChapter;
                const isCompleted = completedChapters.has(ch.id as ChapterId);

                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      soundEngine.playSfx('click');
                      onSelectChapter(ch.id as ChapterId);
                      setIsChapterMenuOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                      isCurrent
                        ? 'bg-emerald-950/70 border-emerald-500/70 text-emerald-300'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-emerald-400">
                        {String(ch.id).padStart(2, '0')}
                      </span>
                      <span className="font-sans font-medium text-xs">
                        {ch.title.replace(/^Chapter \d+: /, '')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isCompleted ? (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Done
                        </span>
                      ) : isCurrent ? (
                        <span className="text-[10px] bg-emerald-500 text-black px-1.5 py-0.5 rounded font-bold">
                          ACTIVE
                        </span>
                      ) : (
                        <Lock className="w-3 h-3 text-slate-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
