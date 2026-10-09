'use client';

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, Sparkles, Tag } from 'lucide-react';
import { PhotoEntry } from '@/content/gallery';
import { soundEngine } from '@/lib/soundEngine';

interface LightboxProps {
  photos: PhotoEntry[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEngine.playSfx('click');
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const prev = (currentIndex - 1 + photos.length) % photos.length;
        soundEngine.playSfx('click');
        onNavigate(prev);
      } else if (e.key === 'ArrowRight') {
        const next = (currentIndex + 1) % photos.length;
        soundEngine.playSfx('click');
        onNavigate(next);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, photos.length, onClose, onNavigate]);

  if (currentIndex === null || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSfx('click');
    onNavigate((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSfx('click');
    onNavigate((currentIndex + 1) % photos.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      {/* Top Bar Controls */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <span className="text-slate-400 font-mono text-xs hidden sm:inline">
          {currentIndex + 1} / {photos.length}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            soundEngine.playSfx('click');
            onClose();
          }}
          className="p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev Navigation Button */}
      {photos.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-50 p-2.5 sm:p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-transform active:scale-90"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Next Navigation Button */}
      {photos.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-transform active:scale-90"
          aria-label="Next photograph"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Lightbox Content Container */}
      <div
        className="relative max-w-3xl w-full max-h-[90vh] flex flex-col items-center justify-center overflow-hidden rounded-2xl glass-panel-accent p-2 sm:p-4 border border-emerald-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo Display with Image Fallback */}
        <div className="relative w-full max-h-[62vh] min-h-[260px] sm:min-h-[360px] flex items-center justify-center bg-black/60 rounded-xl overflow-hidden border border-slate-800">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            className="max-h-[62vh] w-auto max-w-full object-contain rounded-lg transition-opacity duration-300"
            onError={(e) => {
              // Hide broken image icon and reveal graceful placeholder
              e.currentTarget.style.display = 'none';
              const placeholder = e.currentTarget.parentElement?.querySelector('.photo-fallback');
              if (placeholder) {
                (placeholder as HTMLElement).style.display = 'flex';
              }
            }}
          />

          {/* Graceful Fallback Art Card if photo file is not found */}
          <div
            className="photo-fallback hidden absolute inset-0 flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"
            style={{ display: 'none' }}
          >
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center mb-3 text-emerald-400">
              <Camera className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold mb-1">
              {currentPhoto.tag || 'ARCHIVED FRIENDSHIP MOMENT'}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-200 mb-2">
              {currentPhoto.caption}
            </h4>
            <p className="text-xs text-slate-400 max-w-md mb-3">
              Photo placeholder ready for Anirban! You can drop an image named{' '}
              <code className="text-emerald-300 bg-black/50 px-1.5 py-0.5 rounded font-mono">
                {currentPhoto.src.replace('/images/', '')}
              </code>{' '}
              into <code className="text-emerald-300 bg-black/50 px-1.5 py-0.5 rounded font-mono">public/images/</code> to display your picture here.
            </p>
            <div className="inline-flex items-center gap-1 text-[11px] font-mono text-purple-300 bg-purple-950/40 border border-purple-500/30 px-2.5 py-1 rounded-full">
              <Sparkles className="w-3 h-3 text-purple-400" /> Friendship Verified
            </div>
          </div>
        </div>

        {/* Caption & Metadata Footer */}
        <div className="w-full mt-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {currentPhoto.tag && (
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-mono text-[10px] font-bold">
                  {currentPhoto.tag}
                </span>
              )}
              {currentPhoto.date && (
                <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                  <Tag className="w-3 h-3 text-slate-500" />
                  {currentPhoto.date}
                </span>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-100 font-sans">
              {currentPhoto.caption}
            </h3>
            {currentPhoto.subcaption && (
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                {currentPhoto.subcaption}
              </p>
            )}
          </div>

          <div className="text-[11px] font-mono text-slate-400 sm:text-right shrink-0">
            Memory {currentIndex + 1} of {photos.length}
          </div>
        </div>
      </div>
    </div>
  );
};
