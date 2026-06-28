import type { Personality } from "./personalities";
import { getPersonality } from "./personalities";
import { questions } from "./questions";

export interface PersonalitySlice {
  personality: Personality;
  percent: number; // 0-100，占比百分比
}

export interface QuizResult {
  primary: Personality; // 主人格（权重最大）
  breakdown: PersonalitySlice[]; // 占比从高到低，至少包含 primary
}

export function calculateResult(answers: Record<number, string>): QuizResult {
  const scores: Record<number, number> = {};
  for (let i = 1; i <= 15; i++) scores[i] = 0;

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

  // 排序：得分从高到低
  const sorted = Object.entries(scores)
    .map(([pid, score]) => ({ pid: Number(pid), score }))
    .sort((a, b) => b.score - a.score);

  const total = sorted.reduce((sum, item) => sum + Math.max(item.score, 0), 0);

  // 计算占比，处理 total=0 的边界
  const breakdown: PersonalitySlice[] = sorted.map(({ pid, score }) => {
    const personality = getPersonality(pid);
    const percent = total > 0 ? Math.round((Math.max(score, 0) / total) * 100) : 0;
    return { personality, percent };
  });

  // 主人格取占比最高者
  const primary = breakdown[0]?.personality ?? getPersonality(1);

  return { primary, breakdown };
}

// 兼容旧调用：只返回主人格
export function calculatePrimary(answers: Record<number, string>): Personality {
  return calculateResult(answers).primary;
}
