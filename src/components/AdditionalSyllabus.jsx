import React from 'react';

export default function AdditionalSyllabus({ isDarkMode }) {
  return (
    <section id="additional-syllabus" className={`p-8 rounded-3xl transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#090d16] text-white border-2 border-white/15 shadow-2xl backdrop-blur-2xl' 
        : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
    } space-y-8`}>
      <h2 className={`text-2xl font-bold border-b pb-4 ${
        isDarkMode ? 'text-white border-white/10' : 'text-blue-950 border-slate-200/60'
      }`}>
        DBMS & Python Curriculum (R23 Regulation)
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* DBMS Module */}
        <div className={`p-5 rounded-2xl space-y-2 border transition ${
          isDarkMode 
            ? 'bg-slate-900/90 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.12)] text-white' 
            : 'bg-white/80 border-slate-200 text-slate-900 shadow-xs'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wide ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
            Semester III / IV
          </span>
          <h3 className="text-lg font-bold">
            Database Management Systems (DBMS)
          </h3>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Covers ER Models, Relational Algebra, SQL Queries, Joins, Transactions, ACID Properties, and Normalization (1NF, 2NF, 3NF, BCNF).
          </p>
          <div className="pt-2 text-xs">
            <a 
              href="#coding-exam" 
              className={`font-semibold inline-flex items-center gap-1 hover:underline ${
                isDarkMode ? 'text-cyan-300 hover:text-cyan-200' : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              <span>▶ View SQL Optimization Tasks</span>
            </a>
          </div>
        </div>

        {/* Python Programming Module */}
        <div className={`p-5 rounded-2xl space-y-2 border transition ${
          isDarkMode 
            ? 'bg-slate-900/90 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.12)] text-white' 
            : 'bg-white/80 border-slate-200 text-slate-900 shadow-xs'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wide ${isDarkMode ? 'text-amber-400' : 'text-blue-600'}`}>
            Semester III / IV
          </span>
          <h3 className="text-lg font-bold">
            Python Programming & Algorithms
          </h3>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Explores Lists, Dicts, Generators, File Handling, Exception Handling, Object-Oriented Python, and Algorithmic Complexity.
          </p>
          <div className="pt-2 text-xs">
            <a 
              href="#coding-exam" 
              className={`font-semibold inline-flex items-center gap-1 hover:underline ${
                isDarkMode ? 'text-amber-300 hover:text-amber-200' : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              <span>▶ Solve Python Coding Problems</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
