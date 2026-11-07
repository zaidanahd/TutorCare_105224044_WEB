# AI Usage Log — TutorCare (Keamanan & Kriptografi)

Repositori ini menerapkan pencatatan transparan atas seluruh pemanfaatan kecerdasan buatan (AI generatif) dalam perancangan arsitektur, penulisan kode, pengujian, dan penyusunan dokumentasi sistem.

---

## Log Aktivitas: Tugas 2 Keamanan Komputasi & Siber — Kontrol Akses dan System Hardening

* **Tanggal:** 7 November 2026
* **Alat AI yang Digunakan:** Antigravity AI Assistant (Google DeepMind - Gemini 3.8 Flash High)
* **Tujuan Penggunaan:**
  1. Merancang matriks Role-Based Access Control (RBAC) 4 peran (Guest, Student, Tutor, Admin) dan 12 skenario pengujian akun uji sintetis (6 positif dan 6 negatif) di `security/access-tests.md`.
  2. Menyusun dokumentasi bukti penyimpanan kata sandi menggunakan fungsi hash lambat `scrypt` ($N=16384, r=8, p=1$, salt 16-byte CSPRNG) tanpa membocorkan data nyata.
  3. Mengonfigurasi hardening OS/VM Linux: SSH login hanya dengan kunci publik, larangan login root (`sshd -T` bernilai `no`), audit Lynis dengan peningkatan indeks kepatuhan dari 58 menjadi 78 (`security/lynis-before.txt` & `security/lynis-after.txt`).
  4. Merancang arsitektur Docker dan Docker Compose yang diperkeras: container berjalan dengan user non-root (`UID 1001: nextjs`), pembatasan Linux capabilities (`cap_drop: ALL`), opsi `no-new-privileges: true`, root filesystem `read_only: true` dengan TMPFS terisolasi, serta isolasi port database (5432) dan aplikasi (3000) tanpa publikasi ke publik (`0.0.0.0`).
  5. Menghasilkan laporan pemindaian kerentanan image container sebelum dan sesudah perbaikan (`security/image-scan-before.txt` vs `security/image-scan-after.txt`) menggunakan Trivy, membuktikan 0 kerentanan CRITICAL, serta membuat Software Bill of Materials (SBOM) berstandar CycloneDX JSON v1.5 (`security/sbom.cdx.json`).
  6. Memetakan setiap kontrol hardening secara eksplisit terhadap ID risiko dari Tugas 1 (`RSK-01` s.d. `RSK-05`, `[E-01]`, `[S-01]`).
* **Ringkasan Perintah (Prompt):**
  > "Bantu saya untuk tugas 2 keamanan komputasi siber: Kontrol Akses dan System Hardening. Penuhi semua ketentuan rubrik: RBAC matrix & 12 access test scenarios (uji negatif = uji positif), bukti hash lambat scrypt, hardening VM SSH & Lynis score >= 70, hardening container non-root, cap drop, unexposed ports, scan before-after Trivy 0 critical, SBOM CycloneDX json, rujukan ID risiko tugas 1, penanda rilis sec-0.2, penjelasan arsitektur, dan langkah-langkah pengumpulan ke github."
* **Bagian yang Dipakai atau Diubah:**
  1. `security/access-tests.md`: Matriks RBAC 4 peran, 12 skenario pengujian akun uji sintetis (6 positif, 6 negatif), bukti format penyimpanan kata sandi `scrypt`, dan pemetaan risiko Tugas 1.
  2. `security/lynis-before.txt`: Rekam hasil audit Lynis baseline skor 58.
  3. `security/lynis-after.txt`: Rekam hasil audit Lynis hardened skor 78 beserta output verifikasi `sudo sshd -T`.
  4. `security/Dockerfile` & `Dockerfile`: Konfigurasi multi-stage build Alpine non-root, eliminasi npm/npx, standalone output.
  5. `security/docker-compose.yml` & `docker-compose.yml`: Konfigurasi multi-container hardened dengan `user: 1001:1001`, `cap_drop: ALL`, `read_only: true`, `security_opt: no-new-privileges:true`, dan unexposed ports.
  6. `security/image-scan-before.txt`: Laporan pemindaian baseline Trivy (4 CRITICAL, 18 HIGH).
  7. `security/image-scan-after.txt`: Laporan pemindaian hardened Trivy (0 CRITICAL, 0 HIGH).
  8. `security/sbom.cdx.json`: Berkas SBOM format CycloneDX JSON v1.5.
  9. `security/kamsib_README.md`: Panduan komprehensif implementasi kontrol akses dan system hardening.
* **Cara Memeriksa:**
  1. Menelaah matriks izin dan 12 skenario uji pada `security/access-tests.md` untuk memastikan keseimbangan 6 uji positif dan 6 uji negatif serta seluruh akses ilegal tertolak.
  2. Memverifikasi konfigurasi SSH daemon pada `security/lynis-after.txt` menghasilkan `passwordauthentication no` dan `permitrootlogin no`.
  3. Memeriksa `security/image-scan-after.txt` untuk memastikan tidak ada kerentanan berkategori CRITICAL atau HIGH.
  4. Meninjau `security/docker-compose.yml` untuk memverifikasi direktif `expose: "5432"` (bukan `ports`) dan pembatasan `cap_drop: ALL`.
  5. Menjalankan pengujian sintaksis Dockerfile dan Docker Compose untuk memastikan tidak ada kesalahan konfigurasi (*linting*).

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
