import React from 'react';
import Link from 'next/link';
import type { Tutor } from '@/app/data/mockTutors';

interface TutorCardProps {
  tutor: Tutor;
  onBook: (tutorName: string) => void;
}

export default function TutorCard({ tutor, onBook }: TutorCardProps) {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <div className="flex gap-4 mb-4">
          <img src={tutor.avatarUrl} alt={tutor.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-200" />
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              <Link href={`/tutors/${tutor.id}`} className="hover:text-blue-600 transition">
                {tutor.name}
              </Link>
            </h3>
            <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">✓ Verified Tutor</span>
            <p className="text-sm font-semibold text-slate-600 mt-1">{tutor.experienceYears} Tahun Pengalaman</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-sm mb-3">
          <span className="text-amber-500 font-bold">★ {tutor.rating}</span>
          <span className="font-bold text-slate-800">({tutor.reviewsCount} Ulasan)</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2.5 py-1 rounded-md">{tutor.subject}</span>
          <span className="bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-md">{tutor.mode}</span>
        </div>
        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border-l-4 border-blue-600 mb-6">
          &ldquo;{tutor.bio}&rdquo;
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-auto gap-2">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase">Tarif / Jam</span>
          <p className="text-lg font-extrabold text-slate-900">Rp {tutor.pricePerHour.toLocaleString('id-ID')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/tutors/${tutor.id}`}
            className="border border-blue-600 text-blue-600 font-bold px-3 py-2 rounded-full text-xs hover:bg-blue-50 transition"
          >
            Detail
          </Link>
          <button onClick={() => onBook(tutor.name)} className="bg-[#1f6feb] text-white font-bold px-4 py-2 rounded-full text-xs hover:bg-[#134db3] transition cursor-pointer">
            Pesan Sesi
          </button>
        </div>
      </div>
    </div>
  );
}