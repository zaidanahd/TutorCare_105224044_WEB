# Dokumen Teknis Modul 4: Next.js App Router

**Nama/NIM** : Ahmad Zaidan / 105224044  
**Repositori** : [https://github.com/zaidanahd/TutorCare_105224044_WEB](https://github.com/zaidanahd/TutorCare_105224044_WEB)
**Versi Next.js dan mode Cache Components (aktif/tidak)** : Next.js 16.4.1 (Turbopack) | Mode Cache Components: **Aktif** (`cacheComponents: true` pada `next.config.ts`)  

---

## 1. Peta Rute

Berikut merupakan daftar pemetaan rute, berkas pada direktori `app/`, jenis rute (Statis, Dinamis, atau Prerender), serta deskripsi fungsional konten halaman:

| URL | Berkas di `app/` | Jenis Rute | Isi Halaman |
| :--- | :--- | :--- | :--- |
| `/` | `app/page.tsx` | Statis (Client Component) | Halaman beranda (*Landing Page* & Katalog Utama) yang menampilkan hero banner, fitur pencarian filter interaktif, daftar tutor awal, dan modal reservasi. |
| `/about` | `app/about/page.tsx` | Statis (Server Component) | Halaman informasi tentang platform TutorCare, latar belakang, visi misi, serta profil pengembang. |
| `/tutors` | `app/tutors/page.tsx` | Statis (Client Component) | Halaman direktori pencarian pengajar lengkap dengan penyaringan berdasarkan mata pelajaran, mode belajar, tombol uji coba berkas khusus (`loading.tsx` & `error.tsx`). |
| `/tutors/[id]` | `app/tutors/[id]/page.tsx` | Dinamis / SSG (`generateStaticParams`) | Halaman detail pengajar spesifik berdasarkan parameter ID (misal: `/tutors/1`, `/tutors/2`), memuat biodata lengkap, keahlian, dan tarif per jam. |
| `/tutors/loading-demo` | `app/tutors/loading-demo/page.tsx` | Partial Prerender / Server Component | Halaman demonstrasi yang memicu penundaan pemuatan data selama 4 detik untuk memperlihatkan animasi `loading.tsx`. |
| `/_not-found` | Otomatis (Next.js Fallback) | Statis | Halaman penanganan kesalahan 404 ketika pengguna mengakses rute yang tidak terdaftar atau gagal validasi. |

### Potongan Tabel Rute dari Keluaran `npm run build`:
```text
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ○ /tutors
├   /tutors/[id]
│ ├ ◐ /tutors/[id]
│ ├ ○ /tutors/1
│ ├ ○ /tutors/2
│ └ ○ /tutors/3
└ ◐ /tutors/loading-demo

○  (Static)             prerendered as static content
◐  (Partial Prerender)  prerendered as static HTML with dynamic server-streamed content
```

---

## 2. Layout, Template, dan Berkas Khusus

### A. Pohon Folder `app/` Akhir
```text
app/
├── about/
│   └── page.tsx                      # Halaman Statis Tentang Kami (/about)
├── components/                       # Kumpulan komponen modular antarmuka
│   ├── BookingModal.tsx              # Modal form pemesanan sesi bimbingan
│   ├── FilterBar.tsx                 # Panel interaktif filter mata pelajaran & metode
│   ├── Footer.tsx                    # Footer global aplikasi
│   ├── Navbar.tsx                    # Navbar navigasi aplikasi
│   └── TutorCard.tsx                 # Kartu profil tutor dan tautan rute dinamis
├── data/
│   └── mockTutors.ts                 # Data dummy tutor akademis (ID: 1, 2, 3)
├── tutors/
│   ├── [id]/
│   │   └── page.tsx                  # Halaman detail profil dinamis (/tutors/[id])
│   ├── loading-demo/
│   │   └── page.tsx                  # Halaman penundaan async untuk pengujian loading.tsx
│   ├── error.tsx                     # Error boundary penanganan galat segmen rute
│   ├── loading.tsx                   # Suspense fallback antarmuka pemuatan data
│   └── page.tsx                      # Direktori lengkap pengajar (/tutors)
├── favicon.ico                       # Favicon resmi web TutorCare
├── globals.css                       # Konfigurasi Tailwind CSS v4 & styling global
├── layout.tsx                        # Root Layout persisten (mempertahankan state)
└── template.tsx                      # Root Template non-persisten (re-mount & reset state)
```

### B. Hasil Uji Layout vs Template
Perbedaan mendasar antara `layout.tsx` dan `template.tsx`:
* **`Layout`**: Komponen pembungkus yang bersifat persisten antar pergantian rute. State di dalamnya (seperti nilai input teks atau scroll position) **dipertahankan**.
* **`Template`**: Komponen pembungkus yang membuat instans baru setiap navigasi (*re-mounted*), sehingga state internalnya **selalu di-reset ke nilai awal**.

#### Panduan Pengujian:
1. Buka browser pada alamat `http://localhost:3000/`.
2. Di bagian atas layar terdapat dua bar input:
   - Bar Biru (**LAYOUT**): Masukkan teks, misal: `"Teks Layout Tetap Ada"`.
   - Bar Kuning (**TEMPLATE**): Masukkan teks, misal: `"Teks Template Akan Hilang"`.
3. Klik tombol navigasi untuk berpindah halaman (misal menuju `/about` atau `/tutors`).
4. **Hasil**: Teks pada bar **LAYOUT** tetap tersimpan, sedangkan teks pada bar **TEMPLATE** otomatis terhapus/kosong kembali.

#### Tangkapan Layar Sebelum dan Sesudah Navigasi:
* *Sebelum Navigasi (Halaman `/` dengan teks terisi):*  
  ![Layout vs Template Sebelum Navigasi](./layout-sebelum-navigasi.jpg)
* *Sesudah Navigasi (Halaman `/about` - Input Template ter-reset):*  
  ![Layout vs Template Sesudah Navigasi](./layout-setelah-navigasi.jpg)

---

### C. Tangkapan Layar `loading.tsx` dan `error.tsx`

#### 1. Uji Coba `loading.tsx`
* **Implementasi**: Berkas `app/tutors/loading.tsx` bertindak sebagai fallback React Suspense dengan animasi spinner Tailwind CSS dan keterangan *"Memuat data TutorCare..."*.
* **Cara Menguji**: Akses tautan `http://localhost:3000/tutors/loading-demo` yang memiliki delay server selama 4 detik.

* *Tangkapan Layar Mode Development (`npm run dev`):*  
  ![Loading State Dev Mode](./loading-dev.jpg)
* *Tangkapan Layar Mode Produksi (`npm run start`):*  
  ![Loading State Production Mode](./loading-prod.jpg)

#### 2. Uji Coba `error.tsx`
* **Implementasi**: Berkas `app/tutors/error.tsx` ('use client') menangkap eksepsi yang dilempar dari segmen `/tutors`, menampilkan pesan ramah *"Terjadi Kesalahan pada Sistem"*, serta menyediakan tombol *"Coba Lagi"* (`reset()`).
* **Cara Menguji**: 
  - Pada halaman `/tutors`, klik tombol merah **`⚠️ Uji Coba error.tsx`**, atau
  - Akses langsung `http://localhost:3000/tutors/error-test`.
  - Pada **Mode Development**, Next.js akan menampilkan overlay runtime error. Tutup overlay (klik tanda silang di pojok kanan) untuk melihat UI `error.tsx` yang dirender di belakangnya.
  - Pada **Mode Produksi**, tampilan komponen `error.tsx` akan langsung tampil secara elegan tanpa overlay developer.

* *Tangkapan Layar Mode Development (`npm run dev`):*  
  ![Error Boundary Dev Mode](./error-dev.jpg)
* *Tangkapan Layar Mode Produksi (`npm run start`):*  
  ![Error Boundary Production Mode](./loading-prod.jpg)

---

## 3. Rute Dinamis dan Validasi params

### A. Tabel Uji Parameter Dinamis
Pengujian dilakukan terhadap berkas `app/tutors/[id]/page.tsx` menggunakan utilitas `curl` / browser:

| URL | Hasil yang Diharapkan | Hasil Aktual | Kode Status HTTP | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| `/tutors/1` | Menampilkan detail profil tutor Sarah Amalia | Halaman detail tutor berhasil dirender | `200 OK` | Parameter ID berupa angka valid dan terdaftar di data mock. |
| `/tutors/2` | Menampilkan detail profil tutor Budi Santoso | Halaman detail tutor berhasil dirender | `200 OK` | Parameter ID berupa angka valid dan terdaftar di data mock. |
| `/tutors/3` | Menampilkan detail profil tutor Alya Rahma | Halaman detail tutor berhasil dirender | `200 OK` | Parameter ID berupa angka valid dan terdaftar di data mock. |
| `/tutors/0` | Gagal validasi, diarahkan ke Halaman 404 | Ditampilkan halaman Not Found (`notFound()`) | `404 Not Found` | Angka 0 tidak memenuhi aturan angka positif (`[1-9]`). |
| `/tutors/01` | Gagal validasi, diarahkan ke Halaman 404 | Ditampilkan halaman Not Found (`notFound()`) | `404 Not Found` | Terdapat *leading zero* (angka nol di depan), ditolak oleh regex. |
| `/tutors/abc` | Gagal validasi, diarahkan ke Halaman 404 | Ditampilkan halaman Not Found (`notFound()`) | `404 Not Found` | Tipe data karakter string non-numerik tidak diizinkan. |
| `/tutors/-5` | Gagal validasi, diarahkan ke Halaman 404 | Ditampilkan halaman Not Found (`notFound()`) | `404 Not Found` | Format angka negatif tidak valid untuk ID entitas. |
| `/tutors/99` | Format valid tetapi data tidak ditemukan | Ditampilkan halaman Not Found (`notFound()`) | `404 Not Found` | ID valid secara format regex, tetapi ID `99` tidak terdaftar pada `mockTutors`. |

### B. Penjelasan Aturan Validasi Params
Pada berkas `app/tutors/[id]/page.tsx`, validasi dilakukan pada sisi server sebelum mengakses sumber data:
```typescript
// 1. Ekstraksi params secara asinkron sesuai Next.js App Router
const { id } = await params;

// 2. Validasi format ID menggunakan Regular Expression:
// Regex: /^[1-9]\d*$/
// - ^[1-9] : Digit pertama wajib berupa angka 1 sampai 9 (mencegah angka 0 atau nol di depan).
// - \d*    : Diikuti oleh nol atau lebih digit angka sembarang (0-9).
// - $      : Batas akhir string (mencegah adanya karakter non-numerik seperti huruf/simbol).
if (!/^[1-9]\d*$/.test(id)) {
  notFound();
}

// 3. Pencarian data berdasarkan ID yang terverifikasi
const tutor = MOCK_TUTORS.find((t) => String(t.id) === id);

// 4. Jika format ID valid namun entitas tidak ada dalam database/mock
if (!tutor) {
  notFound();
}
```
Aturan ini menjamin integritas data URL dan melindungi aplikasi dari injeksi masukan tidak valid (*malformed input*).

---

## 4. Pembagian Server dan Client Components

### A. Tabel Komponen dan Alasan Teknis

| Komponen / Berkas | Jenis Komponen | Alasan Teknis Pemilihan |
| :--- | :--- | :--- |
| `app/layout.tsx` | **Server Component** | Root Layout bertanggung jawab memuat metadata statis, font Next.js Google Fonts (`Geist`), dan tata letak dasar global. Tidak memerlukan event listener browser. |
| `app/template.tsx` | **Server Component** | Membungkus children segmen dengan re-instansiasi setiap navigasi. Efisien dirender di server tanpa overhead JavaScript client tambahan. |
| `app/page.tsx` | **Client Component** (`'use client'`) | Mengelola *client state* (`useState`) untuk membuka/menutup modal pemesanan bimbingan (`BookingModal`) dan interaksi katalog. |
| `app/about/page.tsx` | **Server Component** | Hanya menyajikan konten statis profil pengembang, visi misi, dan informasi platform. Menghemat bundle JavaScript klien. |
| `app/tutors/page.tsx` | **Client Component** (`'use client'`) | Menggunakan hook `useState` untuk filter pencarian dinamis (kategori mata pelajaran dan metode belajar), serta tombol pemicu simulasi error. |
| `app/tutors/[id]/page.tsx` | **Server Component** | Mengambil data berdasarkan params dinamis, mengeksekusi validasi server-side, dan menggunakan `generateStaticParams` untuk SSG (*Static Site Generation*). |
| `app/tutors/loading.tsx` | **Server Component** | Komponen fallback Suspense murni yang hanya merender elemen animasi spinner HTML/CSS statis. |
| `app/tutors/error.tsx` | **Client Component** (`'use client'`) | **Wajib Client Component** berdasarkan spesifikasi Next.js, karena harus menerima props `error` dan fungsi `reset()` untuk interaktivitas tombol "Coba Lagi". |
| `app/components/Navbar.tsx` | **Client Component** (`'use client'`) | Menangani interaktivitas navigasi, status tautan aktif, dan toggle menu responsif pada perangkat seluler. |
| `app/components/Footer.tsx` | **Server Component** | Menampilkan informasi hak cipta, tautan sosial, dan navigasi statis tanpa logika interaktif. |
| `app/components/TutorCard.tsx` | **Client Component** (`'use client'`) | Memiliki event handler `onClick` pada tombol *"Pesan Sesi"* yang memicu modal interaktif ke komponen induk. |
| `app/components/FilterBar.tsx` | **Client Component** (`'use client'`) | Berisi elemen form `<select>` dengan event handler `onChange` yang terhubung ke state filter pada komponen induk. |
| `app/components/BookingModal.tsx` | **Client Component** (`'use client'`) | Mengelola form input interaktif (nama, email, tanggal, durasi), validasi form sisi klien, dan event `onSubmit`. |

---

### B. Hasil Uji Impor `lib/data.ts` (`server-only`) dari Client Component

Sesuai instruksi keamanan modul, modul data server internal `lib/data.ts` dibuat dengan menyertakan proteksi paket `server-only`:
```typescript
// lib/data.ts
import 'server-only';

export interface InternalSystemConfig {
  databaseUrl: string;
  secretApiKey: string;
  serverTimestamp: number;
}

export const internalSystemConfig: InternalSystemConfig = {
  databaseUrl: 'postgresql://postgres:secret_password@localhost:5432/tutorcare_db',
  secretApiKey: 'TC_SEC_KEY_0192837465',
  serverTimestamp: Date.now(),
};
```

Ketika modul `lib/data.ts` diimpor ke dalam Client Component (misal pada `app/components/FilterBar.tsx` yang memiliki direktif `'use client'`), proses kompilasi bundler Next.js/Turbopack langsung memblokir kompilasi dan menghasilkan pesan galat (*build error*):

```text
> Build error occurred
Error: Turbopack build failed with 2 errors:
./lib/data.ts:1:1
Error: 'server-only' cannot be imported from a Client Component module
> 1 | import 'server-only';
    | ^^^^^^^^^^^^^^^^^^^^^
  2 |
  3 | export interface InternalSystemConfig {
  4 |   databaseUrl: string;

It should only be used from a Server Component.

Import traces:
  Client Component Browser:
    ./lib/data.ts [Client Component Browser]
    ./app/components/FilterBar.tsx [Client Component Browser]
    ./app/tutors/page.tsx [Client Component Browser]
    ./app/tutors/page.tsx [Server Component]

  Client Component SSR:
    ./lib/data.ts [Client Component SSR]
    ./app/components/FilterBar.tsx [Client Component SSR]
    ./app/tutors/page.tsx [Client Component SSR]
    ./app/tutors/page.tsx [Server Component]
```

**Analisis**:  
Paket `server-only` berhasil mencegah kebocoran kredensial rahasia server (seperti koneksi basis data atau API Key) agar tidak pernah bocor atau dibundel ke dalam file JavaScript yang dikirimkan ke peramban (*client browser*).

---

## 5. Verifikasi

Pengujian kualitas kode dan keutuhan arsitektur dilakukan melalui tiga perintah resmi:

### 1. Keluaran `npx tsc --noEmit` (Pemeriksaan Tipe TypeScript)
```text
PS C:\Users\Ahmad Zaidan\OneDrive\Desktop\TutorCare\tutorship-nextjs> npx tsc --noEmit
(Exit Code: 0 - Tidak ditemukan kesalahan tipe TypeScript)
```

### 2. Keluaran `npm run lint` (Pemeriksaan ESLint)
```text
PS C:\Users\Ahmad Zaidan\OneDrive\Desktop\TutorCare\tutorship-nextjs> npm run lint

> tutorship-nextjs@0.1.0 lint
> eslint .


C:\Users\Ahmad Zaidan\OneDrive\Desktop\TutorCare\tutorship-nextjs\app\components\TutorCard.tsx
  15:11  warning  Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element

✖ 1 problem (0 errors, 1 warning)
(Exit Code: 0 - Lolos seluruh aturan wajib linter)
```

### 3. Keluaran `npm run build` (Optimasi Build Produksi)
```text
PS C:\Users\Ahmad Zaidan\OneDrive\Desktop\TutorCare\tutorship-nextjs> npm run build

> tutorship-nextjs@0.1.0 build
> next build

▲ Next.js 16.4.1 (Turbopack)
✓ Running next.config.ts took 32ms
- Cache Components enabled
- Partial Prefetching enabled
- Experiments (use with caution):
  ✓ agentFeedback

  Creating an optimized production build ...
✓ Compiled successfully in 440ms
  Running TypeScript ...
  Finished TypeScript in 1603ms ...
  Collecting page data using 9 workers ...
  Generating static pages using 9 workers (0/11) ...
  Generating static pages using 9 workers (2/11) 
  Generating static pages using 9 workers (5/11) 
  Generating static pages using 9 workers (8/11) 
✓ Generating static pages using 9 workers (11/11) in 902ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ○ /tutors
├   /tutors/[id]
│ ├ ◐ /tutors/[id]
│ ├ ○ /tutors/1
│ ├ ○ /tutors/2
│ └ ○ /tutors/3
└ ◐ /tutors/loading-demo

○  (Static)             prerendered as static content
◐  (Partial Prerender)  prerendered as static HTML with dynamic server-streamed content

(Exit Code: 0 - Build produksi berhasil dibuat tanpa galat)
```

---

## 6. Kendala dan Penyelesaian

1. **Perbedaan Tipe Data ID pada Data Mock vs Validasi Parameter Numerik**:
   * *Kendala*: Awalnya data `mockTutors.ts` menggunakan ID dengan awalan alfabet (`'t1'`, `'t2'`, `'t3'`), sedangkan aturan spesifikasi validasi rute dinamis pada modul mewajibkan angka numerik positif tanpa angka nol di depan (`/^[1-9]\d*$/`). Akibatnya, saat `generateStaticParams` dijalankan, halaman `/tutors/t1` langsung memicu galat 404 pada saat build.
   * *Penyelesaian*: Nilai ID pada `mockTutors.ts` disesuaikan menjadi format numerik string (`'1'`, `'2'`, `'3'`) sehingga sinkron dengan fungsi `generateStaticParams()` dan lolos uji validasi regex dengan respon `200 OK`.

2. **Inkompatibilitas Segment Config `dynamic = 'force-dynamic'` dengan `cacheComponents: true` di Next.js 16**:
   * *Kendala*: Saat membuat halaman pengujian penundaan pemuatan `loading-demo`, penambahan konfig `export const dynamic = 'force-dynamic'` menghasilkan galat build `Route segment config "dynamic" is not compatible with nextConfig.cacheComponents`.
   * *Penyelesaian*: Konfigurasi `dynamic` dihapus karena pada arsitektur Next.js 16 dengan mode *Cache Components* dan *Partial Prerendering*, penundaan berbasis `await new Promise(...)` di dalam Server Component secara otomatis memicu streaming Suspense tanpa perlu memaksa konfigurasi segmen lama.

3. **Perubahan Perintah CLI Linting pada Next.js 16**:
   * *Kendala*: Perintah `next lint` bawaan pada Next.js versi 16.x menghasilkan galat `Invalid project directory provided: ...\lint` karena sub-perintah `next lint` telah dialihkan sepenuhnya menggunakan eksekusi langsung ESLint (`eslint .`).
   * *Penyelesaian*: Skrip `lint` pada berkas `package.json` diperbarui dari `"next lint"` menjadi `"eslint ."`, serta berkas konfigurasi `eslint.config.mjs` dikonfigurasi untuk mengecualikan modul CommonJS pendukung (`crypto/**` dan `jest.config.js`).

4. **Penguncian Berkas (*File Locking*) pada Windows saat Build Produksi**:
   * *Kendala*: Terjadi galat `EPERM: operation not permitted, unlink ...\.next\server\app\tutors\1.segments` saat mengeksekusi `npm run build` ketika server development (`npm run dev`) masih aktif di latar belakang.
   * *Penyelesaian*: Menghentikan sementara proses server development sebelum menjalankan proses kompilasi produksi `npm run build`.

---

## 7. Catatan Pemanfaatan AI

* **Alat AI yang Digunakan**: Antigravity AI Assistant (Model: Gemini 3.8 Flash High).
* **Perintah Utama (Prompting)**:
  - Analisis struktur rute Next.js App Router dan validasi parameter dinamis.
  - Pembuatan mekanisme demonstrasi visual untuk menguji persistensi state `layout.tsx` vs `template.tsx`.
  - Simulasi pemicuan state `loading.tsx` dan `error.tsx` untuk kemudahan pengambilan tangkapan layar (*screenshot*) pada mode development dan production.
  - Pengujian isolasi server data dengan paket `server-only` dari Client Component.
  - Perbaikan kompatibilitas konfigurasi ESLint Flat Config pada Next.js 16 dan verifikasi terminal (`tsc`, `lint`, `build`).
* **Bagian yang Digunakan**:
  - `tutorship-nextjs/app/layout.tsx` & `tutorship-nextjs/app/template.tsx`: Penambahan banner demonstrasi state input persistensi vs reset.
  - `tutorship-nextjs/app/tutors/page.tsx` & `tutorship-nextjs/app/tutors/loading-demo/page.tsx`: Penambahan tombol pemicu error boundary dan penundaan streaming.
  - `tutorship-nextjs/app/data/mockTutors.ts` & `tutorship-nextjs/app/tutors/[id]/page.tsx`: Sinkronisasi ID data mock ke format numerik dan validasi regex.
  - `tutorship-nextjs/lib/data.ts`: Pembuatan modul `server-only` untuk pengujian batas keamanan.
  - `tutorship-nextjs/docs/praktikum/modul-04.md`: Pembuatan laporan teknis komprehensif.
* **Cara Memverifikasi**:
  - Menjalankan `curl.exe` pada berbagai variasi parameter URL untuk memeriksa status HTTP 200 vs 404.
  - Menjalankan `npx tsc --noEmit` untuk memastikan tidak ada kesalahan tipe TypeScript.
  - Menjalankan `npm run lint` untuk memastikan kepatuhan standar linting tanpa error.
  - Menjalankan `npm run build` untuk memverifikasi keutuhan bundel produksi dan tabel rute aplikasi.