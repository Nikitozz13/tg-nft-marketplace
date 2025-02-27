import 'server-only';

import { Client } from "@notionhq/client";
import { extractNFTTokenFriendlyAddress, getNFTTokenPageRequestParameters } from './utils';
import { isFullPage } from '@notionhq/client/build/src/helpers';

const NOTION_API_KEY = process.env.NEXT_PUBLIC_NOTION_API_KEY;
const DATABASE_ID = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

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

export async function getTokens(pageSize: number = 5) {
  if (!DATABASE_ID) {
    throw new Error('Database ID is not provided');
  }

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    page_size: pageSize,
  });

  return response.results
    .filter(isFullPage)
    .map(extractNFTTokenFriendlyAddress);
}
