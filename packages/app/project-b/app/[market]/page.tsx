import { BRANDS, MARKETS } from "@game-portal/constants";
import { Button } from "../../../shared/components";
import { getMarketConfig } from "../../../shared/brand-config";
import { getFeaturedProducts } from "../../../shared/helpers";
import { ProductCard } from "../../../shared/components";
import type { MarketId } from "@game-portal/types";
import { notFound } from "next/navigation";

// Use ISG with revalidation every hour
export const revalidate = 300;

export default async function MarketHomePage({
  params,
}: {
  params: { market: string };
}) {
  // Validate market parameter
  const market = params.market as MarketId;
  if (market !== MARKETS.EN && market !== MARKETS.CA) {
    notFound();
  }

  const marketConfig = getMarketConfig(BRANDS.PROJECT_B, market);
  const featuredProducts = await getFeaturedProducts(
    marketConfig.featuredProducts
  );

  return (
    <div className="space-y-8">
      <section className="py-8">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#F44336" }}>
          {marketConfig.welcomeMessage}
        </h1>
        <p className="text-xl mb-6">
          Discover premium products tailored for you
        </p>
        <Button brandId={BRANDS.PROJECT_B} className="text-lg">
          Explore Products
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
