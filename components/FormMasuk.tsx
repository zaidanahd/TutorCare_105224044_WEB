"use client";

import { useActionState } from "react";
import { masuk } from "@/app/masuk/actions";
import type { StatusForm } from "@/lib/status-form";

const awal: StatusForm = {};
const kolom = "mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600";

export default function FormMasuk() {
  const [status, aksi, pending] = useActionState(masuk, awal);
  const g = status.galat;

  return (
    <form action={aksi} className="mt-6 space-y-4">
      <div>
        <label htmlFor="email" className="block font-semibold text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          className={kolom}
          aria-invalid={!!g?.email}
          aria-describedby="galat-email"
        />
        <p id="galat-email" className="text-sm font-medium text-red-600 mt-1">
          {g?.email?.[0]}
        </p>
      </div>

      <div>
        <label htmlFor="kataSandi" className="block font-semibold text-slate-700">
          Kata sandi
        </label>
        <input
          id="kataSandi"
          name="kataSandi"
          type="password"
          autoComplete="current-password"
          className={kolom}
          aria-invalid={!!g?.kataSandi}
          aria-describedby="galat-sandi"
        />
        <p id="galat-sandi" className="text-sm font-medium text-red-600 mt-1">
          {g?.kataSandi?.[0]}
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-blue-700 px-4 py-2.5 font-bold text-white shadow hover:bg-blue-800 disabled:opacity-60 transition cursor-pointer"
      >
        {pending ? "Memproses..." : "Masuk"}
      </button>

      <p role="status" aria-live="polite" className="text-sm font-semibold text-red-600 text-center mt-2">
        {status.pesan}
      </p>
    </form>
  );
}
