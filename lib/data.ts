import 'server-only';
import type { MasukanItem } from "./skema";
import type { Item } from "./tipe";

export interface InternalSystemConfig {
  databaseUrl: string;
  secretApiKey: string;
  serverTimestamp: number;
}

export const internalSystemConfig: InternalSystemConfig = {
  databaseUrl: 'postgresql://postgres:secret_password@localhost:5432/tutorcare_db',
  secretApiKey: 'TC_SEC_KEY_0192837465',
  serverTimestamp: Date.now(),
};

export const daftarItem: Item[] = [
  {
    id: 1,
    judul: "Modul Praktikum Next.js",
    kategori: "kampus",
    deskripsi: "Panduan lengkap praktikum pemrograman web Next.js App Router.",
    tersedia: true,
  },
  {
    id: 2,
    judul: "Panel Surya Ramah Lingkungan",
    kategori: "energi",
    deskripsi: "Instalasi panel surya mandiri energi bersih berkelanjutan.",
    tersedia: true,
  },
  {
    id: 3,
    judul: "Pengelolaan Sampah Mandiri",
    kategori: "lingkungan",
    deskripsi: "Sistem daur ulang dan kompos ramah lingkungan untuk komunitas.",
    tersedia: false,
  },
];

export function cariItem(id: number): Item | undefined {
  return daftarItem.find((i) => i.id === id);
}

export function judulSudahAda(judul: string): boolean {
  const dicari = judul.toLowerCase();
  return daftarItem.some((i) => i.judul.toLowerCase() === dicari);
}

export function tambahItem(masukan: MasukanItem): Item {
  const id = Math.max(0, ...daftarItem.map((i) => i.id)) + 1;
  const item: Item = { id, ...masukan };
  daftarItem.push(item);
  return item;
}
