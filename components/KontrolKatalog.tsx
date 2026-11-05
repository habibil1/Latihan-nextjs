type KontrolKatalogProps = {
  cari: string;
  setCari: (v: string) => void;
  kategori: string;
  setKategori: (v: string) => void;
  urut: string;
  setUrut: (v: string) => void;
  hargaMax: string;
  setHargaMax: (v: string) => void;
  adaTiket: boolean;
  setAdaTiket: (v: boolean) => void;
  daftarKategori: string[];
};

export default function KontrolKatalog({
  cari,
  setCari,
  kategori,
  setKategori,
  urut,
  setUrut,
  hargaMax,
  setHargaMax,
  adaTiket,
  setAdaTiket,
  daftarKategori,
}: KontrolKatalogProps) {
  return (
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

      <input
        type="number"
        value={hargaMax}
        onChange={(e) => setHargaMax(e.target.value)}
        placeholder="Harga maksimal"
        className="w-36 rounded border bg-white px-3 py-2"
      />

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
  );
}
