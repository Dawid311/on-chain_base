'use client';

import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { base } from "wagmi/chains";
import { formatEther } from "viem";
import { FaRegCopy, FaCoins, FaArrowDown, FaArrowUp, FaPaperPlane, FaHistory, FaTimes, FaSync } from "react-icons/fa";

// Temporäre Platzhalter-Komponenten
const BuyTab = () => (
  <div className="p-6 text-center">
    <h3 className="text-xl font-bold text-white mb-4">ETH kaufen</h3>
    <p className="text-zinc-400 mb-6">Hier kannst du ETH direkt kaufen.</p>
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
      <p className="text-amber-400 text-sm">🚧 Funktion wird implementiert</p>
    </div>
  </div>
);

const SellTab = () => (
  <div className="p-6 text-center">
    <h3 className="text-xl font-bold text-white mb-4">ETH verkaufen</h3>
    <p className="text-zinc-400 mb-6">Hier kannst du deine ETH verkaufen.</p>
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
      <p className="text-amber-400 text-sm">🚧 Funktion wird implementiert</p>
    </div>
  </div>
);

const SendTab = () => (
  <div className="p-6 text-center">
    <h3 className="text-xl font-bold text-white mb-4">ETH senden</h3>
    <p className="text-zinc-400 mb-6">Hier kannst du ETH an andere Adressen senden.</p>
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
      <p className="text-amber-400 text-sm">🚧 Funktion wird implementiert</p>
    </div>
  </div>
);

const HistoryTab = () => (
  <div className="p-6 text-center">
    <h3 className="text-xl font-bold text-white mb-4">Transaktionshistorie</h3>
    <p className="text-zinc-400 mb-6">Hier siehst du alle deine Transaktionen.</p>
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
      <p className="text-amber-400 text-sm">🚧 Funktion wird implementiert</p>
    </div>
  </div>
);

const StakeTab = () => (
  <div className="p-6 text-center">
    <h3 className="text-xl font-bold text-white mb-4">ETH Staking</h3>
    <p className="text-zinc-400 mb-6">Hier kannst du deine ETH staken.</p>
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
      <p className="text-amber-400 text-sm">🚧 Funktion wird implementiert</p>
    </div>
  </div>
);

