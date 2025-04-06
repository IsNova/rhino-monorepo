"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BRANDS } from "@game-portal/constants";
import { getProductById } from "../../../../../shared/helpers";
import {
  getBrandConfig,
  getMarketConfig,
} from "../../../../../shared/brand-config";
import type { Product, MarketId } from "@game-portal/types";
import {
  AuthProvider,
  useAuth,
} from "packages/app/shared/context/auth-context";

export default function ProductDetailPage() {
  return (
    <AuthProvider>
      <ProductDetailContent />
    </AuthProvider>
  );
}

function ProductDetailContent() {
  const params = useParams();
  const market = params.market as MarketId;
  const id = params.id as string;

  const { isAuthenticated } = useAuth();
  console.log("🚀 ~ ProductDetailContent ~ isAuthenticated:", isAuthenticated);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const brandConfig = getBrandConfig(BRANDS.PROJECT_A);
  const marketConfig = getMarketConfig(BRANDS.PROJECT_A, market);

  useEffect(() => {
    // Fetch product with extended info if user is authenticated
    const fetchedProduct = getProductById(id, isAuthenticated);
    setProduct(fetchedProduct);
    setIsLoading(false);
  }, [id, isAuthenticated]);

  if (isLoading) {
    return <div className="py-8 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="py-8 text-center">Product not found</div>;
  }

  // Format price according to market locale and currency
  const formattedPrice = new Intl.NumberFormat(marketConfig.locale, {
    style: "currency",
    currency: marketConfig.currency,
  }).format(product.price);

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              src={product.imageUrl || "/placeholder.svg?height=500&width=500"}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: brandConfig.primaryColor }}
            >
              {product.name}
            </h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-2xl font-bold mb-2">{formattedPrice}</p>
            <p className="text-sm text-gray-500 mb-4">
              {product.stock > 0
                ? `In stock: ${product.stock}`
                : "Out of stock"}
            </p>
            <button
              className="px-6 py-2 text-white rounded"
              style={{ backgroundColor: brandConfig.primaryColor }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Extended info for authenticated users */}
        {isAuthenticated && product.extendedInfo && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p>
                <strong>Manufacturer:</strong>{" "}
                {product.extendedInfo.manufacturer}
              </p>
              <p>
                <strong>Release Date:</strong>{" "}
                {product.extendedInfo.releaseDate}
              </p>

              <h3 className="text-xl font-bold mt-4 mb-2">Specifications</h3>
              <ul className="list-disc pl-5">
                {Object.entries(product.extendedInfo.specifications).map(
                  ([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  )
                )}
              </ul>

              <h3 className="text-xl font-bold mt-4 mb-2">Reviews</h3>
              {product.extendedInfo.reviews.map((review, index) => (
                <div key={index} className="border-b pb-3 mb-3 last:border-0">
                  <div className="flex justify-between">
                    <p className="font-bold">{review.user}</p>
                    <p>Rating: {review.rating}/5</p>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message for non-authenticated users */}
        {!isAuthenticated && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center">
            <p>Log in to see detailed product specifications and reviews.</p>
          </div>
        )}
      </div>
    </div>
  );
}
