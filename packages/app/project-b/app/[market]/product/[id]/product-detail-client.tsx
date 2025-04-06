"use client";

import { useState } from "react";
import { getBrandConfig } from "../../../../../shared/brand-config";
import type { BrandId, MarketId, Product } from "@game-portal/types";
import {
  AuthProvider,
  useAuth,
} from "packages/app/shared/context/auth-context";

interface ProductDetailClientProps {
  product: Product;
  brandId: BrandId;
  marketId: MarketId;
  formattedPrice: string;
  formattedDiscountedPrice: string | null;
}

export default function ProductDetailClient({
  product,
  brandId,
  marketId,
  formattedPrice,
  formattedDiscountedPrice,
}: ProductDetailClientProps) {
  return (
    <AuthProvider>
      <ProductDetailContent
        product={product}
        brandId={brandId}
        marketId={marketId}
        formattedPrice={formattedPrice}
        formattedDiscountedPrice={formattedDiscountedPrice}
      />
    </AuthProvider>
  );
}

function ProductDetailContent({
  product,
  brandId,
  marketId,
  formattedPrice,
  formattedDiscountedPrice,
}: ProductDetailClientProps) {
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const brandConfig = getBrandConfig(brandId);

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="mb-4">
              <img
                src={selectedImage || product.thumbnail}
                alt={product.title}
                className="w-full h-auto rounded-lg object-cover"
                style={{ maxHeight: "400px", borderRadius: "8px" }}
              />
            </div>
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} - Image ${index + 1}`}
                    className={`w-full h-20 object-cover rounded-lg cursor-pointer border-2 ${
                      selectedImage === image
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    style={{
                      borderColor:
                        selectedImage === image
                          ? brandConfig.primaryColor
                          : "transparent",
                      borderRadius: "8px",
                    }}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: brandConfig.primaryColor }}
            >
              {product.title}
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= Math.round(product.rating) ? "text-yellow-500" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.rating})</span>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                {formattedDiscountedPrice ? (
                  <>
                    <p className="text-2xl font-bold">
                      {formattedDiscountedPrice}
                    </p>
                    <p className="text-lg text-gray-500 line-through ml-3">
                      {formattedPrice}
                    </p>
                    <span className="ml-3 bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded-lg">
                      {Math.round(product.discountPercentage)}% OFF
                    </span>
                  </>
                ) : (
                  <p className="text-2xl font-bold">{formattedPrice}</p>
                )}
              </div>

              <p className="text-sm">
                {product.stock > 0 ? (
                  product.stock < 10 ? (
                    <span className="text-orange-500 font-semibold">
                      Low Stock: Only {product.stock} left
                    </span>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      In Stock: {product.stock} available
                    </span>
                  )
                ) : (
                  <span className="text-red-500 font-semibold">
                    Out of stock
                  </span>
                )}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">Brand:</span>
                <span>{product.brand}</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">Category:</span>
                <span className="capitalize">{product.category}</span>
              </div>
              {product.sku && (
                <div className="flex items-center">
                  <span className="font-semibold mr-2">SKU:</span>
                  <span>{product.sku}</span>
                </div>
              )}
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                className="px-6 py-2 text-white rounded-lg flex-1"
                style={{ backgroundColor: brandConfig.primaryColor }}
                disabled={product.stock <= 0}
              >
                Add to Cart
              </button>
              <button
                className="px-4 py-2 border rounded-lg"
                style={{
                  borderColor: brandConfig.primaryColor,
                  color: brandConfig.primaryColor,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs - Only visible for authenticated users or basic info for all */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <a
                href="#"
                className="border-b-2 border-primary py-4 px-1 text-center font-medium text-sm sm:text-base w-1/3"
                style={{
                  borderColor: brandConfig.primaryColor,
                  color: brandConfig.primaryColor,
                }}
              >
                Product Details
              </a>
              <a
                href="#"
                className="border-b-2 border-transparent py-4 px-1 text-center font-medium text-gray-500 hover:text-gray-700 text-sm sm:text-base w-1/3"
              >
                Shipping Info
              </a>
              <a
                href="#"
                className="border-b-2 border-transparent py-4 px-1 text-center font-medium text-gray-500 hover:text-gray-700 text-sm sm:text-base w-1/3"
              >
                Reviews
              </a>
            </nav>
          </div>

          <div className="py-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Product Specifications
                </h3>
                <div className="space-y-2">
                  {product.dimensions && (
                    <div className="grid grid-cols-2 border-b pb-2">
                      <span className="text-gray-600">Dimensions</span>
                      <span>
                        {product.dimensions.width} × {product.dimensions.height}{" "}
                        × {product.dimensions.depth} cm
                      </span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="grid grid-cols-2 border-b pb-2">
                      <span className="text-gray-600">Weight</span>
                      <span>{product.weight} kg</span>
                    </div>
                  )}
                  {product.warrantyInformation && (
                    <div className="grid grid-cols-2 border-b pb-2">
                      <span className="text-gray-600">Warranty</span>
                      <span>{product.warrantyInformation}</span>
                    </div>
                  )}
                  {product.returnPolicy && (
                    <div className="grid grid-cols-2 border-b pb-2">
                      <span className="text-gray-600">Return Policy</span>
                      <span>{product.returnPolicy}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                {isAuthenticated &&
                product.reviews &&
                product.reviews.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Customer Reviews
                    </h3>
                    <div className="space-y-4">
                      {product.reviews.map((review, index) => (
                        <div key={index} className="border-b pb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">
                              {review.reviewerName}
                            </span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-4 h-4 ${star <= review.rating ? "text-yellow-500" : "text-gray-300"}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                          <p>{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : !isAuthenticated ? (
                  <div
                    className="bg-gray-50 p-6 rounded-lg text-center"
                    style={{ borderRadius: "8px" }}
                  >
                    <p className="mb-4">
                      Log in to see customer reviews and detailed product
                      information.
                    </p>
                    <button
                      className="px-4 py-2 text-white rounded-lg"
                      style={{ backgroundColor: brandConfig.primaryColor }}
                    >
                      Login to See Reviews
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Customer Reviews
                    </h3>
                    <p>No reviews yet for this product.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
