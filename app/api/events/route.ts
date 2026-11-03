import { events } from "@/Data/events";

export async function GET() {
  return Response.json(events);
}

