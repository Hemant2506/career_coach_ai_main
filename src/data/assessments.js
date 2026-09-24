export const ASSESSMENTS = [
  {
    id: 'assessment_js',
    title: 'JavaScript',
    category: 'Web Development',
    questionCount: 10,
    timeLimitMinutes: 15,
    difficulty: 'Intermediate',
    description: 'Test your understanding of JavaScript core concepts: scoping, closures, prototype inheritance, event loop, and asynchronous promises.',
    strongTopicsPool: ['Variables & Scoping', 'Functions & Closures', 'DOM Manipulation'],
    weakTopicsPool: ['Async/Await & Promises', 'Event Loop & Microtasks'],
    questions: [
      {
        id: 'q1',
        topic: 'Variables & Scoping',
        text: 'Which keyword is used to declare a block-scoped variable that cannot be reassigned?',
        options: ['var', 'let', 'const', 'static'],
        correctIndex: 2,
        explanation: 'The `const` keyword declares a block-scoped variable whose identifier cannot be reassigned after initialization.'
      },
      {
        id: 'q2',
        topic: 'Variables & Scoping',
        text: 'What is the output of `typeof null` in standard JavaScript?',
        options: ['"null"', '"undefined"', '"object"', '"number"'],
        correctIndex: 2,
        explanation: 'In JavaScript, `typeof null === "object"` is a well-known legacy behavior from the initial JS implementation where type tags for objects were 0.'
      },
      {
        id: 'q3',
        topic: 'Functions & Closures',
        text: 'What enables an inner function to retain access to variables declared in its outer enclosing function even after the outer function has finished executing?',
        options: ['Hoisting', 'A Closure', 'Event Bubbling', 'Prototype Chaining'],
        correctIndex: 1,
        explanation: 'A closure is the combination of a function bundled together with references to its surrounding lexical state (lexical environment).'
      },
      {
        id: 'q4',
        topic: 'Functions & Closures',
        text: 'How does an arrow function handle the `this` context?',
        options: [
          'It creates its own dynamic `this` bound to the caller',
          'It inherits `this` lexically from the enclosing execution context',
          'It defaults `this` to the global window object in all modes',
          '`this` is always undefined inside arrow functions'
        ],
        correctIndex: 1,
        explanation: 'Arrow functions do not have their own `this` binding; they resolve `this` lexically from their containing scope.'
      },
      {
        id: 'q5',
        topic: 'DOM Manipulation',
        text: 'Which DOM method adds a listener to handle browser user events like clicks or keystrokes?',
        options: ['element.attachEvent()', 'element.addEventListener()', 'element.listen()', 'element.on()'],
        correctIndex: 1,
        explanation: '`element.addEventListener(type, listener, options)` is the standard W3C method for registering event handlers.'
      },
      {
        id: 'q6',
        topic: 'DOM Manipulation',
        text: 'In browser event propagation, what phase occurs immediately BEFORE the event bubbles up the DOM tree?',
        options: ['Delegation Phase', 'Capture Phase', 'Target Phase', 'Resolution Phase'],
        correctIndex: 2,
        explanation: 'Events first travel down through the Capture phase, reach the Target element (Target phase), and then bubble back up (Bubble phase).'
      },
      {
        id: 'q7',
        topic: 'Async/Await & Promises',
        text: 'What is the initial state of a newly created `Promise` instance?',
        options: ['fulfilled', 'pending', 'resolved', 'settled'],
        correctIndex: 1,
        explanation: 'A new Promise starts in the "pending" state until it is either fulfilled with a value or rejected with a reason.'
      },
      {
        id: 'q8',
        topic: 'Async/Await & Promises',
        text: 'Which static Promise combinator method waits for all promises to settle regardless of whether they resolve or reject?',
        options: ['Promise.all()', 'Promise.race()', 'Promise.any()', 'Promise.allSettled()'],
        correctIndex: 3,
        explanation: '`Promise.allSettled()` returns a promise that resolves after all the given promises have either fulfilled or rejected, with an array of objects that each describe the outcome.'
      },
      {
        id: 'q9',
        topic: 'Event Loop & Microtasks',
        text: 'In the JavaScript event loop, which queue takes precedence for execution over the macrotask (timer) queue?',
        options: ['Rendering Queue', 'Microtask Queue (Promises)', 'Idle Callback Queue', 'I/O Polling Queue'],
        correctIndex: 1,
        explanation: 'Microtasks (such as Promise callbacks and queueMicrotask) are processed completely before the event loop advances to the next macrotask.'
      },
      {
        id: 'q10',
        topic: 'Variables & Scoping',
        text: 'What will `console.log(1 + "2" + 3)` output in JavaScript?',
        options: ['"6"', '"123"', '6', 'NaN'],
        correctIndex: 1,
        explanation: 'Due to left-to-right evaluation and string concatenation precedence, 1 + "2" becomes "12", and "12" + 3 results in the string "123".'
      }
    ]
  },
  {
    id: 'assessment_sql',
    title: 'SQL & Databases',
    category: 'Data',
    questionCount: 10,
    timeLimitMinutes: 15,
    difficulty: 'Intermediate',
    description: 'Assess relational database querying skills: SELECT, GROUP BY, JOIN types, indexing, ACID properties, and subqueries.',
    strongTopicsPool: ['Relational Joins', 'Basic Aggregations', 'Data Types'],
    weakTopicsPool: ['Window Functions & CTEs', 'Index Optimization & Execution Plans'],
    questions: [
      {
        id: 'sql_q1',
        topic: 'Relational Joins',
        text: 'Which SQL JOIN returns all rows from the left table and matched rows from the right table, filling nulls if no match exists?',
        options: ['INNER JOIN', 'LEFT OUTER JOIN', 'FULL JOIN', 'CROSS JOIN'],
        correctIndex: 1,
        explanation: 'LEFT JOIN (or LEFT OUTER JOIN) preserves all records from the left table and matches records from the right table where possible.'
      },
      {
        id: 'sql_q2',
        topic: 'Basic Aggregations',
        text: 'Which clause is used to filter groups of records AFTER an aggregation function has been computed?',
        options: ['WHERE', 'HAVING', 'ORDER BY', 'FILTER'],
        correctIndex: 1,
        explanation: 'WHERE filters rows before aggregation; HAVING filters aggregated results after the GROUP BY calculation.'
      },
      {
        id: 'sql_q3',
        topic: 'Relational Joins',
        text: 'What is the primary purpose of a database foreign key constraint?',
        options: [
          'To encrypt column data on disk',
          'To enforce referential integrity between related tables',
          'To increase write speed on insertions',
          'To allow unlimited duplicate records'
        ],
        correctIndex: 1,
        explanation: 'Foreign keys enforce referential integrity by ensuring the value in a child column matches a primary key in the referenced parent table.'
      },
      {
        id: 'sql_q4',
        topic: 'Index Optimization & Execution Plans',
        text: 'Which SQL keyword shows how the database engine intends to execute and index-scan a query?',
        options: ['ANALYZE', 'EXPLAIN', 'PROFILE', 'OPTIMIZE'],
        correctIndex: 1,
        explanation: '`EXPLAIN` displays the execution plan that the database engine query planner generates for the provided SQL statement.'
      },
      {
        id: 'sql_q5',
        topic: 'Basic Aggregations',
        text: 'Which constraint ensures that no duplicate values exist in a column or set of columns?',
        options: ['CHECK', 'DEFAULT', 'UNIQUE', 'NOT NULL'],
        correctIndex: 2,
        explanation: 'A UNIQUE constraint guarantees that all values in an indexed column or combination of columns are distinct.'
      },
      {
        id: 'sql_q6',
        topic: 'Window Functions & CTEs',
        text: 'What syntax initiates a Common Table Expression (CTE) in modern SQL?',
        options: ['SUBQUERY table AS', 'WITH table AS (...)', 'CREATE CTE table', 'DEFINE TEMP table'],
        correctIndex: 1,
        explanation: 'CTEs are declared using the `WITH` keyword followed by the table alias and parenthesized query definition.'
      },
      {
        id: 'sql_q7',
        topic: 'Index Optimization & Execution Plans',
        text: 'What does the "A" in the ACID transactional database acronym stand for?',
        options: ['Authentication', 'Atomicity', 'Asynchronous', 'Authorization'],
        correctIndex: 1,
        explanation: 'Atomicity ensures that all operations in a database transaction succeed or all fail together ("all or nothing").'
      },
      {
        id: 'sql_q8',
        topic: 'Window Functions & CTEs',
        text: 'Which function assigns a unique sequential integer to rows within a partition starting at 1?',
        options: ['RANK()', 'DENSE_RANK()', 'ROW_NUMBER()', 'NTILE()'],
        correctIndex: 2,
        explanation: '`ROW_NUMBER()` outputs a unique consecutive rank for each row within its partition regardless of duplicate values.'
      },
      {
        id: 'sql_q9',
        topic: 'Relational Joins',
        text: 'What is the result of a CROSS JOIN between a table with 5 rows and a table with 4 rows?',
        options: ['9 rows', '20 rows (Cartesian product)', '5 rows', '1 row'],
        correctIndex: 1,
        explanation: 'A CROSS JOIN produces the Cartesian product of both tables: 5 * 4 = 20 rows.'
      },
      {
        id: 'sql_q10',
        topic: 'Index Optimization & Execution Plans',
        text: 'Which index data structure is most widely used by default in relational databases like PostgreSQL and MySQL InnoDB?',
        options: ['B-Tree', 'Hash Table', 'Bloom Filter', 'Skip List'],
        correctIndex: 0,
        explanation: 'B-Tree (and B+ Tree) structures provide balanced, efficient O(log N) lookups for equality and range queries.'
      }
    ]
  },
  {
    id: 'assessment_java',
    title: 'Java Programming',
    category: 'Programming',
    questionCount: 10,
    timeLimitMinutes: 15,
    difficulty: 'Intermediate',
    description: 'Test your understanding of Java OOP, JVM memory model, Collections framework, and concurrency.',
    strongTopicsPool: ['Object-Oriented Programming', 'Java Syntax & Basics', 'Exception Handling'],
    weakTopicsPool: ['Multithreading & Concurrency', 'JVM Memory & Garbage Collection'],
    questions: [
      {
        id: 'java_q1',
        topic: 'Object-Oriented Programming',
        text: 'Which pillar of OOP is primarily demonstrated by making fields private and providing public getters and setters?',
        options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Abstraction'],
        correctIndex: 1,
        explanation: 'Encapsulation bundles data and methods together while restricting direct access to the internal components.'
      },
      {
        id: 'java_q2',
        topic: 'Object-Oriented Programming',
        text: 'Can a class in Java directly inherit from more than one concrete class via `extends`?',
        options: ['Yes, always', 'No, Java does not support multiple class inheritance', 'Only if both classes are abstract', 'Only in Java 17+'],
        correctIndex: 1,
        explanation: 'Java avoids the diamond problem by disallowing multiple class inheritance; classes implement multiple interfaces instead.'
      },
      {
        id: 'java_q3',
        topic: 'JVM Memory & Garbage Collection',
        text: 'Where are Java object instances created and allocated in memory?',
        options: ['Stack Memory', 'Heap Memory', 'Program Counter Register', 'Native Method Stack'],
        correctIndex: 1,
        explanation: 'All object instances in Java reside in the heap memory managed by the Garbage Collector.'
      },
      {
        id: 'java_q4',
        topic: 'Java Syntax & Basics',
        text: 'Which collection implementation in `java.util` stores elements in key-value pairs with O(1) average lookup time?',
        options: ['ArrayList', 'TreeSet', 'HashMap', 'LinkedList'],
        correctIndex: 2,
        explanation: '`HashMap` provides constant time O(1) average performance for `get()` and `put()` operations.'
      },
      {
        id: 'java_q5',
        topic: 'Exception Handling',
        text: 'Which of the following is an unchecked (Runtime) exception in Java?',
        options: ['IOException', 'SQLException', 'NullPointerException', 'ClassNotFoundException'],
        correctIndex: 2,
        explanation: '`NullPointerException` subclasses `RuntimeException`, making it an unchecked exception that the compiler does not force you to catch.'
      },
      {
        id: 'java_q6',
        topic: 'Multithreading & Concurrency',
        text: 'Which keyword guarantees visibility of changes to variables across multiple threads in Java?',
        options: ['transient', 'volatile', 'synchronized', 'final'],
        correctIndex: 1,
        explanation: 'The `volatile` keyword ensures that reads and writes are made directly to main memory rather than CPU thread caches.'
      },
      {
        id: 'java_q7',
        topic: 'Java Syntax & Basics',
        text: 'What is the default value of a boolean instance variable in a Java class?',
        options: ['true', 'false', 'null', '0'],
        correctIndex: 1,
        explanation: 'Uninitialized boolean primitive fields in Java default to `false`.'
      },
      {
        id: 'java_q8',
        topic: 'Object-Oriented Programming',
        text: 'What keyword prevents a class from being subclassed or inherited?',
        options: ['static', 'abstract', 'final', 'sealed'],
        correctIndex: 2,
        explanation: 'Marking a class `final` prevents other classes from extending it (e.g. `java.lang.String`).'
      },
      {
        id: 'java_q9',
        topic: 'JVM Memory & Garbage Collection',
        text: 'Which method should be overridden when implementing custom equality for objects used as keys in a HashMap?',
        options: ['Only equals()', 'Only hashCode()', 'Both equals() and hashCode()', 'toString()'],
        correctIndex: 2,
        explanation: 'The contract between `equals()` and `hashCode()` mandates that if two objects are equal according to `equals()`, they must produce the same hash code.'
      },
      {
        id: 'java_q10',
        topic: 'Multithreading & Concurrency',
        text: 'Which interface in Java provides a functional representation of a task that returns a result and can throw an exception?',
        options: ['Runnable', 'Callable', 'Supplier', 'Consumer'],
        correctIndex: 1,
        explanation: '`java.util.concurrent.Callable<V>` has a `V call()` method that returns a value and can throw checked exceptions.'
      }
    ]
  },
  {
    id: 'assessment_comm',
    title: 'Professional Communication',
    category: 'Communication',
    questionCount: 8,
    timeLimitMinutes: 12,
    difficulty: 'All Levels',
    description: 'Evaluate your ability to articulate technical concepts, resolve workplace conflicts, and structure engineering presentations.',
    strongTopicsPool: ['Active Listening', 'STAR Framework Application', 'Team Collaboration'],
    weakTopicsPool: ['Handling Critical Stakeholder Pushback', 'Written Asynchronous Precision'],
    questions: [
      {
        id: 'comm_q1',
        topic: 'STAR Framework Application',
        text: 'What does the acronym STAR stand for in behavioral interview methodology?',
        options: [
          'Strategy, Tactics, Action, Review',
          'Situation, Task, Action, Result',
          'Scope, Timeline, Allocation, Risk',
          'Standard, Technical, Analytic, Resolution'
        ],
        correctIndex: 1,
        explanation: 'The STAR method stands for Situation, Task, Action, and Result, guiding clear storytelling in interviews.'
      },
      {
        id: 'comm_q2',
        topic: 'Active Listening',
        text: 'What is the primary indicator of active listening during a technical requirement discussion?',
        options: [
          'Interrupting immediately when an architectural flaw is noticed',
          'Paraphrasing the speaker’s requirements in your own words to confirm alignment',
          'Nodding continuously without asking questions',
          'Writing code immediately while the speaker is talking'
        ],
        correctIndex: 1,
        explanation: 'Reflective paraphrasing confirms comprehension and surfaces misunderstandings before work begins.'
      },
      {
        id: 'comm_q3',
        topic: 'Handling Critical Stakeholder Pushback',
        text: 'When a product manager requests a feature that jeopardizes security or system stability, what is the best response?',
        options: [
          'Refuse flatly without giving reasons',
          'Agree silently and hope the system doesn’t break',
          'Present the technical trade-offs objectively and propose an alternative phased approach',
          'Escalate to the CEO immediately'
        ],
        correctIndex: 2,
        explanation: 'Constructive engineering communication explains trade-offs with data and proposes feasible alternative solutions.'
      },
      {
        id: 'comm_q4',
        topic: 'Written Asynchronous Precision',
        text: 'In remote team communication (e.g. Slack/Teams), what characterizes high-signal messaging?',
        options: [
          'Sending multiple one-word messages',
          'Contextual messages that clearly outline the problem, attempts made, and specific action requested',
          'Only communicating via spontaneous audio calls',
          'Using abbreviations and unexplained internal jargon'
        ],
        correctIndex: 1,
        explanation: 'Asynchronous clarity saves hours by providing context, reproduction steps, and clear requests in one comprehensive post.'
      },
      {
        id: 'comm_q5',
        topic: 'Team Collaboration',
        text: 'During a peer code review, how should constructive feedback be phrased?',
        options: [
          '"Your code is terrible and makes no sense."',
          '"Why did you write it this way?"',
          '"Consider using a Map here because it reduces lookup complexity from O(N) to O(1). What do you think?"',
          'Silently reject the PR without leaving comments'
        ],
        correctIndex: 2,
        explanation: 'Effective code reviews focus on the code rather than the person, provide concrete technical rationale, and invite discussion.'
      },
      {
        id: 'comm_q6',
        topic: 'STAR Framework Application',
        text: 'In a behavioral interview answer, what is the most important part of the "Result" component?',
        options: [
          'Saying that everyone was happy',
          'Quantifying the outcome with measurable data, metrics, or lessons learned',
          'Focusing on how difficult the boss was',
          'Leaving the ending ambiguous'
        ],
        correctIndex: 1,
        explanation: 'Quantified results (e.g. "reduced latency by 35%", "delivered 2 days early") give concrete proof of impact.'
      },
      {
        id: 'comm_q7',
        topic: 'Active Listening',
        text: 'When an interviewer asks a complex or ambiguous technical question, what is your first step?',
        options: [
          'Start coding immediately to show speed',
          'Clarify assumptions, input constraints, and expected edge cases',
          'Guess what they want without speaking',
          'Say that the question is invalid'
        ],
        correctIndex: 1,
        explanation: 'Senior engineers clarify boundaries and edge cases before proposing or implementing solutions.'
      },
      {
        id: 'comm_q8',
        topic: 'Written Asynchronous Precision',
        text: 'What is the recommended structure for an incident post-mortem communication?',
        options: [
          'Blaming the engineer who pushed the commit',
          'Summary, Timeline of events, Root cause analysis, Impact, and Preventive action items',
          'A quick apology with no technical details',
          'Deleting the incident logs'
        ],
        correctIndex: 1,
        explanation: 'Blameless post-mortems establish trust and prevent recurrence by thoroughly documenting causes and preventative measures.'
      }
    ]
  }
];
