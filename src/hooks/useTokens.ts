'use client';

import { useInfiniteQuery } from "@tanstack/react-query"
import { GetTokensResponse } from "@/app/api/tokens/types";

const getTokens = async ({ pageParam }: { pageParam: string }): Promise<GetTokensResponse> => {
  return fetch(`/api/tokens?page=${pageParam}`, { method: 'GET' }).then(res => res.json());
}

type UseTokensParams = {
  staleTime?: number;
}

export const useTokens = (params?: UseTokensParams) => {
  return useInfiniteQuery({
    queryKey: ['nftTokens'],
    queryFn: getTokens,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : null,
    staleTime: params?.staleTime,
    retry: 3,
  })
}
