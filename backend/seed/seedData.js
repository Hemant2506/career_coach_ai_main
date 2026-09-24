import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import User from '../models/User.js';
import Career from '../models/Career.js';
import Industry from '../models/Industry.js';
import Job from '../models/Job.js';
import Course from '../models/Course.js';
import Assessment from '../models/Assessment.js';
import InterviewQuestion from '../models/InterviewQuestion.js';
import { connectDB } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

export const DEFAULT_USERS = [
  {
    name: 'Hemant Saraswat',
    email: 'demo@careercoach.ai',
    password: 'demo123',
    phone: '+91 98765 43210',
    education: 'B.Tech in Computer Science & Engineering',
    qualification: 'Undergraduate',
    graduationYear: '2026',
    skills: ['Java', 'SQL', 'JavaScript', 'React', 'Git'],
    preferredIndustry: 'Information Technology',
    preferredLocation: 'Vadodara, Gujarat',
    careerGoal: 'Software Developer',
    role: 'student'
  },
  {
    name: 'Faculty Coordinator',
    email: 'admin@careercoach.ai',
    password: 'admin123',
    phone: '+91 98765 00000',
    education: 'M.Tech in Computer Science',
    qualification: 'Faculty / Admin',
    graduationYear: '2018',
    skills: ['System Design', 'Curriculum Planning', 'Cloud Architecture'],
    preferredIndustry: 'Education',
    preferredLocation: 'Vadodara Campus',
    careerGoal: 'Academic Director',
    role: 'admin'
  }
];

