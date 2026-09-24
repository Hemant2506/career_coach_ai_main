export const CAREERS = [
  {
    id: 'software-developer',
    title: 'Software Developer',
    category: 'Engineering',
    matchScore: 94,
    description: 'Design, build, test, and maintain robust software applications and distributed systems across enterprise and web platforms.',
    salaryRange: '₹4.5 - ₹16 LPA',
    experienceRequired: 'Fresher to 2 Years',
    overview: 'Software Developers are responsible for the core logic, architecture, and deployment of software products. As modern platforms scale, developers work across object-oriented languages, databases, microservices, and continuous integration pipelines.',
    responsibilities: [
      'Write clean, maintainable, and testable code in Java, Python, or JavaScript',
      'Collaborate with product designers, testers, and system architects',
      'Optimize database queries and schema designs for high throughput',
      'Implement RESTful APIs and integrate external cloud services',
      'Troubleshoot, debug, and upgrade existing production software systems'
    ],
    requiredSkills: [
      'Java',
      'Python',
      'SQL',
      'Git & GitHub',
      'Problem Solving',
      'Data Structures & Algorithms',
      'REST APIs'
    ],
    roadmap: [
      { step: 1, title: 'Programming Basics', desc: 'Master variables, loops, control structures, and object-oriented concepts.' },
      { step: 2, title: 'Data Structures & Algorithms', desc: 'Arrays, linked lists, trees, graphs, sorting, and dynamic programming.' },
      { step: 3, title: 'Git & GitHub', desc: 'Branching strategies, pull requests, merge conflict resolution, and open source collaboration.' },
      { step: 4, title: 'Real-world Projects', desc: 'Build 2-3 full-stack portfolio applications with authentication and database persistence.' },
      { step: 5, title: 'Internship & Practical Experience', desc: 'Contribute to team projects, peer code reviews, and sprint planning.' },
      { step: 6, title: 'Interview Preparation', desc: 'Practice mock technical interviews, system design fundamentals, and behavioral questions.' },
      { step: 7, title: 'Job Placement', desc: 'Apply to campus placements, tech drives, and verified recruiter networks.' }
    ],
    recommendedCourses: ['course_java', 'course_sql', 'course_git', 'course_interview_prep'],
    relatedJobsCount: 18,
    industry: 'Information Technology'
  },
  {
    id: 'web-developer',
    title: 'Web Developer',
    category: 'Engineering',
    matchScore: 88,
    description: 'Build responsive, accessible, and dynamic web user interfaces and backend server integrations using modern JavaScript ecosystems.',
    salaryRange: '₹3.5 - ₹12 LPA',
    experienceRequired: 'Fresher to 3 Years',
    overview: 'Web Developers specialize in creating seamless digital experiences. From building interactive React components to integrating REST and GraphQL APIs, they bridge UI aesthetics with solid engineering.',
    responsibilities: [
      'Develop mobile-responsive web applications using React and modern CSS',
      'Integrate state management, routing, and asynchronous API calls',
      'Ensure cross-browser compatibility and web accessibility standards',
      'Implement security best practices like XSS and CSRF prevention',
      'Deploy applications to cloud platforms and CDN environments'
    ],
    requiredSkills: [
      'JavaScript (ES6+)',
      'React.js',
      'HTML5 & Tailwind CSS',
      'Node.js',
      'REST APIs',
      'Git'
    ],
    roadmap: [
      { step: 1, title: 'HTML5 & Modern CSS', desc: 'Semantic layouts, Flexbox, CSS Grid, and responsive design principles.' },
      { step: 2, title: 'JavaScript Mastery', desc: 'Closures, asynchronous execution, promises, DOM manipulation, and ES modules.' },
      { step: 3, title: 'Modern React.js', desc: 'Functional components, custom hooks, context API, and performance optimization.' },
      { step: 4, title: 'Backend & APIs', desc: 'Node.js, Express, routing, and database connections.' },
      { step: 5, title: 'Production Portfolio', desc: 'Ship 3 deployed web apps with live links and GitHub source repositories.' },
      { step: 6, title: 'Interview & Code Review', desc: 'Live coding rounds, React architectural questions, and bundle optimization.' },
      { step: 7, title: 'Full-Time Placement', desc: 'Target frontend and full-stack software engineer roles.' }
    ],
    recommendedCourses: ['course_js', 'course_react', 'course_git'],
    relatedJobsCount: 22,
    industry: 'Information Technology'
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    matchScore: 82,
    description: 'Inspect, cleanse, transform, and model data to discover actionable business insights and create executive dashboards.',
    salaryRange: '₹4.0 - ₹14 LPA',
    experienceRequired: 'Fresher to 2 Years',
    overview: 'Data Analysts translate complex quantitative information into clear business decisions. Utilizing SQL, Python, and BI visualization platforms, they empower organizations with automated reporting and trend forecasting.',
    responsibilities: [
      'Extract data from relational databases using complex SQL queries and joins',
      'Cleanse and preprocess missing or skewed records using Python Pandas',
      'Build executive dashboards in Power BI and Tableau for stakeholders',
      'Analyze customer cohorts, operational bottlenecks, and financial trends',
      'Present findings in structured narrative reports and presentations'
    ],
    requiredSkills: [
      'SQL',
      'Python',
      'Power BI',
      'Excel (Advanced)',
      'Data Visualization',
      'Statistical Analysis'
    ],
    roadmap: [
      { step: 1, title: 'Spreadsheet & Statistics Basics', desc: 'Pivot tables, VLOOKUP/XLOOKUP, descriptive statistics, and probability distributions.' },
      { step: 2, title: 'Advanced SQL Querying', desc: 'Window functions, CTEs, aggregation, indexing, and subqueries.' },
      { step: 3, title: 'Python for Data Analysis', desc: 'Pandas, NumPy, Matplotlib, and exploratory data analysis (EDA).' },
      { step: 4, title: 'BI Dashboard Mastery', desc: 'Data modeling in Power BI / Tableau with calculated DAX measures.' },
      { step: 5, title: 'Business Case Studies', desc: 'Conduct end-to-end churn analysis, sales forecasting, or supply chain studies.' },
      { step: 6, title: 'Case Interview Prep', desc: 'SQL whiteboard tests, data interpretation scenarios, and business metrics.' },
      { step: 7, title: 'Placement as Analyst', desc: 'Secure roles across banking, e-commerce, and tech analytics teams.' }
    ],
    recommendedCourses: ['course_sql', 'course_python', 'course_powerbi', 'course_data_analytics'],
    relatedJobsCount: 14,
    industry: 'Data & Analytics'
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    category: 'Design',
    matchScore: 75,
    description: 'Create intuitive, user-centered wireframes, high-fidelity prototypes, and design systems for web and mobile products.',
    salaryRange: '₹3.8 - ₹13 LPA',
    experienceRequired: 'Fresher to 3 Years',
    overview: 'UI/UX Designers ensure digital products are both aesthetically delightful and effortless to navigate. They conduct user research, create wireframes, and design design tokens for developer handoff.',
    responsibilities: [
      'Conduct user interviews, usability audits, and persona development',
      'Design wireframes, journey maps, and interactive Figma prototypes',
      'Maintain design systems with consistent typography, color, and component tokens',
      'Collaborate closely with frontend engineers during UI implementation',
      'Iterate designs based on quantitative telemetry and qualitative feedback'
    ],
    requiredSkills: [
      'Figma',
      'User Research',
      'Wireframing & Prototyping',
      'Design Systems',
      'Information Architecture',
      'Usability Testing'
    ],
    roadmap: [
      { step: 1, title: 'UX Fundamentals', desc: 'Heuristic evaluation, design thinking process, and cognitive accessibility.' },
      { step: 2, title: 'Figma Mastery', desc: 'Auto-layout, component variants, interactive prototyping, and variables.' },
      { step: 3, title: 'Design Systems', desc: 'Color palettes, typographic scales, spacing tokens, and component kits.' },
      { step: 4, title: 'End-to-End Case Studies', desc: 'Complete 2 detailed portfolio case studies solving real-world user problems.' },
      { step: 5, title: 'Developer Handoff', desc: 'Spec documentation, redlines, and assets export.' },
      { step: 6, title: 'Portfolio Review & Interview', desc: 'Walk through design decisions, trade-offs, and user testing outcomes.' },
      { step: 7, title: 'Industry Hiring', desc: 'Land product design roles at SaaS startups and digital agencies.' }
    ],
    recommendedCourses: ['course_comm_skills', 'course_resume'],
    relatedJobsCount: 11,
    industry: 'Design'
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Security',
    matchScore: 72,
    description: 'Protect enterprise infrastructure, networks, and data by monitoring vulnerabilities, analyzing threat vectors, and managing incident responses.',
    salaryRange: '₹4.5 - ₹15 LPA',
    experienceRequired: 'Fresher to 2 Years',
    overview: 'Cybersecurity Analysts safeguard company assets against intrusions, malware, and compliance breaches. They monitor security operations centers (SOC), analyze logs, and configure defensive policies.',
    responsibilities: [
      'Monitor SIEM logs and alerts for suspicious activity and network anomalies',
      'Perform vulnerability scans and patch assessments on server clusters',
      'Develop incident response procedures and assist in forensic analysis',
      'Conduct security awareness training and phishing simulations',
      'Ensure regulatory compliance with ISO 27001, GDPR, and SOC 2 standards'
    ],
    requiredSkills: [
      'Network Security',
      'Linux Administration',
      'SIEM Tools (Splunk / Elastic)',
      'Vulnerability Assessment',
      'Cryptography Basics',
      'Ethical Hacking Fundamentals'
    ],
    roadmap: [
      { step: 1, title: 'Networking Fundamentals', desc: 'TCP/IP model, OSI layers, DNS, routing protocols, and firewalls.' },
      { step: 2, title: 'Linux & Command Line', desc: 'Permissions, shell scripting, process management, and log inspection.' },
      { step: 3, title: 'Security Principles & Cryptography', desc: 'Symmetric/asymmetric encryption, hashing, PKI, and zero-trust concepts.' },
      { step: 4, title: 'Hands-on Labs (TryHackMe/HTB)', desc: 'Penetration testing basics, web app vulnerabilities (OWASP Top 10).' },
      { step: 5, title: 'SOC & SIEM Monitoring', desc: 'Threat detection, rule writing, and incident triage protocols.' },
      { step: 6, title: 'Security Certifications & Prep', desc: 'CompTIA Security+, CEH preparation, and technical interview simulations.' },
      { step: 7, title: 'SOC Analyst Role', desc: 'Join cyber defense centers and cloud security firms.' }
    ],
    recommendedCourses: ['course_python', 'course_git'],
    relatedJobsCount: 9,
    industry: 'Cybersecurity'
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Infrastructure',
    matchScore: 80,
    description: 'Architect, deploy, and automate scalable cloud infrastructure, serverless functions, and containerized microservices.',
    salaryRange: '₹5.0 - ₹18 LPA',
    experienceRequired: 'Fresher to 3 Years',
    overview: 'Cloud Engineers build the backbone of modern internet software. They leverage cloud providers like AWS, Azure, and Google Cloud along with Infrastructure as Code (Terraform) and container orchestrators.',
    responsibilities: [
      'Provision and manage cloud resources using Terraform and automated scripts',
      'Containerize applications using Docker and orchestrate with Kubernetes',
      'Configure CI/CD pipelines for automated testing and zero-downtime deployment',
      'Monitor cloud cost efficiency, high availability, and disaster recovery',
      'Maintain identity and access management (IAM) security policies'
    ],
    requiredSkills: [
      'Linux',
      'Cloud Architecture (AWS/GCP)',
      'Docker & Containers',
      'CI/CD Pipelines',
      'Infrastructure as Code',
      'Python / Bash Scripting'
    ],
    roadmap: [
      { step: 1, title: 'Linux & Networking Essentials', desc: 'Bash scripting, SSH keys, VPCs, subnets, and load balancers.' },
      { step: 2, title: 'Core Cloud Provider Services', desc: 'Compute instances, object storage, serverless functions, and IAM.' },
      { step: 3, title: 'Containers with Docker', desc: 'Dockerfiles, multi-stage builds, volumes, and networking.' },
      { step: 4, title: 'CI/CD Automation', desc: 'GitHub Actions, automated testing, and container registry publishing.' },
      { step: 5, title: 'Infrastructure as Code', desc: 'Declarative resource provisioning using Terraform and monitoring setups.' },
      { step: 6, title: 'Cloud Certifications & Mock Scenarios', desc: 'AWS Solutions Architect Associate or Google Associate Cloud Engineer prep.' },
      { step: 7, title: 'Cloud DevOps Placement', desc: 'Join engineering teams driving cloud transformation.' }
    ],
    recommendedCourses: ['course_python', 'course_git', 'course_interview_prep'],
    relatedJobsCount: 16,
    industry: 'Information Technology'
  },
  {
    id: 'digital-marketer',
    title: 'Digital Marketer',
    category: 'Marketing',
    matchScore: 70,
    description: 'Drive user acquisition, retention, and brand engagement through search engine optimization, content strategy, and performance ads.',
    salaryRange: '₹3.2 - ₹9 LPA',
    experienceRequired: 'Fresher to 2 Years',
    overview: 'Digital Marketers formulate multi-channel marketing campaigns. They optimize digital touchpoints to capture inbound customer interest, measure conversion funnels, and maximize ROI on paid campaigns.',
    responsibilities: [
      'Execute on-page and technical SEO strategies to increase organic search rank',
      'Manage PPC campaigns across Google Ads, LinkedIn, and Meta platforms',
      'Analyze funnel performance, bounce rates, and cost per acquisition (CPA)',
      'Create engaging email drip sequences and social media campaign calendars',
      'A/B test landing page copy and calls to action for conversion rate lift'
    ],
    requiredSkills: [
      'Search Engine Optimization (SEO)',
      'Google Analytics 4',
      'Content Marketing',
      'Social Media Ads',
      'Email Marketing Automation',
      'Copywriting'
    ],
    roadmap: [
      { step: 1, title: 'Marketing Fundamentals', desc: 'Customer personas, value propositions, and sales funnel stages.' },
      { step: 2, title: 'SEO & Content Strategy', desc: 'Keyword research, backlink building, search intent, and technical auditing.' },
      { step: 3, title: 'Paid Advertising (PPC)', desc: 'Campaign structures, bidding strategies, ad copy testing, and remarketing.' },
      { step: 4, title: 'Analytics & Attribution', desc: 'Event tracking, conversion goals, UTM parameters, and cohort analysis.' },
      { step: 5, title: 'Live Campaign Execution', desc: 'Run a live student project campaign with measurable traffic and engagement.' },
      { step: 6, title: 'Agency Case Interview', desc: 'Campaign budget optimization, CPA reduction strategy, and metric defense.' },
      { step: 7, title: 'Full-Time Marketing Role', desc: 'Join digital agencies, growth startups, and corporate marketing teams.' }
    ],
    recommendedCourses: ['course_comm_skills', 'course_resume'],
    relatedJobsCount: 8,
    industry: 'Digital Marketing'
  }
];
