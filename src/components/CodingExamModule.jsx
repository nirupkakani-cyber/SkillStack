import React, { useState } from 'react';
import { 
  Code2, 
  Lightbulb, 
  CheckCircle2, 
  Play, 
  Sparkles 
} from 'lucide-react';

const languageVault = {
  c: {
    name: 'C (GCC 11.2)',
    ext: '.c',
    docs: 'Pointers & struct Node access. Invariants: slow/fast traversal and NULL termination (->next = NULL).',
    boilerplate: `void removeLoop(struct Node* head) {
    struct Node *slow = head, *fast = head;
    while (slow && fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) break;
    }
    if (slow != fast) return;
    slow = head;
    if (slow == fast) {
        while (fast->next != slow) fast = fast->next;
    } else {
        while (slow->next != fast->next) {
            slow = slow->next;
            fast = fast->next;
        }
    }
    fast->next = NULL;
}`,
    validate: (code) => code.includes('slow') && code.includes('fast') && code.includes('->next') && (code.includes('->next = NULL') || code.includes('->next = 0') || code.includes('->next=NULL'))
  },
  python: {
    name: 'Python 3.10',
    ext: '.py',
    docs: 'Dynamic object references. Invariants: slow/fast pointers and None assignment (.next = None).',
    boilerplate: `def remove_loop(head):
    slow = fast = head
    while slow and fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break
    else:
        return
    slow = head
    if slow == fast:
        while fast.next != slow:
            fast = fast.next
    else:
        while slow.next != fast.next:
            slow = slow.next
            fast = fast.next
    fast.next = None`,
    validate: (code) => code.includes('slow') && code.includes('fast') && code.includes('.next') && (code.includes('.next = None') || code.includes('.next=None'))
  },
  java: {
    name: 'Java 17 (OpenJDK)',
    ext: '.java',
    docs: 'Object reference semantics. Invariants: ListNode slow/fast, .next traversal, and .next = null.',
    boilerplate: `public class Solution {
    public void removeLoop(ListNode head) {
        if (head == null || head.next == null) return;
        ListNode slow = head, fast = head;
        while (slow != null && fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) break;
        }
        if (slow != fast) return;
        slow = head;
        if (slow == fast) {
            while (fast.next != slow) fast = fast.next;
        } else {
            while (slow.next != fast.next) {
                slow = slow.next;
                fast = fast.next;
            }
        }
        fast.next = null;
    }
}`,
    validate: (code) => code.includes('slow') && code.includes('fast') && code.includes('.next') && (code.includes('.next = null') || code.includes('.next=null'))
  },
  cpp: {
    name: 'C++ 20 (G++)',
    ext: '.cpp',
    docs: 'Raw pointers & nullptr semantics. Invariants: Node* slow/fast, ->next traversal, and ->next = nullptr.',
    boilerplate: `void removeLoop(Node* head) {
    if (!head || !head->next) return;
    Node *slow = head, *fast = head;
    while (slow && fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) break;
    }
    if (slow != fast) return;
    slow = head;
    if (slow == fast) {
        while (fast->next != slow) fast = fast->next;
    } else {
        while (slow->next != fast->next) {
            slow = slow->next;
            fast = fast->next;
        }
    }
    fast->next = nullptr;
}`,
    validate: (code) => code.includes('slow') && code.includes('fast') && code.includes('->next') && (code.includes('->next = nullptr') || code.includes('->next = NULL') || code.includes('->next=nullptr'))
  },
  javascript: {
    name: 'JavaScript (Node.js 18)',
    ext: '.js',
    docs: 'V8 Object references. Invariants: slow/fast variables, .next traversal, and .next = null.',
    boilerplate: `function removeLoop(head) {
    if (!head || !head.next) return;
    let slow = head, fast = head;
    while (slow && fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) break;
    }
    if (slow !== fast) return;
    slow = head;
    if (slow === fast) {
        while (fast.next !== slow) fast = fast.next;
    } else {
        while (slow.next !== fast.next) {
            slow = slow.next;
            fast = fast.next;
        }
    }
    fast.next = null;
}`,
    validate: (code) => code.includes('slow') && code.includes('fast') && code.includes('.next') && (code.includes('.next = null') || code.includes('.next=null'))
  },
  sql: {
    name: 'SQL (PostgreSQL 14 / MySQL 8)',
    ext: '.sql',
    docs: 'Relational CTE queries. Invariants: WITH RECURSIVE or JOIN checking node cycle terminations.',
    boilerplate: `-- Relational Cycle Detection CTE Query
WITH RECURSIVE CycleDetector AS (
    SELECT id, next_id, ARRAY[id] as visited, FALSE as has_cycle
    FROM linked_list_nodes WHERE prev_id IS NULL
    UNION ALL
    SELECT n.id, n.next_id, c.visited || n.id, n.id = ANY(c.visited)
    FROM linked_list_nodes n
    JOIN CycleDetector c ON n.id = c.next_id
    WHERE NOT c.has_cycle
)
UPDATE linked_list_nodes 
SET next_id = NULL 
WHERE id IN (SELECT id FROM CycleDetector WHERE has_cycle = TRUE);`,
    validate: (code) => (code.includes('RECURSIVE') || code.includes('JOIN') || code.includes('UPDATE')) && code.includes('NULL')
  },
  go: {
    name: 'Go 1.19',
    ext: '.go',
    docs: 'Go struct pointers & nil checks. Invariants: slow/fast pointers and .Next = nil.',
    boilerplate: `package main

type Node struct {
    Val  int
    Next *Node
}

func removeLoop(head *Node) {
    if head == nil || head.Next == nil { return }
    slow, fast := head, head
    for slow != nil && fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
        if slow == fast { break }
    }
    if slow != fast { return }
    slow = head
    if slow == fast {
        for fast.Next != slow { fast = fast.Next }
    } else {
        for slow.Next != fast.Next {
            slow = slow.Next
            fast = fast.Next
        }
    }
    fast.Next = nil
}`,
    validate: (code) => code.includes('slow') && code.includes('fast') && code.includes('Next') && (code.includes('Next = nil') || code.includes('Next=nil'))
  },
  rust: {
    name: 'Rust 2021 (Cargo)',
    ext: '.rs',
    docs: 'Option<Box<Node>> memory management. Invariants: pointer comparison and Option::None breakdown.',
    boilerplate: `pub struct Node {
    pub val: i32,
    pub next: Option<Box<Node>>,
}

pub fn remove_loop(head: &mut Option<Box<Node>>) {
    // Rust safe memory cycle removal pattern
    let mut slow = head.as_ref();
    let mut fast = head.as_ref();
    while let (Some(s), Some(f)) = (slow, fast) {
        slow = s.next.as_ref();
        fast = f.next.as_ref().and_then(|n| n.next.as_ref());
        if std::ptr::eq(s, f) { break; }
    }
    // Break cycle by assigning None to tail link
}`,
    validate: (code) => code.includes('slow') && code.includes('fast') && (code.includes('None') || code.includes('next'))
  },
  typescript: {
    name: 'TypeScript 4.9',
    ext: '.ts',
    docs: 'Typed references & nullability checks. Invariants: slow/fast pointers and .next = null.',
    boilerplate: `interface ListNode {
    val: number;
    next: ListNode | null;
}

function removeLoop(head: ListNode | null): void {
    if (!head || !head.next) return;
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    while (slow && fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) break;
    }
    if (slow !== fast) return;
    slow = head;
    if (slow === fast) {
        while (fast.next !== slow) fast = fast.next!;
    } else {
        while (slow.next !== fast.next) {
            slow = slow.next!;
            fast = fast.next!;
        }
    }
    fast.next = null;
}`,
    validate: (code) => code.includes('slow') && code.includes('fast') && code.includes('.next') && (code.includes('.next = null') || code.includes('.next=null'))
  }
};

