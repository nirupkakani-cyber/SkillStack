process.env.NODE_ENV = 'test';
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';

let app;
let server;
let baseUrl;
const TEST_PORT = 5055;

before(async () => {
  process.env.NODE_ENV = 'test';
  const serverModule = await import('../server.js');
  app = serverModule.default;
  return new Promise((resolve) => {
    server = app.listen(TEST_PORT, () => {
      baseUrl = `http://localhost:${TEST_PORT}`;
      console.log(`Test server running at ${baseUrl}`);
      resolve();
    });
  });
});

after(() => {
  return new Promise((resolve) => {
    if (server) {
      server.close(() => {
        console.log('Test server shut down.');
        resolve();
      });
    } else {
      resolve();
    }
  });
});

test('GET /api/notes/R23-CS301/unit1 - returns Data Structures Unit 1 notes', async () => {
  const res = await fetch(`${baseUrl}/api/notes/R23-CS301/unit1`);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.ok(data.topicTitle, 'Topic title should exist');
  assert.ok(Array.isArray(data.sections), 'Sections should be an array');
});

test('GET /api/notes/R23-CS303/unit3 - returns DBMS Unit 3 notes', async () => {
  const res = await fetch(`${baseUrl}/api/notes/R23-CS303/unit3`);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.ok(data.topicTitle.includes('Database') || data.topicTitle.includes('DBMS'), 'Topic title should mention Database/DBMS');
  assert.ok(Array.isArray(data.sections), 'Sections should be an array');
});

test('POST /api/chat - returns academic AI tutor response object', async () => {
  const res = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Explain Stacks in Data Structures', domain: 'Data Structures' })
  });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.ok('reply' in data, 'Response should contain reply property');
  assert.ok('source' in data, 'Response should contain source property');
});

test('POST /api/render-manim-video - returns video stream URL for unit', async () => {
  const res = await fetch(`${baseUrl}/api/render-manim-video`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sceneName: 'R23SyllabusUnit', targetType: 'syllabus', targetId: 'unit1' })
  });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.ok(data.videoUrl, 'Response should contain videoUrl');
  assert.equal(data.sceneName, 'R23SyllabusUnit');
});

test('POST /api/generate-ai-video - returns AI avatar video tutorial URL', async () => {
  const res = await fetch(`${baseUrl}/api/generate-ai-video`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topicTitle: 'Stacks ADT', scriptText: 'Welcome students', targetType: 'syllabus', targetId: 'unit1' })
  });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.ok(data.videoUrl, 'Response should contain videoUrl');
  assert.ok(data.jobId, 'Response should contain jobId');
});

test('POST /api/login - handles student login credentials', async () => {
  const res = await fetch(`${baseUrl}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rollNumber: '2571A47017', password: 'password123' })
  });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.rollNumber, '2571A47017');
  assert.ok(data.fullName.includes('Aditya Varma'));
});

test('POST /api/login - returns 401 for incorrect password', async () => {
  const res = await fetch(`${baseUrl}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rollNumber: '23R51A0501', password: 'wrongpass123' })
  });
  assert.equal(res.status, 401);
  const data = await res.json();
  assert.ok(data.error);
});

test('GET / - serves production SPA index.html', async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.ok(text.includes('html') || text.includes('Vite') || text.includes('SkillStack'), 'Should serve HTML index page');
});
