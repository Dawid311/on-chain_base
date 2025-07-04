'use client';

export default function WalletOptions() {
  const walletOptions = [
    {
      name: "Coinbase Wallet",
      description: "Offizielle Coinbase Wallet mit OnchainKit Integration",
      icon: "🟦",
      features: ["Self-custody", "DApp Browser", "NFT Support", "Multi-chain"]
    },
    {
      name: "MetaMask",
      description: "Die beliebteste Ethereum Wallet",
      icon: "🦊",
      features: ["Browser Extension", "Mobile App", "Hardware Wallet Support", "Token Swaps"]
    },
    {
      name: "WalletConnect",
      description: "Verbindet über 300+ verschiedene Wallets",
      icon: "🔗",
      features: ["Trust Wallet", "Rainbow", "Argent", "1inch Wallet", "Uniswap Wallet", "Phantom", "Zerion", "SafePal"]
    },
    {
      name: "Browser Wallet",
      description: "Jede im Browser installierte Wallet",
      icon: "🌐",
      features: ["Rabby Wallet", "Frame", "Talisman", "Brave Wallet"]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <div className="bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-800">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">Verfügbare Wallet-Optionen</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {walletOptions.map((wallet, index) => (
            <div key={index} className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 hover:border-blue-500 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{wallet.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-300 mb-2">{wallet.name}</h3>
                  <p className="text-zinc-300 text-sm mb-4">{wallet.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-zinc-400">Unterstützte Wallets/Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {wallet.features.map((feature, fIndex) => (
                        <span key={fIndex} className="bg-blue-600 bg-opacity-20 text-blue-300 text-xs px-2 py-1 rounded-md">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Multi-Chain Unterstützung</h3>
          <p className="text-blue-100 mb-4">Unterstützte Netzwerke: Base, Ethereum, Polygon, Arbitrum, Optimism</p>
          <div className="flex justify-center space-x-4 text-2xl">
            <span title="Base">🔵</span>
            <span title="Ethereum">💎</span>
            <span title="Polygon">🟣</span>
            <span title="Arbitrum">🔺</span>
            <span title="Optimism">🔴</span>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-zinc-400 text-sm">
            Klicken Sie auf "Connect Wallet" und wählen Sie Ihre bevorzugte Option aus der Liste.
          </p>
        </div>
      </div>
    </div>
  );
}