export const DEFAULT_CAREERS = [
  {
    id: 'software-developer',
    slug: 'software-developer',
    title: 'Software Developer',
    category: 'Engineering',
    matchScore: 95,
    description: 'Design, build, test, and maintain robust software applications and distributed systems across frontend and backend platforms.',
    responsibilities: [
      'Write clean, well-tested, modular code adhering to industry standards',
      'Collaborate with product designers and engineers in agile sprint cycles',
      'Debug, optimize, and profile database queries and server bottlenecks',
      'Deploy applications using CI/CD pipelines and containerized environments'
    ],
    requiredSkills: ['Java', 'SQL', 'Data Structures', 'REST APIs', 'Git', 'System Design'],
    preferredQualification: 'B.Tech / B.E. / BCA / MCA in Computer Science or related fields',
    industries: ['Information Technology', 'Banking & Finance', 'Automobile', 'Healthcare'],
    averageSalary: '₹4.5 - ₹12 LPA',
    popularLocations: ['Vadodara', 'Bengaluru', 'Pune', 'Hyderabad', 'Remote'],
    roadmap: [
      { step: 1, title: 'Programming Fundamentals', desc: 'Master Core Java, memory models, OOP concepts, and syntax' },
      { step: 2, title: 'Data Structures & Algorithms', desc: 'Solve 150+ problems on arrays, trees, hashing, and dynamic programming' },
      { step: 3, title: 'Database & Backend', desc: 'Master SQL joins, indexes, normalization, and Spring Boot / Express REST APIs' },
      { step: 4, title: 'Full Stack Integration', desc: 'Build 2 capstone applications with React, JWT authentication, and Docker' },
      { step: 5, title: 'Interview Preparation', desc: 'Mock technical coding, system design fundamentals, and HR STAR framework' }
    ]
  },
  {
    id: 'web-developer',
    slug: 'web-developer',
    title: 'Web Developer',
    category: 'Engineering',
    matchScore: 88,
    description: 'Develop responsive, interactive web applications and progressive web apps with modern frontend frameworks and Node.js backends.',
    responsibilities: [
      'Build responsive client interfaces using React, Tailwind CSS, and TypeScript',
      'Integrate RESTful and GraphQL APIs with optimistic UI rendering',
      'Ensure web accessibility (WCAG), cross-browser compatibility, and speed optimization'
    ],
    requiredSkills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Tailwind CSS'],
    preferredQualification: 'B.Tech / BCA / B.Sc IT',
    industries: ['Information Technology', 'E-Commerce', 'Digital Marketing', 'Education'],
    averageSalary: '₹3.5 - ₹9 LPA',
    popularLocations: ['Ahmedabad', 'Vadodara', 'Bengaluru', 'Remote'],
    roadmap: [
      { step: 1, title: 'Core Web Foundations', desc: 'Semantic HTML, CSS Flexbox/Grid, and modern ES6+ JavaScript' },
      { step: 2, title: 'Frontend Frameworks', desc: 'React component lifecycles, hooks, state management, and Tailwind' },
      { step: 3, title: 'Server-side Basics', desc: 'Node.js, Express, MongoDB, and secure JWT authentication' },
      { step: 4, title: 'Real-world Deployment', desc: 'Deploying to Vercel/Render, CI/CD, and Lighthouse performance tuning' }
    ]
  },
  {
    id: 'data-analyst',
    slug: 'data-analyst',
    title: 'Data Analyst',
    category: 'Analytics',
    matchScore: 82,
    description: 'Transform raw datasets into actionable commercial insights using SQL queries, statistical Python modeling, and business dashboards.',
    responsibilities: [
      'Extract and cleanse structured and unstructured data using SQL and Pandas',
      'Design interactive executive dashboards in Power BI and Tableau',
      'Identify trends, anomalous patterns, and key revenue growth drivers'
    ],
    requiredSkills: ['SQL', 'Python', 'Excel', 'Power BI', 'Tableau', 'Statistics'],
    preferredQualification: 'B.Tech / B.Sc Statistics / BCA / B.Com with Data Analytics',
    industries: ['Data & Analytics', 'Banking & Finance', 'Retail', 'Healthcare'],
    averageSalary: '₹4.0 - ₹10 LPA',
    popularLocations: ['Mumbai', 'Bengaluru', 'Vadodara', 'Gurugram'],
    roadmap: [
      { step: 1, title: 'Advanced Excel & SQL', desc: 'Master nested SQL queries, window functions, pivot tables, and VLOOKUP' },
      { step: 2, title: 'Python for Data Science', desc: 'NumPy, Pandas data wrangling, Matplotlib, and exploratory data analysis' },
      { step: 3, title: 'BI Tools & Storytelling', desc: 'Build live dashboard pipelines in Power BI or Tableau with DAX formulas' },
      { step: 4, title: 'Business Case Studies', desc: 'Analyze real fintech, churn, and ecommerce customer retention datasets' }
    ]
  },
  {
    id: 'ui-ux-designer',
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    category: 'Design',
    matchScore: 78,
    description: 'Craft intuitive, aesthetically pleasing user interfaces and research user workflows to deliver high-converting digital product experiences.',
    responsibilities: [
      'Conduct user interviews, surveys, and competitive usability audits',
      'Produce wireframes, interactive Figma prototypes, and comprehensive design systems',
      'Test prototypes with representative users to validate ergonomics and copy clarity'
    ],
    requiredSkills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing'],
    preferredQualification: 'Any Graduate / B.Des / B.Tech with Design Portfolio',
    industries: ['Design', 'Information Technology', 'Digital Marketing', 'Retail'],
    averageSalary: '₹3.8 - ₹9.5 LPA',
    popularLocations: ['Bengaluru', 'Mumbai', 'Pune', 'Remote'],
    roadmap: [
      { step: 1, title: 'Design Principles', desc: 'Color theory, typography hierarchy, grid systems, and cognitive ergonomics' },
      { step: 2, title: 'Figma Mastery', desc: 'Auto layout, components, interactive variant states, and prototyping' },
      { step: 3, title: 'UX Research', desc: 'Empathy mapping, user personas, journey mapping, and usability testing' },
      { step: 4, title: 'Portfolio Development', desc: 'Publish 3 comprehensive case studies detailing problem statement to validated design' }
    ]
  },
  {
    id: 'cybersecurity-analyst',
    slug: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Security',
    matchScore: 75,
    description: 'Safeguard organization networks, detect intrusion attempts, and enforce compliance policies against modern cyber threats.',
    responsibilities: [
      'Monitor Security Information and Event Management (SIEM) tools for suspicious activity',
      'Perform vulnerability scans, penetration assessments, and patch tracking',
      'Assist in incident containment, forensic investigation, and threat remediation'
    ],
    requiredSkills: ['Network Security', 'Linux', 'SIEM', 'Ethical Hacking', 'Wireshark', 'Cryptography'],
    preferredQualification: 'B.Tech / B.Sc IT / Cybersecurity certification (CEH, CompTIA Security+)',
    industries: ['Cybersecurity', 'Banking & Finance', 'Information Technology', 'Telecom'],
    averageSalary: '₹5.0 - ₹13 LPA',
    popularLocations: ['Bengaluru', 'Hyderabad', 'Pune', 'Noida'],
    roadmap: [
      { step: 1, title: 'Networking & Operating Systems', desc: 'Deep dive into TCP/IP protocols, subnetting, Linux command line, and firewall configurations' },
      { step: 2, title: 'Security Fundamentals', desc: 'CIA triad, symmetric/asymmetric cryptography, and attack vectors (OWASP Top 10)' },
      { step: 3, title: 'Defensive & Threat Analysis', desc: 'Analyze packet captures in Wireshark and configure Splunk SIEM dashboards' },
      { step: 4, title: 'Security Certifications', desc: 'Prepare for CompTIA Security+ or Certified Ethical Hacker (CEH)' }
    ]
  },
  {
    id: 'cloud-engineer',
    slug: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Infrastructure',
    matchScore: 72,
    description: 'Architect, automate, and administer scalable infrastructure services using AWS, Azure, Google Cloud, Docker, and Kubernetes.',
    responsibilities: [
      'Deploy and monitor serverless functions and compute instances',
      'Implement automated Infrastructure as Code (IaC) with Terraform',
      'Configure cloud networking, VPC peering, subnets, and load balancers'
    ],
    requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'Terraform', 'CI/CD'],
    preferredQualification: 'B.Tech Computer Science / Information Technology',
    industries: ['Information Technology', 'Telecom', 'Banking & Finance'],
    averageSalary: '₹5.5 - ₹14 LPA',
    popularLocations: ['Bengaluru', 'Hyderabad', 'Chennai', 'Remote'],
    roadmap: [
      { step: 1, title: 'Linux & Scripting', desc: 'Bash scripting, cron jobs, process inspection, and SSH security' },
      { step: 2, title: 'Containerization', desc: 'Docker images, multi-stage builds, volumes, and Docker Compose' },
      { step: 3, title: 'Public Cloud (AWS/GCP)', desc: 'EC2, S3, IAM roles, Lambda serverless, and CloudWatch metrics' },
      { step: 4, title: 'Kubernetes & IaC', desc: 'Pods, Deployments, Services, and writing declarative Terraform configurations' }
    ]
  },
  {
    id: 'digital-marketer',
    slug: 'digital-marketer',
    title: 'Digital Marketer',
    category: 'Marketing',
    matchScore: 68,
    description: 'Drive audience acquisition, brand visibility, and lead conversions through search engine optimization, paid advertising, and email automation.',
    responsibilities: [
      'Execute high-ROI paid ad campaigns on Google Ads and Meta Ads Manager',
      'Conduct keyword research and optimize technical on-page and off-page SEO',
      'Analyze campaign conversions, attribution funnels, and customer acquisition costs'
    ],
    requiredSkills: ['SEO', 'Google Ads', 'Content Strategy', 'Social Media Marketing', 'Google Analytics 4', 'Copywriting'],
    preferredQualification: 'BBA / B.Com / B.A. / Any Graduate',
    industries: ['Digital Marketing', 'Retail', 'Education', 'E-Commerce'],
    averageSalary: '₹3.0 - ₹7.5 LPA',
    popularLocations: ['Mumbai', 'Delhi NCR', 'Ahmedabad', 'Remote'],
    roadmap: [
      { step: 1, title: 'Digital Fundamentals', desc: 'Marketing funnels, persona targeting, customer lifetime value, and brand positioning' },
      { step: 2, title: 'SEO & Content', desc: 'Keyword strategy with Semrush, metadata optimization, and backlink outreach' },
      { step: 3, title: 'Performance Marketing', desc: 'Setting up Meta pixel tracking, Google search ad budgeting, and A/B ad creative testing' },
      { step: 4, title: 'Analytics & Attribution', desc: 'Google Analytics 4 event setup, dashboarding, and marketing ROI reporting' }
    ]
  }
];

