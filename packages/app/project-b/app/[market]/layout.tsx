import type React from "react";
import { BRANDS, MARKETS } from "@game-portal/constants";
import { Header } from "../../../shared/components";
import type { MarketId } from "@game-portal/types";
import { notFound } from "next/navigation";

export default function MarketLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { market: string };
}) {
  // Validate market parameter
  const market = params.market as MarketId;
  if (market !== MARKETS.EN && market !== MARKETS.CA) {
    notFound();
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-64">
        <Header brandId={BRANDS.PROJECT_B} marketId={market} />
      </div>
      <div className="flex-1">
        <main className="p-4">{children}</main>
        <footer className="bg-gray-100 p-4 text-center">
          © 2025 Red Project. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
