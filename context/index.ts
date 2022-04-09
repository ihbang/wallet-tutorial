import React, { createContext, useContext } from 'react';
import { Keypair, Cluster } from '@solana/web3.js';

export type GlobalContextType = {
  network: Cluster | undefined;
  setNetwork: React.Dispatch<React.SetStateAction<Cluster | undefined>>;
  account: Keypair | null;
  setAccount: React.Dispatch<React.SetStateAction<Keypair | null>>;
  balance: number | null;
  setBalance: React.Dispatch<React.SetStateAction<number | null>>;
};

export const GlobalContext = createContext<GlobalContextType>({
  network: 'devnet',
  setNetwork: () => null,
  account: null,
  setAccount: () => null,
  balance: null,
  setBalance: () => null,
});

export const useGlobalState = () => useContext(GlobalContext);
