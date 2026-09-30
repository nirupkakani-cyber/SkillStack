export const r23SyllabusData = [
  {
    id: "ds-r23cs301",
    code: "R23-CS301",
    name: "Data Structures",
    semester: 3,
    department: "CSE (AI & DS)",
    credits: 3,
    type: "Core Theory",
    instructor: "Dr. K. Srinivas Rao",
    description: "Abstract Data Types (ADTs), Stacks, Queues implementation using Arrays & Linked Lists, Expression evaluation, Binary Search Trees, AVL Trees, Graphs, BFS/DFS traversals.",
    units: [
      {
        unitNumber: 1,
        title: "Unit I: Linear Data Structures",
        topics: [
          "Abstract Data Types (ADTs) Concept",
          "Stacks & Queues implementation using Arrays & Linked Lists",
          "Infix to Postfix & Prefix Conversion Algorithms",
          "Evaluation of Arithmetic Expressions",
          "Circular Linked Lists & Doubly Linked Lists"
        ],
        youtube: [
          { id: "3Xj0HwRhmz8", title: "FreeCodeCamp Data Structures Course", duration: "8 hrs 01 mins", channel: "freeCodeCamp.org" },
          { id: "DbR1ppXtMWg", title: "NPTEL Lecture by Prof. Naveen Garg", duration: "52 mins", channel: "NPTEL-NITTTR" }
        ],
        nptel: {
          courseId: "NPTEL106102064",
          title: "Programming, Data Structures And Algorithms",
          instructor: "Prof. Naveen Garg (IIT Delhi)",
          url: "https://nptel.ac.in/courses/106102064"
        }
      },
      {
        unitNumber: 2,
        title: "Unit II: Non-Linear Data Structures",
        topics: [
          "Trees Terminology & Representation",
          "Binary Search Trees (BST): Insertion, Deletion, Searching",
          "Balanced Trees: AVL Tree Rotations (LL, RR, LR, RL)",
          "Graph Representations: Adjacency Matrix & Adjacency List",
          "Breadth-First Search (BFS) & Depth-First Search (DFS)"
        ],
        youtube: [
          { id: "oSWTXtMglKE", title: "Abdul Bari Trees & Graphs Tutorial", duration: "1 hr 15 mins", channel: "Abdul Bari" },
          { id: "t0Cq6tVNRBA", title: "Graph Traversals BFS & DFS - Gate Smashers", duration: "45 mins", channel: "Gate Smashers" }
        ],
        nptel: {
          courseId: "NPTEL106106127",
          title: "Data Structures and Algorithms",
          instructor: "Prof. Madhavan Mukund",
          url: "https://nptel.ac.in/courses/106106127"
        }
      },
      {
        unitNumber: 3,
        title: "Unit III: Advanced Graph & Shortest Path Algorithms",
        topics: [
          "Minimum Spanning Trees: Prim's & Kruskal's Algorithms",
          "Single Source Shortest Path: Dijkstra's Algorithm",
          "All-Pairs Shortest Path: Floyd-Warshall Algorithm",
          "Topological Sorting & Directed Acyclic Graphs (DAG)"
        ],
        youtube: [
          { id: "XB4MIexjqYg", title: "Dijkstra's Shortest Path Algorithm", duration: "32 mins", channel: "Gate Smashers" }
        ],
        nptel: { courseId: "NPTEL106105085", title: "Advanced Graph Algorithms", instructor: "Prof. P. P. Chakraborty", url: "https://nptel.ac.in/courses/106105085" }
      },
      {
        unitNumber: 4,
        title: "Unit IV: Hashing & Searching Techniques",
        topics: [
          "Hash Functions & Collision Resolution",
          "Open Addressing (Linear Probing, Quadratic Probing) & Chaining",
          "Binary Search, Fibonacci Search, Interpolation Search",
          "Trie Data Structures & String Pattern Matching"
        ],
        youtube: [
          { id: "shsBqiF72dE", title: "Hashing & Collision Resolution Techniques", duration: "40 mins", channel: "Gate Smashers" }
        ],
        nptel: { courseId: "NPTEL106104019", title: "Hashing & Analysis of Algorithms", instructor: "Prof. Surender Baswana", url: "https://nptel.ac.in/courses/106104019" }
      },
      {
        unitNumber: 5,
        title: "Unit V: Sorting Algorithms & Complexity",
        topics: [
          "Insertion Sort, Selection Sort, Bubble Sort Analysis",
          "Quick Sort Partitioning Strategies & Time Complexity",
          "Merge Sort Divide & Conquer Method",
          "Heap Sort & Priority Queues"
        ],
        youtube: [
          { id: "6nDMgrvAp6M", title: "Quick Sort vs Merge Sort Explained", duration: "35 mins", channel: "Abdul Bari" }
        ],
        nptel: { courseId: "NPTEL106104019", title: "Sorting Algorithms", instructor: "Prof. Surender Baswana", url: "https://nptel.ac.in/courses/106104019" }
      }
    ]
  },
  {
    id: "java-r23cs302",
    code: "R23-CS302",
    name: "OOP through Java",
    semester: 3,
    department: "CSE (AI & DS)",
    credits: 3,
    type: "Core Theory",
    instructor: "Prof. M. Ramesh Kumar",
    description: "Object-Oriented concepts, Abstraction, Encapsulation, Inheritance, Polymorphism, Exception Handling, Multithreading, Streams, and Java Collections Framework.",
    units: [
      {
        unitNumber: 1,
        title: "Unit I: Java Basics & OOP Concepts",
        topics: [
          "JVM Architecture, Bytecode & Platform Independence",
          "Classes, Objects, Constructors & Garbage Collection",
          "Method Overloading & Static Members",
          "Encapsulation & Access Specifiers"
        ],
        youtube: [{ id: "eIrMbAQSU34", title: "Java Full Course - FreeCodeCamp", duration: "9 hrs 30 mins", channel: "freeCodeCamp.org" }],
        nptel: { courseId: "NPTEL106105191", title: "Programming in Java", instructor: "Prof. Debasis Samanta (IIT Kharagpur)", url: "https://nptel.ac.in/courses/106105191" }
      },
      {
        unitNumber: 2,
        title: "Unit II: Inheritance & Interfaces",
        topics: [
          "Superclass & Subclass, 'super' and 'this' keywords",
          "Method Overriding & Dynamic Method Dispatch",
          "Abstract Classes & Interface Definitions",
          "Multiple Inheritance through Interfaces"
        ],
        youtube: [{ id: "VHbSopMyc4M", title: "Inheritance & Polymorphism in Java", duration: "45 mins", channel: "Telusko" }],
        nptel: { courseId: "NPTEL106105191", title: "Java Interfaces & Packages", instructor: "Prof. Debasis Samanta", url: "https://nptel.ac.in/courses/106105191" }
      },
      {
        unitNumber: 3,
        title: "Unit III: Exception Handling & Multithreading",
        topics: [
          "Try-Catch-Finally Blocks & Custom Exceptions",
          "Checked vs Unchecked Exceptions",
          "Thread Lifecycle, Runnable Interface & Thread Class",
          "Synchronization & Inter-Thread Communication"
        ],
        youtube: [{ id: "1h0_186358c", title: "Java Multithreading & Synchronization", duration: "50 mins", channel: "Telusko" }],
        nptel: { courseId: "NPTEL106105191", title: "Multithreading in Java", instructor: "Prof. Debasis Samanta", url: "https://nptel.ac.in/courses/106105191" }
      },
      {
        unitNumber: 4,
        title: "Unit IV: Collections Framework & Generics",
        topics: [
          "List, Set, Map Interfaces and Implementations",
          "ArrayList, LinkedList, HashSet, HashMap",
          "Iterator & ListIterator Interfaces",
          "Generic Classes & Type Parameters"
        ],
        youtube: [{ id: "9nL36d1bZoc", title: "Java Collections Framework Masterclass", duration: "1 hr 10 mins", channel: "Telusko" }],
        nptel: { courseId: "NPTEL106105191", title: "Java Collections & Generics", instructor: "Prof. Debasis Samanta", url: "https://nptel.ac.in/courses/106105191" }
      },
      {
        unitNumber: 5,
        title: "Unit V: Java I/O Streams & Event Handling",
        topics: [
          "Byte Streams & Character Streams (FileInputStream, BufferedReader)",
          "Serialization & Deserialization",
          "Delegation Event Model & Event Listeners",
          "GUI Development with JavaFX / Swing basics"
        ],
        youtube: [{ id: "A74TOX803D0", title: "Java I/O Streams & Serialization", duration: "40 mins", channel: "Telusko" }],
        nptel: { courseId: "NPTEL106105191", title: "Java I/O Systems", instructor: "Prof. Debasis Samanta", url: "https://nptel.ac.in/courses/106105191" }
      }
    ]
  },
  {
    id: "dbms-r23cs303",
    code: "R23-CS303",
    name: "Database Management Systems (DBMS)",
    semester: 3,
    department: "CSE (AI & DS)",
    credits: 3,
    type: "Core Theory",
    instructor: "Dr. A. Rajesh",
    description: "Covers ER Models, Relational Algebra, SQL Queries, Joins, Transactions, ACID Properties, and Normalization (1NF, 2NF, 3NF, BCNF).",
    units: [
      {
        unitNumber: 1,
        title: "Unit I: ER Modeling & Relational Algebra",
        topics: [
          "Entity-Relationship (ER) Data Model & Diagrams",
          "Relational Model Concepts & Keys (Primary, Foreign, Candidate)",
          "Relational Algebra Operations (Select, Project, Join, Union)",
          "Tuple Relational Calculus & Domain Relational Calculus"
        ],
        youtube: [{ id: "3EJlovevfcA", title: "DBMS Full Course - Gate Smashers", duration: "6 hrs 45 mins", channel: "Gate Smashers" }],
        nptel: { courseId: "NPTEL106105175", title: "Database Management System", instructor: "Prof. Partha Pratim Das (IIT Kharagpur)", url: "https://nptel.ac.in/courses/106105175" }
      },
      {
        unitNumber: 2,
        title: "Unit II: SQL Queries & Normalization",
        topics: [
          "DDL, DML, DCL, TCL SQL Commands",
          "Complex Subqueries, Joins & Grouping Clauses",
          "Functional Dependencies & Pitfalls in Relational Design",
          "Normalization Forms: 1NF, 2NF, 3NF, BCNF, 4NF"
        ],
        youtube: [{ id: "HXV3zeQKqGY", title: "SQL Tutorial - Full Database Course for Beginners", duration: "4 hrs 20 mins", channel: "freeCodeCamp.org" }],
        nptel: { courseId: "NPTEL106105175", title: "SQL & Relational Normalization", instructor: "Prof. Partha Pratim Das", url: "https://nptel.ac.in/courses/106105175" }
      }
    ]
  },
  {
    id: "python-r23cs304",
    code: "R23-CS304",
    name: "Python Programming & Algorithms",
    semester: 4,
    department: "CSE (AI & DS)",
    credits: 3,
    type: "Core Theory & Lab",
    instructor: "Prof. S. Lakshmi",
    description: "Focuses on Python data structures (lists, dictionaries, sets), file handling, exception management, and building modular algorithms.",
    units: [
      {
        unitNumber: 1,
        title: "Unit I: Python Basics & Core Data Structures",
        topics: [
          "Variables, Data Types, Control Flow & Loops",
          "Lists, Tuples, Dictionaries & Set Operations",
          "List Comprehensions & Dictionary Methods",
          "Strings Manipulation & Pattern Matching"
        ],
        youtube: [{ id: "rfscVS0vtbw", title: "Python for Beginners - Full Course", duration: "4 hrs 30 mins", channel: "Programming with Mosh" }],
        nptel: { courseId: "NPTEL106106145", title: "The Joy of Computing using Python", instructor: "Prof. Sudarshan Iyengar (IIT Ropar)", url: "https://nptel.ac.in/courses/106106145" }
      },
      {
        unitNumber: 2,
        title: "Unit II: Modular Functions, Exception Handling & Files",
        topics: [
          "Function Definitions, Lambda Expressions & Recursion",
          "Modules, Packages & Standard Library Overview",
          "File I/O Operations (Read, Write, Append, Context Managers)",
          "Exception Handling with Try-Except-Finally"
        ],
        youtube: [{ id: "HGOBQPFzWKo", title: "Python File Handling & Modules", duration: "1 hr 15 mins", channel: "Corey Schafer" }],
        nptel: { courseId: "NPTEL106106145", title: "Python Functions & File Management", instructor: "Prof. Sudarshan Iyengar", url: "https://nptel.ac.in/courses/106106145" }
      }
    ]
  }
];

