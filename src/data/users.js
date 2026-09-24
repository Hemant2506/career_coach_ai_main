export const DEFAULT_USER = {
  id: 'user_1',
  name: 'Hemant Saraswat',
  email: 'demo@careercoach.ai',
  avatar: '/src/assets/images/avatar_student_hemant_1790260901814.jpg',
  role: 'student',
  education: 'B.Tech in Computer Science & Engineering',
  qualification: 'Undergraduate',
  graduationYear: '2026',
  location: 'Vadodara, Gujarat',
  preferredLocation: 'Vadodara / Bengaluru / Remote',
  careerGoal: 'Software Developer',
  targetIndustry: 'Information Technology',
  careerReadiness: 78,
  goalProgress: 68,
  bio: 'Aspiring Full-Stack Software Developer passionate about high-performance web applications, algorithms, and AI integration.',
  skills: [
    { name: 'Java', level: 90, category: 'Backend' },
    { name: 'SQL', level: 80, category: 'Database' },
    { name: 'JavaScript', level: 60, category: 'Frontend' },
    { name: 'React', level: 40, category: 'Frontend' },
    { name: 'Git', level: 50, category: 'Tools' },
    { name: 'Python', level: 70, category: 'Backend' },
    { name: 'HTML/CSS', level: 85, category: 'Frontend' },
    { name: 'Problem Solving', level: 75, category: 'Core' }
  ],
  stats: {
    interviewScore: 82,
    coursesCompleted: 6,
    skillsImproved: 8,
    jobMatches: 24,
    totalInterviews: 5,
    assessmentsCompleted: 4
  },
  recentActivity: [
    {
      id: 'act_1',
      title: 'Completed JavaScript course',
      detail: 'Finished Module 4: Asynchronous Programming & Promises',
      time: '2 hours ago',
      type: 'course'
    },
    {
      id: 'act_2',
      title: 'Took SQL Assessment',
      detail: 'Scored 85% in Database Query Optimization',
      time: 'Yesterday',
      type: 'assessment'
    },
    {
      id: 'act_3',
      title: 'Completed Software Developer Interview',
      detail: 'Scored 82/100 (Technical: 85%, Communication: 82%)',
      time: '2 days ago',
      type: 'interview'
    },
    {
      id: 'act_4',
      title: 'Saved a Job',
      detail: 'Junior Full Stack Engineer at ABC Technologies (Vadodara)',
      time: '3 days ago',
      type: 'job'
    },
    {
      id: 'act_5',
      title: 'Improved React Skill',
      detail: 'Gained +15% proficiency score after completing component lifecycle lab',
      time: '4 days ago',
      type: 'skill'
    }
  ]
};

export const ADMIN_USER = {
  id: 'user_admin',
  name: 'Faculty Coordinator',
  email: 'admin@careercoach.ai',
  avatar: '/src/assets/images/avatar_student_hemant_1790260901814.jpg',
  role: 'admin',
  location: 'Vadodara Campus'
};
