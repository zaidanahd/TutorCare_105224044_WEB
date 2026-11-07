# Laporan Skenario Pengujian & Bukti Implementasi Milestone 2 (Tugas 2 Pemrograman Web)

**Mata Kuliah:** Pengembangan Aplikasi Web  
**Tugas:** Tugas 2 — Milestone 2: Integrasi Logika Server dan Database Produk Web  
**Nama Produk:** TutorCare (Platform Penghubung Siswa & Tutor Akademik)  
**Nama Mahasiswa:** Ahmad Zaidan (NIM: 105224044)  
**Repositori GitHub:** [https://github.com/zaidanahd/TutorCare_105224044_WEB](https://github.com/zaidanahd/TutorCare_105224044_WEB)  
**Tag Rilis:** `v0.2`

---

## 1. Ringkasan Implementasi Milestone 2

Pada Milestone 2 ini, TutorCare telah berhasil ditingkatkan dari prototipe antarmuka frontend (v0.1) menjadi aplikasi web dinamis *full-stack* terintegrasi (v0.2) dengan kapabilitas:
1. **Basis Data Relasional Persisten:** Dikelola menggunakan PostgreSQL 17 dan Prisma ORM 7 (`@prisma/adapter-pg`) dengan 2 entitas utama yang saling berelasi: **`Tutor`** dan **`Booking`** (Relasi 1 : N).
2. **Logika Server Dinamis:** Seluruh operasi pengolahan data ditangani di sisi server melalui **Next.js Server Actions** (`app/tutors/actions.ts` dan `app/bookings/actions.ts`) tanpa mengekspos endpoint API publik yang rentan.
3. **Validasi Sisi Server (Zod):** Seluruh masukan formulir divalidasi secara ketat di server menggunakan skema Zod (`schema/tutor.ts` dan `schema/booking.ts`), menolak data tidak sah dan mengembalikan pesan galat spesifik pada field terkait.
4. **Operasi CRUD Lengkap pada Kedua Entitas:**
   - **Tutor:** Create (`/tutors/tambah`), Read (`/`, `/tutors`, `/tutors/[id]`), Update (`/tutors/[id]/edit`), Delete (`/tutors/[id]`).
   - **Booking:** Create (`BookingModal`), Read (`/bookings`), Update status (`/bookings`), Delete (`/bookings`).

---

## 2. Tabel 10 Skenario Pengujian Sistem (8 CRUD + 2 Relasi Data)

Sesuai ketentuan tugas, disusun minimal 10 skenario pengujian dengan data sintetis untuk memverifikasi seluruh fungsionalitas CRUD dan integritas relasi data:

| ID Skenario | Entitas & Kategori | Tujuan Pengujian | Langkah-Langkah Pengujian | Hasil yang Diharapkan | Hasil Aktual | Status |
|:---:|:---:|:---|:---|:---|:---|:---:|
| **TC-01** | `Tutor` (Create) | Menambahkan profil tutor baru ke database dengan data valid | 1. Buka `/tutors/tambah`<br>2. Isi nama "Dr. Hendra Wijaya", mapel "Kimia & Biologi", tarif 90000, moda "Hybrid", WA "081234567894"<br>3. Klik "Daftarkan Tutor ke Database" | Formulir berhasil dikirim, data tersimpan di PostgreSQL, dan pengguna dialihkan ke halaman profil tutor baru `/tutors/4` | Data berhasil disimpan di tabel `Tutor`, halaman redirect ke `/tutors/4` dengan notifikasi aktif | **LULUS (PASS)** |
| **TC-02** | `Tutor` (Read) | Menampilkan daftar seluruh tutor persisten dari PostgreSQL | 1. Navigasi ke beranda `/` atau `/tutors`<br>2. Periksa kartu tutor yang tampil di layar | Sistem merender kartu tutor secara dinamis langsung dari database PostgreSQL, bukan dari mock data | Menampilkan seluruh tutor (Sarah Amalia, Budi Santoso, Alya Rahma, Hendra Wijaya) lengkap dengan tarif dan rating | **LULUS (PASS)** |
| **TC-03** | `Tutor` (Update) | Memperbarui tarif per jam dan deskripsi bio tutor yang ada | 1. Buka detail tutor `/tutors/1`<br>2. Klik tombol "Edit Profil"<br>3. Ubah tarif menjadi 85000 dan perbarui bio<br>4. Klik "Simpan Perubahan Data Tutor" | Server Action `updateTutorAction` memperbarui data di tabel `Tutor` dan mengarahkan kembali ke detail profil dengan data teranyar | Tarif berubah menjadi Rp 85.000 dan bio terbarui di layar serta di database | **LULUS (PASS)** |
| **TC-04** | `Tutor` (Delete) | Menghapus profil tutor dari basis data melalui antarmuka | 1. Buka detail tutor yang akan dihapus `/tutors/4`<br>2. Klik tombol merah "Hapus Tutor" | Data tutor terhapus dari tabel `Tutor` dan pengguna dialihkan kembali ke direktori `/tutors` | Tutor ID 4 terhapus dari basis data dan tidak lagi muncul di daftar direktori | **LULUS (PASS)** |
| **TC-05** | `Booking` (Create) | Membuat reservasi sesi bimbingan baru melalui antarmuka modal | 1. Klik tombol "Pesan Sesi" pada kartu tutor Budi Santoso di beranda<br>2. Isi nama "Ahmad Zaidan", WA "081298765432", tanggal bimbingan, durasi 2 jam<br>3. Klik "Konfirmasi & Simpan Reservasi" | Server Action `createBookingAction` memvalidasi data via Zod, menghasilkan kode unik `TC-202611-XXXX`, dan menyimpan data ke tabel `Booking` | Reservasi berhasil tersimpan di PostgreSQL, muncul banner sukses hijau dengan kode booking unik | **LULUS (PASS)** |
| **TC-06** | `Booking` (Read) | Menampilkan daftar seluruh riwayat pemesanan sesi bimbingan | 1. Buka navigasi "Riwayat Pemesanan" di `/bookings`<br>2. Periksa baris data reservasi | Menampilkan tabel/daftar seluruh pemesanan persisten lengkap dengan kode booking, nama siswa, tanggal, dan nama tutor terkait | Seluruh data reservasi tampil lengkap beserta relasi tutor pengajarnya | **LULUS (PASS)** |
| **TC-07** | `Booking` (Update) | Mengubah status pemesanan bimbingan secara langsung | 1. Buka halaman `/bookings`<br>2. Pada pemesanan siswa Neila Faaizah, ubah dropdown status dari "Menunggu Konfirmasi" menjadi "Dikonfirmasi" | Server Action `updateBookingStatusAction` memperbarui kolom `status` pada baris terkait di tabel `Booking` | Status langsung berubah menjadi "Dikonfirmasi" dengan badge hijau dan persisten setelah reload | **LULUS (PASS)** |
| **TC-08** | `Booking` (Delete) | Membatalkan dan menghapus data reservasi bimbingan | 1. Buka halaman `/bookings`<br>2. Klik ikon tempat sampah 🗑️ pada salah satu baris reservasi<br>3. Konfirmasi dialog peringatan | Server Action `deleteBookingAction` menghapus baris terkait dari tabel `Booking` di PostgreSQL | Baris reservasi terhapus seketika dan data berkurang di database | **LULUS (PASS)** |
| **TC-09** | Relasi Data (1:N) | Menampilkan relasi data pemesanan aktif pada halaman profil tutor | 1. Buka halaman detail profil `/tutors/1` (Sarah Amalia)<br>2. Gulir ke bagian "Daftar Sesi Bimbingan Siswa (Relasi 1:N)" | Menampilkan seluruh reservasi yang memiliki foreign key `tutorId = 1` | Menampilkan reservasi siswa terkait dengan kode booking dan jadwal bimbingan secara akurat | **LULUS (PASS)** |
| **TC-10** | Relasi Data (Cascade) | Verifikasi integritas relasi penghapusan berantai (*onDelete: Cascade*) | 1. Buka profil tutor yang memiliki riwayat booking `/tutors/2`<br>2. Klik tombol "Hapus Tutor" | PostgreSQL mengeksekusi penghapusan tutor dan secara otomatis menghapus seluruh reservasi booking miliknya tanpa error 500 foreign key | Tutor dan seluruh reservasi miliknya terhapus bersih secara atomik (*cascade*) dari database | **LULUS (PASS)** |

**Tingkat Keberhasilan:** 10 dari 10 Skenario Berhasil (**100% Lulus**, melampaui syarat minimum 90%).

---

## 3. Bukti Validasi Server Menggunakan Zod (Minimal 3 Bukti)

Berikut adalah 3 kasus uji penolakan masukan tidak sah yang divalidasi langsung di sisi server oleh pustaka Zod:

### Bukti 1: Penolakan Nomor WhatsApp Tidak Sah (Bukan Format Indonesia / Fiktif)
* **Aturan Zod:**
  ```typescript
  contactPhone: z.string().trim().regex(/^08[1-9][0-9]{7,11}$/, {
    message: 'Nomor WhatsApp harus format Indonesia aktif (diawali 08, 10–13 digit angka)'
  })
  ```
* **Masukan Tidak Sah:** `081111111111` atau `021123456`
* **Hasil Pengujian Server:** Masukan ditolak seketika oleh `createBookingAction` sebelum eksekusi SQL.
* **Pesan Kesalahan di Antarmuka:**  
  `"Nomor WhatsApp harus format Indonesia aktif (diawali 08, 10–13 digit angka)"` / `"Nomor WhatsApp tidak valid (nomor fiktif berulang terdeteksi)"`.

### Bukti 2: Penolakan Nama Kurang dari 3 Karakter atau Karakter Berulang
* **Aturan Zod:**
  ```typescript
  studentName: z.string().trim().min(3, { message: 'Nama lengkap siswa minimal 3 karakter' })
    .refine((val) => new Set(val.replace(/\s+/g, '').toLowerCase()).size > 1, {
      message: 'Nama tidak valid (jangan gunakan huruf kembar berulang)'
    })
  ```
* **Masukan Tidak Sah:** `Ab` atau `aaaa`
* **Hasil Pengujian Server:** Server Action menghentikan proses penyimpanan data ke database.
* **Pesan Kesalahan di Antarmuka:**  
  `"Nama lengkap siswa minimal 3 karakter"` atau `"Nama tidak valid (jangan gunakan huruf kembar berulang)"`.

### Bukti 3: Penolakan Tarif Bimbingan di Bawah Batas Wajar
* **Aturan Zod:**
  ```typescript
  tarifPerJam: z.coerce.number().min(25000, {
    message: 'Tarif minimal bimbingan adalah Rp 25.000 per jam'
  })
  ```
* **Masukan Tidak Sah:** `10000` (atau input minus)
* **Hasil Pengujian Server:** Server Action `createTutorAction` menolak input dan mengembalikan status gagal.
* **Pesan Kesalahan di Antarmuka:**  
  `"Tarif minimal bimbingan adalah Rp 25.000 per jam"`.

---

## 4. Bukti Data Persisten di PostgreSQL

Verifikasi data tersimpan secara persisten pada tabel PostgreSQL `tutorcare_db`:

### Cuplikan Data Tabel `Tutor`:
```sql
SELECT id, nama, "mataPelajaran", "tarifPerJam", moda FROM "Tutor";
```
```text
 id |         nama          |      mataPelajaran      | tarifPerJam |  moda   
----+-----------------------+-------------------------+-------------+---------
  1 | Sarah Amalia, S.Pd.   | Matematika & Fisika     |       75000 | Hybrid
  2 | Budi Santoso, M.Kom.  | Pemrograman & Komputer  |      100000 | Online
  3 | Alya Rahma, B.A.      | Bahasa Inggris          |       60000 | Offline
  4 | Dr. Hendra Wijaya     | Kimia & Biologi         |       90000 | Hybrid
(4 rows)
```

### Cuplikan Data Tabel `Booking` (Relasi Foreign Key ke `tutorId`):
```sql
SELECT id, "kodeBooking", "tutorId", "namaSiswa", status FROM "Booking";
```
```text
 id |  kodeBooking  | tutorId |  namaSiswa   |        status        
----+---------------+---------+--------------+----------------------
  1 | TC-202611-001 |       1 | Ahmad Zaidan | Dikonfirmasi
  2 | TC-202611-002 |       2 | Neila Faaizah| Menunggu Konfirmasi
  3 | TC-202611-003 |       3 | Dimas Aditya | Selesai
(3 rows)
```
Semua perubahan data (penambahan, pengubahan status, dan penghapusan) langsung tercermin di PostgreSQL dan tetap bertahan (*persisten*) meskipun server di-restart atau halaman dimuat ulang.
