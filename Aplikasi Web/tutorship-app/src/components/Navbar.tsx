import React from 'react';

interface NavbarProps {
  currentPage: 'home' | 'tutors' | 'about';
  setCurrentPage: (page: 'home' | 'tutors' | 'about') => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  return (
    <header className="bg-white border-b-2 border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-5 flex justify-between items-center h-20">
        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 bg-transparent border-none cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-[#1f6feb] to-[#38bdf8] text-white rounded-xl flex items-center justify-center shadow-md">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-extrabold text-slate-900 leading-tight">TutorCare</span>
            <span className="text-xs text-slate-500 font-medium">Gentle & Patient Learning</span>
          </div>
        </button>

        <nav>
          <ul className="flex items-center gap-4 list-none">
            <li>
              <button 
                onClick={() => setCurrentPage('home')} 
                className={`text-base font-semibold px-3 py-2 rounded-lg transition cursor-pointer ${currentPage === 'home' ? 'text-[#1f6feb] bg-[#eaf2ff]' : 'text-slate-600 hover:text-[#1f6feb]'}`}
              >
                Beranda
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentPage('tutors')} 
                className={`text-base font-semibold px-3 py-2 rounded-lg transition cursor-pointer ${currentPage === 'tutors' ? 'text-[#1f6feb] bg-[#eaf2ff]' : 'text-slate-600 hover:text-[#1f6feb]'}`}
              >
                Direktori Tutor
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentPage('about')} 
                className={`text-base font-semibold px-3 py-2 rounded-lg transition cursor-pointer ${currentPage === 'about' ? 'text-[#1f6feb] bg-[#eaf2ff]' : 'text-slate-600 hover:text-[#1f6feb]'}`}
              >
                Tentang Kami
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentPage('tutors')} 
                className="bg-[#1f6feb] text-white font-bold px-5 py-2.5 rounded-full shadow-md hover:bg-[#134db3] transition cursor-pointer"
              >
                Mulai Belajar →
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}