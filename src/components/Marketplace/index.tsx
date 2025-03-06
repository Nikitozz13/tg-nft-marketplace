'use client';

import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TonConnectButton } from '@tonconnect/ui-react';
import { List } from '@telegram-apps/telegram-ui';
import { GetTokensResponse, NFTTokenInfo } from '@/app/api/tokens/types';
import NFTTokenCard from '@/components/NFTTokenCard';
import { InfiniteLoader } from '@/components/Loaders/InfiniteLoader';
import { InfiniteLoaderEnd } from '@/components/Loaders/InfiniteLoaderEnd';
import { withAuth } from '@/components/hoc/withAuth';
import './styles.css';

const Marketplace = () => {
  const [nftTokensInfo, setNftTokensInfo] = useState<NFTTokenInfo[]>([]);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [nextPage, setNextPage] = useState<string>('');

  const fetchTokens = useCallback(async () => {
    const res = await fetch(`/api/tokens?page=${nextPage}`, { method: 'GET' });
    const { data, hasMore, nextPage: page }: GetTokensResponse = await res.json();
    setNftTokensInfo([...nftTokensInfo, ...data]);
    setNextPage(page);
    setHasMoreData(hasMore);
  }, [nftTokensInfo, nextPage]);

  useEffect(() => {
    fetchTokens()
  }, [])

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
          {nftTokensInfo.map((token) => (
            <NFTTokenCard key={token.friendlyAddress} nftTokenInfo={token}/>
          ))}
        </InfiniteScroll>
      </List>
    </>
  );
};

export default withAuth(Marketplace);
