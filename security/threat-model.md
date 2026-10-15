# Threat Model (STRIDE) — TutorCare

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

5. **[D-01] Denial of Service melalui UI/DOM Flooding (`P-03`)**
   * **Kategori STRIDE:** Denial of Service
   * **Elemen DFD:** `P-03` (Modul Form Pemesanan)
   * **Aset Terdampak:** `AST-02`
   * **Deskripsi:** Skrip otomatis (bot) melakukan spam pengiriman data kosong atau masukan berukuran masif pada modal booking, mengganggu kinerja antarmuka browser.

6. **[E-01] Elevation of Privilege via Client State Manipulation (`P-01`)**
   * **Kategori STRIDE:** Elevation of Privilege
   * **Elemen DFD:** `P-01` (Modul Katalog & Navigasi)
   * **Aset Terdampak:** `AST-06` (Akun Administrator)
   * **Deskripsi:** Pengguna biasa mencoba memodifikasi variabel state JavaScript di console browser untuk mengakses hak istimewa panel admin manajemen tutor.

7. **[S-02] Spoofing tautan bantuan telepon / WhatsApp (`P-01`)**
   * **Kategori STRIDE:** Spoofing
   * **Elemen DFD:** `P-01` (Modul Navigasi / Top Bar)
   * **Aset Terdampak:** `AST-04` (Log Kontak Layanan)
   * **Deskripsi:** Penyerang menyisipkan tautan `tel:` atau nomor WhatsApp palsu pada elemen HTML bantuan untuk mengalihkan panggilan pengguna.

8. **[T-02] Tampering pada Parameter Filter Pencarian (`P-02`)**
   * **Kategori STRIDE:** Tampering
   * **Elemen DFD:** `P-02` (Modul Filter)
   * **Aset Terdampak:** `AST-03` (Preferensi Pencarian)
   * **Deskripsi:** Injeksi parameter masukan tidak valid pada pilihan tingkat kelas untuk memicu error *runtime* pada fungsi filter array di JavaScript.

9. **[I-02] Information Disclosure via Console Logging Debug Data (`P-03`)**
   * **Kategori STRIDE:** Information Disclosure
   * **Elemen DFD:** `P-03` (Modul Form Pemesanan)
   * **Aset Terdampak:** `AST-02`
   * **Deskripsi:** Pengembang meninggalkan perintah `console.log` yang menampilkan detail data pribadi pengguna secara transparan di konsol pengembang browser.

10. **[D-02] Denial of Service melalui Resource Exhaustion pada Filter Ekstrem (`P-02`)**
    * **Kategori STRIDE:** Denial of Service
    * **Elemen DFD:** `P-02` (Modul Filter)
    * **Aset Terdampak:** `AST-01`
    * **Deskripsi:** Permintaan pencarian dengan string masukan teks berukuran ribuan karakter yang membebani fungsi perulangan filter di sisi klien.