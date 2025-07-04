'use client';

import { useState } from "react";
import { FaPaperPlane, FaQrcode, FaAddressBook } from "react-icons/fa";

export default function SendTab() {
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isValidAddress, setIsValidAddress] = useState<boolean>(false);

  const validateAddress = (address: string) => {
    // Einfache ETH-Adress-Validierung (0x + 40 hex characters)
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    return ethAddressRegex.test(address);
  };

  const handleAddressChange = (address: string) => {
    setRecipient(address);
    setIsValidAddress(validateAddress(address));
  };

  const quickAddresses = [
    { name: "Base Bridge", address: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e", description: "Bridge zu Ethereum" },
    { name: "Uniswap V3", address: "0x2626664c2603336E57B271c5C0b26F421741e481", description: "DEX Router" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">ETH senden</h3>
        <p className="text-zinc-400 text-sm">Übertrage ETH an eine andere Adresse</p>
      </div>

      <div className="space-y-4">
        {/* Empfänger-Adresse */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Empfänger-Adresse</label>
          <div className="relative">
            <input
              type="text"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => handleAddressChange(e.target.value)}
              className={`w-full p-3 bg-zinc-900 border rounded-lg text-white placeholder-zinc-500 focus:outline-none pr-12 ${
                recipient.length > 0 
                  ? isValidAddress 
                    ? 'border-green-500 focus:border-green-400' 
                    : 'border-red-500 focus:border-red-400'
                  : 'border-zinc-700 focus:border-amber-500'
              }`}
            />
            <button className="absolute right-3 top-3 text-zinc-400 hover:text-amber-400 transition-colors">
              <FaQrcode />
            </button>
          </div>
          {recipient.length > 0 && (
            <p className={`text-xs mt-1 ${isValidAddress ? 'text-green-400' : 'text-red-400'}`}>
              {isValidAddress ? '✓ Gültige Ethereum-Adresse' : '✗ Ungültige Adresse'}
            </p>
          )}
        </div>

        {/* Schnellzugriff */}
        <div>
          <h4 className="text-sm font-medium text-zinc-300 mb-2">Schnellzugriff</h4>
          <div className="grid gap-2">
            {quickAddresses.map((addr, index) => (
              <button
                key={index}
                onClick={() => handleAddressChange(addr.address)}
                className="p-3 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:border-zinc-600 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <FaAddressBook className="text-amber-400" />
                  <div>
                    <p className="text-white font-medium text-sm">{addr.name}</p>
                    <p className="text-zinc-400 text-xs">{addr.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Betrag */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Betrag</label>
          <div className="relative">
            <input
              type="number"
              placeholder="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none pr-16"
            />
            <span className="absolute right-3 top-3 text-zinc-400 text-sm">ETH</span>
          </div>
          {amount && (
            <p className="text-xs text-zinc-500 mt-1">
              ≈ {(parseFloat(amount) * 3000).toFixed(2)} EUR
            </p>
          )}
        </div>

        {/* Gas-Gebühr Info */}
        <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
          <div className="flex justify-between items-center">
            <span className="text-sm text-zinc-300">Geschätzte Gas-Gebühr:</span>
            <span className="text-sm text-white font-medium">~0.002 ETH</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-zinc-500">Gesamt zu senden:</span>
            <span className="text-xs text-amber-400">
              {amount ? (parseFloat(amount) + 0.002).toFixed(4) : "0.002"} ETH
            </span>
          </div>
        </div>
      </div>

      <button 
        disabled={!isValidAddress || !amount || parseFloat(amount) <= 0}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <FaPaperPlane />
        ETH senden
      </button>

      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
        <p className="text-red-400 text-sm">
          ⚠️ Transaktionen sind unwiderruflich. Überprüfe die Empfänger-Adresse sorgfältig.
        </p>
      </div>
    </div>
  );
}
