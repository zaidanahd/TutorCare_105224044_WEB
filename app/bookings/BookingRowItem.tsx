'use client';

import React, { useTransition } from 'react';
import Link from 'next/link';
import { updateBookingStatusAction, deleteBookingAction } from './actions';

interface BookingRowProps {
  booking: {
    id: number;
    kodeBooking: string;
    namaSiswa: string;
    kontakSiswa: string;
    jenjangSiswa: string;
    tanggalSesi: Date;
    durasiJam: number;
    catatan: string | null;
    status: string;
    createdAt: Date;
    tutor: {
      id: number;
      nama: string;
      mataPelajaran: string;
      tarifPerJam: number;
      moda: string;
    };
  };
}

export default function BookingRowItem({ booking }: BookingRowProps) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(async () => {
      await updateBookingStatusAction(booking.id, newStatus);
    });
  };

  const handleDelete = () => {
    if (confirm(`Yakin ingin membatalkan & menghapus reservasi ${booking.kodeBooking}?`)) {
      startTransition(async () => {
        await deleteBookingAction(booking.id);
      });
    }
  };

  const totalBiaya = booking.durasiJam * booking.tutor.tarifPerJam;

  return (
    <div className={`py-5 transition ${isPending ? 'opacity-50' : 'opacity-100'}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Kolom Informasi Siswa & Booking */}
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-md">
              {booking.kodeBooking}
            </span>
            <strong className="text-base text-slate-900 font-extrabold">
              {booking.namaSiswa}
            </strong>
            <span className="text-xs text-slate-500 font-medium">
              ({booking.jenjangSiswa})
            </span>
            <span className="text-xs text-slate-400">• WA: {booking.kontakSiswa}</span>
          </div>

          {/* Relasi Tutor */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span>Tutor Pengajar:</span>
            <Link
              href={`/tutors/${booking.tutor.id}`}
              className="font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              👨‍🏫 {booking.tutor.nama} ({booking.tutor.mataPelajaran})
            </Link>
            <span className="text-slate-400">• Moda: {booking.tutor.moda}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
            <span>📅 {new Date(booking.tanggalSesi).toLocaleString('id-ID')}</span>
            <span>⏱️ {booking.durasiJam} Jam</span>
            <span>💰 Est. Biaya: <strong>Rp {totalBiaya.toLocaleString('id-ID')}</strong></span>
          </div>

          {booking.catatan && (
            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border-l-2 border-amber-400 mt-2">
              📝 Catatan Materi: {booking.catatan}
            </p>
          )}
        </div>

        {/* Kolom Aksi Update Status & Delete */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <div className="flex flex-col items-end gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">
              Ubah Status (Update)
            </label>
            <select
              value={booking.status}
              disabled={isPending}
              onChange={handleStatusChange}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer transition ${
                booking.status === 'Dikonfirmasi'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : booking.status === 'Selesai'
                  ? 'bg-slate-100 text-slate-700 border-slate-300'
                  : booking.status === 'Dibatalkan'
                  ? 'bg-red-50 text-red-800 border-red-300'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}
            >
              <option value="Menunggu Konfirmasi">⏳ Menunggu Konfirmasi</option>
              <option value="Dikonfirmasi">✅ Dikonfirmasi</option>
              <option value="Selesai">🎓 Selesai</option>
              <option value="Dibatalkan">❌ Dibatalkan</option>
            </select>
          </div>

          <button
            onClick={handleDelete}
            disabled={isPending}
            title="Hapus Reservasi"
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
