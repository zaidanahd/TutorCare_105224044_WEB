import React from 'react';
import Link from 'next/link';

export interface TutorItemProps {
  id: number | string;
  nama: string;
  mataPelajaran: string;
  jenjang?: string;
  moda: string;
  tarifPerJam: number;
  rating?: number;
  pengalamanTahun?: number;
  avatarUrl?: string | null;
  bio: string;
  // Backward compatibility alias:
  name?: string;
  subject?: string;
  mode?: string;
  pricePerHour?: number;
  experienceYears?: number;
}

interface TutorCardProps {
  tutor: TutorItemProps;
  onBook: (tutor: { id: number; name: string }) => void;
}

export default function TutorCard({ tutor, onBook }: TutorCardProps) {
  const tutorId = Number(tutor.id);
  const displayName = tutor.nama || tutor.name || 'Tutor Tanpa Nama';
  const displaySubject = tutor.mataPelajaran || tutor.subject || 'Umum';
  const displayMode = tutor.moda || tutor.mode || 'Online';
  const displayTarif = tutor.tarifPerJam || tutor.pricePerHour || 50000;
  const displayExp = tutor.pengalamanTahun || tutor.experienceYears || 2;
  const displayRating = tutor.rating || 5.0;
  const displayAvatar =
    tutor.avatarUrl ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <div className="flex gap-4 mb-4">
          <img
            src={displayAvatar}
            alt={displayName}
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
          />
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              <Link href={`/tutors/${tutorId}`} className="hover:text-blue-600 transition">
                {displayName}
              </Link>
            </h3>
            <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
              ✓ Verified Tutor
            </span>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              {displayExp} Tahun Pengalaman
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-sm mb-3">
          <span className="text-amber-500 font-bold">★ {displayRating}</span>
          <span className="font-bold text-slate-500 text-xs">Rating Siswa</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2.5 py-1 rounded-md">
            {displaySubject}
          </span>
          <span className="bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-md">
            {displayMode}
          </span>
        </div>

        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border-l-4 border-blue-600 mb-6">
          &ldquo;{tutor.bio}&rdquo;
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-auto gap-2">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase">Tarif / Jam</span>
          <p className="text-lg font-extrabold text-slate-900">
            Rp {displayTarif.toLocaleString('id-ID')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/tutors/${tutorId}`}
            className="border border-blue-600 text-blue-600 font-bold px-3 py-2 rounded-full text-xs hover:bg-blue-50 transition"
          >
            Detail
          </Link>
          <button
            onClick={() => onBook({ id: tutorId, name: displayName })}
            className="bg-[#1f6feb] text-white font-bold px-4 py-2 rounded-full text-xs hover:bg-[#134db3] transition cursor-pointer"
          >
            Pesan Sesi
          </button>
        </div>
      </div>
    </div>
  );
}
