import { NextResponse  } from "next/server";
import { getTokens } from "@/app/utils/api/notionClient";
import { getNFTTokensInfo } from "@/app/utils/api/nftClient";
import { GetTokensResponse } from "./types";
import { extractTokenData } from "./utils";

export async function GET(req: Request): Promise<NextResponse<GetTokensResponse>> {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');
    const { data: tokenAddresses, hasMore, nextPage } = await getTokens({ nextPage: page });
    const tokensInfo = await getNFTTokensInfo(tokenAddresses);
    return NextResponse.json({
      data: extractTokenData(tokensInfo),
      hasMore,
      nextPage,
    });

  } catch (error) {
    console.error('GET api/tokens ERROR:', error)
    return NextResponse.json({
      data: [],
      hasMore: false,
      nextPage: '',
    });
  }
}
