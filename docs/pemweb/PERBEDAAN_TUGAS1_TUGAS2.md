# Pemetaan & Perbedaan Berkas: Tugas 1 vs Tugas 2 Pemrograman Web

Dokumen ini memetakan secara eksplisit seluruh berkas kode, konfigurasi, dan dokumentasi antara **Milestone 1 (v0.1)** dan **Milestone 2 (v0.2)** pada produk aplikasi web **TutorCare**.

---

## 1. Tabel Perbandingan Evolusi Fitur

| Aspek Penilaian | Milestone 1 (Tugas 1 - v0.1) | Milestone 2 (Tugas 2 - v0.2) |
|:---|:---|:---|
| **Fokus Pengembangan** | Perancangan antarmuka pengguna (UI/UX) statis & responsif | Integrasi logika server, validasi Zod, dan database persisten |
| **Sumber Data** | Mock Data Statis di memori browser ([`app/data/mockTutors.ts`](../../app/data/mockTutors.ts)) | **Database PostgreSQL 17** via Prisma ORM 7 (`@prisma/adapter-pg`) |
| **Entitas & Relasi** | Data tunggal tanpa relasi database | **2 Entitas Berelasi (1 : N)**: `Tutor` memiliki banyak `Booking` |
| **Operasi CRUD** | Read saja (hanya membaca mock array) | **Full CRUD Lengkap pada Kedua Entitas** (Create, Read, Update, Delete) |
| **Validasi Masukan** | Validasi sisi klien (*client-side only*) | **Validasi Sisi Server (*server-side*) dengan Zod** sebelum query database |
| **Logika Server** | Belum ada (seluruh logika ada di komponen klien) | **Next.js Server Actions** (`"use server"`) dengan revalidasi rute otomatis |
| **Tag Rilis GitHub** | `web/v0.1` | `v0.2` (dan `web/v0.2`) |

---

## 2. Pemetaan Berkas Berdasarkan Milestone

### A. Berkas Khusus Milestone 1 (Tugas 1 — Fondasi Antarmuka)
Berkas-berkas ini merupakan kode dasar v0.1 yang tetap dipertahankan agar tidak merusak fitur lama:
1. [`app/data/mockTutors.ts`](../../app/data/mockTutors.ts): Sumber mock data profil tutor awal (sekarang berfungsi sebagai data *fallback*).
2. [`components/FilterBar.tsx`](../../components/FilterBar.tsx): Komponen penyaring mata pelajaran dan moda belajar di sisi klien.
3. [`components/Footer.tsx`](../../components/Footer.tsx): Komponen footer navigasi platform.
4. [`README_pemweb.md`](../../README_pemweb.md): Dokumentasi laporan awal Milestone 1.

---

### B. Berkas Baru & Diperbarui pada Milestone 2 (Tugas 2 — Server & Database)
Berkas-berkas berikut adalah implementasi baru untuk memenuhi Rubrik Tugas 2:

#### 1. Pemodelan Basis Data & Migrasi (Prisma ORM 7)
* [`prisma/schema.prisma`](../../prisma/schema.prisma): Penambahan model `Tutor` dan `Booking` dengan relasi 1:N dan aturan `onDelete: Cascade`.
* [`prisma/migrations/20261107100000_tutorcare_milestone2/migration.sql`](../../prisma/migrations/20261107100000_tutorcare_milestone2/migration.sql): Berkas migrasi SQL DDL untuk tabel `Tutor`, `Booking`, dan enum `ModaBelajar`.
* [`prisma/seed.ts`](../../prisma/seed.ts): Skrip pengisian data sintetis awal (4 tutor dan 3 reservasi booking).

#### 2. Skema Validasi Sisi Server (Zod)
* [`schema/tutor.ts`](../../schema/tutor.ts): Skema Zod `tutorFormSchema` untuk validasi masukan penambahan/pengubahan profil tutor (nama, mapel, tarif, WhatsApp, bio).
* [`schema/booking.ts`](../../schema/booking.ts): Skema Zod `bookingFormSchema` untuk validasi formulir pemesanan sesi bimbingan siswa.

#### 3. Logika Server (Server Actions)
* [`app/tutors/actions.ts`](../../app/tutors/actions.ts): Server Actions untuk entitas Tutor (`createTutorAction`, `updateTutorAction`, `deleteTutorAction`).
* [`app/bookings/actions.ts`](../../app/bookings/actions.ts): Server Actions untuk entitas Booking (`createBookingAction`, `updateBookingStatusAction`, `deleteBookingAction`).

#### 4. Antarmuka CRUD & Integrasi Halaman
* [`app/page.tsx`](../../app/page.tsx): Halaman Beranda yang telah dimigrasi untuk membaca data langsung dari PostgreSQL secara persisten.
* [`components/ClientCatalogSection.tsx`](../../components/ClientCatalogSection.tsx): Komponen interaktif yang menghubungkan filter pencarian dengan data PostgreSQL.
* [`components/BookingModal.tsx`](../../components/BookingModal.tsx): Modal pemesanan yang terhubung ke Server Action `createBookingAction` dengan feedback validasi Zod.
* [`app/tutors/page.tsx`](../../app/tutors/page.tsx): Direktori Tutor lengkap dengan tombol Tambah Tutor Baru dan tautan manajemen pemesanan.
* [`app/tutors/tambah/page.tsx`](../../app/tutors/tambah/page.tsx): Halaman formulir penambahan tutor baru (Create Tutor).
* [`app/tutors/[id]/page.tsx`](../../app/tutors/[id]/page.tsx): Halaman detail profil tutor lengkap dengan riwayat booking siswa terkait (Read & Relasi 1:N) dan tombol hapus (Delete Tutor).
* [`app/tutors/[id]/edit/page.tsx`](../../app/tutors/[id]/edit/page.tsx) & [`EditTutorClientForm.tsx`](../../app/tutors/[id]/edit/EditTutorClientForm.tsx): Formulir pengubahan data tutor (Update Tutor).
* [`app/bookings/page.tsx`](../../app/bookings/page.tsx) & [`BookingRowItem.tsx`](../../app/bookings/BookingRowItem.tsx): Halaman manajemen reservasi lengkap dengan relasi nama tutor, pengubahan status (Update Booking), dan pembatalan (Delete Booking).

#### 5. Dokumentasi & Bukti Pengujian
* [`docs/pemweb/tugas-2-pengujian.md`](tugas-2-pengujian.md): Laporan 10 skenario pengujian sistem (8 CRUD + 2 Relasi Data), 3 bukti penolakan validasi Zod, dan bukti query tabel PostgreSQL.
