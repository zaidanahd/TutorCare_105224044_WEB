import type { ReactNode } from "react";

export default function Bagian({
  id,
  judul,
  children,
}: {
  id?: string;
  judul: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-8">
      <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
        <h2 className="text-xl font-bold text-slate-800">{judul}</h2>
      </div>
      {children}
    </section>
  );
}
