"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { bookingFormSchema } from "@/schema/booking";

export interface BookingActionState {
  success?: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
  kodeBooking?: string;
}

/**
 * Server Action: Create Pemesanan Sesi Belajar (Booking) ke PostgreSQL dengan Zod
 */
export async function createBookingAction(
  _prevState: BookingActionState,
  formData: FormData
): Promise<BookingActionState> {
  const rawData = {
    tutorId: formData.get("tutorId"),
    studentName: formData.get("studentName"),
    contactPhone: formData.get("contactPhone"),
    gradeLevel: formData.get("gradeLevel") || "SMA",
    sessionDate: formData.get("sessionDate"),
    durationHours: formData.get("durationHours") || 2,
    notes: formData.get("notes") || undefined,
  };

  const validation = bookingFormSchema.safeParse(rawData);

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
      message: "Validasi gagal. Pastikan nomor WhatsApp aktif dan format data benar.",
      fieldErrors,
    };
  }

  // Verifikasi apakah tutor terdaftar di database
  const tutor = await prisma.tutor.findUnique({
    where: { id: validation.data.tutorId },
  });

  if (!tutor) {
    return {
      success: false,
      message: "Tutor yang dipilih tidak ditemukan di database.",
    };
  }

  // Generate kode booking unik sintetis
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const kodeBooking = `TC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${randomSuffix}`;

  try {
    await prisma.booking.create({
      data: {
        kodeBooking,
        tutorId: validation.data.tutorId,
        namaSiswa: validation.data.studentName,
        kontakSiswa: validation.data.contactPhone,
        jenjangSiswa: validation.data.gradeLevel,
        tanggalSesi: new Date(validation.data.sessionDate),
        durasiJam: validation.data.durationHours,
        catatan: validation.data.notes || null,
        status: "Menunggu Konfirmasi",
      },
    });
  } catch (error) {
    console.error("Gagal menyimpan booking:", error);
    return {
      success: false,
      message: "Terjadi kesalahan server saat menyimpan reservasi.",
    };
  }

  revalidatePath("/bookings");
  revalidatePath("/tutors");
  revalidatePath("/");

  return {
    success: true,
    message: `Reservasi berhasil dibuat! Kode Booking Anda: ${kodeBooking}`,
    kodeBooking,
  };
}

/**
 * Server Action: Update Status Pemesanan (Konfirmasi, Selesai, Batalkan)
 */
export async function updateBookingStatusAction(bookingId: number, status: string) {
  const statusValid = ["Menunggu Konfirmasi", "Dikonfirmasi", "Selesai", "Dibatalkan"];
  if (!statusValid.includes(status)) {
    throw new Error("Status pemesanan tidak valid.");
  }

  try {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });
  } catch (error) {
    console.error("Gagal mengubah status booking:", error);
    throw new Error("Gagal memperbarui status pemesanan di database.");
  }

  revalidatePath("/bookings");
}

/**
 * Server Action: Delete Pemesanan dari Database
 */
export async function deleteBookingAction(bookingId: number) {
  try {
    await prisma.booking.delete({
      where: { id: bookingId },
    });
  } catch (error) {
    console.error("Gagal menghapus booking:", error);
    throw new Error("Gagal menghapus reservasi pemesanan.");
  }

  revalidatePath("/bookings");
}
