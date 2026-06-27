import type { Personality } from "./personalities";
import { getPersonality } from "./personalities";
import { questions } from "./questions";

export function calculateResult(answers: Record<number, string>): Personality {
  const scores: Record<number, number> = {};
  for (let i = 1; i <= 12; i++) scores[i] = 0;

  Object.entries(answers).forEach(([questionIdStr, optionId]) => {
    const questionId = Number(questionIdStr);
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;
    const option = question.options.find((o) => o.id === optionId);
    if (!option) return;
    Object.entries(option.weights).forEach(([pid, weight]) => {
      scores[Number(pid)] += weight;
    });
  });

  let maxScore = -1;
  let winnerId = 1;
  Object.entries(scores).forEach(([pid, score]) => {
    if (score > maxScore) {
      maxScore = score;
      winnerId = Number(pid);
    }
  });

  return getPersonality(winnerId);
}
