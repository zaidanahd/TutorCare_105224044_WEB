# Dokumentasi Keamanan & System Hardening — TutorCare (`sec-0.2`)

**Mata Kuliah:** Keamanan Komputasi dan Siber  
**Tugas:** Tugas 2 — Kontrol Akses dan System Hardening  
**Penanda Rilis (Release Tag):** `sec-0.2`  
**Produk Digital:** TutorCare (Platform Edukasi & Bimbingan Belajar)  
**Pengembang:** Ahmad Zaidan (NIM: 105224044)  

---

## 1. Ikhtisar & Perbedaan Tugas 1 vs Tugas 2

| Aspek Penilaian | Tugas 1 Kamsib (Fondasi Model Ancaman) | Tugas 2 Kamsib (Kontrol Akses & System Hardening `sec-0.2`) |
|:---|:---|:---|
| **Fokus Utama** | Pemodelan ancaman (*STRIDE*), DFD, inventaris aset, dan register risiko. | Implementasi kontrol akses (RBAC), hardening host OS & container, vulnerability scanning, dan SBOM. |
| **Kontrol Akses** | Identifikasi kebutuhan kontrol akses secara teoritis. | Matriks RBAC 4 peran aktif dan pengujian 12 skenario akun uji sintetis (6 positif & 6 negatif) di `access-tests.md`. |
| **Penyimpanan Kredensial** | Pemilihan algoritma hashing (`scrypt`). | Bukti rekam format penyimpanan hash lambat (`scrypt`, $N=16384, r=8, p=1$, salt 16-byte) tanpa membocorkan data nyata. |
| **Hardening Sistem Operasi** | Identifikasi risiko SSH default. | Hardening VM Ubuntu 22.04: SSH hanya kunci publik, root login dilarang (`no`), skor Lynis naik dari **58** ke **78**. |
| **Hardening Container** | Image container standar Node.js. | Multi-stage Dockerfile Alpine, non-root user (UID 1001), `cap_drop: ALL`, `read_only: true`, port DB & App tidak dipublikasikan ke publik. |
| **Audit Kerentanan** | Belum ada pemindaian otomatis. | Pemindaian Trivy sebelum-sesudah (**4 CRITICAL -> 0 CRITICAL**) dan pembuatan SBOM berstandar CycloneDX JSON. |
| **Penanda Rilis** | `v0.1` | `sec-0.2` |

---

## 2. Struktur Berkas Direktori `security/`

```text
tutorship-nextjs/security/
├── access-tests.md          # Matriks RBAC 4 peran, 12 skenario uji (6 positif & 6 negatif), bukti hash scrypt, mapping risiko
├── AI_LOG.md                # Log transparansi pemanfaatan AI (prompt, alat, perubahan, verifikasi)
├── Dockerfile               # Spesifikasi image container Alpine non-root, eliminasi npm/npx, standalone Next.js
├── docker-compose.yml       # Orkes container hardened (cap_drop, no-new-privileges, read_only, unexposed ports)
├── lynis-before.txt         # Log audit Lynis sebelum hardening (Skor: 58/100, SSH root login aktif, tanpa auditd)
├── lynis-after.txt          # Log audit Lynis setelah hardening (Skor: 78/100, SSH key-only, verifikasi sshd -T)
├── image-scan-before.txt    # Laporan Trivy image baseline Debian (4 Kerentanan CRITICAL, 18 HIGH)
├── image-scan-after.txt     # Laporan Trivy image hardened Alpine (0 Kerentanan CRITICAL, 0 HIGH)
├── sbom.cdx.json            # Software Bill of Materials (SBOM) standar CycloneDX JSON v1.5
├── kamsib_README.md         # Ringkasan implementasi dan panduan demonstrasi Tugas 2
│
├── [Berkas Tugas 1]
├── asset-inventory.md       # Inventaris aset digital sistem TutorCare
├── dfd.md                   # Data Flow Diagram Level 0 & Level 1
├── threat-model.md          # Analisis pemodelan ancaman metode STRIDE
└── risk-register.md         # Matriks register risiko awal (RSK-01 s.d. RSK-05)
```

---

## 3. Rincian Pemenuhan Kriteria Rubrik Penilaian (100 Poin)

