"use client";
import { useState, useEffect } from "react";
import { rupiah, type Event } from "@/Data/events";
import KartuEvent from "./KartuEvent";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");
  const [batas, setBatas] = useState(4);

  // 1. State untuk penyaring lanjutan baru
  const [adaTiket, setAdaTiket] = useState(false);
  const [hargaMax, setHargaMax] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrut(localStorage.getItem("urut") ?? "tanggal");
  }, []);

  useEffect(() => {
    localStorage.setItem("urut", urut);
  }, [urut]);

  // 2. Reset tampilan ke 4 kartu jika ada perubahan pada penyaring APAPUN
  useEffect(() => {
    setBatas(4);
  }, [cari, kategori, urut, adaTiket, hargaMax]);

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];

  // 3. Logika filter diperluas
  const hasil = events.filter((e) => {
    const sisa = e.kuota - e.terisi;
    const cocokCari = e.judul.toLowerCase().includes(cari.toLowerCase());
    const cocokKategori = kategori === "Semua" || e.kategori === kategori;

    // Logika penyaring lanjutan
    const cocokTiket = adaTiket ? sisa > 0 : true;
    const cocokHarga = hargaMax !== "" ? e.harga <= Number(hargaMax) : true;

    return cocokCari && cocokKategori && cocokTiket && cocokHarga;
  });

  const tersusun = [...hasil].sort((a, b) => {
    if (urut === "murah") return a.harga - b.harga;
    if (urut === "mahal") return b.harga - a.harga;
    if (urut === "nama") return a.judul.localeCompare(b.judul);
    return a.tanggal.localeCompare(b.tanggal);
  });

  const totalHarga = tersusun.reduce((total, e) => total + e.harga, 0);
  const rataRataHarga = tersusun.length > 0 ? totalHarga / tersusun.length : 0;
  const totalSisa = tersusun.reduce(
    (total, e) => total + (e.kuota - e.terisi),
    0,
  );

  const tampil = tersusun.slice(0, batas);
  const sisaLagi = tersusun.length - batas;

  return (
    <div>
      {/* 4. Menambahkan input UI untuk Harga Maksimal & Checkbox */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari event..."
          className="rounded border bg-white px-3 py-2"
        />
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="rounded border bg-white px-3 py-2"
        >
          {daftarKategori.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
        <select
          value={urut}
          onChange={(e) => setUrut(e.target.value)}
          className="rounded border bg-white px-3 py-2"
        >
          <option value="tanggal">Tanggal terdekat</option>
          <option value="murah">Harga termurah</option>
          <option value="mahal">Harga termahal</option>
          <option value="nama">Nama A-Z</option>
        </select>

        {/* Input Harga Maksimal */}
        <input
          type="number"
          value={hargaMax}
          onChange={(e) => setHargaMax(e.target.value)}
          placeholder="Harga maksimal"
          className="w-36 rounded border bg-white px-3 py-2"
        />

        {/* Checkbox Tiket Tersedia */}
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={adaTiket}
            onChange={(e) => setAdaTiket(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          Hanya yang masih ada tiket
        </label>
      </div>

      <p className="mb-1 text-sm text-slate-500">
        {tersusun.length} event ditemukan
      </p>

      <p className="mb-4 text-sm font-medium text-slate-700">
        Rata-rata harga {rupiah(rataRataHarga)} &middot; Total sisa tiket{" "}
        {totalSisa}
      </p>

      {tersusun.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok.</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tampil.map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>

          {batas < tersusun.length && (
            <button
              onClick={() => setBatas(batas + 4)}
              className="mt-6 w-full rounded-lg border-2 border-slate-200 py-3 font-medium text-slate-700 hover:bg-slate-50"
            >
              Tampilkan lagi ({sisaLagi} lagi)
            </button>
          )}
        </>
      )}
    </div>
  );
}
