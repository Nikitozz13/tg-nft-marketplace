import { getTokensData } from '@/app/api/tokens/actions';
import Marketplace from '@/components/Marketplace';
import { Root } from '@/components/Root/Root';

export default async function Home() {
  const initialResponse = await getTokensData();

  return (
    <Root>
      <Marketplace initialResponse={initialResponse} />
    </Root>
  )
};
