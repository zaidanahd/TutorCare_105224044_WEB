import React, { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutorName: string;
}

export default function BookingModal({ isOpen, onClose, tutorName }: BookingModalProps) {
  const [studentName, setStudentName] = useState('');
  const [contact, setContact] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  if (!isOpen) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !contact.trim()) {
      setFormError('Nama siswa dan nomor kontak wajib diisi dengan benar!');
      setFormSuccess(false);
      return;
    }
    setFormError('');
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      onClose();
      setStudentName('');
      setContact('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 w-9 h-9 rounded-full font-bold flex items-center justify-center cursor-pointer transition">✕</button>
        <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Pesan Sesi Belajar</h3>
        <p className="text-sm text-slate-600 mb-6">Pengajar pilihan: <strong className="text-blue-600">{tutorName}</strong></p>

        {formError && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl font-medium">{formError}</div>}
        {formSuccess && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl font-medium">Pemesanan berhasil dikirim! Tim kami akan segera menghubungi Anda.</div>}

        <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Nama Lengkap Siswa</label>
            <input 
              type="text" 
              value={studentName} 
              onChange={(e) => setStudentName(e.target.value)} 
              placeholder="Contoh: Ahmad Zaidan"
              className="w-full h-12 px-4 border-2 border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:border-blue-600 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Nomor WhatsApp Aktif</label>
            <input 
              type="text" 
              value={contact} 
              onChange={(e) => setContact(e.target.value)} 
              placeholder="Contoh: 08123456789"
              className="w-full h-12 px-4 border-2 border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:border-blue-600 font-medium"
            />
          </div>
          <button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md transition cursor-pointer mt-2">
            Konfirmasi Pesanan
          </button>
        </form>
      </div>
    </div>
  );
}