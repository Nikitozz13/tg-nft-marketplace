'use client';

import InfiniteScroll from 'react-infinite-scroll-component';
import { List } from '@telegram-apps/telegram-ui';
import NFTTokenCard from '@/components/NFTTokenCard';
import { InfiniteLoader } from '@/components/Loaders/InfiniteLoader';
import { InfiniteLoaderEnd } from '@/components/Loaders/InfiniteLoaderEnd';
import { withAuth } from '@/components/hoc/withAuth';
import { useTokens } from '@/hooks/useTokens';
import ReloadButton from './components/ReloadButton';
import NoData from './components/NoData';
import { REVALIDATE_TIME } from './constants';
import './styles.css';

const Marketplace = () => {
  const { data, isPending, hasNextPage, fetchNextPage, isStale, refetch } = useTokens({
    staleTime: REVALIDATE_TIME,
  });

  if (isPending) {
    return <InfiniteLoader />
  }

  const tokens = data?.pages.flatMap(page => page.data) || [];

  if (!tokens.length) {
    return <NoData />
  }

  return (
    <>
      <List>
        <InfiniteScroll
          dataLength={tokens.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<InfiniteLoader />}
          endMessage={<InfiniteLoaderEnd />}
        >
          {tokens.map((token) => (
            <NFTTokenCard key={token.friendlyAddress} nftTokenInfo={token}/>
          ))}
        </InfiniteScroll>
      </List>

      {isStale && !isPending && (
        <ReloadButton text='Reload' onClick={() => refetch()} />
      )}
    </>
  );
};

export default withAuth(Marketplace);