### K1: Autentikasi, Otorisasi, dan Least Privilege (Bobot: 35 Poin)
1. **Matriks Kontrol Akses Berbasis Peran (RBAC):**
   - Mendefinisikan hak izin untuk 4 peran: `Guest`, `Student`, `Tutor`, `Admin`.
   - Melindungi sumber daya kritis: reservasi booking, mutasi profil tutor, manajemen data, dan audit trail.
2. **12 Skenario Pengujian Akun Uji Sintetis:**
   - **Keseimbangan Uji:** 6 skenario uji positif (`POS-01` s.d. `POS-06`) dan 6 skenario uji negatif (`NEG-01` s.d. `NEG-06`).
   - Seluruh akses tidak sah berhasil ditolak (**100% penolakan akses ilegal** dengan kode HTTP 401 Unauthorized / HTTP 403 Forbidden).
3. **Penyimpanan Kredensial dengan Hash Lambat:**
   - Menggunakan fungsi penurunan kunci memori `scrypt` ($N=16384, r=8, p=1$) dengan CSPRNG salt 16-byte unik per pengguna dan perbandingan aman `timingSafeEqual`.
   - Bukti format penyimpanan: `<salt-hex>:<hash-hex>` tanpa mengekspos data pribadi nyata (seluruhnya akun sintetis).

### K2: Hardening Sistem Operasi dan Container (Bobot: 30 Poin)
1. **Hardening VM / Linux Host:**
   - Login SSH dibatasi hanya dengan kunci publik (`PubkeyAuthentication yes`).
   - Root login dan password authentication ditolak tegas:
     ```bash
     $ sudo sshd -T | grep -E 'passwordauthentication|permitrootlogin'
     passwordauthentication no
     permitrootlogin no
     ```
   - Peningkatan skor audit Lynis dari **58** (`lynis-before.txt`) menjadi **78** (`lynis-after.txt`), melampaui ambang batas minimal 70.
2. **Hardening Container Runtime (`security/Dockerfile` & `docker-compose.yml`):**
   - **Non-Root User:** Container aplikasi berjalan dengan pengguna non-root `UID 1001: nextjs` (GID 1001: nodejs). Container DB berjalan dengan user `postgres` (UID 70).
   - **Pembatasan Capability:** Seluruh Linux capabilities dibuang menggunakan `cap_drop: ALL`.
   - **Pencegahan Eskalasi Privilege:** Menerapkan direktif `security_opt: - no-new-privileges:true`.
   - **Read-Only Root Filesystem:** Sistem berkas root dikunci (`read_only: true`), dengan direktori sementara diisolasi melalui `tmpfs` berukuran terbatas (`size=64m,noexec,nosuid,nodev`).
   - **Isolasi Port Jaringan:** Port database (5432) dan port aplikasi (3000) **TIDAK dipublikasikan ke host publik (0.0.0.0)**.
     - Service `db` menggunakan `expose: "5432"` (hanya dapat diakses melalui jaringan internal bridge antar container).
     - Service `app` hanya terikat ke loopback lokal `127.0.0.1:3000:3000` (hanya dapat diakses melalui reverse proxy lokal).

### K3: Pemindaian Kerentanan Sebelum–Sesudah & SBOM (Bobot: 20 Poin)
1. **Hasil Pemindaian Kerentanan Trivy:**
   - **Sebelum (`image-scan-before.txt`):** Citra monolitik `node:20` (Debian) berukuran 1.18 GB mengandung **4 Kerentanan CRITICAL** (CVE-2023-6277, CVE-2023-38545, CVE-2023-4911) dan 18 Kerentanan HIGH.
   - **Sesudah (`image-scan-after.txt`):** Citra minimal multi-stage `node:20-alpine` berukuran 168 MB menghasilkan **0 Kerentanan CRITICAL** dan **0 Kerentanan HIGH** (100% bebas kerentanan kritis).
2. **Software Bill of Materials (SBOM):**
   - Disajikan dalam format standar industri **CycloneDX JSON v1.5** pada `security/sbom.cdx.json`, merinci dependensi runtime aplikasi Next.js, React, Prisma, Zod, dan pustaka kriptografi.

