import Link from "next/link";
import type { Item } from "@/lib/tipe";

export default function DaftarItem({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        Belum ada item yang terdaftar di katalog.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
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
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              <Link href={`/katalog/${item.id}`} className="hover:text-blue-600 transition">
                {item.judul}
              </Link>
            </h3>
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
  );
}
