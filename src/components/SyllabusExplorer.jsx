import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Video, 
  UploadCloud, 
  Film, 
  Sparkles, 
  Bot, 
  Play,
  Clapperboard,
  ExternalLink,
  BookOpen,
  GraduationCap,
  Award,
  Layers,
  Clock,
  Sparkle,
  Search,
  SlidersHorizontal,
  Grid,
  List,
  Eye,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  User,
  Calendar,
  ArrowLeftRight
} from 'lucide-react';

export default function SyllabusExplorer({ 
  syllabusData = [], 
  searchQuery: propSearchQuery = '', 
  onWatchVideo,
  onAskAITutor,
  setSelectedSemester: propSetSelectedSemester,
  selectedSemester: propSelectedSemester,
  isDarkMode = false
}) {
  const [internalSelectedSemester, setInternalSelectedSemester] = useState('all');
  const selectedSemester = propSelectedSemester !== undefined ? propSelectedSemester : internalSelectedSemester;
  const setSelectedSemester = propSetSelectedSemester || setInternalSelectedSemester;

  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const activeSearchQuery = propSearchQuery || localSearchQuery;

  const [activeCourseId, setActiveCourseId] = useState(() => {
    return syllabusData.length > 0 ? syllabusData[0].id : 'subject-ds';
  });

  // Automatically open subject content directly when a subject code or search query is passed
  useEffect(() => {
    if (propSearchQuery && syllabusData.length > 0) {
      const query = propSearchQuery.toLowerCase().trim();
      const match = syllabusData.find(s => 
        s.code.toLowerCase() === query ||
        s.id.toLowerCase() === query ||
        s.name.toLowerCase() === query ||
        s.code.toLowerCase().includes(query) ||
        s.name.toLowerCase().includes(query)
      );
      if (match) {
        setActiveCourseId(match.id);
      }
    }
  }, [propSearchQuery, syllabusData]);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('enrolled'); // 'enrolled' | 'all' | '3' | '4'

  const [completedTopics, setCompletedTopics] = useState({});
  const [videoSources, setVideoSources] = useState({
    'R23-CS301-1': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'R23-CS301-2': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  });

  const [renderingManimId, setRenderingManimId] = useState(null);
  const [generatingUnitId, setGeneratingUnitId] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState(null);

  const [activeCertificate, setActiveCertificate] = useState(null);
  const [activeNotes, setActiveNotes] = useState(null);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Ribbons Confetti & Unit Completion Celebration States
  const [activeRibbons, setActiveRibbons] = useState([]);
  const [unitCompletionModal, setUnitCompletionModal] = useState(null);

  // Unit Expand / Accordion State (Units hidden by default until selected)
  const [expandedUnits, setExpandedUnits] = useState({});
  const [activeUnitNumber, setActiveUnitNumber] = useState(null);

  const getUnitCoverImage = (courseCode, unitNumber) => {
    if (courseCode === 'R23-CS302') return '/images/java_cover.jpg';
    if (courseCode === 'R23-CS303') return '/images/dbms_cover.jpg';
    if (courseCode === 'R23-CS304') return '/images/python_cover.jpg';
    return '/images/ds_cover.jpg';
  };

  const toggleUnitExpand = (unitId) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  const expandAllUnits = () => {
    if (!currentActiveCourse) return;
    const allExpanded = {};
    currentActiveCourse.units.forEach(unit => {
      const uId = `${currentActiveCourse.code}-${unit.unitNumber}`;
      allExpanded[uId] = true;
    });
    setExpandedUnits(allExpanded);
  };

  const collapseAllUnits = () => {
    setExpandedUnits({});
    setActiveUnitNumber(null);
  };


  // Dynamic 10-Page Oxford Textbook Notes Generator
  const generateOxfordNotes = (subjectCode, unitNumber, unitTitle, subjectName) => {
    const uNumStr = String(unitNumber || '1');
    const uTitleStr = unitTitle || `Unit ${uNumStr}`;
    const sCode = subjectCode || 'R23-CS301';
    const sName = subjectName || 'CSE (AI & DS)';

    return {
      subjectCode: sCode,
      unitNumber: `Unit ${uNumStr}`,
      topicTitle: `Oxford Reference Textbook: ${uTitleStr}`,
      sections: [
        {
          heading: `Page 1 of 10: Historical Context, Theoretical Foundations & Formal Definitions`,
          content: `According to Oxford Computer Science & Engineering Series (Reema Thareja & G. A. Vijayalakshmi Pai), ${uTitleStr} serves as a mandatory architectural foundation in ${sName}.\n\nTheoretical Framework:\n1. Formal Mathematical Specification: Defines domain sets, range mappings, operational invariants, and state consistency boundaries.\n2. Logical Data Abstraction: Decouples physical byte representation from user application interfaces.\n3. Historical Context: Evolved from early memory-constrained computing paradigms to high-throughput modern systems.`,
          diagram: `+-----------------------------------------------------------+
|                    SYSTEM APPLICATION LAYER               |
+-----------------------------------------------------------+
|  init()   |  insert()  |  delete()  |  lookup()  |  free()|
+-----------------------------------------------------------+
|                 ABSTRACT DATA TYPE (ADT) LAYER            |
+-----------------------------------------------------------+
| [0x7000] Root -> [0x7010] Data Node -> [0x7020] Null      |
+-----------------------------------------------------------+`,
          complexityTable: [
            { operation: 'ADT State Initialization', time: 'O(1)', space: 'O(1)' },
            { operation: 'Sequential Array Access', time: 'O(N)', space: 'O(1)' },
            { operation: 'Direct Pointer Dereference', time: 'O(1)', space: 'O(1)' }
          ],
          examQuestions: [
            `Explain the formal definition and architectural principles of ${uTitleStr} with a neat diagram.`,
            `Differentiate between physical memory storage representations and logical ADT interfaces.`
          ]
        },
        {
          heading: `Page 2 of 10: Architectural Memory Layouts & Byte-Level Alignment`,
          content: `Physical memory mapping, pointer arithmetic, spatial locality, and CPU cache-line optimization for ${uTitleStr}.\n\nMemory Allocation Strategies:\n- Contiguous Array Memory: Consecutive RAM addresses, maximum L1/L2 cache hit ratio.\n- Heap Node Pointers: Non-contiguous dynamic memory allocations connected via 64-bit pointers.\n- Padding & Alignment: 8-byte alignment rules prevent CPU bus cycle degradation.`,
          diagram: `Heap Allocation Map:
Address 0x7FFF00: [ Header: 8 bytes | Data: 32 bytes | Pointer: 8 bytes ]
Address 0x7FFF30: [ Header: 8 bytes | Data: 32 bytes | Pointer: 8 bytes ]`,
          complexityTable: [
            { operation: 'Contiguous Memory Allocation', time: 'O(1)', space: 'O(N)' },
            { operation: 'Dynamic Heap Node Allocation', time: 'O(1)', space: 'O(N)' }
          ],
          code: `// Low-Level Memory Alignment Specification in C
struct __attribute__((__packed__)) AlignedNode {
    unsigned int id;
    void* payload_ptr;
    struct AlignedNode* next;
};`,
          examQuestions: [
            `Analyze the impact of CPU cache-line alignment on ${uTitleStr} memory access performance.`,
            `Write C code demonstrating packed memory structure alignment for custom data types.`
          ]
        },
        {
          heading: `Page 3 of 10: Fundamental Operational Primitives & State Invariants`,
          content: `Formal operational semantics (Insertion, Deletion, Searching, Traversals) and state invariant preservation during runtime updates for ${uTitleStr}.\n\nOperational Specifications:\n1. Insertion Protocol: Validates preconditions, allocates memory, updates boundary pointers, verifies invariant balance.\n2. Deletion Protocol: Locates target node, handles child/adjacent references, executes free(), rebalances structure.\n3. Traversal Protocol: Deterministic visiting order (Preorder, Inorder, Postorder, Breadth-First).`,
          diagram: `State Invariant Verification:
(Pre-State Invariant) ---> [ Execute Primitives ] ---> (Post-State Invariant Validated)`,
          complexityTable: [
            { operation: 'Primitive Insertion', time: 'O(1) to O(log N)', space: 'O(1)' },
            { operation: 'Primitive Deletion', time: 'O(1) to O(log N)', space: 'O(1)' },
            { operation: 'Full Structure Traversal', time: 'O(N)', space: 'O(N)' }
          ],
          examQuestions: [
            `Describe the step-by-step state transition during insertion in ${uTitleStr}.`,
            `Explain how invariant preservation prevents corrupted references during structural mutation.`
          ]
        },
        {
          heading: `Page 4 of 10: Asymptotic Time & Auxiliary Space Complexity Analysis`,
          content: `Mathematical proof of asymptotic time boundaries (Big-O, Big-Omega, Big-Theta) and auxiliary stack/heap space consumption for ${uTitleStr}.\n\nComplexity Derivations:\n- Recurrence Relation: T(N) = aT(N/b) + f(N) analyzed via the Master Theorem.\n- Best Case Ω(1): Optimal branch execution with zero collision or zero search iterations.\n- Average Case Θ(log N): Uniform random distribution across binary search trees / heap hierarchies.\n- Worst Case O(N): Degenerate linear chain formation when data is pre-sorted.`,
          complexityTable: [
            { operation: 'Search Primitive (Best)', time: 'O(1)', space: 'O(1)' },
            { operation: 'Search Primitive (Average)', time: 'O(log N)', space: 'O(1)' },
            { operation: 'Search Primitive (Worst)', time: 'O(N)', space: 'O(N)' },
            { operation: 'Space Complexity (Auxiliary Call Stack)', time: 'O(H)', space: 'O(H)' }
          ],
          examQuestions: [
            `Derive the recurrence relation T(N) = 2T(N/2) + O(N) using the Master Theorem for ${uTitleStr}.`,
            `Compare time and space complexities across Best, Average, and Worst execution scenarios.`
          ]
        },
        {
          heading: `Page 5 of 10: Edge-Case Engineering, Exception Handling & Memory Safety`,
          content: `Handling system edge cases: NULL pointer dereferencing, buffer overflows, stack underflow conditions, memory fragmentation, and concurrent locks for ${uTitleStr}.\n\nSafety Guardrails:\n1. Boundary Guarding: Pre-checking pointer validity before dereferencing.\n2. Stack Overflow Protection: Dynamic stack resizing or iteration fallback for deep recursions.\n3. Concurrency Synchronization: Reader-Writer mutex locks prevent race conditions in multi-threaded environments.`,
          diagram: `Guard Condition Flowchart:
[ Input Signal ] ---> { Pointer == NULL? }
                           |-- Yes --> [ Throw NullPointerException ]
                           |-- No  --> [ Execute Memory Operation ]`,
          code: `// Safe Memory Access & Boundary Check in C
void* safe_access(void* base_ptr, size_t offset, size_t max_size) {
    if (!base_ptr || offset >= max_size) {
        fprintf(stderr, "Boundary Fault Violation at Offset %zu\\n", offset);
        return NULL;
    }
    return (char*)base_ptr + offset;
}`,
          examQuestions: [
            `Discuss common runtime exception risks in ${uTitleStr} implementations and how to mitigate them.`,
            `Explain how double-checked locking mechanisms ensure thread safety in concurrent memory operations.`
          ]
        },
        {
          heading: `Page 6 of 10: Comparative Benchmarks & Engineering Trade-Off Matrix`,
          content: `Comparative evaluation between ${uTitleStr} and alternative computing structures (Arrays, Linked Lists, Trees, Hash Tables, B-Trees).\n\nTrade-Off Matrix:\n- Memory Overhead: High pointer overhead vs contiguous space compactness.\n- Lookup Efficiency: O(1) Hash Table vs O(log N) Balanced Tree vs O(N) Unsorted List.\n- Cache Performance: Contiguous memory wins on CPU vectorization, whereas node pointers cause TLB cache misses.`,
          complexityTable: [
            { operation: 'Contiguous Array', time: 'Lookup O(1) | Insert O(N)', space: 'Compact' },
            { operation: 'Singly Linked List', time: 'Lookup O(N) | Insert O(1)', space: '1 Pointer/Node' },
            { operation: 'Balanced BST (AVL)', time: 'Lookup O(log N) | Insert O(log N)', space: '2 Pointers/Node' },
            { operation: 'Hash Table (Chaining)', time: 'Lookup O(1) | Insert O(1)', space: 'High Bucket Overhead' }
          ],
          examQuestions: [
            `Construct a comparative trade-off table between ${uTitleStr} and Hash Tables across Time, Space, and Cache locality.`,
            `When would an engineer choose a B-Tree over an AVL Tree for secondary storage disk indexing?`
          ]
        },
        {
          heading: `Page 7 of 10: Real-World Industry Case Studies & Enterprise System Applications`,
          content: `Practical applications of ${uTitleStr} in modern production infrastructure.\n\nCase Studies:\n1. Operating System Kernels: Task scheduler priority queues (Linux Completely Fair Scheduler - Red-Black Tree).\n2. Database Engines: Database indexing engines (MySQL InnoDB B+ Trees & RocksDB LSM Trees).\n3. Web Browsers: Browser navigation history handling (Back/Forward LIFO Stack) & DOM rendering engine trees.\n4. Network Routers: Packet routing routing tables using Trie prefix trees.`,
          diagram: `Enterprise Architecture Diagram:
[ User Request ] -> [ Load Balancer ] -> [ In-Memory Cache (Hash Table) ] -> [ Database Index (B+ Tree) ]`,
          examQuestions: [
            `Analyze how operating system kernels utilize ${uTitleStr} for process scheduling.`,
            `Explain the role of tree hierarchies in database query indexing and storage engine performance.`
          ]
        },
        {
          heading: `Page 8 of 10: Production-Ready C Language Implementation`,
          content: `Clean, fully compilable production C code written according to Oxford academic engineering standards, complete with dynamic memory allocations, pointer operations, and memory cleanup routines.`,
          code: `// Complete Production C Implementation for ${sCode} (${uTitleStr})
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct SystemNode {
    int key;
    int data;
    struct SystemNode* left;
    struct SystemNode* right;
} SystemNode;

SystemNode* create_system_node(int key, int data) {
    SystemNode* node = (SystemNode*)malloc(sizeof(SystemNode));
    if (!node) {
        fprintf(stderr, "Fatal Memory Allocation Error for Key: %d\\n", key);
        return NULL;
    }
    node->key = key;
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    return node;
}

SystemNode* insert_system_node(SystemNode* root, int key, int data) {
    if (root == NULL) return create_system_node(key, data);
    if (key < root->key) root->left = insert_system_node(root->left, key, data);
    else if (key > root->key) root->right = insert_system_node(root->right, key, data);
    return root;
}

void destroy_system_tree(SystemNode* root) {
    if (root == NULL) return;
    destroy_system_tree(root->left);
    destroy_system_tree(root->right);
    free(root);
}`,
          examQuestions: [
            `Write complete, compilable C code implementing ${uTitleStr} with dynamic memory allocation and cleanup functions.`,
            `Trace pointer updates during node insertion and deletion in the C implementation provided above.`
          ]
        },
        {
          heading: `Page 9 of 10: Production-Ready Object-Oriented Java / Python Implementation`,
          content: `Modern Object-Oriented Java implementation with Generics, Type Safety, Custom Iterators, and Exception Handling compliant with JNTUA & Oxford curricula.`,
          code: `// Modern Java Production Implementation for ${sCode}
import java.util.Iterator;
import java.util.NoSuchElementException;

public class OxfordStructure<T extends Comparable<T>> implements Iterable<T> {
    
    private class Node {
        T value;
        Node next;
        Node(T value) { this.value = value; }
    }

    private Node head;
    private int size = 0;

    public void add(T item) {
        if (item == null) throw new IllegalArgumentException("Null values prohibited");
        Node newNode = new Node(item);
        newNode.next = head;
        head = newNode;
        size++;
    }

    public int size() { return size; }

    @Override
    public Iterator<T> iterator() {
        return new Iterator<T>() {
            private Node curr = head;
            public boolean hasNext() { return curr != null; }
            public T next() {
                if (!hasNext()) throw new NoSuchElementException();
                T val = curr.value;
                curr = curr.next;
                return val;
            }
        };
    }
}`,
          examQuestions: [
            `Implement ${uTitleStr} in Java using Generics and custom Iterable interfaces.`,
            `Discuss how Java's Automatic Garbage Collector manages unreferenced heap nodes compared to manual C free().`
          ]
        },
        {
          heading: `Page 10 of 10: JNTUA Autonomous & Oxford Final Examination Question Bank & Model Solutions`,
          content: `Comprehensive examination question bank containing short answer questions, long descriptive problems, and step-by-step model answers for JNTUA & Oxford semester evaluations.`,
          examQuestions: [
            `Q1: Define ${uTitleStr}. Explain its physical and logical memory representations with diagrams. [10 Marks]\nSolution: ${uTitleStr} is an Abstract Data Type defining data structures and operations independent of physical representation. Physical storage can be contiguous (array) or node-linked (heap).`,
            `Q2: Derive the time complexity of searching and insertion in ${uTitleStr} for Best, Average, and Worst cases. [10 Marks]\nSolution: Best case O(1) occurs when target is at root/head. Average case O(log N) occurs in balanced trees. Worst case O(N) occurs when tree degenerates into a linear chain.`,
            `Q3: Write a complete C/Java program to implement ${uTitleStr} with dynamic memory handling. [14 Marks]`,
            `Q4: Discuss real-world enterprise applications of ${uTitleStr} in Operating Systems and Database Engines. [7 Marks]`,
            `Q5: Differentiate between Stack-based recursion call memory vs Heap node memory allocation. [7 Marks]`
          ]
        }
      ]
    };
  };

  const fetchTopicNotes = async (subjectCode, unitKey, unitNumber, unitTitle, subjectName) => {
    setIsLoadingNotes(true);
    setCurrentPage(1);
    const matchedData = generateOxfordNotes(subjectCode, unitNumber, unitTitle, subjectName);

    setTimeout(() => {
      setActiveNotes({
        subjectCode: subjectCode || matchedData.subjectCode,
        unitNumber: unitNumber || matchedData.unitNumber,
        topicTitle: matchedData.topicTitle,
        sections: matchedData.sections
      });
      setIsLoadingNotes(false);
    }, 200);
  };



  const triggerRibbonBurst = (isMega = false) => {
    const count = isMega ? 350 : 180;
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#eab308', '#a855f7', '#ff6600', '#00ffcc', '#ff007f', '#7000ff'];
    const shapes = ['ribbon', 'strip', 'confetti', 'circle', 'pillow'];
    
    const newRibbons = Array.from({ length: count }).map((_, i) => {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const isStrip = shape === 'strip' || shape === 'ribbon';
      const width = isStrip ? (Math.random() * 10 + 6) : (Math.random() * 14 + 8);
      const height = isStrip ? (Math.random() * 38 + 18) : width;
      const borderRadius = shape === 'circle' ? '50%' : shape === 'pillow' ? '12px' : '3px';

      return {
        id: Date.now() + i + Math.random(),
        left: Math.random() * 98 + 1, // % across full screen width
        color: colors[Math.floor(Math.random() * colors.length)],
        width,
        height,
        borderRadius,
        duration: Math.random() * 4.5 + 5.5, // 5.5s to 10.0s fall time
        delay: Math.random() * 4.0, // staggered start delays over 4 seconds
        swayA: (Math.random() - 0.5) * 160, // -80px to +80px sway 1
        swayB: (Math.random() - 0.5) * 200, // -100px to +100px sway 2
        swayC: (Math.random() - 0.5) * 180, // -90px to +90px sway 3
        swayD: (Math.random() - 0.5) * 140, // -70px to +70px sway 4
        rotX: Math.random() * 1080 - 540,
        rotY: Math.random() * 1440 - 720,
        rotZ: Math.random() * 1080 - 540,
      };
    });

    setActiveRibbons(prev => [...prev, ...newRibbons]);
    setTimeout(() => {
      setActiveRibbons(prev => prev.filter(r => !newRibbons.includes(r)));
    }, 15000);
  };

  const toggleTopic = (topicKey, unit, subject) => {
    const isCurrentlyChecked = !!completedTopics[topicKey];
    const nextState = !isCurrentlyChecked;

    setCompletedTopics((prev) => {
      const updated = { ...prev, [topicKey]: nextState };
      
      if (nextState) {
        // Trigger ribbon popping burst in the air!
        triggerRibbonBurst(false);

        // Check if unit is 100% completed
        if (unit && subject) {
          const totalTopics = unit.topics ? unit.topics.length : 0;
          const doneTopics = unit.topics ? unit.topics.filter((_, tIdx) => {
            const k = `${subject.id}-u${unit.unitNumber}-t${tIdx}`;
            return k === topicKey ? true : !!updated[k];
          }).length : 0;

          if (totalTopics > 0 && doneTopics === totalTopics) {
            // UNIT COMPLETED 100%!
            setTimeout(() => {
              triggerRibbonBurst(true); // MEGA celebratory burst!
              setUnitCompletionModal({
                unitTitle: unit.title,
                unitNumber: unit.unitNumber,
                subjectName: subject.name,
                subjectCode: subject.code,
                studentName: 'Antigravity AI',
                rollNo: '2571A47017'
              });
            }, 300);
          } else {
            setNotificationMsg(`🎉 Topic Checked! Great Job!`);
            setTimeout(() => setNotificationMsg(null), 3000);
          }
        }
      }

      return updated;
    });
  };


  const handleRenderManimVideo = async (unitTitle, unitId) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
    setRenderingManimId(unitId);
    try {
      const response = await fetch(`${API_BASE_URL}/api/render-manim-video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sceneName: 'R23SyllabusUnit',
          targetType: 'syllabus',
          targetId: unitId
        })
      });
      const data = await response.json();
      const streamUrl = data.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
      setVideoSources(prev => ({ ...prev, [unitId]: streamUrl }));
      setNotificationMsg(`Manim Algorithmic Animation rendered for ${unitId}!`);
      setTimeout(() => setNotificationMsg(null), 4000);
    } catch (err) {
      const fallbackStream = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
      setVideoSources(prev => ({ ...prev, [unitId]: fallbackStream }));
      setNotificationMsg(`Serving Manim Animation for ${unitId}!`);
      setTimeout(() => setNotificationMsg(null), 4000);
    } finally {
      setRenderingManimId(null);
    }
  };

  const handleGenerateAIVideo = async (unitTitle, unitId) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
    setGeneratingUnitId(unitId);
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-ai-video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicTitle: unitTitle,
          scriptText: `Welcome Narayana R23 students to ${unitTitle}.`,
          targetType: 'syllabus',
          targetId: unitId
        })
      });
      const data = await response.json();
      const streamUrl = data.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';
      setVideoSources(prev => ({ ...prev, [unitId]: streamUrl }));
      setNotificationMsg(`AI Avatar generated for "${unitTitle}"!`);
      setTimeout(() => setNotificationMsg(null), 4000);
    } catch (err) {
      const fallbackStream = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';
      setVideoSources(prev => ({ ...prev, [unitId]: fallbackStream }));
      setNotificationMsg(`AI Avatar tutorial loaded for "${unitTitle}"!`);
      setTimeout(() => setNotificationMsg(null), 4000);
    } finally {
      setGeneratingUnitId(null);
    }
  };

  // Filter subjects based on search & active filter pill
  const filteredSubjects = syllabusData.filter((subject) => {
    let matchesCategory = true;
    if (activeCategoryFilter === '3') matchesCategory = subject.semester === 3;
    else if (activeCategoryFilter === '4') matchesCategory = subject.semester === 4;

    const matchesSem = selectedSemester === 'all' || subject.semester === Number(selectedSemester);
    const query = activeSearchQuery.toLowerCase();
    const matchesSearch = !query || 
      subject.name.toLowerCase().includes(query) ||
      subject.code.toLowerCase().includes(query) ||
      subject.units.some(u => u.title.toLowerCase().includes(query));
    return matchesCategory && matchesSem && matchesSearch;
  });

  // Selected subject when in detailed view mode
  const currentActiveCourse = syllabusData.find(s => s.id === activeCourseId);

  // SVG Pattern Thumbnails for Course Cards (matching reference screenshot)
  const renderCoursePatternThumbnail = (index) => {
    const patterns = [
      // Pink Hexagon Pattern
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#FAF5FF" />
        <path d="M20 10 L35 20 L35 35 L20 45 L5 35 L5 20 Z" fill="#F3E8FF" stroke="#E9D5FF" strokeWidth="1" />
        <path d="M50 10 L65 20 L65 35 L50 45 L35 35 L35 20 Z" fill="#FAE8FF" stroke="#F5D0FE" strokeWidth="1" />
        <path d="M80 10 L95 20 L95 35 L80 45 L65 35 L65 20 Z" fill="#F3E8FF" stroke="#E9D5FF" strokeWidth="1" />
        <path d="M35 45 L50 55 L50 70 L35 80 L20 70 L20 55 Z" fill="#FAE8FF" stroke="#F5D0FE" strokeWidth="1" />
        <path d="M65 45 L80 55 L80 70 L65 80 L50 70 L50 55 Z" fill="#F3E8FF" stroke="#E9D5FF" strokeWidth="1" />
      </svg>,
      // Green Pastel Bubbles
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#F0FDF4" />
        <circle cx="25" cy="25" r="18" fill="#DCFCE7" stroke="#BBF7D0" strokeWidth="1.5" />
        <circle cx="75" cy="30" r="22" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1" />
        <circle cx="45" cy="70" r="25" fill="#DCFCE7" stroke="#BBF7D0" strokeWidth="1.5" />
        <circle cx="85" cy="80" r="14" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1" />
      </svg>,
      // Purple Overlapping Rings
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#F8FAFC" />
        <circle cx="30" cy="30" r="20" stroke="#DDD6FE" strokeWidth="2" fill="#F3E8FF" fillOpacity="0.4" />
        <circle cx="50" cy="50" r="25" stroke="#C4B5FD" strokeWidth="2" fill="#ECE9FE" fillOpacity="0.4" />
        <circle cx="70" cy="70" r="20" stroke="#DDD6FE" strokeWidth="2" fill="#F3E8FF" fillOpacity="0.4" />
        <circle cx="75" cy="25" r="15" stroke="#C4B5FD" strokeWidth="2" fill="none" />
      </svg>,
      // Amber Geometric Waves
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#FEFCE8" />
        <path d="M0 20 Q 25 5, 50 20 T 100 20" stroke="#FEF08A" strokeWidth="3" fill="none" />
        <path d="M0 40 Q 25 25, 50 40 T 100 40" stroke="#FDE047" strokeWidth="3" fill="none" />
        <path d="M0 60 Q 25 45, 50 60 T 100 60" stroke="#FEF08A" strokeWidth="3" fill="none" />
        <path d="M0 80 Q 25 65, 50 80 T 100 80" stroke="#FDE047" strokeWidth="3" fill="none" />
      </svg>
    ];
    return patterns[index % patterns.length];
  };

  // Activity Heatmap Days generator (Jan to Sept)
  const monthsList = [
    { name: 'January', days: 31 },
    { name: 'February', days: 28 },
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 }
  ];

  const getHeatmapColor = (dayIndex, monthIndex) => {
    // Generate deterministic activity intensity (0: clear, 1: light, 2: med, 3: high)
    const val = (dayIndex * 7 + monthIndex * 13) % 10;
    if (val > 7) return 'bg-purple-700 text-white';
    if (val > 5) return 'bg-purple-500 text-white';
    if (val > 3) return 'bg-purple-300 text-purple-950';
    if (val > 2) return 'bg-purple-200 text-purple-900';
    return 'bg-slate-100 text-slate-400';
  };

  // Unit Theme Helper
  const getUnitTheme = (idx) => {
    const themes = [
      {
        badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
        cardBg: 'bg-white border-slate-200 shadow-sm text-slate-900',
        progressBar: 'from-cyan-500 to-blue-500',
        titleColor: 'text-blue-950',
        accentGlow: 'bg-blue-500/5',
        iconColor: 'text-blue-600'
      },
      {
        badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        cardBg: 'bg-white border-slate-200 shadow-sm text-slate-900',
        progressBar: 'from-indigo-500 to-purple-500',
        titleColor: 'text-indigo-950',
        accentGlow: 'bg-indigo-500/5',
        iconColor: 'text-indigo-600'
      },
      {
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        cardBg: 'bg-white border-slate-200 shadow-sm text-slate-900',
        progressBar: 'from-emerald-500 to-teal-400',
        titleColor: 'text-emerald-950',
        accentGlow: 'bg-emerald-500/5',
        iconColor: 'text-emerald-600'
      },
      {
        badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
        cardBg: 'bg-white border-slate-200 shadow-sm text-slate-900',
        progressBar: 'from-amber-500 to-rose-500',
        titleColor: 'text-amber-950',
        accentGlow: 'bg-amber-500/5',
        iconColor: 'text-amber-600'
      }
    ];
    return themes[idx % themes.length];
  };

  return (
    <section id="syllabus" className="w-full space-y-6 select-none bg-slate-50 min-h-screen pb-12">
      
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center space-x-2.5 border-2 bg-blue-950 text-white border-blue-400 animate-bounce">
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>{notificationMsg}</span>
        </div>
      )}



      {/* DIRECT DETAILED SUBJECT SYLLABUS & UNIT BREAKDOWN VIEW */}
      <div className="space-y-6">
        
        {/* Top Subject Switcher & Status Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#D0BDF4] shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <span className="text-xs font-bold text-[#494D5F] uppercase font-mono mr-1 shrink-0">Subjects:</span>
            {syllabusData.map((sub) => {
              const isSelected = sub.id === currentActiveCourse?.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setActiveCourseId(sub.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
                    isSelected 
                      ? 'bg-[#8458B3] text-white shadow-sm' 
                      : 'bg-[#E5EAF5] text-[#494D5F] hover:bg-[#D0BDF4]/50'
                  }`}
                >
                  <span>{sub.name}</span>
                  <span className="text-[10px] opacity-80">({sub.code})</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="bg-[#E5EAF5] text-[#494D5F] px-3 py-1 rounded-lg font-bold border border-[#D0BDF4]">
              Code: {currentActiveCourse?.code}
            </span>
            <span className="bg-[#8458B3] text-white px-3 py-1 rounded-lg font-bold">
              Sem {currentActiveCourse?.semester} • {currentActiveCourse?.credits} Credits
            </span>
          </div>
        </div>

          {/* Subject Header Banner */}
          {currentActiveCourse && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-blue-100 text-blue-800 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    {currentActiveCourse.department}
                  </span>
                  <h2 className="text-3xl font-black text-slate-900 mt-2">
                    {currentActiveCourse.name}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                    {currentActiveCourse.description}
                  </p>
                </div>

                <div className="text-right text-xs font-mono space-y-1">
                  <p className="font-bold text-slate-800">Instructor: {currentActiveCourse.instructor}</p>
                  <p className="text-slate-500">Regulation: R23 Autonomous</p>
                </div>
              </div>
            </div>
          )}

          {/* Units Partition Grid (Styled like Course Partition Cards) */}
          {currentActiveCourse && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 px-1 border-b border-[#D0BDF4] pb-3">
                <div>
                  <span className="bg-[#D0BDF4]/40 text-[#8458B3] border border-[#D0BDF4] text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">
                    Unit Partitions
                  </span>
                  <h3 className="text-2xl font-bold text-[#494D5F] mt-1">
                    {currentActiveCourse.name} Syllabus Units ({currentActiveCourse.units.length} Units)
                  </h3>
                </div>
                <p className="text-xs text-[#494D5F]/70 font-sans">
                  Select any unit card below to view its syllabus breakdown and resources.
                </p>
              </div>

              {/* Grid of 5 Unit Partition Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                {currentActiveCourse.units.map((unit, uIdx) => {
                  const theme = getUnitTheme(uIdx);
                  const unitId = `${currentActiveCourse.code}-${unit.unitNumber}`;
                  const coverImg = getUnitCoverImage(currentActiveCourse.code, unit.unitNumber);

                  const totalTopics = unit.topics.length;
                  const doneTopics = unit.topics.filter((_, tIdx) => !!completedTopics[`${currentActiveCourse.id}-u${unit.unitNumber}-t${tIdx}`]).length;
                  const percentDone = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;
                  const isSelected = activeUnitNumber === unit.unitNumber || !!expandedUnits[unitId];

                  return (
                    <div
                      key={unit.unitNumber}
                      onClick={() => {
                        if (activeUnitNumber === unit.unitNumber) {
                          setActiveUnitNumber(null);
                          setExpandedUnits(prev => ({ ...prev, [unitId]: false }));
                        } else {
                          setActiveUnitNumber(unit.unitNumber);
                          setExpandedUnits(prev => ({ ...prev, [unitId]: true }));
                        }
                      }}
                      className={`group rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#8458B3] ring-2 ring-[#8458B3]/40 shadow-xl -translate-y-1'
                          : 'bg-white border-[#D0BDF4] hover:border-[#8458B3] shadow-sm hover:shadow-xl transform hover:-translate-y-1'
                      }`}
                    >
                      {/* Top Illustration / Cover Box */}
                      <div className="relative w-full h-44 overflow-hidden bg-slate-900 group">
                        <img 
                          src={coverImg} 
                          alt={unit.title}
                          className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-black/20"></div>
                        
                        {/* Top-Left Unit Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`backdrop-blur-md text-white border text-[10px] font-mono font-bold px-2.5 py-1 rounded-md shadow-sm ${
                            isSelected ? 'bg-[#8458B3] border-purple-300' : 'bg-slate-900/80 border-white/20'
                          }`}>
                            {unit.title.split(':')[0]}
                          </span>
                        </div>

                        {/* Top-Right Progress Badge */}
                        <div className="absolute top-3 right-3">
                          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border border-white/20">
                            {doneTopics}/{totalTopics} Done ({percentDone}%)
                          </span>
                        </div>

                        {/* Bottom Tag & Icon */}
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                          <span className="text-[10px] font-mono font-semibold text-purple-200 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs truncate max-w-[85%] border border-white/10">
                            {unit.topics.slice(0, 2).join(' • ')}
                          </span>
                          <span className="text-lg">
                            {isSelected ? '📖' : '📚'}
                          </span>
                        </div>
                      </div>

                      {/* Middle Description & Progress Bar */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <p className="text-xs font-medium leading-snug text-[#494D5F]/80 group-hover:text-[#494D5F] text-center">
                          Click here to view {unit.title.includes(':') ? unit.title.split(':')[1] : unit.title} syllabus and unit resources
                        </p>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-mono font-medium text-slate-500">
                            <span>Module Mastery</span>
                            <span className="font-bold text-slate-900">{percentDone}%</span>
                          </div>
                          <div className="w-full rounded-full h-1.5 overflow-hidden border p-0.5 bg-slate-100 border-slate-200">
                            <div 
                              className={`h-full rounded-full bg-gradient-to-r ${theme.progressBar} transition-all duration-500`}
                              style={{ width: `${percentDone}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Footer Bar */}
                      <div className={`py-3 px-4 flex items-center justify-between transition-colors duration-300 ${
                        isSelected 
                          ? 'bg-[#8458B3] text-white' 
                          : 'bg-[#494D5F] text-white group-hover:bg-[#8458B3]'
                      }`}>
                        <span className="font-bold text-xs md:text-sm tracking-wide truncate">
                          {unit.title.includes(':') ? unit.title.split(':')[1] : unit.title}
                        </span>
                        <ChevronRight size={16} className={`transform transition-transform shrink-0 ml-1 ${isSelected ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* ACTIVE SELECTED UNIT CONTENT WORKSPACE */}
              {currentActiveCourse.units.map((unit, uIdx) => {
                const unitId = `${currentActiveCourse.code}-${unit.unitNumber}`;
                const isSelected = activeUnitNumber === unit.unitNumber || !!expandedUnits[unitId];
                if (!isSelected) return null;

                const theme = getUnitTheme(uIdx);
                const videoSrc = videoSources[unitId] || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
                const totalTopics = unit.topics.length;
                const doneTopics = unit.topics.filter((_, tIdx) => !!completedTopics[`${currentActiveCourse.id}-u${unit.unitNumber}-t${tIdx}`]).length;
                const percentDone = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

                return (
                  <div key={unit.unitNumber} className="bg-white border-2 border-[#8458B3] rounded-3xl p-6 shadow-xl space-y-6 animate-fadeIn mt-6">
                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-center border-b border-slate-100 pb-4 gap-2">
                      <div className="flex items-center space-x-3">
                        <span className={`text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${theme.badgeBg}`}>
                          {unit.title.split(':')[0]}
                        </span>
                        <h4 className="text-xl font-extrabold text-slate-900">
                          {unit.title.includes(':') ? unit.title.split(':')[1] : unit.title}
                        </h4>
                      </div>

                      <button
                        onClick={() => {
                          setActiveUnitNumber(null);
                          setExpandedUnits(prev => ({ ...prev, [unitId]: false }));
                        }}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer flex items-center space-x-1 border border-slate-300"
                      >
                        <span>✕ Close Unit View</span>
                      </button>
                    </div>

                    {/* Checklist */}
                    <div className="space-y-2 p-4 rounded-2xl border bg-slate-50 border-slate-200">
                      <span className="text-[10px] uppercase tracking-widest font-mono font-bold block mb-1 text-slate-500">
                        Key Evaluation Checklist
                      </span>
                      {unit.topics.map((topic, tIdx) => {
                        const topicKey = `${currentActiveCourse.id}-u${unit.unitNumber}-t${tIdx}`;
                        const isDone = !!completedTopics[topicKey];

                        return (
                          <label 
                            key={topicKey}
                            className="flex items-center space-x-3 cursor-pointer select-none text-xs font-medium transition text-slate-700 hover:text-slate-900"
                          >
                            <input
                              type="checkbox"
                              checked={isDone}
                              onChange={() => toggleTopic(topicKey, unit, currentActiveCourse)}
                              className="rounded w-4 h-4 cursor-pointer border-slate-300 bg-white text-blue-600 focus:ring-blue-500"
                            />
                            <span className={isDone ? 'line-through text-slate-400 font-mono' : ''}>
                              {topic}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    {/* Video Stream Container */}
                    <div className="space-y-2 pt-1">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-700">
                          <Film className="w-4 h-4 text-blue-600" />
                          Manim Algorithmic Stream
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleRenderManimVideo(unit.title, unitId)}
                            disabled={renderingManimId === unitId}
                            className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg transition shadow-sm cursor-pointer"
                          >
                            {renderingManimId === unitId ? 'Compiling...' : 'Render Manim'}
                          </button>
                          <button
                            onClick={() => handleGenerateAIVideo(unit.title, unitId)}
                            disabled={generatingUnitId === unitId}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg transition shadow-sm cursor-pointer"
                          >
                            {generatingUnitId === unitId ? '...' : 'AI Avatar'}
                          </button>
                        </div>
                      </div>

                      <div className="rounded-2xl overflow-hidden border-2 shadow-sm bg-slate-900 border-slate-300 relative max-w-sm sm:max-w-md mx-auto">
                        <video 
                          controls 
                          poster={
                            currentActiveCourse.code === 'R23-CS302' ? '/thumbnails/java_thumb.png' :
                            currentActiveCourse.code === 'R23-CS303' ? '/thumbnails/dbms_thumb.png' :
                            currentActiveCourse.code === 'R23-CS304' ? '/thumbnails/python_thumb.png' :
                            '/thumbnails/ds_thumb.png'
                          }
                          className="w-full aspect-video object-cover"
                          src={videoSrc}
                        >
                          Your browser does not support HTML5 video streaming.
                        </video>
                      </div>
                    </div>

                    {/* NPTEL Reference */}
                    {unit.nptel && (
                      <div className="pt-2 border-t border-slate-200 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="flex items-center gap-1.5 font-bold text-slate-700">
                            <GraduationCap className="w-4 h-4 text-blue-600" />
                            NPTEL Lecture
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded border font-bold text-blue-800 bg-blue-50 border-blue-200">
                            {unit.nptel.courseId}
                          </span>
                        </div>

                        <a
                          href={unit.nptel.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-2 border text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm cursor-pointer w-full justify-center bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                          <span>🎓 NPTEL: {unit.nptel.title}</span>
                        </a>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className={`grid ${percentDone === 100 ? 'grid-cols-3' : 'grid-cols-2'} gap-2 pt-2`}>
                      <button 
                        onClick={() => {
                          const unitKey = `unit${unit.unitNumber}`;
                          fetchTopicNotes(currentActiveCourse.code, unitKey, unit.unitNumber, unit.title, currentActiveCourse.name);
                        }}
                        className="w-full font-bold py-2 px-2 rounded-xl text-[11px] transition shadow-sm flex items-center justify-center space-x-1 cursor-pointer border bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                        <span>📖 Notes</span>
                      </button>

                      {onAskAITutor && (
                        <button
                          onClick={() => onAskAITutor(`Explain ${currentActiveCourse.name} - ${unit.title || unit.unitNumber} concepts`)}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-2 px-2 rounded-xl text-[11px] transition shadow-md flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <Bot className="w-3.5 h-3.5 text-cyan-300" />
                          <span>🤖 Ask AI</span>
                        </button>
                      )}

                      {percentDone === 100 && (
                        <button
                          onClick={() => setActiveCertificate({
                            courseTitle: `${currentActiveCourse.name} - ${unit.title || 'Unit ' + unit.unitNumber}`,
                            studentName: 'Antigravity AI',
                            rollNo: '2571A47017'
                          })}
                          className="w-full bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white font-bold py-2 px-2 rounded-xl text-[11px] transition shadow-md flex items-center justify-center space-x-1 cursor-pointer border border-amber-300 animate-pulse"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-200" />
                          <span>🎓 Claim Cert</span>
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}

            </div>
          )}
        </div>

      {/* Oxford Notes Modal */}
      {activeNotes && (
        <div id="bookModal" className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center z-50 px-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto text-slate-900">
            
            <button 
              onClick={() => setActiveNotes(null)} 
              className="absolute top-4 right-6 text-slate-400 hover:text-slate-900 text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>

            <div className="border-b border-slate-100 pb-4 mb-6 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                  Oxford Reference Archive • {activeNotes.subjectCode} ({activeNotes.unitNumber})
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  {activeNotes.topicTitle}
                </h3>
              </div>

              <span className="text-xs font-mono bg-blue-50 text-blue-900 px-3 py-1 rounded-full border border-blue-200 font-bold">
                Page {currentPage} of {activeNotes.sections ? activeNotes.sections.length : 1}
              </span>
            </div>

            {/* Content Section */}
            <div className="min-h-[300px] text-sm text-slate-800 leading-relaxed space-y-4">
              {isLoadingNotes ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-slate-500 font-medium text-xs">Opening Oxford textbook notes archive...</p>
                </div>
              ) : activeNotes.sections && activeNotes.sections.length > 0 ? (
                (() => {
                  const sec = activeNotes.sections[currentPage - 1] || activeNotes.sections[0];
                  return (
                    <div className="space-y-4">
                      <h4 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-2">
                        {sec.heading}
                      </h4>

                      {sec.content && (
                        <p className="text-slate-700 text-sm whitespace-pre-line leading-relaxed">
                          {sec.content}
                        </p>
                      )}

                      {sec.diagram && (
                        <div className="pt-2">
                          <span className="text-xs font-bold text-blue-700 uppercase tracking-wide block mb-1 font-mono">
                            📐 Memory Diagram:
                          </span>
                          <pre className="bg-slate-900 text-cyan-300 p-4 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-700 leading-tight">
                            <code>{sec.diagram}</code>
                          </pre>
                        </div>
                      )}

                      {sec.complexityTable && (
                        <div className="pt-2">
                          <span className="text-xs font-bold text-blue-700 uppercase tracking-wide block mb-2 font-mono">
                            ⚡ Operational Complexity:
                          </span>
                          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
                            <table className="w-full text-xs text-left">
                              <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200">
                                <tr>
                                  <th className="p-2.5">Operation</th>
                                  <th className="p-2.5">Time Complexity</th>
                                  <th className="p-2.5">Space Complexity</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700">
                                {sec.complexityTable.map((row, rIdx) => (
                                  <tr key={rIdx}>
                                    <td className="p-2.5 font-medium">{row.operation}</td>
                                    <td className="p-2.5 font-mono text-blue-600 font-bold">{row.time}</td>
                                    <td className="p-2.5 font-mono text-purple-600 font-bold">{row.space}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {sec.code && (
                        <div className="pt-2">
                          <span className="text-xs font-bold text-blue-700 uppercase tracking-wide block mb-1 font-mono">
                            💻 Production Code Implementation:
                          </span>
                          <pre className="bg-slate-900 text-emerald-400 p-4 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-700">
                            <code>{sec.code}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  );
                })()
              ) : null}
            </div>

            {/* Modal Controls */}
            <div className="border-t border-slate-100 pt-5 mt-6 flex justify-between items-center font-mono text-xs">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || isLoadingNotes}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2 rounded-xl transition disabled:opacity-40 cursor-pointer border border-slate-300"
              >
                ← Previous Page
              </button>

              <button
                onClick={() => {
                  const total = activeNotes.sections ? activeNotes.sections.length : 1;
                  if (currentPage < total) setCurrentPage((prev) => prev + 1);
                }}
                disabled={!activeNotes.sections || currentPage === activeNotes.sections.length || isLoadingNotes}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl transition shadow-lg cursor-pointer"
              >
                {activeNotes.sections && currentPage === activeNotes.sections.length
                  ? 'End of Topic Notes ✓'
                  : 'Next Page →'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {activeCertificate && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center z-50 px-4">
          <div className="bg-white border-4 border-amber-400 rounded-3xl max-w-2xl w-full p-8 relative shadow-2xl text-center space-y-6 text-slate-900">
            <button 
              onClick={() => setActiveCertificate(null)}
              className="absolute top-4 right-6 text-slate-400 hover:text-slate-900 text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>
            
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <h4 className="text-xs uppercase font-bold tracking-widest text-amber-600 font-mono">
                Narayana Engineering College (Autonomous)
              </h4>
              <h2 className="text-3xl font-extrabold text-slate-900">Certificate of Completion</h2>
              <p className="text-xs text-slate-500">Department of CSE - Artificial Intelligence & Data Science</p>
            </div>

            <p className="text-xs text-slate-600">This is proudly certified that</p>
            <h3 className="text-2xl font-black text-amber-600 tracking-tight">
              {activeCertificate.studentName} (Roll: {activeCertificate.rollNo})
            </h3>
            <p className="text-xs text-slate-600">has successfully completed all module requirements and evaluation assessments for</p>
            <h4 className="text-lg font-bold text-blue-700 font-mono">{activeCertificate.courseTitle}</h4>

            <div className="flex justify-between items-center pt-6 border-t border-slate-100 text-xs">
              <div className="text-left font-mono">
                <p className="font-bold text-slate-900">Date: August 2026</p>
                <p className="text-slate-400 text-[10px]">Portal Verification Validated</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-900 border-b border-slate-300 pb-1">Dr. K. Srinivas Rao & HOD</div>
                <p className="text-slate-400 text-[10px]">Authorized Signatory</p>
              </div>
            </div>

            <button 
              onClick={() => setActiveCertificate(null)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow transition cursor-pointer"
            >
              Close Certificate
            </button>
          </div>
        </div>
      )}

      {/* Falling Ribbon Confetti Particles Overlay Layer (Falling from Above) */}
      {activeRibbons.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          <style>{`
            @keyframes freeFall3D {
              0% {
                top: -70px;
                transform: perspective(900px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(0px) scale(0.9);
                opacity: 1;
              }
              25% {
                transform: perspective(900px) rotateX(calc(var(--rot-x) * 0.35)) rotateY(calc(var(--rot-y) * 0.35)) rotateZ(calc(var(--rot-z) * 0.35)) translateX(var(--sway-a)) scale(1.1);
              }
              50% {
                transform: perspective(900px) rotateX(calc(var(--rot-x) * 0.65)) rotateY(calc(var(--rot-y) * 0.65)) rotateZ(calc(var(--rot-z) * 0.65)) translateX(var(--sway-b)) scale(1.05);
                opacity: 0.95;
              }
              75% {
                transform: perspective(900px) rotateX(calc(var(--rot-x) * 0.85)) rotateY(calc(var(--rot-y) * 0.85)) rotateZ(calc(var(--rot-z) * 0.85)) translateX(var(--sway-c)) scale(0.95);
                opacity: 0.8;
              }
              100% {
                top: 108vh;
                transform: perspective(900px) rotateX(var(--rot-x)) rotateY(var(--rot-y)) rotateZ(var(--rot-z)) translateX(var(--sway-d)) scale(0.75);
                opacity: 0;
              }
            }
          `}</style>
          {activeRibbons.map((ribbon) => (
            <div
              key={ribbon.id}
              className="absolute pointer-events-none"
              style={{
                left: `${ribbon.left}%`,
                width: `${ribbon.width}px`,
                height: `${ribbon.height}px`,
                backgroundColor: ribbon.color,
                borderRadius: ribbon.borderRadius,
                boxShadow: `0 0 10px ${ribbon.color}99`,
                '--sway-a': `${ribbon.swayA}px`,
                '--sway-b': `${ribbon.swayB}px`,
                '--sway-c': `${ribbon.swayC}px`,
                '--sway-d': `${ribbon.swayD}px`,
                '--rot-x': `${ribbon.rotX}deg`,
                '--rot-y': `${ribbon.rotY}deg`,
                '--rot-z': `${ribbon.rotZ}deg`,
                animation: `freeFall3D ${ribbon.duration}s cubic-bezier(0.37, 0, 0.63, 1) ${ribbon.delay}s forwards`,
                opacity: 0.95
              }}
            />
          ))}
        </div>
      )}

      {/* Unit Completion Celebration Modal */}
      {unitCompletionModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 px-4">
          <div className="bg-white border-4 border-emerald-500 rounded-3xl max-w-lg w-full p-8 relative shadow-2xl text-center space-y-6 text-slate-900 animate-in zoom-in-90 duration-300">
            
            <button 
              onClick={() => setUnitCompletionModal(null)} 
              className="absolute top-4 right-6 text-slate-400 hover:text-slate-900 text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>

            {/* Celebration Icon */}
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-emerald-400 animate-bounce">
              <Sparkles className="w-10 h-10 text-emerald-600" />
            </div>

            <div className="space-y-2">
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                Unit Milestone Reached 🏆
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Congratulations!
              </h2>
              <p className="text-xs text-slate-600">
                You have successfully completed 100% of all evaluation checklist topics for:
              </p>
              <h3 className="text-base font-black text-blue-900 pt-1 font-mono">
                {unitCompletionModal.subjectName} — {unitCompletionModal.unitTitle}
              </h3>
            </div>

            {/* Unlocked Certificate Callout */}
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-amber-900 space-y-2 text-xs text-left">
              <div className="flex items-center space-x-2 font-bold text-amber-900">
                <Award className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>Official Unit Certificate Unlocked!</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Your academic unit mastery has been verified by the Department of CSE (AI & DS). You are now authorized to view and download your official certificate.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  const modalData = unitCompletionModal;
                  setUnitCompletionModal(null);
                  setActiveCertificate({
                    courseTitle: `${modalData.subjectName} - ${modalData.unitTitle}`,
                    studentName: modalData.studentName,
                    rollNo: modalData.rollNo
                  });
                }}
                className="flex-1 bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white py-3 px-4 rounded-xl text-xs font-bold shadow-lg transition cursor-pointer flex items-center justify-center space-x-2"
              >
                <Award className="w-4 h-4 text-amber-200" />
                <span>🎓 Download Certificate Now</span>
              </button>

              <button
                onClick={() => setUnitCompletionModal(null)}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Keep Studying
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

