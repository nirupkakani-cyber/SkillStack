import React from 'react';

export default function HeroSection({ onNavigate, isDarkMode }) {
  return (
    <section 
      id="overview" 
      className={`w-full py-16 md:py-24 px-6 md:px-12 relative overflow-hidden select-none transition-colors duration-300 border-b ${
        isDarkMode 
          ? 'bg-[#494D5F] text-white border-white/10' 
          : 'bg-[#E5EAF5] text-[#494D5F] border-[#D0BDF4]'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
        
        {/* Left Side: Typography & Action Button */}
        <div className="flex-1 space-y-6 text-left max-w-xl">
          <div className="space-y-3">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight leading-tight ${
              isDarkMode ? 'text-white' : 'text-[#494D5F]'
            }`}>
              Course Library
            </h1>
            <p className={`text-xs sm:text-sm font-serif leading-relaxed max-w-md ${
              isDarkMode ? 'text-[#D0BDF4]' : 'text-[#494D5F]/80'
            }`}>
              Explore official R23 B.Tech Computer Science textbooks, unit-wise notes, lab manuals, and interactive learning resources curated for your academic success.
            </p>
          </div>

          <div className="pt-2">
            <button 
              onClick={() => onNavigate('course-library')} 
              className={`bg-transparent text-xs font-mono tracking-widest uppercase font-bold px-6 py-3 border transition-all duration-300 shadow-xs cursor-pointer flex items-center space-x-2 group ${
                isDarkMode 
                  ? 'border-[#A0D2EB] text-[#A0D2EB] hover:bg-[#A0D2EB] hover:text-[#494D5F] hover:border-[#A0D2EB]' 
                  : 'border-[#8458B3] text-[#8458B3] hover:bg-[#8458B3] hover:text-white hover:border-[#8458B3]'
              }`}
            >
              <span>EXPLORE NOW</span>
              <span className="text-sm group-hover:translate-x-1 transition-transform">👆</span>
            </button>
          </div>
        </div>

        {/* Right Side: 3D Hardcover Book Showcase Stand */}
        <div className="flex-1 flex justify-center md:justify-end w-full">
          <div className="relative max-w-md w-full overflow-hidden rounded-2xl transition-all duration-500 hover:scale-103 hover:shadow-2xl border border-[#D0BDF4]">
            <img 
              src="/images/hero_3d_books.jpg" 
              alt="3D Hardcover Books Showcase" 
              className="w-full h-auto object-cover rounded-xl shadow-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
}


