'use client';

import {
  TonConnectButton,
  useIsConnectionRestored,
  useTonWallet,
} from '@tonconnect/ui-react';
import {
  List,
  Placeholder,
  Text,
} from '@telegram-apps/telegram-ui';

import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { GetTokensResponse, NFTTokenInfo } from './api/tokens/types';
import NFTTokenCard from '@/components/NFTTokenCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InfiniteLoader } from '@/components/Loaders/InfiniteLoader';
import { InfiniteLoaderEnd } from '@/components/Loaders/InfiniteLoaderEnd';

export default function Home() {
  const wallet = useTonWallet();
  const connectionRestored = useIsConnectionRestored();
  const [nftTokensInfo, setNftTokensInfo] = useState<NFTTokenInfo[]>([]);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [nextPage, setNextPage] = useState<string>('');

  const fetchTokens = useCallback(async () => {
    const res = await fetch(`/api/tokens?page=${nextPage}`, { method: 'GET' });
    const { data, hasMore, nextPage: page }: GetTokensResponse = await res.json();
    setNftTokensInfo([...nftTokensInfo, ...data]);
    setNextPage(page);
    setHasMoreData(hasMore);
  }, [nextPage]);

  useEffect(() => {
    fetchTokens();
  }, []);

  if (!connectionRestored) {
    return (
      <Placeholder
        className="ton-connect-page__placeholder"
        description={
          <Text>
            Restoring page data...
          </Text>
        }
      />
    )
  }

  if (!wallet) {
    return (
      <Placeholder
        className="ton-connect-page__placeholder"
        header="TON Connect"
        description={
          <>
            <Text>
              To display the data related to the TON Connect, it is required
              to connect your wallet
            </Text>
            <TonConnectButton className="ton-connect-page__button"/>
          </>
        }
      />
    );
  }

  return (
    <>
      <TonConnectButton className="ton-connect-page__button-connected"/>
      <List>
        <InfiniteScroll
          dataLength={nftTokensInfo.length}
          next={fetchTokens}
          hasMore={hasMoreData}
          loader={<InfiniteLoader />}
          endMessage={<InfiniteLoaderEnd />}
        >
          {nftTokensInfo.map(({
            friendlyAddress,
            rawAddress,
            ownerAddress,
            image,
            name,
            description,
          }) => (
            <NFTTokenCard
              key={rawAddress}
              image={image.small}
              friendlyAddress={friendlyAddress}
              rawAddress={rawAddress}
              ownerAddress={ownerAddress}
              name={name}
              description={description}
            />
          ))}
        </InfiniteScroll>
      </List>
    </>
  );
};
