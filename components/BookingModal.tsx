import React, { useState } from 'react';
import { bookingFormSchema } from '@/schema/booking';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutorName: string;
}

export default function BookingModal({ isOpen, onClose, tutorName }: BookingModalProps) {
  const [studentName, setStudentName] = useState('');
  const [contact, setContact] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ studentName?: string; contactPhone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setFieldErrors({});
    setFormSuccess(false);
    onClose();
  };

  const validateField = (fieldName: 'studentName' | 'contactPhone', value: string) => {
    const dataToValidate = {
      studentName: fieldName === 'studentName' ? value : studentName,
      contactPhone: fieldName === 'contactPhone' ? value : contact,
    };
    const result = bookingFormSchema.safeParse(dataToValidate);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === fieldName);
      setFieldErrors((prev) => ({
        ...prev,
        [fieldName]: issue ? issue.message : undefined,
      }));
    } else {
      setFieldErrors((prev) => ({
        ...prev,
        [fieldName]: undefined,
      }));
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi Zod
    const validationResult = bookingFormSchema.safeParse({
      studentName,
      contactPhone: contact,
    });

    if (!validationResult.success) {
      const formattedErrors: { studentName?: string; contactPhone?: string } = {};
      for (const issue of validationResult.error.issues) {
        const field = issue.path[0] as 'studentName' | 'contactPhone';
        if (!formattedErrors[field]) {
          formattedErrors[field] = issue.message;
        }
      }
      setFieldErrors(formattedErrors);
      setFormSuccess(false);
      return;
    }

    // Lolos validasi
    setFieldErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      setTimeout(() => {
        setFormSuccess(false);
        handleClose();
        setStudentName('');
        setContact('');
      }, 2500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl border border-slate-100">
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
            Reservasi Bimbingan Belajar
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Pesan Sesi Belajar</h3>
          <p className="text-sm text-slate-600 mt-1">
            Pengajar pilihan:{' '}
            <strong className="text-blue-600 font-bold">{tutorName}</strong>
          </p>
        </div>

        {formSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-sm rounded-2xl font-medium flex items-start gap-3 shadow-sm">
            <span className="text-xl">✅</span>
            <div>
              <p className="font-bold">Pemesanan Sesi Berhasil!</p>
              <p className="text-xs text-emerald-700 mt-0.5">
                Data valid telah terkirim. Tutor <strong>{tutorName}</strong> akan segera menghubungi nomor Anda.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4" noValidate>
          {/* Input Nama Siswa */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="studentName" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Nama Lengkap Siswa <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Min. 3 huruf alfabet</span>
            </div>
            <input
              id="studentName"
              type="text"
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
                if (fieldErrors.studentName) {
                  validateField('studentName', e.target.value);
                }
              }}
              onBlur={() => validateField('studentName', studentName)}
              placeholder="Contoh: Ahmad Zaidan"
              className={`w-full h-12 px-4 border-2 rounded-xl bg-slate-50 text-slate-900 font-medium transition focus:outline-none ${
                fieldErrors.studentName
                  ? 'border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
              }`}
            />
            {fieldErrors.studentName && (
              <p className="mt-1.5 text-xs text-red-600 font-semibold flex items-center gap-1.5">
                <span>⚠️</span>
                <span>{fieldErrors.studentName}</span>
              </p>
            )}
          </div>

          {/* Input Nomor WhatsApp */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="contactPhone" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Nomor WhatsApp Aktif <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Format: 08xxxxxxxxxx</span>
            </div>
            <input
              id="contactPhone"
              type="tel"
              inputMode="numeric"
              value={contact}
              onChange={(e) => {
                // Otomatis hanya memperbolehkan karakter angka
                const sanitized = e.target.value.replace(/\D/g, '');
                setContact(sanitized);
                if (fieldErrors.contactPhone) {
                  validateField('contactPhone', sanitized);
                }
              }}
              onBlur={() => validateField('contactPhone', contact)}
              placeholder="Contoh: 081234567890"
              maxLength={14}
              className={`w-full h-12 px-4 border-2 rounded-xl bg-slate-50 text-slate-900 font-medium transition focus:outline-none ${
                fieldErrors.contactPhone
                  ? 'border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
              }`}
            />
            {fieldErrors.contactPhone && (
              <p className="mt-1.5 text-xs text-red-600 font-semibold flex items-center gap-1.5">
                <span>⚠️</span>
                <span>{fieldErrors.contactPhone}</span>
              </p>
            )}
            <p className="mt-1 text-[11px] text-slate-500">
              Gunakan nomor WhatsApp aktif untuk konfirmasi jadwal bimbingan.
            </p>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-12 text-white font-extrabold rounded-xl shadow-md transition flex items-center justify-center gap-2 mt-2 cursor-pointer ${
              isSubmitting
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99]'
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Memvalidasi & Mengirim...</span>
              </>
            ) : (
              'Konfirmasi & Pesan Sesi'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}