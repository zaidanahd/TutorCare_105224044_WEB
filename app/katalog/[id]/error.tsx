"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GalatItem({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="mx-auto max-w-xl p-6 bg-red-50 border border-red-200 rounded-xl my-8">
      <h2 className="text-xl font-bold text-red-700">Item gagal diproses</h2>
      <p className="mt-2 text-sm text-slate-600">
        Terjadi kesalahan saat memuat atau memproses item pembelajaran.
      </p>
      <p className="mt-1 text-xs font-mono text-slate-500">
        Kode rujukan: {error.digest ?? "tidak ada"}
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition cursor-pointer"
        >
          Coba lagi
        </button>
        <Link
          href="/katalog"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          Kembali ke Katalog
        </Link>
      </div>
    </div>
  );
}
