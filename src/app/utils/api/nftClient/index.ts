import { NFTResponse } from "./types";

export async function getNFTTokensInfo(addresses: string[]): Promise<NFTResponse> {
  const params = new URLSearchParams();
  addresses.forEach(address => params.append('address', address));
  const result = await fetch(`https://toncenter.com/api/v3/nft/items?${params}`, {
    method: 'GET',
  });

  return result.json();
}
