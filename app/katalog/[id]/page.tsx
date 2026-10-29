import Link from "next/link";
import { notFound } from "next/navigation";
import { cariItem, daftarItem } from "@/lib/data";

export function generateStaticParams() {
  return daftarItem.map((item) => ({ id: String(item.id) }));
}

export default async function HalamanDetailItem({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!/^[1-9]\d*$/.test(id)) {
    notFound();
  }

  const item = cariItem(Number(id));
  if (!item) {
    notFound();
  }

  return (
    <main id="konten" className="mx-auto max-w-2xl p-6 mt-8 bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
          {item.kategori}
        </span>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            item.tersedia
              ? "bg-green-100 text-green-800"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {item.tersedia ? "Tersedia" : "Tidak Tersedia"}
        </span>
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-3">{item.judul}</h1>
      <p className="text-slate-700 leading-relaxed mb-6">{item.deskripsi}</p>

      <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
        <Link href="/katalog" className="text-sm font-semibold text-blue-600 hover:underline">
          &larr; Kembali ke Katalog
        </Link>
        <Link
          href="/katalog/tambah"
          className="text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          + Tambah Item Baru
        </Link>
      </div>
    </main>
  );
}
