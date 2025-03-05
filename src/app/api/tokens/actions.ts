'use server'

import { getTokens } from "@/app/utils/api/notionClient";
import { getNFTTokensInfo } from "@/app/utils/api/nftClient";
import { GetTokensResponse } from "./types";
import { extractTokenData } from "./utils";

export async function getTokensData(page?: string | null): Promise<GetTokensResponse> {
  const { data: tokenAddresses, hasMore, nextPage } = await getTokens({ nextPage: page });
  const tokensInfo = await getNFTTokensInfo(tokenAddresses);
  return {
    data: extractTokenData(tokensInfo),
    hasMore,
    nextPage,
  }
}
