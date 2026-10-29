import type { Metadata } from "next";
import FormMasuk from "@/components/FormMasuk";

export const metadata: Metadata = { title: "Masuk | TutorCare" };

export default function HalamanMasuk() {
  return (
    <main id="konten" className="mx-auto max-w-md p-6 mt-10 bg-white rounded-2xl shadow-sm border border-slate-200">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Masuk</h1>
      <p className="text-sm text-slate-600 mb-6">
        Masuk menggunakan akun demo untuk mengelola katalog item TutorCare.
      </p>
      <FormMasuk />
    </main>
  );
}
