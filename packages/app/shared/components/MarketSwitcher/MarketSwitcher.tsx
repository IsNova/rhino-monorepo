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

  const handleMarketChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switchMarket(event.target.value as MarketId);
  };

  return (
    <select
      value={currentMarket}
      onChange={handleMarketChange}
      className={`w-[120px] px-3 py-2 border border-gray-300 rounded-md ${className}`}
      data-testid="market-switcher"
    >
      <option value={MARKETS.EN}>English</option>
      <option value={MARKETS.CA}>Canada</option>
    </select>
  );
};
