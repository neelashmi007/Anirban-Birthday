# ANIRBAN.EXE — THE BIRTHDAY INCIDENT 🎂🩺🕵️‍♂️
### MBBS CHAOS UPDATE & SHINCHAN SOUNDTRACK EDITION

An interactive, mobile-first birthday experience and humorous investigation into the existence of Anirban, featuring an MBBS medical parody theme, interactive clinical case sheet, oral viva simulation, and the iconic Shinchan soundtrack.

---

## 🌟 Features & Chapters

* **Chapter 0: The Birthday Greeting** — Cinematic opening with immediate background music autoplay (**Mera Naam Bhi Shinchan Hai**) and hospital emergency dispatch notice.
* **Chapter 1: CASE FILE: ANIRBAN** — Parody MBBS clinical case sheet (Department of Academic Negligence, Provisional Diagnosis: Acute-on-Chronic Syllabus Deficiency Syndrome, Prognosis: Legend), bedside patient monitor with animated ECG rhythm, live vitals, and clickable investigation tabs.
* **Chapter 2: The Syllabus Crisis & Forensic Autopsy** — Interactive Syllabus Completion Simulator coupled with the dramatic **Post-Examination Report: Syllabus** forensic autopsy report with redacted text.
* **Chapter 3: Anirban’s Viva Nightmare** — Interactive oral viva simulator with 6 subject stations (Anatomy, Physiology, Biochemistry, Pathology, Pharmacology, Microbiology), student-relatable questions, live scoring, and funny faculty verdicts.
* **Chapter 4: The Height Department** — Vertical anomaly division, animated height measuring scanner ("Too legendary to quantify"), and Civil Aviation radar clearance.
* **Chapter 5: The Overthinking Simulator** — Neural diagnostic scenario ("You sent a message. The other person has not replied for seven minutes...") with distinct humorous hypothesis trees and an affectionate counterbalance honoring his genuine care and reliability.
* **Chapter 6: The Mimicry Hall of Fame** — Video-game awards room honoring his goated mimicry with **The Golden Impression Award**, spotlight glows, and the interactive **"Activate Mimicry Mode"** evaluation matrix.
* **Chapter 7: MBBS Survival Kit & Fake Prescription** — Interactive 7-item collectible survival inventory (The Sacred Coffee Cup, Last-Minute Notes, 2 AM Motivation Potion, PYQ Scroll, Stethoscope, etc.) unlocking the *"Survived Another Day of MBBS"* badge, plus an authentic Rx prescription pad with official Dr. stamp.
* **Chapter 8: Achievements & Legend Ranking** — RPG character sheet (LVL 99 Birthday Protagonist, Class: Future Doctor / Tall Tactician) with unlockable medical & personality badges.
* **Chapter 9: The Friendship Gallery** — Polaroid-style scrapbook with Anirban's real photos (`1.jpeg` to `7.jpeg`), face-centered framing, and fullscreen Lightbox.
* **Chapter 10: The Final Letter** — Quiet, elegant transition without glitch effects; heartfelt letter honoring his support through **December 2025 and January 2026**; confetti celebration with "Accept Your Legend Status".

### 🎧 Sound Architecture
* Built-in **Web Audio API synthesizer** generating real retro arcade chimes, scanner sweeps, achievement fanfares, and ambient cyber music even if no external MP3 files are present.
* Drop real MP3 files anytime into `public/audio/`.
* Persistent, unobtrusive floating audio dock with independent BGM/SFX toggles and volume control matrix.

### 🕵️ Easter Eggs Included
1. **Classification Badge Override** — Tap the "CERTIFIED LEGEND" badge in Chapter 1 five times to unlock secret clearance privileges.
2. **Secret Academic Architect** — Trigger the panic simulator in Chapter 2 to unlock the hidden "4:00 AM Cramming Architect" badge.
3. **Secret Author Terminal** — Click the terminal icon (`>_`) in the top navigation or bottom footer to open a direct confidential memorandum from the author.
4. **Golden Mic Inspection** — Click the golden microphone in Chapter 5 to read confidential judging panel notes.

---

## 🚀 Running Locally

1. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser (or your phone on the local Wi-Fi network).

---

## 🛠️ Personalization & Customization Guide

All personal text, jokes, photos, and audio are centralized in clean TypeScript files under `/content/`.

### 1. Adding Real Photos
1. Put your photos into `public/images/`:
   - `friendship-01.jpg`
   - `friendship-02.jpg`
   - `friendship-03.jpg`
   - `friendship-04.jpg`
   - etc.
2. Open [`content/gallery.ts`](file:///c:/Users/Administrator/Documents/Anirban%20Birthday/content/gallery.ts) to update captions, dates, or add more photos:
   ```ts
   {
     id: 'photo-1',
     src: '/images/friendship-01.jpg',
     caption: 'A certified legendary moment.',
     subcaption: 'One for the permanent archives.',
     date: 'Chapter: The Early Days',
     tag: 'ARCHIVE #01',
   }
   ```
   *Note: If no images are placed in `public/images/`, the site renders elegant polaroid placeholder art cards with zero broken image icons.*

### 2. Customizing Jokes, Letter & Text
Open [`content/birthday.ts`](file:///c:/Users/Administrator/Documents/Anirban%20Birthday/content/birthday.ts) to edit:
* Subject profile and codenames
* Simulator choices and funny outcomes
* Height department dispatches and messages
* Overthinking hypotheses
* The heartfelt final letter paragraphs and emotional memories

### 3. Adding Custom Audio Files
Place any MP3 audio files in `public/audio/`:
* `birthday-theme.mp3` — Background music
* `click.mp3` — Button click effect
* `achievement.mp3` — Fanfare chime
* `confetti.mp3` — Celebration sound
* `scan.mp3` — Radar/scanner effect
Settings and volume can be tweaked in [`content/audio.ts`](file:///c:/Users/Administrator/Documents/Anirban%20Birthday/content/audio.ts).

---

## 🚢 Deployment to Vercel (Free & Instant)

This project is built with Next.js App Router and is 100% serverless with zero external database dependencies:

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Anirban.exe Birthday Website"
   git remote add origin https://github.com/your-username/anirban-birthday.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository and click **Deploy**.
4. Send the generated link directly to Anirban on his birthday!

---

## 📱 Mobile-First Verification
* Touch targets $\ge 44\text{px}$
* Fluid responsive typography
* No horizontal scroll or overflow
* Hardware-accelerated animations respecting `prefers-reduced-motion`
