import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import EditTutorClientForm from './EditTutorClientForm';

export default async function EditTutorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tutorId = parseInt(id, 10);

  if (isNaN(tutorId) || tutorId <= 0) {
    notFound();
  }

  const tutor = await prisma.tutor.findUnique({
    where: { id: tutorId },
  });

  if (!tutor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="container mx-auto px-4 py-10 max-w-2xl">
          <Link
            href={`/tutors/${tutor.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition mb-6"
          >
            ← Kembali ke Profil Tutor
          </Link>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
            <div className="mb-8">
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Operasi Update (Tutor #{tutor.id})
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
                Edit Profil Tutor
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Perbarui data pengajar. Perubahan akan disimpan secara persisten ke database PostgreSQL.
              </p>
            </div>

            <EditTutorClientForm tutor={tutor} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
