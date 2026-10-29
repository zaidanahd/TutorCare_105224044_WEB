import Link from "next/link";
import { daftarItem } from "@/lib/data";

export const metadata = { title: "Katalog Item | TutorCare" };

export default function HalamanKatalog() {
  return (
    <main id="konten" className="mx-auto max-w-4xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Katalog Item</h1>
          <p className="text-slate-600 mt-1">Daftar item bimbingan dan layanan TutorCare.</p>
        </div>
        <Link
          href="/katalog/tambah"
          className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white shadow hover:bg-blue-700 transition cursor-pointer"
        >
          + Tambah Item
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {daftarItem.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
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
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                <Link href={`/katalog/${item.id}`} className="hover:text-blue-600 transition">
                  {item.judul}
                </Link>
              </h2>
              <p className="text-slate-600 text-sm mb-4 line-clamp-3">{item.deskripsi}</p>
            </div>
            <Link
              href={`/katalog/${item.id}`}
              className="text-sm font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            >
              Lihat Detail &rarr;
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
