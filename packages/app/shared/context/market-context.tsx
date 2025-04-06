"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { MARKETS } from "@game-portal/constants";
import type { MarketId } from "@game-portal/types";

interface MarketContextType {
  currentMarket: MarketId;
  setCurrentMarket: (market: MarketId) => void;
  switchMarket: (market: MarketId) => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({
  children,
  initialMarket = MARKETS.EN,
}: {
  children: ReactNode;
  initialMarket?: MarketId;
}) {
  const [currentMarket, setCurrentMarket] = useState<MarketId>(initialMarket);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split("/");
    if (pathSegments.length > 1) {
      const marketFromPath = pathSegments[1];
      if (marketFromPath === MARKETS.EN || marketFromPath === MARKETS.CA) {
        setCurrentMarket(marketFromPath as MarketId);
      }
    }
  }, [pathname]);

  const switchMarket = (market: MarketId) => {
    setCurrentMarket(market);

    const pathSegments = pathname.split("/");
    pathSegments[1] = market;

    router.push(pathSegments.join("/"));
  };

  return (
    <MarketContext.Provider
      value={{
        currentMarket,
        setCurrentMarket,
        switchMarket,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error("useMarket must be used within a MarketProvider");
  }
  return context;
}
