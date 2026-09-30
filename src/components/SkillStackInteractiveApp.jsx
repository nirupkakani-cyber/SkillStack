// SkillStack - Dense Free-Floating Neon Computer Hardware Emojis with Mouse Motion Sync (React / JSX)
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  BookOpen, 
  Library, 
  CheckSquare, 
  Code, 
  Award, 
  Menu,
  ArrowRight
} from 'lucide-react';

export default function SkillStackInteractiveApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rollNumber, setRollNumber] = useState('2571A47017');
  const [password, setPassword] = useState('••••••••');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Mouse coordinates for dynamic floating parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 35,
        y: (e.clientY / innerHeight - 0.5) * 35
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (rollNumber.trim() !== '') {
      setIsLoggedIn(true);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const floatingEmojis = [
    { emoji: '🖥️', top: '6%', left: '8%', speedX: 2.5, speedY: 2.2, size: 'w-14 h-14 text-3xl', glow: 'shadow-[0_0_25px_rgba(255,255,255,0.8)] border-2 border-white' },
    { emoji: '💻', top: '14%', left: '20%', speedX: -1.8, speedY: 2.4, size: 'w-12 h-12 text-2xl', glow: 'shadow-[0_0_20px_rgba(255,255,255,0.6)] border border-white/70' },
    { emoji: '🚀', top: '5%', left: '36%', speedX: 3.2, speedY: -1.6, size: 'w-12 h-12 text-2xl', glow: 'shadow-[0_0_22px_rgba(255,255,255,0.7)] border-2 border-white' },
    { emoji: '⚙️', top: '10%', left: '50%', speedX: -2.2, speedY: 2.8, size: 'w-10 h-10 text-xl', glow: 'shadow-[0_0_18px_rgba(255,255,255,0.5)] border border-white/60' },
    { emoji: '🛸', top: '6%', left: '66%', speedX: 3.5, speedY: 1.5, size: 'w-12 h-12 text-2xl', glow: 'shadow-[0_0_22px_rgba(255,255,255,0.7)] border-2 border-white' },
    { emoji: '🖱️', top: '8%', left: '88%', speedX: -2.8, speedY: 3.0, size: 'w-14 h-14 text-3xl', glow: 'shadow-[0_0_25px_rgba(255,255,255,0.8)] border-2 border-white' },
    { emoji: '⌨️', top: '16%', left: '76%', speedX: 2.0, speedY: -2.5, size: 'w-12 h-12 text-2xl', glow: 'shadow-[0_0_20px_rgba(255,255,255,0.6)] border border-white/70' },

    { emoji: '🧠', top: '28%', left: '6%', speedX: 3.2, speedY: -2.6, size: 'w-14 h-14 text-3xl', glow: 'shadow-[0_0_25px_rgba(255,255,255,0.8)] border-2 border-white' },
    { emoji: '⚡', top: '26%', left: '26%', speedX: -2.8, speedY: 2.2, size: 'w-11 h-11 text-xl', glow: 'shadow-[0_0_18px_rgba(255,255,255,0.5)] border border-white/60' },
    { emoji: '🤖', top: '30%', left: '72%', speedX: 2.8, speedY: 3.2, size: 'w-13 h-13 text-2xl', glow: 'shadow-[0_0_22px_rgba(255,255,255,0.7)] border-2 border-white' },
    { emoji: '📡', top: '26%', left: '92%', speedX: -2.4, speedY: -2.8, size: 'w-13 h-13 text-2xl', glow: 'shadow-[0_0_22px_rgba(255,255,255,0.7)] border-2 border-white' },
    { emoji: '🔬', top: '22%', left: '16%', speedX: 2.4, speedY: 2.9, size: 'w-10 h-10 text-xl', glow: 'shadow-[0_0_18px_rgba(255,255,255,0.5)] border border-white/60' },
    { emoji: '💎', top: '20%', left: '83%', speedX: -3.0, speedY: 2.0, size: 'w-11 h-11 text-xl', glow: 'shadow-[0_0_18px_rgba(255,255,255,0.5)] border border-white/60' },

    { emoji: '🎮', top: '48%', left: '4%', speedX: 3.8, speedY: 1.2, size: 'w-14 h-14 text-3xl', glow: 'shadow-[0_0_25px_rgba(255,255,255,0.8)] border-2 border-white' },
    { emoji: '📟', top: '40%', left: '17%', speedX: -2.4, speedY: -2.2, size: 'w-11 h-11 text-xl', glow: 'shadow-[0_0_18px_rgba(255,255,255,0.5)] border border-white/60' },
    { emoji: '💾', top: '50%', left: '94%', speedX: -4.0, speedY: 1.4, size: 'w-14 h-14 text-3xl', glow: 'shadow-[0_0_25px_rgba(255,255,255,0.8)] border-2 border-white' },
    { emoji: '🔌', top: '44%', left: '82%', speedX: 2.2, speedY: -3.0, size: 'w-11 h-11 text-xl', glow: 'shadow-[0_0_18px_rgba(255,255,255,0.5)] border border-white/60' },

    { emoji: '🎧', top: '68%', left: '10%', speedX: 2.8, speedY: -3.2, size: 'w-14 h-14 text-3xl', glow: 'shadow-[0_0_25px_rgba(255,255,255,0.8)] border-2 border-white' },
    { emoji: '📹', top: '63%', left: '24%', speedX: -3.0, speedY: 1.8, size: 'w-11 h-11 text-xl', glow: 'shadow-[0_0_18px_rgba(255,255,255,0.5)] border border-white/60' },
    { emoji: '🖨️', top: '70%', left: '76%', speedX: 2.2, speedY: 3.4, size: 'w-12 h-12 text-2xl', glow: 'shadow-[0_0_20px_rgba(255,255,255,0.6)] border border-white/70' },
    { emoji: '👾', top: '62%', left: '89%', speedX: -3.4, speedY: -2.4, size: 'w-13 h-13 text-2xl', glow: 'shadow-[0_0_22px_rgba(255,255,255,0.7)] border-2 border-white' },

    { emoji: '📷', top: '86%', left: '6%', speedX: 2.6, speedY: -3.6, size: 'w-12 h-12 text-2xl', glow: 'shadow-[0_0_20px_rgba(255,255,255,0.6)] border border-white/70' },
    { emoji: '🔋', top: '88%', left: '20%', speedX: -3.5, speedY: -1.8, size: 'w-11 h-11 text-xl', glow: 'shadow-[0_0_18px_rgba(255,255,255,0.5)] border border-white/60' },
    { emoji: '🌐', top: '88%', left: '40%', speedX: 1.8, speedY: 2.8, size: 'w-14 h-14 text-3xl', glow: 'shadow-[0_0_25px_rgba(255,255,255,0.8)] border-2 border-white' },
    { emoji: '🪐', top: '92%', left: '58%', speedX: -2.6, speedY: -2.5, size: 'w-12 h-12 text-2xl', glow: 'shadow-[0_0_20px_rgba(255,255,255,0.6)] border border-white/70' },
    { emoji: '💿', top: '84%', left: '74%', speedX: 3.0, speedY: -2.8, size: 'w-12 h-12 text-2xl', glow: 'shadow-[0_0_20px_rgba(255,255,255,0.6)] border border-white/70' },
    { emoji: '🕹️', top: '86%', left: '92%', speedX: -3.8, speedY: -3.2, size: 'w-13 h-13 text-2xl', glow: 'shadow-[0_0_22px_rgba(255,255,255,0.7)] border-2 border-white' },

    { emoji: '💡', top: '36%', left: '30%', speedX: 3.5, speedY: 2.0, size: 'w-10 h-10 text-xl', glow: 'shadow-[0_0_18px_rgba(255,255,255,0.5)] border border-white/60' },
    { emoji: '🎯', top: '36%', left: '65%', speedX: -3.2, speedY: -1.8, size: 'w-10 h-10 text-xl', glow: 'shadow-[0_0_18px_rgba(255,255,255,0.5)] border border-white/60' },
    { emoji: '🔍', top: '78%', left: '32%', speedX: 2.2, speedY: -3.0, size: 'w-10 h-10 text-xl', glow: 'shadow-[0_0_18px_rgba(255,255,255,0.5)] border border-white/60' },
    { emoji: '🪟', top: '76%', left: '65%', speedX: -2.5, speedY: 2.6, size: 'w-11 h-11 text-xl', glow: 'shadow-[0_0_18px_rgba(255,255,255,0.5)] border border-white/60' },
    { emoji: '📻', top: '10%', left: '28%', speedX: -1.8, speedY: 3.2, size: 'w-10 h-10 text-xl', glow: 'shadow-[0_0_18px_rgba(255,255,255,0.5)] border border-white/60' },
    { emoji: '🌌', top: '12%', left: '60%', speedX: 2.8, speedY: -2.2, size: 'w-11 h-11 text-xl', glow: 'shadow-[0_0_18px_rgba(255,255,255,0.5)] border border-white/60' }
  ];

  // 1. LOGIN SCREEN WITH DENSE FREE-FLOATING COMPUTER EMOJIS (HIGH-SENSITIVITY MOUSE-SYNCED)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050810] text-white flex items-center justify-center relative overflow-hidden font-sans p-6 select-none">
        
        {/* Ambient Deep Space Background Glows */}
        <div className="absolute w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[160px] -top-32 -left-32 pointer-events-none"></div>
        <div className="absolute w-[700px] h-[700px] bg-indigo-600/20 rounded-full blur-[160px] -bottom-32 -right-32 pointer-events-none"></div>

        {/* Free-Floating Dense Computer & Tech Emojis (High Parallax Motion Sync) */}
        <div 
          className="absolute inset-0 pointer-events-none overflow-hidden transition-transform duration-100 ease-out z-10"
          style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }}
        >
          {floatingEmojis.map((item, idx) => (
            <div 
              key={idx}
              className={`absolute rounded-full bg-slate-950/80 backdrop-blur-xl flex items-center justify-center transition-transform duration-100 ease-out cursor-pointer hover:scale-130 ${item.size} ${item.glow}`}
              style={{ 
                top: item.top, 
                left: item.left,
                transform: `translate(${mousePos.x * item.speedX}px, ${mousePos.y * item.speedY}px)`
              }}
            >
              {item.emoji}
            </div>
          ))}
        </div>

        {/* Central Clean Login Modal with Neon White Glowing Border */}
        <div className="w-full max-w-md bg-slate-950/90 backdrop-blur-2xl border-2 border-white rounded-3xl p-8 shadow-[0_0_40px_rgba(255,255,255,0.4),0_0_80px_rgba(0,0,0,0.9)] relative z-20 space-y-6">
          <div className="text-center space-y-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-blue-600/40">SkillStack R23</span>
            <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Student Login Portal</h1>
            <p className="text-xs text-slate-300">Narayana Engineering College • CSE (AI & DS)</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Roll Number / User ID</label>
              <input 
                type="text" 
                required
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full bg-slate-900/90 border border-white/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Password / Access Key</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/90 border border-white/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition font-mono"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-blue-600/40 flex items-center justify-center space-x-2 cursor-pointer border border-white/30"
            >
              <span>Login to SkillStack</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10 font-mono">
            <span>Connected: edunest_r23_db</span>
            <span>Express API: 5000</span>
          </div>
        </div>

      </div>
    );
  }

  // 2. MAIN APP DASHBOARD (After Login)
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      
      <aside className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 shadow-sm ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center space-x-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">R23</span>
              <span className="font-bold text-slate-900 tracking-tight">SkillStack</span>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition cursor-pointer">
            <Menu size={18} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 text-sm font-medium">
          <button onClick={() => scrollToSection('overview')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition text-left cursor-pointer">
            <Home size={18} className="flex-shrink-0" />
            {isSidebarOpen && <span>Overview</span>}
          </button>
          <button onClick={() => scrollToSection('syllabus')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition text-left cursor-pointer">
            <BookOpen size={18} className="flex-shrink-0" />
            {isSidebarOpen && <span>R23 Syllabus & NPTEL</span>}
          </button>
          <button onClick={() => scrollToSection('course-library')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition text-left cursor-pointer">
            <Library size={18} className="flex-shrink-0" />
            {isSidebarOpen && <span>Course Library</span>}
          </button>
          <button onClick={() => scrollToSection('tasks')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition text-left cursor-pointer">
            <CheckSquare size={18} className="flex-shrink-0" />
            {isSidebarOpen && <span>Task Portal</span>}
          </button>
          <button onClick={() => scrollToSection('coding-exam')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition text-left cursor-pointer">
            <Code size={18} className="flex-shrink-0" />
            {isSidebarOpen && <span>Coding Exam</span>}
          </button>
          <button onClick={() => scrollToSection('scorecard')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition text-left cursor-pointer">
            <Award size={18} className="flex-shrink-0" />
            {isSidebarOpen && <span>CIE/SEE & Scorecard</span>}
          </button>
        </nav>

        <div className="p-3 border-t border-slate-200">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 text-xs font-semibold py-2.5 px-3 rounded-lg transition cursor-pointer"
          >
            Log Out ({rollNumber})
          </button>
        </div>
      </aside>

      <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} min-w-0`}>
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
          <div className="flex items-center space-x-3">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">R23</span>
            <span className="font-extrabold text-slate-900 tracking-tight text-base">SkillStack Portal</span>
          </div>
          <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-200">CSE (AI & DS) • {rollNumber}</span>
        </header>

        <section id="overview" className="w-full bg-[#090d16] text-white py-32 px-6 relative overflow-hidden shadow-lg">
          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Interactive Syllabus & Academic Evaluation Repository
            </h1>
          </div>
        </section>
      </main>
    </div>
  );
}
