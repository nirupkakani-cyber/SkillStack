import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  GraduationCap,
  Layers,
  FileCode,
  CheckCircle2,
  Bookmark,
  AlertTriangle,
  Cpu,
  Menu,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight
} from 'lucide-react';

const SocialTwitter = (props) => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SocialFacebook = (props) => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const SocialInstagram = (props) => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const SocialLinkedin = (props) => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

// Dynamic 150-Page Oxford Reference Book Generator
const generate150PagesForBook = (courseId, title) => {
  const blueprints = {
    'c-lang': [
      {
        topic: "Pointers, Address Operator & Physical Memory Segments",
        concept: (p, sub) => `Page ${p} of 150 — C Memory Topography (Module ${sub})\nC is a procedural language that provides direct access to physical memory addresses via Pointers.\n\nProcess Memory Segments:\n1. Text Segment: Executable binary instructions stored in read-only memory.\n2. Data Segment: Global & static variables with explicit initial values.\n3. BSS Segment: Uninitialized global/static variables zero-filled by OS at launch.\n4. Heap: Dynamically allocated memory via malloc(), calloc(), realloc(). Grows upwards.\n5. Stack: Local variables, function stack frames, and return IP addresses. Grows downwards.`,
        invariants: (p) => [
          `Page ${p} Rule: Always validate malloc/calloc return pointers against NULL before access.`,
          `Page ${p} Invariant: Pointer arithmetic increments address by sizeof(*ptr) bytes.`,
          `Page ${p} Safety: Reset pointers to NULL immediately after calling free().`
        ],
        code: (p) => `// Page ${p} - Memory Inspection & Stack Frame Demo
#include <stdio.h>
#include <stdlib.h>

void inspectStack(int depth) {
    int stackVar = depth * 10;
    printf("[Page ${p}] Stack Variable Address: %p\\n", (void*)&stackVar);
}

int main(void) {
    int* ptr = (int*)malloc(sizeof(int));
    if (ptr) {
        *ptr = ${p};
        printf("[Page ${p}] Heap Address: %p, Val: %d\\n", (void*)ptr, *ptr);
        free(ptr);
    }
    inspectStack(1);
    return 0;
}`
      },
      {
        topic: "Dynamic Memory Allocation & Heap Fragmentation Mechanics",
        concept: (p, sub) => `Page ${p} of 150 — Dynamic Heap Allocations & Realloc (Module ${sub})\nDynamic memory allocation allows programs to request memory dynamically during execution.\n\nRealloc Algorithm:\n1. If contiguous space exists at current address, realloc expands the block in-place.\n2. Otherwise, realloc allocates a new block, copies old data, frees old block, and returns new pointer address.`,
        invariants: (p) => [
          `Page ${p} Invariant: Store realloc return in temporary pointer to prevent memory leaks on failure.`,
          `Page ${p} Rule: Calloc initializes allocated memory to zero; Malloc leaves uninitialized garbage.`,
          `Page ${p} Safety: Never execute free() on non-heap or stack addresses.`
        ],
        code: (p) => `// Page ${p} - Safe Realloc Dynamic Buffer
#include <stdio.h>
#include <stdlib.h>

int* growBuffer(int* buf, size_t newSize) {
    int* temp = (int*)realloc(buf, newSize * sizeof(int));
    if (!temp) {
        fprintf(stderr, "[Page ${p}] Memory Growth Error! Original buffer preserved.\\n");
        return buf;
    }
    return temp;
}`
      },
      {
        topic: "Linked List Structures, Pointer Rewiring & Floyd Cycle Detection",
        concept: (p, sub) => `Page ${p} of 150 — Linked List Structures & Invariants (Module ${sub})\nA Linked List is a dynamic linear data structure composed of self-referential nodes connected via pointers.\n\nFloyd's Tortoise and Hare Cycle Finding Algorithm:\n- Slow Pointer moves 1 node per step.\n- Fast Pointer moves 2 nodes per step.\n- If a cycle exists, Fast will meet Slow inside the cycle in O(N) time and O(1) space complexity.`,
        invariants: (p) => [
          `Page ${p} Invariant: Always check head != NULL before accessing head->next.`,
          `Page ${p} Rule: Traverse list using temp pointer; never overwrite main head pointer.`,
          `Page ${p} Safety: Free every node sequentially to prevent memory leaks.`
        ],
        code: (p) => `// Page ${p} - Floyd Cycle Detection
#include <stdio.h>
#include <stdbool.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

bool detectCycle(Node* head) {
    Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true; // Cycle detected
    }
    return false;
}`
      },
      {
        topic: "Bitwise Operations, Bit Masking & Register Manipulations",
        concept: (p, sub) => `Page ${p} of 150 — Bitwise Bit-Level Operations (Module ${sub})\nBitwise operations operate directly on binary representations of integers.\n\nBit Masking Primitives:\n- Set Bit K: reg |= (1U << K)\n- Clear Bit K: reg &= ~(1U << K)\n- Toggle Bit K: reg ^= (1U << K)\n- Test Bit K: (reg & (1U << K)) != 0`,
        invariants: (p) => [
          `Page ${p} Invariant: Shifting by bit count >= integer bit width produces Undefined Behavior.`,
          `Page ${p} Rule: Use unsigned types when performing logical bitwise shifts.`,
          `Page ${p} Safety: Declare hardware register pointers as 'volatile'.`
        ],
        code: (p) => `// Page ${p} - Hardware Bit Manipulation
#include <stdio.h>
#include <stdint.h>

uint8_t toggleBit(uint8_t val, uint8_t bitPos) {
    return val ^ (1U << bitPos);
}`
      },
      {
        topic: "File Streams, Buffering Strategies & Binary Record Serialization",
        concept: (p, sub) => `Page ${p} of 150 — File Stream I/O & Serialization (Module ${sub})\nStandard C file streams provide buffered I/O primitives via FILE pointers.\n\nBuffering Modes:\n- Full Buffering (_IOFBF): Flushes when buffer fills up.\n- Line Buffering (_IOLBF): Flushes on newline character.\n- No Buffering (_IONBF): Flushes immediately to kernel.`,
        invariants: (p) => [
          `Page ${p} Invariant: Always check fopen return status for NULL before stream operations.`,
          `Page ${p} Rule: Always call fclose() to ensure dirty buffer pages are committed to disk.`,
          `Page ${p} Safety: Use fread/fwrite return values to verify complete record counts.`
        ],
        code: (p) => `// Page ${p} - Binary Record Serialization
#include <stdio.h>

typedef struct Student {
    int rollNo;
    char name[32];
} Student;

void writeRecord(const char* file, Student* s) {
    FILE* fp = fopen(file, "wb");
    if (fp) {
        fwrite(s, sizeof(Student), 1, fp);
        fclose(fp);
    }
}`
      },
      {
        topic: "C Preprocessor Macros, Header Guards & Variadic Arguments",
        concept: (p, sub) => `Page ${p} of 150 — Preprocessor Directives & Macros (Module ${sub})\nThe preprocessor replaces code macros, expands headers, and handles conditional compilation prior to lexical parsing.`,
        invariants: (p) => [
          `Page ${p} Invariant: Wrap macro parameter references in parentheses.`,
          `Page ${p} Rule: Use header guards (#ifndef HEADER_H) to prevent redefinition errors.`,
          `Page ${p} Safety: Pair va_start with va_end in variadic functions.`
        ],
        code: (p) => `// Page ${p} - Variadic Function Example
#include <stdio.h>
#include <stdarg.h>

void printInts(int count, ...) {
    va_list args;
    va_start(args, count);
    for (int i = 0; i < count; i++) {
        printf("%d ", va_arg(args, int));
    }
    va_end(args);
}`
      },
      {
        topic: "POSIX Threads (pthreads), Mutex Locks & Concurrency",
        concept: (p, sub) => `Page ${p} of 150 — POSIX Multithreading & Synchronization (Module ${sub})\nThreads execute concurrently inside a process, sharing heap memory, global variables, and open file descriptors. Mutexes protect shared state against concurrent race conditions.`,
        invariants: (p) => [
          `Page ${p} Invariant: Unlock mutexes along all exit paths.`,
          `Page ${p} Rule: Lock multiple mutexes in strict global order to prevent deadlocks.`,
          `Page ${p} Safety: Join terminated threads with pthread_join to reclaim stack resources.`
        ],
        code: (p) => `// Page ${p} - Thread Mutex Counter
#include <stdio.h>
#include <pthread.h>

static int g_counter = 0;
static pthread_mutex_t g_mutex = PTHREAD_MUTEX_INITIALIZER;

void* safeInc(void* arg) {
    pthread_mutex_lock(&g_mutex);
    g_counter++;
    pthread_mutex_unlock(&g_mutex);
    return NULL;
}`
      },
      {
        topic: "System Calls, Process Creation (fork/exec) & IPC Pipes",
        concept: (p, sub) => `Page ${p} of 150 — System Calls & Kernel Services (Module ${sub})\nSystem calls transition the CPU from User Mode (Ring 3) to Kernel Mode (Ring 0) to request privileged OS operations.`,
        invariants: (p) => [
          `Page ${p} Invariant: Always check fork() return value for error -1.`,
          `Page ${p} Rule: Call wait() in parent process to harvest zombie process status.`,
          `Page ${p} Safety: Close unused pipe ends to avoid EOF deadlock conditions.`
        ],
        code: (p) => `// Page ${p} - Process Forking Demo
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

void executeFork(void) {
    pid_t pid = fork();
    if (pid == 0) {
        printf("[Page ${p}] Child Process PID: %d\\n", getpid());
        _exit(0);
    } else if (pid > 0) {
        wait(NULL);
    }
}`
      },
      {
        topic: "Function Pointers, Callbacks & Virtual Table Design",
        concept: (p, sub) => `Page ${p} of 150 — Function Pointers & Callback Design (Module ${sub})\nFunction pointers store executable code entry points, enabling event callbacks and runtime polymorphic behavior.`,
        invariants: (p) => [
          `Page ${p} Invariant: Function pointer return and parameter types must match target function signature.`,
          `Page ${p} Rule: Always check function pointers for NULL before invocation.`,
          `Page ${p} Safety: Use function pointer arrays for state machine transition tables.`
        ],
        code: (p) => `// Page ${p} - Function Pointer Callback
#include <stdio.h>

typedef void (*CallbackFunc)(int);

void notify(int status) {
    printf("[Page ${p}] Event Status Received: %d\\n", status);
}

void trigger(CallbackFunc cb) {
    if (cb) cb(${p});
}`
      },
      {
        topic: "Oxford & JNTUA Academic Examination Solved Proofs",
        concept: (p, sub) => `Page ${p} of 150 — University Exam Question Bank & Proofs (Module ${sub})\nComprehensive university examination problems covering memory alignment calculations, recursion tree stack bounds, and time/space complexity proofs.`,
        invariants: (p) => [
          `Page ${p} Exam Invariant: Struct members are aligned on byte boundaries equal to their primitive size.`,
          `Page ${p} Exam Rule: Base cases in recursive functions prevent stack overflow exceptions.`,
          `Page ${p} Exam Rule: Big-O notation measures asymptotic upper bound time complexity.`
        ],
        code: (p) => `// Page ${p} - Struct Size & Alignment Calculator
#include <stdio.h>

struct ExamStruct {
    char c;
    int i;
    double d;
};

int main(void) {
    printf("[Page ${p}] Struct Size: %zu bytes\\n", sizeof(struct ExamStruct));
    return 0;
}`
      }
    ],

    'cpp-dsa': [
      {
        topic: "C++ Standard Template Library (STL) Vectors & Dynamic Memory",
        concept: (p, sub) => `Page ${p} of 150 — C++ STL Vector Architecture (Module ${sub})\nstd::vector is a dynamic contiguous memory array container that automatically handles memory reallocation.\n\nAmortized Constant Time Expansion:\nWhen vector size reaches capacity, it allocates a new buffer of 2x (or 1.5x) capacity, copies existing elements, and frees old memory. Amortized push_back time complexity is O(1).`,
        invariants: (p) => [
          `Page ${p} Invariant: Iterator invalidation occurs when vector reallocates capacity.`,
          `Page ${p} Rule: Reserve vector capacity upfront via vec.reserve(N) to prevent reallocations.`,
          `Page ${p} Safety: Access elements with vec.at(i) for bound-checked bounds access.`
        ],
        code: (p) => `// Page ${p} - STL Vector Demonstration
#include <iostream>
#include <vector>

void demonstrateVector() {
    std::vector<int> vec;
    vec.reserve(100);
    for (int i = 0; i < 10; ++i) vec.push_back(i * ${p});
    std::cout << "[Page ${p}] Vector Size: " << vec.size() << ", Capacity: " << vec.capacity() << "\\n";
}`
      },
      {
        topic: "Binary Search Trees (BST), AVL Trees & Balancing Rotations",
        concept: (p, sub) => `Page ${p} of 150 — Self-Balancing Search Trees (Module ${sub})\nAn AVL tree is a self-balancing Binary Search Tree where height difference (Balance Factor) between left and right subtrees is at most 1.\n\nAVL Rotations:\n- Left-Left (LL) Heavy -> Single Right Rotation\n- Right-Right (RR) Heavy -> Single Left Rotation\n- Left-Right (LR) Heavy -> Left Rotation on Left Child, then Right Rotation on Node\n- Right-Left (RL) Heavy -> Right Rotation on Right Child, then Left Rotation on Node`,
        invariants: (p) => [
          `Page ${p} Invariant: Balance Factor = Height(LeftSubtree) - Height(RightSubtree) ∈ {-1, 0, 1}.`,
          `Page ${p} Rule: AVL Search, Insertion, and Deletion run in guaranteed O(log N) time.`,
          `Page ${p} Safety: Maintain height invariant updates during tree node pointer rotations.`
        ],
        code: (p) => `// Page ${p} - AVL Node Rotation Stub
#include <iostream>
#include <algorithm>

struct AVLNode {
    int key, height;
    AVLNode *left, *right;
    AVLNode(int k) : key(k), height(1), left(nullptr), right(nullptr) {}
};

int getHeight(AVLNode* n) { return n ? n->height : 0; }
int getBalance(AVLNode* n) { return n ? getHeight(n->left) - getHeight(n->right) : 0; }`
      },
      {
        topic: "Graph Representations, Dijkstra's Shortest Path & Priority Queues",
        concept: (p, sub) => `Page ${p} of 150 — Dijkstra's Graph Shortest Path (Module ${sub})\nDijkstra's Algorithm computes single-source shortest paths on weighted graphs with non-negative edge weights.\n\nTime Complexity:\nUsing a Min-Priority Queue (std::priority_queue), Dijkstra runs in O((V + E) log V) time.`,
        invariants: (p) => [
          `Page ${p} Invariant: Dijkstra fails on negative edge weights (use Bellman-Ford).`,
          `Page ${p} Rule: Relax edge (u, v, w): if (dist[u] + w < dist[v]), update dist[v].`,
          `Page ${p} Safety: Use std::greater in std::priority_queue for min-heap behavior.`
        ],
        code: (p) => `// Page ${p} - Dijkstra Edge Relaxation
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

void dijkstraStub(int src, int n) {
    vector<int> dist(n, 1e9);
    dist[src] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    pq.push({0, src});
}`
      },
      {
        topic: "Dynamic Programming, Knapsack Problem & Bitmask DP",
        concept: (p, sub) => `Page ${p} of 150 — Dynamic Programming Foundations (Module ${sub})\nDynamic Programming solves optimization problems with overlapping subproblems and optimal substructure.\n\n0/1 Knapsack Recurrence:\nDP[i][w] = max(DP[i-1][w], val[i-1] + DP[i-1][w - wt[i-1]]) if wt[i-1] <= w else DP[i-1][w].`,
        invariants: (p) => [
          `Page ${p} Invariant: Identify state dimensions and base cases before constructing table.`,
          `Page ${p} Rule: 0/1 Knapsack space can be optimized to 1D array by iterating weight backwards.`,
          `Page ${p} Safety: Prevent buffer out-of-bound errors when indexing DP tables.`
        ],
        code: (p) => `// Page ${p} - 1D Space Optimized Knapsack
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int knapsack(int W, const vector<int>& wt, const vector<int>& val) {
    vector<int> dp(W + 1, 0);
    for (size_t i = 0; i < wt.size(); ++i) {
        for (int w = W; w >= wt[i]; --w) {
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}`
      },
      {
        topic: "Smart Pointers (unique_ptr, shared_ptr) & RAII Memory Rules",
        concept: (p, sub) => `Page ${p} of 150 — C++ Smart Pointers & RAII (Module ${sub})\nResource Acquisition Is Initialization (RAII) ensures heap objects are freed automatically when smart pointers go out of scope.`,
        invariants: (p) => [
          `Page ${p} Invariant: std::unique_ptr cannot be copied; only moved via std::move().`,
          `Page ${p} Rule: std::shared_ptr uses atomic reference counter block.`,
          `Page ${p} Safety: Use std::weak_ptr to break circular shared_ptr references.`
        ],
        code: (p) => `// Page ${p} - Smart Pointer Demo
#include <iostream>
#include <memory>

class Resource {
public:
    Resource() { std::cout << "[Page ${p}] Resource Acquired\\n"; }
    ~Resource() { std::cout << "[Page ${p}] Resource Released\\n"; }
};

void runRAII() {
    auto ptr = std::make_unique<Resource>();
}`
      },
      {
        topic: "Move Semantics, Rvalue References & Perfect Forwarding",
        concept: (p, sub) => `Page ${p} of 150 — Move Semantics & Rvalues (Module ${sub})\nMove semantics allow stealing internal resources from temporary rvalue objects instead of performing expensive deep copies.`,
        invariants: (p) => [
          `Page ${p} Invariant: Moved-from objects remain in a valid but unspecified state.`,
          `Page ${p} Rule: std::move casts lvalues to rvalue references.`,
          `Page ${p} Safety: Use std::forward<T> for perfect forwarding in template functions.`
        ],
        code: (p) => `// Page ${p} - Move Constructor Example
#include <iostream>
#include <utility>

class Buffer {
    int* data;
public:
    Buffer(Buffer&& temp) noexcept : data(temp.data) {
        temp.data = nullptr;
    }
};`
      },
      {
        topic: "Disjoint Set Union (DSU) & Kruskal's Minimum Spanning Tree",
        concept: (p, sub) => `Page ${p} of 150 — DSU & Kruskal's MST (Module ${sub})\nDisjoint Set Union (DSU) tracks partitioned elements using Path Compression and Union by Rank, achieving near O(1) amortized operations (Inverse Ackermann α(N)).`,
        invariants: (p) => [
          `Page ${p} Invariant: Path Compression flattens parent tree hierarchy during findSet().`,
          `Page ${p} Rule: Union by Rank connects smaller rank tree under root of larger rank tree.`,
          `Page ${p} Safety: Sort edges by weight before running Kruskal's MST algorithm.`
        ],
        code: (p) => `// Page ${p} - DSU Implementation
#include <iostream>
#include <vector>
#include <numeric>

using namespace std;

struct DSU {
    vector<int> parent;
    DSU(int n) : parent(n) { iota(parent.begin(), parent.end(), 0); }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
};`
      },
      {
        topic: "Trie (Prefix Tree) & Aho-Corasick Automaton Search",
        concept: (p, sub) => `Page ${p} of 150 — Trie Data Structures (Module ${sub})\nA Trie is an N-ary tree structure used for fast string prefix matching and autocomplete search operations in O(L) time where L is key string length.`,
        invariants: (p) => [
          `Page ${p} Invariant: Node children array size equals alphabet size (26 for lowercase A-Z).`,
          `Page ${p} Rule: isEndOfWord flag marks completed dictionary words.`,
          `Page ${p} Safety: Free Trie nodes recursively to prevent memory leaks.`
        ],
        code: (p) => `// Page ${p} - Trie Node Definition
#include <iostream>

struct TrieNode {
    TrieNode* children[26] = {nullptr};
    bool isEndOfWord = false;
};`
      },
      {
        topic: "C++ Concurrency, Threads, Mutexes & Condition Variables",
        concept: (p, sub) => `Page ${p} of 150 — C++ Multi-Threading (Module ${sub})\nModern C++ provides native multi-threading primitives (std::thread, std::mutex, std::condition_variable, std::atomic).`,
        invariants: (p) => [
          `Page ${p} Invariant: Always join() or detach() std::thread before destructor runs.`,
          `Page ${p} Rule: Use std::lock_guard or std::unique_lock for RAII mutex lock management.`,
          `Page ${p} Safety: Use std::atomic<T> for lock-free primitive thread synchronization.`
        ],
        code: (p) => `// Page ${p} - C++ Thread & Atomic Counter
#include <iostream>
#include <thread>
#include <atomic>

std::atomic<int> counter(0);
void worker() { counter.fetch_add(1); }`
      },
      {
        topic: "Oxford Examination Solved Proofs & Asymptotic Bounds",
        concept: (p, sub) => `Page ${p} of 150 — Oxford University Exam Analysis (Module ${sub})\nRigorous algorithmic proofs, Recurrence Theorem (Master Theorem) evaluations, and space-time complexity analysis.`,
        invariants: (p) => [
          `Page ${p} Exam Rule: Master Theorem applies to T(n) = aT(n/b) + f(n).`,
          `Page ${p} Exam Rule: Comparison sorting algorithms have lower bound Ω(N log N).`,
          `Page ${p} Exam Rule: Space complexity accounts for auxiliary stack frames in recursion.`
        ],
        code: (p) => `// Page ${p} - Asymptotic Bound Demonstration
#include <iostream>

void analyzeComplexity(int n) {
    std::cout << "[Page ${p}] Problem Size: " << n << ", Operations: O(N log N)\\n";
}`
      }
    ],

    'java-oop': [
      {
        topic: "JVM Internal Architecture: Classloader, Execution Engine & Memory",
        concept: (p, sub) => `Page ${p} of 150 — JVM Architecture (Module ${sub})\nThe Java Virtual Machine (JVM) executes Java bytecode (.class) independent of underlying host OS hardware.\n\nJVM Memory Regions:\n1. Heap: Stores all object instances and arrays. Shared across all threads.\n2. JVM Stack: Stores frames containing local variables, partial results, and method invocation status per thread.\n3. Metaspace: Stores class definitions, method metadata, and runtime constant pool.\n4. Native Method Stack: For JNI C/C++ native library execution.`,
        invariants: (p) => [
          `Page ${p} Invariant: Objects created with 'new' are always allocated on the Heap.`,
          `Page ${p} Rule: Classloading occurs in 3 phases: Loading, Linking (Verify, Prepare, Resolve), and Initialization.`,
          `Page ${p} Safety: Metaspace replaces PermGen in Java 8+ and uses native host RAM.`
        ],
        code: (p) => `// Page ${p} - JVM Memory Breakdown & Memory Leak Demo
public class JvmMemoryDemo {
    public static void main(String[] args) {
        long freeMem = Runtime.getRuntime().freeMemory();
        long totalMem = Runtime.getRuntime().totalMemory();
        System.out.println("[Page ${p}] Total Heap: " + (totalMem / 1024 / 1024) + "MB");
    }
}`
      },
      {
        topic: "Object-Oriented Design, Polymorphism & Interface Default Methods",
        concept: (p, sub) => `Page ${p} of 150 — OOP Polymorphism & Interfaces (Module ${sub})\nJava OOP relies on Encapsulation, Inheritance, Abstraction, and Polymorphism.\n\nPolymorphic Dynamic Method Dispatch:\nWhen an overridden method is invoked through a superclass reference, Java determines which implementation to call at runtime based on the actual object instance type.`,
        invariants: (p) => [
          `Page ${p} Invariant: Subclass overridden methods cannot restrict parent access visibility.`,
          `Page ${p} Rule: Interfaces support default and static method implementations since Java 8.`,
          `Page ${p} Safety: Use @Override annotation to catch signature mismatch bugs at compile time.`
        ],
        code: (p) => `// Page ${p} - Interface & Polymorphism Implementation
interface AcademicLogger {
    void log(String msg);
    default void logError(String err) {
        System.err.println("[Page ${p} ERROR] " + err);
    }
}`
      },
      {
        topic: "Java Collections Framework: HashMap Internal Collision Buckets",
        concept: (p, sub) => `Page ${p} of 150 — HashMap Internal Architecture (Module ${sub})\nJava HashMap stores key-value pairs using an array of Node buckets.\n\nHash Collision Resolution:\n1. Keys are mapped to bucket index via (n - 1) & hash(key).\n2. Collisions are chained using Singly Linked Lists.\n3. Treeification Threshold: When a bucket chain length reaches 8 and table capacity >= 64, Java converts the linked list into a Red-Black Tree, reducing lookup time from O(N) to O(log N)!`,
        invariants: (p) => [
          `Page ${p} Invariant: Always override both equals() and hashCode() together when using custom objects as keys.`,
          `Page ${p} Rule: Default HashMap initial capacity is 16; default load factor is 0.75.`,
          `Page ${p} Safety: HashMap is NOT thread-safe; use ConcurrentHashMap in multi-threaded code.`
        ],
        code: (p) => `// Page ${p} - Custom Key HashCode Contract
import java.util.Objects;

public class StudentKey {
    private final int rollNo;
    public StudentKey(int r) { this.rollNo = r; }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StudentKey)) return false;
        return rollNo == ((StudentKey)o).rollNo;
    }
    @Override
    public int hashCode() { return Objects.hash(rollNo); }
}`
      },
      {
        topic: "Java Multithreading, Thread Synchronization & Atomic Variables",
        concept: (p, sub) => `Page ${p} of 150 — Java Concurrency & Synchronization (Module ${sub})\nJava supports native multithreading via Thread class and Runnable / Callable interfaces.\n\nSynchronized Blocks & Monitors:\nEvery Java object possesses an intrinsic monitor lock. The 'synchronized' keyword enforces mutual exclusion when threads enter critical code blocks.`,
        invariants: (p) => [
          `Page ${p} Invariant: Volatile keyword guarantees visibility across thread CPU caches but NOT atomicity.`,
          `Page ${p} Rule: Use AtomicInteger for lock-free thread-safe counter operations.`,
          `Page ${p} Safety: Always invoke wait() inside a while loop to handle spurious wakeups.`
        ],
        code: (p) => `// Page ${p} - Atomic Concurrent Counter
import java.util.concurrent.atomic.AtomicInteger;

public class ConcurrentCounter {
    private final AtomicInteger count = new AtomicInteger(0);
    public void increment() { count.incrementAndGet(); }
    public int getCount() { return count.get(); }
}`
      },
      {
        topic: "Java Streams API, Lambdas & Functional Interfaces",
        concept: (p, sub) => `Page ${p} of 150 — Functional Java Streams API (Module ${sub})\nThe Java 8 Streams API enables declarative functional processing of sequences of elements (filter, map, reduce, collect).`,
        invariants: (p) => [
          `Page ${p} Invariant: Streams are lazy; intermediate operations execute only when terminal operation is called.`,
          `Page ${p} Rule: Streams cannot be reused after a terminal operation has been executed.`,
          `Page ${p} Safety: Avoid side-effects inside stream map/filter lambda predicates.`
        ],
        code: (p) => `// Page ${p} - Functional Stream Pipeline
import java.util.List;
import java.util.stream.Collectors;

public class StreamDemo {
    public static List<String> processList(List<String> raw) {
        return raw.stream()
                  .filter(s -> s != null && !s.isEmpty())
                  .map(String::toUpperCase)
                  .collect(Collectors.toList());
    }
}`
      },
      {
        topic: "Enterprise Design Patterns: Singleton, Factory & Builder",
        concept: (p, sub) => `Page ${p} of 150 — Enterprise Design Patterns (Module ${sub})\nDesign patterns represent reusable solutions to recurring software engineering architecture challenges.`,
        invariants: (p) => [
          `Page ${p} Invariant: Double-Checked Locking Singleton requires volatile instance variable.`,
          `Page ${p} Rule: Factory Method delegates object instantiation to subclasses.`,
          `Page ${p} Safety: Builder Pattern enforces immutable object construction.`
        ],
        code: (p) => `// Page ${p} - Double-Checked Singleton Pattern
public class DatabasePool {
    private static volatile DatabasePool instance;
    private DatabasePool() {}
    public static DatabasePool getInstance() {
        if (instance == null) {
            synchronized (DatabasePool.class) {
                if (instance == null) instance = new DatabasePool();
            }
        }
        return instance;
    }
}`
      },
      {
        topic: "Garbage Collection Algorithms: Serial, Parallel, G1GC & ZGC",
        concept: (p, sub) => `Page ${p} of 150 — Java Garbage Collection Deep Dive (Module ${sub})\nJava Automatic Garbage Collection frees unreferenced heap objects.\n\nGarbage Collectors:\n- G1GC (Garbage-First): Divides heap into equal regions, collecting regions with most garbage first to meet latency targets.\n- ZGC (Z Garbage Collector): Scalable low-latency GC performing mark/compact phases concurrently with sub-millisecond pauses.`,
        invariants: (p) => [
          `Page ${p} Invariant: System.gc() is a recommendation to JVM and does NOT guarantee immediate execution.`,
          `Page ${p} Rule: Objects transition from Young Generation (Eden/Survivor) to Old Generation based on aging tenure.`,
          `Page ${p} Safety: Strong references prevent GC; WeakReference / SoftReference allow GC when memory is low.`
        ],
        code: (p) => `// Page ${p} - WeakReference Memory Inspection
import java.lang.ref.WeakReference;

public class GcDemo {
    public static void checkGc() {
        Object obj = new Object();
        WeakReference<Object> weak = new WeakReference<>(obj);
        obj = null; // Eligible for GC
    }
}`
      },
      {
        topic: "Java Exception Handling Hierarchy & Try-With-Resources",
        concept: (p, sub) => `Page ${p} of 150 — Exception Architecture (Module ${sub})\nAll exceptions derive from java.lang.Throwable, split into Checked Exceptions (Exception) and Unchecked Exceptions (RuntimeException & Error).`,
        invariants: (p) => [
          `Page ${p} Invariant: Try-With-Resources automatically closes AutoCloseable objects in reverse order.`,
          `Page ${p} Rule: Catch specific subclass exceptions before superclass Exception blocks.`,
          `Page ${p} Safety: Never catch Throwable or Error directly in application logic.`
        ],
        code: (p) => `// Page ${p} - Try-With-Resources Auto-Closing
import java.io.*;

public class FileReadDemo {
    public static void readFile(String path) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader(path))) {
            String line = br.readLine();
        }
    }
}`
      },
      {
        topic: "Java NIO.2 Non-Blocking Channels, Selectors & Buffers",
        concept: (p, sub) => `Page ${p} of 150 — Non-Blocking I/O Architecture (Module ${sub})\nJava NIO.2 provides high-throughput non-blocking socket and file channel operations using multiplexed Selectors.`,
        invariants: (p) => [
          `Page ${p} Invariant: Buffer.flip() transitions buffer from writing mode to reading mode.`,
          `Page ${p} Rule: Selectors monitor multiple Channel readiness events using a single thread.`,
          `Page ${p} Safety: Clear or compact buffers before re-filling with new data.`
        ],
        code: (p) => `// Page ${p} - NIO Buffer Flip Demo
import java.nio.ByteBuffer;

public class NioDemo {
    public static void demoBuffer() {
        ByteBuffer buf = ByteBuffer.allocate(1024);
        buf.putInt(${p});
        buf.flip(); // Switch to read
    }
}`
      },
      {
        topic: "Oxford Examination Review & Solved Java Model Problems",
        concept: (p, sub) => `Page ${p} of 150 — University Examination Review (Module ${sub})\nComprehensive university exam preparation covering class hierarchy designs, memory pool tuning, and concurrency invariants.`,
        invariants: (p) => [
          `Page ${p} Exam Rule: String immutability enables String Pool memory sharing and security.`,
          `Page ${p} Exam Rule: Abstract classes can hold state fields; Interfaces cannot.`,
          `Page ${p} Exam Rule: ConcurrentHashMap avoids full table locks by using bucket-level CAS & synchronization.`
        ],
        code: (p) => `// Page ${p} - Exam Review Code Stub
public class ExamReview {
    public static void main(String[] args) {
        System.out.println("[Page ${p}] Java Enterprise Examination Solved.");
    }
}`
      }
    ],

    'python-ai': [
      {
        topic: "Python CPython Internals, Reference Counting & GIL Architecture",
        concept: (p, sub) => `Page ${p} of 150 — CPython Memory & GIL (Module ${sub})\nPython (CPython implementation) compiles source code (.py) to bytecode (.pyc) executed by the CPython Virtual Machine.\n\nGlobal Interpreter Lock (GIL):\nThe GIL is a mutual exclusion lock preventing multiple native OS threads from executing Python bytecodes simultaneously. For CPU-bound tasks, use the 'multiprocessing' module instead of 'threading'!`,
        invariants: (p) => [
          `Page ${p} Invariant: Objects are deallocated immediately when reference count reaches 0.`,
          `Page ${p} Rule: Cyclic Garbage Collector handles self-referencing container object cycles.`,
          `Page ${p} Safety: Use multiprocessing or C-extensions (NumPy/Cython) to bypass the GIL.`
        ],
        code: (p) => `# Page ${p} - Reference Counting Inspection
import sys

x = [1, 2, 3]
print(f"[Page ${p}] Reference Count of x: {sys.getrefcount(x) - 1}")`
      },
      {
        topic: "NumPy N-Dimensional Vectorization & Memory Strides",
        concept: (p, sub) => `Page ${p} of 150 — NumPy Vectorized Calculations (Module ${sub})\nNumPy arrays (ndarray) store homogeneous primitive data in contiguous C or Fortran memory blocks.\n\nVectorization vs Loops:\nVectorized operations execute low-level C SIMD (Single Instruction Multiple Data) machine code, running 100x faster than standard Python for loops!`,
        invariants: (p) => [
          `Page ${p} Invariant: Slicing NumPy arrays creates memory views, NOT deep copies.`,
          `Page ${p} Rule: Broadcasting automatically expands trailing dimensions of size 1.`,
          `Page ${p} Safety: Use np.copy() when explicit memory array independence is required.`
        ],
        code: (p) => `# Page ${p} - NumPy Matrix Vectorization
import numpy as np

A = np.arange(12).reshape(3, 4)
B = A * ${p}  # Vectorized element-wise multiplication
print(f"[Page ${p}] Matrix Shape: {B.shape}, Sum: {B.sum()}")`
      },
      {
        topic: "Pandas DataFrame Data Wrangling, Merges & GroupBy Aggregations",
        concept: (p, sub) => `Page ${p} of 150 — Pandas Data Wrangling (Module ${sub})\nPandas DataFrames provide tabular data structures with labelled axes (rows and columns).\n\nGroupBy Split-Apply-Combine Strategy:\n1. Split data into groups based on key columns.\n2. Apply aggregation functions (mean, sum, std, count).\n3. Combine results into a consolidated summary DataFrame.`,
        invariants: (p) => [
          `Page ${p} Invariant: Avoid iterating over rows with iterrows(); use vectorized .apply() or NumPy functions.`,
          `Page ${p} Rule: Categorical data types reduce memory usage for low-cardinality string columns.`,
          `Page ${p} Safety: Use df.fillna() or df.dropna() before executing statistical routines.`
        ],
        code: (p) => `# Page ${p} - Pandas Aggregation Pipeline
import pandas as pd

df = pd.DataFrame({
    'dept': ['CS', 'AI', 'CS', 'AI'],
    'score': [90, 95, 88, 92]
})
print(df.groupby('dept')['score'].mean())`
      },
      {
        topic: "Scikit-Learn Machine Learning Pipelines & Model Evaluation",
        concept: (p, sub) => `Page ${p} of 150 — Scikit-Learn ML Pipelines (Module ${sub})\nScikit-Learn provides a unified API (fit, transform, predict) for supervised and unsupervised machine learning algorithms.\n\nData Leakage Prevention:\nUsing Pipeline objects ensures scaling (StandardScaler) and imputation transformers fit strictly on training folds during Cross-Validation.`,
        invariants: (p) => [
          `Page ${p} Invariant: Always fit transformers on train data only, then transform test data.`,
          `Page ${p} Rule: Use StratifiedKFold for imbalanced target classification datasets.`,
          `Page ${p} Safety: Evaluate classification models using ROC-AUC and F1-score rather than raw accuracy alone.`
        ],
        code: (p) => `# Page ${p} - Scikit-Learn Pipeline Construction
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipe = make_pipeline(StandardScaler(), LogisticRegression())`
      },
      {
        topic: "PyTorch Tensors, Autograd Engine & Backpropagation Dynamics",
        concept: (p, sub) => `Page ${p} of 150 — PyTorch Autograd Engine (Module ${sub})\nPyTorch Tensors power deep neural network calculations with optional GPU (CUDA) acceleration.\n\nAutograd Computational Graph:\nPyTorch constructs a dynamic Directed Acyclic Graph (DAG) during forward passes. Calling loss.backward() computes partial derivatives via automatic differentiation!`,
        invariants: (p) => [
          `Page ${p} Invariant: Call optimizer.zero_grad() before loss.backward() to prevent gradient accumulation.`,
          `Page ${p} Rule: Wrap evaluation code in with torch.no_grad(): to disable autograd graph construction and save RAM.`,
          `Page ${p} Safety: Ensure model and tensors reside on identical CUDA/CPU device.`
        ],
        code: (p) => `# Page ${p} - PyTorch Backprop Loop
import torch

x = torch.tensor([2.0], requires_grad=True)
y = x ** 2 + ${p}
y.backward()
print(f"[Page ${p}] dy/dx = {x.grad.item()}")`
      },
      {
        topic: "Convolutional Neural Networks (CNNs) & Computer Vision",
        concept: (p, sub) => `Page ${p} of 150 — CNN Architecture (Module ${sub})\nConvolutional Neural Networks apply spatial filter kernels to extract visual feature maps (edges, textures, shapes).\n\nCNN Layer Pipeline:\nInput Image -> Conv2D (Feature Extraction) -> ReLU -> MaxPool2D (Downsampling) -> Flatten -> Fully Connected Linear Classifier.`,
        invariants: (p) => [
          `Page ${p} Invariant: Output Dimension = ((W - K + 2P) / S) + 1.`,
          `Page ${p} Rule: Max pooling reduces spatial resolution while preserving translational invariance.`,
          `Page ${p} Safety: Apply Batch Normalization to stabilize internal covariate shift during training.`
        ],
        code: (p) => `# Page ${p} - PyTorch Conv2D Layer
import torch.nn as nn

conv = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3, padding=1)`
      },
      {
        topic: "Transformer Models, Self-Attention & LLM Fine-Tuning",
        concept: (p, sub) => `Page ${p} of 150 — Transformer Self-Attention (Module ${sub})\nTransformers compute contextual token relationships using Multi-Head Scaled Dot-Product Attention.\n\nAttention Formula:\nAttention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V`,
        invariants: (p) => [
          `Page ${p} Invariant: Positional Encodings inject token order sequence information into transformer models.`,
          `Page ${p} Rule: Multi-head attention allows parallel learning of syntactic and semantic relationships.`,
          `Page ${p} Safety: Use Low-Rank Adaptation (LoRA) for parameter-efficient LLM fine-tuning.`
        ],
        code: (p) => `# Page ${p} - Transformer Self-Attention Formula Stub
import torch
import torch.nn.functional as F

def attention(q, k, v):
    d_k = q.size(-1)
    scores = torch.matmul(q, k.transpose(-2, -1)) / (d_k ** 0.5)
    return torch.matmul(F.softmax(scores, dim=-1), v)`
      },
      {
        topic: "Deep Learning Model Optimization: AdamW, Learning Rate Schedulers",
        concept: (p, sub) => `Page ${p} of 150 — Optimization & Schedulers (Module ${sub})\nGradient Descent optimizers compute parameter updates based on loss gradients.\n\nAdamW Optimizer:\nAdamW decouples L2 weight decay regularization from gradient momentum updates, preventing weight decay degradation in Adaptive Gradient algorithms.`,
        invariants: (p) => [
          `Page ${p} Invariant: Use Cosine Annealing learning rate schedulers for smooth convergence.`,
          `Page ${p} Rule: Monitor validation loss to trigger Early Stopping and prevent overfitting.`,
          `Page ${p} Safety: Apply Gradient Clipping (torch.nn.utils.clip_grad_norm_) to prevent exploding gradients.`
        ],
        code: (p) => `# Page ${p} - AdamW & Scheduler Configuration
import torch.optim as optim

# Optimizer setup
opt = optim.AdamW([torch.tensor(1.0, requires_grad=True)], lr=1e-3, weight_decay=0.01)`
      },
      {
        topic: "Natural Language Processing (NLP) Word Embeddings & Tokenization",
        concept: (p, sub) => `Page ${p} of 150 — NLP Embeddings & Tokenizers (Module ${sub})\nTokenizers split raw text into integer token IDs mapped to dense continuous vector space embeddings.`,
        invariants: (p) => [
          `Page ${p} Invariant: Subword Tokenization (BPE/WordPiece) resolves Out-Of-Vocabulary (OOV) token errors.`,
          `Page ${p} Rule: Cosine Similarity measures vector direction alignment between embeddings.`,
          `Page ${p} Safety: Pad sequences with padding tokens (PAD) to ensure uniform tensor batch dimensions.`
        ],
        code: (p) => `# Page ${p} - Cosine Similarity Calculation
import torch

def cosine_sim(v1, v2):
    return torch.dot(v1, v2) / (torch.norm(v1) * torch.norm(v2))`
      },
      {
        topic: "Oxford Academic AI Handbook Solved Machine Learning Models",
        concept: (p, sub) => `Page ${p} of 150 — Oxford Academic AI Practice (Module ${sub})\nComprehensive Oxford AI evaluation exercises covering loss function proofs, gradient descent derivations, and model bias-variance tradeoff bounds.`,
        invariants: (p) => [
          `Page ${p} Exam Rule: High Bias causes Underfitting; High Variance causes Overfitting.`,
          `Page ${p} Exam Rule: Cross-Entropy Loss measures divergence between target probability and model output.`,
          `Page ${p} Exam Rule: Principal Component Analysis (PCA) maximizes variance along orthogonal eigenvectors.`
        ],
        code: (p) => `# Page ${p} - Oxford AI Evaluation Stub
print("[Page ${p}] Oxford AI & Data Science Handbook Review Completed.")`
      }
    ],

    'os-systems': [
      {
        topic: "Process Control Block (PCB), Context Switching & Process States",
        concept: (p, sub) => `Page ${p} of 150 — Operating Systems Process Architecture (Module ${sub})\nA Process is an executing instance of a program residing in RAM.\n\nProcess Control Block (PCB):\nThe OS kernel maintains a PCB structure for every active process containing: PID, Program Counter (PC), CPU Registers, Process State (New, Ready, Running, Waiting, Terminated), Memory Limits, and Open File Descriptors.`,
        invariants: (p) => [
          `Page ${p} Invariant: Context switching incurs OS CPU overhead during register save and restore operations.`,
          `Page ${p} Rule: Preemptive schedulers force running processes into Ready state when time quanta expire.`,
          `Page ${p} Safety: Orphan processes are adopted by init/systemd (PID 1).`
        ],
        code: (p) => `// Page ${p} - Process State Simulation
#include <stdio.h>

typedef enum { NEW, READY, RUNNING, WAITING, TERMINATED } ProcessState;

struct PCB {
    int pid;
    ProcessState state;
};`
      },
      {
        topic: "CPU Scheduling Algorithms: FCFS, SJF, Round Robin & MLFQ",
        concept: (p, sub) => `Page ${p} of 150 — CPU Scheduling Algorithms (Module ${sub})\nCPU Schedulers select ready processes to execute on CPU cores.\n\nAlgorithm Performance:\n- Round Robin (RR): Time quantum sliced execution. Optimal response time.\n- Shortest Job First (SJF): Minimal average waiting time (requires advance burst estimation).`,
        invariants: (p) => [
          `Page ${p} Invariant: Small RR time quanta cause excessive context switch overhead.`,
          `Page ${p} Rule: Convoy Effect occurs in FCFS when long CPU-bound jobs block short I/O jobs.`,
          `Page ${p} Safety: Multilevel Feedback Queue (MLFQ) prevents starvation via priority aging.`
        ],
        code: (p) => `// Page ${p} - Round Robin Quantum Simulator
#include <stdio.h>

void simulateRR(int processes[], int n, int quantum) {
    printf("[Page ${p}] Executing Round Robin with Time Quantum: %d\\n", quantum);
}`
      },
      {
        topic: "Process Synchronization: Mutex Locks, Semaphores & Monitors",
        concept: (p, sub) => `Page ${p} of 150 — Process Synchronization (Module ${sub})\nSynchronization primitives coordinate concurrent access to shared resources.\n\nSemaphores:\n- Counting Semaphore: Integer value initialized to resource count N.\n- Binary Semaphore (Mutex): Integer value restricted to 0 or 1.`,
        invariants: (p) => [
          `Page ${p} Invariant: Wait (P operation) decrements semaphore value; Signal (V operation) increments it.`,
          `Page ${p} Rule: Peterson's Algorithm achieves 2-process mutual exclusion without hardware atomic support.`,
          `Page ${p} Safety: Protect against Priority Inversion using Priority Inheritance Protocols.`
        ],
        code: (p) => `// Page ${p} - Semaphore Synchronization
#include <stdio.h>
#include <semaphore.h>

sem_t mutexSem;
void initSem(void) { sem_init(&mutexSem, 0, 1); }`
      },
      {
        topic: "Deadlocks: Necessary Conditions, Banker's Algorithm & Avoidance",
        concept: (p, sub) => `Page ${p} of 150 — Deadlock Analysis & Avoidance (Module ${sub})\nA Deadlock occurs when a set of processes are blocked because each holds a resource while waiting for another.\n\n4 Coffman Conditions:\n1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait`,
        invariants: (p) => [
          `Page ${p} Invariant: Banker's Algorithm tests if allocating resources leaves system in a Safe State.`,
          `Page ${p} Rule: Resource Allocation Graphs (RAG) with single resource instances contain deadlocks if a cycle exists.`,
          `Page ${p} Safety: Impose global resource allocation ordering to prevent Circular Wait.`
        ],
        code: (p) => `// Page ${p} - Banker's Algorithm Need Matrix Calculation
#include <stdio.h>

void calculateNeed(int need[5][3], int max[5][3], int alloc[5][3]) {
    for (int i = 0; i < 5; i++)
        for (int j = 0; j < 3; j++)
            need[i][j] = max[i][j] - alloc[i][j];
}`
      },
      {
        topic: "Virtual Memory Paging, Page Tables, TLB & Segmentation",
        concept: (p, sub) => `Page ${p} of 150 — Virtual Memory & Paging Architecture (Module ${sub})\nVirtual Memory maps process virtual address spaces to physical RAM page frames.\n\nTranslation Lookaside Buffer (TLB):\nThe TLB is a high-speed hardware associative cache storing recent virtual-to-physical page table translations, achieving 99% hit rates!`,
        invariants: (p) => [
          `Page ${p} Invariant: Page Fault Exception triggers OS kernel to load missing page from disk swap space.`,
          `Page ${p} Rule: Multi-level page tables reduce RAM footprint for sparse virtual address spaces.`,
          `Page ${p} Safety: TLB flush (invlpg) is required during process context switches.`
        ],
        code: (p) => `// Page ${p} - Virtual Address Translation Simulation
#include <stdio.h>

#define PAGE_SIZE 4096
#define PAGE_MASK 0xFFF

void translateAddress(unsigned int vaddr) {
    unsigned int pageNo = vaddr / PAGE_SIZE;
    unsigned int offset = vaddr & PAGE_MASK;
    printf("[Page ${p}] Page: %u, Offset: %u\\n", pageNo, offset);
}`
      },
      {
        topic: "Page Replacement Algorithms: LRU, Optimal, Clock & FIFO",
        concept: (p, sub) => `Page ${p} of 150 — Page Replacement Algorithms (Module ${sub})\nPage Replacement selects victim pages to evict when physical RAM page frames are exhausted.\n\nBelady's Anomaly:\nBelady's Anomaly occurs in FIFO replacement where increasing physical page frames increases total page faults! LRU and Optimal algorithms do NOT suffer from Belady's Anomaly.`,
        invariants: (p) => [
          `Page ${p} Invariant: Optimal Page Replacement evicts the page that will not be used for longest time in future.`,
          `Page ${p} Rule: Clock Algorithm uses a circular buffer with a reference bit to approximate LRU efficiently.`,
          `Page ${p} Safety: Thrashing occurs when system spends more time paging than executing processes.`
        ],
        code: (p) => `// Page ${p} - Clock Page Replacement Bit Check
#include <stdio.h>

struct Frame {
    int pageNo;
    int refBit;
};`
      },
      {
        topic: "File System Architecture, Inodes & Directory Traversal",
        concept: (p, sub) => `Page ${p} of 150 — File System Inode Topography (Module ${sub})\nUnix file systems structure storage using Inodes (Index Nodes).\n\nInode Metadata:\nAn Inode stores: File Mode, Owner UID/GID, File Size, Access Timestamps, and Direct/Indirect Block Pointers to disk sectors.`,
        invariants: (p) => [
          `Page ${p} Invariant: Hard links point directly to the target file Inode number.`,
          `Page ${p} Rule: Symbolic (Soft) links store target path strings as file data content.`,
          `Page ${p} Safety: Journaling file systems log file changes to disk before writing data to prevent corruption.`
        ],
        code: (p) => `// Page ${p} - POSIX Stat Inode Inspection
#include <stdio.h>
#include <sys/stat.h>

void inspectInode(const char* path) {
    struct stat st;
    if (stat(path, &st) == 0) {
        printf("[Page ${p}] Inode: %lu, Size: %ld bytes\\n", st.st_ino, st.st_size);
    }
}`
      },
      {
        topic: "Mass-Storage Management, Disk Scheduling (SCAN, C-LOOK) & RAID",
        concept: (p, sub) => `Page ${p} of 150 — Disk Scheduling & RAID Systems (Module ${sub})\nDisk scheduling algorithms order I/O requests to minimize seek time head movements.\n\nRAID Topography:\n- RAID 0: Disk Striping (High Performance, No Redundancy).\n- RAID 1: Disk Mirroring (100% Redundancy).\n- RAID 5: Distributed Parity (Single Disk Fault Tolerance).\n- RAID 10: Striped Mirrors (Performance + Reliability).`,
        invariants: (p) => [
          `Page ${p} Invariant: Elevator (SCAN) algorithm moves read/write head continuously from end to end.`,
          `Page ${p} Rule: C-LOOK services requests only in one direction, returning to start immediately.`,
          `Page ${p} Safety: Parity blocks enable data recovery upon single disk failure in RAID 5.`
        ],
        code: (p) => `// Page ${p} - RAID 5 Parity Calculation
#include <stdio.h>

unsigned char computeParity(unsigned char d1, unsigned char d2) {
    return d1 ^ d2; // Bitwise XOR Parity
}`
      },
      {
        topic: "Inter-Process Communication (IPC): Pipes, Shared Memory & Signals",
        concept: (p, sub) => `Page ${p} of 150 — Operating Systems IPC Mechanisms (Module ${sub})\nInter-Process Communication mechanisms allow independent processes to exchange data.\n\nIPC Performance:\nShared Memory (shmget/shmat) provides the fastest IPC mechanism because data transfer does NOT copy bytes across the OS kernel boundary!`,
        invariants: (p) => [
          `Page ${p} Invariant: Shared memory access MUST be synchronized with semaphores.`,
          `Page ${p} Rule: Anonymous Pipes are unidirectional and require parent-child relationship.`,
          `Page ${p} Safety: Named Pipes (FIFOs) allow unrelated processes to communicate over file paths.`
        ],
        code: (p) => `// Page ${p} - POSIX Anonymous Pipe
#include <stdio.h>
#include <unistd.h>

void createPipe(void) {
    int fds[2];
    if (pipe(fds) == 0) {
        printf("[Page ${p}] Read FD: %d, Write FD: %d\\n", fds[0], fds[1]);
    }
}`
      },
      {
        topic: "Oxford Systems Engineering Exam Review & Solved Kernel Problems",
        concept: (p, sub) => `Page ${p} of 150 — Oxford Systems Examination Questions (Module ${sub})\nRigorous systems engineering practice problems covering memory paging calculations, TLB hit ratio proofs, and concurrency invariant verifications.`,
        invariants: (p) => [
          `Page ${p} Exam Rule: Effective Access Time (EAT) = TLB_Hit * (TLB_Time + RAM_Time) + TLB_Miss * (TLB_Time + 2*RAM_Time).`,
          `Page ${p} Exam Rule: Spooky action at a distance is avoided by using kernel atomic compare-and-swap (CAS).`,
          `Page ${p} Exam Rule: Disk seek time dominates total I/O transfer latency.`
        ],
        code: (p) => `// Page ${p} - Systems Exam Verification
#include <stdio.h>

int main(void) {
    printf("[Page ${p}] Oxford Operating Systems Examination Solved.\\n");
    return 0;
}`
      }
    ],

    'dbms-sql': [
      {
        topic: "Relational Architecture, ER Models & Relational Algebra",
        concept: (p, sub) => `Page ${p} of 150 — Relational Database Architecture (Module ${sub})\nA Relational Database Management System (RDBMS) structures data into mathematical Relations (Tables) composed of Tuples (Rows) and Attributes (Columns).\n\nRelational Algebra Operators:\n- Selection (σ): Filters rows matching a predicate.\n- Projection (π): Selects specific attribute columns.\n- Natural Join (⋈): Combines relations based on matching common attributes.`,
        invariants: (p) => [
          `Page ${p} Invariant: Primary Keys must be unique and CANNOT contain NULL values.`,
          `Page ${p} Rule: Foreign Keys enforce Referencing Integrity across parent and child tables.`,
          `Page ${p} Safety: Entity Integrity Rule requires every table to possess a candidate primary key.`
        ],
        code: (p) => `-- Page ${p} - Relational Schema Definition
CREATE TABLE Departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL UNIQUE
);`
      },
      {
        topic: "Database Normalization: 1NF, 2NF, 3NF, BCNF & Lossless Joins",
        concept: (p, sub) => `Page ${p} of 150 — Database Normalization Theory (Module ${sub})\nNormalization eliminates data redundancy and prevents Insertion, Update, and Deletion Anomalies.\n\nNormal Forms Hierarchy:\n- 1NF: Atomic column values; no repeating groups.\n- 2NF: In 1NF and no partial functional dependencies on candidate keys.\n- 3NF: In 2NF and no transitive functional dependencies.\n- BCNF: For every non-trivial functional dependency X -> Y, X MUST be a Super Key!`,
        invariants: (p) => [
          `Page ${p} Invariant: Decompositions must guarantee Lossless Join property (R1 ∩ R2 -> R1 or R1 ∩ R2 -> R2).`,
          `Page ${p} Rule: BCNF eliminates all functional dependency anomalies but may not preserve dependencies.`,
          `Page ${p} Safety: 3NF preserves all functional dependencies.`
        ],
        code: (p) => `-- Page ${p} - BCNF Normalized Schema
CREATE TABLE Students (
    roll_no VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dept_id INT REFERENCES Departments(dept_id)
);`
      },
      {
        topic: "Advanced SQL: Window Functions, PARTITION BY & CTEs",
        concept: (p, sub) => `Page ${p} of 150 — SQL Window Functions & CTEs (Module ${sub})\nWindow functions perform calculations across sets of rows related to the current query row without collapsing rows like GROUP BY.\n\nWindow Functions:\nROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD(), SUM() OVER (PARTITION BY dept_id ORDER BY score DESC).`,
        invariants: (p) => [
          `Page ${p} Invariant: RANK() leaves gaps after ties; DENSE_RANK() does NOT leave gaps.`,
          `Page ${p} Rule: Common Table Expressions (WITH cte AS) improve query readability and recursion.`,
          `Page ${p} Safety: Filter window function results using outer WHERE clauses.`
        ],
        code: (p) => `-- Page ${p} - SQL Window Function Ranking Query
SELECT roll_no, name, dept_id, score,
       DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY score DESC) as dept_rank
FROM StudentMarks;`
      },
      {
        topic: "B+ Tree Indexing, Search Mechanics & Node Splitting",
        concept: (p, sub) => `Page ${p} of 150 — B+ Tree Index Architecture (Module ${sub})\nB+ Trees are self-balancing search trees optimized for block storage storage read/write access.\n\nB+ Tree Key Properties:\n1. All data records/pointers are stored exclusively in Leaf Nodes.\n2. Internal Nodes store search keys solely for routing.\n3. Leaf Nodes are linked sequentially via a doubly linked list, enabling O(log N) point queries AND lightning-fast range scans!`,
        invariants: (p) => [
          `Page ${p} Invariant: Every internal node (except root) contains at least ceil(M/2) children.`,
          `Page ${p} Rule: Node splitting occurs when key count exceeds M - 1 capacity.`,
          `Page ${p} Safety: Range queries execute via leaf node traversal without re-searching root.`
        ],
        code: (p) => `-- Page ${p} - Creating B+ Tree Index
CREATE INDEX idx_student_dept_score ON StudentMarks(dept_id, score DESC);`
      },
      {
        topic: "Transaction ACID Properties & Conflict Serializability Schedules",
        concept: (p, sub) => `Page ${p} of 150 — Transaction Processing & ACID (Module ${sub})\nA Transaction is a logical unit of database execution.\n\nACID Properties:\n- Atomicity: All operations complete, or entire transaction rolls back.\n- Consistency: Database transitions from one valid state to another.\n- Isolation: Concurrent transactions execute without mutual interference.\n- Durability: Committed transaction updates persist permanently across crashes.`,
        invariants: (p) => [
          `Page ${p} Invariant: Conflict Serializability requires precedence graph to be a Directed Acyclic Graph (DAG).`,
          `Page ${p} Rule: Two operations conflict if they belong to different transactions, access same item, and at least one is a Write.`,
          `Page ${p} Safety: Use ROLLBACK to undo uncommitted transaction updates.`
        ],
        code: (p) => `-- Page ${p} - SQL Transaction Control
BEGIN TRANSACTION;
UPDATE Accounts SET balance = balance - 500 WHERE id = 101;
UPDATE Accounts SET balance = balance + 500 WHERE id = 102;
COMMIT;`
      },
      {
        topic: "Concurrency Control: Two-Phase Locking (2PL) & MVCC",
        concept: (p, sub) => `Page ${p} of 150 — Concurrency Control & 2PL (Module ${sub})\nConcurrency control protocols regulate concurrent transaction execution.\n\nTwo-Phase Locking (2PL):\n1. Growing Phase: Transaction acquires locks; no locks are released.\n2. Shrinking Phase: Transaction releases locks; no new locks can be acquired.\n\nStrict 2PL:\nStrict 2PL releases all exclusive locks ONLY at transaction Commit/Abort, preventing Cascading Aborts!`,
        invariants: (p) => [
          `Page ${p} Invariant: Shared (Read) locks allow concurrent readers; Exclusive (Write) locks block all access.`,
          `Page ${p} Rule: Multi-Version Concurrency Control (MVCC) enables readers to read old versions without blocking writers.`,
          `Page ${p} Safety: Deadlock detection uses Wait-For Graphs (WFG).`
        ],
        code: (p) => `-- Page ${p} - Pessimistic Locking Query
SELECT * FROM Accounts WHERE id = 101 FOR UPDATE;`
      },
      {
        topic: "Database Crash Recovery, Write-Ahead Logging (WAL) & ARIES",
        concept: (p, sub) => `Page ${p} of 150 — Crash Recovery & ARIES Algorithm (Module ${sub})\nCrash recovery algorithms restore database consistency following hardware or OS power failures.\n\nWrite-Ahead Logging (WAL) Invariant:\nLog records describing database changes MUST be flushed to persistent disk storage BEFORE the corresponding dirty data pages are written to disk!`,
        invariants: (p) => [
          `Page ${p} Invariant: ARIES Recovery performs 3 phases: Analysis Phase, Redo Phase, and Undo Phase.`,
          `Page ${p} Rule: LSN (Log Sequence Number) tracks page modification history.`,
          `Page ${p} Safety: Compensation Log Records (CLRs) prevent infinite loops during recovery restarts.`
        ],
        code: (p) => `-- Page ${p} - WAL Checkpoint Command
CHECKPOINT;`
      },
      {
        topic: "Query Optimization, Execution Plans & Join Algorithms",
        concept: (p, sub) => `Page ${p} of 150 — Query Optimization & Joins (Module ${sub})\nThe Query Optimizer translates SQL declarative queries into efficient physical execution plans.\n\nPhysical Join Strategies:\n- Nested Loop Join: Best for small datasets with indexed inner table.\n- Hash Join: Builds hash table on smaller relation; probes with larger relation. Best for unindexed large tables.\n- Sort-Merge Join: Sorts both relations; merges matching join keys. Optimal for presorted index data.`,
        invariants: (p) => [
          `Page ${p} Invariant: Database statistics (histograms) drive cost-based query estimation.`,
          `Page ${p} Rule: Push down Selection (σ) operations early in relational algebra tree to minimize intermediate tuple sizes.`,
          `Page ${p} Safety: Analyze query plans using EXPLAIN ANALYZE commands.`
        ],
        code: (p) => `-- Page ${p} - Inspect Execution Plan
EXPLAIN ANALYZE
SELECT s.name, d.dept_name 
FROM Students s 
JOIN Departments d ON s.dept_id = d.dept_id;`
      },
      {
        topic: "NoSQL Databases: Document, Key-Value, Columnar & Graph",
        concept: (p, sub) => `Page ${p} of 150 — NoSQL Database Systems (Module ${sub})\nNoSQL databases relax ACID requirements for horizontal scaling and schema flexibility (BASE: Basically Available, Soft-state, Eventual consistency).\n\nCAP Theorem:\nA distributed system can simultaneously guarantee at most 2 out of 3 properties: Consistency, Availability, Partition Tolerance.`,
        invariants: (p) => [
          `Page ${p} Invariant: Document databases (MongoDB) store data as flexible JSON/BSON documents.`,
          `Page ${p} Rule: Key-Value stores (Redis) provide sub-millisecond in-memory lookups.`,
          `Page ${p} Safety: Columnar stores (Cassandra) optimize analytical queries over huge datasets.`
        ],
        code: (p) => `// Page ${p} - MongoDB Aggregation Pipeline
db.students.aggregate([
  { $match: { score: { $gte: 80 } } },
  { $group: { _id: "$dept_id", avgScore: { $avg: "$score" } } }
]);`
      },
      {
        topic: "Oxford Examination Review & DBMS Solved Problems",
        concept: (p, sub) => `Page ${p} of 150 — Oxford University Exam Questions (Module ${sub})\nComprehensive DBMS exam prep covering B+ tree node splits, BCNF decomposition proofs, and conflict serializability graphs.`,
        invariants: (p) => [
          `Page ${p} Exam Rule: A relation is in BCNF if all non-trivial FDs have a super key on the left side.`,
          `Page ${p} Exam Rule: Strict 2PL guarantees serializability and prevents cascading rollbacks.`,
          `Page ${p} Exam Rule: B+ Tree fan-out determines maximum tree height for N records.`
        ],
        code: (p) => `-- Page ${p} - DBMS Exam Review Complete
SELECT 'Oxford DBMS Examination Solved' as status;`
      }
    ]
  };

  const list = blueprints[courseId] || blueprints['c-lang'];
  const pages = [];

  for (let i = 1; i <= 150; i++) {
    const bpIndex = (i - 1) % list.length;
    const subModule = Math.floor((i - 1) / list.length) + 1;
    const bp = list[bpIndex];

    pages.push({
      pageNo: i,
      chapterTitle: `Page ${i} of 150: ${bp.topic}`,
      conceptOverview: bp.concept(i, subModule),
      keyInvariants: bp.invariants(i),
      codeSnippet: bp.code(i)
    });
  }

  return pages;
};

