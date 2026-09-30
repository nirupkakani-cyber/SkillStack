import React, { useState } from 'react';
import { 
  Award, 
  Calculator, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Plus, 
  Trash2, 
  BarChart3, 
  Target, 
  Percent, 
  ShieldCheck, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function ScorecardVisualizer({ 
  scorecardData = {}, 
  evaluationRules = {}, 
  isDarkMode = false 
}) {
  const [activeToolTab, setActiveToolTab] = useState('scorecard'); // 'scorecard' | 'calculator' | 'attendance' | 'rules'

  // Interactive Calculator State
  const [calcSubjects, setCalcSubjects] = useState([
    { name: 'Data Structures (R23-CS301)', credits: 3, gradePoint: 9 },
    { name: 'OOP through Java (R23-CS302)', credits: 3, gradePoint: 8 },
    { name: 'Operating Systems (R23-CS303)', credits: 3, gradePoint: 9 },
    { name: 'DBMS (R23-CS304)', credits: 3, gradePoint: 8 },
    { name: 'Discrete Mathematics (R23-BS305)', credits: 3, gradePoint: 10 }
  ]);

  const [newSubName, setNewSubName] = useState('');
  const [newSubCredits, setNewSubCredits] = useState(3);
  const [newSubGradePoint, setNewSubGradePoint] = useState(9);

  // Attendance Predictor State
  const [totalClasses, setTotalClasses] = useState(120);
  const [attendedClasses, setAttendedClasses] = useState(98);
  const [targetPercentage, setTargetPercentage] = useState(75);

  // Helper calculations
  const calculateSGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    calcSubjects.forEach(s => {
      totalPoints += s.credits * s.gradePoint;
      totalCredits += s.credits;
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const handleAddSubject = () => {
    if (!newSubName.trim()) return;
    setCalcSubjects(prev => [
      ...prev,
      {
        name: newSubName.trim(),
        credits: Number(newSubCredits) || 3,
        gradePoint: Number(newSubGradePoint) || 8
      }
    ]);
    setNewSubName('');
  };

  const handleRemoveSubject = (index) => {
    setCalcSubjects(prev => prev.filter((_, i) => i !== index));
  };

  // Attendance calculations
  const currentAttendancePct = totalClasses > 0 ? ((attendedClasses / totalClasses) * 100).toFixed(1) : '0.0';
  
  const calculateNeededClasses = () => {
    const targetRatio = targetPercentage / 100;
    if (targetRatio >= 1) return 'N/A (100% required)';
    const needed = Math.ceil((targetRatio * totalClasses - attendedClasses) / (1 - targetRatio));
    return needed > 0 ? needed : 0;
  };

  const student = scorecardData?.student || {
    name: "Student Academic Record",
    rollNo: "2571A47017",
    branch: "CSE (AI & DS)",
    semester: 3,
    cgpa: 8.84,
    totalClassesHeld: 120,
    classesAttended: 98
  };

  const subjectGrades = scorecardData?.subjectGrades || [
    {
      code: "R23-CS301",
      name: "Data Structures",
      credits: 3,
      cieMarks: 24.0,
      seeMarks: 60.0,
      totalMarks: 84.0,
      gradePoint: 9,
      grade: "A+",
      status: "PASS"
    },
    {
      code: "R23-CS302",
      name: "OOP through Java",
      credits: 3,
      cieMarks: 22.0,
      seeMarks: 58.0,
      totalMarks: 80.0,
      gradePoint: 8,
      grade: "A",
      status: "PASS"
    },
    {
      code: "R23-CS303",
      name: "Operating Systems",
      credits: 3,
      cieMarks: 25.5,
      seeMarks: 62.0,
      totalMarks: 87.5,
      gradePoint: 9,
      grade: "A+",
      status: "PASS"
    },
    {
      code: "R23-CS304",
      name: "Database Management Systems",
      credits: 3,
      cieMarks: 23.0,
      seeMarks: 56.0,
      totalMarks: 79.0,
      gradePoint: 8,
      grade: "A",
      status: "PASS"
    }
  ];

  return (
    <div className={`p-6 sm:p-8 rounded-3xl transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#494D5F] text-white border-2 border-white/15 shadow-2xl backdrop-blur-2xl' 
        : 'bg-white border border-[#D0BDF4] text-[#494D5F] shadow-sm'
    } space-y-8`}>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-[#D0BDF4] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#D0BDF4]/40 text-[#8458B3] text-xs font-bold px-2.5 py-0.5 rounded uppercase border border-[#D0BDF4]">
              R23 Autonomous Regulations
            </span>
            <span className="bg-[#A0D2EB]/30 text-[#8458B3] text-xs font-bold px-2.5 py-0.5 rounded uppercase border border-[#A0D2EB]/60">
              Academic Tool Suite 🛠️
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#494D5F] mt-2">
            Scorecard Visualizer
          </h2>
          <p className="text-xs text-[#494D5F]/70 mt-1">
            Narayana Engineering College • Department of CSE (AI & DS) • Autonomous Evaluation Portal
          </p>
        </div>

        {/* Quick Nav Tool Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#E5EAF5] p-1.5 rounded-2xl border border-[#D0BDF4] w-full md:w-auto">
          {[
            { id: 'scorecard', label: 'Scorecard', icon: Award },
            { id: 'calculator', label: 'CGPA Calculator', icon: Calculator },
            { id: 'attendance', label: 'Attendance Predictor', icon: Percent },
            { id: 'rules', label: 'R23 Marking Rules', icon: ShieldCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeToolTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveToolTab(tab.id)}
                className={`flex-1 md:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                  isActive 
                    ? 'bg-[#8458B3] text-white shadow-sm' 
                    : 'text-[#494D5F] hover:text-[#8458B3] hover:bg-white/80'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TOOL VIEW 1: OFFICIAL STUDENT SCORECARD & SUMMARY */}
      {activeToolTab === 'scorecard' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* CGPA Badge */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-5 shadow-lg space-y-2 border border-blue-800">
              <div className="flex justify-between items-center text-blue-200 text-xs font-mono">
                <span>Cumulative CGPA</span>
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-3xl font-black text-white tracking-tight">
                {student.cgpa || '8.84'} <span className="text-xs font-normal text-blue-300">/ 10.0</span>
              </div>
              <p className="text-[11px] text-blue-200/90 font-medium">First Class with Distinction Candidate</p>
            </div>

            {/* Attendance Badge */}
            <div className="bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-2xl p-5 shadow-lg space-y-2 border border-emerald-700">
              <div className="flex justify-between items-center text-emerald-200 text-xs font-mono">
                <span>Attendance Status</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              </div>
              <div className="text-3xl font-black text-white tracking-tight">
                {currentAttendancePct}%
              </div>
              <p className="text-[11px] text-emerald-200/90 font-medium">
                {attendedClasses} / {totalClasses} Classes Attended (Above 75% Requirement)
              </p>
            </div>

            {/* Credits Earned */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-slate-500 text-xs font-mono">
                <span>Completed Credits</span>
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-3xl font-black text-slate-900 tracking-tight">
                12.0 <span className="text-xs font-normal text-slate-500">Credits</span>
              </div>
              <p className="text-[11px] text-slate-500">4 Core Theory Courses Cleared</p>
            </div>

            {/* Current Semester */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-slate-500 text-xs font-mono">
                <span>Academic Record</span>
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-3xl font-black text-slate-900 tracking-tight">
                Sem {student.semester || 3}
              </div>
              <p className="text-[11px] text-slate-500">{student.branch || 'CSE (AI & DS)'}</p>
            </div>

          </div>

          {/* Subject Performance Breakdown Table */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-700" />
                  <span>Semester Evaluation & Grade Breakdown</span>
                </h3>
                <p className="text-xs text-slate-500">Continuous Internal Evaluation (CIE 30M) + Semester End Examination (SEE 70M)</p>
              </div>
              <span className="bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full font-mono">
                R23 Regulation Scheme
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-200/80 text-slate-700 font-mono font-bold uppercase tracking-wider">
                    <th className="p-3.5 rounded-l-xl">Course Code & Name</th>
                    <th className="p-3.5 text-center">Credits</th>
                    <th className="p-3.5 text-center">CIE (30M)</th>
                    <th className="p-3.5 text-center">SEE (70M)</th>
                    <th className="p-3.5 text-center">Total (100M)</th>
                    <th className="p-3.5 text-center">Grade Point</th>
                    <th className="p-3.5 text-center">Grade</th>
                    <th className="p-3.5 text-center rounded-r-xl">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {subjectGrades.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-white transition">
                      <td className="p-3.5 font-semibold">
                        <span className="font-mono text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 mr-2">
                          {sub.code}
                        </span>
                        <span className="text-slate-900 font-bold">{sub.name}</span>
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold">{sub.credits}</td>
                      <td className="p-3.5 text-center font-mono">{sub.cieMarks.toFixed(1)}</td>
                      <td className="p-3.5 text-center font-mono">{sub.seeMarks.toFixed(1)}</td>
                      <td className="p-3.5 text-center font-mono font-extrabold text-blue-900">{sub.totalMarks.toFixed(1)}</td>
                      <td className="p-3.5 text-center font-mono font-bold text-purple-700">{sub.gradePoint} / 10</td>
                      <td className="p-3.5 text-center font-bold">
                        <span className="bg-blue-100 text-blue-900 border border-blue-300 px-2.5 py-1 rounded font-mono text-xs">
                          {sub.grade}
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-3 py-1 rounded-full text-[11px]">
                          ✓ {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TOOL VIEW 2: INTERACTIVE CGPA / SGPA CALCULATOR */}
      {activeToolTab === 'calculator' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="bg-blue-800 text-blue-200 text-[11px] font-bold px-2.5 py-0.5 rounded font-mono">
                INTERACTIVE CALCULATOR
              </span>
              <h3 className="text-2xl font-bold mt-1 text-white">Live SGPA & CGPA Simulator</h3>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Add your expected course subjects, credit weights, and grade points to compute instantaneous grade averages.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center min-w-[160px]">
              <span className="text-xs text-blue-200 font-mono block">Calculated SGPA</span>
              <span className="text-3xl font-black text-amber-300 font-mono">{calculateSGPA()}</span>
              <span className="text-[10px] text-blue-200 block">Out of 10.00</span>
            </div>
          </div>

          {/* Add Subject Inputs */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-600" />
              <span>Add Custom Course Subject</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase font-mono">Subject Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Artificial Intelligence (R23-CS305)"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase font-mono">Credits</label>
                <select
                  value={newSubCredits}
                  onChange={(e) => setNewSubCredits(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>1 Credit (Lab)</option>
                  <option value={2}>2 Credits (Skill Course)</option>
                  <option value={3}>3 Credits (Core Theory)</option>
                  <option value={4}>4 Credits (Advanced)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase font-mono">Grade Point (1-10)</label>
                <select
                  value={newSubGradePoint}
                  onChange={(e) => setNewSubGradePoint(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={10}>10 (S / O Grade)</option>
                  <option value={9}>9 (A+ Grade)</option>
                  <option value={8}>8 (A Grade)</option>
                  <option value={7}>7 (B Grade)</option>
                  <option value={6}>6 (C Grade)</option>
                  <option value={5}>5 (D Grade - Pass)</option>
                  <option value={0}>0 (F Grade - Fail)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleAddSubject}
              className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-sm cursor-pointer flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Subject to Calculator</span>
            </button>
          </div>

          {/* Calculator Table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 font-mono">Active Subject Grade List</h4>
            <div className="divide-y divide-slate-200">
              {calcSubjects.map((sub, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs gap-3">
                  <div className="flex-1">
                    <span className="font-bold text-slate-900">{sub.name}</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded font-mono font-semibold">
                      {sub.credits} Credits
                    </span>
                    <span className="bg-purple-50 text-purple-900 border border-purple-200 px-2.5 py-1 rounded font-mono font-bold">
                      Grade Point: {sub.gradePoint}
                    </span>
                    <button
                      onClick={() => handleRemoveSubject(idx)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition cursor-pointer"
                      title="Remove Subject"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TOOL VIEW 3: ATTENDANCE PREDICTOR */}
      {activeToolTab === 'attendance' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-lg space-y-2 border border-emerald-800">
            <span className="bg-emerald-800 text-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded font-mono">
              ATTENDANCE PREDICTOR
            </span>
            <h3 className="text-2xl font-bold text-white">Minimum 75% Requirement Calculator</h3>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              According to Narayana R23 Regulations, students must maintain a minimum of 75% attendance to be eligible for Semester End Examinations (SEE). Condonation is applicable between 65% and 75% only with medical certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Input Form */}
            <div className="sm:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-700" />
                <span>Enter Class Statistics</span>
              </h4>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 font-mono">Total Classes Conducted Till Date</label>
                  <input 
                    type="number" 
                    value={totalClasses}
                    onChange={(e) => setTotalClasses(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 font-mono">Classes Attended By Student</label>
                  <input 
                    type="number" 
                    value={attendedClasses}
                    onChange={(e) => setAttendedClasses(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 font-mono">Desired Target Attendance Threshold (%)</label>
                  <select
                    value={targetPercentage}
                    onChange={(e) => setTargetPercentage(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={75}>75% (Mandatory SEE Threshold)</option>
                    <option value={80}>80% (Safe Distinction Buffer)</option>
                    <option value={85}>85% (High Attendance Scholar)</option>
                    <option value={90}>90% (Top Honors)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Output */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 text-center">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 font-mono uppercase">Current Attendance</span>
                <div className="text-4xl font-black text-slate-900">{currentAttendancePct}%</div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200 mt-2">
                  <div 
                    className={`h-full transition-all ${Number(currentAttendancePct) >= 75 ? 'bg-emerald-500' : Number(currentAttendancePct) >= 65 ? 'bg-amber-500' : 'bg-rose-500'}`}
                    style={{ width: `${Math.min(100, Number(currentAttendancePct))}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-left space-y-1">
                <span className="text-[11px] font-bold text-blue-900 font-mono">Future Classes Projection:</span>
                <p className="text-xs text-blue-950 font-bold">
                  {calculateNeededClasses() === 0 
                    ? "✓ You have already achieved your target attendance percentage!" 
                    : `You need to attend next ${calculateNeededClasses()} consecutive classes without absence.`}
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TOOL VIEW 4: R23 AUTONOMOUS MARKING RULES */}
      {activeToolTab === 'rules' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          <div className="bg-blue-950 text-white rounded-2xl p-6 shadow-lg space-y-2 border border-blue-800">
            <span className="bg-blue-800 text-blue-200 text-[11px] font-bold px-2.5 py-0.5 rounded font-mono">
              EXAMINATION REGULATIONS
            </span>
            <h3 className="text-2xl font-bold text-white">Narayana R23 Autonomous Evaluation Rules</h3>
            <p className="text-xs text-blue-200/90 leading-relaxed">
              Continuous Internal Evaluation (CIE - 30 Marks) and Semester End Examination (SEE - 70 Marks) statutory criteria for Narayana Engineering College Autonomous Programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CIE Internal Rules */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
                <BookOpen className="w-5 h-5 text-blue-700" />
                <span>1. Continuous Internal Evaluation (CIE 30M)</span>
              </h4>

              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                  <span><strong>Mid-Term 1 Exam:</strong> Conducted for 15 Marks (Units 1, 2, and half of 3).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                  <span><strong>Mid-Term 2 Exam:</strong> Conducted for 15 Marks (Remaining Units).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                  <span><strong>Assignments & Quizzes:</strong> 5 Marks awarded for 10-page Oxford Unit assignment submissions and classroom quizzes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                  <span><strong>Minimum Internal Pass Mark:</strong> Must score at least <strong>10.5 out of 30 Marks (35%)</strong> in CIE.</span>
                </li>
              </ul>
            </div>

            {/* SEE External Rules */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>2. Semester End Examination (SEE 70M) & Attendance</span>
              </h4>

              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="bg-emerald-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                  <span><strong>External Exam:</strong> 3-Hour paper conducted for 70 Marks covering all 5 syllabus units.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-emerald-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                  <span><strong>Minimum External Pass Mark:</strong> Must score at least <strong>24.5 out of 70 Marks (35%)</strong> in SEE.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-emerald-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                  <span><strong>Overall Subject Aggregate:</strong> Combined CIE + SEE total must be at least <strong>40 out of 100 Marks (40%)</strong> to pass the course.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-emerald-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                  <span><strong>Attendance Rule:</strong> 75% minimum attendance required. Condonation fee applies between 65%-75%. Below 65% results in detention.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
