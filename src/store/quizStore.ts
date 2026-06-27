import { create } from "zustand";
import type { Personality } from "@/data/personalities";
import { calculateResult } from "@/data/scorer";

export interface QuizState {
  currentQuestion: number;
  answers: Record<number, string>;
  result: Personality | null;
  isStarted: boolean;
  isCompleted: boolean;
  startQuiz: () => void;
  selectAnswer: (questionId: number, optionId: string) => void;
  goToQuestion: (index: number) => void;
  calculateAndComplete: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  currentQuestion: 0,
  answers: {},
  result: null,
  isStarted: false,
  isCompleted: false,
  startQuiz: () =>
    set({ isStarted: true, currentQuestion: 0, answers: {}, result: null, isCompleted: false }),
  selectAnswer: (questionId, optionId) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: optionId } })),
  goToQuestion: (index) => set({ currentQuestion: index }),
  calculateAndComplete: () => {
    const result = calculateResult(get().answers);
    set({ result, isCompleted: true });
  },
  resetQuiz: () =>
    set({ currentQuestion: 0, answers: {}, result: null, isStarted: false, isCompleted: false }),
}));
