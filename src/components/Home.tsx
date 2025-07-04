"use client";

import { useState } from "react";
import Navigation from "../components/Navigation";
import WalletTab from "../components/tabs/WalletTab";
import TokenomicsTab from "../components/tabs/TokenomicsTab";
import MerchTab from "../components/tabs/MerchTab";
import StreamTab from "../components/tabs/StreamTab";
import LiveTab from "../components/tabs/LiveTab";
import InstagramTab from "../components/tabs/InstagramTab";
import TiktokTab from "../components/tabs/TiktokTab";
import FacebookTab from "../components/tabs/FacebookTab";

export default function Home() {
  const [activeTab, setActiveTab] = useState("wallet");

  return (
    <main className="min-h-screen flex flex-col bg-zinc-950">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <section className="flex-1 flex flex-col items-center justify-center pt-24 pb-8">
        {activeTab === "wallet" && <WalletTab />}
        {activeTab === "tokenomics" && <TokenomicsTab />}
        {activeTab === "merch" && <MerchTab />}
        {activeTab === "stream" && <StreamTab />}
        {activeTab === "live" && <LiveTab />}
        {activeTab === "instagram" && <InstagramTab />}
        {activeTab === "tiktok" && <TiktokTab />}
        {activeTab === "facebook" && <FacebookTab />}
      </section>
    </main>
  );
}
