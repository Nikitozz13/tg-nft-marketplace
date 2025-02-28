export type NFTTokenInfo = {
  friendlyAddress: string;
  rawAddress: string;
  ownerAddress: string;
  image: {
    big: string;
    medium: string;
    small: string;
  }
  name: string;
  description: string;
}

export type GetTokensResponse = {
  data: NFTTokenInfo[],
  hasMore: boolean,
  nextPage: string,
}