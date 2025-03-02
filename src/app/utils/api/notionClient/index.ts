import 'server-only';

import { Client } from "@notionhq/client";
import { GetTokensNotionParams, GetTokensNotionResult } from './types';
import { convertTokensDbResponseToApiResult, getNFTTokenPageRequestParameters } from './utils';
import { withRetry } from '@/utils/api';

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

const notion = new Client({
  auth: NOTION_API_KEY,
});

export async function createToken(tokenFriendlyAddress: string) {
  if (!DATABASE_ID) {
    throw new Error('Database ID is not provided');
  }

  await notion.pages.create(getNFTTokenPageRequestParameters({
    databaseId: DATABASE_ID,
    nftFriendlyAddress: tokenFriendlyAddress,
  }));
}

export async function getTokens({
  nextPage,
  pageSize = 5,
}: GetTokensNotionParams): Promise<GetTokensNotionResult> {
  return withRetry(async () => {
    if (!DATABASE_ID) {
      throw new Error('Database ID is not provided');
    }

    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      page_size: pageSize,
      start_cursor: nextPage || undefined,
    });

    return {
      data: convertTokensDbResponseToApiResult(response.results),
      hasMore: response.has_more,
      nextPage: response.next_cursor || '',
    }
  });
}
