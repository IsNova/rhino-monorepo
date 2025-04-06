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

// Product interface
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  extendedInfo?: {
    manufacturer: string;
    releaseDate: string;
    specifications: Record<string, string>;
    reviews: Array<{
      user: string;
      rating: number;
      comment: string;
    }>;
  };
}
