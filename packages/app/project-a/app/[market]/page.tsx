import { BRANDS, MARKETS } from "@game-portal/constants";
import { MarketId } from "@game-portal/types";
import { getMarketConfig } from "../../../shared/brand-config";
import { Button } from "../../../shared/components";

export default function Home({ params }: { params: { market: string } }) {
  // Validate market parameter
  const market = params.market as MarketId;
  console.log("🚀 ~ Home ~ market:", market);
  if (market !== MARKETS.EN && market !== MARKETS.CA) {
  }

  const marketConfig = getMarketConfig(BRANDS.PROJECT_A, market);
  console.log("🚀 ~ Home ~ marketConfig:", marketConfig);
  //   const featuredProducts = getFeaturedProducts(marketConfig.featuredProducts);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4" style={{ color: "#4CAF50" }}>
        {marketConfig.welcomeMessage}
      </h1>
      <p className="text-xl mb-6">Discover amazing games tailored for you</p>
      <Button brandId={BRANDS.PROJECT_A} className="text-lg">
        Explore Games
      </Button>
    </div>
  );
}
