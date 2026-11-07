import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientCatalogSection from '@/components/ClientCatalogSection';
import { prisma } from '@/lib/prisma';
import { MOCK_TUTORS } from '../data/mockTutors';

export default async function TutorsDirectoryPage() {
  let tutors = [];

  try {
    const dbTutors = await prisma.tutor.findMany({
      orderBy: { id: 'asc' },
    });

    if (dbTutors.length > 0) {
      tutors = dbTutors.map((t) => ({
        id: t.id,
        nama: t.nama,
        mataPelajaran: t.mataPelajaran,
        jenjang: t.jenjang,
        moda: t.moda,
        tarifPerJam: t.tarifPerJam,
        rating: t.rating,
        pengalamanTahun: t.pengalamanTahun,
        avatarUrl: t.avatarUrl,
        bio: t.bio,
      }));
    } else {
      tutors = MOCK_TUTORS.map((m) => ({
        id: Number(m.id),
        nama: m.name,
        mataPelajaran: m.subject,
        jenjang: m.gradeLevel,
        moda: m.mode,
        tarifPerJam: m.pricePerHour,
        rating: m.rating,
        pengalamanTahun: m.experienceYears,
        avatarUrl: m.avatarUrl,
        bio: m.bio,
      }));
    }
  } catch (error) {
    console.error('Gagal mengambil data tutor:', error);
    tutors = MOCK_TUTORS.map((m) => ({
      id: Number(m.id),
      nama: m.name,
      mataPelajaran: m.subject,
      jenjang: m.gradeLevel,
      moda: m.mode,
      tarifPerJam: m.pricePerHour,
      rating: m.rating,
      pengalamanTahun: m.experienceYears,
      avatarUrl: m.avatarUrl,
      bio: m.bio,
    }));
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="container mx-auto px-5 py-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-[#1f6feb] text-sm"
            >
              <span aria-hidden="true">←</span>
              Kembali ke Beranda
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/bookings"
                className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 transition shadow-sm flex items-center gap-1.5"
              >
                📋 Manajemen Pemesanan ({tutors.length} Tutor)
              </Link>
              <Link
                href="/tutors/tambah"
                className="px-4 py-2 bg-[#1f6feb] text-white rounded-xl text-xs font-bold hover:bg-[#134db3] transition shadow-md flex items-center gap-1.5"
              >
                + Tambah Profil Tutor Baru
              </Link>
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Direktori Terverifikasi
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2 mb-2">
              Direktori Pengajar TutorCare
            </h1>
            <p className="text-slate-600 text-sm">
              Kelola data tutor secara persisten menggunakan PostgreSQL dan Prisma ORM 7.
            </p>
          </div>

          <ClientCatalogSection initialTutors={tutors} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
