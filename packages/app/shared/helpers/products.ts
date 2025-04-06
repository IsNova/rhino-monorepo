import type { Product, ProductsResponse } from "@game-portal/types";

// Fetch all products from dummyjson.com API
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=20", {
      next: { revalidate: 300 },
    });
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

// Fetch a single product by ID from dummyjson.com API
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

// Fetch products by category
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

// Fetch featured products by IDs
export async function getFeaturedProducts(
  ids: (string | number)[]
): Promise<Product[]> {
  try {
    // Fetch products in parallel
    const productPromises = ids.map((id) => getProductById(id));
    const products = await Promise.all(productPromises);

    // Filter out null products
    return products.filter((product): product is Product => product !== null);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

// Search products
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
