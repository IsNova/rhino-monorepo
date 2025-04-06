import { BRANDS } from "@game-portal/constants";
import { ProductCard } from "../../../../shared/components";
import { getSEOFriendlyProducts } from "../../../../shared/helpers";
import type { MarketId } from "@game-portal/types";

// Use ISG with revalidation every hour
export const revalidate = 300;

export default async function ProductsPage({
  params,
}: {
  params: { market: string };
}) {
  const market = params.market as MarketId;

  const products = await getSEOFriendlyProducts();

  console.log(
    `[${new Date().toISOString()}] Generated ProjectB products page for market: ${market}`
  );
  console.log(
    `[${new Date().toISOString()}] Total products: ${products.length}`
  );

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6" style={{ color: "#F44336" }}>
        Our Premium Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            brandId={BRANDS.PROJECT_B}
            marketId={market}
          />
        ))}
      </div>
    </div>
  );
}
