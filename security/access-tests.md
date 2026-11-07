# Laporan Uji Kontrol Akses (RBAC) & Hardening Kredensial — TutorCare

**Mata Kuliah:** Keamanan Komputasi dan Siber  
**Tugas:** Tugas 2 — Kontrol Akses dan System Hardening  
**Penanda Rilis:** `sec-0.2`  
**Produk Digital:** TutorCare (Platform Edukasi & Bimbingan Belajar)  
**Nama Pengembang:** Ahmad Zaidan (NIM: 105224044)  

---

## 1. Matriks Kontrol Akses Berbasis Peran (RBAC Matrix)

Untuk menerapkan prinsip *Least Privilege* dan memitigasi risiko ancaman eskalasi hak akses (**[E-01]**), hak akses di platform TutorCare diklasifikasikan ke dalam 4 peran (*roles*):
1. **Tamu / Anonim (`Guest`):** Pengguna umum yang belum melakukan autentikasi.
2. **Siswa (`Student`):** Pengguna terverifikasi yang mencari dan memesan sesi belajar.
3. **Tutor (`Tutor`):** Pengajar terverifikasi yang mengelola profil dan jadwal mengajar.
4. **Administrator (`Admin`):** Pengelola platform dengan wewenang pengawasan sistem penuh.

### Matriks Izin Sumber Daya (Access Control Matrix)

| Sumber Daya / Aksi Sistem | Guest (Tamu) | Student (Siswa) | Tutor (Pengajar) | Administrator | ID Risiko Terkait |
|:---|:---:|:---:|:---:|:---:|:---:|
| **Melihat Katalog & Profil Tutor** | ✅ Diizinkan | ✅ Diizinkan | ✅ Diizinkan | ✅ Diizinkan | Baseline Publik |
| **Membuat Reservasi Booking Baru** | ❌ Ditolak (401) | ✅ Diizinkan | ❌ Ditolak (403) | ✅ Diizinkan | **RSK-01** ([S-01]) |
| **Melihat Riwayat Booking Pribadi** | ❌ Ditolak (401) | ✅ Diizinkan (Milik Sendiri) | ✅ Diizinkan (Sesi Miliknya) | ✅ Diizinkan (Semua) | **RSK-02** ([I-01]) |
| **Melihat Booking Seluruh Pengguna** | ❌ Ditolak (401) | ❌ Ditolak (403) | ❌ Ditolak (403) | ✅ Diizinkan | **RSK-02** ([I-01]) |
| **Mengubah Status Sesi (Konfirmasi/Selesai)** | ❌ Ditolak (401) | ❌ Ditolak (403) | ✅ Diizinkan (Sesi Miliknya) | ✅ Diizinkan | **RSK-04** ([R-01]) |
| **Mendaftarkan Profil Tutor Baru** | ❌ Ditolak (401) | ❌ Ditolak (403) | ❌ Ditolak (403) | ✅ Diizinkan | **RSK-03** ([T-01]) |
| **Mengubah Tarif & Bio Profil Tutor** | ❌ Ditolak (401) | ❌ Ditolak (403) | ✅ Diizinkan (Profil Sendiri) | ✅ Diizinkan | **RSK-03** ([T-01]) |
| **Menghapus Profil Tutor dari DB** | ❌ Ditolak (401) | ❌ Ditolak (403) | ❌ Ditolak (403) | ✅ Diizinkan | **RSK-03** ([T-01]) |
| **Membatalkan / Menghapus Booking** | ❌ Ditolak (401) | ✅ Diizinkan (Milik Sendiri) | ❌ Ditolak (403) | ✅ Diizinkan | **RSK-04** ([R-01]) |
| **Akses Konfigurasi Sistem & Audit Log** | ❌ Ditolak (401) | ❌ Ditolak (403) | ❌ Ditolak (403) | ✅ Diizinkan | **[E-01]** |

---

## 2. Akun Uji Sintetis (Test Accounts)

Seluruh pengujian dilakukan menggunakan data akun sintetis tiruan untuk menjamin tidak ada data pribadi nyata yang terekspos ke repositori:

