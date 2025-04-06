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
    title: `Our Products | Green Project ${market.toUpperCase()}`,
    description:
      "Browse our collection of high-quality products. Updated regularly with fresh content.",
    openGraph: {
      title: `Our Products | Green Project ${market.toUpperCase()}`,
      description:
        "Browse our collection of high-quality products. Updated regularly with fresh content.",
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
    `[${new Date().toISOString()}] Generated ProjectA products page for market: ${market}`
  );
  console.log(
    `[${new Date().toISOString()}] Total products: ${products.length}`
  );

  const currentDate = new Date().toLocaleString();

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6" style={{ color: "#4CAF50" }}>
        Our Products
      </h1>
      <p className="text-gray-600 mb-8">
        Browse our collection of high-quality products. Updated{" "}
        <time dateTime={new Date().toISOString()}>{currentDate}</time> for the
        freshest content.
      </p>
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
