import { NextResponse  } from "next/server";
import { getTokens } from "@/app/utils/api/notionClient";

export async function GET() {
  const tokens = await getTokens();
  return NextResponse.json(tokens);
}
