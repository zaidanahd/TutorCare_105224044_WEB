import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TutorCare - Platform Penghubung Siswa & Tutor",
  description: "Cari guru privat terbaik sesuai kebutuhan dan mata pelajaran.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Banner Uji State Layout (Persisten / Tidak di-reset saat navigasi) */}
        <div className="bg-slate-900 text-white text-xs px-4 py-2 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <span className="font-bold bg-blue-600 px-2 py-0.5 rounded text-[11px]">
              LAYOUT (State Persisten):
            </span>
            <input
              type="text"
              placeholder="Ketik teks di sini (Layout)..."
              className="px-2 py-1 text-slate-900 bg-white rounded text-xs outline-none focus:ring-2 focus:ring-blue-400 w-64"
            />
          </div>
          <span className="text-slate-300 hidden sm:inline">
            Nilai input ini tetap bertahan saat navigasi antar halaman
          </span>
        </div>
        {children}
      </body>
    </html>
  );
}
