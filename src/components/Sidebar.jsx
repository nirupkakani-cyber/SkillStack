import React from 'react';
import { 
  Home, 
  BookOpen, 
  Library, 
  CheckSquare, 
  Code, 
  Award, 
  Search, 
  User, 
  Menu, 
  LogOut,
  LayoutGrid
} from 'lucide-react';

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  searchQuery,
  setSearchQuery,
  userSession,
  onOpenAuthModal,
  onLogout,
  activeTab,
  onNavigate,
  isDarkMode
}) {
  const navItems = [
    { id: 'overview', label: 'Overview & Partitions', icon: Home },
    { id: 'course-library', label: 'Course Book Library', icon: Library },
    { id: 'tasks', label: 'Task Portal & Tests', icon: CheckSquare },
    { id: 'coding-exam', label: 'Coding Exam & Labs', icon: Code }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Fixed Sidebar Menu */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 shadow-xl ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-slate-200 text-slate-800`}
      >
        
        {/* Sidebar Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-200">
          {isSidebarOpen && (
            <div 
              onClick={() => onNavigate('overview')}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow-xs">R23</span>
              <span className="font-bold text-slate-900 group-hover:text-blue-600 transition">
                SkillStack
              </span>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-1.5 rounded-lg transition hover:bg-slate-100 text-slate-600 cursor-pointer"
            title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Sidebar Search Box */}
        {isSidebarOpen && (
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={15} />
              <input 
                type="text" 
                placeholder="Search curriculum..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim().length > 0) {
                    onNavigate('syllabus');
                  }
                }}
                className="w-full rounded-lg pl-9 pr-3 py-1.5 text-xs transition focus:outline-none bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* Tabbed Single-View Navigation Links */}
        <nav className="flex-1 p-3 space-y-1.5 text-sm font-medium overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'syllabus' && activeTab === 'courses');

            return (
              <button 
                key={item.id}
                onClick={() => onNavigate(item.id)} 
                title={item.label}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition text-left cursor-pointer font-semibold text-xs ${
                  !isSidebarOpen ? 'justify-center px-0' : ''
                } ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <Icon size={18} className="flex-shrink-0" />
                  {isSidebarOpen && <span className="truncate">{item.label}</span>}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer / Profile & Auth */}
        <div className="p-3 border-t border-slate-200 space-y-2">
          {userSession ? (
            <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} p-2.5 rounded-xl border bg-slate-50 border-slate-200`}>
              {isSidebarOpen && (
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate text-slate-900">{userSession.name}</p>
                  <p className="text-[10px] font-mono text-slate-500">{userSession.rollNo}</p>
                </div>
              )}
              <button
                onClick={onLogout}
                className="p-1 rounded-md text-slate-400 hover:text-red-500 transition cursor-pointer"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenAuthModal}
              title="Student Login"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-sm flex items-center justify-center cursor-pointer ${
                isSidebarOpen ? 'space-x-2' : ''
              }`}
            >
              <User size={16} className="flex-shrink-0" />
              {isSidebarOpen && <span>Student Login</span>}
            </button>
          )}
        </div>

      </aside>
    </>
  );
}
