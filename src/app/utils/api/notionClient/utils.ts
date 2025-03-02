import { isFullPage } from "@notionhq/client";
import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const NFT_FRIENDLY_ADDRESS_DB_CELL_NAME = 'nft_friendly_address';

type NFTTokenPageModelType = {
  databaseId: string;
  nftFriendlyAddress: string;
};

export const getNFTTokenPageRequestParameters = ({
    databaseId,
    nftFriendlyAddress,
}: NFTTokenPageModelType) => ({
  parent: {
    database_id: databaseId,
  },
  properties: {
    [NFT_FRIENDLY_ADDRESS_DB_CELL_NAME]: {
      title: [
        {
          text: {
            content: nftFriendlyAddress,
          },
        },
      ],
    },
  },
})

export function extractNFTTokenFriendlyAddress({ properties }: PageObjectResponse): string {
  return (
    properties &&
    properties[NFT_FRIENDLY_ADDRESS_DB_CELL_NAME] &&
    properties[NFT_FRIENDLY_ADDRESS_DB_CELL_NAME].type === 'title' &&
    Array.isArray(properties[NFT_FRIENDLY_ADDRESS_DB_CELL_NAME].title) &&
    properties[NFT_FRIENDLY_ADDRESS_DB_CELL_NAME].title[0].type === 'text' &&
    properties[NFT_FRIENDLY_ADDRESS_DB_CELL_NAME].title[0].text.content
  )
    ? properties[NFT_FRIENDLY_ADDRESS_DB_CELL_NAME].title[0].text.content
    : '';
}

export const convertTokensDbResponseToApiResult = (
  results: QueryDatabaseResponse['results']
) => results
  .filter(isFullPage)
  .map(extractNFTTokenFriendlyAddress);
