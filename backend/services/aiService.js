/**
 * AI Service for Interview and Answer Evaluation
 * Modular design allowing effortless replacement with OpenAI / Gemini API in the future.
 */

export const evaluateInterviewAnswer = async ({ questionText, answerText, expectedKeywords = [], modelAnswer = '' }) => {
  const text = (answerText || '').trim();
  const lowerAnswer = text.toLowerCase();

  // If answer is empty or too short
  if (text.length < 5) {
    return {
      score: 30,
      relevance: 40,
      technicalKnowledge: 30,
      communication: 40,
      grammar: 60,
      completeness: 20,
      strengths: ['Attempted to respond to the prompt'],
      improvements: [
        'Provide a more thorough explanation with concrete technical terminology',
        'State definitions clearly before discussing implementation details'
      ],
      sampleAnswer: modelAnswer || 'A structured answer explains core definitions, operational mechanics, and trade-offs.'
    };
  }

  // Calculate keyword matches
  let keywordsMatched = 0;
  expectedKeywords.forEach(kw => {
    if (lowerAnswer.includes(kw.toLowerCase())) {
      keywordsMatched++;
    }
  });

  const keywordRatio = expectedKeywords.length > 0 ? (keywordsMatched / expectedKeywords.length) : 0.7;
  const lengthFactor = Math.min(100, Math.max(50, Math.floor((text.length / 140) * 85)));

  // Scores
  const technicalKnowledge = Math.min(98, Math.max(55, Math.round(keywordRatio * 50 + lengthFactor * 0.45)));
  const relevance = Math.min(96, Math.max(60, Math.round(keywordRatio * 60 + 35)));
  const communication = Math.min(95, Math.max(65, Math.round(lengthFactor * 0.6 + 35)));
  const grammar = Math.min(96, Math.max(75, 85 + (text.length > 80 ? 7 : 0)));
  const completeness = Math.min(95, Math.max(50, Math.round(lengthFactor * 0.8 + keywordRatio * 15)));

  const overallScore = Math.round(
    technicalKnowledge * 0.35 +
    communication * 0.25 +
    relevance * 0.15 +
    grammar * 0.10 +
    completeness * 0.15
  );

  // Dynamic feedback comments
  const strengths = [];
  if (keywordsMatched > 0) {
    strengths.push('Used relevant domain terminology and key technical concepts');
  } else {
    strengths.push('Demonstrated logical approach to addressing the interviewer question');
  }
  if (text.length > 100) {
    strengths.push('Good answer length demonstrating depth of subject thought');
  }
  if (communication >= 80) {
    strengths.push('Articulate communication with clear sentence structuring');
  }

  const improvements = [];
  if (keywordsMatched < expectedKeywords.length) {
    const missing = expectedKeywords.filter(kw => !lowerAnswer.includes(kw.toLowerCase())).slice(0, 2);
    if (missing.length > 0) {
      improvements.push(`Consider mentioning key concepts such as "${missing.join('", "')}"`);
    }
  }
  if (text.length < 120) {
    improvements.push('Explain the concept with a concrete real-world code or architecture example');
  }
  improvements.push('Structure longer responses into distinct sequential points or trade-offs');

  return {
    score: overallScore,
    relevance,
    technicalKnowledge,
    communication,
    grammar,
    completeness,
    strengths,
    improvements,
    sampleAnswer: modelAnswer || 'A structured engineering answer defines the core principle, implementation steps, and production failure modes.'
  };
};

export const generateAggregatedResult = (answers = [], category = 'Software Developer') => {
  if (answers.length === 0) {
    return {
      totalScore: 75,
      technicalScore: 75,
      communicationScore: 78,
      relevanceScore: 76,
      grammarScore: 85,
      completenessScore: 70,
      strengths: ['Completed scheduled session'],
      weaknesses: ['Practice answering multi-part questions'],
      recommendations: ['Review foundational language documentation'],
      sampleAnswers: []
    };
  }

  let totalScoreSum = 0;
  let techSum = 0;
  let commSum = 0;
  let relSum = 0;
  let gramSum = 0;
  let compSum = 0;

  answers.forEach(a => {
    const evalObj = a.evaluation || {};
    totalScoreSum += evalObj.score || 75;
    techSum += evalObj.technicalKnowledge || 75;
    commSum += evalObj.communication || 75;
    relSum += evalObj.relevance || 75;
    gramSum += evalObj.grammar || 80;
    compSum += evalObj.completeness || 70;
  });

  const count = answers.length;
  const totalScore = Math.round(totalScoreSum / count);
  const technicalScore = Math.round(techSum / count);
  const communicationScore = Math.round(commSum / count);
  const relevanceScore = Math.round(relSum / count);
  const grammarScore = Math.round(gramSum / count);
  const completenessScore = Math.round(compSum / count);

  return {
    totalScore,
    technicalScore,
    communicationScore,
    relevanceScore,
    grammarScore,
    completenessScore,
    strengths: [
      'Strong command of fundamental terminology and technical taxonomy',
      'Direct, concise answers that stayed on topic without meandering',
      'Demonstrated genuine engineering logic and clear explanation flow'
    ],
    weaknesses: [
      'Incorporate concrete production examples or quantifiable metrics (e.g. latency, throughput)',
      'Explain boundary conditions, edge cases, or exception handling explicitly',
      'For complex multi-part questions, use a structured numbered outline'
    ],
    recommendations: [
      { title: 'React.js & Modern Frontend Architecture', reason: `Because technical score was ${technicalScore}%` },
      { title: 'Professional Communication for Engineers', reason: `Because communication score was ${communicationScore}%` },
      { title: 'SQL & Database Design Mastery', reason: 'Sharpen backend query optimization and data modeling' }
    ],
    sampleAnswers: answers.map(a => a.evaluation?.sampleAnswer || '').filter(Boolean)
  };
};
