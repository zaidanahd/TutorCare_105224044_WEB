import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-5 py-16 max-w-4xl">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 text-center">Tentang TutorCare</h1>
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6 text-slate-700 leading-relaxed text-lg">
        <p>
          <strong>TutorCare</strong> adalah platform bimbingan belajar privat yang dirancang khusus untuk membantu siswa Sekolah Dasar, Menengah, hingga Mahasiswa yang membutuhkan perhatian ekstra dan pembelajaran tanpa tekanan (*stress-free*).
        </p>
        <p>
          Kami percaya bahwa setiap siswa memiliki kecepatan belajar (*learning pace*) yang unik. Oleh karena itu, seluruh pengajar di platform kami dipilih melalui seleksi ketat dengan penekanan pada aspek kesabaran, empati, dan kemampuan komunikasi visual.
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mt-4">Misi Kami</h3>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Menyediakan akses mudah ke guru privat yang sabar dan berpengalaman.</li>
          <li>Mendukung metode belajar fleksibel secara <em>online</em> maupun <em>offline</em> (datang ke rumah).</li>
          <li>Membangun kembali rasa percaya diri siswa terhadap mata pelajaran yang dianggap sulit.</li>
        </ul>
      </div>
    </div>
  );
}