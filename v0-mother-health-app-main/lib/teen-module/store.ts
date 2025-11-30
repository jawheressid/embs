// src/lib/store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ----- Types -----
interface PetState {
  name: string;
  stage: 'EGG' | 'BABY' | 'CHILD' | 'ADULT';
  evolutionTrack: 'NEUTRAL' | 'SERENE' | 'WISE' | 'ENERGETIC';
  health: number;
  happiness: number;
  evolutionPoints: number;
  level: number;
  xp: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: Date;
}

interface GameState {
  pet: PetState;
  achievements: Achievement[];
  journalEntries: string[]; // stored gratitude entries
  questsCompleted: number;
  assessmentsCompleted: number;
  // ----- Actions -----
  setPetName: (name: string) => void;
  updatePetStats: (stats: Partial<PetState>) => void;
  evolvePet: (stage: PetState['stage']) => void;
  addXP: (amount: number) => void;
  addAchievement: (achievement: Omit<Achievement, 'unlockedAt'>) => void;
  addJournalEntry: (entry: string) => void;
  incrementQuestsCompleted: () => void;
  incrementAssessmentsCompleted: () => void;
}

// XP required for each level (exponential growth)
const getXPForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      pet: {
        name: 'Bloom',
        stage: 'EGG',
        evolutionTrack: 'NEUTRAL',
        health: 100,
        happiness: 50,
        evolutionPoints: 0,
        level: 1,
        xp: 0,
      },
      achievements: [],
      journalEntries: [],
      questsCompleted: 0,
      assessmentsCompleted: 0,
      // ----- Action implementations -----
      setPetName: (name) => set((state) => ({ pet: { ...state.pet, name } })),
      updatePetStats: (stats) => set((state) => ({ pet: { ...state.pet, ...stats } })),
      evolvePet: (stage) => set((state) => ({ pet: { ...state.pet, stage } })),
      addXP: (amount) =>
        set((state) => {
          const newXP = state.pet.xp + amount;
          const currentLevel = state.pet.level;
          const xpNeeded = getXPForLevel(currentLevel);
          if (newXP >= xpNeeded) {
            const newLevel = currentLevel + 1;
            const remainingXP = newXP - xpNeeded;
            // Auto‑evolve based on level milestones
            let newStage = state.pet.stage;
            if (newLevel >= 3 && state.pet.stage === 'EGG') newStage = 'BABY';
            if (newLevel >= 7 && state.pet.stage === 'BABY') newStage = 'CHILD';
            if (newLevel >= 12 && state.pet.stage === 'CHILD') newStage = 'ADULT';
            return {
              pet: {
                ...state.pet,
                xp: remainingXP,
                level: newLevel,
                stage: newStage,
                evolutionPoints: state.pet.evolutionPoints + 50,
              },
            };
          }
          return { pet: { ...state.pet, xp: newXP } };
        }),
      addAchievement: (achievement) =>
        set((state) => ({
          achievements: [...state.achievements, { ...achievement, unlockedAt: new Date() }],
        })),
      addJournalEntry: (entry) =>
        set((state) => ({ journalEntries: [...state.journalEntries, entry] })),
      incrementQuestsCompleted: () =>
        set((state) => ({ questsCompleted: state.questsCompleted + 1 })),
      incrementAssessmentsCompleted: () =>
        set((state) => ({ assessmentsCompleted: state.assessmentsCompleted + 1 })),
    }),
    { name: 'bloom-sanctuary-storage' }
  )
);

export { getXPForLevel };
