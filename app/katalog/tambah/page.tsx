import type { Metadata } from "next";
import { redirect } from "next/navigation";
import FormItem from "@/components/FormItem";
import { bacaSesi } from "@/lib/sesi";
import { keluar } from "@/app/masuk/actions";

export const metadata: Metadata = { title: "Tambah Item | TutorCare" };

export default async function HalamanTambahItem() {
  const sesi = await bacaSesi();
  if (!sesi) redirect("/masuk");

  return (
    <main id="konten" className="mx-auto max-w-2xl p-6 mt-8 bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tambah Item Baru</h1>
        <form action={keluar}>
          <button
            type="submit"
            className="px-3 py-1.5 text-sm bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition"
          >
            Keluar
          </button>
        </form>
      </div>
      <FormItem />
    </main>
  );
}
