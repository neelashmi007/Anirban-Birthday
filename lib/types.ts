export type ChapterId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface AppState {
  currentChapter: ChapterId;
  completedChapters: Set<ChapterId>;
  unlockedAchievements: Set<string>;
  secretClearanceUnlocked: boolean;
  academicSecretUnlocked: boolean;
  authorTerminalOpen: boolean;
  secretClearanceModalOpen: boolean;
  celebrationTriggered: boolean;
  isSoundMuted: boolean;
  isBgmActive: boolean;
  collectedInventoryItems: Set<string>;
  medicalEasterEggsFound: Set<string>;
}
