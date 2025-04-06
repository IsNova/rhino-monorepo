import type { Metadata } from "next";
import { BRANDS } from "@game-portal/constants";
import { ProductCard } from "../../../../shared/components";
import { getSEOFriendlyProducts } from "../../../../shared/helpers";
import type { MarketId } from "@game-portal/types";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: { market: string };
}): Promise<Metadata> {
  const market = params.market as MarketId;

  return {
    title: `Premium Products | Red Project ${market.toUpperCase()}`,
    description:
      "Discover our premium collection of high-quality products. Updated regularly with fresh content.",
    openGraph: {
      title: `Premium Products | Red Project ${market.toUpperCase()}`,
      description:
        "Discover our premium collection of high-quality products. Updated regularly with fresh content.",
      type: "website",
      url: `/products`,
    },
  };
}

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

  const currentDate = new Date().toLocaleString();

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6" style={{ color: "#F44336" }}>
        Our Premium Products
      </h1>
      <p className="text-gray-600 mb-8">
        Discover our premium collection of high-quality products. Updated{" "}
        <time dateTime={new Date().toISOString()}>{currentDate}</time> for the
        freshest content.
      </p>
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
