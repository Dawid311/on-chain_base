'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { WagmiProvider } from 'wagmi';
import { base, mainnet, polygon, arbitrum, optimism } from 'wagmi/chains';
import { createConfig, http } from 'wagmi';
import { coinbaseWallet, metaMask, walletConnect, injected } from 'wagmi/connectors';

// Wagmi Konfiguration mit erweiterten Wallet-Optionen
const config = createConfig({
  chains: [base, mainnet, polygon, arbitrum, optimism],
  connectors: [
    // Coinbase Wallet
    coinbaseWallet({
      appName: process.env.NEXT_PUBLIC_APP_NAME || 'Base Wallet',
      appLogoUrl: 'https://your-app-logo.png',
    }),
    // MetaMask
    metaMask(),
    // WalletConnect (unterstützt 300+ Wallets)
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
      metadata: {
        name: 'Faith Wallet',
        description: 'Base OnchainKit Wallet mit Faith Token',
        url: 'https://faith-wallet.app',
        icons: ['https://faith-wallet.app/icon.png'],
      },
    }),
    // Injected Wallet (für Browser-Extensions)
    injected(),
  ],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_COINBASE_API_KEY || 'YOUR_COINBASE_API_KEY'}
          chain={base}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