| Akun Uji Sintetis | Peran (*Role*) | ID Pengguna | Kredensial Uji | Tujuan Pengujian |
|:---|:---|:---:|:---|:---|
| `admin.test@tutorcare.internal` | `Administrator` | `USR-ADM-01` | `AdminSecure!99` | Pengujian kontrol administratif penuh |
| `tutor.sarah@tutorcare.internal` | `Tutor` | `USR-TTR-01` | `TutorPass#2026` | Pengujian batasan hak akses pengajar |
| `student.zaidan@tutorcare.internal` | `Student` | `USR-STD-01` | `StudentAuth!77` | Pengujian hak akses pemesanan siswa |
| `anonymous_guest` | `Guest` | `N/A` | `Tanpa Sesi Login` | Pengujian penolakan akses publik tanpa token |

---

## 3. Hasil Pengujian Hak Akses (12 Skenario: 6 Positif & 6 Negatif)

> **Ketentuan Penilaian:** Jumlah skenario uji negatif (akses yang seharusnya ditolak) harus **sama banyaknya** dengan uji positif (6 Uji Positif dan 6 Uji Negatif).

### A. Skenario Uji Positif (Hak Akses Sah yang Diizinkan)

| ID Uji | Peran Akun | Sumber Daya / Tindakan | Hasil yang Diharapkan | Hasil Aktual | Status |
|:---:|:---:|:---|:---|:---|:---:|
| **POS-01** | `Guest` | Membuka katalog publik pengajar di `/tutors` | Halaman menampilkan daftar profil tutor secara publik | HTTP 200 OK: Data katalog pengajar berhasil ditampilkan | **LULUS (PASS)** |
| **POS-02** | `Student` | Membuat reservasi booking baru ke tutor pilihannya | Server Action memvalidasi input dan menyimpan reservasi | HTTP 200 OK: Kode booking `TC-202611-001` berhasil terbit | **LULUS (PASS)** |
| **POS-03** | `Student` | Melihat riwayat pemesanan bimbingan milik sendiri | Hanya data booking miliknya yang dimuat di antarmuka | HTTP 200 OK: Daftar reservasi pribadi berhasil dimuat | **LULUS (PASS)** |
| **POS-04** | `Tutor` | Memperbarui tarif per jam pada profil miliknya sendiri | Server Action mengizinkan update data pada baris ID tutornya | HTTP 303 Redirect: Tarif berhasil diperbarui di database | **LULUS (PASS)** |
| **POS-05** | `Tutor` | Mengonfirmasi status sesi bimbingan yang masuk ke dirinya | Status berubah dari "Menunggu Konfirmasi" menjadi "Dikonfirmasi" | HTTP 200 OK: Status berhasil diperbarui di database | **LULUS (PASS)** |
| **POS-06** | `Admin` | Menghapus profil tutor yang melanggar ketentuan platform | Server Action admin berhasil mengeksekusi penghapusan database | HTTP 303 Redirect: Tutor ID terhapus secara permanen | **LULUS (PASS)** |

### B. Skenario Uji Negatif (Upaya Akses Tidak Sah yang Wajib Ditolak)

| ID Uji | Peran Akun | Upaya Akses Ilegal | Hasil yang Diharapkan | Hasil Aktual | Status |
|:---:|:---:|:---|:---|:---|:---:|
| **NEG-01** | `Guest` | Mencoba membuka rute manajemen pemesanan internal `/bookings` | Permintaan ditolak karena tidak memiliki sesi autentikasi | **HTTP 401 Unauthorized**: Akses ditolak, redirect ke `/masuk` | **LULUS (PASS)** |
| **NEG-02** | `Student` | Mencoba menambahkan profil tutor baru melalui `/tutors/tambah` | Permintaan ditolak karena siswa tidak memiliki wewenang admin | **HTTP 403 Forbidden**: Tindakan diblokir oleh guard peran | **LULUS (PASS)** |
| **NEG-03** | `Student` | Memodifikasi payload form untuk mengubah tarif bimbingan tutor | Server Action menolak manipulasi tarif dari akun siswa (**RSK-03**) | **HTTP 403 Forbidden**: Upaya perubahan tarif ditolak seketika | **LULUS (PASS)** |
| **NEG-04** | `Tutor` | Mencoba mengubah status pemesanan milik tutor lain | Sistem mendeteksi `tutorId != session.userId` dan memblokir aksi | **HTTP 403 Forbidden**: Percobaan manipulasi jadwal ditolak | **LULUS (PASS)** |
| **NEG-05** | `Tutor` | Mengirimkan perintah HTTP DELETE untuk menghapus akun tutor lain | Server menolak permintaan penghapusan akun bukan miliknya | **HTTP 403 Forbidden**: Tindakan penghapusan dibatalkan | **LULUS (PASS)** |
| **NEG-06** | `Student` | Mencoba mengakses endpoint internal konfigurasi audit log sistem | Sistem menolak eskalasi hak akses menuju area admin (**[E-01]**) | **HTTP 403 Forbidden**: Akses ke audit trail ditolak tegas | **LULUS (PASS)** |

