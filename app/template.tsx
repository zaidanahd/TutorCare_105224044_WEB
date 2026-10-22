export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Banner Uji State Template (Akan di-reset setiap navigasi rute) */}
      <div className="bg-amber-100 border-b border-amber-300 text-amber-900 text-xs px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold bg-amber-400 text-amber-950 px-2 py-0.5 rounded text-[11px]">
            TEMPLATE (State Reset):
          </span>
          <input
            type="text"
            placeholder="Ketik teks di sini (Template)..."
            className="px-2 py-1 text-slate-900 bg-white border border-amber-400 rounded text-xs outline-none focus:ring-2 focus:ring-amber-500 w-64"
          />
        </div>
        <span className="text-amber-800 hidden sm:inline">
          Nilai input ini akan otomatis kosong/di-reset saat berpindah rute
        </span>
      </div>
      <div className="animate-fade-in">{children}</div>
    </div>
  );
}