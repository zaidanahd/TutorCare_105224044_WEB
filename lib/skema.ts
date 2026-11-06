import { z } from "zod";

export const skemaItem = z.object({
  judul: z
    .string()
    .trim()
    .min(3, "Judul minimal 3 karakter")
    .max(80, "Judul maksimal 80 karakter"),
  kategori: z.enum(["energi", "lingkungan", "kampus"], {
    error: "Pilih salah satu kategori",
  }),
  deskripsi: z
    .string()
    .trim()
    .min(10, "Deskripsi minimal 10 karakter")
    .max(300, "Deskripsi maksimal 300 karakter"),
  tersedia: z.boolean().default(true),
});

export type MasukanItem = z.infer<typeof skemaItem>;

export const skemaUlasan = z.object({
  nama: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter")
    .max(60, "Nama maksimal 60 karakter"),
  nilai: z
    .coerce
    .number()
    .int("Nilai harus berupa bilangan bulat")
    .min(1, "Nilai minimal 1")
    .max(5, "Nilai maksimal 5"),
  komentar: z
    .string()
    .trim()
    .min(5, "Komentar minimal 5 karakter")
    .max(500, "Komentar maksimal 500 karakter"),
});

export type MasukanUlasan = z.infer<typeof skemaUlasan>;

export const skemaMasuk = z.object({
  email: z.email("Format email tidak valid"),
  kataSandi: z.string().min(8, "Kata sandi minimal 8 karakter"),
});

export type MasukanMasuk = z.infer<typeof skemaMasuk>;