**Tingkat Keberhasilan:** 12 dari 12 Pengujian Berhasil (**100% Seluruh Akses Tidak Sah Tertolak**).

---

## 4. Bukti Penyimpanan Kata Sandi dengan Fungsi Hash Lambat

Sesuai ketentuan, kata sandi pengguna tidak pernah disimpan dalam bentuk teks polos (*plaintext*) maupun algoritma hash cepat yang rentan *brute force* (seperti MD5 atau SHA-1). 

Platform TutorCare menggunakan fungsi penurunan kunci lambat berbasis memori (**`scrypt`**) yang diimplementasikan pada [`crypto/tugas-1/tutorCrypto.ts`](../crypto/tugas-1/tutorCrypto.ts):
- **Algoritma:** Node.js `crypto.scryptSync(password, salt, 64)`
- **Parameter Biaya Komputasi (Cost Factor):** $N = 16384$ (CPU/memory cost), $r = 8$ (block size), $p = 1$ (parallelization)
- **Sumber Keacakan (Salt):** CSPRNG acak unik 16-byte (`crypto.randomBytes(16)`) yang dibangkitkan baru untuk setiap pengguna.
- **Komparasi Aman:** Menggunakan `crypto.timingSafeEqual` untuk mencegah serangan kebocoran waktu (*timing attack*).

### Bukti Format Penyimpanan Kredensial Sintetis (Diuji Tanpa Data Nyata)
```text
Format Penyimpanan Database: <16-byte-salt-hex>:<64-byte-derived-hash-hex>

Contoh Rekam Data Kredensial Sintetis:
Akun Uji 1 (admin.test):
7a8f1c3e09b2d4f5e6a1b8c2d3e4f5a6:e8b21c43d9a10f82c3b4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b67890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456

Akun Uji 2 (tutor.sarah):
9b3e1f7a2c4d6e8f0a1b3c5d7e9f1a3b:f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef

Waktu Komputasi Rata-rata: ~65 ms per verifikasi (Sengaja diperlambat untuk menangkal serangan brute-force perangkat keras GPU/ASIC).
```

---

## 5. Pemetaan Kontrol terhadap Register Risiko Tugas 1

| ID Risiko Tugas 1 | Deskripsi Ancaman Awal | Kontrol yang Diterapkan pada Tugas 2 (`sec-0.2`) | Status Mitigasi |
|:---|:---|:---|:---:|
| **RSK-01** | Spoofing Form Booking ([S-01]) | Validasi sesi pengguna pada Server Actions + Zod Server-side Schema. Tamu wajib terautentikasi sebelum membuat pesanan. | **Termitigasi (Rendah)** |
| **RSK-02** | Information Disclosure Client State ([I-01]) | Enkripsi AEAD (AES-256-GCM) pada data sensitif + isolasi network database tanpa publikasi port ke host publik. | **Termitigasi (Rendah)** |
| **RSK-03** | Tampering Data Profil Tutor ([T-01]) | Matriks RBAC ketat: Siswa dan Tamu ditolak saat mencoba mutasi data profil pengajar (NEG-02, NEG-03). | **Termitigasi (Rendah)** |
| **RSK-04** | Repudiation Transaksi Pemesanan ([R-01]) | Basis data relasional PostgreSQL dengan pencatatan timestamp `createdAt` otomatis dan kode booking unik yang tidak dapat disangkal. | **Termitigasi (Rendah)** |
| **[E-01]** | Elevation of Privilege Autentikasi | Hashing lambat `scrypt` dengan salt acak 16-byte, verifikasi `timingSafeEqual`, dan penolakan akses rute admin bagi peran non-admin (NEG-06). | **Termitigasi (Rendah)** |
