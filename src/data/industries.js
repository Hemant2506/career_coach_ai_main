export const INDUSTRIES = [
  {
    id: 'it',
    name: 'Information Technology',
    icon: 'Laptop',
    description: 'The foundation of digital transformation, encompassing cloud systems, enterprise platforms, and consumer software.',
    jobRolesCount: 42,
    popularRoles: [
      'Software Developer',
      'Web Developer',
      'Data Analyst',
      'UI/UX Designer',
      'Cloud Engineer',
      'DevOps Engineer'
    ],
    popularSkills: ['Java', 'Python', 'SQL', 'React', 'Git', 'Docker', 'REST APIs'],
    overview: 'Information Technology continues to drive massive global innovation. High demand exists for software developers, system architects, and full-stack engineers capable of building scalable, reliable distributed applications.',
    marketGrowth: '+18% Annual Hiring Rate'
  },
  {
    id: 'banking-finance',
    name: 'Banking & Finance',
    icon: 'Landmark',
    description: 'Fintech platforms, investment banking, algorithmic trading, and quantitative risk management.',
    jobRolesCount: 28,
    popularRoles: [
      'Financial Analyst',
      'Fintech Software Engineer',
      'Risk Modeling Associate',
      'Compliance Officer'
    ],
    popularSkills: ['SQL', 'Python', 'Financial Modeling', 'Excel', 'Data Analytics', 'Risk Management'],
    overview: 'The banking and financial technology sectors rely heavily on real-time transaction processing, algorithmic ledger verification, and predictive credit assessment systems.',
    marketGrowth: '+14% Annual Growth'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: 'Activity',
    description: 'Healthtech, biomedical instrumentation, clinical data management, and telemedicine infrastructure.',
    jobRolesCount: 19,
    popularRoles: [
      'Healthcare Data Analyst',
      'Clinical Systems Specialist',
      'Medical Software QA',
      'Bioinformatics Associate'
    ],
    popularSkills: ['Python', 'SQL', 'HL7 / FHIR Protocols', 'Data Privacy (HIPAA)', 'Bioinformatics'],
    overview: 'Modern healthcare relies on connected health records, automated diagnostic imaging, and telemedicine applications that demand high security and data integrity.',
    marketGrowth: '+16% Annual Growth'
  },
  {
    id: 'automobile',
    name: 'Automobile',
    icon: 'Car',
    description: 'Electric vehicle (EV) engineering, autonomous systems, embedded telematics, and automotive manufacturing.',
    jobRolesCount: 15,
    popularRoles: [
      'Embedded Software Engineer',
      'EV Battery Systems Analyst',
      'Automotive UI Developer',
      'Supply Chain Coordinator'
    ],
    popularSkills: ['C/C++', 'Embedded Systems', 'CAN Bus', 'Python', 'MATLAB/Simulink'],
    overview: 'The automotive sector is transitioning rapidly into connected, electric mobility with rich infotainment user interfaces and intelligent sensor processing.',
    marketGrowth: '+21% EV Sector Growth'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: 'Cpu',
    description: 'Industry 4.0, smart factory robotics, industrial IoT, and digital production line optimization.',
    jobRolesCount: 18,
    popularRoles: [
      'Industrial Automation Engineer',
      'Operations Analyst',
      'Quality Control Specialist',
      'PLC Programmer'
    ],
    popularSkills: ['PLC Systems', 'SCADA', 'Industrial IoT', 'Python', 'Six Sigma Quality'],
    overview: 'Modern smart manufacturing utilizes sensor networks, automated assembly robotics, and data analytics to optimize throughput and predictive maintenance.',
    marketGrowth: '+11% Annual Growth'
  },
  {
    id: 'education',
    name: 'Education',
    icon: 'GraduationCap',
    description: 'EdTech platforms, instructional design, adaptive learning algorithms, and academic analytics.',
    jobRolesCount: 14,
    popularRoles: [
      'EdTech Frontend Developer',
      'Curriculum Designer',
      'Student Success Analyst',
      'E-Learning Content Developer'
    ],
    popularSkills: ['React', 'Node.js', 'Instructional Design', 'LMS Platforms', 'Communication'],
    overview: 'The education technology landscape focuses on personalized learning algorithms, gamified skill acquisition, and real-time student performance tracking.',
    marketGrowth: '+15% Annual Growth'
  },
  {
    id: 'telecommunications',
    name: 'Telecommunications',
    icon: 'Radio',
    description: '5G network rollouts, optical fiber routing, cloud communications, and edge computing.',
    jobRolesCount: 12,
    popularRoles: [
      'Network Operations Engineer',
      'Telecom Software Developer',
      '5G Infrastructure Specialist',
      'RF Systems Associate'
    ],
    popularSkills: ['Networking (TCP/IP)', 'Linux', 'Python', '5G Core Architecture', 'Wireshark'],
    overview: 'Telecom providers are building next-generation ultra-low latency infrastructure, enabling connected vehicles, industrial IoT, and high-definition multimedia streaming.',
    marketGrowth: '+13% Annual Growth'
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: 'ShoppingBag',
    description: 'Omnichannel e-commerce, digital point-of-sale, inventory intelligence, and supply chain logistics.',
    jobRolesCount: 20,
    popularRoles: [
      'E-Commerce Operations Lead',
      'Merchandising Data Analyst',
      'Customer Experience Specialist',
      'Inventory Systems Engineer'
    ],
    popularSkills: ['SQL', 'Shopify / Magento APIs', 'Data Analytics', 'Digital Marketing', 'Python'],
    overview: 'Retail has converged with omnichannel digital platforms, requiring fast recommendation engines, real-time inventory synchronization, and intuitive mobile checkouts.',
    marketGrowth: '+12% Annual Growth'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    icon: 'Shield',
    description: 'Threat hunting, security operations (SOC), ethical penetration testing, and regulatory compliance.',
    jobRolesCount: 22,
    popularRoles: [
      'Cybersecurity Analyst',
      'SOC Tier-1 Analyst',
      'Security Operations Engineer',
      'Vulnerability Tester'
    ],
    popularSkills: ['SIEM Tools', 'Network Security', 'Linux', 'OWASP Top 10', 'Wireshark', 'Cryptography'],
    overview: 'With the exponential growth of cloud services and remote operations, cybersecurity specialists are among the most sought-after technical professionals worldwide.',
    marketGrowth: '+26% Critical Demand'
  },
  {
    id: 'data-analytics',
    name: 'Data & Analytics',
    icon: 'BarChart3',
    description: 'Business intelligence, data pipelines, quantitative modeling, and decision science.',
    jobRolesCount: 31,
    popularRoles: [
      'Data Analyst',
      'BI Developer',
      'Data Engineer',
      'Decision Intelligence Associate'
    ],
    popularSkills: ['SQL', 'Python', 'Power BI', 'Tableau', 'Excel', 'Data Modeling'],
    overview: 'Data & Analytics powers every high-growth modern business, transforming millions of clickstream and operational transactions into crisp executive dashboards.',
    marketGrowth: '+24% Annual Growth'
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    icon: 'Target',
    description: 'Performance marketing, search engine optimization (SEO), social campaigns, and growth loops.',
    jobRolesCount: 16,
    popularRoles: [
      'Digital Marketer',
      'SEO Specialist',
      'PPC Campaign Manager',
      'Content Marketing Associate'
    ],
    popularSkills: ['Google Analytics 4', 'SEO Strategy', 'Meta Ads Manager', 'Copywriting', 'Canva'],
    overview: 'Digital Marketing integrates quantitative attribution analysis with creative brand messaging to drive user acquisition across global digital channels.',
    marketGrowth: '+17% Annual Growth'
  },
  {
    id: 'design',
    name: 'Design',
    icon: 'Palette',
    description: 'Product design, user experience architecture, design systems, and interaction research.',
    jobRolesCount: 15,
    popularRoles: [
      'UI/UX Designer',
      'Product Designer',
      'Interaction Designer',
      'Visual Design Associate'
    ],
    popularSkills: ['Figma', 'Wireframing', 'User Research', 'Design Systems', 'Prototyping'],
    overview: 'Design defines the empathy, aesthetics, and usability of digital software products. Skilled designers create harmonious interfaces that drive adoption and customer delight.',
    marketGrowth: '+15% Annual Growth'
  }
];
