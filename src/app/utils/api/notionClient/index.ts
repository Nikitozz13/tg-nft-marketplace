import 'server-only';

import { Client } from "@notionhq/client";
import { extractNFTTokenFriendlyAddress, getNFTTokenPageRequestParameters } from './utils';
import { isFullPage } from '@notionhq/client/build/src/helpers';
import { GetTokensNotionResult } from './types';

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

export async function getTokens(
  {
    pageSize = 5,
    nextPage,
  }: {
    pageSize?: number,
    nextPage?: string | null,
  }) : Promise<GetTokensNotionResult>
{
  if (!DATABASE_ID) {
    throw new Error('Database ID is not provided');
  }

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    page_size: pageSize,
    start_cursor: nextPage || undefined,
  });

  const { has_more, next_cursor, results} = response;

  const data = results
    .filter(isFullPage)
    .map(extractNFTTokenFriendlyAddress);

  return {
    data,
    hasMore: has_more,
    nextPage: next_cursor || '',
  }
}
