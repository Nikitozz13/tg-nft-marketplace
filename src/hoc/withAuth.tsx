'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTonWallet } from "@tonconnect/ui-react";

export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return function WithAuthComponent(props: T) {
    const wallet = useTonWallet();
    const router = useRouter();

    useEffect(() => {
      console.log({ wallet });

      if (!wallet) {
        router.replace("/login");
      }
    }, [wallet, router]);

    if (!wallet) return null;

    return <Component {...props} />;
  };
}