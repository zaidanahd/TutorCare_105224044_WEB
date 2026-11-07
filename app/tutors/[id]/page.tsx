import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import { deleteTutorAction } from '../actions';

export default async function HalamanDetailTutor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tutorId = parseInt(id, 10);

  if (isNaN(tutorId) || tutorId <= 0) {
    notFound();
  }

  const tutor = await prisma.tutor.findUnique({
    where: { id: tutorId },
    include: {
      bookings: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!tutor) {
    notFound();
  }

  const deleteTutorWithId = deleteTutorAction.bind(null, tutor.id);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="container mx-auto px-4 py-10 max-w-4xl">
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition mb-6"
          >
            ← Kembali ke Direktori Tutor
          </Link>

          {/* Kartu Profil Utama */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-5">
                <img
                  src={
                    tutor.avatarUrl ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
                  }
                  alt={tutor.nama}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-200 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-black text-slate-900">{tutor.nama}</h1>
                    <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full">
                      ✓ Terverifikasi
                    </span>
                  </div>
                  <p className="text-blue-600 font-bold text-sm mt-0.5">
                    {tutor.mataPelajaran} • {tutor.jenjang}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    ID Database: #{tutor.id} • {tutor.pengalamanTahun} Tahun Pengalaman
                  </p>
                </div>
              </div>

              {/* Tombol Aksi Update & Delete */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href={`/tutors/${tutor.id}/edit`}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow transition text-center"
                >
                  ✏️ Edit Profil
                </Link>

                <form action={deleteTutorWithId} className="flex-1 sm:flex-initial">
                  <button
                    type="submit"
                    className="w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
                  >
                    🗑️ Hapus Tutor
                  </button>
                </form>
              </div>
            </div>

            {/* Spesifikasi Detail */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-100 text-center">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Tarif / Jam</span>
                <p className="text-base font-black text-slate-900 mt-0.5">
                  Rp {tutor.tarifPerJam.toLocaleString('id-ID')}
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Moda Belajar</span>
                <p className="text-base font-black text-blue-600 mt-0.5">{tutor.moda}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Rating Rata-rata</span>
                <p className="text-base font-black text-amber-500 mt-0.5">★ {tutor.rating}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Status Tutor</span>
                <p className="text-base font-black text-emerald-600 mt-0.5">
                  {tutor.tersedia ? 'Tersedia' : 'Sibuk'}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="pt-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Tentang Pengajar</h3>
              <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-4 rounded-2xl border-l-4 border-blue-600">
                {tutor.bio}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <span>💬 Kontak WhatsApp:</span>
                <strong className="text-slate-900 font-semibold">{tutor.kontakWa}</strong>
              </div>
            </div>
          </div>

          {/* Relasi Data (1:N): Riwayat Reservasi Terkait */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Relasi Data (1 : N)
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                  Daftar Sesi Bimbingan Siswa ({tutor.bookings.length})
                </h2>
              </div>
            </div>

            {tutor.bookings.length > 0 ? (
              <div className="space-y-3">
                {tutor.bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-md">
                          {booking.kodeBooking}
                        </span>
                        <strong className="text-sm text-slate-900">{booking.namaSiswa}</strong>
                        <span className="text-xs text-slate-500">({booking.jenjangSiswa})</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        📅 Jadwal: {new Date(booking.tanggalSesi).toLocaleString('id-ID')} ({booking.durasiJam} Jam)
                      </p>
                      {booking.catatan && (
                        <p className="text-xs text-slate-500 italic mt-0.5">&ldquo;{booking.catatan}&rdquo;</p>
                      )}
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full text-center ${
                        booking.status === 'Dikonfirmasi'
                          ? 'bg-emerald-100 text-emerald-800'
                          : booking.status === 'Selesai'
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-xs text-slate-500 font-medium">
                  Belum ada sesi bimbingan yang terdaftar untuk tutor ini.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
