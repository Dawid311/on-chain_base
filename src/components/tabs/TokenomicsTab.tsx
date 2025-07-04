'use client';

export default function TokenomicsTab() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <div className="bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-800">
        <h2 className="text-3xl font-bold text-center mb-8 text-yellow-400">Tokenomics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
            <h3 className="text-xl font-semibold mb-4 text-yellow-300">Token Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-300">Token Name:</span>
                <span className="font-medium">Faith Token</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-300">Symbol:</span>
                <span className="font-medium">FAITH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-300">Total Supply:</span>
                <span className="font-medium">1,000,000,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-300">Decimals:</span>
                <span className="font-medium">18</span>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
            <h3 className="text-xl font-semibold mb-4 text-yellow-300">Distribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-300">Public Sale:</span>
                <span className="font-medium">40%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-300">Liquidity:</span>
                <span className="font-medium">30%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-300">Team:</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-300">Marketing:</span>
                <span className="font-medium">15%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold mb-2 text-zinc-900">Current Price</h3>
          <p className="text-3xl font-bold text-zinc-900">$0.0001 FAITH</p>
          <p className="text-sm text-zinc-800 mt-2">+12.5% (24h)</p>
        </div>
      </div>
    </div>
  );
}
