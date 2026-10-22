import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_TUTORS } from "@/app/data/mockTutors";

export function generateStaticParams() {
  return MOCK_TUTORS.map((tutor) => ({ id: String(tutor.id) }));
}

export default async function HalamanDetailTutor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Validasi format ID: harus berupa angka positif tanpa nol di depan
  if (!/^[1-9]\d*$/.test(id)) {
    notFound();
  }

  const tutor = MOCK_TUTORS.find((t) => String(t.id) === id);

  if (!tutor) {
    notFound();
  }

  return (
    <main id="konten" className="mx-auto max-w-3xl p-6">
      <p className="text-sm font-medium text-blue-600">{tutor.subject}</p>
      <h1 className="mt-2 text-3xl font-bold">{tutor.name}</h1>
      <p className="mt-4 text-gray-700">{tutor.bio}</p>
      <p className="mt-4 font-semibold">Tarif: Rp {tutor.pricePerHour.toLocaleString('id-ID')} / jam</p>

      <div className="mt-6">
        <Link href="/tutors" className="inline-block underline text-blue-500 hover:text-blue-700">
          ← Kembali ke Daftar Tutor
        </Link>
      </div>
    </main>
  );
}