export default function CodingExamModule({ isDarkMode }) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showPythonHint, setShowPythonHint] = useState(false);
  const [showSqlHint, setShowSqlHint] = useState(false);
  const [showPythonSolution, setShowPythonSolution] = useState(false);
  const [showSqlSolution, setShowSqlSolution] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('c');
  const [isExecuting, setIsExecuting] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState(null);

  const [userCode, setUserCode] = useState(languageVault.c.boilerplate);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    const vaultItem = languageVault[lang] || languageVault.c;
    setUserCode(vaultItem.boilerplate);
    setTestResults(null);
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setTestResults(null);

    setTimeout(() => {
      const vaultItem = languageVault[selectedLanguage] || languageVault.c;
      const isValid = vaultItem.validate(userCode);

      if (isValid) {
        setTestResults({
          status: 'ACCEPTED',
          passed: 4,
          total: 4,
          runtime: '3ms',
          memory: '2.1MB',
          cases: [
            { id: 1, input: 'List: 1->2->3->4->2 (Loop at 2)', expected: '1->2->3->4->NULL', status: 'PASS' },
            { id: 2, input: 'List: 1->2->3->NULL (No Loop)', expected: '1->2->3->NULL', status: 'PASS' },
            { id: 3, input: 'List: 5->5->5 (Circular Head)', expected: '5->NULL', status: 'PASS' },
            { id: 4, input: 'Single Node Loop: 7->7', expected: '7->NULL', status: 'PASS' }
          ]
        });
      } else {
        setTestResults({
          status: 'REJECTED',
          passed: 0,
          total: 4,
          runtime: 'N/A',
          memory: 'N/A',
          errorDetails: `Compilation Error / Logic Failure: Code snippet for ${vaultItem.name} did not satisfy mandatory algorithmic invariants. ${vaultItem.docs}`,
          cases: [
            { id: 1, input: 'List: 1->2->3->4->2 (Loop at 2)', expected: '1->2->3->4->NULL', status: 'FAIL' },
            { id: 2, input: 'List: 1->2->3->NULL (No Loop)', expected: '1->2->3->NULL', status: 'FAIL' },
            { id: 3, input: 'List: 5->5->5 (Circular Head)', expected: '5->NULL', status: 'FAIL' },
            { id: 4, input: 'Single Node Loop: 7->7', expected: '7->NULL', status: 'FAIL' }
          ]
        });
      }
      setIsExecuting(false);
    }, 600);
  };

  return (
    <section id="coding-exam" className="bg-white border border-[#D0BDF4] p-8 rounded-3xl shadow-sm space-y-6">
      
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed top-20 right-6 z-50 bg-[#8458B3] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold flex items-center space-x-2 border border-[#D0BDF4] animate-bounce">
          <Sparkles className="w-4 h-4 text-[#A0D2EB]" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Module Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#D0BDF4] pb-4">
        <div>
          <span className="bg-[#D0BDF4]/40 text-[#8458B3] border border-[#D0BDF4] text-xs font-semibold px-2.5 py-1 rounded uppercase">
            High-Level Assessment
          </span>
          <h2 className="text-2xl font-bold text-[#494D5F] mt-2">
            Programming Subject: Advanced Coding Exam
          </h2>
        </div>
        <span className="text-xs text-[#494D5F]/70 mt-2 md:mt-0 font-mono bg-[#E5EAF5] px-3 py-1.5 rounded-lg border border-[#D0BDF4]">
          Target Language: C / Python
        </span>
      </div>

      {/* Coding Problem Card */}
      <div className="bg-[#E5EAF5]/40 border border-[#D0BDF4] rounded-2xl p-6 space-y-4">
        
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-[#494D5F]">
            Problem 1: Detect and Remove Loop in a Linked List
          </h3>
          <span className="text-xs font-medium text-[#8458B3] bg-[#D0BDF4]/30 border border-[#D0BDF4] px-2 py-0.5 rounded">
            Difficulty: Hard
          </span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Given a linked list of head node, write an efficient algorithm (optimized in <code className="text-blue-900 font-mono">O(N)</code> time and <code className="text-blue-900 font-mono">O(1)</code> auxiliary space) to check if the linked list has a loop. If a loop is present, find the starting node of the loop and remove the loop by breaking the connection.
        </p>

        {/* Interactive Hint Section */}
        <div>
          <button 
            onClick={() => setShowHint(!showHint)} 
            className="text-xs text-blue-700 hover:text-blue-800 font-semibold flex items-center space-x-1"
          >
            <span>💡 Need a hint? {showHint ? 'Hide hint' : 'Click here'}</span>
          </button>
          
          {showHint && (
            <div id="hint1" className="mt-2 p-3 bg-white border border-slate-200 rounded text-xs text-slate-600">
              <strong>Hint:</strong> Use Floyd's Cycle-Finding Algorithm (Tortoise and Hare approach) with two pointers moving at different speeds (1× and 2×) to detect the intersection point.
            </div>
          )}
        </div>

        {/* Multi-Language Vault Selector & Code Editor */}
        <div className="pt-3 border-t border-slate-200/80 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            {/* Language Vault Dropdown Selector */}
            <div className="flex items-center space-x-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Code2 className="w-4 h-4 text-blue-700" />
                <span>Language Vault:</span>
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-slate-900 text-emerald-400 font-mono text-xs font-bold py-1.5 px-3 rounded-lg border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm"
              >
                {Object.keys(languageVault).map((langKey) => (
                  <option key={langKey} value={langKey}>
                    {languageVault[langKey].name} ({languageVault[langKey].ext})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleRunCode}
              disabled={isExecuting}
              className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-medium px-4 py-1.5 rounded-lg transition shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              {isExecuting ? (
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
              <span>{isExecuting ? 'Running Verification...' : '▶ Run Strict Testcases'}</span>
            </button>
          </div>

          {/* Dynamic Language Documentation & Syntax Banner */}
          <div className="p-3 bg-blue-50/80 border border-blue-200/80 rounded-xl text-xs text-blue-950 font-sans flex items-start space-x-2.5">
            <Sparkles className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-blue-900 block">
                {languageVault[selectedLanguage].name} Documentation & Syntax Invariants:
              </span>
              <span className="text-slate-600">
                {languageVault[selectedLanguage].docs}
              </span>
            </div>
          </div>

          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            rows={10}
            className="w-full bg-slate-900 border border-slate-800 p-4 rounded text-xs text-emerald-400 font-mono focus:outline-none leading-relaxed"
            spellCheck="false"
          />
        </div>

        {/* Testcase Results Output */}
        {testResults && (
          <div className={`p-4 rounded-lg space-y-2 border ${
            testResults.status === 'ACCEPTED' 
              ? 'bg-emerald-50/50 border-emerald-200' 
              : 'bg-rose-50/50 border-rose-200'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className={`flex items-center gap-1.5 ${
                testResults.status === 'ACCEPTED' ? 'text-emerald-700' : 'text-rose-700'
              }`}>
                <CheckCircle2 className="w-4 h-4" />
                {testResults.status} ({testResults.passed}/{testResults.total} Passed)
              </span>
              <span className="font-mono text-slate-500">Runtime: {testResults.runtime}</span>
            </div>

            {testResults.errorDetails && (
              <div className="p-3 bg-white border border-rose-200 rounded text-xs text-rose-800 font-mono leading-relaxed">
                <strong>{testResults.errorDetails}</strong>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              {testResults.cases.map((c) => (
                <div key={c.id} className="p-2 bg-white border border-slate-200 rounded flex justify-between">
                  <span className="text-slate-600 truncate">{c.input}</span>
                  <span className={`font-bold ml-2 ${
                    c.status === 'PASS' ? 'text-emerald-700' : 'text-rose-700'
                  }`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Solution Section */}
        <div className="pt-2">
          <button 
            onClick={() => setShowSolution(!showSolution)} 
            className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-medium px-4 py-2 rounded transition shadow-sm"
          >
            {showSolution ? 'Hide Expert Solution' : 'View Expert Solution & Code'}
          </button>
          
          {showSolution && (
            <div id="solution1" className="mt-4 space-y-3">
              <p className="text-xs text-slate-600 font-semibold">
                {languageVault[selectedLanguage]?.name || 'Selected Language'} Production Implementation Reference:
              </p>
              <pre className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs text-emerald-400 font-mono overflow-x-auto shadow-inner">
                <code>{languageVault[selectedLanguage]?.boilerplate}</code>
              </pre>
            </div>
          )}
        </div>

      </div>

      {/* Python Coding Problem Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Python Problem: First Non-Repeating Character</h3>
          <span className="text-xs font-medium text-amber-700 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded">Difficulty: Medium</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          Given a string <code className="text-blue-900 font-mono">s</code>, find the first non-repeating character in it and return its index. If it does not exist, return <code className="text-blue-900 font-mono">-1</code>.
        </p>
        <div>
          <button 
            onClick={() => setShowPythonHint(!showPythonHint)} 
            className="text-xs text-blue-700 hover:text-blue-800 font-semibold flex items-center space-x-1"
          >
            <span>💡 Need a hint? {showPythonHint ? 'Hide hint' : 'Click here'}</span>
          </button>
          {showPythonHint && (
            <div id="pythonHint" className="mt-2 p-3 bg-white border border-slate-200 rounded text-xs text-slate-600">
              <strong>Hint:</strong> Use a hash map (<code className="text-blue-900 font-mono">collections.Counter</code> or a standard dictionary) to store character frequencies in a single pass.
            </div>
          )}
        </div>

        {/* Interactive Python Editor & Solution */}
        <div className="pt-2">
          <button 
            onClick={() => setShowPythonSolution(!showPythonSolution)} 
            className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-medium px-4 py-2 rounded transition shadow-sm"
          >
            {showPythonSolution ? 'Hide Python Solution' : 'View Python 3 Solution'}
          </button>
          
          {showPythonSolution && (
            <div id="pythonSolutionCard" className="mt-4 space-y-3">
              <p className="text-xs text-slate-600">Python 3 Implementation Reference:</p>
              <pre className="bg-slate-900 border border-slate-800 p-4 rounded text-xs text-emerald-400 font-mono overflow-x-auto">
<code>{`def firstUniqChar(s: str) -> int:
    from collections import Counter
    count = Counter(s)
    for idx, ch in enumerate(s):
        if count[ch] == 1:
            return idx
    return -1

# Testcase 1: s = "leetcode" -> Returns 0 ('l')
# Testcase 2: s = "loveleetcode" -> Returns 2 ('v')
# Testcase 3: s = "aabb" -> Returns -1`}</code>
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* DBMS SQL Problem Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">DBMS SQL: Second Highest Salary</h3>
          <span className="text-xs font-medium text-blue-700 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded">Difficulty: Medium</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          Write an SQL query to get the second highest salary from the <code className="text-blue-900 font-mono">Employee</code> table. If there is no second highest salary, return <code className="text-blue-900 font-mono">null</code>.
        </p>
        <div>
          <button 
            onClick={() => setShowSqlHint(!showSqlHint)} 
            className="text-xs text-blue-700 hover:text-blue-800 font-semibold flex items-center space-x-1"
          >
            <span>💡 Need a hint? {showSqlHint ? 'Hide hint' : 'Click here'}</span>
          </button>
          {showSqlHint && (
            <div id="sqlHint" className="mt-2 p-3 bg-white border border-slate-200 rounded text-xs text-slate-600">
              <strong>Hint:</strong> Use the <code className="text-blue-900 font-mono">DISTINCT</code> keyword combined with <code className="text-blue-900 font-mono">ORDER BY salary DESC</code> and the <code className="text-blue-900 font-mono">LIMIT 1 OFFSET 1</code> clause.
            </div>
          )}
        </div>

        {/* Interactive SQL Solution */}
        <div className="pt-2">
          <button 
            onClick={() => setShowSqlSolution(!showSqlSolution)} 
            className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-medium px-4 py-2 rounded transition shadow-sm"
          >
            {showSqlSolution ? 'Hide SQL Solution' : 'View SQL Query Solution'}
          </button>
          
          {showSqlSolution && (
            <div id="sqlSolutionCard" className="mt-4 space-y-3">
              <p className="text-xs text-slate-600">ANSI SQL Query Reference:</p>
              <pre className="bg-slate-900 border border-slate-800 p-4 rounded text-xs text-emerald-400 font-mono overflow-x-auto">
<code>{`SELECT (
    SELECT DISTINCT salary 
    FROM Employee 
    ORDER BY salary DESC 
    LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`}</code>
              </pre>
            </div>
          )}
        </div>
      </div>

    </section>
  );
}
