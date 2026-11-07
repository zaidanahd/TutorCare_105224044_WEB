import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientCatalogSection from '@/components/ClientCatalogSection';
import { prisma } from '@/lib/prisma';
import { MOCK_TUTORS } from './data/mockTutors';

export default async function Page() {
  let tutors = [];

  try {
    const dbTutors = await prisma.tutor.findMany({
      where: { tersedia: true },
      orderBy: { id: 'asc' },
    });

    if (dbTutors.length > 0) {
      tutors = dbTutors.map((t) => ({
        id: t.id,
        nama: t.nama,
        mataPelajaran: t.mataPelajaran,
        jenjang: t.jenjang,
        moda: t.moda,
        tarifPerJam: t.tarifPerJam,
        rating: t.rating,
        pengalamanTahun: t.pengalamanTahun,
        avatarUrl: t.avatarUrl,
        bio: t.bio,
      }));
    } else {
      // Fallback data sintetis jika tabel masih kosong
      tutors = MOCK_TUTORS.map((m) => ({
        id: Number(m.id),
        nama: m.name,
        mataPelajaran: m.subject,
        jenjang: m.gradeLevel,
        moda: m.mode,
        tarifPerJam: m.pricePerHour,
        rating: m.rating,
        pengalamanTahun: m.experienceYears,
        avatarUrl: m.avatarUrl,
        bio: m.bio,
      }));
    }
  } catch (error) {
    console.error('Gagal mengambil data tutor dari database:', error);
    tutors = MOCK_TUTORS.map((m) => ({
      id: Number(m.id),
      nama: m.name,
      mataPelajaran: m.subject,
      jenjang: m.gradeLevel,
      moda: m.mode,
      tarifPerJam: m.pricePerHour,
      rating: m.rating,
      pengalamanTahun: m.experienceYears,
      avatarUrl: m.avatarUrl,
      bio: m.bio,
    }));
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero & Search Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-12 border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <span className="inline-block bg-amber-100 text-amber-800 font-bold px-4 py-1.5 rounded-full text-sm mb-4 border border-amber-200">
                ⭐ Solusi Belajar Nyaman & Tanpa Stres (Milestone 2)
              </span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
                Cari Tutor Privat Terbaik yang{' '}
                <span className="text-blue-600 underline decoration-blue-300 underline-offset-8">
                  Sabar & Berpengalaman
                </span>
              </h1>
              <p className="text-lg text-slate-600">
                Bantu anak atau diri Anda memahami pelajaran sekolah dengan mudah. Data terintegrasi secara persisten dengan database PostgreSQL.
              </p>
            </div>

            {/* Client Interactive Section */}
            <ClientCatalogSection initialTutors={tutors} />
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
