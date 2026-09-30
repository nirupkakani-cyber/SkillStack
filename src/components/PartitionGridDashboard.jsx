import React from 'react';
import { 
  BookOpen, 
  Code2, 
  Database, 
  Terminal, 
  Bot, 
  ChevronRight,
  Laptop,
  GraduationCap,
  Sparkles,
  Layers
} from 'lucide-react';

export default function PartitionGridDashboard({ onNavigate, onAskAITutor, isDarkMode }) {
  const subjects = [
    {
      id: 'subject-ds',
      title: 'Data Structures',
      subtitle: 'Click here to view Data Structures syllabus and unit resources',
      targetId: 'syllabus',
      subjectCode: 'R23-CS301',
      badge: 'R23-CS301',
      accentColor: 'blue',
      image: '/images/ds_cover.jpg',
      illustration: (
        <div className="relative w-full h-44 overflow-hidden bg-slate-900 group">
          <img 
            src="/images/ds_cover.jpg" 
            alt="Data Structures Cover"
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>
          
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600/90 backdrop-blur-md text-white border border-blue-400/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow-sm">
              R23-CS301
            </span>
          </div>

          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
            <span className="text-[10px] font-mono font-semibold text-blue-200 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
              Trees • Graphs • ADTs
            </span>
            <span className="text-xl animate-bounce">📚</span>
          </div>
        </div>
      )
    },
    {
      id: 'subject-java',
      title: 'OOP through Java',
      subtitle: 'Click here to view OOP through Java syllabus and unit resources',
      targetId: 'syllabus',
      subjectCode: 'R23-CS302',
      badge: 'R23-CS302',
      accentColor: 'emerald',
      image: '/images/java_cover.jpg',
      illustration: (
        <div className="relative w-full h-44 overflow-hidden bg-slate-900 group">
          <img 
            src="/images/java_cover.jpg" 
            alt="OOP through Java Cover"
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>
          
          <div className="absolute top-3 left-3">
            <span className="bg-emerald-600/90 backdrop-blur-md text-white border border-emerald-400/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow-sm">
              R23-CS302
            </span>
          </div>

          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
            <span className="text-[10px] font-mono font-semibold text-emerald-200 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
              JVM • Multithreading
            </span>
            <span className="text-xl animate-bounce">☕</span>
          </div>
        </div>
      )
    },
    {
      id: 'subject-dbms',
      title: 'Database Management Systems',
      subtitle: 'Click here to view DBMS syllabus and unit resources',
      targetId: 'syllabus',
      subjectCode: 'R23-CS303',
      badge: 'R23-CS303',
      accentColor: 'indigo',
      image: '/images/dbms_cover.jpg',
      illustration: (
        <div className="relative w-full h-44 overflow-hidden bg-slate-900 group">
          <img 
            src="/images/dbms_cover.jpg" 
            alt="DBMS Cover"
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>
          
          <div className="absolute top-3 left-3">
            <span className="bg-indigo-600/90 backdrop-blur-md text-white border border-indigo-400/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow-sm">
              R23-CS303
            </span>
          </div>

          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
            <span className="text-[10px] font-mono font-semibold text-indigo-200 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
              3NF • Normalization
            </span>
            <span className="text-xl animate-bounce">🗄️</span>
          </div>
        </div>
      )
    },
    {
      id: 'subject-python',
      title: 'Python Programming',
      subtitle: 'Click here to view Python Programming syllabus and unit resources',
      targetId: 'syllabus',
      subjectCode: 'R23-CS304',
      badge: 'R23-CS304',
      accentColor: 'amber',
      image: '/images/python_cover.jpg',
      illustration: (
        <div className="relative w-full h-44 overflow-hidden bg-slate-900 group">
          <img 
            src="/images/python_cover.jpg" 
            alt="Python Programming Cover"
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>
          
          <div className="absolute top-3 left-3">
            <span className="bg-amber-600/90 backdrop-blur-md text-white border border-amber-400/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow-sm">
              R23-CS304
            </span>
          </div>

          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
            <span className="text-[10px] font-mono font-semibold text-amber-200 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
              Lambdas • File I/O
            </span>
            <span className="text-xl animate-bounce">🐍</span>
          </div>
        </div>
      )
    }
  ];

  const handleHelpSupportClick = () => {
    if (onAskAITutor) {
      onAskAITutor('Hi AI Tutor! I need help with my R23 CSE coursework.');
    } else {
      const element = document.getElementById('syllabus');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubjectClick = (item) => {
    if (onNavigate) {
      onNavigate(item.targetId, item.subjectCode);
    } else {
      const element = document.getElementById(item.targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-6 select-none">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D0BDF4] pb-3">
        <div>
          <span className="bg-[#D0BDF4]/40 text-[#8458B3] border border-[#D0BDF4] text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">
            Portal Navigation
          </span>
          <h2 className="text-2xl font-bold text-[#494D5F] mt-1">
            SkillStack Quick-Access Academic Partitions
          </h2>
        </div>
        <p className="text-xs text-[#494D5F]/70 font-sans">
          Select any partition card below to navigate directly to that academic module.
        </p>
      </div>

      {/* Grid of Subject Partitions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSubjectClick(item)}
            className={`group rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer ${
              isDarkMode
                ? 'bg-[#494D5F] border-white/10 hover:border-[#A0D2EB] shadow-lg'
                : 'bg-white border-[#D0BDF4] hover:border-[#8458B3] shadow-sm hover:shadow-xl transform hover:-translate-y-1'
            }`}
          >
            {/* Top Illustration Box */}
            {item.illustration}

            {/* Middle Description Content */}
            <div className="p-4 text-center flex-1 flex flex-col items-center justify-center space-y-1.5">
              <p className={`text-xs font-medium leading-snug px-1 ${
                isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-[#494D5F]/80 group-hover:text-[#494D5F]'
              }`}>
                {item.subtitle}
              </p>
            </div>

            {/* Bottom Dark Footer Bar */}
            <div className={`py-3 px-4 flex items-center justify-center space-x-2 transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-slate-950 text-white group-hover:bg-[#8458B3]' 
                : 'bg-[#494D5F] text-white group-hover:bg-[#8458B3]'
            }`}>
              <span className="font-bold text-xs md:text-sm tracking-wide">{item.title}</span>
              <ChevronRight size={15} className="transform group-hover:translate-x-1 transition-transform" />
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

