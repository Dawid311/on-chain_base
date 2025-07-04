'use client';

import { useState } from "react";
import { FaLock, FaUnlock, FaCoins, FaPercentage, FaClock } from "react-icons/fa";

export default function StakeTab() {
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [selectedPool, setSelectedPool] = useState<string>("eth-pool");

  const stakingPools = [
    {
      id: "eth-pool",
      name: "ETH Staking Pool",
      apy: "4.2%",
      tvl: "12,450 ETH",
      description: "Stake deine ETH und verdiene Belohnungen",
      minStake: "0.01",
      lockPeriod: "Flexibel"
    },
    {
      id: "lido",
      name: "Lido Liquid Staking",
      apy: "3.8%",
      tvl: "8,950,000 ETH",
      description: "Erhalte stETH als liquides Staking-Token",
      minStake: "0.001",
      lockPeriod: "Keine"
    }
  ];

  const currentPool = stakingPools.find(pool => pool.id === selectedPool);

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">ETH Staking</h3>
        <p className="text-zinc-400 text-sm">Stake deine ETH und verdiene passive Belohnungen</p>
      </div>

      {/* Staking Statistiken */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-4 text-center">
          <FaCoins className="text-green-400 text-2xl mx-auto mb-2" />
          <p className="text-xs text-green-300 uppercase tracking-wide">Gestaked</p>
          <p className="text-lg font-bold text-white">0.00 ETH</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-4 text-center">
          <FaPercentage className="text-purple-400 text-2xl mx-auto mb-2" />
          <p className="text-xs text-purple-300 uppercase tracking-wide">Verdient</p>
          <p className="text-lg font-bold text-white">0.00 ETH</p>
        </div>
      </div>

      {/* Pool Auswahl */}
      <div className="space-y-3">
        <h4 className="font-semibold text-white">Staking Pool wählen</h4>
        {stakingPools.map((pool) => (
          <button
            key={pool.id}
            onClick={() => setSelectedPool(pool.id)}
            className={`w-full p-4 rounded-xl border transition-all text-left ${
              selectedPool === pool.id
                ? 'border-amber-500 bg-amber-500/10'
                : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h5 className="font-semibold text-white">{pool.name}</h5>
              <span className="text-green-400 font-bold text-sm">{pool.apy} APY</span>
            </div>
            <p className="text-zinc-400 text-sm mb-3">{pool.description}</p>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-zinc-500">TVL</p>
                <p className="text-white font-medium">{pool.tvl}</p>
              </div>
              <div>
                <p className="text-zinc-500">Min. Stake</p>
                <p className="text-white font-medium">{pool.minStake} ETH</p>
              </div>
              <div>
                <p className="text-zinc-500">Lock Period</p>
                <p className="text-white font-medium">{pool.lockPeriod}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Staking Formular */}
      <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
        <h4 className="font-semibold text-white mb-4">ETH staken</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Stake Betrag</label>
            <div className="relative">
              <input
                type="number"
                placeholder={`Min. ${currentPool?.minStake || "0.01"}`}
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none pr-16"
              />
              <span className="absolute right-3 top-3 text-zinc-400 text-sm">ETH</span>
            </div>
            <div className="flex justify-between items-center mt-2 text-xs">
              <span className="text-zinc-500">Verfügbar: 0.00 ETH</span>
              <button className="text-amber-400 hover:text-amber-300 transition-colors">
                Max verwenden
              </button>
            </div>
          </div>

          {/* Belohnungsvorschau */}
          {stakeAmount && parseFloat(stakeAmount) > 0 && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <h5 className="text-green-300 font-medium mb-2">Geschätzte Belohnungen</h5>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Täglich:</span>
                  <span className="text-white">
                    {(parseFloat(stakeAmount) * 0.042 / 365).toFixed(6)} ETH
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Monatlich:</span>
                  <span className="text-white">
                    {(parseFloat(stakeAmount) * 0.042 / 12).toFixed(4)} ETH
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Jährlich:</span>
                  <span className="text-green-400 font-medium">
                    {(parseFloat(stakeAmount) * 0.042).toFixed(4)} ETH
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          disabled={!stakeAmount || parseFloat(stakeAmount) < parseFloat(currentPool?.minStake || "0.01")}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <FaLock />
          Staken
        </button>
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <FaUnlock />
          Unstaken
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <FaClock className="text-blue-400 mt-1 flex-shrink-0" />
          <div>
            <h5 className="text-blue-300 font-medium mb-1">Wichtige Hinweise</h5>
            <ul className="text-sm text-zinc-300 space-y-1">
              <li>• Gestakte ETH können jederzeit unstaked werden</li>
              <li>• Belohnungen werden täglich ausgezahlt</li>
              <li>• Keine Slashing-Risiken bei diesem Pool</li>
              <li>• Gas-Gebühren fallen beim Staken/Unstaken an</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
