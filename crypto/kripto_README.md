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
| 1 | **Password Pengguna** | Melindungi kredensial autentikasi dari serangan *dictionary*, *brute-force*, dan *rainbow table* saat disimpan di database. | PBKDF2 (`sha512`, 10.000 iterasi, 64-byte key) dengan *unique salt* | **Tinggi** |
| 2 | **Data Transien / Sesi Booking** | Menjaga kerahasiaan (*confidentiality*) dan keutuhan catatan sesi bimbingan siswa selama proses transien. | AES-256-CBC dengan *randomized Initialization Vector* (IV) | **Tinggi** |
| 3 | **Token Akses & Sesi** | Memastikan keaslian token otorisasi serta mencegah manipulasi atau pemalsuan oleh pihak tak berwenang. | HMAC-SHA256 Signatures | **Sedang** |

---

##  3. Rancangan Komponen Kriptografi

### **A. Alur Masukan $\rightarrow$ Proses $\rightarrow$ Keluaran**
* **Hashing Password (PBKDF2):**
  * *Masukan:* `Password Teks Biasa` + `Unique Salt`
  * *Proses:* Penurunan kunci berbasis fungsi pseudorandom menggunakan iterasi tinggi (`10000` siklus HMAC-SHA512).
  * *Keluaran:* Hash string heksadesimal 128 karakter yang aman untuk disimpan.
* **Enkripsi/Dekripsi Data Booking (AES-256-CBC):**
  * *Masukan:* `Catatan Sesi Teks Biasa` + `Kunci Simetris 256-bit` + `IV 128-bit`
  * *Proses:* Enkripsi blok menggunakan mode *Cipher Block Chaining* (CBC).
  * *Keluaran:* Gabungan string format `iv:ciphertext` berformat heksadesimal.

### **B. Representasi Data**
* Seluruh data yang dienkripsi dan di-hash direpresentasikan dalam format **Hexadecimal String** (`Buffer.toString('hex')`) agar aman ditransmisikan dan disimpan ke dalam media penyimpanan berbasis teks.

### **C. Sumber Keacakan (Source of Randomness)**
* Pembangunan *Initialization Vector* (IV) pada enkripsi AES dan pembuatan *Salt* pada PBKDF2 menggunakan generator bilangan acak kriptografi aman bawaan Node.js, yaitu **`crypto.randomBytes()`**, untuk memastikan nilai keacakan tidak dapat ditebak (*unpredictable*).

---

##  4. Skenario Uji Otomatis & Hasil
Modul ini dilengkapi dengan skenario pengujian otomatis yang mencakup pengujian positif, batas, dan negatif (manipulasi/data rusak).

* **Jumlah Skenario Uji:** 4 skenario
* **Status Minimal Berhasil:** 4/4 Berhasil

### **Cara Menjalankan Pengujian Kriptografi:**
Pastikan Anda berada di direktori root repositori (`tutorship-app`), lalu jalankan perintah berikut di terminal:

```bash
node run-crypto.cjs
```

### **Output Hasil Pengujian di Terminal:**
```text
=== MENJALANKAN SKENARIO UJI KRIPTOGRAFI TUTORCARE ===
Skenario 1 (Hash Konsisten): BERHASIL [✔]
Skenario 2 (Enkripsi & Dekripsi Data): BERHASIL [✔]
Skenario 3 (Uji Batas Password Berbeda): BERHASIL [✔]
Skenario 4 (Uji Negatif Data Rusak/Manipulasi): BERHASIL [✔]
```

---

## 5. Struktur Repositori & Cara Menjalankan Aplikasi Web

```text
tutorship-app/
├── src/                  # Kode sumber frontend React & TypeScript (Web)
├── security/             # Dokumentasi dan asesmen Keamanan Siber
├── crypto/               # Komponen pustaka kriptografi
├── run-crypto.cjs        # Skrip uji otomatis kriptografi
├── package.json          # Konfigurasi dependensi dan skrip proyek
└── README.md             # Dokumentasi lengkap proyek
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