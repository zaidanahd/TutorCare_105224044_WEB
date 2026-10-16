# Risk Register & Rencana Kontrol — TutorCare

Matriks analisis risiko produk berdasarkan kondisi spesifik frontend dan arsitektur aplikasi TutorCare saat ini.

| ID Risiko | Ancaman Terkait | Kemungkinan | Dampak | Tingkat Risiko | Alasan Berdasarkan Kondisi Produk | Rencana Kontrol & Mitigasi (Peta ke Tugas 2/3) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RSK-01** | [S-01] Spoofing Form Booking | Sedang | Tinggi | **Tinggi** | Formulir hanya divalidasi di sisi klien tanpa autentikasi server, rentan data palsu masuk. | Implementasi token CSRF & autentikasi backend di Tugas 2. |
| **RSK-02** | [I-01] Information Disclosure Client State | Tinggi | Sedang | **Tinggi** | Data input form disimpan di memori DOM sementara yang dapat diakses skrip klien. | Enkripsi payload data sensitif di transit dan pembatasan penyimpanan lokal. |
| **RSK-03** | [T-01] Tampering Data Profil Tutor | Rendah | Tinggi | **Sedang** | Data masih berupa file statis TypeScript, integritas bergantung pada keamanan repositori. | Migrasi ke database relasional dengan pembatasan hak akses di Tugas 2. |
| **RSK-04** | [R-01] Repudiation Transaksi Pemesanan | Sedang | Sedang | **Sedang** | Belum ada *audit trail* atau basis data backend yang mencatat waktu pemesanan permanen. | Penambahan tabel audit log sistem terenkripsi di Tugas 3. |
| **RSK-05** | [D-01] DOM Spam / UI Flooding | Rendah | Sedang | **Rendah** | Aplikasi berskala individu dan belum memiliki proteksi *rate-limiting* pada tombol interaktif. | Implementasi *rate-limiting* pada endpoint pemesanan di Tugas 2. |