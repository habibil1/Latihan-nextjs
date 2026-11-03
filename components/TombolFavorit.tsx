"use client";
import { useEffect, useState } from "react";

export default function TombolFavorit({ id }: { id: number }) {
  const [favorit, setFavorit] = useState(false);

  useEffect(() => {
    const simpan: number[] = JSON.parse(
      localStorage.getItem("favorit") ?? "[]",
    );
    setFavorit(simpan.includes(id));
  }, [id]);

  function ubah() {
    const simpan: number[] = JSON.parse(
      localStorage.getItem("favorit") ?? "[]",
    );
    const baru = simpan.includes(id)
      ? simpan.filter((x) => x !== id)
      : [...simpan, id];
    localStorage.setItem("favorit", JSON.stringify(baru));
    setFavorit(!favorit);
  }

  return (
    <button
      onClick={ubah}
      className={`mt-3 rounded border px-3 py-1.5 text-sm font-medium transition-colors ${
        favorit
          ? "border-red-400 bg-red-50 text-red-600 hover:bg-red-100"
          : "border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-600"
      }`}
    >
      {favorit ? "♥ Favorit" : "♡ Tambah Favorit"}
    </button>
  );
}
