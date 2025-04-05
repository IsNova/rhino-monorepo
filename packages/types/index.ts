import type { BRANDS, PRODUCT_CATEGORIES } from "@game-portal/constants";

// Brand type
export type BrandId = (typeof BRANDS)[keyof typeof BRANDS];

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
