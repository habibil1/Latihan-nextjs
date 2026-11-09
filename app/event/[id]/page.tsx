import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { events, rupiah } from "@/Data/events";
import FormPesan from "@/components/FormPesan";
import TombolFavorit from "@/components/TombolFavorit";

export default async function Detail({ params }: PageProps<"/event/[id]">) {
  const { id } = await params;
  const event = events.find((e) => e.id === Number(id));
  if (!event) notFound();

  const sisa = event.kuota - event.terisi;
  const namaAwal = (await cookies()).get("nama")?.value ?? "";

  return (
    <article className="rounded-xl border bg-white p-6">
      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
        {event.kategori}
      </span>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">{event.judul}</h1>
      <p className="mt-1 text-slate-600">
        {event.tanggal} &middot; {event.lokasi}
      </p>
      <p className="mt-4 text-xl font-semibold text-slate-800">
        {rupiah(event.harga)}
      </p>
      <p className="text-slate-700">
        Sisa {sisa} dari {event.kuota} tiket
      </p>
      <TombolFavorit id={event.id} />
      <FormPesan event={event} namaAwal={namaAwal} />
    </article>
  );
}
