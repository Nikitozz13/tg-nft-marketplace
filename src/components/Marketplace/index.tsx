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

import { useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GetTokensResponse, NFTTokenInfo } from '@/app/api/tokens/types';
import NFTTokenCard from '@/components/NFTTokenCard';
import { InfiniteLoader } from '@/components/Loaders/InfiniteLoader';
import { InfiniteLoaderEnd } from '@/components/Loaders/InfiniteLoaderEnd';
import './styles.css';

type MarketplaceProps = {
  initialResponse: GetTokensResponse;
}

export default function Marketplace({ initialResponse }: MarketplaceProps) {
  const wallet = useTonWallet();
  const connectionRestored = useIsConnectionRestored();
  const [nftTokensInfo, setNftTokensInfo] = useState<NFTTokenInfo[]>(initialResponse.data);
  const [hasMoreData, setHasMoreData] = useState<boolean>(initialResponse.hasMore);
  const [nextPage, setNextPage] = useState<string>(initialResponse.nextPage);

  const fetchTokens = useCallback(async () => {
    const res = await fetch(`/api/tokens?page=${nextPage}`, { method: 'GET' });
    const { data, hasMore, nextPage: page }: GetTokensResponse = await res.json();
    setNftTokensInfo([...nftTokensInfo, ...data]);
    setNextPage(page);
    setHasMoreData(hasMore);
  }, [nftTokensInfo, nextPage]);

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
          {nftTokensInfo.map((token) => (
            <NFTTokenCard key={token.friendlyAddress} nftTokenInfo={token}/>
          ))}
        </InfiniteScroll>
      </List>
    </>
  );
};
