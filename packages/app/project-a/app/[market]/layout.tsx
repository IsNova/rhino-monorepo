import type React from "react";
import { BRANDS, MARKETS } from "@game-portal/constants";
import { Header } from "../../../shared/components";
import type { MarketId } from "@game-portal/types";
import { notFound } from "next/navigation";
import { MarketProvider } from "packages/app/shared/context";

export default function MarketLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { market: string };
}) {
  const market = params.market as MarketId;
  if (market !== MARKETS.EN && market !== MARKETS.CA) {
    notFound();
  }

  return (
    <MarketProvider initialMarket={market}>
      <Header brandId={BRANDS.PROJECT_A} marketId={market} />
      <main className="container mx-auto p-4">{children}</main>
      <footer className="bg-gray-100 p-4 text-center">
        © 2025 Green Project. All rights reserved.
      </footer>
    </MarketProvider>
  );
}
