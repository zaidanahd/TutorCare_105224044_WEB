import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { dataAwal } from "./data-awal";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  console.log("Memulai proses seeding database TutorCare...");

  // 1. Seeding Data Praktikum (Item & Ulasan)
  for (const data of dataAwal) {
    const item = await prisma.item.upsert({
      where: { judul: data.judul },
      update: {},
      create: data,
    });
    await prisma.ulasan.upsert({
      where: { itemId_nama: { itemId: item.id, nama: "Pengguna Uji" } },
      update: {},
      create: {
        itemId: item.id,
        nama: "Pengguna Uji",
        nilai: 4,
        komentar: "Ulasan sintetis untuk pengujian.",
      },
    });
  }

  // 2. Seeding Data Utama Produk TutorCare (Tutor)
  const dataTutor = [
    {
      id: 1,
      nama: "Sarah Amalia, S.Pd.",
      mataPelajaran: "Matematika & Fisika",
      jenjang: "SMP & SMA",
      moda: "Hybrid" as const,
      tarifPerJam: 75000,
      rating: 4.9,
      pengalamanTahun: 4,
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      bio: "Sabar membimbing siswa yang kesulitan memahami rumus dasar matematika dan fisika dengan pendekatan konsep interaktif.",
      kontakWa: "081234567891",
      tersedia: true,
    },
    {
      id: 2,
      nama: "Budi Santoso, M.Kom.",
      mataPelajaran: "Pemrograman & Komputer",
      jenjang: "SMA & Mahasiswa",
      moda: "Online" as const,
      tarifPerJam: 100000,
      rating: 5.0,
      pengalamanTahun: 6,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      bio: "Mengajar logika pemrograman dasar, Python, JavaScript, dan web development modern dari nol hingga mahir.",
      kontakWa: "081234567892",
      tersedia: true,
    },
    {
      id: 3,
      nama: "Alya Rahma, B.A.",
      mataPelajaran: "Bahasa Inggris",
      jenjang: "SD & SMP",
      moda: "Offline" as const,
      tarifPerJam: 60000,
      rating: 4.8,
      pengalamanTahun: 3,
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      bio: "Fokus pada conversational English dan persiapan ujian sekolah, membantu anak percaya diri berbicara aktif.",
      kontakWa: "081234567893",
      tersedia: true,
    },
    {
      id: 4,
      nama: "Dr. Hendra Wijaya",
      mataPelajaran: "Kimia & Biologi",
      jenjang: "SMA & Persiapan UTBK",
      moda: "Hybrid" as const,
      tarifPerJam: 90000,
      rating: 4.9,
      pengalamanTahun: 7,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      bio: "Spesialisasi bimbingan intensif persiapan ujian sains dan UTBK SNBT dengan bank soal teruji.",
      kontakWa: "081234567894",
      tersedia: true,
    },
  ];

  for (const t of dataTutor) {
    await prisma.tutor.upsert({
      where: { id: t.id },
      update: t,
      create: t,
    });
  }

  // 3. Seeding Data Pemesanan (Booking) Terelasi
  const dataBooking = [
    {
      kodeBooking: "TC-202611-001",
      tutorId: 1,
      namaSiswa: "Ahmad Zaidan",
      kontakSiswa: "081298765432",
      jenjangSiswa: "SMA Kelas 12",
      tanggalSesi: new Date("2026-11-10T14:00:00Z"),
      durasiJam: 2,
      catatan: "Bimbingan persiapan ujian akhir semester kalkulus dasar.",
      status: "Dikonfirmasi",
    },
    {
      kodeBooking: "TC-202611-002",
      tutorId: 2,
      namaSiswa: "Neila Faaizah",
      kontakSiswa: "081387654321",
      jenjangSiswa: "Mahasiswa",
      tanggalSesi: new Date("2026-11-12T16:00:00Z"),
      durasiJam: 2,
      catatan: "Review kode tugas Next.js App Router dan validasi Zod.",
      status: "Menunggu Konfirmasi",
    },
    {
      kodeBooking: "TC-202611-003",
      tutorId: 3,
      namaSiswa: "Dimas Aditya",
      kontakSiswa: "085612345678",
      jenjangSiswa: "SMP Kelas 9",
      tanggalSesi: new Date("2026-11-05T10:00:00Z"),
      durasiJam: 1,
      catatan: "Latihan percakapan bahasa Inggris persiapan interview.",
      status: "Selesai",
    },
  ];

  for (const b of dataBooking) {
    await prisma.booking.upsert({
      where: { kodeBooking: b.kodeBooking },
      update: b,
      create: b,
    });
  }

  const jumlahTutor = await prisma.tutor.count();
  const jumlahBooking = await prisma.booking.count();
  const jumlahItem = await prisma.item.count();

  console.log(`✓ Seeding berhasil!`);
  console.log(`- ${jumlahTutor} Tutor tersimpan.`);
  console.log(`- ${jumlahBooking} Booking aktif terhubung dengan Tutor.`);
  console.log(`- ${jumlahItem} Item praktikum tersedia.`);
}

main()
  .catch((e) => {
    console.error("Gagal melakukan seed:", e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
