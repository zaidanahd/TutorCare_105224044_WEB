'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TutorCard from '../components/TutorCard';
import FilterBar from '../components/FilterBar';
import BookingModal from '../components/BookingModal';
import { MOCK_TUTORS } from '../data/mockTutors';

export default function TutorsDirectoryPage() {
  const [subject, setSubject] = useState('');
  const [mode, setMode] = useState('');
  const [selectedTutorName, setSelectedTutorName] = useState('');
  const [triggerError, setTriggerError] = useState(false);

  if (triggerError) {
    throw new Error('Simulasi Error pada Direktori Tutor untuk menguji error.tsx!');
  }

  const filteredTutors = MOCK_TUTORS.filter(tutor => {
    const matchSubject = subject ? tutor.subject.toLowerCase().includes(subject.toLowerCase()) : true;
    const matchMode = mode ? tutor.mode === mode || tutor.mode === 'Hybrid' : true;
    return matchSubject && matchMode;
  });

  return (
    <div className="container mx-auto px-5 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-[#1f6feb]"
        >
          <span aria-hidden="true">←</span>
          Kembali ke Beranda
        </Link>

        {/* Panel Uji Coba Berkas Khusus Modul 4 */}
        <div className="flex items-center gap-2">
          <Link
            href="/tutors/loading-demo"
            className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-100 transition"
          >
            ⏱️ Uji Coba loading.tsx (Delay 4s)
          </Link>
          <button
            onClick={() => setTriggerError(true)}
            className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-semibold hover:bg-red-100 transition cursor-pointer"
          >
            ⚠️ Uji Coba error.tsx
          </button>
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Direktori Pengajar TutorCare</h1>
        <p className="text-slate-600">Temukan guru privat terbaik berdasarkan mata pelajaran dan mode belajar.</p>
      </div>

      <FilterBar 
        selectedSubject={subject} 
        setSelectedSubject={setSubject} 
        selectedMode={mode} 
        setSelectedMode={setMode} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredTutors.length > 0 ? (
          filteredTutors.map(tutor => (
            <TutorCard key={tutor.id} tutor={tutor} onBook={setSelectedTutorName} />
          ))
        ) : (
          <p className="col-span-full text-center text-slate-500 py-10 font-medium">Tidak ada tutor yang sesuai dengan filter pencarian.</p>
        )}
      </div>

      <BookingModal
        isOpen={selectedTutorName !== ''}
        onClose={() => setSelectedTutorName('')}
        tutorName={selectedTutorName}
      />
    </div>
  );
}