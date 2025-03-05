import { NextResponse  } from "next/server";
import { getTokensData } from "./actions";
import { GetTokensResponse } from "./types";

export async function GET(req: Request): Promise<NextResponse<GetTokensResponse>> {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');
    const result = await getTokensData(page);
    return NextResponse.json(result);

  } catch (error) {
    console.error('GET api/tokens ERROR:', error)
    return NextResponse.json({
      data: [],
      hasMore: false,
      nextPage: '',
    });
  }
}
