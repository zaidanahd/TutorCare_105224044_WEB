# TutorCare: Modul Kriptografi & Keamanan Data (Tugas 1)

Repositori ini berisi implementasi **Tugas 1 — Fondasi dan Komponen Dasar Kriptografi** untuk produk bersama **TutorCare** (Platform Penghubung Siswa dan Tutor Akademik). Modul ini diintegrasikan ke dalam repositori aplikasi web dengan menerapkan standar keamanan kriptografi modern.

---

## 1. Deskripsi Produk
**TutorCare** adalah platform berbasis web interaktif yang dirancang untuk mempertemukan siswa dengan tutor privat berkualitas secara transparan dan aman. Mengingat platform ini mengelola data sensitif pengguna (seperti kredensial akun dan catatan sesi bimbingan transien), sistem memerlukan lapisan perlindungan data yang kuat menggunakan pustaka kriptografi terstandar tanpa mengandalkan sandi klasik yang rentan.

---

## 2. Tabel Kebutuhan Kriptografi
Sesuai ketentuan minimum, berikut adalah analisis kebutuhan kriptografi untuk minimal 3 jenis aset data di dalam sistem TutorCare:

| No | Target Data / Aset | Tujuan Keamanan (Security Goal) | Algoritma / Mekanisme | Prioritas |
|:--:|:---|:---|:---|:--:|
| 1 | **Password Pengguna** | Melindungi kredensial autentikasi dari serangan *dictionary*, *brute-force*, dan *rainbow table* saat disimpan di database. | Node.js `crypto.scryptSync` dengan *unique salt* (16-byte) dan parameter keamanan tinggi | **Tinggi** |
| 2 | **Data Transien / Sesi Booking** | Menjaga kerahasiaan (*confidentiality*) dan keutuhan catatan sesi bimbingan siswa selama proses transien. | Enkripsi simetris berbasis modul `crypto` dengan *randomized Initialization Vector* (IV) | **Tinggi** |
| 3 | **Token Akses & Sesi** | Memastikan keaslian token otorisasi serta mencegah manipulasi atau pemalsuan oleh pihak tak berwenang. | HMAC-SHA256 Signatures | **Sedang** |

---

## 3. Rancangan Komponen Kriptografi

### **A. Alur Masukan $\rightarrow$ Proses $\rightarrow$ Keluaran**
- **Hashing Password (Scrypt & Salt):**
  * *Masukan:* `Password Teks Biasa` + `Unique Salt` (16 bytes)
  * *Proses:* Penurunan kunci berbasis fungsi *key derivation function* (scrypt) menggunakan modul keamanan standar Node.js.
  * *Keluaran:* Format string gabungan `salt:hash` heksadesimal yang aman untuk disimpan.
- **Verifikasi Kredensial:**
  * *Masukan:* `Password Input` + `Stored Salt:Hash`
  * *Proses:* Komparasi aman menggunakan `crypto.timingSafeEqual` untuk mencegah serangan *timing attack*.
  * *Keluaran:* Nilai boolean (`true` / `false`).

### **B. Representasi Data**
- Seluruh data hasil enkripsi dan *hash* direpresentasikan dalam format **Hexadecimal String** (`Buffer.toString('hex')`) agar aman ditransmisikan dan disimpan ke dalam media penyimpanan berbasis teks.

### **C. Sumber Keacakan (Source of Randomness)**
- Pembuatan *Salt* dan komponen acak pengaman menggunakan generator bilangan acak kriptografi aman bawaan Node.js, yaitu **`crypto.randomBytes()`**, untuk memastikan nilai keacakan tidak dapat ditebak (*unpredictable*).

---

## 4. Skenario Uji Otomatis & Hasil
Modul ini dilengkapi dengan skenario pengujian otomatis menggunakan framework Jest yang mencakup pengujian positif, batas, dan negatif.

- **Jumlah Skenario Uji:** 4 skenario
- **Status Minimal Berhasil:** 4/4 Berhasil

### **Cara Menjalankan Pengujian Kriptografi:**
Pastikan Anda berada di direktori root repositori, lalu jalankan perintah berikut di terminal:

```bash
npm test

### **Output Hasil Pengujian di Terminal:**
```text
PASS  crypto/tutorCrypto.test.js
  Pengujian Skenario Kriptografi TutorCare
    ✓ Skenario 1: Hashing password menghasilkan format string yang valid (115 ms)
    ✓ Skenario 2: Verifikasi sukses saat password benar (58 ms)
    ✓ Skenario 3 (Negatif): Verifikasi gagal jika password salah (55 ms)
    ✓ Skenario 4 (Uji Batas): Menangani input string kosong tanpa error fatal (12 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total

---

## 5. Struktur Repositori & Cara Menjalankan Aplikasi Web

```text
tutorship-nextjs/
├── app/                  # Kode sumber frontend Next.js App Router & komponen
├── security/             # Dokumentasi keamanan (Asset, DFD, Threat Model, Risk Register, AI Log)
├── crypto/               # Modul pustaka kriptografi (tutorCrypto.ts & tutorCrypto.test.js)
├── package.json          # Konfigurasi dependensi dan skrip proyek
└── README.md             # Dokumentasi utama proyek
```

Untuk menjalankan aplikasi web secara keseluruhan:
```bash
npm install
npm run dev
```

---

## 6. Kepatuhan & Versioning
* **Kepatuhan Data:** Tidak ada kunci privat, token asli, *password*, *secrets*, atau data pribadi nyata yang diunggah ke repositori; seluruhnya menggunakan data sintetis.
* **Tag Pengumpulan Akademik:** `v0.1`