export const DEFAULT_INDUSTRIES = [
  {
    id: 'it',
    slug: 'it',
    name: 'Information Technology',
    icon: 'Laptop',
    description: 'The foundation of digital transformation, encompassing cloud systems, enterprise platforms, and consumer software.',
    popularRoles: ['Software Developer', 'Full Stack Engineer', 'Cloud Architect', 'DevOps Specialist'],
    requiredSkills: ['Java', 'Python', 'JavaScript', 'React', 'Node.js', 'Docker', 'AWS'],
    popularLocations: ['Vadodara', 'Bengaluru', 'Hyderabad', 'Pune', 'Noida'],
    companies: ['TCS', 'Infosys', 'Wipro', 'ABC Technologies', 'Cognizant', 'LTI Mindtree'],
    availableJobsCount: 148,
    marketGrowth: '+12.4% YoY'
  },
  {
    id: 'banking-finance',
    slug: 'banking-finance',
    name: 'Banking & Finance',
    icon: 'Landmark',
    description: 'Fintech platforms, investment banking, algorithmic trading, and secure core banking transaction engines.',
    popularRoles: ['Fintech Developer', 'Data Analyst', 'Financial Risk Analyst', 'Security Specialist'],
    requiredSkills: ['SQL', 'Python', 'Financial Modeling', 'Risk Assessment', 'Java', 'Compliance'],
    popularLocations: ['Mumbai', 'Vadodara', 'Bengaluru', 'Ahmedabad'],
    companies: ['HDFC Bank', 'ICICI Bank', 'Razorpay', 'Zerodha', 'Paytm', 'Kotak Mahindra'],
    availableJobsCount: 92,
    marketGrowth: '+14.1% YoY'
  },
  {
    id: 'healthcare',
    slug: 'healthcare',
    name: 'Healthcare & HealthTech',
    icon: 'HeartPulse',
    description: 'Electronic health records, telemedicine, medical diagnostic algorithms, and hospital management software.',
    popularRoles: ['Health Data Analyst', 'Biomedical Software Engineer', 'Clinical Research Associate'],
    requiredSkills: ['Python', 'SQL', 'HL7/FHIR Protocols', 'Machine Learning', 'Data Privacy (HIPAA)'],
    popularLocations: ['Vadodara', 'Ahmedabad', 'Bengaluru', 'Hyderabad'],
    companies: ['Sun Pharma', 'Zydus Lifesciences', 'Apollo Hospitals', 'Practo', '1mg'],
    availableJobsCount: 64,
    marketGrowth: '+16.5% YoY'
  },
  {
    id: 'automobile',
    slug: 'automobile',
    name: 'Automobile & EV Mobility',
    icon: 'Car',
    description: 'Electric vehicle battery management, connected telematics, embedded software, and smart assembly manufacturing.',
    popularRoles: ['Embedded Systems Engineer', 'Automotive Software Developer', 'Quality Assurance Engineer'],
    requiredSkills: ['Embedded C/C++', 'CAN Protocol', 'MATLAB/Simulink', 'IoT Sensors', 'Python'],
    popularLocations: ['Vadodara', 'Pune', 'Chennai', 'Sanand (Gujarat)'],
    companies: ['Tata Motors', 'Mahindra & Mahindra', 'Ola Electric', 'MG Motor India', 'Hero MotoCorp'],
    availableJobsCount: 55,
    marketGrowth: '+18.2% YoY'
  },
  {
    id: 'manufacturing',
    slug: 'manufacturing',
    name: 'Manufacturing & Industry 4.0',
    icon: 'Factory',
    description: 'Smart factory automation, predictive robotics maintenance, PLC programming, and supply chain logistics.',
    popularRoles: ['Automation Engineer', 'Supply Chain Analyst', 'Industrial IoT Specialist'],
    requiredSkills: ['PLC Programming', 'SCADA', 'Industrial IoT', 'SQL', 'Lean Six Sigma'],
    popularLocations: ['Vadodara (Halol)', 'Surat', 'Pune', 'Gurugram'],
    companies: ['L&T', 'Siemens', 'ABB India', 'Adani Enterprises', 'Godrej Industries'],
    availableJobsCount: 71,
    marketGrowth: '+9.8% YoY'
  },
  {
    id: 'education',
    slug: 'education',
    name: 'Education & EdTech',
    icon: 'GraduationCap',
    description: 'Interactive learning management platforms, gamified assessments, and AI personalized tutoring systems.',
    popularRoles: ['Curriculum Developer', 'EdTech Full Stack Engineer', 'Learning Experience Designer'],
    requiredSkills: ['React', 'Node.js', 'Instructional Design', 'Video Production', 'Python'],
    popularLocations: ['Bengaluru', 'Vadodara', 'Delhi NCR', 'Remote'],
    companies: ['Unacademy', 'PhysicsWallah', 'Coursera India', 'Eruditus', 'Scaler'],
    availableJobsCount: 46,
    marketGrowth: '+11.2% YoY'
  },
  {
    id: 'telecom',
    slug: 'telecom',
    name: 'Telecom & 5G Infrastructure',
    icon: 'Radio',
    description: '5G core network architectures, optical fiber backbones, cloud telephony, and IoT gateway connectivity.',
    popularRoles: ['Network Engineer', '5G Protocol Developer', 'Cloud Infrastructure Engineer'],
    requiredSkills: ['TCP/IP', 'Linux', 'Network Security', 'Python', 'Kubernetes', 'SDN'],
    popularLocations: ['Mumbai', 'Bengaluru', 'Vadodara', 'Noida'],
    companies: ['Reliance Jio', 'Bharti Airtel', 'Vodafone Idea', 'Nokia India', 'Ericsson'],
    availableJobsCount: 52,
    marketGrowth: '+13.7% YoY'
  },
  {
    id: 'retail',
    slug: 'retail',
    name: 'Retail & E-Commerce',
    icon: 'ShoppingBag',
    description: 'High-volume transaction engines, personalized recommendation feeds, inventory sync, and omni-channel POS.',
    popularRoles: ['E-Commerce Developer', 'Inventory Analyst', 'Growth Marketer', 'UX Specialist'],
    requiredSkills: ['React', 'Node.js', 'SQL', 'Microservices', 'Payment Gateway Integration'],
    popularLocations: ['Bengaluru', 'Mumbai', 'Vadodara', 'Gurugram'],
    companies: ['Flipkart', 'Amazon India', 'Myntra', 'Reliance Retail', 'Blinkit', 'Nykaa'],
    availableJobsCount: 110,
    marketGrowth: '+17.4% YoY'
  },
  {
    id: 'cybersecurity',
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    icon: 'Shield',
    description: 'Critical cyber defense, vulnerability management, digital forensics, and proactive SOC threat hunting.',
    popularRoles: ['SOC Analyst', 'Penetration Tester', 'Cloud Security Architect'],
    requiredSkills: ['SIEM', 'Network Protocols', 'Linux', 'Ethical Hacking', 'OWASP', 'Python'],
    popularLocations: ['Bengaluru', 'Hyderabad', 'Pune', 'Noida'],
    companies: ['Quick Heal', 'CrowdStrike India', 'Tata Advanced Systems', 'PwC Cyber', 'Deloitte'],
    availableJobsCount: 68,
    marketGrowth: '+21.0% YoY'
  },
  {
    id: 'data-analytics',
    slug: 'data-analytics',
    name: 'Data & Analytics',
    icon: 'BarChart3',
    description: 'Big data pipelines, business intelligence dashboards, real-time analytics, and machine learning operations.',
    popularRoles: ['Data Analyst', 'Data Engineer', 'BI Developer', 'Machine Learning Engineer'],
    requiredSkills: ['SQL', 'Python', 'Power BI', 'Spark', 'Snowflake', 'Pandas'],
    popularLocations: ['Bengaluru', 'Vadodara', 'Mumbai', 'Hyderabad'],
    companies: ['Fractal Analytics', 'Mu Sigma', 'Tiger Analytics', 'Accenture AI', 'LatentView'],
    availableJobsCount: 135,
    marketGrowth: '+22.5% YoY'
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    name: 'Digital Marketing & Media',
    icon: 'Megaphone',
    description: 'Multi-channel audience acquisition, viral content strategy, programmatic advertising, and marketing automation.',
    popularRoles: ['SEO Specialist', 'Performance Marketer', 'Content Strategist', 'Growth Lead'],
    requiredSkills: ['Google Ads', 'SEO', 'Google Analytics 4', 'Meta Ads', 'Copywriting'],
    popularLocations: ['Mumbai', 'Delhi NCR', 'Vadodara', 'Remote'],
    companies: ['Schbang', 'Dentsu India', 'Webchutney', 'GroupM', 'Ogilvy'],
    availableJobsCount: 84,
    marketGrowth: '+15.2% YoY'
  },
  {
    id: 'design',
    slug: 'design',
    name: 'Design & Creative Tech',
    icon: 'Palette',
    description: 'Visual brand systems, user experience journeys, 3D interactive graphics, and product prototyping.',
    popularRoles: ['UI Designer', 'Product Designer', 'Motion Graphics Artist', 'UX Researcher'],
    requiredSkills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Adobe Suite'],
    popularLocations: ['Bengaluru', 'Mumbai', 'Pune', 'Vadodara', 'Remote'],
    companies: ['Zomato Design', 'Swiggy', 'CRED', 'Lollypop Design Studio', 'Fractal Ink'],
    availableJobsCount: 62,
    marketGrowth: '+14.8% YoY'
  }
];

