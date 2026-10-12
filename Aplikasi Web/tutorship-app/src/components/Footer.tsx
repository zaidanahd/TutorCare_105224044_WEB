import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-400 py-16 border-t border-slate-800 mt-auto">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div>
          <h4 className="text-white text-xl font-extrabold mb-3">TutorCare</h4>
          <p className="text-sm leading-relaxed mb-4">
            Platform pencari guru privat yang ramah dan sabar, didedikasikan untuk membantu siswa memahami pelajaran tanpa tekanan.
          </p>
        </div>
        <div>
          <h5 className="text-white font-bold mb-4">Navigasi</h5>
          <ul className="flex flex-col gap-2.5 text-sm list-none">
            <li><a href="#" className="hover:text-white transition">Cari Tutor</a></li>
            <li><a href="#" className="hover:text-white transition">Cara Kerja</a></li>
            <li><a href="#" className="hover:text-white transition">Daftar Pengajar</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-bold mb-4">Bantuan</h5>
          <ul className="flex flex-col gap-2.5 text-sm list-none">
            <li><a href="#" className="hover:text-white transition">FAQ / Tanya Jawab</a></li>
            <li><a href="tel:08001234567" className="hover:text-white transition">Layanan Telepon</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-bold mb-4">Kontak</h5>
          <p className="text-sm mb-2">📞 0800-123-4567</p>
          <p className="text-sm">support@tutorcare.id</p>
        </div>
      </div>
      <div className="container mx-auto px-5 border-t border-slate-800 pt-6 text-sm flex flex-wrap justify-between items-center">
        <p>© 2026 TutorCare. Hak Cipta Dilindungi.</p>
        <p>Dikembangkan untuk Tugas Milestone 1 Pengembangan Aplikasi Web.</p>
      </div>
    </footer>
  );
}