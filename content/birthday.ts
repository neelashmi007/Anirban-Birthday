export interface SimulatorOption {
  id: string;
  label: string;
  iconName?: string;
  resultTitle: string;
  resultDescription: string;
  resultSeverity: 'safe' | 'warning' | 'critical' | 'chaotic';
  progressDelta: number; // effect on fake progress
}

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  chapterSource: number;
  category?: 'academic' | 'personality' | 'friendship' | 'medical';
  unlockedByDefault?: boolean;
}

export interface VivaQuestion {
  id: string;
  subject: string;
  icon: string;
  question: string;
  options: {
    id: string;
    label: string;
    explanation: string;
    score: number;
  }[];
}

export interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  flavorText: string;
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Mythic';
}

export const BIRTHDAY_CONTENT = {
  subject: {
    name: 'Anirban',
    codename: 'ANIRBAN.EXE',
    title: 'THE BIRTHDAY INCIDENT // MBBS CHAOS EDITION',
    subtitle: "An unauthorized clinical investigation into one future doctor's existence.",
    profession: 'MBBS Student & Certified Legend',
    relationshipDuration: 'Approximately 1.5 years',
    primaryTraits: [
      'Chronically Tall (Exceeds Hospital Bed)',
      'Syllabus Deficiency Syndrome (Stage 4)',
      'S-Tier Mimicry Virtuoso (Sounds Like The HOD)',
      'Professional Overthinker (37 Tabs Open in Brain)',
      'Suspiciously Reliable Legend (Prognosis: Unbeatable)',
    ],
    importantMemory: {
      period: 'December 2025 & January 2026',
      summary: 'He stood by me when I needed someone to be there. An irreplaceable act of genuine friendship.',
    },
  },

  chapters: [
    { id: 0, slug: 'greeting', title: 'Chapter 0: The Birthday Greeting', navLabel: 'Greeting' },
    { id: 1, slug: 'medical-case', title: 'Chapter 1: CASE FILE: ANIRBAN', navLabel: 'Case File' },
    { id: 2, slug: 'syllabus-autopsy', title: 'Chapter 2: The Syllabus Autopsy', navLabel: 'Autopsy' },
    { id: 3, slug: 'viva-nightmare', title: 'Chapter 3: Anirban’s Viva Nightmare', navLabel: 'Viva' },
    { id: 4, slug: 'height', title: 'Chapter 4: The Height Department', navLabel: 'Height' },
    { id: 5, slug: 'overthinking', title: 'Chapter 5: The Overthinking Simulator', navLabel: 'Brain OS' },
    { id: 6, slug: 'mimicry', title: 'Chapter 6: The Mimicry Hall of Fame', navLabel: 'Mimicry' },
    { id: 7, slug: 'mbbs-survival', title: 'Chapter 7: MBBS Survival Kit & Rx', navLabel: 'Rx & Kit' },
    { id: 8, slug: 'achievements', title: 'Chapter 8: Achievements & Legend Rank', navLabel: 'Badges' },
    { id: 9, slug: 'gallery', title: 'Chapter 9: The Friendship Gallery', navLabel: 'Archives' },
    { id: 10, slug: 'letter', title: 'Chapter 10: The Final Letter', navLabel: 'Letter' },
  ],

  // Chapter 0: The Greeting
  greeting: {
    headline: 'HAPPY BIRTHDAY, ANIRBAN.',
    subheadline: 'Today, we celebrate a future doctor and absolute legend. Unfortunately, the Department of Academic Negligence has also filed an urgent complaint.',
    ctaButton: 'BEGIN CLINICAL INVESTIGATION',
    initialNotice: {
      tag: 'HOSPITAL CLINICAL DISPATCH #MBBS-1024',
      message: 'NOTICE: Patient Anirban has been admitted for acute syllabus avoidance, suspicious height anomalies, and dangerously goated mimicry.',
      timestamp: 'STATUS: STAT EMERGENCY',
    },
    metaNote: 'Department of Friendship & Academic Emergencies • Security Clearance: SSS+',
  },

  // Chapter 1: Medical Case File (Case Sheet Parody)
  medicalCaseFile: {
    title: 'CLINICAL CASE SHEET: ANIRBAN',
    subtitle: 'Confidential Patient In-Patient Record // Department of Academic Negligence',
    caseNo: 'MED-IP-2026-LEGEND',
    patient: {
      name: 'Anirban',
      ageGender: '20s / Male',
      department: 'Department of Academic Negligence & Procrastination Medicine',
      chiefComplaint: 'Persistent, incurable inability to finish the syllabus prior to university examinations.',
      historyOfPresentIllness: 'Symptoms began on day 1 of MBBS. Dramatic clinical exacerbation observed at 2 weeks before exam. Severe acute spikes documented at 12 hours before viva.',
      associatedSymptoms: [
        'Excessive background overthinking (47 neural processes firing concurrently)',
        'Random, unprompted bursts of false confidence at 3:00 AM',
        'Suspiciously accurate mimicry of professors, batchmates, and innocent bystanders',
        'Chronic, refractory postponement of Chapter 1 in every textbook',
      ],
      positiveFindings: [
        'Extremely tall (fails all standard hospital bed framing parameters)',
        'Dependable and steadfast when friends need him most',
        'Certified 100% genuine legend',
      ],
      provisionalDiagnosis: 'Acute-on-Chronic Syllabus Deficiency Syndrome (ACSDS) with Concurrent Hyper-Reliability',
      prognosis: 'Excellent for lifelong friendship; extremely guarded for on-time syllabus completion.',
    },
    vitals: [
      { label: 'Pulse Rate', value: '118 bpm', status: 'Tachycardia when viva mentioned' },
      { label: 'Blood Pressure', value: '140/90 mmHg', status: 'Elevated during exam timetable drops' },
      { label: 'SpO2', value: '99% on Room Air', status: 'Optimal friendship oxygen saturation' },
      { label: 'Syllabus Level', value: '4.2%', status: 'Critically low (Sub-therapeutic)' },
      { label: 'Mimicry Index', value: '100/100', status: 'S-Tier / Clinically dangerous' },
    ],
    sections: [
      {
        id: 'gpe',
        name: 'General Physical Exam',
        findings: 'Patient is tall, conscious, oriented to time and memes, but completely disoriented to the exam date sheet. No clinical signs of studying observed.',
      },
      {
        id: 'systemic',
        name: 'Systemic Examination',
        findings: 'CVS: Normal S1 S2 heard. Tachycardia triggered by the word "Viva". CNS: 47 browser tabs actively running. Respiratory: Normal vesicular sounds, sighs deeply at neuroanatomy.',
      },
      {
        id: 'labs',
        name: 'Pathology & Lab Tests',
        findings: 'Hemoglobin: 14.5 g/dL (Adequate). Coffee in bloodstream: 82%. Syllabus completion antibody titers: Non-reactive (Zero immunity to exams).',
      },
      {
        id: 'plan',
        name: 'Proposed Management',
        findings: '1. Administer high-dose PYQ therapy. 2. Prescribe unconditional birthday celebration. 3. Re-audit syllabus in next lifetime.',
      },
    ],
    disclaimer: '* Official Birthday Comedy Parody. All medical findings are affectionate inside jokes and not actual medical records.',
  },

  // Chapter 1 Diagnostics Telemetry
  investigation: {
    title: 'SUBJECT DOSSIER & SYSTEM DIAGNOSTICS',
    badge: 'CLASSIFIED CASE FILE #007',
    profile: {
      subject: 'ANIRBAN',
      classification: 'CERTIFIED LEGEND',
      heightStatus: 'EXCEEDS STANDARD PARAMETERS',
      academicStatus: 'WORK IN PROGRESS (SINCE INCEPTION)',
      mimicryCapability: 'EXTREMELY DANGEROUS / GOATED',
      reliabilityIndex: 'SUSPICIOUSLY HIGH (100%)',
    },
    diagnosticSteps: [
      { text: 'Initializing birthday clinical protocol v2.4...', duration: 1100 },
      { text: 'Establishing secure link to patient Anirban...', duration: 900 },
      { text: 'Measuring vertical dimensions in real-time...', duration: 1200 },
      { text: 'WARNING: Subject exceeds standard hospital bed viewport.', duration: 1000 },
      { text: 'Searching for completed MBBS syllabus...', duration: 1300 },
      { text: 'Searching again across all hostel desks and lockers...', duration: 1100 },
      { text: 'Searching one last time in the recycling bin...', duration: 1200 },
      { text: 'Result: No conclusive evidence of completed syllabus found.', duration: 1300 },
      { text: 'Scanning vocal database for mimicry anomalies...', duration: 1000 },
      { text: 'Mimicry department has officially requested its own hospital wing.', duration: 1200 },
      { text: 'Cross-referencing loyalty and friendship index...', duration: 1100 },
      { text: 'Calculating final clinical disposition...', duration: 1000 },
      { text: 'FINAL CLASSIFICATION: ABSOLUTE LEGEND & FUTURE DOCTOR.', duration: 1500 },
    ],
  },

  // Chapter 2: The Syllabus Crisis & Autopsy
  syllabus: {
    title: 'THE SYLLABUS CRISIS & FORENSIC AUTOPSY',
    subtitle: 'A scientific inquiry into the mysterious demise of an MBBS study schedule.',
    metrics: [
      { label: 'Syllabus Completion', value: 'Currently negotiating', status: 'critical' },
      { label: 'Chapters Remaining', value: 'The number is classified', status: 'warning' },
      { label: 'Days Until Exam', value: 'A deeply personal attack', status: 'critical' },
      { label: 'Academic Confidence', value: 'Temporarily unavailable', status: 'neutral' },
      { label: 'Deadline Proximity', value: 'Alarmingly intimate', status: 'critical' },
      { label: 'Study Playlist Duration', value: '14 hrs 32 mins (0 pages read)', status: 'warning' },
    ],
    simulatorTitle: 'THE SYLLABUS COMPLETION SIMULATOR',
    simulatorIntro: 'Select Anirban’s next move to attempt syllabus resuscitation:',
    options: [
      {
        id: 'start_studying',
        label: 'Start studying immediately',
        resultTitle: 'The Wikipedia Rabbit Hole Anomaly',
        resultDescription: 'Subject opened textbook page 4. Encountered the word "osmosis", wondered who invented water filtration, and spent 52 minutes watching a documentary on ancient Roman plumbing.',
        resultSeverity: 'warning',
        progressDelta: 5,
      },
      {
        id: 'organize_materials',
        label: 'Organize study materials',
        resultTitle: 'Ergonomic Perfection Achieved',
        resultDescription: 'Highlighters arranged by spectral wavelength. Sticky notes color-coordinated in 5 distinct tactical zones. Zero sentences absorbed, but the desk looks like NASA control.',
        resultSeverity: 'safe',
        progressDelta: 8,
      },
      {
        id: 'short_break',
        label: 'Take a "quick 10-minute break"',
        resultTitle: 'Temporal Distortion Event',
        resultDescription: 'Subject closed eyes for a tactical 10-minute power recharge. Re-emerged 4 hours later in a completely different timeline wondering what year it is.',
        resultSeverity: 'chaotic',
        progressDelta: -12,
      },
      {
        id: 'unrelated_topic',
        label: 'Investigate an unrelated topic',
        resultTitle: 'Doctorate in Irrelevance',
        resultDescription: 'Syllabus successfully abandoned. Anirban is now an internationally unverified specialist on mechanical keyboard switches and 19th-century naval tactics.',
        resultSeverity: 'warning',
        progressDelta: -4,
      },
      {
        id: 'panic_professionally',
        label: 'Panic professionally',
        resultTitle: 'Calculated Mathematical Miracle',
        resultDescription: 'Calculated exact passing marks down to 7 decimal places. Created 3 separate contingency schedules. Syllabus remains 9.4% finished, but panic efficiency is at 100%.',
        resultSeverity: 'critical',
        progressDelta: 15,
      },
    ] as SimulatorOption[],
    unlockedAchievementId: 'master_of_almost_finishing',
  },

  // Autopsy Report Section in Chapter 2
  syllabusAutopsy: {
    caseNo: 'AUTOPSY-CASE #MBBS-SYLLABUS-001',
    structureExamined: 'The MBBS University Examination Syllabus',
    extentOfCompletion: 'CLASSIFIED / REDACTED (< 7.8%)',
    causeOfDeath: 'Fatal Acute Procrastination: "I will start tomorrow sharp at 6:00 PM"',
    timeOfDeath: 'The night before the examination (Approx. 03:42 AM)',
    contributingFactors: [
      'Excessive phone usage (Endless Instagram Reels at 1:30 AM)',
      'Severe cognitive overthinking regarding life, destiny, and the universe',
      'Unwarranted false confidence after reading 2 headings in Robbins/Guyton',
      'Construction of an architecturally impossible 24-hour study timetable',
    ],
    externalFindings: 'Textbook spine remains uncreased and pristine. Highlighters deployed aggressively on first 3 sentences only. Coffee cup stains detected on page 1.',
    internalFindings: 'Total necrosis of revision plans. Zero retention of biochemical pathways. Rapid proliferation of the phrase "Bro, important questions bata do."',
    finalImpression: 'A completely preventable, beautifully documented academic tragedy. The syllabus died peacefully in its sleep.',
    stampText: 'CAUSE OF DEATH: STARTING TOMORROW',
  },

  // Chapter 3: Anirban's Viva Nightmare (Interactive Simulator)
  vivaSimulator: {
    title: "ANIRBAN'S VIVA NIGHTMARE",
    subtitle: 'The Ultimate 1-on-1 Oral Examination Survival Gauntlet',
    intro: 'You are seated across from the External Examiner. Your lab coat is buttoned wrong. Your practical record has one missing signature. Choose your answers wisely.',
    questions: [
      {
        id: 'q1_anatomy',
        subject: 'ANATOMY VIVA',
        icon: 'Bone',
        question: 'Which structure is most likely to be found in the direct vicinity of a medical student who has not completed the syllabus?',
        options: [
          {
            id: 'q1_a',
            label: 'The superior sagittal sinus and circle of Willis.',
            explanation: 'Technically anatomical, but too optimistic. You don’t know where the circle of Willis is right now.',
            score: 1,
          },
          {
            id: 'q1_b',
            label: 'A 1,200-page unopened textbook acting as an emergency ergonomic pillow.',
            explanation: 'Correct! Histological analysis confirms deep cranial indentations matching the hardback cover.',
            score: 3,
          },
          {
            id: 'q1_c',
            label: 'An obscure YouTube animation explaining neuroanatomy in 4 minutes at 2x speed.',
            explanation: 'Very close second! The primary source of last-minute medical degrees.',
            score: 2,
          },
        ],
      },
      {
        id: 'q2_physiology',
        subject: 'PHYSIOLOGY VIVA',
        icon: 'HeartPulse',
        question: 'What physiological phenomenon occurs when the examiner leans forward and says: "Explain the molecular mechanism in detail"?',
        options: [
          {
            id: 'q2_a',
            label: 'Sympathetic storm: Heart rate spikes to 180 bpm while soul attempts out-of-body escape.',
            explanation: 'Spot on. Baroreceptor reflex immediately fails. Vocal chords emit a squeaky "Yes sir."',
            score: 3,
          },
          {
            id: 'q2_b',
            label: 'Physiological homeostatic equilibrium and zen-like composure.',
            explanation: 'Completely impossible. You are Anirban, not the Dalai Lama.',
            score: 0,
          },
          {
            id: 'q2_c',
            label: 'Cardiac arrest followed by spontaneous philosophical deflection.',
            explanation: 'Acceptable! "Sir, to truly understand the mechanism, we must first define life itself..."',
            score: 2,
          },
        ],
      },
      {
        id: 'q3_biochem',
        subject: 'BIOCHEMISTRY VIVA',
        icon: 'Dna',
        question: 'Which metabolic pathway converts a free, peaceful Sunday afternoon into 4:00 AM exam-eve panic?',
        options: [
          {
            id: 'q3_a',
            label: 'The Procrastination-Glycolytic Shunt (Yield: 0 ATP, 100% Regret).',
            explanation: 'Rate-limiting enzyme: Opening Instagram. Reversible only by crying.',
            score: 3,
          },
          {
            id: 'q3_b',
            label: 'Oxidative phosphorylation of good intentions.',
            explanation: 'Produces immense cognitive exhaustion with zero actual chapters completed.',
            score: 2,
          },
          {
            id: 'q3_c',
            label: 'The classic Krebs cycle, precisely drawn with all enzymes.',
            explanation: 'Nobody draws the full Krebs cycle on exam eve. Blatant academic fiction.',
            score: 0,
          },
        ],
      },
      {
        id: 'q4_pathology',
        subject: 'PATHOLOGY VIVA',
        icon: 'Microscope',
        question: 'Describe the microscopic pathological changes seen in a student who opens Robbins Pathology 18 hours before the exam:',
        options: [
          {
            id: 'q4_a',
            label: 'Hypertrophy of delusion: "If I read 90 pages per hour, I might still top."',
            explanation: 'Pathognomonic sign! Associated with frequent glances at the clock and intense prayer.',
            score: 3,
          },
          {
            id: 'q4_b',
            label: 'Complete cellular apoptosis of remaining braincells.',
            explanation: 'Accurate microscopic observation. The cytoplasm of knowledge has dissolved.',
            score: 2,
          },
          {
            id: 'q4_c',
            label: 'Orderly physiological tissue repair through systematic reading.',
            explanation: 'Diagnosis rejected. Systemic pathology does not support this hypothesis.',
            score: 0,
          },
        ],
      },
      {
        id: 'q5_pharma',
        subject: 'PHARMACOLOGY VIVA',
        icon: 'Pill',
        question: 'Identify the most potent pharmacological agent for temporarily suppressing the urge to procrastinate:',
        options: [
          {
            id: 'q5_a',
            label: '400 mg concentrated Caffeine + Emergency PYQ Panic Infusion.',
            explanation: 'Therapeutic window: 2 hours. Adverse effect: Tremors, pacing around the hostel room.',
            score: 3,
          },
          {
            id: 'q5_b',
            label: 'The placebo declaration: "I will study seriously starting tomorrow sharp at 6:00 AM."',
            explanation: 'Has zero bioavailability and an efficacy rate of exactly 0.00%.',
            score: 1,
          },
          {
            id: 'q5_c',
            label: 'Adrenaline released when the roll number before you gets thoroughly grilled.',
            explanation: 'Extremely potent! Pupil dilation, sudden memorization of drug classifications in 10 seconds.',
            score: 2,
          },
        ],
      },
      {
        id: 'q6_micro',
        subject: 'MICROBIOLOGY VIVA',
        icon: 'ShieldAlert',
        question: 'Identify the highly contagious pathogen responsible for spreading "Bro, how much have you completed?" across the batch:',
        options: [
          {
            id: 'q6_a',
            label: 'Streptococcus panicus (Gram-negative WhatsApp epidemic strain).',
            explanation: 'Spreads rapidly via group chats. Symptoms include acute sinking feeling in the stomach.',
            score: 3,
          },
          {
            id: 'q6_b',
            label: 'Multi-drug resistant Procrastinococcus aureus.',
            explanation: 'Colonizes the hostel corridors between 11 PM and 3 AM. Highly virulent.',
            score: 2,
          },
          {
            id: 'q6_c',
            label: 'An innocent query stemming from genuine scholarly curiosity.',
            explanation: 'False! It is a psychological warfare tactic designed to induce mass tachycardia.',
            score: 0,
          },
        ],
      },
    ] as VivaQuestion[],
    results: [
      {
        minScore: 14,
        grade: 'DISTINCTION IN VIVA SURVIVAL',
        title: 'CHARISMA-POWERED CLINICAL MIRACLE',
        description: 'You managed to nod with such profound medical authority that the external examiner started doubting their own textbook. Passed with legendary honors!',
      },
      {
        minScore: 8,
        grade: 'PROVISIONAL PASS (ON SYMPATHY)',
        title: 'TACTICAL JARGON EVASION',
        description: 'Your answers were 30% medicine, 70% confidence, and 100% vibes. The examiner gave you passing marks just to end the mutual suffering. A glorious victory!',
      },
      {
        minScore: 0,
        grade: 'SUPPLEMENTARY VIVA CANDIDATE',
        title: 'EXTERNAL EXAMINER IN DISBELIEF',
        description: 'You attempted to diagnose the examiner instead of answering the question. The faculty has recommended a permanent course in time management.',
      },
    ],
  },

  // Chapter 4: The Height Department
  height: {
    title: 'THE HEIGHT ANOMALY DIVISION',
    subtitle: 'Department of Vertical Superiority & Low-Ceiling Hazards',
    dispatches: [
      'Subject exceeds standard camera framing by a noticeable margin.',
      'Nearby ceiling fixtures and doorframes have submitted written grievances.',
      'Group photographs require satellite imagery and three weeks of advance geometric planning.',
      'Vertical advantage confirmed in all physical engagements.',
      'Current weather forecast at subject head height: Partly cloudy with scattered rain.',
    ],
    measurementButtonLabel: 'MEASURE ANIRBAN',
    measuringStates: [
      'Calibrating laser measuring device...',
      'Extending vertical sensors past ceiling tile...',
      'Querying International Metrology Bureau...',
      'Sensor overflow: Value too large for integer representation...',
    ],
    measurementResult: {
      headline: 'RESULT: 183 CM — CLASSIFIED HEIGHT ANOMALY',
      clearanceStatus: 'Height: 183cm | Ceiling Clearance: NEGATIVE 4.2 CM',
      recommendation: 'Mandatory ducking protocol when entering any doorway built before 2020.',
    },
    airspaceButtonLabel: 'CHECK FOR AIRSPACE CLEARANCE',
    airspaceResult: {
      headline: 'RADAR REPORT: CIVIL AVIATION ADVISORY',
      details: 'Air Traffic Control reports a slow-moving tall legend at altitude. Commercial flights crossing this sector are advised to cruise at minimum Flight Level 350 to prevent head-bumps.',
      code: 'ATC-NOTAM #AIR-TALL-99',
    },
    unlockedAchievementId: 'certified_tall_person',
  },

  // Chapter 5: The Overthinking Simulator
  overthinking: {
    title: "ANIRBAN'S BRAIN: 47 PROCESSES RUNNING",
    subtitle: 'Internal CPU Diagnostic: High-frequency overthinking detected under minimal stress.',
    scenarioPrompt: 'SCENARIO: You sent a message. The other person has not replied for seven minutes. What happens next?',
    choices: [
      {
        id: 'worst_case',
        label: 'Assume the worst',
        responseTitle: 'Catastrophe Simulation Active',
        responseBody: 'Hypothesis: They dropped their phone into the Marianas Trench, fled the country under an assumed alias, or you accidentally offended their entire family lineage.',
        cpuUsage: '94%',
      },
      {
        id: 'analyze_punctuation',
        label: 'Analyze the punctuation',
        responseTitle: 'Forensic Punctuation Analysis',
        responseBody: 'Did they end the previous text with a period? Why was there no exclamation point? Is the emoji sarcastic or wholesome? A 12-member advisory board has been convened.',
        cpuUsage: '98%',
      },
      {
        id: 'reconstruct_history',
        label: 'Reconstruct conversation history',
        responseTitle: 'Time Machine Rewind',
        responseBody: 'Subject reviewed chat transcripts from 8 months ago to verify whether saying "cool cool" in September was secretly misinterpreted as passive aggression.',
        cpuUsage: '89%',
      },
      {
        id: 'contingency_plans',
        label: 'Open an imaginary investigation',
        responseTitle: 'Tactical Apology Drafting',
        responseBody: 'Drafted 3 diplomatic apology drafts, 2 peace treaties, and a slide deck explaining your genuine intentions before they even read the original text.',
        cpuUsage: '99%',
      },
      {
        id: 'busy_hypothesis',
        label: 'Consider the possibility that they are simply busy',
        responseTitle: 'SYSTEM ERROR 404: HYPOTHESIS REJECTED',
        responseBody: 'CPU Kernel Panic: "They are simply making a cup of tea" is too peaceful and rational. System will immediately default back to analyzing comma placement.',
        cpuUsage: '100% OVERCLOCK',
      },
    ],
    heartfeltCounterbalance: {
      quote: 'ALL THAT OVERTHINKING, AND HE STILL SHOWS UP FOR HIS PEOPLE.',
      reflection: 'The world has plenty of people who don’t care enough to think twice. Having a friend whose mind runs a million miles an hour because he actually cares about the people in his corner is what makes Anirban truly special.',
    },
    unlockedAchievementId: 'professional_overthinker',
  },

  // Chapter 6: The Mimicry Hall of Fame
  mimicry: {
    title: 'THE MIMICRY HALL OF FAME',
    subtitle: 'Recognizing Unlicensed Impersonation Excellence of the Highest Order',
    awardTitle: 'THE GOLDEN IMPRESSION AWARD',
    awardCitation: 'Presented for outstanding contributions to the fine art of sounding like absolutely everybody—including your anatomy professor—without prior consent.',
    interactiveButtonLabel: 'ACTIVATE MIMICRY MODE',
    roster: [
      {
        category: 'Voice Replication Precision',
        rating: 'SUSPICIOUSLY ACCURATE',
        comment: 'Witnesses report genuine confusion over whether the professor was actually standing in the hostel hallway.',
      },
      {
        category: 'Character Switching Speed',
        rating: 'PROFESSIONALLY CONCERNING',
        comment: 'Switches between three distinct clinical staff personalities in under 4.2 seconds with zero latency.',
      },
      {
        category: 'Audience Reaction Index',
        rating: 'IMMEDIATE WHEEZING LAUGHTER',
        comment: 'Has caused multiple people to choke on their water during serious pre-exam discussions.',
      },
      {
        category: 'Originality of Impressions',
        rating: 'CLASSIFIED / UNRIVALED',
        comment: 'Captures the exact sigh, vocal cadence, and clipboard taps with forensic accuracy.',
      },
      {
        category: 'Department Standing',
        rating: 'TIER SSS+ GOATED',
        comment: 'The Mimicry Department has officially superseded all actual academic commitments.',
      },
    ],
    easterEggMicHint: 'Clicking the Golden Mic reveals an exclusive judge verdict...',
    unlockedAchievementId: 'mimicry_final_boss',
  },

  // Chapter 7: MBBS Survival Inventory & Fake Prescription
  mbbsSurvival: {
    title: 'MBBS SURVIVAL INVENTORY & CLINICAL PRESCRIPTION',
    subtitle: 'Essential survival gear and authorized medical directives for Year 2 & beyond.',
    inventoryIntro: 'Inspect all 7 items in Anirban’s survival kit to unlock the "SURVIVED ANOTHER DAY OF MBBS" badge:',
    items: [
      {
        id: 'sacred_coffee',
        name: 'The Sacred Coffee Cup',
        icon: 'Coffee',
        category: 'Consumable / Fuel',
        rarity: 'Mythic',
        description: 'Fueled 92% of all exam survival attempts across MBBS history.',
        flavorText: 'Temperature always drops to absolute zero before the second sip is taken.',
      },
      {
        id: 'last_minute_notes',
        name: 'The Last-Minute Notes',
        icon: 'FileText',
        category: 'Intel / Sacred Text',
        rarity: 'Legendary',
        description: 'Handwritten in 4 fluorescent highlighters by a batch topper who writes in encrypted cursive.',
        flavorText: 'Has passed through 47 WhatsApp forward groups before reaching Anirban at 1:45 AM.',
      },
      {
        id: 'motivation_potion',
        name: 'The 2 AM Motivation Potion',
        icon: 'Zap',
        category: 'Buff / Neuro-stimulant',
        rarity: 'Rare',
        description: 'Induces sudden grand plans to master embryology, wake up at 5:00 AM, and exercise daily.',
        flavorText: 'Half-life: Exactly 14 minutes. Vanishes instantly when bed is spotted.',
      },
      {
        id: 'practical_record',
        name: 'Almost-Completed Practical Record',
        icon: 'BookMarked',
        category: 'Armor / Shield',
        rarity: 'Rare',
        description: 'Missing 3 histopathology sketches, 2 faculty stamps, held together by raw willpower.',
        flavorText: 'The cornerstone of any respectable viva defense strategy.',
      },
      {
        id: 'emergency_pyq',
        name: 'The Emergency PYQ Scroll',
        icon: 'Scroll',
        category: 'Ancient Relic',
        rarity: 'Mythic',
        description: 'Contains the repeated university questions from 2016 to 2025. The ultimate lifesaver.',
        flavorText: '"If it was asked in 2018 and 2021, it is 100% coming tomorrow. Trust me bro."',
      },
      {
        id: 'stethoscope_authority',
        name: 'Stethoscope of Questionable Authority',
        icon: 'Stethoscope',
        category: 'Weapon / Instrument',
        rarity: 'Legendary',
        description: 'Used primarily to look medically intimidating in hostel mirrors and check subject’s own panic rhythm.',
        flavorText: 'Earpieces cold enough to cause momentary hypothermia.',
      },
      {
        id: 'attendance_cert',
        name: 'Attendance Survival Certificate',
        icon: 'Award',
        category: 'Achievement / Legal Shield',
        rarity: 'Mythic',
        description: 'Mathematically engineered down to 7 decimal places to remain at exactly 75.01%.',
        flavorText: 'A geometric and diplomatic triumph of modern medical education.',
      },
    ] as InventoryItem[],

    // Fake Prescription Pad
    prescription: {
      padHeader: 'DEPARTMENT OF FRIENDSHIP & ACADEMIC EMERGENCIES',
      hospital: 'Central Hospital of Chaos & Lifelong Camaraderie',
      patient: 'Anirban',
      ageGender: '20s / Certified Legend',
      date: 'Today // Official Birthday Directive',
      diagnosis: 'Chronic Syllabus Avoidance with Recurrent Overthinking & S-Tier Dependability',
      rxList: [
        'Rx: One completed topic daily, as tolerated by mood and caffeine levels',
        'Rx: PYQs before unnecessary existential panic (TID — Three times a day)',
        'Rx: Adequate 8-hour sleep before examinations (Non-negotiable)',
        'Rx: Regular mega-doses of friendship, uncontrollable laughter, and mimicry',
        'SOS: Contact friends immediately whenever life or exams get overwhelming',
      ],
      duration: 'Duration: Until graduation, with mandatory lifelong follow-up.',
      doctorStamp: 'DEPARTMENT OF FRIENDSHIP & ACADEMIC EMERGENCIES — APPROVED BY CHIEF FRIEND',
      disclaimer: '* Official Birthday Joke Pad. Guaranteed 100% effective in boosting morale. Not valid for actual pharmacy dispensation.',
    },
  },

  // Chapter 8: Achievements and Legend Ranking (Merged Original + Medical)
  achievementsChapter: {
    title: 'LEGEND DOSSIER & MEDICAL HONORS',
    subtitle: 'The comprehensive track record of a certified one-of-one future doctor.',
    characterProfile: {
      level: 'LVL 99 BIRTHDAY PROTAGONIST',
      charClass: 'Future Doctor / Tall Tactician / S-Tier Mimic',
      hp: '100 / 100 (Clinical Stamina)',
      stats: [
        { name: 'Vertical Span', val: 'MAX+' },
        { name: 'Syllabus Rate', val: '4.2%' },
        { name: 'Mimicry Mastery', val: '100/100' },
        { name: 'Overthinking MHz', val: '9,999' },
        { name: 'Friendship & Loyalty', val: '1,000%' },
      ],
    },
    allAchievements: [
      {
        id: 'master_of_almost_finishing',
        title: 'Master of Almost Finishing',
        subtitle: 'Syllabus Specialist',
        description: 'Demonstrated world-class proficiency in starting study sessions with maximum enthusiasm and zero completion.',
        icon: 'BookOpen',
        chapterSource: 2,
        category: 'academic',
      },
      {
        id: 'anatomy_survivor',
        title: 'Anatomy Survivor',
        subtitle: 'Dissection Hall Veteran',
        description: 'Survived cadaver lab, brachial plexus diagrams, and the harrowing realization that humans have 206 bones.',
        icon: 'Bone',
        chapterSource: 3,
        category: 'medical',
      },
      {
        id: 'physiology_still_loading',
        title: 'Physiology Still Loading',
        subtitle: 'Buffer Overrun',
        description: 'Maintained optimal cardiac output while waiting for the endocrine feedback loops to make logical sense.',
        icon: 'HeartPulse',
        chapterSource: 3,
        category: 'medical',
      },
      {
        id: 'biochemistry_confusion_certified',
        title: 'Biochemistry Confusion Certified',
        subtitle: 'Krebs Cycle Enigma',
        description: 'Stared at metabolic pathways until ATP synthesis was replaced by pure existential contemplation.',
        icon: 'Dna',
        chapterSource: 3,
        category: 'medical',
      },
      {
        id: 'viva_room_escape_artist',
        title: 'Viva Room Escape Artist',
        subtitle: 'Master of Deflection',
        description: 'Faced the external examiner armed only with confidence, polite nodding, and spontaneous medical rhetoric.',
        icon: 'ShieldAlert',
        chapterSource: 3,
        category: 'medical',
      },
      {
        id: 'certified_tall_person',
        title: 'Certified Tall Person',
        subtitle: 'Ceiling Hazard',
        description: 'Exceeded standard doorway clearances and necessitated panorama mode for regular selfie attempts.',
        icon: 'Ruler',
        chapterSource: 4,
        category: 'personality',
      },
      {
        id: 'professional_overthinker',
        title: 'Professional Overthinker',
        subtitle: '47 Background Threads',
        description: 'Analyzed an unreplied message from 14 different geopolitical angles before remembering they were taking a shower.',
        icon: 'Cpu',
        chapterSource: 5,
        category: 'personality',
      },
      {
        id: 'mimicry_final_boss',
        title: 'Mimicry Final Boss',
        subtitle: 'Vocal Chameleon',
        description: 'Delivered impressions so accurate that actual individuals and HODs questioned their own vocal chords.',
        icon: 'Mic',
        chapterSource: 6,
        category: 'personality',
      },
      {
        id: 'survived_another_day_of_mbbs',
        title: 'Survived Another Day of MBBS',
        subtitle: 'Hostel Champion',
        description: 'Collected all 7 survival relics, endured wards, and lived to drink another cold coffee.',
        icon: 'Stethoscope',
        chapterSource: 7,
        category: 'medical',
      },
      {
        id: 'future_doctor_current_menace',
        title: 'Future Doctor, Current Menace',
        subtitle: 'Dual Specialization',
        description: 'Possesses the intellect to heal lives and the chaotic humor to roast friends simultaneously.',
        icon: 'Award',
        chapterSource: 8,
        category: 'medical',
        unlockedByDefault: true,
      },
      {
        id: 'reliable_when_it_matters',
        title: 'Reliable When It Matters',
        subtitle: 'The True Anchor',
        description: 'Showed up during the moments that genuinely counted, especially through December 2025 and January 2026.',
        icon: 'ShieldCheck',
        chapterSource: 8,
        category: 'friendship',
        unlockedByDefault: true,
      },
      {
        id: 'friendship_prognosis_excellent',
        title: 'Friendship: Prognosis Excellent',
        subtitle: 'Permanent Cure',
        description: 'Diagnosed with incurable loyalty, mutual trust, and lifelong camaraderie.',
        icon: 'HeartHandshake',
        chapterSource: 8,
        category: 'friendship',
        unlockedByDefault: true,
      },
      {
        id: 'certified_legend',
        title: 'Certified Legend',
        subtitle: 'Supreme Rank',
        description: 'Survived the entire birthday investigation with dignity, humor, and an undefeated friendship status.',
        icon: 'Crown',
        chapterSource: 8,
        category: 'friendship',
        unlockedByDefault: true,
      },
    ],
    legendAward: {
      title: 'THE ULTIMATE LEGEND AWARD',
      quote: 'Because behind all the chaos, the unfinished syllabus, and the questionable decision-making, there is someone people can genuinely count on.',
    },
  },

  // Chapter 10: The Final Letter
  finalLetter: {
    transitionSubtitle: 'CLINICAL AUDIT COMPLETE.',
    prelude: 'ONE LAST THING.',
    mbbsCallback: 'Future doctor, current menace, and forever friend...',
    paragraphs: [
      'Happy birthday, Anirban.',
      'After all the allegations, the syllabus investigations, the height measurements, and the extremely questionable system diagnostics, I wanted to end this with something a little more genuine.',
      "We've known each other for around a year and a half, and I'm genuinely glad that we became friends.",
      "You're funny, sarcastic, ridiculously good at mimicry, and somehow capable of being both an absolute menace and one of the most reliable people to have around.",
      'But one thing I especially want you to know is that I haven\'t forgotten December 2025 and January 2026.',
      'You were there for me during that time. You supported me when I needed someone, and that meant more to me than a birthday roast or a website full of stupid jokes could ever explain.',
      'People don\'t always realize how much it matters simply to have someone who shows up. I do, and I appreciate that you did.',
      'So yes, your syllabus may remain a work in progress, your height may require special documentation, and your brain may occasionally open more tabs than an entire internet café.',
      "But beyond all that, you're a genuinely good friend, and I'm grateful to have you in my life.",
      'I hope this next year brings you happiness, good health, success, peace of mind, and plenty of reasons to laugh. I hope you get closer to the things you want, give yourself a little less trouble over the things you cannot control, and remember that you deserve the same support you give to other people.',
      'Keep being the funny, supportive, dependable legend you are.',
      'Happy birthday, Anirban.',
      'Now please finish your syllabus.',
    ],
    acceptButtonLabel: 'ACCEPT YOUR LEGEND STATUS',
    congratulationTitle: 'INVESTIGATION CLOSED. LEGEND STATUS CONFIRMED.',
    congratulationNote: 'Verdict: Permanent, irreplaceable friend. Case filed in the Hall of Legends.',
  },

  // Secrets and Easter Eggs
  easterEggs: {
    secretClearanceCode: 'ANIRBAN-S-TIER-LEGEND',
    secretClearanceTitle: 'TOP-SECRET DOSSIER CLEARANCE: TIER 1',
    secretClearanceBody: 'You found the classified badge override! Diagnostics reveal Anirban is officially immune to all friendship audits. Authorized by: Your best friend.',
    academicEasterEggTitle: 'HIDDEN ACHIEVEMENT: 4:00 AM CRAMMING ARCHITECT',
    academicEasterEggBody: 'You pressed the panic simulator 5 times. You have officially unlocked the secret ability to study an entire semester in 18 minutes using sheer adrenaline.',
    secretTerminalMemoTitle: 'ENCRYPTED DEVELOPER MEMORANDUM',
    secretTerminalMemoBody: `// SYSTEM LOG: PROJECT ANIRBAN.EXE // MBBS CHAOS UPDATE
// AUTHOR: A close friend who wanted to make something unforgettable.
//
// Hey Anirban, if you're inspecting the terminal:
// The jokes were made with immense love. The appreciation is 100% real.
// Whether it's MBBS viva madness, chronic syllabus procrastination, or overthinking:
// Thank you for being such an awesome person to hang out with and talk to.
// December 2025 and January 2026 will always mean the world to me.
//
// Now go enjoy your birthday, future doctor. You earned this.`,

    // 5 Medical Easter Eggs
    medicalEasterEggs: {
      stethoscope: {
        id: 'stethoscope_egg',
        title: 'STETHOSCOPE DIAGNOSTIC SCAN',
        message: 'Auscultation complete: "Diagnosis: bro needs to study."',
      },
      medicalCross: {
        id: 'cross_egg',
        title: 'EMERGENCY CODE BLUE ALERT',
        message: 'Academic emergency detected! Deploying emergency IV caffeine and PYQ scrolls!',
      },
      examinerChat: {
        id: 'examiner_egg',
        title: 'EXAMINER TELEMETRY INTERCEPT',
        message: 'The External Examiner has entered the chat: "Roll number, define the cranial nerves in reverse order."',
      },
      labResult: {
        id: 'lab_egg',
        title: 'STAT BIOCHEMICAL REPORT',
        message: 'Serum Syllabus Concentration: Below Detectable Limits (<0.01 IU/L). Dilution with Netflix confirmed.',
      },
      mysteryConqueror: {
        id: 'conqueror_egg',
        title: 'SECRET BADGE: MBBS MYSTERY CONQUEROR',
        message: 'You have uncovered all hidden medical easter eggs! Awarded an honorary MD in Chaos Medicine.',
      },
    },
  },
};
