export type AddressBook = Record<string, { domain: string; user_friendly: string }>;

export interface TokenInfo {
  description: string;
  extra: ExtraInfo;
  image: string;
  name: string;
  type: string;
};

export interface ExtraInfo {
  marketplace: string;
  uri: string;
  _image_big: string;
  _image_medium: string;
  _image_small: string;
}

export interface ItemExtraInfo extends ExtraInfo {
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

export interface CollectionExtraInfo extends ExtraInfo {
  cover_image: string;
  external_link: string;
  external_url: string;
  social_links: Array<string>;
}

export interface CollectionTokenInfo extends TokenInfo {
  type: 'nft_collections';
  extra: CollectionExtraInfo;
}

export interface ItemTokenInfo extends TokenInfo {
  type: 'nft_items';
  extra: ItemExtraInfo;
}

export type Metadata = Record<string, { is_indexed: boolean; token_info: (ItemTokenInfo | CollectionTokenInfo)[] }>;

export type Collection = {
  address: string;
  code_hash: string;
  collection_content: Record<string, unknown>;
  data_hash: string;
  last_transaction_lt: string;
  next_item_index: string;
  owner_address: string;
};

export type NFTItem = {
  address: string;
  code_hash: string;
  collection: Collection;
  collection_address: string;
  content: Record<string, unknown>;
  data_hash: string;
  index: string;
  init: boolean;
  last_transaction_lt: string;
  owner_address: string;
};

export type NFTResponse = {
  address_book: AddressBook;
  metadata: Metadata;
  nft_items: NFTItem[];
};