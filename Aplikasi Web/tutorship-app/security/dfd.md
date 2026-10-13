# Data Flow Diagram (DFD) Awal — TutorCare

Dokumen ini memuat arsitektur Data Flow Diagram (DFD) awal beserta batas kepercayaan (*Trust Boundary*) dan identifikasi penandaan proteksi kriptografi pada aliran data.

---

## 1. Diagram Mermaid DFD

```mermaid
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
        DS01[(DS-01: Mock Data / DB Profil Tutor)]
        DS02[(DS-02: DB Transaksi Pemesanan)]
        DS03[(DS-03: DB Akun & Kredensial - Password Hashed)]
        DS04[(DS-04: System Audit Log)]
    end

    %% Trust Boundaries
    subgraph TB1 [Trust Boundary 1: Client / Public Internet - Enkripsi TLS/HTTPS]
        EE01
        EE02
    end

    subgraph TB2 [Trust Boundary 2: Server Application / Internal Memory]
        P01
        P02
        P03
        P04
        DS01
        DS02
        DS03
        DS04
    end

    %% Data Flows
    EE01 -- "F-01: Input Kriteria Pencarian (Plaintext)" --> P02
    P02 -- "F-02: Query Data Tutor" --> DS01
    DS01 -- "F-03: Result Data Tutor (Public)" --> P01
    P01 -- "F-04: Tampilan Katalog Tutor" --> EE01

    EE01 -- "F-05: Input Form Booking [HTTPS TLS 1.3]" --> P03
    P03 -- "F-06: Simpan Transaksi Booking [Encrypted at Rest]" --> DS02

    EE02 -- "F-07: Login / Authenticate [HTTPS TLS 1.3]" --> P04
    EE03 -- "F-08: Admin Access [HTTPS TLS 1.3]" --> P04
    P04 -- "F-09: Verifikasi Hash Password [Argon2id/bcrypt]" --> DS03
    P04 -- "F-10: Catat Audit Trail Log [Append-Only]" --> DS04
```

---

## 2. Tabel Elemen & Proteksi Kriptografi

| ID Elemen | Nama Elemen | Jenis Elemen | Proteksi Kriptografi | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| **EE-01** | Siswa / Orang Tua | External Entity | - | Pengguna publik pencari tutor. |
| **EE-02** | Tutor / Pengajar | External Entity | - | Pengajar terverifikasi. |
| **EE-03** | Administrator Platform | External Entity | - | Pengelola sistem. |
| **P-01** | Modul Navigasi & Katalog | Process | - | Komponen UI menampilkan katalog tutor. |
| **P-02** | Modul Filter & Pencarian | Process | - | Memproses kriteria mata pelajaran/kelas/mode. |
| **P-03** | Modul Form Pemesanan | Process | **TLS 1.3 (Transit)** | Memvalidasi masukan nama & nomor kontak. |
| **P-04** | Layanan Autentikasi | Process | **bcrypt / Argon2id** | Memverifikasi kredensial login. |
| **DS-01** | DB Profil Tutor | Data Store | - | Menimpan data publik tutor. |
| **DS-02** | DB Transaksi Pemesanan | Data Store | **AES-256 (At Rest)** | Menyimpan jadwal & data pemesan. |
| **DS-03** | DB Akun & Kredensial | Data Store | **Salted Hash (One-Way)** | Menyimpan password yang telah di-hash. |
| **DS-04** | System Audit Log | Data Store | **HMAC / Signed Log** | Memastikan integritas jejak audit. |

---

## 3. Trust Boundary (Batas Kepercayaan)

1. **Trust Boundary 1 (TB-01: Public Internet vs Application Client):** Memisahkan browser pengguna yang tidak terenkripsi secara lokal dengan jalur transmisi jaringan yang dilindungi oleh enkripsi **TLS 1.3 / HTTPS**.
2. **Trust Boundary 2 (TB-02: Client Browser vs Server/Database Environment):** Memisahkan area masukan pengguna (*user input*) yang rentan injeksi dengan lingkungan proses server dan penyimpanan data sensitif yang dilindungi enkripsi *at-rest* dan *salted hashing*.