// Mobile-optimierte Modal Komponente
function Modal({ open, onClose, title, children }: { open: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  if (!open) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm pt-8 sm:pt-12"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="bg-zinc-900 rounded-xl w-full sm:min-w-[340px] sm:max-w-4xl sm:w-auto sm:mx-4 max-h-[90vh] overflow-y-auto shadow-2xl relative border border-zinc-700 transition-all duration-300 m-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-700 sticky top-0 bg-zinc-900 z-10">
          <h3 className="font-bold text-lg sm:text-xl text-amber-400 truncate pr-4">{title}</h3>
          <button 
            className="p-2 text-amber-400 hover:text-yellow-300 hover:bg-zinc-800 rounded-lg transition-all flex-shrink-0 touch-manipulation"
            onClick={onClose}
          >
            <FaTimes size={16} />
          </button>
        </div>
        
        {/* Content */}
        <div className={`${title === "Staking" ? "" : "p-4 sm:p-6 pb-8"} overflow-y-auto`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function WalletTab() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
    chainId: base.id,
  });

  // State für verschiedene Werte
  const [ethBalance, setEthBalance] = useState<string>("0.00");
  const [ethEurValue, setEthEurValue] = useState<string>("0.00");
  const [ethPriceEur, setEthPriceEur] = useState<number>(0);
  const [lastKnownPrices, setLastKnownPrices] = useState<{
    ethEur?: number;
    timestamp?: number;
  }>({});
  const [pricesLoaded, setPricesLoaded] = useState<boolean>(false);

  // State für Loading und Refresh
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // State für Kopieren-Feedback
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Modal States
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showStakeModal, setShowStakeModal] = useState(false);

  // ETH EUR-Preis holen
  const fetchEthPrice = async () => {
    const now = Date.now();
    const cooldownPeriod = 30 * 1000; // 30 Sekunden
    
    const getLastRequest = (provider: string) => {
      const lastRequest = localStorage.getItem(`last_${provider}_request`);
      return lastRequest ? parseInt(lastRequest) : 0;
    };
    
    const shouldSkipProvider = (provider: string) => {
      return (now - getLastRequest(provider)) < cooldownPeriod;
    };

    try {
      // Lade gespeicherte Preise
      const loadStoredPrices = () => {
        try {
          const stored = localStorage.getItem('base_wallet_prices');
          if (stored) {
            const parsed = JSON.parse(stored);
            const now = Date.now();
            if (parsed.timestamp && (now - parsed.timestamp) < 6 * 60 * 60 * 1000) {
              setLastKnownPrices(parsed);
              if (parsed.ethEur) setEthPriceEur(parsed.ethEur);
              return true;
            }
          }
        } catch (e) {
          console.log('Fehler beim Laden gespeicherter Preise:', e);
        }
        return false;
      };

      loadStoredPrices();

      let ethEur: number | null = null;
      const errorMsg = "";

      // ETH/EUR Preis von verschiedenen Anbietern
      const ethProviders = [
        {
          name: 'coingecko',
          fetch: async () => {
            if (shouldSkipProvider('coingecko')) {
              console.log('CoinGecko Request übersprungen (Rate Limiting)');
              return null;
            }
            localStorage.setItem('last_coingecko_request', now.toString());
            
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur');
            if (!response.ok) {
              if (response.status === 429) {
                console.log('CoinGecko Rate Limit erreicht (429)');
              }
              throw new Error(`CoinGecko: ${response.status}`);
            }
            const data = await response.json();
            return data.ethereum?.eur;
          }
        },
        {
          name: 'cryptocompare',
          fetch: async () => {
            if (shouldSkipProvider('cryptocompare')) {
              console.log('CryptoCompare Request übersprungen (Rate Limiting)');
              return null;
            }
            localStorage.setItem('last_cryptocompare_request', now.toString());
            
            const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR');
            if (!response.ok) {
              if (response.status === 429) {
                console.log('CryptoCompare Rate Limit erreicht (429)');
              }
              throw new Error(`CryptoCompare: ${response.status}`);
            }
            const data = await response.json();
            return data.EUR;
          }
        }
      ];

      // Versuche die Anbieter nacheinander
      for (const provider of ethProviders) {
        try {
          const price = await provider.fetch();
          if (price && price > 0) {
            ethEur = Math.round(price * 100) / 100;
            console.log(`ETH Preis erfolgreich von ${provider.name} geholt: €${ethEur}`);
            break;
          }
        } catch (e) {
          console.log(`${provider.name} Fehler:`, e);
          continue;
        }
      }

      // Fallback auf letzten bekannten Preis
      if (!ethEur && lastKnownPrices.ethEur) {
        ethEur = lastKnownPrices.ethEur;
        console.log('Verwende gespeicherten ETH Preis:', ethEur);
      } else if (!ethEur) {
        ethEur = 3000; // Hard fallback
        console.log('Verwende Hard-Fallback ETH Preis:', ethEur);
      }

      // Setze Preise
      if (ethEur) {
        setEthPriceEur(ethEur);
        
        // EUR-Wert sofort nach Preis-Update neu berechnen
        if (balance?.value) {
          const ethAmount = parseFloat(formatEther(balance.value));
          const newEurValue = calculateEurValue(ethAmount.toString());
          setEthEurValue(newEurValue);
        }

        // Speichere erfolgreiche Preise
        const newPrices = {
          ethEur: ethEur,
          timestamp: Date.now()
        };
        setLastKnownPrices(prev => ({ ...prev, ...newPrices }));
        try {
          localStorage.setItem('base_wallet_prices', JSON.stringify(newPrices));
          console.log('Preise erfolgreich gespeichert:', newPrices);
        } catch (e) {
          console.log('Fehler beim Speichern der Preise:', e);
        }
      }

    } catch (error) {
      console.error("Fehler beim Abrufen des ETH EUR-Preises:", error);
      // Verwende letzte bekannte Preise als Fallback
      if (lastKnownPrices.ethEur) {
        setEthPriceEur(lastKnownPrices.ethEur);
      }
    }
  };

  // Zentrale Funktion zur EUR-Wert-Berechnung
  const calculateEurValue = (balance: string): string => {
    const balanceFloat = parseFloat(balance);
    if (balanceFloat <= 0) return "0.00";

    let priceToUse = 0;
    
    if (ethPriceEur > 0) {
      priceToUse = ethPriceEur;
    } else if (lastKnownPrices.ethEur && lastKnownPrices.ethEur > 0) {
      priceToUse = lastKnownPrices.ethEur;
    } else {
      try {
        const stored = localStorage.getItem('base_wallet_prices');
        if (stored) {
          const parsed = JSON.parse(stored);
          const now = Date.now();
          if (parsed.ethEur && parsed.ethEur > 0 && 
              parsed.timestamp && (now - parsed.timestamp) < 24 * 60 * 60 * 1000) {
            priceToUse = parsed.ethEur;
          }
        }
      } catch (e) {
        console.log('Fehler beim Lesen des localStorage:', e);
      }
    }

    if (priceToUse > 0) {
      const eurValue = balanceFloat * priceToUse;
      return eurValue.toFixed(2);
    }

    return "0.00";
  };

  // Funktion für manuelle Aktualisierung
  const refreshBalances = async () => {
    if (!address || isRefreshing) return;
    
    setIsRefreshing(true);
    
    try {
      await fetchEthPrice();
    } finally {
      setTimeout(() => setIsRefreshing(false), 800);
    }
  };

  // UseEffect für initiales Laden
  useEffect(() => {
    let isMounted = true;
    let priceIntervalId: NodeJS.Timeout | null = null;
    
    const loadPrices = async () => {
      if (!address || !isMounted) return;
      console.log("💰 Starte Preis-Aktualisierung...");
      await fetchEthPrice();
    };
    
    // Initiales Laden
    loadPrices();
    
    // Preis-Aktualisierung alle 5 Minuten
    priceIntervalId = setInterval(() => {
      if (isMounted && address) {
        console.log("💰 5-Minuten-Intervall: Lade Preise neu...");
        loadPrices();
      }
    }, 5 * 60 * 1000);
    
    return () => {
      isMounted = false;
      if (priceIntervalId) {
        clearInterval(priceIntervalId);
        console.log("🛑 Preis-Aktualisierung gestoppt");
      }
    };
  }, [address, fetchEthPrice]);

  // EUR-Wert neu berechnen wenn sich Balance oder Preise ändern
  useEffect(() => {
    if (balance?.value && pricesLoaded) {
      const ethAmount = parseFloat(formatEther(balance.value));
      setEthBalance(ethAmount.toFixed(4));
      const newEurValue = calculateEurValue(ethAmount.toString());
      setEthEurValue(newEurValue);
    } else if (!balance?.value) {
      setEthBalance("0.00");
      setEthEurValue("0.00");
    }
  }, [ethPriceEur, balance?.value, lastKnownPrices.ethEur, pricesLoaded, calculateEurValue]);

  // Lade gespeicherte Preise beim Start
  useEffect(() => {
    const loadStoredPrices = () => {
      try {
        const stored = localStorage.getItem('base_wallet_prices');
        if (stored) {
          const parsed = JSON.parse(stored);
          const now = Date.now();
          if (parsed.timestamp && (now - parsed.timestamp) < 6 * 60 * 60 * 1000) {
            console.log('Lade gespeicherte Preise beim Start:', parsed);
            setLastKnownPrices(parsed);
            if (parsed.ethEur && parsed.ethEur > 0) {
              setEthPriceEur(parsed.ethEur);
            }
            setPricesLoaded(true);
          }
        }
      } catch (e) {
        console.log('Fehler beim Laden gespeicherter Preise beim Start:', e);
      } finally {
        setPricesLoaded(true);
      }
    };

    loadStoredPrices();
  }, []);

  const copyWalletAddress = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address);
        setCopySuccess(true);
        setShowCopyModal(true);
        
        setTimeout(() => {
          setShowCopyModal(false);
          setCopySuccess(false);
        }, 2000);
      } catch (error) {
        console.error("Fehler beim Kopieren:", error);
        setCopySuccess(false);
        setShowCopyModal(true);
        
        setTimeout(() => {
          setShowCopyModal(false);
        }, 2000);
      }
    }
  };

  const formatAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  if (!isConnected || !address) {
    return (
      <div className="flex flex-col items-center min-h-[70vh] justify-center bg-black py-8">
        <div className="w-full max-w-sm bg-gradient-to-br from-zinc-900 to-black rounded-3xl shadow-2xl border border-zinc-700 relative overflow-hidden p-8">
          {/* Glanzeffekt */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 rounded-t-3xl"></div>
          
          <div className="relative z-10">
            {/* Logo/Header */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full">
                <FaCoins className="text-black text-xl" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
                Base Wallet
              </h2>
            </div>
            
            <p className="text-zinc-400 text-center mb-8">
              Verbinde deine Wallet, um auf deine Assets zuzugreifen
            </p>
            
            <div className="flex justify-center w-full">
              <Wallet>
                <ConnectWallet className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold rounded-xl hover:opacity-90 transition-opacity" />
              </Wallet>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-[70vh] items-center py-8 bg-black">
      <div className="w-full max-w-xl bg-gradient-to-br from-zinc-900 to-black rounded-3xl shadow-2xl border border-zinc-700 relative overflow-hidden">
        {/* Glanzeffekte */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-amber-500/5 via-yellow-500/10 to-amber-500/5 rounded-t-3xl"></div>
        <div className="absolute top-0 right-0 w-1/3 h-20 bg-amber-400/10 blur-3xl rounded-full"></div>
        
        <div className="p-6 md:p-10 relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 md:p-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-lg shadow-amber-500/20">
                <FaCoins className="text-black text-lg md:text-xl" />
              </div>
              <span className="text-base md:text-lg font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Base Wallet
              </span>
            </div>
            <Wallet>
              <ConnectWallet className="bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700 text-white px-4 py-2 rounded-lg" />
            </Wallet>
          </div>

          {/* Wallet Address */}
          <div className="flex justify-between items-center bg-zinc-800/70 backdrop-blur-sm rounded-xl p-3 mb-6 border border-zinc-700/80">
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 mb-0.5">Wallet Adresse</span>
              <button
                onClick={copyWalletAddress}
                className="font-mono text-amber-400 text-sm hover:text-amber-300 transition-colors text-left group flex items-center gap-2"
                title="Adresse kopieren"
              >
                <span>{formatAddress(address)}</span>
                <FaRegCopy className="text-xs opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={refreshBalances}
                disabled={isRefreshing}
                className={`p-2 rounded-lg ${isRefreshing ? 'bg-amber-600/20' : 'bg-zinc-700 hover:bg-zinc-600'} text-zinc-200 text-sm font-medium transition-all duration-200`}
                title="Aktualisieren"
              >
                <FaSync className={`text-amber-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={copyWalletAddress}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 text-amber-400 text-sm font-medium transition-all duration-200 border border-amber-500/30"
                title="Adresse kopieren"
              >
                <FaRegCopy /> Kopieren
              </button>
            </div>
          </div>

          {/* ETH Balance */}
          <div className="flex flex-col items-center p-4 bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 rounded-xl border border-zinc-700 w-full mb-6">
            <span className="uppercase text-xs tracking-widest text-amber-500/80 mb-2">ETH Balance</span>
            <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-sm">
              {ethBalance}
              {isRefreshing && (
                <span className="ml-2 text-xs text-amber-500/60 animate-pulse">↻</span>
              )}
            </div>
            {/* EUR-Wert anzeigen */}
            {parseFloat(ethBalance) > 0 && parseFloat(ethEurValue) > 0 && (
              <div className="text-xs text-zinc-500 mt-2">
                ≈ {ethEurValue} EUR
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-4 gap-2 md:gap-3 mb-6">
            <button
              className="flex flex-col items-center justify-center gap-1 px-1 py-3 md:py-4 bg-gradient-to-br from-zinc-800/90 to-zinc-900 hover:from-zinc-800 hover:to-zinc-800 shadow-lg shadow-black/20 rounded-xl hover:scale-[1.02] transition-all duration-300 border border-zinc-700/80"
              onClick={() => setShowBuyModal(true)}
            >
              <div className="w-7 h-7 flex items-center justify-center bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full mb-1 shadow-inner">
                <FaArrowDown className="text-black text-xs" />
              </div>
              <span className="text-xs bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-medium">Kaufen</span>
            </button>
            <button
              className="flex flex-col items-center justify-center gap-1 px-1 py-3 md:py-4 bg-gradient-to-br from-zinc-800/90 to-zinc-900 hover:from-zinc-800 hover:to-zinc-800 shadow-lg shadow-black/20 rounded-xl hover:scale-[1.02] transition-all duration-300 border border-zinc-700/80"
              onClick={() => setShowSellModal(true)}
            >
              <div className="w-7 h-7 flex items-center justify-center bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full mb-1 shadow-inner">
                <FaArrowUp className="text-black text-xs" />
              </div>
              <span className="text-xs bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-medium">Verkauf</span>
            </button>
            <button
              className="flex flex-col items-center justify-center gap-1 px-1 py-3 md:py-4 bg-gradient-to-br from-zinc-800/90 to-zinc-900 hover:from-zinc-800 hover:to-zinc-800 shadow-lg shadow-black/20 rounded-xl hover:scale-[1.02] transition-all duration-300 border border-zinc-700/80"
              onClick={() => setShowSendModal(true)}
            >
              <div className="w-7 h-7 flex items-center justify-center bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full mb-1 shadow-inner">
                <FaPaperPlane className="text-black text-xs" />
              </div>
              <span className="text-xs bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-medium">Senden</span>
            </button>
            <button
              className="flex flex-col items-center justify-center gap-1 px-1 py-3 md:py-4 bg-gradient-to-br from-zinc-800/90 to-zinc-900 hover:from-zinc-800 hover:to-zinc-800 shadow-lg shadow-black/20 rounded-xl hover:scale-[1.02] transition-all duration-300 border border-zinc-700/80"
              onClick={() => setShowHistoryModal(true)}
            >
              <div className="w-7 h-7 flex items-center justify-center bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full mb-1 shadow-inner">
                <FaHistory className="text-black text-xs" />
              </div>
              <span className="text-xs bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-medium">Historie</span>
            </button>
          </div>

          {/* Modals */}
          <Modal open={showBuyModal} onClose={() => setShowBuyModal(false)} title="Kaufen">
            <BuyTab />
          </Modal>

          <Modal open={showSellModal} onClose={() => setShowSellModal(false)} title="Verkaufen">
            <SellTab />
          </Modal>

          <Modal open={showSendModal} onClose={() => setShowSendModal(false)} title="Senden">
            <SendTab />
          </Modal>

          <Modal open={showHistoryModal} onClose={() => setShowHistoryModal(false)} title="Historie">
            <HistoryTab />
          </Modal>

          <Modal open={showStakeModal} onClose={() => setShowStakeModal(false)} title="Staking">
            <div className="min-h-[400px]">
              <StakeTab />
            </div>
          </Modal>

          {/* Copy Success Modal */}
          <Modal open={showCopyModal} onClose={() => setShowCopyModal(false)} title={copySuccess ? "Erfolgreich kopiert!" : "Fehler beim Kopieren"}>
            <div className="text-center py-8">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                copySuccess 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {copySuccess ? (
                  <span className="text-2xl">✓</span>
                ) : (
                  <span className="text-2xl">✗</span>
                )}
              </div>
              <p className={`text-lg font-medium mb-2 ${
                copySuccess ? 'text-green-400' : 'text-red-400'
              }`}>
                {copySuccess ? 'Wallet-Adresse kopiert!' : 'Kopieren fehlgeschlagen'}
              </p>
              <p className="text-zinc-400 text-sm mb-4">
                {copySuccess 
                  ? 'Die Adresse befindet sich jetzt in deiner Zwischenablage.' 
                  : 'Bitte versuche es erneut oder kopiere die Adresse manuell.'
                }
              </p>
              {copySuccess && (
                <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
                  <p className="text-xs text-zinc-500 mb-1">Kopierte Adresse:</p>
                  <p className="text-amber-400 font-mono text-sm break-all">
                    {address}
                  </p>
                </div>
              )}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
