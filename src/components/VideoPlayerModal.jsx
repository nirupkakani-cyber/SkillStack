import React from 'react';
import { X, ExternalLink, Play, Video } from 'lucide-react';

export default function VideoPlayerModal({ video, onClose }) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-4xl rounded-3xl border border-indigo-500/40 relative shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white truncate max-w-lg">
                {video.title}
              </h3>
              <p className="text-xs text-slate-400">
                Channel: <span className="text-slate-200 font-semibold">{video.channel}</span> • Duration: {video.duration}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Iframe */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>Referred Curriculum Resource • Narayana R23 Syllabus</span>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-1.5 text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            <span>Open in YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
}
