import type {
  BRANDS,
  MARKETS,
  PRODUCT_CATEGORIES,
} from "@game-portal/constants";

// Brand type
export type BrandId = (typeof BRANDS)[keyof typeof BRANDS];

// Market type
export type MarketId = (typeof MARKETS)[keyof typeof MARKETS];

// Game category type
export type GameCategory =
  (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES];

// Game interface
export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: GameCategory;
}

// Brand configuration interface
export interface BrandConfig {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  menuPosition: "top" | "left" | "right";
  buttonText: string;
  alertMessage: string;
  markets: Record<MarketId, MarketConfig>;
}

// Market configuration interface
export interface MarketConfig {
  name: string;
  locale: string;
  currency: string;
  welcomeMessage: string;
  featuredProducts: string[];
}

// Brand theme interface
export interface BrandTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  fonts: {
    main: string;
    heading: string;
  };
  borderRadius: string;
}

// User interface
export interface User {
  id: string;
  username: string;
  password: string; // In a real app, this would be hashed
  name: string;
  email: string;
}

// Updated Product interface to match dummyjson.com API
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags?: string[];
  sku?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
}

// API response types
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