export const DEFAULT_JOBS = [
  {
    id: 'job_1',
    title: 'Software Developer',
    company: 'ABC Technologies',
    logo: '🏢',
    location: 'Vadodara, Gujarat',
    salary: '₹3 - ₹5 LPA',
    salaryMin: 3,
    salaryMax: 5,
    jobType: 'Full Time',
    industry: 'Information Technology',
    qualification: 'B.Tech / BCA / MCA in CS/IT',
    experience: 'Fresher (0 - 1 Years)',
    skills: ['Java', 'SQL', 'Git', 'OOP Concepts'],
    description: 'ABC Technologies is seeking ambitious junior Software Developers to join our core backend and application engineering team in Vadodara. You will develop reliable RESTful microservices, optimize SQL queries, and participate in daily code reviews under senior mentorship.',
    applyUrl: 'https://example.com/careers/abc-software-dev',
    postedDate: '2 days ago',
    deadline: '15 Oct 2026',
    status: 'active'
  },
  {
    id: 'job_2',
    title: 'Junior Web Developer',
    company: 'TechCraft Studios',
    logo: '💻',
    location: 'Ahmedabad, Gujarat',
    salary: '₹3.5 - ₹4.8 LPA',
    salaryMin: 3.5,
    salaryMax: 4.8,
    jobType: 'Full Time',
    industry: 'Information Technology',
    qualification: 'B.Tech / B.Sc IT / BCA',
    experience: '0 - 1 Years',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS'],
    description: 'Build fast, responsive web applications for enterprise clients. Work with modern JavaScript (ES6+), React components, state management, and modern CSS utilities.',
    applyUrl: 'https://example.com/careers/techcraft-web-dev',
    postedDate: '1 day ago',
    deadline: '20 Oct 2026',
    status: 'active'
  },
  {
    id: 'job_3',
    title: 'Data Analyst Intern',
    company: 'FinMetrics Analytics',
    logo: '📊',
    location: 'Vadodara, Gujarat',
    salary: '₹15,000 - ₹25,000 / month',
    salaryMin: 2,
    salaryMax: 3.5,
    jobType: 'Internship',
    industry: 'Banking & Finance',
    qualification: 'B.Tech / B.Sc Stats / BCA',
    experience: 'Fresher',
    skills: ['SQL', 'Excel', 'Python', 'Power BI'],
    description: 'Exciting 6-month internship with high PPO conversion rate. You will write analytical SQL queries, build executive KPI dashboards in Power BI, and automate repetitive reporting pipelines.',
    applyUrl: 'https://example.com/careers/finmetrics-analyst',
    postedDate: '3 days ago',
    deadline: '10 Oct 2026',
    status: 'active'
  },
  {
    id: 'job_4',
    title: 'Associate UI/UX Designer',
    company: 'PixelWave Digital',
    logo: '🎨',
    location: 'Remote',
    salary: '₹4 - ₹6 LPA',
    salaryMin: 4,
    salaryMax: 6,
    jobType: 'Remote',
    industry: 'Design',
    qualification: 'Any Graduate with Design Portfolio',
    experience: '0 - 2 Years',
    skills: ['Figma', 'Wireframing', 'User Research', 'Prototyping'],
    description: 'Join a vibrant remote product team. Translate user requirements and user research insights into elegant Figma layouts, interactive prototypes, and modular UI components.',
    applyUrl: 'https://example.com/careers/pixelwave-uiux',
    postedDate: 'Just now',
    deadline: '25 Oct 2026',
    status: 'active'
  },
  {
    id: 'job_5',
    title: 'Cybersecurity SOC Analyst',
    company: 'SecureNet Defense',
    logo: '🛡️',
    location: 'Bengaluru, Karnataka',
    salary: '₹5 - ₹8 LPA',
    salaryMin: 5,
    salaryMax: 8,
    jobType: 'Full Time',
    industry: 'Cybersecurity',
    qualification: 'B.Tech CS / Cyber Security Certifications',
    experience: '0 - 2 Years',
    skills: ['Network Security', 'Linux', 'SIEM', 'Wireshark'],
    description: 'Monitor, detect, and remediate cybersecurity threats across cloud enterprise infrastructure in a 24/7 Security Operations Center.',
    applyUrl: 'https://example.com/careers/securenet-soc',
    postedDate: '4 days ago',
    deadline: '30 Oct 2026',
    status: 'active'
  },
  {
    id: 'job_6',
    title: 'Cloud Support Associate',
    company: 'CloudScale Infrastructure',
    logo: '☁️',
    location: 'Pune, Maharashtra',
    salary: '₹4.5 - ₹7 LPA',
    salaryMin: 4.5,
    salaryMax: 7,
    jobType: 'Hybrid',
    industry: 'Information Technology',
    qualification: 'B.Tech / B.E. in CS / IT / ECE',
    experience: 'Fresher (0 - 1 Years)',
    skills: ['AWS', 'Linux', 'Bash Scripting', 'Networking'],
    description: 'Support high-traffic client deployments on AWS and containerized clusters. Troubleshoot Linux instances, configure IAM policies, and automate operational scripts.',
    applyUrl: 'https://example.com/careers/cloudscale-associate',
    postedDate: '5 days ago',
    deadline: '18 Oct 2026',
    status: 'active'
  },
  {
    id: 'job_7',
    title: 'Graduate Engineer Trainee - Automotive Software',
    company: 'Mobility Motors India',
    logo: '🚗',
    location: 'Vadodara (Halol), Gujarat',
    salary: '₹4 - ₹5.5 LPA',
    salaryMin: 4,
    salaryMax: 5.5,
    jobType: 'Full Time',
    industry: 'Automobile',
    qualification: 'B.Tech in CS / IT / Electrical / Electronics',
    experience: 'Fresher',
    skills: ['C/C++', 'Embedded Systems', 'CAN Protocol', 'Python'],
    description: 'Trainee position working on next-generation electric vehicle telematics, battery management software, and sensor telemetry.',
    applyUrl: 'https://example.com/careers/mobility-get',
    postedDate: '1 week ago',
    deadline: '12 Oct 2026',
    status: 'active'
  },
  {
    id: 'job_8',
    title: 'Digital Marketing Executive',
    company: 'GrowthVibe Media',
    logo: '📈',
    location: 'Vadodara, Gujarat',
    salary: '₹3 - ₹4.5 LPA',
    salaryMin: 3,
    salaryMax: 4.5,
    jobType: 'Full Time',
    industry: 'Digital Marketing',
    qualification: 'BBA / BCA / Any Graduate',
    experience: '0 - 1 Years',
    skills: ['SEO', 'Google Ads', 'Content Strategy', 'Social Media'],
    description: 'Plan, execute, and monitor performance marketing ad campaigns on Google and Meta platforms. Optimize landing pages and analyze conversion funnels.',
    applyUrl: 'https://example.com/careers/growthvibe-exec',
    postedDate: '2 days ago',
    deadline: '22 Oct 2026',
    status: 'active'
  }
];

