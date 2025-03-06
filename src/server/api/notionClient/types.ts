export type GetTokensNotionParams = {
  pageSize?: number,
  nextPage?: string | null | undefined,
}

export type GetTokensNotionResult = {
  data: string[],
  hasMore: boolean,
  nextPage: string,
}
