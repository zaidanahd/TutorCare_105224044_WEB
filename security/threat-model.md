# Threat Model — TutorCare

Berikut adalah 10 analisis ancaman spesifik menggunakan metode STRIDE pada komponen produk web TutorCare:

1. **[S-01] Spoofing pada Form Booking (`P-03`)**
   * **Kategori STRIDE:** Spoofing
   * **Elemen DFD:** `P-03` (Modul Form Pemesanan)
   * **Aset Terdampak:** `AST-02` (Data Input Formulir Booking)
   * **Deskripsi:** Penyerang dapat memalsukan identitas siswa saat melakukan pengiriman formulir pesanan sesi les tanpa verifikasi autentikasi token.

2. **[T-01] Tampering pada Data Profil Tutor (`DS-01`)**
   * **Kategori STRIDE:** Tampering
   * **Elemen DFD:** `DS-01` (`mockTutors.ts` / DB Profil Tutor)
   * **Aset Terdampak:** `AST-01` (Data Profil Tutor & Tarif)
   * **Deskripsi:** Pihak luar yang memiliki akses modifikasi kode repositori dapat mengubah nominal tarif jasa per jam tutor secara ilegal sebelum rilis.

3. **[R-01] Repudiation pada Transaksi Pemesanan Les (`P-03`)**
   * **Kategori STRIDE:** Repudiation
   * **Elemen DFD:** `P-03` (Modul Form Pemesanan)
   * **Aset Terdampak:** `AST-02` & `AST-04` (Data Transaksi & Log)
   * **Deskripsi:** Pengguna dapat menyangkal bahwa mereka telah mengirimkan permintaan pemesanan jadwal les karena belum adanya sistem basis data audit log transaksi permanen.

4. **[I-01] Information Disclosure melalui Client State Memory (`DS-02`)**
   * **Kategori STRIDE:** Information Disclosure
   * **Elemen DFD:** `DS-02` (State Memori Klien)
   * **Aset Terdampak:** `AST-02` (Data Input Kontak & Alamat)
   * **Deskripsi:** Data nomor telepon atau alamat rumah siswa yang diketikkan di form dapat terekspos jika browser pengguna disusupi ekstensi berbahaya.

5. **[D-01] Denial of Service pada Navigasi Katalog (`P-01`)**
   * **Kategori STRIDE:** Denial of Service
   * **Elemen DFD:** `P-01` (Modul Navigasi & Katalog Tutor)
   * **Aset Terdampak:** `AST-03` (Layanan Tampilan Antarmuka)
   * **Deskripsi:** Pengiriman permintaan HTTP berlebih secara simultan dapat membebani proses render komponen halaman utama Next.js.

6. **[E-01] Elevation of Privilege pada Layanan Autentikasi (`P-04`)**
   * **Kategori STRIDE:** Elevation of Privilege
   * **Elemen DFD:** `P-04` (Layanan Autentikasi & Manajemen Akun)
   * **Aset Terdampak:** `AST-05` (Kredensial Akun & Password Hashed)
   * **Deskripsi:** Eksploitasi celah validasi sesi login untuk mendapatkan hak akses sebagai administrator platform secara tidak sah.

7. **[S-02] Spoofing pada Modul Filter Tutor (`P-02`)**
   * **Kategori STRIDE:** Spoofing
   * **Elemen DFD:** `P-02` (Modul Filter & Pencarian)
   * **Aset Terdampak:** `AST-01` (Data Profil Tutor)
   * **Deskripsi:** Penyerang memalsukan parameter query string pencarian untuk menyuntikkan data tiruan ke dalam komponen filter sisi klien.

8. **[T-02] Tampering pada Modul Kriptografi Password (`P-04`)**
   * **Kategori STRIDE:** Tampering
   * **Elemen DFD:** `P-04` (Layanan Autentikasi & Manajemen Akun)
   * **Aset Terdampak:** `AST-05` (Fungsi Hashing Kripto)
   * **Deskripsi:** Modifikasi tidak sah pada parameter fungsi *salt* atau *scrypt* di modul kripto yang melemahkan kekuatan hash kata sandi.

9. **[I-02] Information Disclosure pada System Audit Log (`DS-04`)**
   * **Kategori STRIDE:** Information Disclosure
   * **Elemen DFD:** `DS-04` (System Audit Log)
   * **Aset Terdampak:** `AST-04` (Riwayat Akses & Log)
   * **Deskripsi:** Kebocoran file log aktivitas sistem yang mencatat informasi sensitif sesi pengguna tanpa enkripsi yang memadai.

10. **[D-02] Denial of Service pada Modul Pencarian (`P-02`)**
    * **Kategori STRIDE:** Denial of Service
    * **Elemen DFD:** `P-02` (Modul Filter & Pencarian)
    * **Aset Terdampak:** `AST-01` & `AST-03` (Data Profil & Layanan Filter)
    * **Deskripsi:** Pengiriman input string pencarian berukuran sangat besar yang memicu perulangan komputasi berlebihan di sisi klien.