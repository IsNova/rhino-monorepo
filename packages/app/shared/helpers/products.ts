import type { Product, ProductsResponse } from "@game-portal/types";

export async function getAllProducts(): Promise<Product[]> {
  try {
    console.log(`[${new Date().toISOString()}] Fetching products from API`);
    const response = await fetch("https://dummyjson.com/products?limit=20");
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    const data: ProductsResponse = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(
  id: string | number
): Promise<Product | null> {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch product: ${response.status}`);
    }
    const product: Product = await response.json();
    return product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch products by category: ${response.status}`
      );
    }
    const data: ProductsResponse = await response.json();
    return data.products;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }
}

export async function getFeaturedProducts(
  ids: (string | number)[]
): Promise<Product[]> {
  try {
    const productPromises = ids.map((id) => getProductById(id));
    const products = await Promise.all(productPromises);

    return products.filter((product): product is Product => product !== null);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error(`Failed to search products: ${response.status}`);
    }
    const data: ProductsResponse = await response.json();
    return data.products;
  } catch (error) {
    console.error(`Error searching products for "${query}":`, error);
    return [];
  }
}

export function shuffleTopN<T>(array: T[], n: number): T[] {
  if (!array || array.length === 0 || n <= 0) return array;

  const result = [...array];
  const topN = Math.min(n, result.length);

  for (let i = 0; i < topN - 1; i++) {
    const j = i + Math.floor(Math.random() * (topN - i));
    [result[i], result[j]] = [result[j], result[i]];
  }

  console.log(
    `[${new Date().toISOString()}] Shuffled the top ${topN} products for SEO freshness`
  );
  return result;
}

export async function getSEOFriendlyProducts(): Promise<Product[]> {
  const products = await getAllProducts();

  return shuffleTopN(products, 10);
}
