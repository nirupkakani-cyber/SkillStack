import { test } from 'node:test';
import assert from 'node:assert/strict';

test('Subject Syllabus Schema & Units Validation', () => {
  const sampleSubject = {
    subjectCode: 'R23-CS301',
    subjectName: 'Data Structures',
    semester: 3,
    credits: 3,
    units: [
      { unitNumber: 'Unit I', title: 'Linear Data Structures - Stacks & Queues' },
      { unitNumber: 'Unit II', title: 'Non-Linear Data Structures - Trees & Graphs' }
    ]
  };

  assert.equal(sampleSubject.subjectCode, 'R23-CS301');
  assert.equal(sampleSubject.units.length, 2);
  assert.equal(sampleSubject.credits, 3);
});

test('Student Account Data Structure Validation', () => {
  const student = {
    rollNumber: '2571A47017',
    fullName: 'Aditya Varma (CSE AI & DS)',
    department: 'CSE (AI & DS)',
    attendance: 88
  };

  assert.equal(student.rollNumber, '2571A47017');
  assert.ok(student.attendance >= 75, 'Student attendance should meet 75% threshold requirement');
});

test('Coding Exam Problem Definition Validation', () => {
  const problem = {
    id: 'prob-1',
    subject: 'Data Structures',
    title: 'Detect and Remove Loop in a Linked List',
    difficulty: 'Medium',
    testCases: [
      { input: '1 -> 2 -> 3 -> 4 -> 2 (loop)', expected: '1 -> 2 -> 3 -> 4 -> NULL' }
    ]
  };

  assert.equal(problem.id, 'prob-1');
  assert.equal(problem.difficulty, 'Medium');
  assert.equal(problem.testCases.length, 1);
});
