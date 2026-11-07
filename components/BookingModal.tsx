'use client';

import React, { useState, useTransition } from 'react';
import { createBookingAction, type BookingActionState } from '@/app/bookings/actions';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: { id: number; name: string } | null;
}

export default function BookingModal({ isOpen, onClose, tutor }: BookingModalProps) {
  const [studentName, setStudentName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [gradeLevel, setGradeLevel] = useState('SMA Kelas 12');
  const [sessionDate, setSessionDate] = useState('');
  const [durationHours, setDurationHours] = useState('2');
  const [notes, setNotes] = useState('');

  const [state, setState] = useState<BookingActionState>({});
  const [isPending, startTransition] = useTransition();

  if (!isOpen || !tutor) return null;

  const handleClose = () => {
    setState({});
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('tutorId', String(tutor.id));
    formData.append('studentName', studentName);
    formData.append('contactPhone', contactPhone);
    formData.append('gradeLevel', gradeLevel);
    formData.append('sessionDate', sessionDate);
    formData.append('durationHours', durationHours);
    formData.append('notes', notes);

    startTransition(async () => {
      const res = await createBookingAction({}, formData);
      setState(res);
      if (res.success) {
        setTimeout(() => {
          setStudentName('');
          setContactPhone('');
          setNotes('');
          handleClose();
        }, 3000);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-5 right-5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 w-9 h-9 rounded-full font-bold flex items-center justify-center cursor-pointer transition"
          aria-label="Tutup modal"
        >
          ✕
        </button>

        <div className="mb-6">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
            Reservasi Sesi Belajar (Milestone 2)
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Pesan Sesi Bimbingan
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Tutor Pilihan:{' '}
            <strong className="text-blue-600 font-bold">{tutor.name}</strong>
          </p>
        </div>

        {/* Notifikasi Sukses */}
        {state.success && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex flex-col gap-1">
            <span className="font-bold flex items-center gap-1.5">
              🎉 {state.message}
            </span>
            <p className="text-xs text-emerald-700">
              Data pemesanan tersimpan secara persisten di database PostgreSQL.
            </p>
          </div>
        )}

        {/* Notifikasi Galat Umum */}
        {!state.success && state.message && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl text-xs font-semibold">
            ⚠️ {state.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Siswa */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Nama Lengkap Siswa *
            </label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Contoh: Ahmad Zaidan"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 outline-none transition focus:ring-2 ${
                state.fieldErrors?.studentName
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-slate-300 focus:ring-blue-200'
              }`}
            />
            {state.fieldErrors?.studentName && (
              <p className="text-red-600 text-xs mt-1 font-semibold">
                {state.fieldErrors.studentName}
              </p>
            )}
          </div>

          {/* Nomor WhatsApp */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Nomor WhatsApp Aktif *
            </label>
            <input
              type="tel"
              required
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Contoh: 081234567890"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 outline-none transition focus:ring-2 ${
                state.fieldErrors?.contactPhone
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-slate-300 focus:ring-blue-200'
              }`}
            />
            {state.fieldErrors?.contactPhone && (
              <p className="text-red-600 text-xs mt-1 font-semibold">
                {state.fieldErrors.contactPhone}
              </p>
            )}
            <span className="text-[11px] text-slate-400">
              Format: Diawali 08, 10–13 digit angka valid Indonesia.
            </span>
          </div>

          {/* Jenjang & Durasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Jenjang Pendidikan
              </label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-200 bg-white"
              >
                <option value="SD">SD (Sekolah Dasar)</option>
                <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
                <option value="SMA">SMA (Sekolah Menengah Atas)</option>
                <option value="Mahasiswa">Mahasiswa / Umum</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Durasi Belajar
              </label>
              <select
                value={durationHours}
                onChange={(e) => setDurationHours(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-200 bg-white"
              >
                <option value="1">1 Jam</option>
                <option value="2">2 Jam (Direkomendasikan)</option>
                <option value="3">3 Jam</option>
                <option value="4">4 Jam</option>
              </select>
            </div>
          </div>

          {/* Tanggal Sesi */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Rencana Tanggal & Waktu Sesi *
            </label>
            <input
              type="datetime-local"
              required
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 outline-none transition focus:ring-2 ${
                state.fieldErrors?.sessionDate
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-slate-300 focus:ring-blue-200'
              }`}
            />
            {state.fieldErrors?.sessionDate && (
              <p className="text-red-600 text-xs mt-1 font-semibold">
                {state.fieldErrors.sessionDate}
              </p>
            )}
          </div>

          {/* Catatan Bimbingan */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Materi Spesifik / Catatan Tambahan (Opsional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Misal: Persiapan ujian bab Trigonometri & Logaritma..."
              className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#1f6feb] hover:bg-[#134db3] text-white font-extrabold py-3 rounded-2xl shadow-lg transition duration-200 disabled:opacity-50 cursor-pointer text-sm"
            >
              {isPending ? 'Menyimpan ke Database...' : 'Konfirmasi & Simpan Reservasi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
