import './styles.css';
import { getTokensData } from '@/app/api/tokens/actions';
import Marketplace from '@/components/Marketplace';

export default async function Home() {
  const initialResponse = await getTokensData();

  return (
    <Marketplace initialResponse={initialResponse} />
  )
};
