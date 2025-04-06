import { notFound } from "next/navigation";
import { BRANDS } from "@game-portal/constants";
import { getProductById } from "../../../../../shared/helpers";
import {
  getBrandConfig,
  getMarketConfig,
} from "../../../../../shared/brand-config";
import type { MarketId } from "@game-portal/types";
import ProductDetailClient from "./product-detail-client";

// Use SSR for product detail pages
export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: { market: string; id: string };
}) {
  const market = params.market as MarketId;
  const id = params.id;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const brandConfig = getBrandConfig(BRANDS.PROJECT_B);
  const marketConfig = getMarketConfig(BRANDS.PROJECT_B, market);

  const formattedPrice = new Intl.NumberFormat(marketConfig.locale, {
    style: "currency",
    currency: marketConfig.currency,
  }).format(product.price);

  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : null;

  const formattedDiscountedPrice = discountedPrice
    ? new Intl.NumberFormat(marketConfig.locale, {
        style: "currency",
        currency: marketConfig.currency,
      }).format(discountedPrice)
    : null;

  return (
    <ProductDetailClient
      product={product}
      brandId={BRANDS.PROJECT_B}
      marketId={market}
      formattedPrice={formattedPrice}
      formattedDiscountedPrice={formattedDiscountedPrice}
    />
  );
}
