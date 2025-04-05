import { MARKETS } from "@game-portal/constants";
import { MarketId } from "@game-portal/types";

export default function Home({ params }: { params: { market: string } }) {
  // Validate market parameter
  const market = params.market as MarketId;
  console.log("🚀 ~ Home ~ market:", market);
  if (market !== MARKETS.EN && market !== MARKETS.CA) {
  }

  //   const marketConfig = getMarketConfig(BRANDS.PROJECT_A, market);
  //   const featuredProducts = getFeaturedProducts(marketConfig.featuredProducts);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      This is Project B Home Page
      <h1>Welcome to Project B</h1>
    </div>
  );
}
