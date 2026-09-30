import React, { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  UploadCloud, 
  CheckCircle2, 
  Calendar, 
  FileCode, 
  X,
  FileCheck
} from 'lucide-react';

export default function TasksDashboard({ tasks, setTasks, userSession, onOpenAuthModal, isDarkMode }) {
  const [selectedTaskForUpload, setSelectedTaskForUpload] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSimulatedFileUpload = (taskId, fileName) => {
    if (!fileName) return;

    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            submitted: true,
            status: 'Completed',
            submissionFile: fileName,
            submittedAt: new Date().toLocaleDateString()
          };
        }
        return t;
      })
    );

    showToast(`Successfully submitted "${fileName}" for ${taskId}!`);
    setSelectedTaskForUpload(null);
    setUploadedFileName('');
  };

  return (
    <section id="tasks" className={`p-8 rounded-3xl transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#494D5F] text-white border-2 border-white/15 shadow-2xl backdrop-blur-2xl' 
        : 'bg-white border border-[#D0BDF4] text-[#494D5F] shadow-sm'
    } space-y-6`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#8458B3] text-white px-5 py-3 rounded-lg shadow-xl flex items-center space-x-3 border border-[#D0BDF4] animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      <h2 className={`text-2xl font-bold mb-6 border-b pb-4 ${
        isDarkMode ? 'text-white border-white/10' : 'text-[#494D5F] border-[#D0BDF4]'
      }`}>
        Tasks & Assignments Portal
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="bg-[#E5EAF5]/40 border border-[#D0BDF4] p-6 rounded-2xl space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                {task.submitted ? (
                  <span className="text-xs font-semibold bg-[#D0BDF4]/40 text-[#8458B3] border border-[#D0BDF4] px-2.5 py-1 rounded">
                    Submitted & Verified
                  </span>
                ) : task.status === 'Active' ? (
                  <span className="text-xs font-semibold bg-[#A0D2EB]/30 text-[#8458B3] border border-[#A0D2EB]/60 px-2.5 py-1 rounded">
                    Active Assignment
                  </span>
                ) : (
                  <span className="text-xs font-semibold bg-[#D0BDF4]/40 text-[#8458B3] border border-[#D0BDF4] px-2.5 py-1 rounded">
                    Upcoming Task
                  </span>
                )}
                <span className="text-xs text-[#494D5F]/60">
                  Weight: {task.marks} Marks
                </span>
              </div>

              <h3 className="text-base font-bold text-[#494D5F]">
                {task.title}
              </h3>
              <p className="text-sm text-[#494D5F]/80 leading-relaxed">
                {task.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#D0BDF4] flex justify-between items-center">
              {task.walkthroughUrl ? (
                <a
                  href={task.walkthroughUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#8458B3] hover:underline font-medium"
                >
                  ▶ Coding Walkthrough
                </a>
              ) : (
                <span className="text-xs text-[#494D5F]/60 font-medium">Due: {task.dueDate}</span>
              )}

              {task.submitted ? (
                <span className="text-xs font-mono font-semibold text-[#8458B3] bg-[#D0BDF4]/30 px-2.5 py-1 rounded border border-[#D0BDF4]">
                  {task.submissionFile || 'Submitted.pdf'}
                </span>
              ) : (
                <button
                  onClick={() => {
                    if (!userSession) {
                      alert('Please log in as a student to submit assignments.');
                      onOpenAuthModal();
                    } else {
                      setSelectedTaskForUpload(task);
                    }
                  }}
                  className="bg-[#8458B3] hover:bg-[#7347a0] text-white text-xs font-medium px-4 py-2 rounded-xl transition shadow-sm cursor-pointer"
                >
                  Submit Work
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* File Upload Modal Simulator */}
      {selectedTaskForUpload && (
        <div className="fixed inset-0 z-50 bg-[#494D5F]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#D0BDF4] rounded-2xl max-w-md w-full p-6 relative shadow-xl space-y-4">
            <button
              onClick={() => setSelectedTaskForUpload(null)}
              className="absolute top-4 right-4 text-[#494D5F]/50 hover:text-[#494D5F] text-xl font-bold cursor-pointer"
            >
              &times;
            </button>

            <h3 className="text-lg font-bold text-[#494D5F]">Upload Assignment</h3>
            <p className="text-xs text-[#494D5F]/70">{selectedTaskForUpload.title}</p>

            <div className="p-6 border-2 border-dashed border-[#D0BDF4] bg-[#E5EAF5]/50 rounded-xl text-center">
              <UploadCloud className="w-8 h-8 text-[#8458B3] mx-auto mb-2" />
              <p className="text-xs font-semibold text-[#494D5F]">Select file to upload</p>
              <p className="text-[11px] text-[#494D5F]/60 mt-1">Formating: .c, .cpp, .pdf (Max 15MB)</p>
              
              <input
                type="file"
                id="taskFileInput"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setUploadedFileName(e.target.files[0].name);
                  }
                }}
              />
              <label
                htmlFor="taskFileInput"
                className="inline-block mt-3 px-4 py-2 rounded-xl bg-[#8458B3] hover:bg-[#7347a0] text-white text-xs font-medium cursor-pointer shadow-sm"
              >
                Browse Files
              </label>

              {uploadedFileName && (
                <p className="mt-3 text-xs font-mono font-bold text-[#8458B3] bg-[#D0BDF4]/30 p-2 rounded-lg">
                  {uploadedFileName}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setSelectedTaskForUpload(null)}
                className="px-3 py-1.5 rounded text-xs text-[#494D5F] hover:text-[#8458B3] cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={!uploadedFileName}
                onClick={() => handleSimulatedFileUpload(selectedTaskForUpload.id, uploadedFileName)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold text-white shadow-sm cursor-pointer ${
                  uploadedFileName ? 'bg-[#8458B3] hover:bg-[#7347a0]' : 'bg-[#494D5F]/30 cursor-not-allowed'
                }`}
              >
                Submit File
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
