'use client';

import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Sparkles, ArrowRight, Maximize2, Tag, HelpCircle } from 'lucide-react';
import { GALLERY_CONFIG, PhotoEntry } from '@/content/gallery';
import { Lightbox } from '@/components/Lightbox';
import { soundEngine } from '@/lib/soundEngine';

interface Chapter7Props {
  onContinue: () => void;
}

export const Chapter7Gallery: React.FC<Chapter7Props> = ({ onContinue }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const photos = GALLERY_CONFIG.photos;

  const handleOpenPhoto = (idx: number) => {
    soundEngine.playSfx('click');
    setLightboxIndex(idx);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Chapter Title */}
      <div className="space-y-2 text-center sm:text-left border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 text-xs font-mono border border-emerald-500/30">
          <Camera className="w-3.5 h-3.5" />
          <span>CLASSIFIED PHOTOGRAPHIC ARCHIVES</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
          {GALLERY_CONFIG.sectionTitle}
        </h2>
        <p className="text-sm text-slate-400 font-sans">
          {GALLERY_CONFIG.sectionSubtitle}
        </p>
      </div>

      {/* Helpful Instructions Banner */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-sans text-xs">
            {GALLERY_CONFIG.instructionNote}
          </span>
        </div>
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="text-emerald-400 hover:text-emerald-300 text-xs shrink-0 flex items-center gap-1 underline underline-offset-4"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          {showInstructions ? 'Hide Guide' : 'How to add photos'}
        </button>
      </div>

      {/* Instructions Drawer */}
      {showInstructions && (
        <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 font-mono text-xs text-slate-300 space-y-2 animate-fadeIn">
          <p className="text-emerald-400 font-bold">Quick Image Replacement Guide:</p>
          <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
            <li>Place your image files in the <code className="text-emerald-300">public/images/</code> folder.</li>
            <li>Name them <code className="text-emerald-300">friendship-01.jpg</code>, <code className="text-emerald-300">friendship-02.jpg</code>, etc.</li>
            <li>Edit captions or add more memories anytime in <code className="text-emerald-300">content/gallery.ts</code>!</li>
          </ol>
        </div>
      )}

      {/* Polaroid Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {photos.map((photo, idx) => (
          <div
            key={photo.id}
            onClick={() => handleOpenPhoto(idx)}
            className="group relative cursor-pointer transform hover:-translate-y-1.5 transition-all duration-300"
            style={{
              transform: `rotate(${photo.polaroidAngle || 0}deg)`,
            }}
          >
            {/* Polaroid Frame Container */}
            <div className="bg-[#12151f] p-3 rounded-2xl border border-slate-700/80 shadow-xl group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/10 flex flex-col justify-between">
              {/* Photo Area */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  style={{ objectPosition: photo.objectPosition || 'center 20%' }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Graceful fallback when user has not yet dropped actual photo file
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.polaroid-fallback');
                    if (fallback) {
                      (fallback as HTMLElement).style.display = 'flex';
                    }
                  }}
                />

                {/* Graceful Fallback Card */}
                <div
                  className="polaroid-fallback hidden absolute inset-0 flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-slate-900 to-[#0e1320]"
                  style={{ display: 'none' }}
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold mb-1">
                    {photo.tag}
                  </span>
                  <span className="text-xs font-bold text-slate-200 line-clamp-1">
                    {photo.caption}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">
                    Click to view details
                  </span>
                </div>

                {/* Hover Maximize Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white font-mono text-xs">
                  <Maximize2 className="w-4 h-4 text-emerald-400" />
                  <span>Expand Photo</span>
                </div>
              </div>

              {/* Polaroid Bottom Notes */}
              <div className="pt-3 pb-1 px-1 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="text-emerald-400/90 font-bold">{photo.tag}</span>
                  {photo.date && <span>{photo.date}</span>}
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-100 font-sans line-clamp-1">
                  {photo.caption}
                </h4>
                {photo.subcaption && (
                  <p className="text-[11px] text-slate-400 font-sans line-clamp-2">
                    {photo.subcaption}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        photos={photos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* Navigation Footer */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="text-xs text-slate-400 font-sans">
          Photographic archives reviewed. Proceeding to the final conclusion...
        </div>

        <button
          id="btn-continue-to-letter"
          onClick={() => {
            soundEngine.playSfx('click');
            onContinue();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>PROCEED TO CHAPTER 10: THE FINAL LETTER</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
