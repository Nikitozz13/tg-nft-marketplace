'use client';

import React from "react";
import { useIsConnectionRestored, useTonWallet } from "@tonconnect/ui-react";
import ConnectionRestoring from "@/components/Login/ConnectionRestoring";
import Login from "@/components/Login/Login";

export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return function WithAuthComponent(props: T) {
    const wallet = useTonWallet();
    const connectionRestored = useIsConnectionRestored();

    if (!connectionRestored) {
      return <ConnectionRestoring />
    }
  
    if (!wallet) {
      return <Login />
    }

    return <Component {...props} />;
  };
}
