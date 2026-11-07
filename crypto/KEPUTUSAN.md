# KEPUTUSAN: Pemilihan Mekanisme Enkripsi Terautentikasi dan Integritas Data (Tugas 2 Kriptografi)

Dokumen keputusan teknis lengkap tersedia di root direktori repositori: [`../KEPUTUSAN.md`](../KEPUTUSAN.md).

Ringkasan:
- **Kebutuhan:** Melindungi kerahasiaan & integritas catatan bimbingan privat siswa TutorCare dari kebocoran dan manipulasi tanpa izin.
- **Mekanisme:** Authenticated Encryption with Associated Data (AEAD) berbasis **AES-256-GCM** menggunakan modul bawaan resmi `node:crypto`.
- **Parameter:**
  - Kunci: 256-bit (32 bytes), CSPRNG via `.env` (`TUTORCARE_ENCRYPTION_KEY`).
  - IV / Nonce: 96-bit (12 bytes), CSPRNG unik per enkripsi (`crypto.randomBytes(12)`).
  - Auth Tag: 128-bit (16 bytes), Galois MAC.
  - AAD: Konteks pengikat data (misal `TutorCare:KonsultasiPrivat:Siswa_<id>:ID_<session>`).
  - Penanganan Galat: Gagal Tertutup (*Fail-Closed*).
- **Alasan:** Menghindari celah perakitan manual CBC + HMAC (*Cryptographic Doom Principle* / *Padding Oracle*), didukung akselerasi hardware CPU AES-NI & CLMUL, serta zero external dependency risk.
- **Pengujian:** 6 skenario otomatis di `crypto/tutorAead.test.js` (100% PASS).
