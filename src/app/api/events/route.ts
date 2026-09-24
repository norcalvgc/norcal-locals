import { getEvents } from "@/lib/events";

export async function GET() {
  return Response.json(await getEvents());
}
