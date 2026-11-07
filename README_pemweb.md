# TutorCare: Platform Penghubung Siswa & Tutor Akademik

Repositori ini memuat implementasi produk aplikasi web **TutorCare** untuk mata kuliah **Pengembangan Aplikasi Web** (Mendukung penilaian Milestone 1 dan Milestone 2).

---

## Daftar Versi & Tag Milestone

| Milestone | Topik Utama | Arsitektur & Teknologi | Status Tag Git |
|:---|:---|:---|:---:|
| **Milestone 1 (Tugas 1)** | Perancangan Antarmuka & Prototipe Web | Next.js App Router, React, Tailwind CSS, Client-side Mock Data | `web/v0.1` |
| **Milestone 2 (Tugas 2)** | Integrasi Logika Server, Database & Validasi | PostgreSQL 17, Prisma ORM 7, Next.js Server Actions, Zod Validation | `v0.2` & `web/v0.2` |

Dokumen detail pemetaan perbedaan berkas: [`docs/pemweb/PERBEDAAN_TUGAS1_TUGAS2.md`](docs/pemweb/PERBEDAAN_TUGAS1_TUGAS2.md).  
Laporan 10 skenario pengujian & bukti validasi: [`docs/pemweb/tugas-2-pengujian.md`](docs/pemweb/tugas-2-pengujian.md).

---

## 1. Deskripsi Produk & Perkembangan Fitur

### A. Latar Belakang Produk
**TutorCare** dirancang untuk menyelesaikan kesulitan siswa dan orang tua dalam menemukan pengajar privat yang tepat, sabar, dan terpercaya secara transparan. Sistem menyediakan direktori pengajar terverifikasi, fitur penyaringan instan, serta sistem reservasi bimbingan belajar terpadu.

### B. Perkembangan Fitur dari v0.1 ke v0.2
1. **Penyimpanan Data Persisten:** Mengganti data mock statis dengan database **PostgreSQL 17** via Prisma ORM 7. Data penambahan tutor dan reservasi baru tetap tersimpan secara permanen setelah halaman dimuat ulang.
2. **Dua Entitas Saling Berelasi (1 : N):**
   - **Tutor:** Menyimpan profil pengajar, keahlian mata pelajaran, jenjang target, moda belajar, tarif per jam, rating, dan bio.
   - **Booking:** Menyimpan reservasi sesi bimbingan siswa yang terhubung secara relasional (*foreign key*) ke tutor pengajar.
3. **Operasi CRUD Lengkap pada Kedua Entitas:**
   - **Tutor:** Create (`/tutors/tambah`), Read (`/`, `/tutors`, `/tutors/[id]`), Update (`/tutors/[id]/edit`), Delete (`/tutors/[id]`).
   - **Booking:** Create (`BookingModal`), Read (`/bookings`), Update status (`/bookings`), Delete (`/bookings`).
4. **Validasi Sisi Server (*Server-Side*) Menggunakan Zod:** Semua data masukan formulir divalidasi ketat di level Server Actions sebelum dieksekusi ke basis data.
5. **Keamanan Tanpa Kebocoran Kredensial:** Kredensial database diisolasi di luar repositori menggunakan environment variables (`.env`) yang telah terdaftar di `.gitignore`. Disediakan template aman di `.env.example`.

---

## 2. Struktur Entitas Database (Prisma ORM 7)

```prisma
enum ModaBelajar {
  Online
  Offline
  Hybrid
}

model Tutor {
  id              Int          @id @default(autoincrement())
  nama            String
  mataPelajaran   String
  jenjang         String       @default("SMP & SMA")
  moda            ModaBelajar  @default(Hybrid)
  tarifPerJam     Int
  rating          Float        @default(5.0)
  pengalamanTahun Int          @default(3)
  avatarUrl       String?
  bio             String
  kontakWa        String       @default("081234567890")
  tersedia        Boolean      @default(true)
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
  bookings        Booking[]
}

model Booking {
  id           Int         @id @default(autoincrement())
  kodeBooking  String      @unique
  tutorId      Int
  tutor        Tutor       @relation(fields: [tutorId], references: [id], onDelete: Cascade)
  namaSiswa    String
  kontakSiswa  String
  jenjangSiswa String      @default("SMA")
  tanggalSesi  DateTime
  durasiJam    Int         @default(2)
  catatan      String?
  status       String      @default("Menunggu Konfirmasi")
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
}
```

---

## 3. Petunjuk Menjalankan Aplikasi di Lingkungan Lokal

### Prasyarat:
* Node.js v20+ atau v24 LTS
* PostgreSQL 17 aktif di port `5432`

### Langkah-Langkah:
```bash
# 1. Masuk ke direktori proyek
cd tutorship-nextjs

# 2. Pasang dependensi proyek
npm install

# 3. Konfigurasi file environment (.env)
# Salin template .env.example menjadi .env lalu sesuaikan password PostgreSQL Anda:
# DATABASE_URL="postgresql://postgres:password_anda@localhost:5432/tutorcare_db?schema=public"

# 4. Sinkronisasi skema database & generate Prisma client
npx prisma db push
npx prisma generate

# 5. Jalankan seed data sintetis (4 tutor & 3 booking awal)
npm run seed

# 6. Jalankan server pengembangan Next.js
npm run dev
```

Buka peramban di `http://localhost:3000`.

---

## 4. Rute Utama Aplikasi

* **`/` (Beranda):** Landing page, pencarian tutor interaktif, dan modal pemesanan bimbingan.
* **`/tutors` (Direktori Tutor):** Katalog lengkap pengajar, penyaringan berdasarkan mata pelajaran & moda belajar, serta tautan tambah tutor.
* **`/tutors/tambah` (Create Tutor):** Formulir pendaftaran tutor baru dengan validasi Zod.
* **`/tutors/[id]` (Detail Tutor & Relasi 1:N):** Informasi lengkap pengajar, riwayat reservasi siswa terkait, dan tombol hapus tutor (*onDelete: Cascade*).
* **`/tutors/[id]/edit` (Update Tutor):** Formulir edit data tarif, kontak, dan bio tutor.
* **`/bookings` (Manajemen Booking):** Daftar seluruh reservasi bimbingan, pengubahan status (Konfirmasi/Selesai/Batal), dan pembatalan reservasi.

---

## 5. Ringkasan Hasil Pengujian Sistem (10 Skenario)

Pengujian sistem didokumentasikan secara rinci pada [`docs/pemweb/tugas-2-pengujian.md`](docs/pemweb/tugas-2-pengujian.md):
* **Skenario CRUD Tutor:** 4/4 Skenario Berhasil (Create, Read, Update, Delete).
* **Skenario CRUD Booking:** 4/4 Skenario Berhasil (Create, Read, Update Status, Delete).
* **Skenario Relasi Data (1:N & Cascade):** 2/2 Skenario Berhasil.
* **Tingkat Kelulusan:** 10/10 Skenario (**100% PASS**).
* **Validasi Server Zod:** 3 bukti penolakan masukan (WhatsApp tidak valid, nama fiktif/kurang karakter, dan tarif di bawah batas minimal) terverifikasi secara akurat.
