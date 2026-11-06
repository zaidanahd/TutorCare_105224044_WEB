"use client";

import { useActionState } from "react";
import { tambahUlasan } from "@/app/katalog/ulasan-actions";
import type { StatusForm } from "@/lib/status-form";

const awal: StatusForm = {};
const kolom =
  "mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600";

export default function FormUlasan({ itemId }: { itemId: number }) {
  const [status, aksi, pending] = useActionState(
    tambahUlasan.bind(null, itemId),
    awal
  );
  const g = status.galat;

  return (
    <form
      action={aksi}
      className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
    >
      <h3 className="text-lg font-bold text-slate-800">Beri Ulasan</h3>
      {status.pesan && (
        <p className="text-sm font-semibold text-blue-700 bg-blue-100 p-2.5 rounded-lg">
          {status.pesan}
        </p>
      )}

      <div>
        <label htmlFor="nama" className="font-semibold text-slate-700 text-sm">
          Nama Pengulas
        </label>
        <input
          id="nama"
          name="nama"
          required
          minLength={2}
          maxLength={60}
          placeholder="Contoh: Ahmad Zaidan"
          className={kolom}
          aria-invalid={!!g?.nama}
          aria-describedby="galat-nama"
        />
        <p id="galat-nama" className="text-sm font-medium text-red-600 mt-1">
          {g?.nama?.[0]}
        </p>
      </div>

      <div>
        <label htmlFor="nilai" className="font-semibold text-slate-700 text-sm">
          Nilai Rating (1-5)
        </label>
        <input
          id="nilai"
          name="nilai"
          type="number"
          min={1}
          max={5}
          defaultValue={5}
          required
          className={kolom}
          aria-invalid={!!g?.nilai}
          aria-describedby="galat-nilai"
        />
        <p id="galat-nilai" className="text-sm font-medium text-red-600 mt-1">
          {g?.nilai?.[0]}
        </p>
      </div>

      <div>
        <label
          htmlFor="komentar"
          className="font-semibold text-slate-700 text-sm"
        >
          Komentar Ulasan
        </label>
        <textarea
          id="komentar"
          name="komentar"
          rows={3}
          required
          minLength={5}
          maxLength={500}
          placeholder="Tuliskan pengalaman atau evaluasi Anda terhadap materi ini..."
          className={kolom}
          aria-invalid={!!g?.komentar}
          aria-describedby="galat-komentar"
        />
        <p id="galat-komentar" className="text-sm font-medium text-red-600 mt-1">
          {g?.komentar?.[0]}
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white shadow hover:bg-blue-700 disabled:opacity-50 transition cursor-pointer"
      >
        {pending ? "Menyimpan Ulasan..." : "Kirim Ulasan"}
      </button>
    </form>
  );
}
