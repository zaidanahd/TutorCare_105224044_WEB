import { z } from 'zod';

export const tutorFormSchema = z.object({
  nama: z
    .string()
    .trim()
    .min(3, { message: 'Nama lengkap tutor minimal 3 karakter' })
    .max(60, { message: 'Nama lengkap tutor maksimal 60 karakter' })
    .regex(/^[a-zA-Z\s.,'-]+$/, {
      message: 'Nama hanya boleh memuat huruf, spasi, gelar, dan tanda baca lazim',
    }),

  mataPelajaran: z
    .string()
    .trim()
    .min(3, { message: 'Mata pelajaran minimal 3 karakter' })
    .max(80, { message: 'Mata pelajaran maksimal 80 karakter' }),

  jenjang: z
    .string()
    .trim()
    .min(2, { message: 'Target jenjang belajar minimal 2 karakter (misal: SMP & SMA)' }),

  moda: z.enum(['Online', 'Offline', 'Hybrid'], {
    error: 'Pilih salah satu moda belajar yang valid (Online, Offline, atau Hybrid)',
  }),

  tarifPerJam: z.coerce
    .number({ error: 'Tarif harus berupa angka' })
    .int({ message: 'Tarif harus berupa bilangan bulat' })
    .min(25000, { message: 'Tarif minimal bimbingan adalah Rp 25.000 per jam' })
    .max(2000000, { message: 'Tarif maksimal bimbingan adalah Rp 2.000.000 per jam' }),

  pengalamanTahun: z.coerce
    .number({ error: 'Pengalaman harus berupa angka' })
    .int({ message: 'Pengalaman harus berupa bilangan bulat' })
    .min(1, { message: 'Pengalaman mengajar minimal 1 tahun' })
    .max(40, { message: 'Pengalaman mengajar maksimal 40 tahun' }),

  kontakWa: z
    .string()
    .trim()
    .regex(/^08[1-9][0-9]{7,11}$/, {
      message: 'Nomor WhatsApp harus format Indonesia aktif (diawali 08, 10–13 digit angka)',
    }),

  bio: z
    .string()
    .trim()
    .min(15, { message: 'Deskripsi profil / bio minimal 15 karakter' })
    .max(500, { message: 'Deskripsi profil / bio maksimal 500 karakter' }),

  avatarUrl: z.string().trim().optional(),
});

export type TutorFormData = z.infer<typeof tutorFormSchema>;
