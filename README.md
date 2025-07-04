# Base OnchainKit Wallet

Eine moderne, multi-tab Wallet-Anwendung gebaut mit Next.js, OnchainKit von Coinbase/Base, Wagmi und TypeScript.

## Features

- 🔗 **OnchainKit Integration**: Vollständige Integration mit Coinbase's OnchainKit
- 🌐 **Multi-Chain Support**: Unterstützung für Base und andere EVM-kompatible Netzwerke
- 📱 **Responsive Design**: Moderne, mobile-freundliche Benutzeroberfläche
- 🔄 **Multi-Tab Interface**: Organisierte Navigation mit 6 Hauptbereichen:
  - 💳 **Wallet**: Balance-Anzeige und grundlegende Funktionen
  - 📊 **Portfolio**: Asset-Übersicht und Performance
  - 🔄 **Swap**: Token-Tausch-Funktionalität
  - 🎨 **NFTs**: NFT-Sammlung und -Verwaltung
  - 🏦 **DeFi**: DeFi-Protokoll-Integration
  - ⚙️ **Settings**: Benutzereinstellungen und Konfiguration
- ⚡ **Web3 Ready**: Vollständige Web3-Integration mit Wagmi und Viem

## Tech Stack

- **Frontend**: Next.js 15 mit App Router
- **Styling**: Tailwind CSS 4
- **Web3**: OnchainKit, Wagmi, Viem
- **TypeScript**: Vollständige Typisierung
- **State Management**: React Query

## Erste Schritte

### Voraussetzungen

- Node.js 18+ installiert
- npm oder yarn Package Manager

### Installation

1. **Repository klonen:**
   ```bash
   git clone <repository-url>
   cd on-chain_base
   ```

2. **Abhängigkeiten installieren:**
   ```bash
   npm install
   ```

3. **Environment-Variablen konfigurieren:**
   
   Kopieren Sie `.env.local` und tragen Sie Ihre API-Keys ein:
   ```bash
   cp .env.local.example .env.local
   ```

   Bearbeiten Sie `.env.local` und fügen Sie Ihre Credentials hinzu:
   ```env
   # OnchainKit Configuration
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
   
   # Wagmi Configuration  
   NEXT_PUBLIC_WAGMI_PROJECT_ID=your_walletconnect_project_id_here
   
   # Optional: Custom RPC URLs
   NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
   ```

4. **Entwicklungsserver starten:**
   ```bash
   npm run dev
   ```

   Die Anwendung ist dann unter [http://localhost:3000](http://localhost:3000) verfügbar.

## API Keys erhalten

### OnchainKit API Key
1. Besuchen Sie [Coinbase Developer Platform](https://www.coinbase.com/developer-platform)
2. Erstellen Sie ein neues Projekt
3. Navigieren Sie zu den API-Einstellungen
4. Generieren Sie einen API-Key für OnchainKit

### WalletConnect Project ID
1. Besuchen Sie [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Erstellen Sie ein neues Projekt
3. Kopieren Sie die Project ID aus dem Dashboard

## Projektstruktur

```
src/
├── app/
│   ├── providers.tsx      # Web3 Provider-Konfiguration
│   ├── layout.tsx         # Root-Layout mit Providern
│   ├── page.tsx          # Hauptseite mit WalletInterface
│   └── globals.css       # Globale Styles
└── components/
    └── WalletInterface.tsx # Haupt-Wallet-Komponente mit Tabs
```

## Verfügbare Scripts

- `npm run dev` - Startet den Entwicklungsserver
- `npm run build` - Erstellt eine Produktions-Build
- `npm run start` - Startet den Produktionsserver
- `npm run lint` - Führt ESLint aus

## Konfiguration

Die Anwendung wird über Environment-Variablen konfiguriert:

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Ihr OnchainKit API-Key
- `NEXT_PUBLIC_WAGMI_PROJECT_ID`: Ihre WalletConnect Project ID
- `NEXT_PUBLIC_BASE_RPC_URL`: Optional - Custom Base RPC URL

## Verwendung

1. **Wallet verbinden**: Klicken Sie auf "Connect Wallet" und wählen Sie Ihre bevorzugte Wallet
2. **Tabs navigieren**: Verwenden Sie die Navigationsleiste, um zwischen verschiedenen Bereichen zu wechseln
3. **Balance anzeigen**: Ihr ETH-Balance wird automatisch angezeigt
4. **Funktionen nutzen**: Jeder Tab bietet spezifische Web3-Funktionalitäten

## Deployment

### Vercel (Empfohlen)
1. Pushen Sie Ihr Projekt zu GitHub
2. Verbinden Sie es mit [Vercel](https://vercel.com)
3. Fügen Sie Environment-Variablen in den Vercel-Einstellungen hinzu
4. Deploy!

### Andere Plattformen
Das Projekt kann auf jeder Plattform deployed werden, die Node.js unterstützt (Netlify, Railway, etc.).

## Beiträge

Beiträge sind willkommen! Bitte erstellen Sie Issues für Bugs oder Feature-Requests und Pull Requests für Verbesserungen.

## Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

## Unterstützung

- [OnchainKit Dokumentation](https://onchainkit.xyz/)
- [Wagmi Dokumentation](https://wagmi.sh/)
- [Next.js Dokumentation](https://nextjs.org/docs)
- [Base Developer Docs](https://docs.base.org/)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
