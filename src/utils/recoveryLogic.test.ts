import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateResilienceScore,
  getBoxBreathingState,
  evaluateAssessmentAnswers
} from './recoveryLogic';

test('calculateResilienceScore awards points for clean days and urged resistance', () => {
  const zeroRecord = {
    pornCleanDays: 0,
    masturbationCleanDays: 0,
    totalAttempts: 1,
    resistedUrgesCount: 0
  };
  assert.equal(calculateResilienceScore(zeroRecord), 0);

  const partialRecord = {
    pornCleanDays: 10, // 10 * 2.5 = 25
    masturbationCleanDays: 4, // 4 * 1.5 = 6
    totalAttempts: 1,
    resistedUrgesCount: 2 // 2 * 4 = 8 -> 39
  };
  assert.equal(calculateResilienceScore(partialRecord), 39);

  const maxRecord = {
    pornCleanDays: 30,
    masturbationCleanDays: 30,
    totalAttempts: 2,
    resistedUrgesCount: 10
  };
  assert.equal(calculateResilienceScore(maxRecord), 100);
});

test('getBoxBreathingState correctly cycles through 4 phases', () => {
  // Phase 1: Inhale (0 to 3.99s)
  const state0 = getBoxBreathingState(0);
  assert.equal(state0.phase, 'inhale');
  assert.equal(state0.phaseSecondsRemaining, 4);

  // Phase 2: Hold-in (4 to 7.99s)
  const state5 = getBoxBreathingState(5);
  assert.equal(state5.phase, 'hold-in');
  assert.equal(state5.phaseSecondsRemaining, 3);

  // Phase 3: Exhale (8 to 11.99s)
  const state9 = getBoxBreathingState(9);
  assert.equal(state9.phase, 'exhale');
  assert.equal(state9.phaseSecondsRemaining, 3);

  // Phase 4: Hold-out (12 to 15.99s)
  const state14 = getBoxBreathingState(14);
  assert.equal(state14.phase, 'hold-out');
  assert.equal(state14.phaseSecondsRemaining, 2);

  // Cycle repeats at 16s
  const state16 = getBoxBreathingState(16);
  assert.equal(state16.phase, 'inhale');
});

test('evaluateAssessmentAnswers categorizes results accurately', () => {
  const low = evaluateAssessmentAnswers([0, 1, 1, 1]);
  assert.equal(low.level, 'mild');

  const med = evaluateAssessmentAnswers([2, 2, 1, 2]);
  assert.equal(med.level, 'moderate');

  const high = evaluateAssessmentAnswers([3, 3, 3, 2]);
  assert.equal(high.level, 'high');
});
