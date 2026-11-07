# TutorCare: Modul Kriptografi & Keamanan Data

Modul keamanan kriptografi untuk produk **TutorCare** (Platform Edukasi & Bimbingan Belajar). Direktori ini diorganisasi secara modular untuk memisahkan implementasi **Tugas 1** dan **Tugas 2**.

---

## Struktur Folder Kriptografi

```text
crypto/
├── tugas-1/                          # Direktori Khusus Tugas 1: Fondasi Kriptografi (Tag: crypto/v0.1)
│   ├── tutorCrypto.ts                # Implementasi Hashing Password (scrypt & timingSafeEqual)
│   └── tutorCrypto.test.js           # Uji unit Jest Tugas 1 (4 skenario)
│
├── tugas-2/                          # Direktori Khusus Tugas 2: AEAD & Integritas Data (Tag: crypto/v0.2 & v0.2)
│   ├── tutorAead.ts                  # Implementasi Enkripsi Terautentikasi (AES-256-GCM)
│   ├── tutorAead.test.js             # Uji unit Jest Tugas 2 (6 skenario fail-closed)
│   ├── KEPUTUSAN.md                  # Dokumen Keputusan Teknis (Kebutuhan -> Mekanisme -> Alasan)
│   └── AI_LOG.md                     # Log Penggunaan AI Tugas 2
│
├── index.ts                          # Re-export terpadu seluruh fungsi kriptografi
├── tutorCrypto.ts                    # Bridge backward-compatibility Tugas 1
├── tutorAead.ts                      # Bridge backward-compatibility Tugas 2
├── KEPUTUSAN.md                      # Akses cepat dokumen keputusan teknis Tugas 2
├── AI_LOG.md                         # Akses cepat catatan AI
└── kripto_README.md                  # Berkas dokumentasi utama ini
```

---

## Perbandingan Tugas 1 vs Tugas 2

| Atribut Evaluasi | Tugas 1 (Pekan 3) | Tugas 2 (Pekan 6) |
|:---|:---|:---|
| **Topik Utama** | Fondasi & Komponen Dasar Kriptografi | Enkripsi Terautentikasi & Integritas Data |
| **Aset yang Dilindungi** | Kredensial Pengguna (Password Siswa/Tutor) | Catatan Sesi Bimbingan Privat & Rekam Konseling Siswa |
| **Mekanisme / Algoritma** | Password Hashing (`scrypt` + CSPRNG Salt) | Authenticated Encryption with Associated Data (**AES-256-GCM**) |
| **Jaminan Keamanan** | *One-way irreversible hashing* & mitigasi *timing attack* via `timingSafeEqual` | Kerahasiaan (*confidentiality*) + Keutuhan Data (*authenticity & integrity*) + *Context binding* (AAD) |
| **Parameter Kunci** | Salt 16-byte acak per pengguna | Kunci simetris 256-bit CSPRNG, IV 96-bit, Auth Tag 128-bit, AAD Kontekstual |
| **Penyimpanan Rahasia** | Salt tersimpan bersama hash (`salt:hash`) | Kunci rahasia di luar repo via `.env` (`TUTORCARE_ENCRYPTION_KEY`) |
| **Respon Kondisi Tidak Sah** | Mengembalikan `false` | **Gagal Tertutup (*Fail-Closed*)**: Melempar eksepsi tanpa bocor plaintext |
| **Tag Rilis Git** | `crypto/v0.1` | `crypto/v0.2` (dan `v0.2`) |
| **Letak Berkas** | [`crypto/tugas-1/`](tugas-1/) | [`crypto/tugas-2/`](tugas-2/) |

---

## 1. Dokumentasi Tugas 2: Enkripsi Terautentikasi (AEAD)

### A. Lokasi Kode & Pengujian
- **Kode Sumber:** [`crypto/tugas-2/tutorAead.ts`](tugas-2/tutorAead.ts)
- **Unit Test:** [`crypto/tugas-2/tutorAead.test.js`](tugas-2/tutorAead.test.js)
- **Keputusan Teknis:** [`crypto/tugas-2/KEPUTUSAN.md`](tugas-2/KEPUTUSAN.md) (atau di root [`../KEPUTUSAN.md`](../KEPUTUSAN.md))
- **Log AI:** [`crypto/tugas-2/AI_LOG.md`](tugas-2/AI_LOG.md) (atau di root [`../AI_LOG.md`](../AI_LOG.md))

### B. Contoh Penggunaan API Tugas 2

```typescript
import {
  encryptAEAD,
  decryptAEAD,
  generateEncryptionKey,
  serializeEncryptedPayload,
} from './tugas-2/tutorAead';

// 1. Ambil atau bangkitkan kunci 256-bit CSPRNG
const key = generateEncryptionKey(); // atau otomatis dari process.env.TUTORCARE_ENCRYPTION_KEY

// 2. Data sensitif bimbingan dan konteks AAD
const catatanPrivat = "Siswa membutuhkan bimbingan intensif materi Graf dan Tree.";
const konteksAad = "TutorCare:Konsultasi:Siswa_105224044:ID_99";

// 3. Enkripsi Terautentikasi
const payload = encryptAEAD(catatanPrivat, konteksAad, key);
console.log("Ciphertext (Hex):", payload.ciphertext);
console.log("IV (Hex):", payload.iv);
console.log("Tag (Hex):", payload.tag);

// Simpan dalam format string aman di database
const databaseValue = serializeEncryptedPayload(payload); // "iv:tag:ciphertext"

// 4. Dekripsi Terautentikasi (Verifikasi integritas fail-closed)
const plaintext = decryptAEAD(databaseValue, konteksAad, key);
console.log("Hasil Dekripsi Sah:", plaintext);
```

---

## 2. Cara Menjalankan Seluruh Pengujian Otomatis

Jalankan perintah berikut di direktori root `tutorship-nextjs`:

```bash
npm test
```

### Hasil Eksekusi:
```text
PASS crypto/tugas-2/tutorAead.test.js
PASS crypto/tugas-1/tutorCrypto.test.js

Test Suites: 2 passed, 2 total
Tests:       10 passed, 10 total
Snapshots:   0 total
```

---

## 3. Langkah Push Commit dan Tag `crypto/v0.2`

Untuk mengirimkan hasil pekerjaan Tugas 2 ke GitHub:

```bash
# Push commit branch main
git push origin main

# Push tag crypto/v0.2
git push origin crypto/v0.2

# Push tag v0.2
git push origin v0.2
```
