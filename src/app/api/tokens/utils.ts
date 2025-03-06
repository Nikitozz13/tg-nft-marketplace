import { NFTResponse } from "@/server/api/nftClient/model";
import { NFTTokenInfo } from "./types";

export function extractTokenData(nftResponse: NFTResponse): NFTTokenInfo[] {
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
