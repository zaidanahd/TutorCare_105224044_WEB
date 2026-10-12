import React, { useState } from 'react';

export default function App() {
  const [isLargeText, setIsLargeText] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState('');
  
  // State Form Booking & Validasi Klien
  const [studentName, setStudentName] = useState('');
  const [contact, setContact] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const toggleFontSize = () => {
    setIsLargeText(!isLargeText);
    document.body.classList.toggle('large-text', !isLargeText);
  };

  const toggleFaqItem = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openBookingModal = (tutorName: string) => {
    setSelectedTutor(tutorName);
    setIsModalOpen(true);
    setFormError('');
    setFormSuccess(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !contact.trim()) {
      setFormError('Nama siswa dan nomor kontak wajib diisi dengan benar!');
      setFormSuccess(false);
      return;
    }
    setFormError('');
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setIsModalOpen(false);
      setStudentName('');
      setContact('');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#1f2937]">
      {/* Top Announcement / Accessibility Bar */}
      <div className="bg-[#0f172a] text-[#f1f5f9] text-sm py-2.5">
        <div className="container mx-auto px-5 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2.5 font-medium">
            <span>Struggling with homework or tests?</span>
            <a href="tel:08001234567" className="bg-[#22c55e] text-[#064e3b] font-bold px-3 py-0.5 rounded-full inline-flex items-center gap-1.5 hover:bg-[#4ade80]">
              <span>📞</span> Call Toll-Free: 0800-123-4567
            </a>
          </div>
          <div className="flex items-center gap-3.5">
            <span>Need larger text?</span>
            <button 
              onClick={toggleFontSize}
              className="bg-white/15 border border-white/30 text-white px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-white/25 flex items-center gap-1.5 transition"
            >
              <span>🔍</span> <strong>Bigger Text</strong>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <header className="bg-white border-b-2 border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-5 flex justify-between items-center h-20">
          <a href="#" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1f6feb] to-[#38bdf8] text-white rounded-xl flex items-center justify-center shadow-md">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-slate-900 leading-tight">TutorCare</span>
              <span className="text-xs text-slate-500 font-medium">Gentle & Patient Learning</span>
            </div>
          </a>

          <nav>
            <ul className="flex items-center gap-6 list-none">
              <li><a href="#search-box" className="text-base font-semibold text-slate-600 hover:text-[#1f6feb] hover:bg-[#eaf2ff] px-3 py-2 rounded-lg transition">Find a Tutor</a></li>
              <li><a href="#how-it-works" className="text-base font-semibold text-slate-600 hover:text-[#1f6feb] hover:bg-[#eaf2ff] px-3 py-2 rounded-lg transition">How It Works</a></li>
              <li><a href="#featured-tutors" className="text-base font-semibold text-slate-600 hover:text-[#1f6feb] hover:bg-[#eaf2ff] px-3 py-2 rounded-lg transition">Experienced Tutors</a></li>
              <li><a href="#faq" className="text-base font-semibold text-slate-600 hover:text-[#1f6feb] hover:bg-[#eaf2ff] px-3 py-2 rounded-lg transition">Common Questions</a></li>
              <li>
                <a href="#search-box" className="bg-[#1f6feb] text-white font-bold px-5 py-3 rounded-full shadow-md hover:bg-[#134db3] transition inline-flex items-center gap-2">
                  <span>Start Free Trial</span>
                  <span>→</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-[#eff6ff] to-white py-16 border-b border-slate-200">
          <div className="container mx-auto px-5 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#fef3c7] text-[#92400e] font-bold text-sm px-3.5 py-1.5 rounded-full mb-4 border border-[#fde68a]">
                <span>❤️</span> Dedicated to students who need extra care & time
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] leading-tight mb-5">
                School feels difficult? <br />
                <span className="text-[#1f6feb] underline decoration-[#93c5fd] decoration-2 underline-offset-6">We help you understand,</span> without any rush.
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Everyone learns at their own pace. Our friendly and certified tutors explain tricky subjects step-by-step so you or your child can feel confident and happy in school again.
              </p>

              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-center gap-3 font-semibold text-slate-800">
                  <div className="w-6 h-6 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center font-bold text-xs flex-shrink-0">✓</div>
                  100% Patient & Kind Teachers (No scolding, ever)
                </div>
                <div className="flex items-center gap-3 font-semibold text-slate-800">
                  <div className="w-6 h-6 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center font-bold text-xs flex-shrink-0">✓</div>
                  Free 30-Minute Trial Session with no obligations
                </div>
                <div className="flex items-center gap-3 font-semibold text-slate-800">
                  <div className="w-6 h-6 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center font-bold text-xs flex-shrink-0">✓</div>
                  Learn from home or online at your preferred time
                </div>
              </div>
            </div>

            {/* Finder Box */}
            <div id="search-box" className="bg-white border-2 border-slate-300 rounded-3xl p-8 shadow-xl relative">
              <div className="text-center mb-5">
                <h2 className="text-2xl font-extrabold text-[#0f172a] mb-1">Find Your Perfect Tutor</h2>
                <p className="text-base text-slate-600">Tell us what you need in 3 simple clicks:</p>
              </div>

              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-800">📚 1. What subject is tricky?</label>
                  <select className="h-13 px-4 border-2 border-slate-300 rounded-xl bg-slate-50 text-slate-900 font-medium focus:outline-none focus:border-blue-600">
                    <option>Any Subject (Show all tutors)</option>
                    <option>Mathematics & Physics</option>
                    <option>Computer Science & Programming</option>
                    <option>English Conversation</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-800">🎒 2. What is the student's grade?</label>
                  <select className="h-13 px-4 border-2 border-slate-300 rounded-xl bg-slate-50 text-slate-900 font-medium focus:outline-none focus:border-blue-600">
                    <option>Any Grade Level</option>
                    <option>Elementary School (SD)</option>
                    <option>Junior High School (SMP)</option>
                    <option>Senior High School (SMA)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-800">🏠 3. Where do you want to learn?</label>
                  <select className="h-13 px-4 border-2 border-slate-300 rounded-xl bg-slate-50 text-slate-900 font-medium focus:outline-none focus:border-blue-600">
                    <option>Online Video Call (Easy 1-click link)</option>
                    <option>In-Person / Offline (At Student's Home)</option>
                  </select>
                </div>

                <button type="button" onClick={() => openBookingModal('Pencarian Mandiri')} className="h-14 bg-gradient-to-b from-[#1f6feb] to-[#174ec2] text-white font-extrabold text-lg rounded-xl shadow-lg hover:bg-[#134db3] transition flex items-center justify-center gap-2 mt-2 cursor-pointer">
                  <span>🔍</span> Find Friendly Tutors
                </button>
              </form>

              <div className="text-center text-sm text-slate-500 mt-4">
                Prefer talking to a human? <a href="tel:08001234567" className="font-bold text-[#1f6feb]">Call us directly</a> and we will pick a tutor for you.
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white border-b border-slate-200">
          <div className="container mx-auto px-5">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block bg-[#eaf2ff] text-[#1f6feb] font-extrabold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">Simple Process</span>
              <h2 className="text-3xl font-extrabold text-[#0f172a] mb-3">How TutorCare Works</h2>
              <p className="text-lg text-slate-600">Getting academic support has never been this stress-free.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition">
                <div className="w-14 h-14 bg-[#eaf2ff] text-[#1f6feb] rounded-full text-2xl font-extrabold flex items-center justify-center mx-auto mb-5 border-2 border-[#bfdbfe]">1</div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Choose Your Subject</h3>
                <p className="text-slate-600">Select the subject, grade level, and whether you prefer online sessions or in-person tutoring.</p>
              </div>

              <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition">
                <div className="w-14 h-14 bg-[#eaf2ff] text-[#1f6feb] rounded-full text-2xl font-extrabold flex items-center justify-center mx-auto mb-5 border-2 border-[#bfdbfe]">2</div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Meet Your Patient Tutor</h3>
                <p className="text-slate-600">Browse verified profiles of experienced educators who specialize in building student confidence.</p>
              </div>

              <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition">
                <div className="w-14 h-14 bg-[#eaf2ff] text-[#1f6feb] rounded-full text-2xl font-extrabold flex items-center justify-center mx-auto mb-5 border-2 border-[#bfdbfe]">3</div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Learn & Grow Stress-Free</h3>
                <p className="text-slate-600">Enjoy tailored 1-on-1 sessions at your own pace without pressure or harsh judgment.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tutors Section */}
        <section id="featured-tutors" className="py-20 bg-[#f8fafc]">
          <div className="container mx-auto px-5">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block bg-[#eaf2ff] text-[#1f6feb] font-extrabold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">Experienced Tutors</span>
              <h2 className="text-3xl font-extrabold text-[#0f172a] mb-3">Meet Our Certified Educators</h2>
              <p className="text-lg text-slate-600">Dedicated professionals ready to help you succeed.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Tutor Card 1 */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                <div>
                  <div className="flex gap-4 mb-4">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" alt="Sarah Amalia" className="w-16 h-16 rounded-full object-cover border-2 border-blue-200" />
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-1.5">
                        Sarah Amalia, S.Pd.
                      </h3>
                      <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">✓ Verified Tutor</span>
                      <p className="text-sm font-semibold text-slate-600 mt-1">4 Tahun Pengalaman</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm mb-3">
                    <span className="text-amber-500 font-bold">★ 4.9</span>
                    <span className="font-bold text-slate-800">(28 Ulasan)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2.5 py-1 rounded-md">Matematika & Fisika</span>
                    <span className="bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-md">Sabar & Visual</span>
                  </div>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border-l-4 border-blue-600 mb-6">
                    "Sangat sabar membimbing siswa yang kesulitan memahami rumus dasar matematika dan fisika."
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-auto">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Tarif / Jam</span>
                    <p className="text-lg font-extrabold text-slate-900">Rp 75.000</p>
                  </div>
                  <button onClick={() => openBookingModal('Sarah Amalia, S.Pd.')} className="bg-[#1f6feb] text-white font-bold px-4 py-2 rounded-full text-sm hover:bg-[#134db3] transition cursor-pointer">
                    Pesan Sesi
                  </button>
                </div>
              </div>

              {/* Tutor Card 2 */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                <div>
                  <div className="flex gap-4 mb-4">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" alt="Budi Santoso" className="w-16 h-16 rounded-full object-cover border-2 border-blue-200" />
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900">Budi Santoso, M.Kom.</h3>
                      <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">✓ Verified Tutor</span>
                      <p className="text-sm font-semibold text-slate-600 mt-1">6 Tahun Pengalaman</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm mb-3">
                    <span className="text-amber-500 font-bold">★ 5.0</span>
                    <span className="font-bold text-slate-800">(42 Ulasan)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2.5 py-1 rounded-md">Pemrograman & Komputer</span>
                    <span className="bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-md">Online / Interaktif</span>
                  </div>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border-l-4 border-blue-600 mb-6">
                    "Mengajar logika pemrograman dasar, Python, dan web development dari nol."
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-auto">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Tarif / Jam</span>
                    <p className="text-lg font-extrabold text-slate-900">Rp 100.000</p>
                  </div>
                  <button onClick={() => openBookingModal('Budi Santoso, M.Kom.')} className="bg-[#1f6feb] text-white font-bold px-4 py-2 rounded-full text-sm hover:bg-[#134db3] transition cursor-pointer">
                    Pesan Sesi
                  </button>
                </div>
              </div>

              {/* Tutor Card 3 */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                <div>
                  <div className="flex gap-4 mb-4">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" alt="Alya Rahma" className="w-16 h-16 rounded-full object-cover border-2 border-blue-200" />
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900">Alya Rahma, B.A.</h3>
                      <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">✓ Verified Tutor</span>
                      <p className="text-sm font-semibold text-slate-600 mt-1">3 Tahun Pengalaman</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm mb-3">
                    <span className="text-amber-500 font-bold">★ 4.8</span>
                    <span className="font-bold text-slate-800">(19 Ulasan)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2.5 py-1 rounded-md">Bahasa Inggris</span>
                    <span className="bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-md">Offline / Home Visit</span>
                  </div>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border-l-4 border-blue-600 mb-6">
                    "Fokus pada conversational English, membantu anak percaya diri berbicara tanpa takut salah."
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-auto">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Tarif / Jam</span>
                    <p className="text-lg font-extrabold text-slate-900">Rp 60.000</p>
                  </div>
                  <button onClick={() => openBookingModal('Alya Rahma, B.A.')} className="bg-[#1f6feb] text-white font-bold px-4 py-2 rounded-full text-sm hover:bg-[#134db3] transition cursor-pointer">
                    Pesan Sesi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-white border-t border-slate-200">
          <div className="container mx-auto px-5 max-w-3xl">
            <div className="text-center mb-12">
              <span className="inline-block bg-[#eaf2ff] text-[#1f6feb] font-extrabold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">Bantuan</span>
              <h2 className="text-3xl font-extrabold text-[#0f172a] mb-3">Common Questions</h2>
              <p className="text-lg text-slate-600">Hal yang sering ditanyakan oleh orang tua dan siswa.</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <button onClick={() => toggleFaqItem(1)} className="w-full text-left p-5 font-bold text-lg text-slate-800 bg-white hover:bg-slate-50 flex justify-between items-center cursor-pointer">
                  <span>Apakah sesi uji coba 30 menit benar-benar gratis?</span>
                  <span className="text-[#1f6feb] text-xl font-bold">{openFaq === 1 ? '−' : '+'}</span>
                </button>
                {openFaq === 1 && (
                  <div className="p-5 border-t border-slate-100 text-slate-600 leading-relaxed bg-slate-50">
                    Ya, benar! Sesi pertama selama 30 menit diberikan secara gratis agar siswa dapat berkenalan dengan tutor dan mencoba metode belajarnya tanpa komitmen biaya apapun.
                  </div>
                )}
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <button onClick={() => toggleFaqItem(2)} className="w-full text-left p-5 font-bold text-lg text-slate-800 bg-white hover:bg-slate-50 flex justify-between items-center cursor-pointer">
                  <span>Bagaimana cara memilih antara belajar online atau offline?</span>
                  <span className="text-[#1f6feb] text-xl font-bold">{openFaq === 2 ? '−' : '+'}</span>
                </button>
                {openFaq === 2 && (
                  <div className="p-5 border-t border-slate-100 text-slate-600 leading-relaxed bg-slate-50">
                    Anda bebas memilih sesuai kenyamanan. Belajar online menggunakan tautan video call yang mudah diakses, sedangkan offline berarti tutor akan datang langsung ke rumah siswa.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-slate-400 py-16 border-t border-slate-800">
        <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <h4 className="text-white text-xl font-extrabold mb-3">TutorCare</h4>
            <p className="text-sm leading-relaxed mb-4">
              Platform pencari guru privat yang ramah dan sabar, didedikasikan untuk membantu siswa memahami pelajaran tanpa tekanan.
            </p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Navigasi</h5>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><a href="#search-box" className="hover:text-white transition">Cari Tutor</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition">Cara Kerja</a></li>
              <li><a href="#featured-tutors" className="hover:text-white transition">Daftar Pengajar</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Bantuan</h5>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><a href="#faq" className="hover:text-white transition">FAQ / Tanya Jawab</a></li>
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

      {/* Booking Modal dengan Validasi Klien */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 w-9 h-9 rounded-full font-bold flex items-center justify-center cursor-pointer transition">✕</button>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Pesan Sesi Belajar</h3>
            <p className="text-sm text-slate-600 mb-6">Pengajar pilihan: <strong className="text-blue-600">{selectedTutor}</strong></p>

            {formError && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl font-medium">{formError}</div>}
            {formSuccess && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl font-medium">Pemesanan berhasil dikirim! Tim kami akan segera menghubungi Anda.</div>}

            <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Nama Lengkap Siswa</label>
                <input 
                  type="text" 
                  value={studentName} 
                  onChange={(e) => setStudentName(e.target.value)} 
                  placeholder="Contoh: Ahmad Zaidan"
                  className="w-full h-12 px-4 border-2 border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Nomor WhatsApp Aktif</label>
                <input 
                  type="text" 
                  value={contact} 
                  onChange={(e) => setContact(e.target.value)} 
                  placeholder="Contoh: 08123456789"
                  className="w-full h-12 px-4 border-2 border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>
              <button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md transition cursor-pointer mt-2">
                Konfirmasi Pesanan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}