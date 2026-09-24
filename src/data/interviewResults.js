export const DEFAULT_INTERVIEW_HISTORY = [
  {
    id: 'int_hist_5',
    date: '23 Sep 2026',
    role: 'Software Developer',
    roleId: 'software-developer',
    difficulty: 'Intermediate',
    score: 82,
    breakdown: {
      technical: 85,
      communication: 82,
      relevance: 84,
      grammar: 90,
      completeness: 78
    },
    questionCount: 5,
    mode: 'Text',
    feedbackWell: [
      'Clear, articulate explanation of block scoping and memory allocations',
      'Accurate usage of industry-standard technical terminology',
      'Demonstrated structured problem-solving approach'
    ],
    feedbackImprove: [
      'Add concrete production examples or code snippets to strengthen arguments',
      'Explain edge cases and failure modes in greater depth',
      'Structure longer answers with numbered bullet points'
    ],
    sampleQuestion: 'Explain the difference between let, const and var in JavaScript.',
    sampleAnswer: '`var` is function-scoped and hoisted with undefined initialization, while `let` and `const` are block-scoped and live in a Temporal Dead Zone until their declaration line is executed.',
    recommendedCourses: [
      { id: 'course_react', title: 'React.js & Modern Frontend Architecture', reason: 'To reinforce modern state and lifecycle patterns' },
      { id: 'course_comm_skills', title: 'Professional Communication for Engineers', reason: 'Because communication score was 82%' },
      { id: 'course_sql', title: 'SQL & Database Design Mastery', reason: 'Deepen knowledge in backend query optimization' }
    ]
  },
  {
    id: 'int_hist_4',
    date: '20 Sep 2026',
    role: 'HR Interview',
    roleId: 'hr-interview',
    difficulty: 'Beginner',
    score: 88,
    breakdown: {
      technical: 86,
      communication: 92,
      relevance: 88,
      grammar: 94,
      completeness: 80
    },
    questionCount: 5,
    mode: 'Voice',
    feedbackWell: [
      'Excellent vocal pacing and confident demeanor',
      'Effective usage of the STAR framework to describe past project conflicts',
      'Genuine self-awareness when discussing growth areas'
    ],
    feedbackImprove: [
      'Tie long-term personal goals more closely to business outcomes',
      'Keep introductory elevator pitch within 90 seconds'
    ],
    sampleQuestion: 'Tell me about yourself and why you chose software engineering.',
    sampleAnswer: 'Computer science graduate with passion for web architecture and practical project experience...',
    recommendedCourses: [
      { id: 'course_interview_prep', title: 'Technical & Behavioral Interview Preparation', reason: 'Master executive presence and STAR storytelling' }
    ]
  },
  {
    id: 'int_hist_3',
    date: '17 Sep 2026',
    role: 'Web Developer',
    roleId: 'web-developer',
    difficulty: 'Intermediate',
    score: 74,
    breakdown: {
      technical: 72,
      communication: 76,
      relevance: 78,
      grammar: 82,
      completeness: 65
    },
    questionCount: 5,
    mode: 'Text',
    feedbackWell: [
      'Good comprehension of CSS Flexbox vs Grid trade-offs',
      'Clear definition of Virtual DOM diffing mechanics'
    ],
    feedbackImprove: [
      'Elaborate further on React 18 concurrent features and hydration',
      'Explain web accessibility ARIA roles and contrast standards'
    ],
    sampleQuestion: 'What is the difference between CSS Flexbox and CSS Grid?',
    sampleAnswer: 'Flexbox is 1-dimensional for rows or columns, while Grid is 2-dimensional managing both simultaneously.',
    recommendedCourses: [
      { id: 'course_react', title: 'React.js & Modern Frontend Architecture', reason: 'Improve React and component lifecycle score' }
    ]
  },
  {
    id: 'int_hist_2',
    date: '12 Sep 2026',
    role: 'Software Developer',
    roleId: 'software-developer',
    difficulty: 'Beginner',
    score: 68,
    breakdown: {
      technical: 66,
      communication: 70,
      relevance: 72,
      grammar: 80,
      completeness: 58
    },
    questionCount: 5,
    mode: 'Text',
    feedbackWell: [
      'Identified object-oriented programming principles',
      'Good understanding of primitive types'
    ],
    feedbackImprove: [
      'Missed key hash table collision resolution techniques',
      'Answers were somewhat brief; aim for 3-4 structured sentences'
    ],
    sampleQuestion: 'What are the four core principles of OOP?',
    sampleAnswer: 'Encapsulation, Abstraction, Inheritance, and Polymorphism.',
    recommendedCourses: [
      { id: 'course_java', title: 'Java Programming Masterclass', reason: 'Strengthen OOP and Collections mastery' }
    ]
  },
  {
    id: 'int_hist_1',
    date: '05 Sep 2026',
    role: 'Data Analyst',
    roleId: 'data-analyst',
    difficulty: 'Beginner',
    score: 62,
    breakdown: {
      technical: 58,
      communication: 65,
      relevance: 68,
      grammar: 76,
      completeness: 50
    },
    questionCount: 5,
    mode: 'Text',
    feedbackWell: [
      'Clear understanding of WHERE vs HAVING clauses',
      'Good basic grasp of SQL SELECT syntax'
    ],
    feedbackImprove: [
      'Lacked depth on SQL window functions and partitioning',
      'Need to practice communicating statistical significance in business terms'
    ],
    sampleQuestion: 'What is the difference between WHERE and HAVING in SQL?',
    sampleAnswer: 'WHERE filters rows before grouping, and HAVING filters after GROUP BY.',
    recommendedCourses: [
      { id: 'course_sql', title: 'SQL & Database Design Mastery', reason: 'Crucial for database interview rounds' }
    ]
  }
];

