'use client';

import React from 'react'
import { TonConnectButton } from '@tonconnect/ui-react'

const Header = () => {
  return (
    <div className="sticky top-4 z-10">
      <TonConnectButton className="ton-connect-page__button-connected"/>
    </div>
  )
}

export default Header;