export const initialStudentTasks = [
  {
    id: "task-skillstack-01",
    title: "Circular Linked List Implementation in C",
    subject: "Data Structures",
    code: "R23-CS301",
    dueDate: "2026-08-15",
    status: "Active",
    marks: 10,
    type: "Active Assignment",
    instructor: "Dr. K. Srinivas Rao",
    description: "Implement dynamic insertion and deletion operations with robust verification test logs.",
    allowedFormats: [".c", ".cpp", ".pdf", ".zip"],
    walkthroughUrl: "https://www.youtube.com/watch?v=wjI1WkVzhg4",
    submitted: false,
    submissionFile: null
  },
  {
    id: "task-edunest-02",
    title: "Relational Schema Normalization (3NF)",
    subject: "Database Systems",
    code: "R23-CS302",
    dueDate: "Next Friday",
    status: "Upcoming",
    marks: 10,
    type: "Upcoming Task",
    instructor: "Prof. M. Ramesh Kumar",
    description: "Design an optimal relational database schema for a Healthcare records platform.",
    allowedFormats: [".pdf", ".docx"],
    submitted: false,
    submissionFile: null
  }
];

export const r23EvaluationRules = {
  regulation: "Narayana R23 Autonomous",
  totalMarks: 100,
  cieWeight: 30,
  seeWeight: 70,
  assignmentWeight: 10,
  cieBreakdown: {
    mid1: 15,
    mid2: 15,
    assignment: 5,
    quizAttendance: 5,
    minCiePassMarks: 10.5
  },
  seeBreakdown: {
    total: 70,
    minSeePassMarks: 24.5
  },
  minOverallAggregate: 40,
  attendanceRules: {
    minimumRequired: 75,
    condonationMin: 65,
    detentionThreshold: 65,
    condonationNote: "Mandatory 75% attendance threshold to appear for SEE examinations."
  }
};

export const sampleStudentScorecard = {
  student: {
    name: "Antigravity AI",
    rollNo: "2571A47017",
    branch: "CSE (AI & DS)",
    semester: 3,
    academicYear: "2025-2026",
    totalClassesHeld: 120,
    classesAttended: 98,
    cgpa: 8.84
  },
  subjectGrades: [
    {
      code: "R23-CS301",
      name: "Data Structures",
      credits: 3,
      cieMarks: 24.0,
      seeMarks: 60.0,
      totalMarks: 84.0,
      gradePoint: 9,
      grade: "A+",
      assignmentStatus: "Submitted & Verified",
      status: "PASS"
    },
    {
      code: "R23-CS302",
      name: "OOP through Java",
      credits: 3,
      cieMarks: 22.0,
      seeMarks: 58.0,
      totalMarks: 80.0,
      gradePoint: 8,
      grade: "A",
      assignmentStatus: "Submitted",
      status: "PASS"
    }
  ]
};
