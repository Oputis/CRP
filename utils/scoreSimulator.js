import { SCORE_RANGES } from '@/data/scoreFactors';

const clampScore = (score) => Math.max(300, Math.min(850, score));

export function simulateScoreChange(currentScore, actionId) {
  const range = SCORE_RANGES[actionId] || { min: 0, exp: 0, max: 0 };
  return {
    min: clampScore(currentScore + range.min),
    expected: clampScore(currentScore + range.exp),
    max: clampScore(currentScore + range.max),
    delta: range,
  };
}

export function runScoreSimulation(currentScore, selectedActionIds) {
  let runningScore = currentScore;
  const totalDelta = { min: 0, exp: 0, max: 0 };

  selectedActionIds.forEach((actionId) => {
    const result = simulateScoreChange(runningScore, actionId);
    totalDelta.min += result.delta.min;
    totalDelta.exp += result.delta.exp;
    totalDelta.max += result.delta.max;
    runningScore = result.expected;
  });

  return {
    newMin: clampScore(currentScore + totalDelta.min),
    newExp: clampScore(currentScore + totalDelta.exp),
    newMax: clampScore(currentScore + totalDelta.max),
    delta: totalDelta,
  };
}

export function getScoreLabel(score) {
  if (score >= 800) return { label: 'Exceptional', color: '#10b981' };
  if (score >= 740) return { label: 'Very Good', color: '#22d3ee' };
  if (score >= 670) return { label: 'Good', color: '#3b82f6' };
  if (score >= 580) return { label: 'Fair', color: '#f59e0b' };
  return { label: 'Poor', color: '#ef4444' };
}
