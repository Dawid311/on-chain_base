'use client';

import { useState } from "react";
import { FaShoppingCart, FaCreditCard, FaExternalLinkAlt } from "react-icons/fa";

export default function BuyTab() {
  const [selectedMethod, setSelectedMethod] = useState<string>("coinbase");

  const buyMethods = [
    {
      id: "coinbase",
      name: "Coinbase",
      description: "Direkt ETH kaufen über Coinbase",
      icon: "💳",
      fee: "1-3%",
      time: "Sofort"
    },
    {
      id: "onramp",
      name: "OnchainKit Onramp",
      description: "Kreditkarte oder Banküberweisung",
      icon: "🏦",
      fee: "2-4%",
      time: "5-10 Min"
    },
    {
      id: "dex",
      name: "DEX (Uniswap)",
      description: "Tausche andere Token gegen ETH",
      icon: "🔄",
      fee: "0.3%",
      time: "~1 Min"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">ETH kaufen</h3>
        <p className="text-zinc-400 text-sm">Wähle deine bevorzugte Kaufmethode</p>
      </div>

      <div className="grid gap-4">
        {buyMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`p-4 rounded-xl border transition-all text-left ${
              selectedMethod === method.id
                ? 'border-amber-500 bg-amber-500/10'
                : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{method.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{method.name}</h4>
                <p className="text-zinc-400 text-sm mb-2">{method.description}</p>
                <div className="flex gap-4 text-xs">
                  <span className="text-green-400">Gebühr: {method.fee}</span>
                  <span className="text-blue-400">Zeit: {method.time}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
        <h4 className="font-semibold text-white mb-3">Kaufbetrag eingeben</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Betrag (EUR)</label>
            <input
              type="number"
              placeholder="100"
              className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div className="text-center text-zinc-400 text-sm">
            ≈ 0.033 ETH (geschätzt)
          </div>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
        <FaShoppingCart />
        ETH kaufen
      </button>

      <div className="text-center">
        <p className="text-xs text-zinc-500">
          Durch den Kauf stimmst du den Nutzungsbedingungen zu.
        </p>
      </div>
    </div>
  );
}