### K4: Keterkaitan dengan Register Risiko & Demonstrasi (Bobot: 15 Poin)
1. **Keterkaitan Eksplisit dengan Risiko Tugas 1:**
   - `RSK-01` ([S-01] Spoofing Form Booking) $\rightarrow$ Dimoderasi melalui Server Actions auth guard dan Zod schema.
   - `RSK-02` ([I-01] Information Disclosure) $\rightarrow$ Dimoderasi melalui isolasi port DB 5432 dan enkripsi AEAD.
   - `RSK-03` ([T-01] Tampering Data Profil Tutor) $\rightarrow$ Dimoderasi melalui guard RBAC (hanya pemilik profil atau Admin).
   - `RSK-04` ([R-01] Repudiation Transaksi) $\rightarrow$ Dimoderasi melalui PostgreSQL immutable booking codes & timestamp audit.
   - `[E-01]` (Elevation of Privilege) $\rightarrow$ Dimoderasi melalui non-root execution, `cap_drop: ALL`, dan `no-new-privileges`.
2. **Pencatatan AI:**
   - Tercatat lengkap pada `security/AI_LOG.md` sesuai ketentuan integritas akademik.

---

## 4. Panduan Demonstrasi Penilaian (Durasi: $\pm$3 Menit)

Saat mempresentasikan hasil Tugas 2 di depan dosen/asisten praktikum:

1. **Menit 0:00 - 0:45 $\rightarrow$ Kontrol Akses & Hashing Kredensial:**
   - Buka `security/access-tests.md`.
   - Tunjukkan matriks RBAC 4 peran (`Guest`, `Student`, `Tutor`, `Admin`).
   - Tunjukkan bukti 12 skenario pengujian dengan rasio 1:1 (6 uji positif `POS-01` s.d. `POS-06` dan 6 uji negatif `NEG-01` s.d. `NEG-06`).
   - Jelaskan bahwa kata sandi disimpan menggunakan `scrypt` ($N=16384$) dengan salt 16-byte unik tanpa mengekspos data nyata.
2. **Menit 0:45 - 1:45 $\rightarrow$ Hardening VM & Konfigurasi SSH:**
   - Tunjukkan verifikasi SSH daemon:
     ```bash
     sudo sshd -T | grep -E 'passwordauthentication|permitrootlogin'
     ```
     Buktikan bahwa kedua konfigurasi bernilai `no`.
   - Tunjukkan perbandingan skor Lynis: `security/lynis-before.txt` (skor 58) vs `security/lynis-after.txt` (skor 78).
3. **Menit 1:45 - 2:30 $\rightarrow$ Hardening Container Docker:**
   - Buka `security/docker-compose.yml` dan `security/Dockerfile`.
   - Tunjukkan bukti container berjalan sebagai non-root (`user: "1001:1001"`).
   - Tunjukkan direktif `cap_drop: ALL`, `read_only: true`, dan `no-new-privileges: true`.
   - Tunjukkan bahwa port 5432 database tidak memiliki pemetaan `ports: 5432:5432`, melainkan hanya `expose: 5432` di jaringan internal.
4. **Menit 2:30 - 3:00 $\rightarrow$ Pemindaian Trivy, SBOM, & Keterkaitan Risiko:**
   - Tunjukkan `security/image-scan-after.txt` membuktikan **0 CRITICAL vulnerabilities**.
   - Tunjukkan berkas `security/sbom.cdx.json`.
   - Jelaskan bagaimana kontrol ini memitigasi risiko Tugas 1 (`RSK-01` s.d. `RSK-04` dan `[E-01]`).

---

## 5. Perintah Verifikasi Mandiri

```bash
# 1. Memeriksa konfigurasi SSH Daemon
sudo sshd -T | grep -E 'passwordauthentication|permitrootlogin'

# 2. Memeriksa file status Lynis
cat security/lynis-after.txt | grep -E "Hardening index|Warnings"

# 3. Memeriksa status vulnerability scan
cat security/image-scan-after.txt | grep -E "CRITICAL|HIGH|Total"

# 4. Memeriksa integritas skenario pengujian RBAC
cat security/access-tests.md | grep -E "POS-|NEG-"
```
