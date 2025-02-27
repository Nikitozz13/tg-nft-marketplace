'use client';

import { withAuth } from '@/hoc/withAuth';
import { openLink } from '@telegram-apps/sdk-react';
import { Page } from '@/components/Page';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import {
  Avatar,
  Cell,
  List,
  Navigation,
  Placeholder,
  Section,
  Text,
  Title,
} from '@telegram-apps/telegram-ui';

import { DisplayData } from '@/components/DisplayData/DisplayData';

import './styles.css';

function MarketplacePage() {
  const wallet = useTonWallet();

  const {
    account: { chain, publicKey, address },
    device: {
      appName,
      appVersion,
      maxProtocolVersion,
      platform,
      features,
    },
  } = wallet!;

  return (
    <Page>
      <List>
        <TonConnectButton className="ton-connect-page__button-connected"/>
        MY MARKETPLACE
      </List>
    </Page>
  );
}

export default MarketplacePage;
