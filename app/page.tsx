'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import FilterBar from '@/components/FilterBar';
import TutorCard from '@/components/TutorCard';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';
import { MOCK_TUTORS } from './data/mockTutors';

export default function Page() {
  const [selectedSubject, setSelectedSubject] = useState('Semua');
  const [selectedMode, setSelectedMode] = useState('Semua');
  
  // State untuk mengontrol Booking Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTutorName, setSelectedTutorName] = useState('');

  // Fungsi saat tombol booking pada kartu tutor diklik
  const handleOpenBooking = (tutorName: string) => {
    setSelectedTutorName(tutorName);
    setIsModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsModalOpen(false);
    setSelectedTutorName('');
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />
        
        {/* Hero & Search Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-12 border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <span className="inline-block bg-amber-100 text-amber-800 font-bold px-4 py-1.5 rounded-full text-sm mb-4 border border-amber-200">
                ⭐ Solusi Belajar Nyaman & Tanpa Stres
              </span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
                Cari Tutor Privat Terbaik yang <span className="text-blue-600 underline decoration-blue-300 underline-offset-8">Sabar & Berpengalaman</span>
              </h1>
              <p className="text-lg text-slate-600">
                Bantu anak atau diri Anda memahami pelajaran sekolah dengan mudah. Tersedia pilihan tutor secara offline maupun online.
              </p>
            </div>

            {/* Filter Bar Component */}
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-slate-200 mb-12">
              <FilterBar 
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
                selectedMode={selectedMode}
                setSelectedMode={setSelectedMode}
              />
            </div>
          </div>
        </section>

        {/* Tutors Directory Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900">Daftar Pengajar Berpengalaman</h2>
            <span className="text-sm font-semibold text-slate-500">Menampilkan {MOCK_TUTORS.length} Tutor Pilihan</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_TUTORS.map((tutor) => (
              <TutorCard 
                key={tutor.id} 
                tutor={tutor} 
                onBook={() => handleOpenBooking(tutor.name)} 
              />
            ))}
          </div>
        </section>
      </div>

      <Footer />
      
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={handleCloseBooking} 
        tutorName={selectedTutorName} 
      />
    </main>
  );
}