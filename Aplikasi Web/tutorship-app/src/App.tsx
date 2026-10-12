import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import HomePage from './pages/HomePage';
import TutorsDirectoryPage from './pages/TutorsDirectoryPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'tutors' | 'about'>('home');
  const [isLargeText, setIsLargeText] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // State Booking Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState('');

  const toggleFontSize = () => {
    setIsLargeText(!isLargeText);
    document.body.classList.toggle('large-text', !isLargeText);
  };

  const openBookingModal = (tutorName: string) => {
    setSelectedTutor(tutorName);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#1f2937]">
      {/* Top Bar Aksesibilitas */}
      <div className="bg-[#0f172a] text-[#f1f5f9] text-sm py-2.5">
        <div className="container mx-auto px-5 flex justify-between items-center">
          <span>Struggling with homework or tests? Call 0800-123-4567</span>
          <button onClick={toggleFontSize} className="bg-white/15 px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-white/25">
            🔍 Bigger Text
          </button>
        </div>
      </div>

      {/* Navigasi */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Konten Halaman (Dynamic Routing State) */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage 
            setCurrentPage={setCurrentPage} 
            openBooking={openBookingModal} 
            openFaq={openFaq} 
            toggleFaq={(idx) => setOpenFaq(openFaq === idx ? null : idx)} 
          />
        )}
        {currentPage === 'tutors' && <TutorsDirectoryPage openBooking={openBookingModal} />}
        {currentPage === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal Pemesanan */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        tutorName={selectedTutor} 
      />
    </div>
  );
}