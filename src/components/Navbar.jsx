import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Search, 
  Menu, 
  X, 
  LogOut, 
  UserCheck, 
  Sparkles,
  BookOpen,
  CheckSquare,
  BarChart3,
  GraduationCap
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  isDarkMode, 
  setIsDarkMode, 
  userSession, 
  onOpenAuthModal, 
  onLogout,
  searchQuery,
  setSearchQuery
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Home' },
    { id: 'syllabus', label: 'R23 Syllabus' },
    { id: 'library', label: 'Course Library', isHighlight: true },
    { id: 'tasks', label: 'Task Portal' },
    { id: 'coding-exam', label: 'Coding Exam', isHighlight: true }
  ];

  return (
    <nav className="bg-blue-900 text-white border-b border-blue-800 sticky top-0 z-50 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* EduNest Brand Logo */}
        <div 
          onClick={() => setActiveTab('overview')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <img src="/favicon.svg" alt="SkillStack Logo" className="w-8 h-8 object-contain" />
          <span className="font-semibold text-lg tracking-tight text-white group-hover:text-blue-100 transition-colors">
            SkillStack
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-blue-100">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`transition-all hover:text-white ${
                  item.isHighlight ? 'font-semibold text-white' : ''
                } ${
                  isActive ? 'text-white font-bold border-b-2 border-white pb-0.5' : ''
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Search & Action Controls */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative w-40">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-blue-300" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-blue-950/60 text-white text-xs pl-8 pr-3 py-1.5 rounded border border-blue-700/60 focus:outline-none focus:border-white placeholder:text-blue-300"
            />
          </div>

          {userSession ? (
            <div className="flex items-center space-x-3 pl-3 border-l border-blue-800">
              <div className="text-right">
                <p className="text-xs font-bold text-white">{userSession.name}</p>
                <p className="text-[10px] text-blue-200 font-mono">{userSession.rollNo}</p>
              </div>
              <button
                onClick={onLogout}
                className="p-1.5 rounded bg-blue-800 hover:bg-blue-700 text-blue-100"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="bg-white hover:bg-blue-50 text-blue-900 text-sm font-semibold px-4 py-2 rounded transition shadow-sm"
            >
              Student Login
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded bg-blue-800 text-blue-100 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-950 border-t border-blue-800 px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 text-sm font-medium ${
                activeTab === item.id ? 'text-white font-bold' : 'text-blue-200'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-blue-800 flex justify-between items-center">
            {userSession ? (
              <span className="text-xs text-blue-200 font-mono">{userSession.rollNo}</span>
            ) : (
              <button
                onClick={() => {
                  onOpenAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-white text-blue-900 text-xs font-semibold py-2 rounded shadow-sm"
              >
                Student Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
