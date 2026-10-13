# Inventaris Aset Keamanan — TutorCare (Platform Jasa Tutor)

Dokumen ini berisi daftar aset sistem, klasifikasi tingkat keamanan berdasarkan model **CIA Triad** (Confidentiality, Integrity, Availability), serta justifikasi risiko untuk platform TutorCare.

---

## 1. Data
* **Data Akun & Profil Pengguna (Siswa, Orang Tua, & Tutor)**
  * **Kerahasiaan (Confidentiality):** **Tinggi** — Memuat Informasi Identifikasi Pribadi (PII) seperti nama lengkap, email, nomor telepon/WhatsApp, dan alamat lokasi belajar offline.
  * **Integritas (Integrity):** **Tinggi** — Mencegah pemalsuan kualifikasi tutor atau pengubahan alamat tempat belajar oleh pihak tak berwenang.
  * **Ketersediaan (Availability):** **Sedang** — Jika terjadi downtime sementara, sesi les offline yang sudah terjadwal masih dapat berjalan.
  * **Mekanisme Kriptografi:** Dilindungi dengan enkripsi TLS/HTTPS saat transit (`AST-TRANSIT`).

* **Data Pemesanan & Jadwal Les**
  * **Kerahasiaan (Confidentiality):** **Sedang** — Memuat informasi jadwal pertemuan antara tutor dan siswa serta mata pelajaran pilihan.
  * **Integritas (Integrity):** **Tinggi** — Mencegah pengubahan jadwal secara ilegal atau pembatalan sepihak tanpa otorisasi.
  * **Ketersediaan (Availability):** **Tinggi** — Akses real-time ke jadwal sangat krusial agar tutor dan siswa memiliki kepastian waktu.
  * **Mekanisme Kriptografi:** Dilindungi enkripsi TLS/HTTPS saat transit (`AST-TRANSIT`).

---

## 2. Layanan (Services)
* **Aplikasi Web Frontend & Backend API**
  * **Kerahasiaan (Confidentiality):** **Sedang** — Kode sumber dan logika bisnis harus dilindungi dari pembacaan yang tidak sah untuk mencegah eksploitasi celah keamanan.
  * **Integritas (Integrity):** **Sangat Tinggi** — Mencegah injeksi kode berbahaya (malware, XSS, SQLi) atau manipulasi alur bisnis pemesanan.
  * **Ketersediaan (Availability):** **Sangat Tinggi** — Platform harus selalu dapat diakses oleh calon siswa dan tutor kapan saja.

---

## 3. Secrets
* **Kunci Enkripsi, Salt Hash, JWT Secret, & API Keys**
  * **Kerahasiaan (Confidentiality):** **Sangat Tinggi** — Kebocoran kunci enkripsi atau JWT secret memungkinkan penyerang menyelewengkan identitas (*impersonation*) seluruh pengguna.
  * **Integritas (Integrity):** **Sangat Tinggi** — Pengubahan kunci menyebabkan sistem gagal melakukan dekripsi data atau verifikasi autentikasi.
  * **Ketersediaan (Availability):** **Tinggi** — Tanpa akses ke secrets, seluruh mekanisme login dan verifikasi sesi akan lumpuh.
  * **Mekanisme Kriptografi:** Dilindungi dengan algoritma Hashing Kriptografis (Argon2id/bcrypt) dan Enkripsi Kunci Simetris (AES-256).

---

## 4. Backup
* **Salinan Cadangan Basis Data (Database Backup)**
  * **Kerahasiaan (Confidentiality):** **Tinggi** — File backup berisi salinan lengkap dari seluruh database termasuk data PII pengguna dan profil tutor.
  * **Integritas (Integrity):** **Tinggi** — File backup yang terkorupsi atau dimodifikasi akan memicu kegagalan pemulihan saat bencana (*disaster recovery*).
  * **Ketersediaan (Availability):** **Tinggi** — Dibutuhkan untuk pemulihan cepat ketika terjadi kegagalan sistem atau serangan krisis.
  * **Mekanisme Kriptografi:** File cadangan dienkripsi saat diam (*Encryption at Rest* menggunakan AES-256).

---

## 5. Log
* **Log Aktivitas Sistem & Audit Trail Autentikasi**
  * **Kerahasiaan (Confidentiality):** **Sedang** — Memuat jejak alamat IP, waktu akses, dan aktivitas pengguna (tanpa kredensial polos).
  * **Integritas (Integrity):** **Sangat Tinggi** — Log bersifat *append-only* agar tidak bisa dimanipulasi oleh peretas untuk menghilangkan jejak forensik.
  * **Ketersediaan (Availability):** **Sedang** — Diperlukan terutama untuk analisis keamanan dan audit berkala.

---

## 6. Akun Admin & Kredensial
* **Kredensial Pengguna (Siswa, Tutor, & Administrator)**
  * **Kerahasiaan (Confidentiality):** **Sangat Tinggi** — Kata sandi dan token sesi adalah pintu utama ke dalam aplikasi; kebocoran memicu pengambilalihan akun.
  * **Integritas (Integrity):** **Tinggi** — Mencegah perubahan role/hak akses pengguna secara ilegal (misal: siswa menjadi admin).
  * **Ketersediaan (Availability):** **Tinggi** — Pengguna harus dapat melakukan autentikasi kapan saja untuk menggunakan layanan.
  * **Mekanisme Kriptografi:** Kata sandi disimpan menggunakan Hashing Kriptografis Satu Arah (bcrypt/Argon2id dengan Salt).

---

## Catatan Log AI 
- **Alat AI:** Gemini
- **Tujuan:** Membantu mengklasifikasikan aset produk berdasarkan model CIA dan merancang alur data DFD awal.
- **Ringkasan Perintah:** "bantu saya secara step by step untuk mengerjakan tugas ini [gambar latihan 1]"
- **Bagian yang Dipakai/Diubah:** Struktur kategorisasi 6 aset pada `security/asset-inventory.md` dan penentuan titik proteksi kriptografi pada diagram DFD.
- **Cara Memeriksa:** Memastikan seluruh kriteria (data, layanan, secrets, backup, log, akun) sudah tercakup dan relevan dengan domain produk website tutor offline/online.