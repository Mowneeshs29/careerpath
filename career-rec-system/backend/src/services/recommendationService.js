/**
 * Recommendation Scoring Engine
 *
 * Weights:
 *   Skills match        — 60 %
 *   Interest match      — 25 %
 *   Education alignment — 15 %
 *
 * Each sub-score is a ratio of matched items to total required items,
 * clamped to [0, 1], then multiplied by the weight.
 */

const EDU_HIERARCHY = ["High School", "Associate", "Bachelor's", "Master's", "PhD", "Certification"];

/**
 * Jaccard-style overlap ratio: |intersection| / |union|
 */
function overlapRatio(userSet, careerSet) {
  if (!careerSet.length) return 0;
  const uSet = new Set(userSet.map((s) => s.toLowerCase()));
  const matched = careerSet.filter((s) => uSet.has(s.toLowerCase())).length;
  return matched / careerSet.length; // ratio of required items that user has
}

/**
 * Check whether the user's highest degree meets or exceeds the career requirement.
 */
function educationScore(profile, career) {
  if (!career.educationLevel) return 1; // no requirement → full marks

  const userDegrees = (profile.education || [])
    .map((e) => e.degree)
    .filter(Boolean);

  if (!userDegrees.length) return 0;

  const reqIdx = EDU_HIERARCHY.indexOf(career.educationLevel);
  const bestUserIdx = Math.max(...userDegrees.map((d) => EDU_HIERARCHY.indexOf(d)));

  if (reqIdx === -1 || bestUserIdx === -1) return 0.5; // unknown degree → neutral
  return bestUserIdx >= reqIdx ? 1 : bestUserIdx / reqIdx; // partial credit
}

/**
 * Main scorer — returns a value in [0, 100]
 */
function scoreCareer(career, profile) {
  const skillScore = overlapRatio(profile.skills || [], career.requiredSkills || []);
  const interestScore = overlapRatio(profile.interests || [], career.relatedInterests || []);
  const eduScore = educationScore(profile, career);

  const raw = skillScore * 0.6 + interestScore * 0.25 + eduScore * 0.15;
  return Math.round(raw * 10000) / 100; // 0–100, two decimals
}

module.exports = { scoreCareer };
