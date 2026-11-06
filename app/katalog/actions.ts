"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { skemaItem } from "@/lib/skema";
import type { StatusForm } from "@/lib/status-form";

function bacaForm(formData: FormData) {
  return skemaItem.safeParse({
    ...Object.fromEntries(formData),
    tersedia: formData.get("tersedia") === "on",
  });
}

export async function tambahItem(
  _prev: StatusForm,
  formData: FormData
): Promise<StatusForm> {
  const hasil = bacaForm(formData);
  const mentah = Object.fromEntries(formData);
  const nilai = {
    judul: String(mentah.judul ?? ""),
    kategori: String(mentah.kategori ?? ""),
    deskripsi: String(mentah.deskripsi ?? ""),
  };

  if (!hasil.success) {
    return {
      galat: z.flattenError(hasil.error).fieldErrors,
      nilai,
    };
  }

  let itemBaruId: number | undefined;
  try {
    const item = await prisma.item.create({ data: hasil.data });
    itemBaruId = item.id;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return { galat: { judul: ["Judul item sudah terdaftar"] }, nilai };
    }
    throw e;
  }

  revalidatePath("/katalog");
  if (itemBaruId) {
    redirect(`/katalog/${itemBaruId}`);
  }
  return { pesan: "Item tersimpan." };
}

// Alias untuk kompatibilitas FormItem yang memanggil simpanItem
export const simpanItem = tambahItem;

export async function ubahItem(
  id: number,
  _prev: StatusForm,
  formData: FormData
): Promise<StatusForm> {
  const hasil = bacaForm(formData);
  if (!hasil.success) {
    return { galat: z.flattenError(hasil.error).fieldErrors };
  }

  try {
    await prisma.item.update({ where: { id }, data: hasil.data });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return { galat: { judul: ["Judul item sudah terdaftar"] } };
      }
      if (e.code === "P2025") {
        return { pesan: "Item tidak ditemukan atau sudah dihapus." };
      }
    }
    throw e;
  }

  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  return { pesan: "Perubahan disimpan." };
}

export async function hapusItem(id: number) {
  await prisma.$transaction([
    prisma.ulasan.deleteMany({ where: { itemId: id } }),
    prisma.item.delete({ where: { id } }),
  ]);
  revalidatePath("/katalog");
  redirect("/katalog");
}
