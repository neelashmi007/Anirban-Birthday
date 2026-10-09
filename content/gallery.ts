export interface PhotoEntry {
  id: string;
  src: string;
  alt: string;
  caption: string;
  subcaption?: string;
  date?: string;
  polaroidAngle?: number; // subtle tilt angle in degrees for realistic polaroid effect
  tag?: string;
  objectPosition?: string; // CSS object-position for perfect face centering
}

export const GALLERY_CONFIG = {
  sectionTitle: 'THE FRIENDSHIP ARCHIVES',
  sectionSubtitle: 'Classified photographic evidence of one of the greatest friendships on record.',
  instructionNote: 'Captured moments of Anirban: funny, tall, dependable, and an absolute legend.',
  photos: [
    {
      id: 'photo-1',
      src: '/images/1.jpeg',
      alt: 'Memory 01 — Anirban',
      caption: 'A certified legendary moment.',
      subcaption: 'Widest and Tallest in one frame',
      date: 'The Early Days',
      polaroidAngle: -2.5,
      tag: 'ARCHIVE #01',
      objectPosition: 'center top',
    },
    {
      id: 'photo-2',
      src: '/images/2.jpeg',
      alt: 'Memory 02 — Anirban',
      caption: 'Another memory worth keeping.',
      subcaption: 'Standard height anomaly detected in frame.',
      date: 'Prime Shenanigans',
      polaroidAngle: 1.8,
      tag: 'ARCHIVE #02',
      objectPosition: 'center 22%',
    },
    {
      id: 'photo-3',
      src: '/images/3.jpeg',
      alt: 'Memory 03 — Anirban',
      caption: 'More evidence of an excellent friendship.',
      subcaption: 'Nigga tryna aurafarm',
      date: 'Unfiltered Chaos',
      polaroidAngle: -1.5,
      tag: 'ARCHIVE #03',
      objectPosition: 'center 20%',
    },
    {
      id: 'photo-4',
      src: '/images/4.jpeg',
      alt: 'Memory 04 — Anirban',
      caption: 'One for the archives.',
      subcaption: 'Mosshair man',
      date: 'The Anchor',
      polaroidAngle: 2.2,
      tag: 'ARCHIVE #04',
      objectPosition: 'center top',
    },
    {
      id: 'photo-5',
      src: '/images/5.jpeg',
      alt: 'Memory 05 — Anirban',
      caption: 'Unmatched conversational mimicry in progress.',
      subcaption: 'Damn bro really flow me a river',
      date: 'Pure Gold',
      polaroidAngle: -2.0,
      tag: 'ARCHIVE #05',
      objectPosition: 'center 30%',
    },
    {
      id: 'photo-6',
      src: '/images/6.jpeg',
      alt: 'Memory 06 — Anirban',
      caption: 'Genuine support and unforgettable laughs.',
      subcaption: 'A monkey at its habitat',
      date: 'Forever Legend',
      polaroidAngle: 1.5,
      tag: 'ARCHIVE #06',
      objectPosition: 'center 22%',
    },
    {
      id: 'photo-7',
      src: '/images/7.jpeg',
      alt: 'Memory 07 — Anirban',
      caption: 'Future doctor, current menace, and brother.',
      subcaption: 'Mosshair (  but covered )',
      date: 'Hall of Fame',
      polaroidAngle: -1.8,
      tag: 'ARCHIVE #07',
      objectPosition: 'center 20%',
    },
  ] as PhotoEntry[],
};
