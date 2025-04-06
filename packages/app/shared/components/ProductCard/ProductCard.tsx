import type React from "react";
import Link from "next/link";
import type { BrandId, MarketId, Product } from "@game-portal/types";
import { ROUTES } from "@game-portal/constants";
import { getBrandConfig, getMarketConfig } from "../../brand-config";

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
        src={product.thumbnail || "/placeholder.svg?height=300&width=400"}
        alt={product.title}
      />
      <div className="px-6 py-4">
        <div
          className="font-bold text-xl mb-2"
          style={{ color: brandConfig.primaryColor }}
        >
          {product.title}
        </div>
        <p className="text-gray-700 text-base mb-2">{product.description}</p>
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${star <= Math.round(product.rating) ? "text-yellow-500" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.rating})</span>
        </div>
        <div className="flex items-center">
          {discountedPrice ? (
            <>
              <p className="text-lg font-bold">{formattedDiscountedPrice}</p>
              <p className="text-sm text-gray-500 line-through ml-2">
                {formattedPrice}
              </p>
              <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                {Math.round(product.discountPercentage)}% OFF
              </span>
            </>
          ) : (
            <p className="text-lg font-bold">{formattedPrice}</p>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {product.stock > 0 ? (
            product.stock < 10 ? (
              <span className="text-orange-500">
                Low Stock: {product.stock} left
              </span>
            ) : (
              <span>In stock: {product.stock}</span>
            )
          ) : (
            <span className="text-red-500">Out of stock</span>
          )}
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
