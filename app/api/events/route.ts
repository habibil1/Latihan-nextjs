import { ambilEvents } from "@/Data/ambil";

export async function GET() {
  return Response.json(await ambilEvents());
}
