import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Key, 
  RefreshCw, 
  BookOpen, 
  Code, 
  Award, 
  Zap, 
  Trash2, 
  User, 
  Lightbulb,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

// Subject domains for tailored doubt clearing
const SUBJECT_DOMAINS = [
  { id: 'all', name: 'General Academic', icon: BookOpen, color: 'from-blue-500 to-indigo-600' },
  { id: 'ds', name: 'Data Structures (CS301)', icon: Code, color: 'from-cyan-500 to-blue-600' },
  { id: 'dbms', name: 'DBMS & SQL (CS302)', icon: BookOpen, color: 'from-emerald-500 to-teal-600' },
  { id: 'python', name: 'Python & Algos (CS304)', icon: Code, color: 'from-amber-500 to-orange-600' },
  { id: 'r23', name: 'R23 SGPA & Regulations', icon: Award, color: 'from-purple-500 to-pink-600' },
  { id: 'code', name: 'Code Debugger', icon: Zap, color: 'from-rose-500 to-red-600' }
];

// Preset doubt chips per domain
const DOMAIN_PROMPTS = {
  all: [
    "What is the R23 SGPA calculation formula?",
    "How to prepare for JNTU SEE semester exams?",
    "Explain difference between CIE internal and SEE external marks.",
    "Give me important 10-mark questions for Data Structures."
  ],
  ds: [
    "Explain AVL Tree Rotations (LL, RR, LR, RL) with an example.",
    "Write C++ code for Infix to Postfix conversion using Stack.",
    "How does Dijkstra's Algorithm work step-by-step?",
    "Difference between BFS and DFS traversal with time complexity."
  ],
  dbms: [
    "Explain 1NF, 2NF, 3NF, and BCNF normalization with tables.",
    "Write SQL query to find 2nd highest salary using Subquery.",
    "What are ACID properties in DBMS transactions?",
    "Compare Shared Lock (S-Lock) vs Exclusive Lock (X-Lock)."
  ],
  python: [
    "Explain Python list comprehension vs generator memory usage.",
    "How do Python Lambda functions and filter/map work?",
    "Write Python code to implement Binary Search algorithm.",
    "Explain exception handling with try-except-finally in Python."
  ],
  r23: [
    "How are internal 30 marks awarded in R23 regulation?",
    "What is the pass mark criteria in SEE 70 marks paper?",
    "How to calculate CGPA after 3rd semester?",
    "Rules for revaluation and midterm attendance requirement."
  ],
  code: [
    "Help me fix Stack Overflow error in recursive functions.",
    "How to debug segmentation fault in C++ linked list?",
    "Optimize O(N^2) nested loop code to O(N) using Hash Table.",
    "Explain why my Python list index is out of range."
  ]
};

// Fallback academic knowledge base for offline or missing key mode
const ACADEMIC_KNOWLEDGE = {
  sgpa: `**R23 Regulation SGPA Calculation Formula:**

$$\\text{SGPA} = \\frac{\\sum (\\text{Course Credits} \\times \\text{Grade Point})}{Total Credits}$$

**Grade Points Breakdown:**
- **O (Outstanding, 90-100%):** 10 GP
- **A+ (Excellent, 80-89%):** 9 GP
- **A (Very Good, 70-79%):** 8 GP
- **B+ (Good, 60-69%):** 7 GP
- **B (Above Average, 50-59%):** 6 GP
- **C (Pass, 40-49%):** 5 GP
- **F (Fail, <40%):** 0 GP

*Minimum 40% (28/70) required in SEE End-Exam to pass a theory subject.*`,

  avl: `**AVL Tree Rotations Breakdown (Height-Balanced BST):**

Balance Factor $BF = \\text{Height(Left Subtree)} - \\text{Height(Right Subtree)}$. An AVL tree requires $BF \\in \\{-1, 0, +1\\}$.

1. **LL Rotation (Single Right)**: Applied when insertion is in Left child's Left subtree.
2. **RR Rotation (Single Left)**: Applied when insertion is in Right child's Right subtree.
3. **LR Rotation (Double)**: Left rotation on left child, followed by Right rotation on root.
4. **RL Rotation (Double)**: Right rotation on right child, followed by Left rotation on root.

\`\`\`cpp
// Single Right Rotation (LL Case)
Node* rotateRight(Node* y) {
    Node* x = y->left;
    Node* T2 = x->right;
    x->right = y;
    y->left = T2;
    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;
    return x;
}
\`\`\``,

  normalization: `**Database Normalization Quick Summary:**

- **1NF (First Normal Form)**: Every table cell must contain atomic (single-valued) values. No repeating groups.
- **2NF (Second Normal Form)**: Must be in 1NF + No partial dependency (Every non-prime attribute must depend fully on the primary key).
- **3NF (Third Normal Form)**: Must be in 2NF + No transitive dependency ($X \\rightarrow Y$, $Y \\rightarrow Z \\implies X \\rightarrow Z$).
- **BCNF (Boyce-Codd Normal Form)**: Strict 3NF where for every functional dependency $X \\rightarrow Y$, $X$ MUST be a Super Key.`,

  dijkstra: `**Dijkstra's Algorithm (Single Source Shortest Path):**

Time Complexity: $O((V + E) \\log V)$ using Min-Priority Queue.

\`\`\`python
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        current_dist, current_node = heapq.heappop(pq)
        
        if current_dist > distances[current_node]:
            continue
            
        for neighbor, weight in graph[current_node].items():
            distance = current_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
                
    return distances
\`\`\``,

  cie: `**R23 Regulation Internal Assessment (CIE - 30 Marks):**

1. **Midterm Examinations (20 Marks)**: Best 1 out of 2 Mids (or weighted average as per university circular).
2. **Assignments & Quiz (5 Marks)**: 2 Technical assignments per semester.
3. **Attendance & Active Participation (5 Marks)**:
   - $\\ge 90\\%$: 5 Marks
   - $85\\% - 89\\%$: 4 Marks
   - $80\\% - 84\\%$: 3 Marks
   - $75\\% - 79\\%$: 2 Marks`
};

