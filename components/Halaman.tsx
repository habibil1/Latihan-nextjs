import Link from "next/link";
import { alamatHalaman, type Saringan } from "@/Data/saring";

export default function Halaman({
  s,
  hal,
  jumlah,
}: {
  s: Saringan;
  hal: number;
  jumlah: number;
}) {
  // Poin 4: Tidak menampilkan apa pun bila hanya ada satu halaman
  if (jumlah <= 1) return null;

  const daftarNomor = Array.from({ length: jumlah }, (_, i) => i + 1);

  return (
    <nav className="mt-6 flex flex-wrap items-center justify-center gap-2">
      {/* Poin 1: Tautan « Sebelumnya (tidak tampil di halaman 1) */}
      {hal > 1 && (
        <Link
          href={alamatHalaman(s, hal - 1)}
          className="rounded border bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          « Sebelumnya
        </Link>
      )}

      {/* Poin 2: Tautan nomor 1 sampai jumlah */}
      {daftarNomor.map((nomor) => (
        <Link
          key={nomor}
          href={alamatHalaman(s, nomor)}
          className={`rounded border px-3 py-1.5 text-sm ${
            nomor === hal
              ? "border-blue-600 bg-blue-600 font-bold text-white"
              : "bg-white hover:bg-slate-50"
          }`}
        >
          {nomor}
        </Link>
      ))}

      {/* Poin 3: Tautan Berikutnya » (tidak tampil di halaman terakhir) */}
      {hal < jumlah && (
        <Link
          href={alamatHalaman(s, hal + 1)}
          className="rounded border bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          Berikutnya »
        </Link>
      )}
    </nav>
  );
}
