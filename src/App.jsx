import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import SyllabusExplorer from './components/SyllabusExplorer';
import CodingExamModule from './components/CodingExamModule';
import TasksDashboard from './components/TasksDashboard';
import AuthModal from './components/AuthModal';
import VideoPlayerModal from './components/VideoPlayerModal';
import AIChatBot from './components/AIChatBot';

import AdditionalSyllabus from './components/AdditionalSyllabus';
import CourseBookLibrary from './components/CourseBookLibrary';
import PartitionGridDashboard from './components/PartitionGridDashboard';

import { LogOut, User, Search, BookOpen, CheckSquare, Code, Library, Home, Bot } from 'lucide-react';

import { 
  r23SyllabusData, 
  initialStudentTasks, 
  r23EvaluationRules 
} from './data/r23Data';

export default function SkillStackHeroApp() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Single active view navigation state ('overview' | 'syllabus' | 'course-library' | 'tasks' | 'coding-exam')
  const [activeTab, setActiveTab] = useState('overview');

  // Theme state forced to Light Mode
  const [isDarkMode] = useState(false);

  // Auth state persisted in localStorage
  const [userSession, setUserSession] = useState(() => {
    const saved = localStorage.getItem('r23_user_session');
    return saved ? JSON.parse(saved) : null;
  });

  // Tasks state
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('r23_student_tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialStudentTasks;
  });

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [externalAiQuery, setExternalAiQuery] = useState(null);

  const handleAskAITutor = (topicQuery) => {
    setExternalAiQuery(topicQuery || 'Hi AI Tutor! I need help with my R23 CSE coursework.');
  };

  const handleNavigate = (tabId, subjectCode) => {
    if (tabId === 'courses' || tabId === 'syllabus') {
      setActiveTab('syllabus');
      if (subjectCode) {
        setSearchQuery(subjectCode);
      }
    } else if (tabId === 'partitions') {
      setActiveTab('overview');
    } else {
      setActiveTab(tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Persist tasks in localStorage
  useEffect(() => {
    localStorage.setItem('r23_student_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Persist user session
  useEffect(() => {
    if (userSession) {
      localStorage.setItem('r23_user_session', JSON.stringify(userSession));
    } else {
      localStorage.removeItem('r23_user_session');
    }
  }, [userSession]);

  const handleLoginSuccess = (userData) => {
    setUserSession(userData);
  };

  const handleLogout = () => {
    setUserSession(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#E5EAF5] text-[#494D5F] transition-colors duration-300">
      
      {/* Top Header Navigation Bar */}
      <header className="px-6 md:px-8 py-3.5 flex flex-wrap justify-between items-center sticky top-0 z-40 backdrop-blur-xl bg-white/90 border-b border-[#D0BDF4] shadow-xs text-[#494D5F] transition-colors gap-3">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavigate('overview')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <img src="/favicon.svg" alt="SkillStack Logo" className="w-8 h-8 object-contain" />
          <span className="font-extrabold tracking-tight text-lg text-[#494D5F] group-hover:text-[#8458B3] transition">
            SkillStack
          </span>
        </div>

        {/* Center Search & Top Navigation Bar Tabs */}
        <div className="flex items-center space-x-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-2.5 text-[#8458B3]/60" size={14} />
            <input 
              type="text" 
              placeholder="Search curriculum..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim().length > 0) {
                  handleNavigate('syllabus');
                }
              }}
              className="w-48 xl:w-60 rounded-xl pl-8 pr-3 py-1.5 text-xs transition focus:outline-none bg-[#E5EAF5]/70 border border-[#D0BDF4] text-[#494D5F] placeholder-[#494D5F]/50 focus:border-[#8458B3] focus:bg-white"
            />
          </div>

          <nav className="flex items-center space-x-1 bg-[#E5EAF5] p-1 rounded-2xl border border-[#D0BDF4] overflow-x-auto">
            {[
              { id: 'overview', label: 'Home', icon: Home },
              { id: 'course-library', label: 'Library', icon: Library },
              { id: 'tasks', label: 'Tasks', icon: CheckSquare },
              { id: 'coding-exam', label: 'Labs', icon: Code }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.id === 'syllabus' && activeTab === 'courses');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
                    isActive 
                      ? 'bg-[#8458B3] text-white shadow-sm' 
                      : 'text-[#494D5F] hover:text-[#8458B3] hover:bg-white/80'
                  }`}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Student Profile & Login Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleAskAITutor('Hi AI Tutor! I need help with my R23 CSE coursework.')}
            className="bg-[#D0BDF4]/30 hover:bg-[#D0BDF4]/60 text-[#8458B3] border border-[#D0BDF4] text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-2xs flex items-center space-x-1.5 cursor-pointer"
            title="Help & Support"
          >
            <Bot size={15} />
            <span>Help & Support</span>
          </button>

          <span className="text-xs font-medium px-2.5 py-1 rounded-md border bg-[#E5EAF5] text-[#494D5F] border-[#D0BDF4] hidden xl:inline">
            Narayana Eng. • CSE (AI & DS)
          </span>

          {userSession ? (
            <div className="flex items-center space-x-2 bg-[#E5EAF5] px-3 py-1 rounded-xl border border-[#D0BDF4]">
              <span className="text-xs font-bold text-[#494D5F]">{userSession.name}</span>
              <span className="text-[10px] font-mono text-[#8458B3] bg-[#D0BDF4]/30 px-1.5 py-0.5 rounded border border-[#D0BDF4]">
                {userSession.rollNo}
              </span>
              <button
                onClick={handleLogout}
                className="p-1 text-[#494D5F]/60 hover:text-red-500 transition cursor-pointer ml-1"
                title="Logout"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-[#8458B3] hover:bg-[#7347a0] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm cursor-pointer flex items-center space-x-1.5"
            >
              <User size={14} />
              <span>Student Login</span>
            </button>
          )}
        </div>

      </header>

      {/* Main Full-Width Content Container */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Overview Tab Hero Header */}
        {(activeTab === 'overview' || activeTab === 'partitions') && (
          <HeroSection
            onNavigate={handleNavigate}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            isDarkMode={isDarkMode}
          />
        )}

        {/* Tabbed Content View (Single Active View - 100% Full Width) */}
        <div className="p-6 md:p-8 max-w-6xl mx-auto w-full space-y-8 mt-2">
          
          {/* VIEW 1: OVERVIEW & QUICK PARTITIONS */}
          {(activeTab === 'overview' || activeTab === 'partitions') && (
            <section id="partitions" className="scroll-mt-20">
              <PartitionGridDashboard
                onNavigate={handleNavigate}
                onAskAITutor={handleAskAITutor}
                isDarkMode={isDarkMode}
              />
            </section>
          )}

          {/* VIEW 2: COURSES & R23 SYLLABUS EXPLORER (Shown ONLY when Courses / Syllabus is selected) */}
          {(activeTab === 'syllabus' || activeTab === 'courses') && (
            <section id="syllabus" className="scroll-mt-20 space-y-8 animate-in fade-in duration-300">
              <SyllabusExplorer
                syllabusData={r23SyllabusData}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onWatchVideo={(video) => setActiveVideo(video)}
                onAskAITutor={handleAskAITutor}
                isDarkMode={isDarkMode}
              />
              <AdditionalSyllabus isDarkMode={isDarkMode} />
            </section>
          )}

          {/* VIEW 3: COURSE BOOK LIBRARY */}
          {activeTab === 'course-library' && (
            <section id="course-library" className="scroll-mt-20 animate-in fade-in duration-300">
              <CourseBookLibrary isDarkMode={isDarkMode} />
            </section>
          )}

          {/* VIEW 4: TASK PORTAL & TESTS */}
          {activeTab === 'tasks' && (
            <section id="tasks" className="scroll-mt-20 animate-in fade-in duration-300">
              <TasksDashboard
                tasks={tasks}
                setTasks={setTasks}
                userSession={userSession}
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
                isDarkMode={isDarkMode}
              />
            </section>
          )}

          {/* VIEW 5: CODING EXAM & LABS */}
          {activeTab === 'coding-exam' && (
            <section id="coding-exam" className="scroll-mt-20 animate-in fade-in duration-300">
              <CodingExamModule isDarkMode={isDarkMode} />
            </section>
          )}

        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white text-center py-4 text-xs mt-auto print:hidden text-slate-500">
          <p>© 2026 Narayana Engineering College - R23 Regulation Portal. Department of CSE (AI & DS).</p>
        </footer>

      </main>

      {/* Floating Global AI Chatbot Widget */}
      <AIChatBot
        isDarkMode={isDarkMode}
        userSession={userSession}
        embedded={false}
        externalQuery={externalAiQuery}
        onClearExternalQuery={() => setExternalAiQuery(null)}
      />

      {/* Auth & Video Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <VideoPlayerModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

    </div>
  );
}