export default function AIChatBot({ 
  isDarkMode = true, 
  userSession = null,
  embedded = false,
  externalQuery = null,
  onClearExternalQuery = null
}) {
  const [isOpen, setIsOpen] = useState(embedded);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('r23_gemini_api_key') || '');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [inputKey, setInputKey] = useState('');
  
  const [customTraining, setCustomTraining] = useState(() => localStorage.getItem('r23_custom_bot_training') || '');
  const [showTrainModal, setShowTrainModal] = useState(false);
  const [inputTraining, setInputTraining] = useState('');

  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Hello ${userSession?.name || 'Student'}! 👋 I am your **SkillStack AI Academic Tutor**.\n\nI am pre-trained on your **R23 B.Tech CSE (AI & DS)** curriculum (Data Structures, DBMS, Java, Python, SGPA rules). What would you like to study or train today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      domain: 'all'
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isSpeakingId, setIsSpeakingId] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  // Handle external queries (e.g. from syllabus "Ask AI Tutor" button)
  useEffect(() => {
    if (externalQuery) {
      setIsOpen(true);
      handleSendMessage(externalQuery);
      if (onClearExternalQuery) onClearExternalQuery();
    }
  }, [externalQuery]);

  // Save API key
  const handleSaveApiKey = () => {
    const trimmed = inputKey.trim();
    setApiKey(trimmed);
    localStorage.setItem('r23_gemini_api_key', trimmed);
    setShowKeyModal(false);
  };

  // Remove API key
  const handleRemoveApiKey = () => {
    setApiKey('');
    localStorage.removeItem('r23_gemini_api_key');
    setShowKeyModal(false);
  };

  // Save Custom Bot Training
  const handleSaveCustomTraining = () => {
    const trimmed = inputTraining.trim();
    setCustomTraining(trimmed);
    localStorage.setItem('r23_custom_bot_training', trimmed);
    setShowTrainModal(false);
    
    setMessages(prev => [
      ...prev,
      {
        id: `trained-${Date.now()}`,
        sender: 'ai',
        text: `🎓 **Bot Knowledge Base Updated!**\n\nI have successfully absorbed your custom training instructions and notes:\n\n> *"${trimmed.slice(0, 140)}${trimmed.length > 140 ? '...' : ''}"*\n\nAsk me anything based on this updated knowledge!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        domain: 'all'
      }
    ]);
  };

  // Speech synthesis (Text-to-speech)
  const toggleSpeech = (msgId, text) => {
    if (!('speechSynthesis' in window)) return;
    
    if (isSpeakingId === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown formatting for cleaner speech
    const cleanText = text.replace(/[*#`$\-_]/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeakingId(null);
    utterance.onerror = () => setIsSpeakingId(null);
    
    setIsSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Copy text to clipboard
  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Generate fallback answer if Gemini key not configured or offline
  const generateFallbackResponse = (query, domain) => {
    const q = query.trim().toLowerCase();
    
    // 1. Warm Conversational Greetings & Chit-Chat
    if (/^(hi|hello|hey|heyy|heyyy|yo|namaste|good morning|good afternoon|good evening|hallo)\b/i.test(q)) {
      return `Hello ${userSession?.name || 'there'}! 👋 I'm so glad you reached out!\n\nI'm your **SkillStack AI Tutor**. How are your studies going today? You can ask me any doubt in **Data Structures**, **DBMS**, **Python**, **R23 SGPA rules**, or paste a piece of code you want to debug together!`;
    }

    if (/^(who are you|what can you do|help|what is this|about|who created you)\b/i.test(q)) {
      return `Hey! I'm your dedicated **AI Academic Tutor** for Narayana Engineering College (Department of CSE - AI & DS)! 🎓\n\nThink of me as your study partner. Here is what we can work on together:\n- 🌲 **Data Structures**: Stacks, Queues, Binary Trees, AVL Rotations, Graphs, BFS/DFS, Dijkstra.\n- 🗄️ **DBMS & SQL**: 1NF to BCNF Normalization, Joins, Indexing, Transactions & ACID properties.\n- 🐍 **Python**: Lambdas, List Comprehensions, OOPs, Exception handling.\n- 📊 **R23 Regulations**: Calculating your SGPA/CGPA, CIE internal marks, SEE pass marks.\n- 💻 **Code Debugging**: Paste your C++/Python/SQL code and we'll fix errors together!\n\nWhat doubt is on your mind right now?`;
    }

    if (/\b(thanks|thank you|thx|ty|awesome|great|cool|perfect|got it|understood)\b/i.test(q)) {
      return `You're very welcome! 😊 You're doing great. Never hesitate to ask if another question comes up during your prep!`;
    }

    if (/\b(bye|goodbye|cya|see you)\b/i.test(q)) {
      return `Take care and happy studying! 👋 You've got this for your R23 semester exams!`;
    }

    // 2. Specific Academic Topics (Warm Human Explanations for R23 Syllabus)
    if (q.includes('sgpa') || q.includes('gpa') || q.includes('formula') || q.includes('grading')) {
      return `Hey! Calculating your **R23 SGPA** is actually super straightforward once you know the step! 📊

Here is the exact formula used by JNTU:

$$\\text{SGPA} = \\frac{\\sum (\\text{Course Credits} \\times \\text{Grade Point})}{\\text{Total Credits}}$$

**Grade Points Scale:**
- **O (Outstanding):** 10 GP (90-100%)
- **A+ (Excellent):** 9 GP (80-89%)
- **A (Very Good):** 8 GP (70-79%)
- **B+ (Good):** 60-69% (7 GP)
- **B (Above Average):** 50-59% (6 GP)
- **C (Pass):** 40-49% (5 GP)
- **F (Fail):** <40% (0 GP)

⚠️ *Quick tip: You need at least 28 out of 70 marks (40%) in the written SEE end-exam to pass a theory subject!*

Would you like me to help you calculate your exact SGPA for this semester's subjects?`;
    }

    if (q.includes('stack') || q.includes('queue') || q.includes('infix') || q.includes('postfix')) {
      return `**Stacks & Queues (R23-CS301 Unit I)** are fundamental linear data structures! 📚

- **Stack (LIFO - Last In First Out)**: Like a stack of plates. You \`push()\` at the top and \`pop()\` from the top. Used in function calls, recursion, and **Infix to Postfix** conversion.
- **Queue (FIFO - First In First Out)**: Like a ticket queue. You \`enqueue()\` at the rear and \`dequeue()\` from the front. Used in CPU scheduling and BFS traversals.

Here is a clean Stack implementation snippet in C:
\`\`\`c
void push(int val) {
    if (top >= MAX - 1) { printf("Stack Overflow\\n"); return; }
    stack[++top] = val;
}
int pop() {
    if (top < 0) { printf("Stack Underflow\\n"); return -1; }
    return stack[top--];
}
\`\`\`

Would you like me to show the step-by-step algorithm for converting an Infix expression like \`(A + B) * C\` to Postfix?`;
    }

    if (q.includes('avl') || q.includes('rotation') || q.includes('tree rotation')) {
      return `Ah, **AVL Tree Rotations**! This is a classic topic in **Data Structures (R23-CS301 Unit II)**. 🌲

An **AVL tree** is a Self-Balancing Binary Search Tree. Every node maintains a **Balance Factor ($BF$)**:

$$\\text{Balance Factor} = \\text{Height(Left Subtree)} - \\text{Height(Right Subtree)}$$

As long as $BF \\in \\{-1, 0, +1\\}$, the tree is balanced. If an insertion makes $BF = +2$ or $-2$, we perform a rotation:

1. **LL Rotation (Single Right)**: Insertion in Left child's Left subtree.
2. **RR Rotation (Single Left)**: Insertion in Right child's Right subtree.
3. **LR Rotation (Double)**: Left rotation on Left child $\\rightarrow$ Right rotation on root.
4. **RL Rotation (Double)**: Right rotation on Right child $\\rightarrow$ Left rotation on root.

\`\`\`cpp
Node* rotateRight(Node* y) {
    Node* x = y->left;
    Node* T2 = x->right;
    x->right = y;
    y->left = T2;
    return x;
}
\`\`\`

Would you like me to solve a step-by-step numerical example for your exam prep?`;
    }

    if (q.includes('java') || q.includes('jvm') || q.includes('oop') || q.includes('interface') || q.includes('inheritance')) {
      return `**OOP through Java (R23-CS302)** is built around 4 Core Pillars! ☕

1. **Encapsulation**: Binding data fields and methods into a single unit (class) with 'private' access specifiers and getters/setters.
2. **Inheritance**: Deriving child classes from a parent class using 'extends' keyword. Reuses code and establishes an "IS-A" relationship.
3. **Polymorphism**:
   - **Compile-time**: Method Overloading (same method name, different parameter signature).
   - **Runtime**: Method Overriding & Dynamic Method Dispatch.
4. **Abstraction**: Hiding internal implementation using 'abstract' classes and 'interface' definitions.

Here is how multiple inheritance is achieved safely using Interfaces in Java:
\`\`\`java
interface Printable { void print(); }
interface Showable { void show(); }

class Document implements Printable, Showable {
    public void print() { System.out.println("Printing..."); }
    public void show() { System.out.println("Showing..."); }
}
\`\`\`

Which Java topic (Multithreading, Collections Framework, Exception Handling) would you like to review next?`;
    }

    if (q.includes('1nf') || q.includes('2nf') || q.includes('3nf') || q.includes('bcnf') || q.includes('normaliz')) {
      return `Great question! **Database Normalization (R23-CS303 Unit II)** is all about organizing tables to eliminate data redundancy and update anomalies. 🗄️

Here is how to remember the forms easily for JNTU written exams:

- **1NF (First Normal Form)**: Every table column must contain single atomic values (no repeating comma-separated lists).
- **2NF (Second Normal Form)**: Must be in 1NF + **No Partial Dependency**. Every non-key attribute must depend fully on the primary key.
- **3NF (Third Normal Form)**: Must be in 2NF + **No Transitive Dependency**. If $A \\rightarrow B$ and $B \\rightarrow C$, then $C$ must not depend indirectly on $A$.
- **BCNF (Boyce-Codd Normal Form)**: For every functional dependency $X \\rightarrow Y$, $X$ MUST be a Super Key!

Would you like a table decomposition example to write in your exam answer sheet?`;
    }

    if (q.includes('sql') || q.includes('join') || q.includes('acid') || q.includes('transaction')) {
      return `**DBMS Transactions & SQL Queries (R23-CS303 Unit III)** follow the **ACID Properties**! ⚡

- **Atomicity**: All operations in a transaction succeed completely, or all roll back (All-or-Nothing).
- **Consistency**: Database transitions from one valid state to another valid state.
- **Isolation**: Concurrent transactions execute without interfering with each other (2PL locking).
- **Durability**: Once committed, changes persist even during a power outage or server crash.

Here is a standard SQL Inner Join & Grouping query:
\`\`\`sql
SELECT d.dept_name, COUNT(e.emp_id) AS total_employees
FROM Department d
INNER JOIN Employee e ON d.dept_id = e.dept_id
GROUP BY d.dept_name
HAVING COUNT(e.emp_id) > 5;
\`\`\`

Would you like me to explain Shared Locks (S-Lock) vs Exclusive Locks (X-Lock) in 2PL concurrency control?`;
    }

    if (q.includes('dijkstra') || q.includes('shortest path') || q.includes('graph algo')) {
      return `**Dijkstra's Algorithm (R23-CS301 Unit III)** is how navigation systems find the shortest route between vertices! 🗺️

**Intuitive Steps:**
1. Set source node distance to $0$, and all other nodes to infinity ($\\infty$).
2. Use a **Min-Priority Queue** to pick the unvisited node $u$ with smallest known distance.
3. For each neighbor $v$ of $u$, perform edge relaxation:
   $$\\text{If } \\text{dist}[u] + \\text{weight}(u,v) < \\text{dist}[v] \\implies \\text{dist}[v] = \\text{dist}[u] + \\text{weight}(u,v)$$
4. Repeat until all reachable nodes are processed.

Time Complexity: $O((V + E) \\log V)$ using Min-Heap.

\`\`\`python
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        current_dist, u = heapq.heappop(pq)
        if current_dist > distances[u]: continue
        
        for v, weight in graph[u].items():
            if current_dist + weight < distances[v]:
                distances[v] = current_dist + weight
                heapq.heappush(pq, (distances[v], v))
                
    return distances
\`\`\`

Need help tracing a graph diagram with vertices and weights?`;
    }

    if (q.includes('sort') || q.includes('quick sort') || q.includes('merge sort') || q.includes('bubble sort')) {
      return `**Sorting Algorithms & Time Complexities (R23-CS301 Unit V)**: ⏱️

- **Quick Sort**: Divide & Conquer using a **Pivot Element** (Partitioning). Average: $O(N \\log N)$, Worst: $O(N^2)$ when array is already sorted.
- **Merge Sort**: Stable Divide & Conquer. Always splits array in half, merges sorted sub-arrays. Time Complexity: $O(N \\log N)$ in all cases! Space: $O(N)$.
- **Heap Sort**: Uses a Max-Heap array representation. Time Complexity: $O(N \\log N)$, Space: $O(1)$ in-place!
- **Bubble / Insertion / Selection Sort**: Simple $O(N^2)$ comparison algorithms.

Here is Python Quick Sort partitioning:
\`\`\`python
def quicksort(arr):
    if len(arr) <= 1: return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
\`\`\`

Which sorting algorithm analysis would you like to explore further?`;
    }

    if (q.includes('python') || q.includes('lambda') || q.includes('list comprehension') || q.includes('dictionary')) {
      return `**Python Programming & Algorithms (R23-CS304)** emphasizes expressive, clean code! 🐍

- **List Comprehensions**: Concise syntax to create lists:
  'evens = [x for x in range(20) if x % 2 == 0]'
- **Lambda Functions**: Anonymous single-line functions:
  'square = lambda x: x ** 2'
- **File Handling Context Managers**: Automatically closes files even if errors occur:
  \`\`\`python
  with open('notes.txt', 'r') as file:
      content = file.read()
  \`\`\`

Would you like me to explain Python generator expressions vs list comprehensions for memory optimization?`;
    }

    if (/\b(any\s*thing\s*new|anything\s*new|what'?s\s*new|updates?|news)\b/i.test(q)) {
      return `Here is what's new in your **SkillStack R23 Autonomous Portal**! 🚀

1. 📚 **Course Book Library**: Access official R23 B.Tech CSE textbooks & unit notes for Data Structures, Java, DBMS & Python.
2. 💻 **Multi-Language Coding Labs**: Solve coding exam problems with strict automated testcase execution in C, C++, Java, Python, SQL, Go & TypeScript.
3. 📝 **Task Portal**: View and complete active assignments with instant status verification.
4. ✨ **Custom AI Tutor Training**: Click the **Train Bot ✨** button at the top of this chat window to give me custom notes, rules, or instructions!

What would you like to check out or study today?`;
    }

    if (/\b(how\s*are\s*you|how\s*r\s*u|what'?s\s*up|wassup)\b/i.test(q)) {
      return `I'm doing great and super excited to help you with your studies! 😊 How is your R23 semester preparation going? Feel free to ask any doubt in Data Structures, DBMS, Java, Python, or exam grading rules!`;
    }

    if (q.includes('cie') || q.includes('internal') || q.includes('mid') || q.includes('marks')) {
      return `Here is how the **R23 Internal Assessment (CIE - 30 Marks)** is calculated: 📝

1. **Midterm Examinations (20 Marks)**: Best 1 out of 2 Mid exams (or weighted average as per university circular).
2. **Assignments & Technical Quizzes (5 Marks)**: 2 Technical assignments.
3. **Attendance (5 Marks)**:
   - $\\ge 90\\%$: 5 Marks
   - $85\\% - 89\\%$: 4 Marks
   - $80\\% - 84\\%$: 3 Marks
   - $75\\% - 79\\%$: 2 Marks

*Note: Minimum 75% attendance is required to write the semester end SEE examinations!*`;
    }
    
    // 3. Conversational Human Fallback for Any Custom Doubt
    return `That's a great question about **"${query}"**! Let me break it down for you. 😊

In **${SUBJECT_DOMAINS.find(d => d.id === domain)?.name || 'CSE (AI & DS)'}**, mastering this helps build a strong foundation for both semester exams and coding interviews.

Here is the best approach to study it:
1. **Core Concept**: Understand the underlying principle, definitions, and why it matters in real-world software.
2. **Step-by-Step Logic**: Break the process down into simple modular components or pseudocode.
3. **Exam Tip**: For JNTU R23 written papers, write a clear definition, draw a block diagram, and list key time/space complexities to score full marks!

Would you like me to explain a specific algorithm, code snippet, or numerical example related to this?`;
  };

  // Call Express API /api/chat or Gemini API or fallback
  const fetchAIResponse = async (userQuery, domain) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
    // 1. Try Express Backend /api/chat
    try {
      const serverRes = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userQuery, domain, apiKey, customTraining })
      });
      if (serverRes.ok) {
        const data = await serverRes.json();
        if (data && data.reply) return data.reply;
      }
    } catch (err) {
      console.warn('Backend server /api/chat unavailable, checking direct client API key...');
    }

    // 2. Try Direct Client Gemini API if key exists
    if (apiKey) {
      try {
        const systemPromptText = `You are SkillStack AI, a warm, engaging, and highly versatile personal AI academic tutor for Narayana Engineering College (R23 B.Tech CSE AI & DS).
        
Core Behavioral Guidelines:
1. Natural Human Conversation: Engaged, helpful, and thorough in academic problem solving.
2. Formats: Use clean markdown, LaTeX math where applicable ($...$), code snippets, and structured bullet points.
3. R23 Syllabus Trained: Expert in Data Structures (CS301), Java OOP (CS302), DBMS (CS303), Python (CS304), and R23 SGPA/CIE/SEE grading.

${customTraining ? `CUSTOM USER TRAINING INSTRUCTIONS:\n${customTraining}\n` : ''}`;

        const chatSystemInstruction = {
          role: "system",
          content: systemPromptText
        };

        const chatModelParameters = {
          temperature: 0.75,
          topP: 0.9,
          maxOutputTokens: 1024
        };

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: chatSystemInstruction.content }]
            },
            contents: [
              {
                role: 'user',
                parts: [{ text: `Subject Context: ${selectedDomain || 'General'}\nUser Question: ${userQuery}` }]
              }
            ],
            generationConfig: chatModelParameters
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) return reply;
        }
      } catch (err) {
        console.warn('Direct Gemini API fetch error, using human fallback engine:', err);
      }
    }
    
    // 3. Human Fallback Engine
    await new Promise(res => setTimeout(res, 600));
    return generateFallbackResponse(userQuery, domain);
  };

  // Handle send message
  const handleSendMessage = async (textToSend = null) => {
    const query = (textToSend || inputText).trim();
    if (!query || isTyping) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      domain: selectedDomain
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    const aiReplyText = await fetchAIResponse(query, selectedDomain);

    const aiMsg = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: aiReplyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      domain: selectedDomain
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: `Chat history cleared. How can I assist you with your R23 CSE coursework?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        domain: 'all'
      }
    ]);
  };

  // Formatted markdown text renderer with simple code block extraction
  const renderMessageContent = (text) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
      }
      parts.push({ type: 'code', lang: match[1] || 'code', content: match[2].trim() });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.substring(lastIndex) });
    }

    return (
      <div className="space-y-2 text-xs md:text-sm leading-relaxed">
        {parts.map((part, idx) => {
          if (part.type === 'code') {
            return (
              <div key={idx} className="my-3 rounded-xl overflow-hidden border border-white/10 shadow-md">
                <div className="bg-slate-900 px-3 py-1.5 flex justify-between items-center text-[11px] font-mono text-slate-400 border-b border-white/10">
                  <span className="uppercase font-bold text-cyan-400">{part.lang}</span>
                  <button
                    onClick={() => handleCopy(`code-${idx}`, part.content)}
                    className="flex items-center space-x-1 text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    {copiedId === `code-${idx}` ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                    <span>{copiedId === `code-${idx}` ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-[#0b101d] text-cyan-100 font-mono text-xs overflow-x-auto">
                  <code>{part.content}</code>
                </pre>
              </div>
            );
          }

          // Format basic inline bolding and paragraphs
          const lines = part.content.split('\n');
          return (
            <div key={idx} className="space-y-1.5">
              {lines.map((line, lineIdx) => {
                if (!line.trim()) return <div key={lineIdx} className="h-1" />;
                
                // Header style
                if (line.startsWith('### ') || line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <p key={lineIdx} className="font-bold text-cyan-300 dark:text-cyan-300 mt-2">
                      {line.replace(/^###\s*/, '').replace(/\*\*/g, '')}
                    </p>
                  );
                }

                // Bullet points
                if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                  return (
                    <div key={lineIdx} className="flex items-start space-x-2 pl-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>{line.replace(/^[\-\*]\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}</span>
                    </div>
                  );
                }

                return <p key={lineIdx}>{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
              })}
            </div>
          );
        })}
      </div>
    );
  };

  // Main UI Chat Window Content
  const chatUI = (
    <div className={`flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300 ${
      isDarkMode 
        ? 'bg-[#090d16]/95 border-white/15 text-slate-100 shadow-2xl backdrop-blur-2xl' 
        : 'bg-white border-slate-200 text-slate-800 shadow-xl'
    }`}>
      
      {/* Header */}
      <div className={`p-4 flex items-center justify-between border-b ${
        isDarkMode 
          ? 'bg-[#0e1424] border-white/10' 
          : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-slate-200'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 animate-pulse-slow">
              <Bot size={20} />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#090d16] rounded-full" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-sm md:text-base tracking-tight">SkillStack AI Tutor</h3>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-semibold ${
                apiKey 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
              }`}>
                {apiKey ? 'Live Gemini' : 'R23 Academic Engine'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Department of CSE (AI & DS) • 24/7 Doubt Clearing</p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          {/* Train Bot Button */}
          <button
            onClick={() => {
              setInputTraining(customTraining);
              setShowTrainModal(true);
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1 border ${
              customTraining 
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30' 
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
            title="Train Bot Knowledge Base & Custom Instructions"
          >
            <Sparkles size={14} className="text-cyan-400" />
            <span>{customTraining ? 'Trained ✨' : 'Train Bot'}</span>
          </button>

          {/* Key Settings Button */}
          <button
            onClick={() => {
              setInputKey(apiKey);
              setShowKeyModal(true);
            }}
            className={`p-2 rounded-xl transition cursor-pointer ${
              apiKey 
                ? 'text-amber-400 hover:bg-amber-500/10' 
                : 'text-slate-400 hover:bg-white/10'
            }`}
            title="Configure Gemini API Key"
          >
            <Key size={16} />
          </button>

          {/* Clear Chat */}
          <button
            onClick={handleClearHistory}
            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-white/10 transition cursor-pointer"
            title="Clear Chat History"
          >
            <Trash2 size={16} />
          </button>

          {!embedded && (
            <>
              {/* Expand / Minimize */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden md:block p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title={isExpanded ? "Collapse view" : "Expand full screen"}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>

              {/* Close Floating Widget */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Close AI Assistant"
              >
                <X size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Domain Focus Bar */}
      <div className={`px-4 py-2.5 flex items-center space-x-2 overflow-x-auto border-b no-scrollbar ${
        isDarkMode ? 'bg-[#060912]/80 border-white/5' : 'bg-slate-50 border-slate-100'
      }`}>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex-shrink-0 flex items-center space-x-1">
          <Sparkles size={11} className="text-cyan-400" />
          <span>Subject Focus:</span>
        </span>
        {SUBJECT_DOMAINS.map(domain => {
          const Icon = domain.icon;
          const isSelected = selectedDomain === domain.id;
          return (
            <button
              key={domain.id}
              onClick={() => setSelectedDomain(domain.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center space-x-1.5 border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-400 shadow-sm shadow-blue-500/30 scale-102'
                  : isDarkMode
                    ? 'bg-slate-900/80 text-slate-400 border-white/10 hover:border-slate-700 hover:text-slate-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Icon size={12} />
              <span>{domain.name}</span>
            </button>
          );
        })}
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${isAI ? 'justify-start' : 'justify-end'}`}
            >
              {isAI && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-md">
                  <Bot size={15} />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-md relative group transition ${
                isAI
                  ? isDarkMode
                    ? 'bg-[#101728] border border-white/10 text-slate-100'
                    : 'bg-slate-100 border border-slate-200 text-slate-800'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-xs'
              }`}>
                {renderMessageContent(msg.text)}

                {/* Footer bar of message */}
                <div className={`mt-2.5 pt-2 flex items-center justify-between border-t text-[10px] ${
                  isAI
                    ? isDarkMode ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'
                    : 'border-white/20 text-blue-100'
                }`}>
                  <span className="font-mono">{msg.timestamp}</span>

                  <div className="flex items-center space-x-2">
                    {isAI && (
                      <>
                        <button
                          onClick={() => toggleSpeech(msg.id, msg.text)}
                          className={`hover:text-cyan-400 transition cursor-pointer flex items-center space-x-1 ${
                            isSpeakingId === msg.id ? 'text-cyan-400 animate-pulse font-bold' : ''
                          }`}
                          title="Read Aloud"
                        >
                          {isSpeakingId === msg.id ? <VolumeX size={13} /> : <Volume2 size={13} />}
                          <span className="hidden sm:inline">{isSpeakingId === msg.id ? 'Stop' : 'Listen'}</span>
                        </button>

                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="hover:text-cyan-400 transition cursor-pointer flex items-center space-x-1"
                          title="Copy Answer"
                        >
                          {copiedId === msg.id ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                          <span className="hidden sm:inline">{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {!isAI && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-md font-bold text-xs">
                  {userSession?.name ? userSession.name.charAt(0).toUpperCase() : <User size={15} />}
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
              <Bot size={15} />
            </div>
            <div className={`p-3 rounded-2xl border flex items-center space-x-1.5 ${
              isDarkMode ? 'bg-[#101728] border-white/10 text-cyan-400' : 'bg-slate-100 border-slate-200 text-blue-600'
            }`}>
              <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-xs font-mono font-medium ml-1">Analyzing R23 syllabus database...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Dynamic Preset Prompt Chips */}
      <div className={`p-3 border-t overflow-x-auto no-scrollbar space-y-1.5 ${
        isDarkMode ? 'bg-[#060912] border-white/10' : 'bg-slate-50 border-slate-200'
      }`}>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
          <Lightbulb size={11} className="text-amber-400" />
          <span>Quick Doubts (Click to Ask):</span>
        </p>
        <div className="flex items-center space-x-2">
          {(DOMAIN_PROMPTS[selectedDomain] || DOMAIN_PROMPTS.all).map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap border transition cursor-pointer flex items-center space-x-1 ${
                isDarkMode
                  ? 'bg-slate-900/90 text-slate-300 border-white/10 hover:border-cyan-400/50 hover:text-white hover:bg-slate-800'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50'
              }`}
            >
              <span>{prompt}</span>
              <ChevronRight size={12} className="text-slate-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className={`p-3 border-t flex items-center space-x-2 ${
          isDarkMode ? 'bg-[#090d16] border-white/10' : 'bg-white border-slate-200'
        }`}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Ask a doubt in ${SUBJECT_DOMAINS.find(d => d.id === selectedDomain)?.name}...`}
          className={`flex-1 rounded-xl px-4 py-2.5 text-xs md:text-sm transition focus:outline-none ${
            isDarkMode 
              ? 'bg-slate-950/80 border border-white/15 text-white placeholder-slate-500 focus:border-cyan-400' 
              : 'bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 focus:border-blue-500'
          }`}
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className={`p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold transition shadow-md flex items-center justify-center cursor-pointer ${
            !inputText.trim() || isTyping ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/30'
          }`}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );

  // Gemini API Key Modal
  const apiKeyModal = showKeyModal && (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`max-w-md w-full rounded-2xl p-6 border shadow-2xl space-y-4 ${
        isDarkMode ? 'bg-[#0b101d] border-white/15 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Key size={18} />
            </div>
            <h3 className="font-extrabold text-base">Gemini API Key Settings</h3>
          </div>
          <button onClick={() => setShowKeyModal(false)} className="text-slate-400 hover:text-white transition">
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Enter your personal **Google Gemini API Key** for real-time generative responses. If left empty, SkillStack will use the built-in **R23 Academic Knowledge Engine**.
        </p>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Gemini API Key (AI Studio):</label>
          <input
            type="password"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="AIzaSy..."
            className={`w-full rounded-xl px-3.5 py-2 text-xs font-mono border ${
              isDarkMode ? 'bg-slate-950 border-white/20 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
            }`}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {apiKey ? (
            <button
              onClick={handleRemoveApiKey}
              className="text-xs font-semibold text-red-400 hover:text-red-300 transition cursor-pointer"
            >
              Remove Stored Key
            </button>
          ) : <span />}

          <div className="flex space-x-2">
            <button
              onClick={() => setShowKeyModal(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-white/10 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveApiKey}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition cursor-pointer shadow-md"
            >
              Save Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Custom Bot Training Modal Overlay
  const trainBotModal = showTrainModal && (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className={`w-full max-w-lg rounded-2xl p-6 space-y-4 border shadow-2xl ${
        isDarkMode ? 'bg-[#0e1424] border-white/20 text-white' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <div className="flex justify-between items-center border-b pb-3 border-white/10">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-sm md:text-base">Train SkillStack AI Tutor</h3>
          </div>
          <button onClick={() => setShowTrainModal(false)} className="text-slate-400 hover:text-white transition">
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Provide **custom subject notes, exam guidelines, or specific instructions** to train your AI tutor. The bot will automatically incorporate these instructions into all its answers!
        </p>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Custom Training Instructions & Subject Notes:</label>
          <textarea
            rows={6}
            value={inputTraining}
            onChange={(e) => setInputTraining(e.target.value)}
            placeholder="e.g. Always answer Data Structures questions with time complexities. Focus on JNTU R23 10-mark long answers format with diagram steps..."
            className={`w-full rounded-xl p-3 text-xs font-mono border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              isDarkMode ? 'bg-slate-950 border-white/20 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
            }`}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {customTraining ? (
            <button
              onClick={() => {
                setCustomTraining('');
                setInputTraining('');
                localStorage.removeItem('r23_custom_bot_training');
                setShowTrainModal(false);
              }}
              className="text-xs font-semibold text-red-400 hover:text-red-300 transition cursor-pointer"
            >
              Reset Custom Training
            </button>
          ) : <span />}

          <div className="flex space-x-2">
            <button
              onClick={() => setShowTrainModal(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-white/10 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCustomTraining}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition cursor-pointer shadow-md flex items-center space-x-1"
            >
              <Sparkles size={13} />
              <span>Train Bot</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // If embedded mode in main section
  if (embedded) {
    return (
      <div className="w-full h-[650px] my-6">
        {chatUI}
        {apiKeyModal}
        {trainBotModal}
      </div>
    );
  }

  // Floating Widget Mode
  return (
    <>
      {/* Floating launcher trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-[#8458B3] via-[#8458B3] to-[#494D5F] text-white shadow-2xl hover:scale-108 transition-all duration-300 flex items-center space-x-3 group cursor-pointer border border-[#D0BDF4] shadow-purple-500/30"
          title="Open AI Doubt Assistant"
        >
          <div className="relative">
            <Bot size={24} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#A0D2EB] rounded-full border-2 border-[#494D5F] animate-ping" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-black tracking-wide leading-tight flex items-center space-x-1">
              <span>AI Doubt Tutor</span>
              <Sparkles size={12} className="text-[#A0D2EB]" />
            </p>
            <p className="text-[10px] text-[#D0BDF4] font-medium">Ask R23 Doubts 24/7</p>
          </div>
        </button>
      )}

      {/* Floating Popover Drawer Window */}
      {isOpen && (
        <div className={`fixed z-50 transition-all duration-300 ${
          isExpanded 
            ? 'inset-4 md:inset-10' 
            : 'bottom-4 right-4 md:bottom-6 md:right-6 w-[94vw] sm:w-[440px] h-[600px] max-h-[85vh]'
        }`}>
          {chatUI}
        </div>
      )}

      {apiKeyModal}
      {trainBotModal}
    </>
  );
}
