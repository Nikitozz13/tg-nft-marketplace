import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { Root } from '@/components/Root/Root';
import { I18nProvider } from '@/core/i18n/provider';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';
import './index.css';

export const metadata: Metadata = {
  title: 'NFT Marketplace',
  description: 'Just a simple NFT Marketplace application',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
    <body>
      <I18nProvider>
        <Root>
          {children}
        </Root>
      </I18nProvider>
    </body>
    </html>
  );
}
