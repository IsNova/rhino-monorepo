"use client";

import type React from "react";
import { MARKETS } from "@game-portal/constants";
import type { MarketId } from "@game-portal/types";
import { useMarket } from "../../context/market-context";

interface MarketSwitcherProps {
  className?: string;
}

export const MarketSwitcher: React.FC<MarketSwitcherProps> = ({
  className = "",
}) => {
  const { currentMarket, switchMarket } = useMarket();

  const handleMarketChange = (market: string) => {
    switchMarket(market as MarketId);
  };

  return (
    <select
      value={currentMarket}
      onChange={(e) => handleMarketChange(e.target.value)}
      className={className}
    >
      <option value={MARKETS.EN}>English</option>
      <option value={MARKETS.CA}>Canada</option>
    </select>
  );
};
