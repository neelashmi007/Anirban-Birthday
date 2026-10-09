# Audio Assets Directory

Optional audio files for background music and sound effects.

### Expected filenames:
* `birthday-theme.mp3` — Background music loop (synthwave / cyber lofi / birthday theme)
* `click.mp3` — Interface button click sound effect
* `achievement.mp3` — Achievement unlock fanfare
* `confetti.mp3` — Confetti celebration sound effect
* `glitch.mp3` — System notification / glitch buzz
* `scan.mp3` — Diagnostic telemetry radar sweep
* `success.mp3` — Success chime

### Built-in Web Audio Fallback:
Even if no audio files are added to this folder, the website automatically uses the Web Audio API synthesizer to generate retro arcade tones, chimes, scanner sweeps, and ambient music out of the box!
You can adjust volume and defaults in `content/audio.ts`.
