import {
  getAllProducts,
  getProductById,
  getSEOFriendlyProducts,
  shuffleTopN,
} from "../products";
import type { Product, ProductsResponse } from "@game-portal/types";

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Product 1",
    description: "Description 1",
    price: 10.99,
    discountPercentage: 5,
    rating: 4.5,
    stock: 10,
    brand: "Brand A",
    category: "category1",
    thumbnail: "thumbnail1.jpg",
    images: ["image1.jpg", "image2.jpg"],
  },
  {
    id: 2,
    title: "Product 2",
    description: "Description 2",
    price: 20.99,
    discountPercentage: 10,
    rating: 4.2,
    stock: 5,
    brand: "Brand B",
    category: "category2",
    thumbnail: "thumbnail2.jpg",
    images: ["image3.jpg", "image4.jpg"],
  },
  {
    id: 3,
    title: "Product 3",
    description: "Description 3",
    price: 30.99,
    discountPercentage: 0,
    rating: 4.8,
    stock: 15,
    brand: "Brand C",
    category: "category1",
    thumbnail: "thumbnail3.jpg",
    images: ["image5.jpg", "image6.jpg"],
  },
];

const mockApiResponse: ProductsResponse = {
  products: mockProducts,
  total: 3,
  skip: 0,
  limit: 20,
};

describe("Product Helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === "https://dummyjson.com/products?limit=20") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockApiResponse),
        });
      } else if (url.includes("https://dummyjson.com/products/")) {
        const id = url.split("/").pop();
        const product = mockProducts.find((p) => p.id.toString() === id);

        if (product) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(product),
          });
        } else {
          return Promise.resolve({
            ok: false,
            status: 404,
          });
        }
      }

      return Promise.resolve({
        ok: false,
        status: 404,
      });
    });
  });

  describe("getAllProducts", () => {
    it("fetches products from the API", async () => {
      const products = await getAllProducts();

      expect(global.fetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products?limit=20"
      );
      expect(products).toEqual(mockProducts);
    });

    it("handles API errors gracefully", async () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          status: 500,
        });
      });

      const products = await getAllProducts();

      expect(products).toEqual([]);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("getProductById", () => {
    it("fetches a product by ID", async () => {
      const product = await getProductById(1);

      expect(global.fetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products/1"
      );
      expect(product).toEqual(mockProducts[0]);
    });

    it("returns null for non-existent product", async () => {
      const product = await getProductById(999);

      expect(global.fetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products/999"
      );
      expect(product).toBeNull();
    });

    it("handles API errors gracefully", async () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          status: 500,
        });
      });

      const product = await getProductById(1);

      expect(product).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("shuffleTopN", () => {
    it("shuffles the first N elements of an array", () => {
      const originalRandom = Math.random;
      Math.random = jest.fn().mockReturnValue(0.5);

      const result = shuffleTopN([1, 2, 3, 4, 5], 3);

      expect(result).not.toEqual([1, 2, 3, 4, 5]);
      expect(result.slice(3)).toEqual([4, 5]);

      Math.random = originalRandom;
    });

    it("handles empty arrays", () => {
      const result = shuffleTopN([], 3);
      expect(result).toEqual([]);
    });

    it("handles N larger than array length", () => {
      const array = [1, 2, 3];
      const result = shuffleTopN(array, 5);

      expect(result).not.toBe(array);
      expect(result.sort()).toEqual([1, 2, 3]);
    });

    it("handles N <= 0", () => {
      const array = [1, 2, 3];
      const result = shuffleTopN(array, 0);

      expect(result).toEqual(array);
    });
  });

  describe("getSEOFriendlyProducts", () => {
    it("returns shuffled products for SEO freshness", async () => {
      const shuffleSpy = jest.spyOn({ shuffleTopN }, "shuffleTopN");

      await getSEOFriendlyProducts();

      expect(global.fetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products?limit=20"
      );
      expect(shuffleSpy).toHaveBeenCalledWith(mockProducts, 10);

      shuffleSpy.mockRestore();
    });

    it("logs the shuffle operation", async () => {
      await getSEOFriendlyProducts();

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("Shuffled the top")
      );
    });
  });
});