const rawCoursesData = [
  {
    id: 'c-lang',
    title: 'C Programming',
    subtitle: 'The Complete Course (150 Pages)',
    basedOn: 'Based on "The C Programming Language" by Kernighan & Ritchie (Oxford Academic Edition)',
    chaptersCount: 150,
    bgGradient: 'from-teal-700 via-teal-800 to-cyan-900',
    accentColor: 'teal',
    badge: '150 PAGES',
  },
  {
    id: 'cpp-dsa',
    title: 'C++ & Data Structures',
    subtitle: 'Advanced Oxford Guide (150 Pages)',
    basedOn: 'Based on "Data Structures and Algorithm Analysis in C++" by Mark Allen Weiss',
    chaptersCount: 150,
    bgGradient: 'from-orange-700 via-amber-800 to-red-900',
    accentColor: 'orange',
    badge: '150 PAGES',
  },
  {
    id: 'java-oop',
    title: 'Java Programming & OOPs',
    subtitle: 'Enterprise Architecture (150 Pages)',
    basedOn: 'Based on "Java: The Complete Reference" by Herbert Schildt (Oxford Edition)',
    chaptersCount: 150,
    bgGradient: 'from-blue-700 via-indigo-800 to-slate-900',
    accentColor: 'blue',
    badge: '150 PAGES',
  },
  {
    id: 'python-ai',
    title: 'Python for AI & Data Science',
    subtitle: 'Complete Handbook (150 Pages)',
    basedOn: 'Based on "Python Data Science Handbook" by Jake VanderPlas (Oxford AI Edition)',
    chaptersCount: 150,
    bgGradient: 'from-red-700 via-rose-800 to-pink-900',
    accentColor: 'red',
    badge: '150 PAGES',
  },
  {
    id: 'os-systems',
    title: 'Operating Systems & Kernel Concepts',
    subtitle: 'Oxford Systems Series (150 Pages)',
    basedOn: 'Based on "Operating System Concepts" by Silberschatz, Galvin & Gagne',
    chaptersCount: 150,
    bgGradient: 'from-emerald-700 via-teal-800 to-cyan-950',
    accentColor: 'emerald',
    badge: '150 PAGES',
  },
  {
    id: 'dbms-sql',
    title: 'Database Management Systems (DBMS)',
    subtitle: 'Relational & NoSQL Architecture (150 Pages)',
    basedOn: 'Based on "Database System Concepts" by Korth, Silberschatz & Sudarshan',
    chaptersCount: 150,
    bgGradient: 'from-purple-700 via-indigo-800 to-slate-950',
    accentColor: 'purple',
    badge: '150 PAGES',
  }
];

