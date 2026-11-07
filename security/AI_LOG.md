# AI Usage Log — TutorCare (Keamanan & Kriptografi)

Repositori ini menerapkan pencatatan transparan atas seluruh pemanfaatan kecerdasan buatan (AI generatif) dalam perancangan arsitektur, penulisan kode, pengujian, dan penyusunan dokumentasi sistem.

---

## Log Aktivitas: Tugas 2 Kriptografi — Enkripsi Terautentikasi & Integritas Data

* **Tanggal:** 7 November 2026
* **Alat AI yang Digunakan:** Antigravity AI Assistant (Google DeepMind - Gemini 3.8 Flash High)
* **Tujuan Penggunaan:**
  1. Merancang arsitektur modul Authenticated Encryption with Associated Data (AEAD) berbasis AES-256-GCM pada aplikasi web TutorCare.
  2. Menyusun parameter teknis kriptografi (panjang kunci 256-bit, nonce 96-bit CSPRNG, tag 128-bit, AAD context binding) dan penanganan kondisi gagal tertutup (*fail-closed*).
  3. Mengembangkan skenario pengujian unit otomatis menggunakan Jest untuk menguji kondisi positif dan penolakan manipulasi (tampered ciphertext, tampered tag, wrong key, forged AAD).
  4. Menyusun analisis komparatif kebutuhan, mekanisme, dan alasan teknis pada dokumen `KEPUTUSAN.md`.
* **Ringkasan Perintah (Prompt):**
  > "Bantu saya menyelesaikan Tugas 2 mata kuliah Kriptografi mengenai Enkripsi Terautentikasi dan Integritas Data pada produk digital TutorCare. Buatkan modul AEAD berbasis node:crypto, parameter terdokumentasi (kunci CSPRNG di luar repo via .env, IV unik, tag, AAD), fail-closed error handling, minimal 4 skenario uji otomatis dengan Jest, KEPUTUSAN.md (kebutuhan -> mekanisme -> alasan), pencatatan AI_LOG.md, serta panduan push commit dan pembuatan tag v0.2."
* **Bagian yang Dipakai atau Diubah:**
  1. `crypto/tutorAead.ts`: Pembuatan implementasi fungsi `encryptAEAD`, `decryptAEAD`, `generateEncryptionKey`, `getEncryptionKeyFromEnv`, serialisasi payload, dan validasi masukan fail-closed.
  2. `crypto/tutorCrypto.ts`: Integrasi re-export modul AEAD di samping fungsi hashing Tugas 1.
  3. `crypto/tutorAead.test.js`: Pembuatan 6 skenario pengujian otomatis Jest (mencakup penolakan modifikasi data, tag, kunci, dan AAD).
  4. `KEPUTUSAN.md`: Penyusunan analisis kebutuhan TutorCare, spesifikasi parameter, serta perbandingan analitis dengan CBC+HMAC, ECB, dan ChaCha20-Poly1305.
  5. `.env.example`: Pembuatan template konfigurasi environment variable dengan kunci sintetis dummy.
  6. `crypto/kripto_README.md`: Pembaruan dokumentasi API dan panduan verifikasi.
* **Cara Memeriksa:**
  1. Menjalankan pengujian otomatis: `npm test` di terminal, memastikan seluruh skenario (10 skenario total) berstatus `PASS`.
  2. Memverifikasi sifat fail-closed: Memastikan manipulasi 1 byte pada ciphertext atau tag langsung menggagalkan dekripsi dan melempar eksepsi tanpa membocorkan plaintext.
  3. Memeriksa keberadaan berkas `.env` pada `.gitignore` untuk menjamin tidak ada kunci rahasia yang terunggah ke repositori.
  4. Membaca dan memahami alur eksekusi algoritma Galois/Counter Mode agar siap mendemonstrasikannya secara mandiri pada sesi penilaian tatap muka.

---

## Log Aktivitas: Tugas 1 Kriptografi & Keamanan Komputasi Siber

* **Tanggal:** 12 - 16 Oktober 2026
* **Alat AI yang Digunakan:** Gemini (Google)
* **Tujuan Penggunaan:**
  1. Membantu perancangan skenario ancaman STRIDE pada komponen DFD TutorCare (`security/threat-model.md`).
  2. Menyusun matriks risk register dan rencana mitigasi keamanan (`security/risk-register.md`).
  3. Merancang skrip hashing password dengan algoritma `scrypt` dan verifikasi `timingSafeEqual` (`crypto/tutorCrypto.ts` & `crypto/tutorCrypto.test.js`).
* **Ringkasan Perintah (Prompt):** Meminta arahan struktur modul kriptografi simetris/hashing dan skenario uji Jest untuk password hashing.
* **Bagian yang Diubah/Dipakai:** Berkas `crypto/tutorCrypto.ts`, `crypto/tutorCrypto.test.js`, dan berkas dokumentasi di direktori `security/`.
* **Cara Memeriksa:** Menjalankan `npm test` di terminal dan mencocokkan dokumen dengan inventaris aset sistem.

---

## Pernyataan Integritas Akademik
Seluruh kode dan dokumen hasil bantuan AI generatif telah saya pelajari, telaah, dan verifikasi secara mandiri. Tidak ada rahasia, kunci privat nyata, atau data pribadi yang diunggah ke repositori; seluruh data yang disertakan adalah data sintetis tiruan untuk keperluan akademik.

**Ahmad Zaidan (NIM: 105224044)**
