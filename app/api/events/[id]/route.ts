import { NextResponse } from "next/server";
import { events } from "@/Data/events";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const eventId = Number(id);
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return NextResponse.json(
      { pesan: "Event tidak ditemukan" },
      { status: 404 },
    );
  }

  return NextResponse.json(event);
}
