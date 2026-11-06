import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import Bagian from "@/components/Bagian";
import DaftarItem from "@/components/DaftarItem";
import { ambilDaftarItem } from "@/lib/data";

export const metadata: Metadata = { title: "Katalog | TutorCare" };

export default async function HalamanKatalog() {
  await connection();
  const items = await ambilDaftarItem();
  return (
    <main id="konten" className="mx-auto max-w-6xl p-4">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold text-slate-900">Katalog</h1>
        <Link
          href="/katalog/tambah"
          className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white shadow hover:bg-blue-700 transition cursor-pointer"
        >
          + Tambah Item
        </Link>
      </div>
      <Bagian id="daftar" judul="Daftar Item">
        <DaftarItem items={items} />
      </Bagian>
    </main>
  );
}
