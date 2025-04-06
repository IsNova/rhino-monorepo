import { BRANDS, MARKETS } from "@game-portal/constants";
import { MarketId } from "@game-portal/types";
import { getMarketConfig } from "packages/app/shared/brand-config";
import { Button, ProductCard } from "packages/app/shared/components";
import { getFeaturedProducts } from "../../../shared/helpers";

export default function Home({ params }: { params: { market: string } }) {
  // Validate market parameter
  const market = params.market as MarketId;
  console.log("🚀 ~ Home ~ market:", market);
  if (market !== MARKETS.EN && market !== MARKETS.CA) {
  }

  const marketConfig = getMarketConfig(BRANDS.PROJECT_A, market);
  const featuredProducts = getFeaturedProducts(marketConfig.featuredProducts);

  return (
    <div className="space-y-8">
      <section className="py-8">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#F44336" }}>
          {marketConfig.welcomeMessage}
        </h1>
        <p className="text-xl mb-6">Discover premium games tailored for you</p>
        <Button brandId={BRANDS.PROJECT_B} className="text-lg">
          Explore Games
        </Button>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              brandId={BRANDS.PROJECT_B}
              marketId={market}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
