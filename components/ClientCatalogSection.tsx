'use client';

import React, { useState } from 'react';
import FilterBar from '@/components/FilterBar';
import TutorCard, { type TutorItemProps } from '@/components/TutorCard';
import BookingModal from '@/components/BookingModal';

interface ClientCatalogSectionProps {
  initialTutors: TutorItemProps[];
}

export default function ClientCatalogSection({ initialTutors }: ClientCatalogSectionProps) {
  const [selectedSubject, setSelectedSubject] = useState('Semua');
  const [selectedMode, setSelectedMode] = useState('Semua');

  // State untuk mengontrol Booking Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<{ id: number; name: string } | null>(null);

  const handleOpenBooking = (tutor: { id: number; name: string }) => {
    setSelectedTutor(tutor);
    setIsModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsModalOpen(false);
    setSelectedTutor(null);
  };

  const filteredTutors = initialTutors.filter((tutor) => {
    const subject = tutor.mataPelajaran || tutor.subject || '';
    const mode = tutor.moda || tutor.mode || '';

    const matchSubject =
      selectedSubject === 'Semua' ||
      !selectedSubject ||
      subject.toLowerCase().includes(selectedSubject.toLowerCase());

    const matchMode =
      selectedMode === 'Semua' ||
      !selectedMode ||
      mode === selectedMode ||
      mode === 'Hybrid';

    return matchSubject && matchMode;
  });

  return (
    <>
      {/* Filter Bar Component */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-slate-200 mb-12">
        <FilterBar
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
        />
      </div>

      {/* Tutors Directory Grid */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Daftar Pengajar Berpengalaman
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Data persisten dimuat langsung dari basis data PostgreSQL.
          </p>
        </div>
        <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {filteredTutors.length} Tutor Tersedia
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutors.length > 0 ? (
          filteredTutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              onBook={handleOpenBooking}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 font-medium text-sm">
              Tidak ada tutor yang sesuai dengan filter pencarian Anda.
            </p>
          </div>
        )}
      </div>

      {/* Modal Pemesanan */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseBooking}
        tutor={selectedTutor}
      />
    </>
  );
}
