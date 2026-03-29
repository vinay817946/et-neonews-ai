import { NextResponse } from "next/server";
import { z } from "zod";
import { getWatchlistStore } from "@/lib/server/watchlistStore";

const schema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string().default("Story"),
  status: z.string().default("Tracking"),
});

export async function GET() {
  return NextResponse.json({ success: true, items: getWatchlistStore() });
}

export async function POST(req) {
  try {
    const item = schema.parse(await req.json());
    const store = getWatchlistStore();
    if (!store.find((entry) => entry.id === item.id)) store.unshift(item);
    return NextResponse.json({ success: true, items: store });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Failed to save watchlist" }, { status: 500 });
  }
}
