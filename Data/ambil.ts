import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Event } from "@/Data/events";
import type { Pesanan } from "@/Data/pesanan";

export async function ambilEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("tanggal");
  if (error) throw new Error("Gagal memuat event: " + error.message);
  return data as Event[];
}

export async function ambilEvent(id: number): Promise<Event | null> {
  // Isi URL bisa apa saja (misalnya /event/abc). Periksa dulu sebelum bertanya ke database.
  if (!Number.isInteger(id)) return null;
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("Gagal memuat event: " + error.message);
  return data as Event | null;
}

export async function ambilTerkait(event: Event): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("kategori", event.kategori)
    .neq("id", event.id)
    .order("tanggal");
  if (error) throw new Error("Gagal memuat event terkait: " + error.message);
  return data as Event[];
}

// Pesanan berisi nama dan email orang, jadi dibaca memakai kunci rahasia (hanya di server).
export async function hitungPesanan(
  eventId: number,
): Promise<{ jumlahPesanan: number; jumlahTiket: number }> {
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("jumlah")
    .eq("event_id", eventId);

  if (error) throw new Error("Gagal menghitung pesanan: " + error.message);

  const jumlahPesanan = data.length;
  const jumlahTiket = data.reduce((total, item) => total + item.jumlah, 0);

  return { jumlahPesanan, jumlahTiket };
}

export async function ambilPesanan(): Promise<Pesanan[]> {
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("*, events(judul)")
    .order("nomor", { ascending: false });
  if (error) throw new Error("Gagal memuat pesanan: " + error.message);
  return data as Pesanan[];
}
