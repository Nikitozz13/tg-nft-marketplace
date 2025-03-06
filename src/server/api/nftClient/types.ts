import { NFTResponse } from "./model";

export type NFTTokenResultError = {
  ok: boolean;
  result: string;
  code: number;
}
export type NFTTokenResult = NFTResponse | NFTTokenResultError;

export function isNFTTokenResultError(data: any): data is NFTTokenResultError {
  return 'ok' in data && !data.ok;
}
