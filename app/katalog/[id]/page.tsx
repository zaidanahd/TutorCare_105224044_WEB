import { notFound } from "next/navigation";
import Link from "next/link";
import { ambilItem } from "@/lib/data";
import { hapusItem } from "@/app/katalog/actions";
import { hapusUlasan } from "@/app/katalog/ulasan-actions";
import FormUlasan from "@/components/FormUlasan";

export default async function DetailItem({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();
  const item = await ambilItem(id);
  if (!item) notFound();

  return (
    <main
      id="konten"
      className="mx-auto max-w-3xl p-6 mt-6 bg-white rounded-2xl shadow-sm border border-slate-200"
    >
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

      <h1 className="text-3xl font-bold text-slate-900 mb-3">{item.judul}</h1>
      <p className="text-slate-700 leading-relaxed mb-6">{item.deskripsi}</p>

      <div className="border-t border-slate-200 pt-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Ulasan ({item.ulasan.length})
        </h2>
        {item.ulasan.length === 0 ? (
          <p className="text-sm text-slate-500 mt-2">
            Belum ada ulasan untuk item ini.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {item.ulasan.map((u) => (
              <li
                key={u.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-slate-800">
                      {u.nama} · ⭐ {u.nilai}/5
                    </p>
                    <p className="text-slate-600 text-sm mt-1">{u.komentar}</p>
                  </div>
                  <form action={hapusUlasan.bind(null, u.id, item.id)}>
                    <button
                      type="submit"
                      className="text-sm text-red-600 hover:text-red-800 hover:underline cursor-pointer"
                    >
                      Hapus ulasan
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 border-t border-slate-200 pt-6">
        <FormUlasan itemId={item.id} />
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
        <Link
          href="/katalog"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          &larr; Kembali ke Katalog
        </Link>
        <form action={hapusItem.bind(null, item.id)}>
          <button
            type="submit"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 shadow transition cursor-pointer"
          >
            Hapus Item
          </button>
        </form>
      </div>
    </main>
  );
}
