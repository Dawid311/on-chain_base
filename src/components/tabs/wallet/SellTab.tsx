'use client';

import { useState } from "react";
import { FaArrowDown, FaDollarSign } from "react-icons/fa";

export default function SellTab() {
  const [sellAmount, setSellAmount] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("coinbase");

  const sellMethods = [
    {
      id: "coinbase",
      name: "Coinbase",
      description: "Verkaufe ETH direkt für EUR",
      icon: "💰",
      fee: "1-3%",
      time: "1-2 Tage"
    },
    {
      id: "dex",
      name: "DEX (Uniswap)",
      description: "Tausche ETH gegen Stablecoins",
      icon: "🔄",
      fee: "0.3%",
      time: "~1 Min"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">ETH verkaufen</h3>
        <p className="text-zinc-400 text-sm">Wandle deine ETH in EUR um</p>
      </div>

      <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
        <h4 className="font-semibold text-white mb-3">Verkaufsbetrag</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">ETH Betrag</label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.1"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
                className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none pr-16"
              />
              <span className="absolute right-3 top-3 text-zinc-400 text-sm">ETH</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <FaArrowDown className="text-amber-400" />
          </div>
          <div className="text-center p-3 bg-zinc-900 rounded-lg border border-zinc-700">
            <span className="text-lg font-semibold text-green-400">
              ≈ {sellAmount ? (parseFloat(sellAmount) * 3000).toFixed(2) : "0.00"} EUR
            </span>
            <p className="text-xs text-zinc-500 mt-1">Geschätzter Erhalt (nach Gebühren)</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-white">Verkaufsmethode wählen</h4>
        {sellMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`w-full p-4 rounded-xl border transition-all text-left ${
              selectedMethod === method.id
                ? 'border-amber-500 bg-amber-500/10'
                : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{method.icon}</div>
              <div className="flex-1">
                <h5 className="font-semibold text-white mb-1">{method.name}</h5>
                <p className="text-zinc-400 text-sm mb-2">{method.description}</p>
                <div className="flex gap-4 text-xs">
                  <span className="text-red-400">Gebühr: {method.fee}</span>
                  <span className="text-blue-400">Zeit: {method.time}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button 
        disabled={!sellAmount || parseFloat(sellAmount) <= 0}
        className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <FaDollarSign />
        ETH verkaufen
      </button>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
        <p className="text-amber-400 text-sm">
          ⚠️ Verkäufe sind unwiderruflich. Überprüfe alle Details vor der Bestätigung.
        </p>
      </div>
    </div>
  );
}
