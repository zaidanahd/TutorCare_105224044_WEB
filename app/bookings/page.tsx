import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import BookingRowItem from './BookingRowItem';

export default async function ManajemenBookingPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      tutor: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="container mx-auto px-4 py-10 max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Entitas 2: Relasi Data & CRUD Booking
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
                Manajemen Reservasi Sesi Belajar
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Data terhubung langsung dengan entitas Tutor melalui foreign key di PostgreSQL.
              </p>
            </div>

            <Link
              href="/tutors"
              className="px-4 py-2.5 bg-[#1f6feb] text-white rounded-xl text-xs font-bold hover:bg-[#134db3] transition shadow-md flex items-center gap-1.5"
            >
              + Pesan Sesi Baru di Direktori Tutor
            </Link>
          </div>

          {/* Tabel / Daftar Pemesanan */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-700">
                Total Reservasi: {bookings.length} Sesi Terjadwal
              </span>
              <span className="text-xs text-slate-500">
                Operasi Lengkap: Read, Update Status, & Delete
              </span>
            </div>

            {bookings.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {bookings.map((booking) => (
                  <BookingRowItem key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-slate-500 font-medium text-sm">
                  Belum ada data pemesanan di database.
                </p>
                <Link
                  href="/tutors"
                  className="inline-block mt-4 text-xs font-bold text-blue-600 hover:underline"
                >
                  Pilih tutor dan buat reservasi sekarang →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
