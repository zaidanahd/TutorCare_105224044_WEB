# TutorCare: Platform Penghubung Siswa & Tutor Akademik (Tugas 1 Pemrograman Web)

Repositori ini berisi implementasi antarmuka produk web interaktif **TutorCare** untuk **Tugas 1 Pemrograman Web**. TutorCare dirancang sebagai platform berbasis web yang transparan dan mudah diakses untuk membantu siswa menemukan tutor privat berkualitas secara cepat dan efisien.

---

## 1. Deskripsi Produk & Latar Belakang
* **Nama Produk:** TutorCare
* **Tujuan Utama:** Menghubungkan siswa atau orang tua dengan pengajar/tutor privat profesional berdasarkan mata pelajaran, jenjang kelas, dan moda pembelajaran (online/offline).
* **Permasalahan yang Diselesaikan:** Banyak siswa kesulitan mencari tutor yang sesuai dengan jadwal, anggaran, dan spesifikasi keahlian spesifik secara transparan. TutorCare hadir dengan antarmuka direktori interaktif, fitur filter pencarian instan, serta sistem pemesanan (*booking*) yang responsif.

---

## 2. Sasaran Pengguna (Target Audience)
1. **Siswa & Orang Tua:** Pengguna utama yang membutuhkan bimbingan belajar tambahan dan ingin mencari serta memesan jadwal tutor.
2. **Tutor / Pengajar:** Mitra pengajar yang profil, keahlian, dan tarifnya ditampilkan secara profesional dalam direktori platform.
3. **Administrator:** Pengelola sistem yang memantau operasional dan manajemen data platform.

---

## 3. Fitur Utama Aplikasi (Milestone 1)
* **Katalog & Direktori Tutor:** Menampilkan daftar profil pengajar secara grid dengan informasi mata pelajaran, rating, ulasan, dan tarif per jam.
* **Filter & Pencarian Instan:** Memungkinkan pengguna menyaring daftar tutor berdasarkan kategori mata pelajaran atau moda belajar secara *real-time*.
* **Modal Pemesanan (*Booking Modal*):** Formulir interaktif bagi pengguna untuk menjadwalkan sesi bimbingan lengkap dengan validasi masukan di sisi klien.
* **Desain Responsif:** Antarmuka yang dioptimalkan untuk berbagai ukuran layar perangkat (ponsel pintar, tablet, hingga komputer desktop).

---

## 4. Teknologi yang Digunakan
* **Framework:** Next.js (App Router)
* **Library UI & Bahasa:** React, TypeScript
* **Styling:** Tailwind CSS
* **Pengujian Aksesibilitas:** Google Lighthouse Accessibility Engine

---

## 5. Struktur Direktori Repositori
```text
tutorship-nextjs/
├── app/                  # Kode sumber antarmuka Next.js App Router
│   ├── components/       # Kumpulan komponen reusable (Navbar, Footer, TutorCard, FilterBar, BookingModal)
│   ├── data/             # Mock data profil tutor (mockTutors.ts)
│   ├── about/            # Halaman informasi tentang platform
│   ├── layout.tsx        # Root layout aplikasi
│   └── page.tsx          # Halaman utama (Landing Page & Katalog)
├── security/             # Dokumentasi keamanan siber (Asset, DFD, Threat Model, Risk Register, AI Log)
├── crypto/               # Modul pustaka kriptografi dan pengujian Jest
├── package.json          # Konfigurasi dependensi dan skrip proyek
└── README.md             # Dokumentasi laporan utama proyek (File ini)