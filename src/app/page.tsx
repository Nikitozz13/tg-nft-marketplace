'use client';

import {
  TonConnectButton,
  useIsConnectionRestored,
  useTonWallet,
} from '@tonconnect/ui-react';
import {
  List,
  Placeholder,
  Spinner,
  Text,
} from '@telegram-apps/telegram-ui';

import './styles.css';
import { useEffect, useState } from 'react';
import { NFTTokenInfo } from './api/tokens/types';
import NFTTokenCard from '@/components/NFTTokenCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InfiniteLoader } from '@/components/Loaders/InfiniteLoader';
import { InfiniteLoaderEnd } from '@/components/Loaders/InfiniteLoaderEnd';

export default function Home() {
  const wallet = useTonWallet();
  const connectionRestored = useIsConnectionRestored();
  const [nftTokensInfo, setNftTokensInfo] = useState<NFTTokenInfo[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    const notionQuery = async () => {
      const res = await fetch('/api/tokens', { method: 'GET' }).then((res) => res.json());
      setNftTokensInfo(res);
    }
    notionQuery();
  }, []);

  const fetchMoreData = async () => {
    setTimeout(async() => {
      const res = await fetch(`/api/tokens?page=${1}`, { method: 'GET' }).then((res) => res.json());
      setNftTokensInfo([...nftTokensInfo, ...res]);
      setHasMoreData(false);
    }, 3000);
  };

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
          next={fetchMoreData}
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
            <>
              <NFTTokenCard
                key={rawAddress}
                image={image.small}
                friendlyAddress={friendlyAddress}
                rawAddress={rawAddress}
                ownerAddress={ownerAddress}
                name={name}
                description={description}
              />
            </>
          ))}
        </InfiniteScroll>
      </List>
    </>
  );
};