export const DEFAULT_COURSES = [
  {
    id: 'course_java',
    slug: 'core-java-mastery',
    title: 'Core Java & Object-Oriented Mastery',
    category: 'Programming',
    instructor: 'Prof. Alok Verma',
    level: 'Beginner to Intermediate',
    duration: '18 Hours',
    rating: 4.9,
    thumbnail: '☕',
    skills: ['Java', 'OOP', 'Collections', 'Multithreading', 'Exception Handling'],
    description: 'Complete hands-on Java course covering syntax, JVM memory mechanics, polymorphism, collections framework, and clean coding best practices.',
    videos: [
      {
        id: 'lec_1',
        title: 'Introduction to Java & JVM Architecture',
        duration: '14:20',
        videoUrl: 'https://www.youtube-nocookie.com/embed/eIrMbAQSU34',
        summary: 'Understand how the Java Virtual Machine (JVM), JRE, and JDK work together to deliver platform-independent bytecode execution.',
        notes: 'Key concepts: Bytecode compilation, ClassLoader subsystem, Garbage collection.'
      },
      {
        id: 'lec_2',
        title: 'Object-Oriented Programming (OOP) Deep Dive',
        duration: '22:15',
        videoUrl: 'https://www.youtube-nocookie.com/embed/si-KFFOW2gw',
        summary: 'Detailed explanation of the 4 pillars of OOP: Encapsulation, Abstraction, Inheritance, and Polymorphism with real code examples.',
        notes: 'Understand the difference between method overloading and method overriding in runtime dispatch.'
      },
      {
        id: 'lec_3',
        title: 'Java Collections Framework (List, Set, Map)',
        duration: '28:40',
        videoUrl: 'https://www.youtube-nocookie.com/embed/9ogP_Bzs2bY',
        summary: 'Explore ArrayList vs LinkedList, HashSet internal hashing mechanics, and HashMap collision resolution in Java 8+.',
        notes: 'HashMap uses buckets with linked lists that convert into red-black trees when the treeify threshold of 8 is crossed.'
      }
    ],
    quizzes: [
      {
        question: 'Which component is responsible for executing Java bytecode?',
        options: ['JDK', 'JVM', 'JIT Compiler only', 'JRE bin directory only'],
        correctAnswer: 1
      },
      {
        question: 'What is the default initial capacity of an ArrayList in Java?',
        options: ['5', '10', '16', '32'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'course_sql',
    slug: 'sql-and-database-design',
    title: 'SQL & Relational Database Design',
    category: 'Data Analytics',
    instructor: 'Neha Sharma',
    level: 'Beginner to Intermediate',
    duration: '12 Hours',
    rating: 4.8,
    thumbnail: '🗄️',
    skills: ['SQL', 'PostgreSQL', 'Normalization', 'Indexing', 'Query Optimization'],
    description: 'Learn SQL from fundamentals to advanced window functions, indexing strategies, table joins, and database design normalization.',
    videos: [
      {
        id: 'lec_sql_1',
        title: 'Relational Database Concepts & SQL Basics',
        duration: '18:10',
        videoUrl: 'https://www.youtube-nocookie.com/embed/HXV3zeQKqGY',
        summary: 'Tables, primary keys, foreign keys, and basic SELECT, WHERE, and ORDER BY queries.',
        notes: 'Always index columns frequently queried in WHERE and JOIN clauses.'
      },
      {
        id: 'lec_sql_2',
        title: 'Mastering SQL Table Joins (INNER, LEFT, RIGHT, FULL)',
        duration: '25:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/0r52r72U068',
        summary: 'Visual understanding and query patterns for all relational join types with real multi-table schema examples.',
        notes: 'A LEFT JOIN returns all rows from the left table even when there is no match on the right.'
      }
    ],
    quizzes: [
      {
        question: 'Which clause is used to filter groups created by GROUP BY?',
        options: ['WHERE', 'HAVING', 'FILTER', 'ORDER BY'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'course_web',
    slug: 'modern-react-web-development',
    title: 'Modern React & Web Development',
    category: 'Web Development',
    instructor: 'Vikram Mehta',
    level: 'Beginner',
    duration: '16 Hours',
    rating: 4.9,
    thumbnail: '⚛️',
    skills: ['JavaScript ES6+', 'React.js', 'Hooks', 'Tailwind CSS', 'REST APIs'],
    description: 'Build responsive, production-ready web applications using modern React, hooks (useState, useEffect, useContext), and clean component architectures.',
    videos: [
      {
        id: 'lec_web_1',
        title: 'Modern JavaScript (ES6+) for React',
        duration: '20:15',
        videoUrl: 'https://www.youtube-nocookie.com/embed/NCwa_xi0Uuc',
        summary: 'Arrow functions, destructuring, spread/rest operators, template literals, and async/await syntax.',
        notes: 'Promises avoid callback hell by chaining asynchronous operations.'
      },
      {
        id: 'lec_web_2',
        title: 'React Components, State & Hooks',
        duration: '32:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/bMknfKXIFA8',
        summary: 'Functional components, useState, useEffect lifecycle dependency arrays, and passing props effectively.',
        notes: 'Never mutate state directly; always use the setter function returned by useState.'
      }
    ],
    quizzes: [
      {
        question: 'When does useEffect with an empty dependency array [] execute?',
        options: ['On every render', 'Only once when the component mounts', 'Whenever any state changes', 'Never'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'course_interview',
    slug: 'technical-interview-mastery',
    title: 'Technical & HR Interview Preparation',
    category: 'Interview Preparation',
    instructor: 'Sarah Jenkins',
    level: 'All Levels',
    duration: '8 Hours',
    rating: 4.9,
    thumbnail: '🎯',
    skills: ['STAR Method', 'System Design Basics', 'Communication', 'HR Questions'],
    description: 'Master behavioral questions, project walkthroughs, and technical explanation techniques that impress recruiters and hiring managers.',
    videos: [
      {
        id: 'lec_int_1',
        title: 'Mastering the STAR Method for Behavioral Questions',
        duration: '16:45',
        videoUrl: 'https://www.youtube-nocookie.com/embed/8qkdfiZ5nOU',
        summary: 'How to structure Situation, Task, Action, and Result to showcase tangible leadership and technical impact.',
        notes: 'Always quantify the Result (e.g. reduced load time by 30%, resolved 15 bug tickets).'
      }
    ],
    quizzes: [
      {
        question: 'What does the "A" in the STAR interview technique stand for?',
        options: ['Assessment', 'Action', 'Agreement', 'Authority'],
        correctAnswer: 1
      }
    ]
  }
];

export const DEFAULT_ASSESSMENTS = [
  {
    id: 'assessment_java',
    slug: 'java',
    title: 'Java Programming Assessment',
    category: 'Programming',
    questionCount: 5,
    timeLimitMinutes: 15,
    difficulty: 'Intermediate',
    description: 'Assess your knowledge of Core Java, OOP principles, exception handling, and collections.',
    questions: [
      {
        id: 'q_j1',
        text: 'Which principle of OOP allows a subclass to provide a specific implementation of a method that is already defined in its parent class?',
        options: ['Encapsulation', 'Method Overriding (Polymorphism)', 'Data Abstraction', 'Compilation Inlining'],
        correctAnswer: 1,
        explanation: 'Method overriding occurs when a child class provides a specialized implementation of a method declared in its parent class, demonstrating runtime polymorphism.'
      },
      {
        id: 'q_j2',
        text: 'What happens when an unhandled exception is thrown in a Java application?',
        options: ['It is ignored silently', 'The thread terminates and prints a stack trace', 'The JVM restarts', 'All variables are converted to null'],
        correctAnswer: 1,
        explanation: 'When an exception is not caught, Java prints the exception stack trace to stderr and terminates the executing thread.'
      },
      {
        id: 'q_j3',
        text: 'Which Java Collection maintains elements in unique, sorted order naturally?',
        options: ['ArrayList', 'TreeSet', 'HashSet', 'Vector'],
        correctAnswer: 1,
        explanation: 'TreeSet guarantees elements are stored in ascending sorted order using a Red-Black tree structure.'
      },
      {
        id: 'q_j4',
        text: 'Can an abstract class in Java have concrete methods with actual body implementation?',
        options: ['Yes, it can have both abstract and concrete methods', 'No, abstract classes only contain method declarations', 'Only if the methods are marked private', 'Only in Java 5 and below'],
        correctAnswer: 0,
        explanation: 'Abstract classes can provide full implementations for some methods while leaving others abstract for subclasses.'
      },
      {
        id: 'q_j5',
        text: 'What is the purpose of the final keyword applied to a class?',
        options: ['Prevents class instantiation', 'Prevents the class from being inherited/extended', 'Forces all methods to be static', 'Increases heap allocation limit'],
        correctAnswer: 1,
        explanation: 'A final class cannot be extended by any other class (e.g. java.lang.String is a final class).'
      }
    ]
  },
  {
    id: 'assessment_sql',
    slug: 'sql',
    title: 'SQL & Database Queries',
    category: 'Data Analytics',
    questionCount: 5,
    timeLimitMinutes: 15,
    difficulty: 'Intermediate',
    description: 'Validate your query writing skills across joins, group by, aggregation, and subqueries.',
    questions: [
      {
        id: 'q_s1',
        text: 'Which SQL statement retrieves all records from Table A, along with matching records from Table B, filling unmatched B rows with NULL?',
        options: ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN', 'UNION ALL'],
        correctAnswer: 1,
        explanation: 'LEFT JOIN returns all records from the left table (A) regardless of whether there is a corresponding row in the right table (B).'
      },
      {
        id: 'q_s2',
        text: 'What is the primary difference between WHERE and HAVING in SQL?',
        options: ['WHERE filters rows before aggregation; HAVING filters aggregated groups', 'HAVING runs faster than WHERE', 'WHERE is used only with numeric fields', 'There is no functional difference'],
        correctAnswer: 0,
        explanation: 'WHERE filters individual row records before GROUP BY grouping occurs, whereas HAVING evaluates aggregate conditions on groups.'
      },
      {
        id: 'q_s3',
        text: 'Which constraint ensures that all values in a column are distinct and not null?',
        options: ['CHECK', 'PRIMARY KEY', 'DEFAULT', 'FOREIGN KEY'],
        correctAnswer: 1,
        explanation: 'PRIMARY KEY uniquely identifies each record in a table and implicitly enforces UNIQUE and NOT NULL constraints.'
      },
      {
        id: 'q_s4',
        text: 'Which SQL function counts only non-null values in a column?',
        options: ['COUNT(*)', 'COUNT(column_name)', 'SUM(1)', 'TOTAL()'],
        correctAnswer: 1,
        explanation: 'COUNT(column_name) ignores NULL rows, while COUNT(*) counts every physical row.'
      },
      {
        id: 'q_s5',
        text: 'What type of index is physically stored in the same order as the actual table data rows?',
        options: ['Clustered Index', 'Non-clustered Index', 'Bitmap Index', 'Hash Index'],
        correctAnswer: 0,
        explanation: 'A clustered index determines the physical order of rows in the table (a table can have only one clustered index).'
      }
    ]
  },
  {
    id: 'assessment_js',
    slug: 'javascript',
    title: 'JavaScript & Web Fundamentals',
    category: 'Web Development',
    questionCount: 5,
    timeLimitMinutes: 15,
    difficulty: 'Beginner',
    description: 'Test your understanding of JavaScript scopes, closures, async promises, and event loop.',
    questions: [
      {
        id: 'q_js1',
        text: 'What will typeof NaN return in JavaScript?',
        options: ['"number"', '"nan"', '"undefined"', '"object"'],
        correctAnswer: 0,
        explanation: 'In JavaScript according to the IEEE 754 standard, NaN (Not a Number) is a numeric data type value, so typeof NaN is "number".'
      },
      {
        id: 'q_js2',
        text: 'What is a closure in JavaScript?',
        options: ['A function bundled with references to its surrounding lexical environment', 'A method to close browser tabs', 'A syntax error in variable assignment', 'A self-executing callback without parameters'],
        correctAnswer: 0,
        explanation: 'A closure gives a function access to its outer scope even after the outer function has completed execution.'
      },
      {
        id: 'q_js3',
        text: 'Which array method creates a new array populated with the results of calling a provided function on every element?',
        options: ['forEach()', 'map()', 'filter()', 'reduce()'],
        correctAnswer: 1,
        explanation: 'map() iterates through each element and returns an entirely new transformed array without mutating the original.'
      },
      {
        id: 'q_js4',
        text: 'What is the event loop primarily responsible for in Node.js / browser JavaScript?',
        options: ['Compiling C++ code', 'Coordinating asynchronous task execution and call stack queuing', 'Rendering CSS styles to screen', 'Managing database transactions'],
        correctAnswer: 1,
        explanation: 'The event loop continuously monitors the Call Stack and moves callbacks from the Microtask and Task queues when the stack is empty.'
      },
      {
        id: 'q_js5',
        text: 'Which keyword creates a block-scoped variable that cannot be reassigned?',
        options: ['var', 'let', 'const', 'static'],
        correctAnswer: 2,
        explanation: 'const creates a block-scoped identifier that cannot be reassigned after declaration.'
      }
    ]
  }
];

export const DEFAULT_INTERVIEW_QUESTIONS = [
  {
    category: 'Software Developer',
    difficulty: 'Intermediate',
    text: 'Can you explain the 4 principles of Object-Oriented Programming (OOP) and give an example of Polymorphism in software engineering?',
    expectedKeywords: ['encapsulation', 'abstraction', 'inheritance', 'polymorphism', 'overriding', 'interface'],
    modelAnswer: 'The 4 fundamental principles of OOP are Encapsulation (bundling data and methods while restricting direct access via access modifiers), Abstraction (hiding implementation complexity behind clear public interfaces), Inheritance (enabling a child class to inherit attributes and methods from a parent class), and Polymorphism (allowing one interface to represent different underlying forms). Polymorphism comes in two forms: compile-time (method overloading with different parameter signatures) and runtime (method overriding where a subclass overrides a parent method, dynamically resolved via virtual method table dispatch at runtime).',
    evaluationCriteria: 'Clearly explains all 4 pillars and distinguishes compile-time vs runtime polymorphism.'
  },
  {
    category: 'Software Developer',
    difficulty: 'Intermediate',
    text: 'How does an index work in a relational database, and what are the trade-offs of having too many indexes?',
    expectedKeywords: ['b-tree', 'lookup', 'write performance', 'storage', 'insert', 'update'],
    modelAnswer: 'A database index works like the index in the back of a textbook: it builds an auxiliary data structure, commonly a balanced B-Tree or B+Tree, that allows logarithmic O(log N) lookup time instead of a sequential table scan O(N). While indexes dramatically accelerate SELECT read queries with WHERE or JOIN filters, having too many indexes introduces trade-offs: every INSERT, UPDATE, and DELETE operation becomes slower because each index must be updated synchronously, and they consume additional disk memory and buffer cache.',
    evaluationCriteria: 'Identifies B-Tree data structures, read speedup benefits, and write degradation/storage overhead.'
  },
  {
    category: 'Software Developer',
    difficulty: 'Intermediate',
    text: 'Explain the difference between monolithic architecture and microservices architecture. When would you choose one over the other?',
    expectedKeywords: ['monolith', 'microservices', 'deployment', 'scalability', 'complexity', 'network'],
    modelAnswer: 'In a monolithic architecture, the entire application, business logic, UI, and database access layer are bundled into a single deployable artifact and codebase. In contrast, microservices decompose the application into loosely coupled, independently deployable services that communicate over lightweight network protocols (HTTP/REST or gRPC). Monoliths are simpler to develop, test, and deploy for early-stage startups and small teams. Microservices are better suited for large, distributed engineering organizations where different teams need independent deployment cadence and distinct scaling characteristics.',
    evaluationCriteria: 'Evaluates trade-offs, deployment ergonomics, network latency, and organizational alignment.'
  },
  {
    category: 'Software Developer',
    difficulty: 'Intermediate',
    text: 'How do you prevent and handle memory leaks in modern software development?',
    expectedKeywords: ['garbage collection', 'listeners', 'references', 'profiling', 'unclosed resources'],
    modelAnswer: 'In managed runtimes like Java or Node.js, memory leaks occur when references to unused objects are unintentionally retained, preventing garbage collection. Common causes include unremoved event listeners, static collections that grow unbounded, unclosed I/O streams or database connections, and circular references. To prevent leaks, always clean up listeners in component unmount lifecycles, use try-with-resources or using statements for unmanaged streams, use weak references where appropriate, and use profiling tools like VisualVM or Chrome DevTools heap snapshots to inspect memory allocation deltas.',
    evaluationCriteria: 'References GC mechanics, cleanup of listeners/streams, and heap snapshot debugging.'
  },
  {
    category: 'Software Developer',
    difficulty: 'Intermediate',
    text: 'Describe a challenging bug you encountered in a project, how you diagnosed it, and what step you took to resolve it permanently.',
    expectedKeywords: ['situation', 'task', 'action', 'result', 'diagnose', 'logs', 'fix'],
    modelAnswer: 'In our college project, we encountered an intermittent race condition where user checkout totals were miscalculated under concurrent requests. I used logging with request correlation IDs and isolated the problem to a shared mutable service variable instead of request-scoped state. I refactored the method to be stateless, added synchronized thread-safe handling, and created automated unit tests simulating 50 concurrent requests to confirm zero regressions.',
    evaluationCriteria: 'Uses STAR framework, explains diagnostic methodology, and shares verified outcomes.'
  },
  // Data Analyst
  {
    category: 'Data Analyst',
    difficulty: 'Intermediate',
    text: 'What is the difference between a clustered and a non-clustered index in SQL, and how do window functions differ from aggregate functions?',
    expectedKeywords: ['clustered', 'non-clustered', 'physical order', 'over clause', 'window function', 'group by'],
    modelAnswer: 'A clustered index alters the physical storage order of rows in the database table to match the index key; therefore, a table can possess only one clustered index. A non-clustered index stores index key pointers that point back to the actual data row. Window functions (using the OVER clause, such as ROW_NUMBER(), RANK(), or SUM() OVER (PARTITION BY ...)) calculate results across a set of table rows without collapsing them into a single row, unlike GROUP BY aggregate functions which collapse multiple rows into one summary output.',
    evaluationCriteria: 'Explains physical data sorting and distinguishes row collapse vs partitioned calculation.'
  },
  // Web Developer
  {
    category: 'Web Developer',
    difficulty: 'Intermediate',
    text: 'Explain the Virtual DOM in React, how reconciliation works, and why keys are important in list rendering.',
    expectedKeywords: ['virtual dom', 'diffing', 'reconciliation', 'render', 'keys', 'performance'],
    modelAnswer: 'The Virtual DOM is a lightweight JavaScript object representation of the real DOM tree kept in memory. When a component state changes, React creates a new Virtual DOM tree and runs a diffing algorithm (Reconciliation) to identify the minimal set of changes required on the real DOM. Keys are unique attributes given to list elements that provide a stable identity across renders, allowing React to quickly identify which elements were added, removed, or reordered without re-rendering the entire list.',
    evaluationCriteria: 'Discusses in-memory tree, reconciliation diffing, and key stability for list mutations.'
  },
  // HR / Behavioral
  {
    category: 'HR Interview',
    difficulty: 'Intermediate',
    text: 'Tell me about yourself, your technical background, and why you are interested in starting your career with our company.',
    expectedKeywords: ['background', 'projects', 'passion', 'alignment', 'growth', 'contribute'],
    modelAnswer: 'I am a final-year Computer Science student with a strong foundation in Java, SQL, and full-stack web development. Through my academic projects, such as building a responsive career guidance portal and database-driven applications, I discovered my passion for building clean, user-centric software. I am particularly excited about your company because of your focus on cutting-edge engineering standards and collaborative mentorship culture. I am eager to apply my problem-solving skills and contribute to your team while continuously learning.',
    evaluationCriteria: 'Structured intro, mentions practical projects, and demonstrates clear alignment.'
  }
];

export const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Seeding Career Coach AI Database...');

    // Hash passwords for default users
    const salt = await bcrypt.genSalt(10);
    const usersWithHashedPw = await Promise.all(
      DEFAULT_USERS.map(async u => ({
        ...u,
        password: await bcrypt.hash(u.password, salt)
      }))
    );

    // Upsert or clear and insert
    await User.deleteMany();
    await User.insertMany(usersWithHashedPw);
    console.log(`✓ Inserted ${DEFAULT_USERS.length} Default Users`);

    await Career.deleteMany();
    await Career.insertMany(DEFAULT_CAREERS);
    console.log(`✓ Inserted ${DEFAULT_CAREERS.length} Career Tracks`);

    await Industry.deleteMany();
    await Industry.insertMany(DEFAULT_INDUSTRIES);
    console.log(`✓ Inserted ${DEFAULT_INDUSTRIES.length} Industries`);

    await Job.deleteMany();
    await Job.insertMany(DEFAULT_JOBS);
    console.log(`✓ Inserted ${DEFAULT_JOBS.length} Job Vacancies`);

    await Course.deleteMany();
    await Course.insertMany(DEFAULT_COURSES);
    console.log(`✓ Inserted ${DEFAULT_COURSES.length} Courses with Lessons`);

    await Assessment.deleteMany();
    await Assessment.insertMany(DEFAULT_ASSESSMENTS);
    console.log(`✓ Inserted ${DEFAULT_ASSESSMENTS.length} Skill Assessments`);

    await InterviewQuestion.deleteMany();
    await InterviewQuestion.insertMany(DEFAULT_INTERVIEW_QUESTIONS);
    console.log(`✓ Inserted ${DEFAULT_INTERVIEW_QUESTIONS.length} Interview Question Bank items`);

    console.log('🎉 Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

// If run directly: node seed/seedData.js
if (process.argv[1] && process.argv[1].endsWith('seedData.js')) {
  seedDatabase();
}
