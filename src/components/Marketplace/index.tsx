'use client';

import Header from '@/components/Header';
import InfiniteScroll from 'react-infinite-scroll-component';
import { List } from '@telegram-apps/telegram-ui';
import NFTTokenCard from '@/components/NFTTokenCard';
import { InfiniteLoader } from '@/components/Loaders/InfiniteLoader';
import { InfiniteLoaderEnd } from '@/components/Loaders/InfiniteLoaderEnd';
import { withAuth } from '@/components/hoc/withAuth';
import { useTokens } from '@/hooks/useTokens';
import ReloadButton from './components/ReloadButton';
import ErrorContent from './components/ErrorContent';
import { REVALIDATE_TIME } from './constants';
import './styles.css';

const Marketplace = () => {
  const {
    data,
    isPending,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isStale,
    refetch,
    isError,
  } = useTokens({
    staleTime: REVALIDATE_TIME,
  });

  if (isError) {
    return (
      <ErrorContent
        text="Oops, the wrong turn.."
        description="Should we try again?"
        buttonText="Fix the Glitch!"
        onClick={() => refetch()}
      />
    )
  }

  if (isPending || isRefetching) {
    return <InfiniteLoader />
  }

  const tokens = data?.pages.flatMap(page => page.data) || [];

  if (!tokens.length) {
    return <ErrorContent onClick={() => refetch()} />
  }

  return (
    <>
      <Header />
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
