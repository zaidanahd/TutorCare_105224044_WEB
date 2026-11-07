import { z } from 'zod';

export const bookingFormSchema = z.object({
  tutorId: z.coerce
    .number({ error: 'Tutor wajib dipilih' })
    .int({ message: 'ID Tutor tidak valid' })
    .positive({ message: 'Pilih tutor yang valid dari direktori' }),

  studentName: z
    .string()
    .trim()
    .min(3, { message: 'Nama lengkap siswa minimal 3 karakter' })
    .max(50, { message: 'Nama lengkap siswa maksimal 50 karakter' })
    .regex(/^[a-zA-Z\s.'-]+$/, {
      message: 'Nama hanya boleh memuat huruf, spasi, dan tanda baca lazim',
    })
    .refine((val) => {
      const uniqueChars = new Set(val.replace(/\s+/g, '').toLowerCase());
      return uniqueChars.size > 1;
    }, {
      message: 'Nama tidak valid (jangan gunakan huruf kembar berulang)',
    }),

  contactPhone: z
    .string()
    .trim()
    .regex(/^08[1-9][0-9]{7,11}$/, {
      message: 'Nomor WhatsApp harus format Indonesia aktif (diawali 08, 10–13 digit angka)',
    })
    .refine((val) => {
      const digits = val.substring(2);
      const uniqueDigits = new Set(digits);
      return uniqueDigits.size > 1;
    }, {
      message: 'Nomor WhatsApp tidak valid (nomor fiktif berulang terdeteksi)',
    }),

  gradeLevel: z
    .string()
    .trim()
    .min(2, { message: 'Jenjang siswa minimal 2 karakter (misal: SD, SMP, SMA)' }),

  sessionDate: z
    .string()
    .min(1, { message: 'Tanggal dan waktu sesi belajar wajib ditentukan' })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Format tanggal dan waktu tidak valid',
    }),

  durationHours: z.coerce
    .number({ error: 'Durasi harus berupa angka' })
    .int({ message: 'Durasi harus berupa bilangan bulat' })
    .min(1, { message: 'Durasi belajar minimal 1 jam' })
    .max(8, { message: 'Durasi belajar maksimal 8 jam per sesi' }),

  notes: z
    .string()
    .trim()
    .max(300, { message: 'Catatan tambahan maksimal 300 karakter' })
    .optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
