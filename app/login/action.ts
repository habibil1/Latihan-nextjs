"use server";
import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NAMA_COOKIE, UMUR_SESI, buatToken } from "@/lib/sesi";

export type HasilMasuk = { pesan: string };

const COOKIE_GAGAL = "gagal_login";
const MAKS_GAGAL = 5;
const WAKTU_BLOKIR = 60; // 1 menit dalam detik

function sandiCocok(input: string, asli: string): boolean {
  const bufInput = Buffer.from(input);
  const bufAsli = Buffer.from(asli);
  if (bufInput.length !== bufAsli.length) return false;
  return timingSafeEqual(bufInput, bufAsli);
}

export async function masuk(
  _sebelum: HasilMasuk,
  formData: FormData,
): Promise<HasilMasuk> {
  const sandi = String(formData.get("sandi") ?? "");
  const dari = String(formData.get("dari") ?? "");
  const toples = await cookies();

  // 1. Cek apakah sudah mencapai batas 5 kali salah dalam 1 menit
  const jumlahGagal = Number(toples.get(COOKIE_GAGAL)?.value ?? "0");
  if (jumlahGagal >= MAKS_GAGAL) {
    return {
      pesan: "Terlalu banyak percobaan . Tunggu 1 menit lagi.",
    };
  }

  // 2. Periksa kata sandi menggunakan timingSafeEqual
  const sandiAsli = process.env.ADMIN_PASSWORD ?? "";
  if (!sandiAsli || !sandiCocok(sandi, sandiAsli)) {
    const gagalBaru = jumlahGagal + 1;
    toples.set(COOKIE_GAGAL, String(gagalBaru), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: WAKTU_BLOKIR,
    });

    if (gagalBaru >= MAKS_GAGAL) {
      return {
        pesan: "Terlalu banyak percobaan salah. Tunggu 1 menit lagi.",
      };
    }

    return {
      pesan: `Kata sandi salah. Sisa percobaan: ${MAKS_GAGAL - gagalBaru} kali.`,
    };
  }

  // 3. Jika berhasil: hapus catatan gagal & buat cookie sesi admin
  toples.delete(COOKIE_GAGAL);
  toples.set(NAMA_COOKIE, await buatToken(), {
    httpOnly: true, // tidak terbaca oleh JavaScript di browser
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: UMUR_SESI,
  });

  // hanya boleh kembali ke halaman admin (mencegah dilempar ke situs lain)
  redirect(dari.startsWith("/admin") ? dari : "/admin");
}

export async function keluar() {
  (await cookies()).delete(NAMA_COOKIE);
  redirect("/login");
}
