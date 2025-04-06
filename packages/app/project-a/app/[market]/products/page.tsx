import { BRANDS } from "@game-portal/constants";
import { ProductCard } from "../../../../shared/components";
import { getAllProducts } from "../../../../shared/helpers";
import type { MarketId } from "@game-portal/types";

// Use ISG with revalidation every five minutes
export const revalidate = 300;

export default async function ProductsPage({
  params,
}: {
  params: { market: string };
}) {
  const market = params.market as MarketId;
  const products = await getAllProducts();
  console.log("🚀 ~ products: is being fetched every 5 min", products);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6" style={{ color: "#4CAF50" }}>
        Our Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            brandId={BRANDS.PROJECT_A}
            marketId={market}
          />
        ))}
      </div>
    </div>
  );
}
