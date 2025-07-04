'use client';
import React, { useState } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { base } from 'wagmi/chains';
import { formatEther } from 'viem';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { id: 'wallet', label: 'Wallet', icon: '💳' },
  { id: 'portfolio', label: 'Portfolio', icon: '📊' },
  { id: 'swap', label: 'Swap', icon: '🔄' },
  { id: 'nfts', label: 'NFTs', icon: '🎨' },
  { id: 'defi', label: 'DeFi', icon: '🏦' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export default function WalletInterface() {
  const [activeTab, setActiveTab] = useState('wallet');
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address,
    chainId: base.id,
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case 'wallet':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Main Balance</h3>
              <div className="text-3xl font-bold">
                {balance ? `${parseFloat(formatEther(balance.value)).toFixed(4)} ETH` : '0.0000 ETH'}
              </div>
              <p className="text-blue-100 text-sm mt-2">
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl font-semibold transition-colors">
                Send
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl font-semibold transition-colors">
                Receive
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">Recent Transactions</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600">↑</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Sent ETH</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <span className="font-semibold text-red-600">-0.1 ETH</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">↓</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Received ETH</p>
                      <p className="text-sm text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-600">+0.5 ETH</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Portfolio Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-green-600">$2,540.32</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">24h Change</p>
                  <p className="text-2xl font-bold text-blue-600">+5.2%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">Assets</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="font-medium">Ethereum</p>
                      <p className="text-sm text-gray-500">ETH</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">1.2345 ETH</p>
                    <p className="text-sm text-gray-500">$2,469.00</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-200 rounded-full"></div>
                    <div>
                      <p className="font-medium">Base Token</p>
                      <p className="text-sm text-gray-500">BASE</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">100.00 BASE</p>
                    <p className="text-sm text-gray-500">$71.32</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'swap':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Swap Tokens</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">From</span>
                    <span className="text-sm text-gray-600">Balance: 1.2345</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      placeholder="0.0"
                      className="flex-1 text-2xl font-semibold bg-transparent outline-none"
                    />
                    <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                      <span className="font-medium">ETH</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    🔄
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">To</span>
                    <span className="text-sm text-gray-600">Balance: 100.00</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      placeholder="0.0"
                      className="flex-1 text-2xl font-semibold bg-transparent outline-none"
                    />
                    <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                      <div className="w-6 h-6 bg-blue-300 rounded-full"></div>
                      <span className="font-medium">BASE</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-semibold transition-colors">
                  Swap Tokens
                </button>
              </div>
            </div>
          </div>
        );

      case 'nfts':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6">NFT Collection</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-3">
                    <div className="w-full h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-3"></div>
                    <p className="font-medium text-gray-800">Cool NFT #{i + 1}</p>
                    <p className="text-sm text-gray-500">Floor: 0.1 ETH</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'defi':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6">DeFi Protocols</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Aave</h4>
                    <span className="text-green-600 font-semibold">4.2% APY</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Lend your ETH to earn interest</p>
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors">
                    Supply
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Uniswap V3</h4>
                    <span className="text-blue-600 font-semibold">12.5% APR</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Provide liquidity to earn fees</p>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                    Add Liquidity
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="font-medium">Dark Mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="font-medium">Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <button 
                  onClick={() => disconnect()}
                  className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Faith Wallet</h1>
              <p className="text-gray-600">Wählen Sie Ihre bevorzugte Wallet zum Verbinden</p>
            </div>
            
            {/* Wallet Connect Section */}
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <Wallet>
                <ConnectWallet />
              </Wallet>
            </div>

            {/* Available Wallet Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">🟦</span>
                  <h3 className="font-semibold text-gray-800">Coinbase Wallet</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Offizielle Coinbase Wallet mit OnchainKit Integration</p>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Self-custody</span>
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Multi-chain</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">🦊</span>
                  <h3 className="font-semibold text-gray-800">MetaMask</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Die weltweit beliebteste Ethereum Wallet</p>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">Browser</span>
                  <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">Mobile</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">🔗</span>
                  <h3 className="font-semibold text-gray-800">WalletConnect</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Unterstützt 300+ verschiedene Wallets</p>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">Trust</span>
                  <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">Rainbow</span>
                  <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">+300</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">🌐</span>
                  <h3 className="font-semibold text-gray-800">Browser Wallets</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Wallets als Browser-Extension</p>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Rabby</span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Frame</span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Brave</span>
                </div>
              </div>
            </div>

            {/* Multi-Chain Support */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Multi-Chain Unterstützung</h3>
              <p className="text-blue-100 mb-3">Unterstützte Netzwerke:</p>
              <div className="flex justify-center space-x-6 text-sm">
                <div className="text-center">
                  <span className="block text-2xl mb-1">🔵</span>
                  <span>Base</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl mb-1">💎</span>
                  <span>Ethereum</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl mb-1">🟣</span>
                  <span>Polygon</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl mb-1">🔺</span>
                  <span>Arbitrum</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl mb-1">🔴</span>
                  <span>Optimism</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Durch das Verbinden stimmen Sie unseren Nutzungsbedingungen und der Datenschutzrichtlinie zu
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Base Wallet</h1>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Connected</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        {renderTabContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-2 text-center ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800'
                } transition-colors`}
              >
                <div className="text-xl mb-1">{tab.icon}</div>
                <div className="text-xs font-medium">{tab.label}</div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom spacing for navigation */}
      <div className="h-20"></div>
    </div>
  );
}
