'use client';

import React, { useEffect, useState } from 'react';
import { Terminal, X, ShieldAlert, Cpu } from 'lucide-react';
import { BIRTHDAY_CONTENT } from '@/content/birthday';
import { soundEngine } from '@/lib/soundEngine';

interface SecretTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretTerminalModal: React.FC<SecretTerminalModalProps> = ({ isOpen, onClose }) => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = BIRTHDAY_CONTENT.easterEggs.secretTerminalMemoBody;

  useEffect(() => {
    if (isOpen) {
      soundEngine.playSfx('scan');
      let i = 0;
      setDisplayedText('');
      const interval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayedText(fullText.slice(0, i + 1));
          i += 3;
        } else {
          setDisplayedText(fullText);
          clearInterval(interval);
        }
      }, 15);
      return () => clearInterval(interval);
    }
  }, [isOpen, fullText]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0b0f19] border-2 border-emerald-500/50 rounded-xl shadow-2xl overflow-hidden text-emerald-400 font-mono text-xs sm:text-sm glow-green">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-emerald-500/30">
          <div className="flex items-center gap-2 text-emerald-300">
            <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="font-bold tracking-wide">SECURE_DEV_MEMO.SH [ANIRBAN.EXE]</span>
          </div>
          <button
            onClick={() => {
              soundEngine.playSfx('click');
              onClose();
            }}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="flex items-center gap-2 text-amber-400/90 text-xs pb-1 border-b border-slate-800">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>CLASSIFIED: FRIENDSHIP ENCRYPTION PROTOCOL [DEC-JAN VALIDATED]</span>
          </div>

          <pre className="whitespace-pre-wrap font-mono text-emerald-300/95 leading-relaxed bg-black/40 p-4 rounded-lg border border-emerald-500/20 text-[11px] sm:text-xs">
            {displayedText}
            <span className="inline-block w-2 h-4 ml-1 bg-emerald-400 animate-pulse align-middle" />
          </pre>

          <div className="flex items-center justify-between pt-2 text-[10px] text-slate-400 border-t border-slate-800">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-cyan-400" /> KERNEL: MEMORY_IMMUTABLE
            </span>
            <button
              onClick={() => {
                soundEngine.playSfx('click');
                onClose();
              }}
              className="px-3 py-1 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 rounded transition-all"
            >
              ACKNOWLEDGE & EXIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
