import { NextResponse  } from "next/server";
import { getTokens } from "@/app/utils/api/notionClient";
import { getNFTTokensInfo } from "@/app/utils/api/nftClient";
import { NFTResponse } from "@/app/utils/api/nftClient/types";
import { NFTTokenInfo, GetTokensResponse } from "./types";

function extractTokenData(nftResponse: NFTResponse): NFTTokenInfo[] {
  return nftResponse.nft_items
    .map((item) => {
      const { address, owner_address } = item;
      const itemMetadata = nftResponse.metadata[address];
      const itemAddressBook = nftResponse.address_book[address];
      if (!itemMetadata?.token_info?.length || !itemAddressBook) return null;

      const tokenInfo = itemMetadata.token_info[0];

      return {
        friendlyAddress: itemAddressBook.user_friendly,
        rawAddress: address,
        ownerAddress: owner_address,
        image: {
          big: tokenInfo.extra?._image_big,
          medium: tokenInfo.extra?._image_medium,
          small: tokenInfo.extra?._image_small,
        },
        name: tokenInfo.name,
        description: tokenInfo.description,
      } as NFTTokenInfo;
    })
    .filter(p => p !== null);
}

async function fetchDataWithRetries(page: string | null, retries: number = 3) {
  try {
    const { data: tokenAddresses, hasMore, nextPage } = await getTokens({ nextPage: page });
    const tokensInfo = await getNFTTokensInfo(tokenAddresses);
    return { tokensInfo, hasMore, nextPage };

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error occurred while fetching data:', error.message);
    }

    if (retries > 0) {
      console.log(`Retrying... Attempts left: ${retries}`);
      return fetchDataWithRetries(page, retries - 1);
    } else {
      throw new Error('Failed to fetch data after multiple attempts');
    }
  }
}

export async function GET(req: Request): Promise<NextResponse<GetTokensResponse>> {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');
    const { tokensInfo, hasMore, nextPage } = await fetchDataWithRetries(page);
    const extractedData = extractTokenData(tokensInfo);
    return NextResponse.json({
      data: extractedData,
      hasMore,
      nextPage,
    });

  } catch (error) {
    return NextResponse.json({
      data: [],
      hasMore: false,
      nextPage: '',
    });
  }
}
