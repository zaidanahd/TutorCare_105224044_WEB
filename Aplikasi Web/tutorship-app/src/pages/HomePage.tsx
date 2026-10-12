import React from 'react';
import TutorCard from '../components/TutorCard';
import { MOCK_TUTORS } from '../data/mockTutors';

interface HomePageProps {
  setCurrentPage: (page: 'home' | 'tutors' | 'about') => void;
  openBooking: (tutorName: string) => void;
  openFaq: number | null;
  toggleFaq: (index: number) => void;
}

export default function HomePage({ setCurrentPage, openBooking, openFaq, toggleFaq }: HomePageProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#eff6ff] to-white py-16 border-b border-slate-200">
        <div className="container mx-auto px-5 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#fef3c7] text-[#92400e] font-bold text-sm px-3.5 py-1.5 rounded-full mb-4 border border-[#fde68a]">
              <span>❤️</span> Dedicated to students who need extra care & time
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] leading-tight mb-5">
              School feels difficult? <br />
              <span className="text-[#1f6feb] underline decoration-[#93c5fd] decoration-2 underline-offset-6">We help you understand,</span> without any rush.
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Everyone learns at their own pace. Our friendly and certified tutors explain tricky subjects step-by-step so you or your child can feel confident and happy in school again.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              <div className="flex items-center gap-3 font-semibold text-slate-800">
                <div className="w-6 h-6 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center font-bold text-xs flex-shrink-0">✓</div>
                100% Patient & Kind Teachers (No scolding, ever)
              </div>
              <div className="flex items-center gap-3 font-semibold text-slate-800">
                <div className="w-6 h-6 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center font-bold text-xs flex-shrink-0">✓</div>
                Free 30-Minute Trial Session with no obligations
              </div>
            </div>
          </div>

          {/* Finder Box */}
          <div id="search-box" className="bg-white border-2 border-slate-300 rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-5">
              <h2 className="text-2xl font-extrabold text-[#0f172a] mb-1">Find Your Perfect Tutor</h2>
              <p className="text-base text-slate-600">Tell us what you need in 3 simple clicks:</p>
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={() => setCurrentPage('tutors')} className="h-14 bg-gradient-to-b from-[#1f6feb] to-[#174ec2] text-white font-extrabold text-lg rounded-xl shadow-lg hover:bg-[#134db3] transition flex items-center justify-center gap-2 cursor-pointer">
                <span>🔍</span> Jelajahi Direktori Tutor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tutors */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#0f172a] mb-3">Pengajar Terpilih</h2>
            <p className="text-lg text-slate-600">Pilih tutor berpengalaman yang siap membimbing Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_TUTORS.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} onBook={openBooking} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-5 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0f172a] mb-3">Common Questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <button onClick={() => toggleFaq(1)} className="w-full text-left p-5 font-bold text-lg text-slate-800 bg-white hover:bg-slate-50 flex justify-between items-center cursor-pointer">
                <span>Apakah sesi uji coba 30 menit benar-benar gratis?</span>
                <span className="text-[#1f6feb] text-xl font-bold">{openFaq === 1 ? '−' : '+'}</span>
              </button>
              {openFaq === 1 && (
                <div className="p-5 border-t border-slate-100 text-slate-600 leading-relaxed bg-slate-50">
                  Ya, benar! Sesi pertama selama 30 menit diberikan secara gratis tanpa komitmen biaya.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}