import type { Metadata } from "next";
import { redirect } from "next/navigation";
import FormItem from "@/components/FormItem";
import { bacaSesi } from "@/lib/sesi";
import { keluar } from "@/app/masuk/actions";

export const metadata: Metadata = { title: "Tambah Item | TutorCare" };
export const instant = false;

export default async function HalamanTambahItem() {
  const sesi = await bacaSesi();
  if (!sesi) redirect("/masuk");

  return (
    <main id="konten" className="mx-auto max-w-2xl p-6 mt-8 bg-white rounded-2xl shadow-sm border border-slate-200">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Tambah Item</h1>
      <div className="flex items-center justify-between mt-2 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-200">
        <p className="text-sm text-slate-700">
          Masuk sebagai: <strong className="text-blue-600">{sesi.email}</strong>
        </p>
        <form action={keluar}>
          <button type="submit" className="text-sm font-semibold text-red-600 hover:underline cursor-pointer">
            Keluar
          </button>
        </form>
      </div>
      <FormItem />
    </main>
  );
}
