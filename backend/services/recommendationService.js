/**
 * Career Recommendation and Skill Gap Analysis Service
 * Rule-based heuristic scoring engine, easily extensible with ML/embeddings later.
 */

export const calculateCareerRecommendations = (careers = [], criteria = {}) => {
  const {
    education = '',
    skills = [],
    interests = '',
    preferredIndustry = '',
    preferredLocation = ''
  } = criteria;

  const userSkillsLower = (Array.isArray(skills) ? skills : []).map(s => s.toLowerCase());
  const userInterestsLower = (typeof interests === 'string' ? interests : '').toLowerCase();
  const userIndustryLower = (typeof preferredIndustry === 'string' ? preferredIndustry : '').toLowerCase();

  return careers.map(career => {
    let matchScore = 50; // Base score
    const matchedReasons = [];

    // Industry Match (+20)
    const matchesIndustry = career.industries?.some(ind =>
      ind.toLowerCase().includes(userIndustryLower) || userIndustryLower.includes(ind.toLowerCase())
    );
    if (matchesIndustry && userIndustryLower && userIndustryLower !== 'all') {
      matchScore += 20;
      matchedReasons.push(`Matches your targeted industry preference (${career.industries[0]})`);
    }

    // Category / Interest Match (+15)
    if (userInterestsLower && userInterestsLower !== 'all') {
      if (
        career.category?.toLowerCase().includes(userInterestsLower) ||
        career.title?.toLowerCase().includes(userInterestsLower)
      ) {
        matchScore += 15;
        matchedReasons.push(`Aligns closely with your interest in ${career.category}`);
      }
    }

    // Skills Overlap (+20)
    let matchingSkillsCount = 0;
    career.requiredSkills?.forEach(reqSkill => {
      if (userSkillsLower.includes(reqSkill.toLowerCase())) {
        matchingSkillsCount++;
      }
    });

    const totalReq = career.requiredSkills?.length || 5;
    const skillRatio = matchingSkillsCount / totalReq;
    matchScore += Math.round(skillRatio * 20);

    if (matchingSkillsCount > 0) {
      matchedReasons.push(`You already possess ${matchingSkillsCount} key required skills`);
    } else {
      matchedReasons.push('High career growth trajectory and strong fresher hiring demand');
    }

    // Education Match (+5)
    if (education && career.preferredQualification?.toLowerCase().includes(education.toLowerCase().split(' ')[0])) {
      matchScore += 5;
      matchedReasons.push('Your degree meets standard campus hiring criteria');
    }

    // Clamp score
    const finalScore = Math.min(98, Math.max(55, matchScore));

    return {
      career,
      matchScore: finalScore,
      reasons: matchedReasons
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
};

export const performSkillGapAnalysis = (career, userSkills = []) => {
  const userSkillsLower = userSkills.map(s => (typeof s === 'string' ? s.toLowerCase() : s.name?.toLowerCase() || ''));
  const required = career.requiredSkills || [];

  const existingSkills = [];
  const missingSkills = [];

  required.forEach(skill => {
    if (userSkillsLower.includes(skill.toLowerCase())) {
      existingSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const total = required.length || 1;
  const matchPercentage = Math.round((existingSkills.length / total) * 100);
  const skillGapPercentage = 100 - matchPercentage;

  const recommendations = [];
  if (missingSkills.length > 0) {
    recommendations.push({
      type: 'course',
      message: `Complete coursework for ${missingSkills.slice(0, 2).join(' and ')}`,
      skillsToLearn: missingSkills.slice(0, 3)
    });
    recommendations.push({
      type: 'interview',
      message: `Practice targeted technical interview questions on ${missingSkills[0]}`,
      topic: missingSkills[0]
    });
  }

  return {
    careerId: career._id || career.id,
    careerTitle: career.title,
    existingSkills,
    missingSkills,
    matchPercentage,
    skillGap: skillGapPercentage,
    recommendations
  };
};