const courses = rawCoursesData.map(c => ({
  ...c,
  pages: generate150PagesForBook(c.id, c.title)
}));

export default function CourseBookLibrary({ isDarkMode }) {
  const [activeBook, setActiveBook] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleOpenBook = (course) => {
    setActiveBook(course);
    setActivePage(0);
  };

  const handleNextPage = () => {
    if (!activeBook || activePage >= activeBook.pages.length - 1) return;
    setIsFlipping(true);
    setTimeout(() => {
      setActivePage(prev => prev + 1);
      setIsFlipping(false);
    }, 150);
  };

  const handlePrevPage = () => {
    if (activePage <= 0) return;
    setIsFlipping(true);
    setTimeout(() => {
      setActivePage(prev => prev - 1);
      setIsFlipping(false);
    }, 150);
  };

  const handleJumpPages = (delta) => {
    if (!activeBook) return;
    const target = Math.max(0, Math.min(activeBook.pages.length - 1, activePage + delta));
    setIsFlipping(true);
    setTimeout(() => {
      setActivePage(target);
      setIsFlipping(false);
    }, 150);
  };

  return (
    <div id="library" className="w-full bg-white text-slate-800 font-sans select-none overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
      


      {/* 2. FULL-WIDTH HERO WOODEN BOOKSHELF BANNER (Matching user screenshot) */}
      <div className="relative w-full h-64 sm:h-80 md:h-[400px] overflow-hidden bg-[#494D5F]">
        <img 
          src="/images/bookshelf_banner.jpg" 
          alt="Wooden Bookshelf Library Showcase"
          className="w-full h-full object-cover opacity-95 hover:scale-103 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#494D5F]/50 via-transparent to-transparent"></div>
      </div>

      {/* 3. HEADLINE & INTRO SUBTITLE */}
      <div className="max-w-4xl mx-auto text-center py-12 px-6 space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2b2b2b] tracking-tight">
          Find your new book!
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed font-serif italic">
          Explore our comprehensive collection of textbook references, course materials, and recommended reading for your engineering degree curriculum.
        </p>
      </div>

      {/* 4. FEATURED PRODUCTS (6 BOOK CARDS GRID) */}
      <section className="max-w-5xl mx-auto px-6 py-6 space-y-8">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-xs sm:text-sm font-bold tracking-widest text-[#3b3b3b] uppercase">
            FEATURED PRODUCTS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, idx) => {
            const cardBgColors = [
              'bg-[#c25969]', // 1. Pink/Red
              'bg-[#4c849e]', // 2. Ocean Blue
              'bg-[#4a8f82]', // 3. Teal/Green
              'bg-[#7c3d5e]', // 4. Dark Magenta
              'bg-[#9c84b8]', // 5. Purple/Lavender
              'bg-[#3b4779]'  // 6. Slate/Navy
            ];
            const currentBg = cardBgColors[idx % cardBgColors.length];

            return (
              <div
                key={course.id}
                onClick={() => handleOpenBook(course)}
                className={`${currentBg} text-white p-6 rounded-none transition transform hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col justify-between min-h-[220px] text-center relative overflow-hidden group`}
              >
                {/* Subtle texture grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] opacity-10"></div>

                <div className="relative z-10 space-y-3 my-auto">
                  <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-wider leading-snug px-2">
                    {course.title}
                  </h3>
                  <p className="text-[11px] opacity-80 leading-relaxed font-serif px-2 italic line-clamp-3">
                    {course.basedOn}
                  </p>
                </div>

                <div className="relative z-10 pt-3 border-t border-white/20 text-[10px] font-mono tracking-widest uppercase opacity-90 group-hover:opacity-100 flex items-center justify-center space-x-1">
                  <span>Read 150-Page Book</span>
                  <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>


      </section>



      {/* Oxford Reader Modal synced to theme */}
      {activeBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between bg-blue-950 px-6 py-4 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>📖 {activeBook.title}</span>
                    <span className="text-xs font-mono text-blue-200 bg-blue-900 border border-blue-800 px-2 py-0.5 rounded">
                      150 Pages Total
                    </span>
                  </h4>
                  <p className="text-xs text-blue-200/80 font-mono">{activeBook.basedOn}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Page Selector Dropdown */}
                <select
                  value={activePage}
                  onChange={(e) => {
                    setIsFlipping(true);
                    const pg = Number(e.target.value);
                    setTimeout(() => {
                      setActivePage(pg);
                      setIsFlipping(false);
                    }, 150);
                  }}
                  className="bg-blue-900 text-white font-mono text-xs font-bold py-1.5 px-3 rounded-lg border border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer max-w-[240px] sm:max-w-[320px]"
                >
                  {activeBook.pages.map((p, idx) => (
                    <option key={idx} value={idx}>
                      Page {p.pageNo} of 150: {p.chapterTitle.replace(/^Page \d+ of 150:\s*/, '').slice(0, 32)}...
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setActiveBook(null)}
                  className="text-blue-200 hover:text-white bg-blue-900 hover:bg-blue-800 p-2 rounded-full transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 bg-slate-50">
              
              <div className={`transition-all duration-200 ${isFlipping ? 'opacity-20 scale-95' : 'opacity-100 scale-100'}`}>
                
                <div className="flex justify-between items-center pb-3 border-b border-slate-200 text-xs font-mono text-blue-900">
                  <span className="flex items-center gap-1.5 font-bold">
                    <BookOpen className="w-4 h-4 text-blue-700" />
                    PAGE {activeBook.pages[activePage].pageNo} OF 150
                  </span>
                  <span className="text-slate-500 font-semibold uppercase tracking-wider">OXFORD UNIVERSITY PRESS • R23 ACADEMIC EDITION</span>
                </div>

                <div className="mt-5 space-y-6">
                  
                  {/* Chapter Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                    <GraduationCap className="w-6 h-6 text-blue-900 shrink-0" />
                    <span>{activeBook.pages[activePage].chapterTitle}</span>
                  </h3>

                  {/* Concept Explanation */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-blue-900 uppercase tracking-wide block font-mono flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-blue-700" />
                      Academic Concept Breakdown & Memory Architecture:
                    </span>
                    <div className="text-slate-700 text-xs sm:text-sm leading-relaxed font-sans bg-white p-5 rounded-xl border border-slate-200 whitespace-pre-line shadow-sm">
                      {activeBook.pages[activePage].conceptOverview}
                    </div>
                  </div>

                  {/* Mandatory Invariants */}
                  {activeBook.pages[activePage].keyInvariants && (
                    <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl space-y-2 text-amber-950">
                      <span className="text-xs font-bold text-amber-900 font-mono flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        Key Algorithmic Invariants & Examination Rules:
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-xs text-amber-900 font-sans">
                        {activeBook.pages[activePage].keyInvariants.map((inv, idx) => (
                          <li key={idx} className="leading-relaxed">
                            <span className="font-medium">{inv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Production Code */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 font-mono flex items-center gap-1.5">
                      <FileCode className="w-4 h-4 text-emerald-600" />
                      Production Reference Implementation & Testcases:
                    </span>
                    <pre className="bg-slate-900 border border-slate-800 p-5 rounded-xl text-xs text-emerald-400 font-mono overflow-x-auto shadow-inner leading-relaxed">
                      <code>{activeBook.pages[activePage].codeSnippet}</code>
                    </pre>
                  </div>

                </div>
              </div>
            </div>

            {/* Modal Bottom Bar with Jump Controls */}
            <div className="flex flex-wrap justify-between items-center bg-white px-6 py-4 border-t border-slate-200 gap-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleJumpPages(-10)}
                  disabled={activePage === 0}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
                    activePage === 0 ? 'opacity-40 bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer'
                  }`}
                >
                  -10 Pages
                </button>
                <button
                  onClick={handlePrevPage}
                  disabled={activePage === 0}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                    activePage === 0 ? 'opacity-40 bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-200 hover:bg-slate-300 text-slate-800 cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              </div>

              <div className="text-center font-mono font-bold text-blue-950 text-xs flex items-center space-x-2">
                <span>Page</span>
                <input 
                  type="number"
                  min={1}
                  max={activeBook.pages.length}
                  value={activePage + 1}
                  onChange={(e) => {
                    const val = Math.max(1, Math.min(activeBook.pages.length, Number(e.target.value) || 1));
                    setActivePage(val - 1);
                  }}
                  className="w-16 px-2 py-1 text-center bg-slate-100 border border-slate-300 rounded text-xs font-bold text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span>of 150</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleNextPage}
                  disabled={activePage >= activeBook.pages.length - 1}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                    activePage >= activeBook.pages.length - 1 ? 'opacity-40 bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-800 text-white cursor-pointer shadow-sm'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleJumpPages(10)}
                  disabled={activePage >= activeBook.pages.length - 1}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
                    activePage >= activeBook.pages.length - 1 ? 'opacity-40 bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer'
                  }`}
                >
                  +10 Pages
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