export function evaluateInterviewResponse(userAnswers, questions, role, difficulty) {
  // Simulate AI evaluation algorithm based on keyword matching, length, and completeness
  let totalLength = 0;
  let totalKeywordsMatched = 0;
  let totalPossibleKeywords = 0;

  userAnswers.forEach((ans, index) => {
    const q = questions[index];
    const text = (ans?.text || '').toLowerCase();
    totalLength += text.length;

    if (q?.expectedKeywords) {
      totalPossibleKeywords += q.expectedKeywords.length;
      q.expectedKeywords.forEach(kw => {
        if (text.includes(kw.toLowerCase())) {
          totalKeywordsMatched++;
        }
      });
    }
  });

  const keywordRatio = totalPossibleKeywords > 0 ? (totalKeywordsMatched / totalPossibleKeywords) : 0.7;
  const lengthScore = Math.min(100, Math.max(50, Math.floor((totalLength / (questions.length * 90)) * 90)));
  const keywordScore = Math.min(98, Math.max(60, Math.floor(keywordRatio * 100)));

  const technical = Math.min(96, Math.max(65, Math.round(keywordScore * 0.7 + lengthScore * 0.3)));
  const communication = Math.min(95, Math.max(70, Math.round(lengthScore * 0.6 + keywordScore * 0.4)));
  const relevance = Math.min(94, Math.max(68, Math.round(keywordScore * 0.8 + 15)));
  const grammar = Math.min(98, Math.max(75, 88 + (totalLength > 100 ? 5 : 0)));
  const completeness = Math.min(92, Math.max(60, Math.round(lengthScore * 0.85)));

  const overall = Math.round((technical * 0.35) + (communication * 0.25) + (relevance * 0.15) + (grammar * 0.1) + (completeness * 0.15));

  const resultId = 'int_' + Date.now();
  const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return {
    id: resultId,
    date: dateStr,
    role: role,
    difficulty: difficulty,
    score: overall,
    breakdown: {
      technical,
      communication,
      relevance,
      grammar,
      completeness
    },
    questionCount: questions.length,
    userAnswers: userAnswers,
    feedbackWell: [
      'Strong command of fundamental terminology and technical taxonomy',
      'Direct, concise answers that stayed on topic without meandering',
      'Demonstrated genuine engineering logic and clear explanation flow'
    ],
    feedbackImprove: [
      'Incorporate concrete production examples or quantifiable metrics (e.g. latency, throughput)',
      'Explain boundary conditions, edge cases, or exception handling explicitly',
      'For complex multi-part questions, use a structured numbered outline'
    ],
    sampleQuestion: questions[0]?.text || 'Explain core technical trade-offs.',
    sampleAnswer: questions[0]?.modelAnswer || 'A structured approach evaluates computational complexity, memory bounds, and architectural maintainability.',
    recommendedCourses: [
      { id: 'course_react', title: 'React.js & Modern Frontend Architecture', reason: `Because your technical score was ${technical}%.` },
      { id: 'course_comm_skills', title: 'Professional Communication for Engineers', reason: `Because your communication score was ${communication}%.` },
      { id: 'course_sql', title: 'SQL & Database Design Mastery', reason: 'Sharpen backend queries and system reliability.' }
    ]
  };
}
