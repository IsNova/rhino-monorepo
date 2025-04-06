import type React from "react";
import Link from "next/link";
import { getBrandConfig, getMarketConfig } from "../../brand-config";
import { BrandId, MarketId, Product } from "@game-portal/types";
import { ROUTES } from "@game-portal/constants";

interface ProductCardProps {
  product: Product;
  brandId: BrandId;
  marketId: MarketId;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  brandId,
  marketId,
}) => {
  const brandConfig = getBrandConfig(brandId);
  const marketConfig = getMarketConfig(brandId, marketId);

  // Format price according to market locale and currency
  const formattedPrice = new Intl.NumberFormat(marketConfig.locale, {
    style: "currency",
    currency: marketConfig.currency,
  }).format(product.price);

  return (
    <div
      className="rounded overflow-hidden shadow-lg"
      style={{
        borderRadius: brandId === "project-a" ? "4px" : "8px",
        borderColor: brandConfig.primaryColor,
        borderWidth: "1px",
      }}
    >
      <img
        className="w-full h-48 object-cover"
        src={product.imageUrl || "/placeholder.svg?height=300&width=400"}
        alt={product.name}
      />
      <div className="px-6 py-4">
        <div
          className="font-bold text-xl mb-2"
          style={{ color: brandConfig.primaryColor }}
        >
          {product.name}
        </div>
        <p className="text-gray-700 text-base mb-2">{product.description}</p>
        <p className="text-lg font-bold">{formattedPrice}</p>
        <p className="text-sm text-gray-500">
          {product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}
        </p>
      </div>
      <div className="px-6 pt-2 pb-4">
        <Link
          href={`/${marketId}${ROUTES.PRODUCT_DETAIL}/${product.id}`}
          className="inline-block px-4 py-2 text-white rounded"
          style={{ backgroundColor: brandConfig.primaryColor }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
