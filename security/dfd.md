# Data Flow Diagram (DFD) Awal — TutorCare

Dokumen ini memuat arsitektur Data Flow Diagram (DFD) awal beserta batas kepercayaan (*Trust Boundary*) dan identifikasi penandaan proteksi kriptografi pada aliran data.

---

## 1. Diagram Mermaid DFD

\`\`\`mermaid
graph TB
    %% External Entities
    subgraph EE [External Entities]
        EE01[EE-01: Siswa / Orang Tua]
        EE02[EE-02: Tutor / Pengajar]
        EE03[EE-03: Administrator Platform]
    end

    %% Processes
    subgraph P [Application Logic / Processes]
        P01[P-01: Modul Navigasi & Katalog Tutor]
        P02[P-02: Modul Filter & Pencarian]
        P03[P-03: Modul Form Pemesanan / Booking]
        P04[P-04: Layanan Autentikasi & Manajemen Akun]
    end

    %% Data Stores
    subgraph DS [Data Stores]
        DS01[DS-01: Mock Data / DB Profil Tutor]
        DS02[DS-02: DB Transaksi Pemesanan]
        DS03[DS-03: DB Akun & Kredensial - Password Hashed]
        DS04[DS-04: System Audit Log]
    end

    %% Data Flows & Trust Boundary Interactions
    EE01 -->|Permintaan Halaman & Katalog| P01
    EE01 -->|Kriteria Mata Pelajaran & Mode| P02
    EE01 -->|Data Pemesanan & Kontak| P03
    EE01 -->|Kredensial Login| P04

    P01 -->|Render UI Katalog| EE01
    P02 -->|Hasil Filter Tutor| EE01
    P03 -->|Konfirmasi Sesi Booking| EE01

    P01 -.->|Ambil Data Tutor| DS01
    P02 -.->|Query Filter Data| DS01
    P03 ==>|Simpan Data Transaksi [AES-256]| DS02
    P04 ==>|Verifikasi Salted Hash| DS03
    P04 -.->|Catat Jejak Akses [HMAC]| DS04
\`\`\`

---

## 2. Tabel Elemen & Proteksi Kriptografi

| ID Elemen | Nama Elemen | Jenis Elemen | Proteksi Kriptografi | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| **EE-01** | Siswa / Orang Tua | External Entity | - | Pengguna publik pencari tutor privat. |
| **EE-02** | Tutor / Pengajar | External Entity | - | Pengajar terverifikasi dalam platform. |
| **EE-03** | Administrator Platform | External Entity | - | Pengelola sistem dan manajemen data. |
| **P-01** | Modul Navigasi & Katalog Tutor | Process | - | Komponen UI menampilkan daftar pengajar. |
| **P-02** | Modul Filter & Pencarian | Process | - | Memproses kriteria mata pelajaran/kelas/mode. |
| **P-03** | Modul Form Pemesanan | Process | **TLS 1.3 (Transit)** | Memvalidasi masukan data kontak & jadwal. |
| **P-04** | Layanan Autentikasi | Process | **scrypt / Salted Hash** | Memverifikasi kredensial login pengguna. |
| **DS-01** | DB Profil Tutor | Data Store | - | Menyimpan data publik profil pengajar. |
| **DS-02** | DB Transaksi Pemesanan | Data Store | **AES-256 (At Rest)** | Menyimpan jadwal & data pemesanan privat. |
| **DS-03** | DB Akun & Kredensial | Data Store | **Salted Hash (One-Way)** | Menyimpan password yang telah di-hash. |
| **DS-04** | System Audit Log | Data Store | **HMAC / Signed Log** | Memastikan integritas jejak audit sistem. |

---

## 3. Trust Boundary (Batas Kepercayaan)

1. **Trust Boundary 1 (TB-01: Public Internet vs Application Client):** Memisahkan browser pengguna yang mengakses antarmuka Next.js dengan jalur transmisi jaringan yang dilindungi oleh enkripsi **TLS 1.3 / HTTPS**.
2. **Trust Boundary 2 (TB-02: Client Browser vs Server/Database Environment):** Memisahkan area masukan pengguna (*user input*) yang rentan dari lingkungan proses server dan penyimpanan data sensitif yang dilindungi enkripsi *at-rest* dan *salted hashing*.