import { withRetry } from "@/utils/api";
import { NFTResponse } from "./model";
import { NFTTokenResult, isNFTTokenResultError } from './types';

export async function getNFTTokensInfo(addresses: string[]): Promise<NFTResponse> {
  return withRetry(async () => {
    const params = new URLSearchParams();
    addresses.forEach(address => params.append('address', address));
    return fetch(`https://toncenter.com/api/v3/nft/items?${params}`)
      .then((res: Response) => res.json())
      .then((data: NFTTokenResult) => {
        if (isNFTTokenResultError(data)) throw data;
        return data;
      });
  });
}
