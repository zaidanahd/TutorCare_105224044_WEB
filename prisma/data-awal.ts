import type { Kategori } from "../lib/tipe";

type DataAwal = {
  judul: string;
  kategori: Kategori;
  deskripsi: string;
  tersedia: boolean;
};

export const dataAwal: DataAwal[] = [
  {
    judul: "Panel surya atap",
    kategori: "energi",
    deskripsi: "Pemantauan produksi listrik harian.",
    tersedia: true,
  },
  {
    judul: "Modul Praktikum Next.js",
    kategori: "kampus",
    deskripsi: "Panduan praktikum pemrograman web Next.js App Router.",
    tersedia: true,
  },
  {
    judul: "Pengelolaan Sampah Mandiri",
    kategori: "lingkungan",
    deskripsi: "Sistem daur ulang dan kompos ramah lingkungan untuk komunitas.",
    tersedia: false,
  },
  {
    judul: "Laboratorium Komputasi Awan",
    kategori: "kampus",
    deskripsi: "Fasilitas server cloud dan virtualisasi untuk riset mahasiswa.",
    tersedia: true,
  },
  {
    judul: "Turbin Angin Mikro Kampus",
    kategori: "energi",
    deskripsi: "Pembangkit listrik tenaga bayu skala mikro untuk penerangan.",
    tersedia: true,
  },
  {
    judul: "Konservasi Air Hujan Gedung",
    kategori: "lingkungan",
    deskripsi: "Sistem filtrasi dan penampungan air hujan untuk sanitasi gedung.",
    tersedia: true,
  },
];
