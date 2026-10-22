import Link from 'next/link';

export default async function LoadingDemoPage() {
  // Simulasi penundaan pemuatan 4 detik agar loading.tsx terlihat jelas untuk tangkapan layar
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return (
    <div className="container mx-auto px-5 py-16 text-center max-w-xl">
      <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200">
        <div className="text-4xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Simulasi Loading Selesai!</h1>
        <p className="text-slate-600 mb-6">
          Komponen <code className="bg-slate-100 px-2 py-1 rounded text-blue-600 font-mono">loading.tsx</code> berhasil ditampilkan selama proses penundaan pemuatan (streaming Suspense).
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/tutors/loading-demo"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Uji Loading Lagi (Delay 4s)
          </Link>
          <Link
            href="/tutors"
            className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition"
          >
            Kembali ke /tutors
          </Link>
        </div>
      </div>
    </div>
  );
}
