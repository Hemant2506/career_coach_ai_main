export const INTERVIEW_QUESTIONS = {
  'software-developer': {
    title: 'Software Developer',
    description: 'Technical and architectural questions evaluating programming fundamentals, algorithms, system design, and clean code.',
    questions: [
      {
        id: 'sd_q1',
        difficulty: 'Beginner',
        category: 'Language Core',
        text: 'Explain the difference between let, const, and var in modern JavaScript.',
        expectedKeywords: ['block scope', 'hoisting', 'temporal dead zone', 'reassignment', 'immutable binding'],
        modelAnswer: '`var` is function-scoped and hoisted to the top of its enclosing function, initializing to undefined. `let` and `const` were introduced in ES6 and are block-scoped within `{}`. Variables declared with `let` can be reassigned, whereas `const` creates an immutable identifier binding that must be initialized upon declaration. Both `let` and `const` reside in a Temporal Dead Zone from the start of the block until execution reaches the declaration line.',
        evaluationCriteria: 'Mentions scoping differences (function vs block), hoisting, and reassignability.'
      },
      {
        id: 'sd_q2',
        difficulty: 'Beginner',
        category: 'OOP Principles',
        text: 'What are the four core principles of Object-Oriented Programming (OOP), and why are they useful?',
        expectedKeywords: ['encapsulation', 'inheritance', 'polymorphism', 'abstraction', 'reusability', 'maintainability'],
        modelAnswer: 'The four pillars are Encapsulation (bundling data and methods while hiding internal state), Abstraction (exposing only essential interfaces while hiding implementation complexity), Inheritance (reusing characteristics from parent classes), and Polymorphism (allowing one interface to represent different underlying forms/classes). Together, they enable modular, maintainable, and extensible software architecture.',
        evaluationCriteria: 'Defines all 4 principles clearly with a real-world or coding example.'
      },
      {
        id: 'sd_q3',
        difficulty: 'Intermediate',
        category: 'Data Structures',
        text: 'How does a Hash Table achieve O(1) average time complexity, and how are collisions resolved?',
        expectedKeywords: ['hash function', 'buckets', 'chaining', 'open addressing', 'collisions', 'load factor'],
        modelAnswer: 'A hash table computes an array index from a key using a hash function, allowing constant-time O(1) direct memory access. Collisions happen when two distinct keys hash to the same bucket. They are primarily resolved using Separate Chaining (each bucket holds a linked list or red-black tree of collisions) or Open Addressing (probing for the next available empty slot, such as linear or quadratic probing). Dynamic resizing occurs when the load factor threshold is exceeded.',
        evaluationCriteria: 'Explains hash functions, bucket addressing, chaining vs open addressing, and load factor.'
      },
      {
        id: 'sd_q4',
        difficulty: 'Intermediate',
        category: 'Database & SQL',
        text: 'What is the difference between an index scan and a sequential table scan in a relational database?',
        expectedKeywords: ['b-tree', 'index scan', 'sequential scan', 'full table scan', 'cardinality', 'i/o cost'],
        modelAnswer: 'A sequential table scan reads every block on disk sequentially from start to end, which is optimal for tiny tables or queries fetching a majority of rows. An index scan utilizes a pre-sorted B-Tree index to pinpoint pointer addresses in logarithmic O(log N) time, traversing only the relevant leaf nodes. Indexes drastically speed up selective WHERE filters and JOIN lookups, but introduce write overhead on inserts and updates.',
        evaluationCriteria: 'Clarifies when the database query optimizer chooses index vs sequential scan.'
      },
      {
        id: 'sd_q5',
        difficulty: 'Intermediate',
        category: 'Software Design',
        text: 'What are RESTful API best practices regarding HTTP status codes and idempotency?',
        expectedKeywords: ['get', 'post', 'put', 'delete', 'idempotent', 'status codes', '200 ok', '201 created', '404'],
        modelAnswer: 'REST APIs should use HTTP methods according to standard semantics. GET, PUT, and DELETE are idempotent (multiple identical requests yield the same server state), whereas POST is non-idempotent. Proper status codes include 200 OK for successful reads, 201 Created for resource generation, 204 No Content for successful deletions, 400 Bad Request for client input flaws, 401/403 for authentication/authorization, and 500 for unhandled internal failures.',
        evaluationCriteria: 'Identifies idempotent methods and enumerates standard HTTP response codes.'
      },
      {
        id: 'sd_q6',
        difficulty: 'Advanced',
        category: 'Concurrency',
        text: 'What is a race condition, and what synchronization primitives can be used to prevent it in multi-threaded software?',
        expectedKeywords: ['race condition', 'critical section', 'mutex', 'semaphore', 'atomic operations', 'deadlock'],
        modelAnswer: 'A race condition occurs when concurrent threads access and modify shared memory without synchronization, producing non-deterministic bugs depending on execution order. To prevent this, code entering the critical section must be guarded using primitives like Mutexes (mutual exclusion locks), Semaphores (controlling access to a pool of resources), Read-Write Locks, or lock-free Atomic variables. Care must be taken to avoid deadlocks and priority inversion.',
        evaluationCriteria: 'Explains critical sections, mutex locks, and the trade-offs of thread synchronization.'
      },
      {
        id: 'sd_q7',
        difficulty: 'Advanced',
        category: 'System Architecture',
        text: 'How would you scale a web application handling sudden 10x traffic spikes?',
        expectedKeywords: ['horizontal scaling', 'load balancer', 'caching', 'redis', 'cdn', 'database read replicas', 'rate limiting'],
        modelAnswer: 'I would employ a multi-tier scaling strategy: 1) Offload static assets to a global CDN; 2) Introduce caching layers with Redis/Memcached to minimize database load; 3) Horizontal auto-scaling of stateless application instances behind an elastic load balancer; 4) Database optimization via read replicas, connection pooling, and asynchronous queues (e.g. RabbitMQ/Kafka) for heavy background tasks; 5) Rate limiting to protect against malicious spikes.',
        evaluationCriteria: 'Addresses caching, horizontal scaling, asynchronous messaging, and database bottlenecks.'
      }
    ]
  },
  'web-developer': {
    title: 'Web Developer',
    description: 'Frontend and full-stack web engineering questions covering React, CSS layouts, DOM events, and web performance.',
    questions: [
      {
        id: 'wd_q1',
        difficulty: 'Beginner',
        category: 'Frontend Core',
        text: 'What is the Virtual DOM in React, and how does reconciliation work?',
        expectedKeywords: ['virtual dom', 'diffing algorithm', 'reconciliation', 'batching', 'real dom'],
        modelAnswer: 'The Virtual DOM is a lightweight JavaScript object representation of the real browser DOM in memory. When a component’s state changes, React constructs a new Virtual DOM tree, performs a fast diffing algorithm with the previous tree (Reconciliation), and batches only the precise calculated minimal changes to update the real DOM. This avoids costly full browser reflows and repaints.',
        evaluationCriteria: 'Explains the in-memory object representation and the minimal diffing process.'
      },
      {
        id: 'wd_q2',
        difficulty: 'Beginner',
        category: 'CSS & Layouts',
        text: 'What is the difference between CSS Flexbox and CSS Grid, and when should you choose each?',
        expectedKeywords: ['flexbox', 'grid', 'one-dimensional', 'two-dimensional', 'rows', 'columns'],
        modelAnswer: 'Flexbox is a one-dimensional layout system designed for either rows OR columns, making it ideal for component-level layouts like navbars, button groups, and vertical item lists. CSS Grid is a two-dimensional layout system managing both rows AND columns simultaneously, making it optimal for overall page layouts, complex dashboard matrices, and photo galleries.',
        evaluationCriteria: 'Contrasts 1D vs 2D layout mental models and cites specific use cases.'
      },
      {
        id: 'wd_q3',
        difficulty: 'Intermediate',
        category: 'React Lifecycle',
        text: 'How does the `useEffect` hook work, and what is the role of the dependency array and cleanup return function?',
        expectedKeywords: ['useeffect', 'dependency array', 'cleanup function', 'componentdidmount', 'memory leaks'],
        modelAnswer: '`useEffect` lets functional components synchronize with external side effects such as fetching data, timers, and DOM subscriptions. The dependency array dictates execution: empty `[]` runs once after mount; variables `[a, b]` re-run whenever those dependencies change; omitting it runs after every render. Returning a cleanup function guarantees that listeners, intervals, and subscriptions are cancelled before re-running or when unmounting.',
        evaluationCriteria: 'Explains effect triggers, dependency array rules, and why cleanup functions prevent memory leaks.'
      },
      {
        id: 'wd_q4',
        difficulty: 'Intermediate',
        category: 'Web Performance',
        text: 'What are Core Web Vitals (LCP, FID/INP, CLS) and how do you optimize them?',
        expectedKeywords: ['lcp', 'inp', 'cls', 'largest contentful paint', 'cumulative layout shift', 'lazy loading'],
        modelAnswer: 'Core Web Vitals are Google metrics quantifying real-user experience: Largest Contentful Paint (LCP) measures loading speed (optimize via image compression, CDN caching, and preloading hero assets); Interaction to Next Paint (INP) measures responsiveness (optimize by breaking up long JavaScript tasks and deferring heavy scripts); Cumulative Layout Shift (CLS) measures visual stability (optimize by reserving explicit aspect-ratio dimensions on images and banners).',
        evaluationCriteria: 'Defines the three metrics and provides actionable optimization tactics.'
      },
      {
        id: 'wd_q5',
        difficulty: 'Advanced',
        category: 'State & Architecture',
        text: 'Compare client-side caching (React Query / SWR) versus global state management (Redux / Context API).',
        expectedKeywords: ['server state', 'client state', 'cache invalidation', 'deduplication', 'optimistic updates'],
        modelAnswer: 'Modern architecture distinguishes between Server State (data stored remotely that needs fetching, caching, deduplication, and invalidation) and Client State (local UI toggles, sidebar open/close, draft inputs). Tools like TanStack Query/SWR excel at server state with automated background refetching and optimistic updates, removing the need for boilerplate Redux reducers. Redux or Context API remains suitable for purely local, application-wide UI states.',
        evaluationCriteria: 'Distinguishes server state from client UI state and explains caching benefits.'
      }
    ]
  },
  'data-analyst': {
    title: 'Data Analyst',
    description: 'Data querying, statistical analysis, dashboard reporting, and business interpretation questions.',
    questions: [
      {
        id: 'da_q1',
        difficulty: 'Beginner',
        category: 'SQL Querying',
        text: 'What is the difference between WHERE and HAVING in SQL?',
        expectedKeywords: ['where', 'having', 'group by', 'aggregate functions', 'row level', 'group level'],
        modelAnswer: 'The `WHERE` clause filters individual rows before any groupings or aggregate functions are calculated. In contrast, `HAVING` filters the results after the `GROUP BY` clause has formed groups and calculated aggregate metrics (such as COUNT, SUM, or AVG). You cannot use aggregate functions directly in a WHERE clause.',
        evaluationCriteria: 'Highlights execution order and aggregate function eligibility.'
      },
      {
        id: 'da_q2',
        difficulty: 'Beginner',
        category: 'Data Analytics Basics',
        text: 'How do you handle missing or null data in a dataset during exploratory analysis?',
        expectedKeywords: ['null values', 'imputation', 'mean', 'median', 'mode', 'deletion', 'bias'],
        modelAnswer: 'First, I determine the percentage and pattern of missingness (Missing Completely at Random vs Missing Not at Random). If missing values are negligible (<2%), listwise row deletion may be acceptable. Otherwise, imputation is preferable: using the median for skewed numerical data, mean for normal distributions, mode for categorical variables, or advanced models like KNN/regression imputation to avoid introducing distributional bias.',
        evaluationCriteria: 'Distinguishes between deletion and imputation strategies with consideration for data bias.'
      },
      {
        id: 'da_q3',
        difficulty: 'Intermediate',
        category: 'SQL Advanced',
        text: 'Explain how window functions like ROW_NUMBER(), RANK(), and DENSE_RANK() differ.',
        expectedKeywords: ['window functions', 'over partition by', 'row_number', 'rank', 'dense_rank', 'ties'],
        modelAnswer: 'All three assign ranks across an `OVER (PARTITION BY ... ORDER BY ...)` window. `ROW_NUMBER()` always assigns consecutive integers (1, 2, 3, 4) regardless of ties. `RANK()` assigns identical ranks to tied values and skips the subsequent numbers (e.g. 1, 2, 2, 4). `DENSE_RANK()` also assigns identical ranks to ties but does not skip any ranks (e.g. 1, 2, 2, 3).',
        evaluationCriteria: 'Provides concrete numerical examples illustrating tie-breaking behavior.'
      },
      {
        id: 'da_q4',
        difficulty: 'Intermediate',
        category: 'Metrics & KPIs',
        text: 'What is Customer Churn Rate, and what lead indicators would you track to predict it?',
        expectedKeywords: ['churn rate', 'retention', 'lead indicators', 'product usage frequency', 'nps', 'support tickets'],
        modelAnswer: 'Customer Churn Rate is the percentage of customers who stop using a company’s product over a given time interval (Lost Customers / Starting Customers * 100). Leading predictive indicators include decreasing login frequency, dropped feature usage depth, declining Net Promoter Score (NPS), spike in unresolved customer support tickets, and changes in billing contract utilization.',
        evaluationCriteria: 'Defines churn mathematically and lists at least three proactive leading indicators.'
      },
      {
        id: 'da_q5',
        difficulty: 'Advanced',
        category: 'Business Modeling',
        text: 'How would you conduct an A/B test analysis to evaluate if a new checkout flow increases conversion?',
        expectedKeywords: ['hypothesis testing', 'sample size', 'p-value', 'statistical significance', 'confidence interval', 'type i error'],
        modelAnswer: 'First, formulate the null hypothesis ($H_0$: no difference in conversion rate) and alternative hypothesis ($H_1$). Calculate required sample size and test duration upfront to prevent early stopping bias. Randomly split users into control and treatment groups. After gathering sufficient sample size, run a two-proportion z-test. If the p-value is below $\\alpha = 0.05$ with an acceptable confidence interval, we reject $H_0$ and confirm statistical significance.',
        evaluationCriteria: 'Articulates hypothesis formulation, sample size power calculation, and significance testing.'
      }
    ]
  },
  'hr-interview': {
    title: 'HR & Behavioral Interview',
    description: 'Behavioral, teamwork, leadership, situational problem-solving, and culture fit evaluation.',
    questions: [
      {
        id: 'hr_q1',
        difficulty: 'Beginner',
        category: 'Personal Background',
        text: 'Tell me about yourself, your educational background, and why you are interested in this career path.',
        expectedKeywords: ['background', 'projects', 'passion', 'alignment', 'growth'],
        modelAnswer: 'I am a dedicated computer science graduate passionate about building robust software solutions. During my degree, I developed a strong foundation in Java, web engineering, and relational databases. In my capstone project, I led a four-person team building a collaborative portal with over 500 active student users. I am eager to apply my technical curiosity, rapid learning agility, and collaborative spirit to solve enterprise engineering challenges in a growth-oriented company.',
        evaluationCriteria: 'Concise 90-second pitch connecting education, practical projects, and long-term career ambition.'
      },
      {
        id: 'hr_q2',
        difficulty: 'Beginner',
        category: 'Self-Awareness',
        text: 'What do you consider your greatest professional strength and one area you are actively working to improve?',
        expectedKeywords: ['strength', 'improvement', 'self-awareness', 'action plan', 'growth mindset'],
        modelAnswer: 'My greatest strength is structured problem-solving and perseverance when debugging complex issues; I systematically break problems down into isolated testable components. An area I am actively improving is speaking up earlier in cross-functional meetings when requirement ambiguities arise. To develop this, I have taken active communication workshops and adopted the STAR framework for project updates.',
        evaluationCriteria: 'Presents a genuine, work-related strength and an actionable improvement plan.'
      },
      {
        id: 'hr_q3',
        difficulty: 'Intermediate',
        category: 'Conflict & Teamwork',
        text: 'Describe a situation where you had a disagreement with a team member. How did you resolve it?',
        expectedKeywords: ['situation', 'task', 'action', 'result', 'empathy', 'objective data', 'compromise'],
        modelAnswer: 'During our college capstone project, a peer wanted to implement a complex NoSQL architecture, whereas I advocated for a relational PostgreSQL schema because our data had strict transactional integrity requirements. Rather than arguing personal preferences, I scheduled a focused discussion where we listed each architecture’s pros, cons, and delivery risks against our project deadlines. We agreed on PostgreSQL with a JSONB column for flexibility, delivering on time with zero schema inconsistencies.',
        evaluationCriteria: 'Uses the STAR method; emphasizes professional objectivity and mutual respect.'
      },
      {
        id: 'hr_q4',
        difficulty: 'Intermediate',
        category: 'Adaptability',
        text: 'How do you prioritize your tasks when faced with multiple tight deadlines simultaneously?',
        expectedKeywords: ['prioritization', 'eisenhower matrix', 'communication', 'trade-offs', 'stakeholder updates'],
        modelAnswer: 'I categorize deliverables using an impact versus urgency matrix. I first tackle high-urgency, high-impact dependencies that unblock teammates. Next, I proactively communicate with project leads if competing priorities could cause slippage, presenting trade-offs and proposing revised phased milestones. I break down large milestones into focused 90-minute sprints and eliminate distractions to maintain steady velocity.',
        evaluationCriteria: 'Demonstrates systematic prioritization and proactive stakeholder communication.'
      },
      {
        id: 'hr_q5',
        difficulty: 'Advanced',
        category: 'Vision & Culture',
        text: 'Where do you see yourself in 3 to 5 years, and what does professional success look like to you?',
        expectedKeywords: ['3-5 years', 'technical mentorship', 'architecture', 'ownership', 'continuous learning'],
        modelAnswer: 'In 3 to 5 years, I envision myself as a seasoned software engineer taking ownership of end-to-end service architectures and mentoring junior developers. Success to me means not only delivering clean, scalable code that creates tangible business value, but also fostering an inclusive engineering culture where team members collaborate efficiently and continuously raise the quality bar.',
        evaluationCriteria: 'Expresses balanced technical progression, leadership aspirations, and organizational alignment.'
      }
    ]
  }
};
