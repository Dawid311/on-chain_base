'use client';

import { useState } from "react";
import { FaHistory, FaExternalLinkAlt, FaArrowUp, FaArrowDown, FaFilter } from "react-icons/fa";

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'buy' | 'sell';
  amount: string;
  address: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  txHash: string;
}

export default function HistoryTab() {
  const [filter, setFilter] = useState<string>("all");

  // Beispiel-Transaktionen
  const transactions: Transaction[] = [
    {
      id: "1",
      type: "receive",
      amount: "0.1",
      address: "0x742d35Cc6558C8532612d8B4c8dF421e1c6B3F42",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 Stunden ago
      status: "completed",
      txHash: "0x1234567890abcdef1234567890abcdef12345678"
    },
    {
      id: "2",
      type: "send",
      amount: "0.05",
      address: "0x8ba1f109551bD432803012645Hac136c32960FbF",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 Tag ago
      status: "completed",
      txHash: "0xabcdef1234567890abcdef1234567890abcdef12"
    },
    {
      id: "3",
      type: "buy",
      amount: "0.2",
      address: "Coinbase",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 Tage ago
      status: "completed",
      txHash: "0x567890abcdef1234567890abcdef1234567890ab"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <FaArrowUp className="text-red-400" />;
      case 'receive':
        return <FaArrowDown className="text-green-400" />;
      case 'buy':
        return <FaArrowDown className="text-blue-400" />;
      case 'sell':
        return <FaArrowUp className="text-orange-400" />;
      default:
        return <FaHistory className="text-zinc-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'send':
        return 'Gesendet';
      case 'receive':
        return 'Erhalten';
      case 'buy':
        return 'Gekauft';
      case 'sell':
        return 'Verkauft';
      default:
        return 'Unbekannt';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-zinc-400';
    }
  };

  const formatAddress = (address: string) => {
    if (address === "Coinbase") return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Vor wenigen Minuten";
    if (diffInHours < 24) return `Vor ${diffInHours} Stunden`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Vor ${diffInDays} Tag${diffInDays === 1 ? '' : 'en'}`;
  };

  const filteredTransactions = transactions.filter(tx => 
    filter === "all" || tx.type === filter
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Transaktionshistorie</h3>
        <p className="text-zinc-400 text-sm">Alle deine ETH-Transaktionen im Überblick</p>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <FaFilter className="text-zinc-400 flex-shrink-0" />
        {[
          { id: "all", label: "Alle" },
          { id: "receive", label: "Erhalten" },
          { id: "send", label: "Gesendet" },
          { id: "buy", label: "Gekauft" },
          { id: "sell", label: "Verkauft" }
        ].map((filterOption) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filter === filterOption.id
                ? 'bg-amber-500 text-black'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Transaktionen Liste */}
      <div className="space-y-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center">
                    {getTypeIcon(tx.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{getTypeLabel(tx.type)}</h4>
                    <p className="text-sm text-zinc-400">
                      {tx.type === 'send' ? 'An' : 'Von'} {formatAddress(tx.address)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    tx.type === 'send' || tx.type === 'sell' ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {tx.type === 'send' || tx.type === 'sell' ? '-' : '+'}{tx.amount} ETH
                  </p>
                  <p className="text-xs text-zinc-500">{formatTime(tx.timestamp)}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-700">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(tx.status)} bg-current bg-opacity-10`}>
                  {tx.status === 'completed' ? 'Abgeschlossen' : 
                   tx.status === 'pending' ? 'Ausstehend' : 'Fehlgeschlagen'}
                </span>
                <button 
                  onClick={() => window.open(`https://basescan.org/tx/${tx.txHash}`, '_blank')}
                  className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <FaExternalLinkAlt />
                  Explorer anzeigen
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <FaHistory className="text-zinc-600 text-4xl mx-auto mb-4" />
            <h4 className="text-zinc-400 font-medium mb-2">Keine Transaktionen gefunden</h4>
            <p className="text-zinc-500 text-sm">
              {filter === "all" 
                ? "Du hast noch keine Transaktionen durchgeführt."
                : `Keine ${filter === "receive" ? "empfangenen" : filter === "send" ? "gesendeten" : filter} Transaktionen gefunden.`
              }
            </p>
          </div>
        )}
      </div>

      {filteredTransactions.length > 0 && (
        <div className="text-center">
          <button className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors">
            Alle Transaktionen laden
          </button>
        </div>
      )}
    </div>
  );
}
