"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { tutorFormSchema } from "@/schema/tutor";

export interface FormActionState {
  success?: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
  data?: unknown;
}

/**
 * Server Action: Create Tutor baru ke basis data PostgreSQL dengan validasi Zod
 */
export async function createTutorAction(
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  const rawData = {
    nama: formData.get("nama"),
    mataPelajaran: formData.get("mataPelajaran"),
    jenjang: formData.get("jenjang"),
    moda: formData.get("moda"),
    tarifPerJam: formData.get("tarifPerJam"),
    pengalamanTahun: formData.get("pengalamanTahun"),
    kontakWa: formData.get("kontakWa"),
    bio: formData.get("bio"),
    avatarUrl: formData.get("avatarUrl") || undefined,
  };

  const validation = tutorFormSchema.safeParse(rawData);

  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of validation.error.issues) {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      success: false,
      message: "Validasi gagal. Periksa kembali isian formulir.",
      fieldErrors,
    };
  }

  let newTutorId: number | null = null;

  try {
    const created = await prisma.tutor.create({
      data: {
        nama: validation.data.nama,
        mataPelajaran: validation.data.mataPelajaran,
        jenjang: validation.data.jenjang,
        moda: validation.data.moda,
        tarifPerJam: validation.data.tarifPerJam,
        pengalamanTahun: validation.data.pengalamanTahun,
        kontakWa: validation.data.kontakWa,
        bio: validation.data.bio,
        avatarUrl:
          validation.data.avatarUrl ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        rating: 5.0,
        tersedia: true,
      },
    });
    newTutorId = created.id;
  } catch (error) {
    console.error("Gagal menambahkan tutor:", error);
    return {
      success: false,
      message: "Gagal menyimpan data tutor ke database PostgreSQL.",
    };
  }

  revalidatePath("/tutors");
  revalidatePath("/");
  redirect(`/tutors/${newTutorId}`);
}

/**
 * Server Action: Update profil Tutor
 */
export async function updateTutorAction(
  tutorId: number,
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  const rawData = {
    nama: formData.get("nama"),
    mataPelajaran: formData.get("mataPelajaran"),
    jenjang: formData.get("jenjang"),
    moda: formData.get("moda"),
    tarifPerJam: formData.get("tarifPerJam"),
    pengalamanTahun: formData.get("pengalamanTahun"),
    kontakWa: formData.get("kontakWa"),
    bio: formData.get("bio"),
    avatarUrl: formData.get("avatarUrl") || undefined,
  };

  const validation = tutorFormSchema.safeParse(rawData);

  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of validation.error.issues) {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      success: false,
      message: "Validasi gagal. Periksa kembali isian formulir.",
      fieldErrors,
    };
  }

  try {
    await prisma.tutor.update({
      where: { id: tutorId },
      data: {
        nama: validation.data.nama,
        mataPelajaran: validation.data.mataPelajaran,
        jenjang: validation.data.jenjang,
        moda: validation.data.moda,
        tarifPerJam: validation.data.tarifPerJam,
        pengalamanTahun: validation.data.pengalamanTahun,
        kontakWa: validation.data.kontakWa,
        bio: validation.data.bio,
        ...(validation.data.avatarUrl && { avatarUrl: validation.data.avatarUrl }),
      },
    });
  } catch (error) {
    console.error("Gagal memperbarui tutor:", error);
    return {
      success: false,
      message: "Gagal memperbarui data tutor di database.",
    };
  }

  revalidatePath("/tutors");
  revalidatePath(`/tutors/${tutorId}`);
  revalidatePath("/");
  redirect(`/tutors/${tutorId}`);
}

/**
 * Server Action: Delete Tutor beserta relasi cascade booking
 */
export async function deleteTutorAction(tutorId: number) {
  try {
    await prisma.tutor.delete({
      where: { id: tutorId },
    });
  } catch (error) {
    console.error("Gagal menghapus tutor:", error);
    throw new Error("Gagal menghapus data tutor dari database.");
  }

  revalidatePath("/tutors");
  revalidatePath("/bookings");
  revalidatePath("/");
  redirect("/tutors");
}
