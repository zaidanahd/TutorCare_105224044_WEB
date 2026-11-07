# KEPUTUSAN: Pemilihan Mekanisme Enkripsi Terautentikasi dan Integritas Data (Tugas 2 Kriptografi)

**Mata Kuliah:** Kriptografi  
**Sub-CPMK:** 3 — Melindungi kerahasiaan dan integritas data produk dengan enkripsi terautentikasi (AEAD) atau MAC melalui pustaka yang terpelihara  
**Produk Digital:** TutorCare (Platform Penghubung Siswa dan Tutor Akademik)  
**Nama Pengembang:** Ahmad Zaidan (NIM: 105224044)  
**Repositori:** [TutorCare_105224044_WEB](https://github.com/zaidanahd/TutorCare_105224044_WEB)  
**Tag Rilis Tugas 2:** `crypto/v0.2`

---

## 1. Kebutuhan (Needs Analysis)

Pada ekosistem platform **TutorCare**, pengguna (siswa, orang tua, dan tutor) berinteraksi secara intensif dalam kegiatan bimbingan belajar dan evaluasi akademik. Berdasarkan inventarisasi aset dan analisis ancaman sistem, teridentifikasi kebutuhan krusial perlindungan data:

### A. Aset Data Sensitif yang Dilindungi
1. **Catatan Sesi Bimbingan & Rekam Konseling Siswa (`catatanPrivatBimbingan`):**  
   Berisi catatan perkembangan belajar, kelemahan pemahaman konsep, evaluasi perilaku, hingga catatan kebutuhan khusus siswa. Data ini bersifat sangat rahasia (*highly confidential*).
2. **Konteks & Integritas Sesi Belajar (`metadataSesi`):**  
   Data relasional yang mengikat catatan bimbingan dengan ID siswa, ID tutor, dan nomor sesi transaksi. Data ini tidak boleh tertukar, dipindahkan, atau dimanipulasi antar sesi belajar.

### B. Profil Ancaman & Kebutuhan Keamanan
- **Ancaman Kebocoran Data (*Breach of Confidentiality*):** Jika basis data berhasil diakses oleh pihak tidak berwenang (misal kebocoran *database backup* atau SQL injection), data catatan siswa tidak boleh terbaca dalam bentuk teks polos (*plaintext*).
- **Ancaman Manipulasi Data (*Tampering & Integrity Violation*):** Pihak penyerang atau pengguna nakal berpotensi mengubah status evaluasi bimbingan atau menyuntikkan muatan berbahaya tanpa terdeteksi jika sistem hanya mengandalkan enkripsi simetris konvensional tanpa autentikasi pesan.
- **Ancaman Pertukaran Konteks (*Transposition & Replay Attack*):** Penyerang mencoba memindahkan catatan evaluasi dari Siswa A ke Siswa B. Oleh karena itu, data asosiasi non-rahasia (seperti ID siswa dan ID sesi) harus terikat secara kriptografis pada proses validasi integritas.

---

## 2. Mekanisme yang Dipilih (Mechanism Specification)

Sesuai dengan ketentuan tugas dan standar keamanan modern, mekanisme yang dipilih adalah:  
**Authenticated Encryption with Associated Data (AEAD) berbasis algoritma AES-256-GCM (Galois/Counter Mode).**

Implementasi dibangun menggunakan pustaka resmi bawaan runtime: **`node:crypto`** (modul terkompilasi C++ berbasis OpenSSL yang terpelihara secara aktif).

```
+-----------------------------------------------------------------------------------------+
|                                ALUR ENKRIPSI AEAD (AES-256-GCM)                         |
|                                                                                         |
|   Plaintext (Catatan Bimbingan) ----+                                                   |
|                                     |                                                   |
|   Kunci 256-bit (CSPRNG via .env) --+---> [ Cipher AES-256-GCM ] ---> Ciphertext (Hex)  |
|                                     |                                                   |
|   Nonce/IV 96-bit (CSPRNG Unik) ----+                                                   |
|                                     |                                                   |
|   AAD (Konteks ID Siswa & Sesi) ----+-------------------------------> Auth Tag 128-bit  |
+-----------------------------------------------------------------------------------------+
```

### Dokumentasi Parameter Kriptografi

| Parameter | Spesifikasi & Nilai | Penjelasan & Standar Keamanan |
|:---|:---|:---|
| **Algoritma** | `aes-256-gcm` | Standar enkripsi simetris terautentikasi (AEAD) yang diakui NIST (SP 800-38D). |
| **Panjang Kunci** | 256 bit (32 bytes / 64 hex characters) | Memberikan tingkat keamanan maksimum terhadap serangan *brute force* klasik dan kuantum. |
| **Nonce / IV** | 96 bit (12 bytes) CSPRNG | Ukuran IV optimal untuk Galois/Counter Mode. Setiap operasi enkripsi membangkitkan IV unik baru melalui `crypto.randomBytes(12)` untuk mencegah bahaya *IV-reuse*. |
| **Authentication Tag** | 128 bit (16 bytes) | Tag integritas kriptografis yang dihasilkan dari Galois MAC. Memverifikasi keaslian ciphertext dan AAD secara matematis. |
| **Additional Authenticated Data (AAD)** | String konteks (misal: `TutorCare:KonsultasiPrivat:Siswa_<id>:ID_<session>`) | Data asosiasi yang dijamin integritasnya tanpa dienkripsi. Mengikat data rahasia pada konteks pemilik dan sesinya. |
| **Format Serialisasi** | Objek `EncryptedPayload` atau format terstruktur `iv:tag:ciphertext` | Memudahkan penyimpanan pada kolom basis data PostgreSQL maupun transmisi API antar komponen. |

### Penanganan Kunci dan Masukan
1. **Pembangkitan Kunci Menggunakan CSPRNG:**  
   Kunci di-generate menggunakan Cryptographically Secure Pseudo-Random Number Generator bawaan Node.js (`crypto.randomBytes(32)`).
2. **Penyimpanan Kunci di Luar Repositori:**  
   Kunci disimpan pada berkas lingkungan `.env` lokal dengan nama variabel `TUTORCARE_ENCRYPTION_KEY`. Berkas `.env` telah tercatat di `.gitignore` sehingga tidak pernah ter-commit atau terekspos ke repositori publik GitHub. Disediakan berkas template `.env.example` dengan placeholder aman.
3. **Validasi Masukan & Kunci:**  
   Fungsi memeriksa bahwa plaintext berupa string, panjang kunci tepat 32 bytes (256 bit), panjang IV tepat 12 bytes, dan panjang Authentication Tag tepat 16 bytes.
4. **Respon Kondisi Tidak Sah: Gagal Tertutup (*Fail-Closed*):**  
   Jika terjadi kondisi tidak sah (ciphertext dimodifikasi 1 bit saja, tag dipalsukan, AAD tidak cocok, atau kunci salah), modul akan langsung melempar eksepsi `Error` dan membatalkan seluruh operasi. **Sistem tidak pernah mengembalikan teks asli terpotong atau membocorkan plaintext**.

---

## 3. Alasan Pemilihan & Analisis Komparatif (Rationale)

Pemilihan **AES-256-GCM** melalui modul **`node:crypto`** didasarkan pada perbandingan teknis mendalam terhadap alternatif mekanisme lainnya:

### A. Perbandingan Mekanisme Kriptografi

| Kriteria Evaluasi | AES-256-GCM (Dipilih) | AES-256-CBC + HMAC (EtM) | AES-256-ECB (Ditolak) | ChaCha20-Poly1305 |
|:---|:---|:---|:---|:---|
| **Klasifikasi** | **AEAD Modern Terintegrasi** | Kombinasi Manual (Encrypt-then-MAC) | Sandi Blok Tanpa MAC | AEAD Modern |
| **Jaminan Kerahasiaan** | Ya (AES-256) | Ya (AES-256) | Tidak Aman (Pola teks terlihat) | Ya (ChaCha20) |
| **Jaminan Integritas** | Ya (128-bit Auth Tag otomatis) | Ya (HMAC terpisah) | Tidak Ada | Ya (128-bit Poly1305 Tag) |
| **Dukungan AAD** | Ya (Bawaan protokol) | Manual (harus di-hash ke HMAC) | Tidak Ada | Ya (Bawaan protokol) |
| **Risiko Implementasi** | **Sangat Rendah** (Standar tunggal teruji) | Tinggi (*Padding Oracle*, urutan verifikasi keliru) | Ekstrem (*ECB Penguin leak*) | Rendah |
| **Akselerasi Perangkat Keras** | **Sangat Cepat** (Dukungan CPU AES-NI & CLMUL) | Sedang (Dua langkah terpisah) | Cepat namun tidak aman | Cepat di perangkat tanpa AES-NI |

**Kesimpulan Pemilihan:**  
Menggabungkan enkripsi CBC dan HMAC secara manual sering kali menimbulkan kerentanan arsitektural (*Cryptographic Doom Principle*) jika pengembang salah menaruh urutan verifikasi MAC sebelum dekripsi. Sebaliknya, **AES-256-GCM** menyediakan enkripsi terautentikasi dalam satu kesatuan primitif matematis yang solid dan bebas dari serangan *padding oracle*.

### B. Pemilihan Pustaka: `node:crypto` vs Pustaka Eksternal
1. **Terpelihara dan Resmi (*Maintained & Battle-Tested*):**  
   Modul `node:crypto` dirilis dan dipelihara langsung oleh core tim Node.js dan OpenSSL. Modul ini rutin diaudit secara ketat dan mendapatkan patch keamanan CVE secara cepat.
2. **Nol Dependensi (*Zero-Dependency Risk*):**  
   Menghindari penggunaan paket pihak ketiga yang rawan *supply-chain attacks* (seperti insiden pembajakan paket npm) atau paket lama yang sudah ditinggalkan (*unmaintained* seperti `crypto-js`).
3. **Kinerja Native C++:**  
   Operasi kriptografi dieksekusi langsung pada layer *engine* C++ OpenSSL yang terhubung ke instruksi instruksi prosesor host, menghasilkan latensi operasi di bawah 1 milidetik.

---

## 4. Hasil Pengujian Otomatis & Verifikasi

Pengujian dilakukan menggunakan framework Jest pada berkas `crypto/tutorAead.test.js` dengan **6 skenario komprehensif** (melampaui syarat minimum 4 skenario), mencakup skenario sukses dan skenario penolakan kondisi tidak sah:

```text
PASS crypto/tutorAead.test.js
  Tugas 2 Kriptografi: Pengujian Enkripsi Terautentikasi (AEAD) & Integritas Data TutorCare
    ✓ Skenario 1 (Positif - Happy Path): Enkripsi dan dekripsi data bimbingan berhasil secara utuh (2 ms)
    ✓ Skenario 2 (Negatif - Modifikasi Data): Ciphertext yang dimanipulasi ditolak (Fail-Closed) (8 ms)
    ✓ Skenario 3 (Negatif - Modifikasi Tag): Authentication Tag yang diubah ditolak (Fail-Closed) (1 ms)
    ✓ Skenario 4 (Negatif - Kunci Salah): Dekripsi dengan kunci yang tidak sah ditolak (Fail-Closed) (1 ms)
    ✓ Skenario 5 (Negatif - Modifikasi AAD): Konteks AAD yang dipalsukan ditolak (Fail-Closed) (1 ms)
    ✓ Skenario 6 (Uji Serialisasi & Validasi Batas): Format string "iv:tag:ciphertext" dan penolakan kunci cacat (1 ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
```

---

## 5. Ringkasan Demonstrasi (Panduan 3 Menit)

Saat sesi evaluasi/demonstrasi individu pertemuan pekan 6:
1. **Menit 1 (Kebutuhan & Mekanisme):** Menunjukkan dokumen `KEPUTUSAN.md` dan menjelaskan bahwa TutorCare melindungi catatan bimbingan privat siswa menggunakan **AES-256-GCM** dengan parameter 256-bit key, 96-bit nonce CSPRNG, 128-bit tag, dan AAD terikat konteks sesi.
2. **Menit 2 (Penyimpanan Kunci & Keamanan):** Menunjukkan berkas `.env` lokal di mana kunci `TUTORCARE_ENCRYPTION_KEY` disimpan secara terisolasi di luar repositori, file `.gitignore` yang memblokir `.env`, dan berkas panduan `.env.example`.
3. **Menit 3 (Uji Integritas & Fail-Closed):** Menjalankan `npm test` di terminal untuk mendemonstrasikan bahwa sistem berhasil mendekripsi data sah, dan secara tegas menolak (gagal tertutup) saat ciphertext, authentication tag, AAD, maupun kunci dimanipulasi.
