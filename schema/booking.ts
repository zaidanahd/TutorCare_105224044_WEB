import { z } from 'zod';

export const bookingFormSchema = z.object({
  studentName: z
    .string()
    .trim()
    .min(3, { message: 'Nama lengkap minimal 3 karakter' })
    .max(50, { message: 'Nama lengkap maksimal 50 karakter' })
    .regex(/^[a-zA-Z\s.'-]+$/, {
      message: 'Nama hanya boleh memuat huruf, spasi, dan tanda baca nama lazim',
    })
    .refine((val) => {
      // Mencegah input karakter berulang yang sama (misal "aaaa", "bbbbb")
      const uniqueChars = new Set(val.replace(/\s+/g, '').toLowerCase());
      return uniqueChars.size > 1;
    }, {
      message: 'Nama tidak valid (jangan gunakan huruf kembar berulang)',
    }),

  contactPhone: z
    .string()
    .trim()
    .regex(/^08[1-9][0-9]{7,11}$/, {
      message: 'Nomor WhatsApp harus nomor Indonesia aktif (diawali 08, 10–13 digit angka)',
    })
    .refine((val) => {
      // Mencegah nomor telepon palsu angka berulang (misal "081111111111", "080000000000")
      const digits = val.substring(2);
      const uniqueDigits = new Set(digits);
      return uniqueDigits.size > 1;
    }, {
      message: 'Nomor WhatsApp tidak valid (nomor fiktif terdeteksi)',
    }),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
