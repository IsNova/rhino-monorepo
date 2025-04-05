import type React from "react";
import Link from "next/link";
import type { BrandId, MarketId } from "@game-portal/types";
import { BRANDS, MARKETS, ROUTES } from "@game-portal/constants";
import { getBrandConfig, getMarketConfig } from "../../brand-config";
import { Button } from "../Button/Button";
// import { MarketSwitcher } from "../MarketSwitcher/MarketSwitcher";

interface HeaderProps {
  brandId: BrandId;
  marketId: MarketId;
}

export const Header: React.FC<HeaderProps> = ({ brandId, marketId }) => {
  // Make sure brandId and marketId are valid, default if not
  const validBrandId =
    brandId && (brandId === BRANDS.PROJECT_A || brandId === BRANDS.PROJECT_B)
      ? brandId
      : BRANDS.PROJECT_A;

  const validMarketId =
    marketId && (marketId === MARKETS.EN || marketId === MARKETS.CA)
      ? marketId
      : MARKETS.EN;

  const brandConfig = getBrandConfig(validBrandId);
  const marketConfig = getMarketConfig(validBrandId, validMarketId);

  // Ensure we have a valid config
  if (!brandConfig) {
    console.error(`Invalid brand configuration for brandId: ${validBrandId}`);
    return (
      <header className="w-full p-4 bg-gray-500">
        <div className="text-white font-bold text-xl">Game Portal</div>
      </header>
    );
  }

  // Determine menu position based on brand config
  const getMenuPositionClasses = () => {
    switch (brandConfig.menuPosition) {
      case "left":
        return "flex-col items-start";
      case "right":
        return "flex-col items-end";
      case "top":
      default:
        return "flex-row items-center justify-between";
    }
  };

  // Base path for the current market
  const basePath = `/${validMarketId}`;

  return (
    <header
      className={`w-full p-4 flex ${getMenuPositionClasses()}`}
      style={{ backgroundColor: brandConfig.secondaryColor }}
    >
      {/* <div className="flex items-center gap-4">
        <div className="text-white font-bold text-xl">{brandConfig.name}</div>
        <MarketSwitcher />
      </div> */}

      <nav
        className={`flex ${brandConfig.menuPosition === "top" ? "space-x-4" : "mt-4 space-y-2"}`}
      >
        <Link href={basePath} className="text-white hover:underline">
          Home
        </Link>
        <Link
          href={`${basePath}${ROUTES.PRODUCTS}`}
          className="text-white hover:underline"
        >
          Products
        </Link>
        <Link
          href={`${basePath}${ROUTES.LOGIN}`}
          className="text-white hover:underline"
        >
          Login
        </Link>
        <Button brandId={validBrandId} />
      </nav>
    </header>
  );
};
