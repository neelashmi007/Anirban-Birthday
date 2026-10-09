export interface AudioConfig {
  bgm: {
    src: string;
    defaultVolume: number;
    title: string;
    artist: string;
  };
  sfx: {
    click: string;
    achievement: string;
    confetti: string;
    glitch: string;
    scan: string;
    success: string;
    ecg: string;
  };
}

export const AUDIO_CONFIG: AudioConfig = {
  bgm: {
    src: '/audio/birthday-theme.mp3',
    defaultVolume: 0.5,
    title: 'Mera Naam Bhi Shinchan Hai (Birthday Theme)',
    artist: 'Shinchan Nostalgia Special',
  },
  sfx: {
    click: '/audio/click.mp3',
    achievement: '/audio/achievement.mp3',
    confetti: '/audio/confetti.mp3',
    glitch: '/audio/glitch.mp3',
    scan: '/audio/scan.mp3',
    success: '/audio/success.mp3',
    ecg: '/audio/scan.mp3',
  },
};
