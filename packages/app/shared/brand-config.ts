import { BRANDS, MARKETS } from "@game-portal/constants";
import { BrandConfig, BrandId, MarketId } from "@game-portal/types";

// Brand-specific configurations
export const brandConfigs: Record<BrandId, BrandConfig> = {
  [BRANDS.PROJECT_A]: {
    name: "Green Project",
    primaryColor: "#4CAF50", // Green
    secondaryColor: "#8BC34A",
    logoUrl: "/logos/project-a-logo.svg",
    menuPosition: "top",
    buttonText: "Green Button",
    alertMessage: "Hello from Green Project",
    markets: {
      [MARKETS.EN]: {
        name: "English",
        locale: "en-US",
        currency: "USD",
        welcomeMessage:
          "Welcome to Green Project - Your gaming destination in the US!",
        featuredProducts: ["1", "2", "3"],
      },
      [MARKETS.CA]: {
        name: "Canada",
        locale: "en-CA",
        currency: "CAD",
        welcomeMessage:
          "Welcome to Green Project - Your gaming destination in Canada!",
        featuredProducts: ["2", "3", "4"],
      },
    },
  },
  [BRANDS.PROJECT_B]: {
    name: "Red Project",
    primaryColor: "#F44336", // Red
    secondaryColor: "#E91E63",
    logoUrl: "/logos/project-b-logo.svg",
    menuPosition: "left",
    buttonText: "Red Button",
    alertMessage: "Hello from Red Project",
    markets: {
      [MARKETS.EN]: {
        name: "English",
        locale: "en-US",
        currency: "USD",
        welcomeMessage: "Welcome to Red Project - Premium gaming in the US!",
        featuredProducts: ["1", "4", "5"],
      },
      [MARKETS.CA]: {
        name: "Canada",
        locale: "en-CA",
        currency: "CAD",
        welcomeMessage: "Welcome to Red Project - Premium gaming in Canada!",
        featuredProducts: ["3", "5", "6"],
      },
    },
  },
};

// Helper function to get brand config with fallback
export const getBrandConfig = (brandId: BrandId): BrandConfig => {
  // If the brandId is invalid or the config doesn't exist, return PROJECT_A config as default
  if (!brandId || !brandConfigs[brandId]) {
    console.warn(`Invalid brandId: ${brandId}, using default config`);
    return brandConfigs[BRANDS.PROJECT_A];
  }
  return brandConfigs[brandId];
};

// Helper function to get market config
export const getMarketConfig = (brandId: BrandId, marketId: MarketId) => {
  const brandConfig = getBrandConfig(brandId);

  // If the marketId is invalid or the config doesn't exist, return EN config as default
  if (!marketId || !brandConfig.markets[marketId]) {
    console.warn(`Invalid marketId: ${marketId}, using default market`);
    return brandConfig.markets[MARKETS.EN];
  }

  return brandConfig.markets[marketId];
};

// Brand themes based on brand configs
export const getBrandTheme = (brandId: BrandId) => {
  const config = getBrandConfig(brandId);

  return {
    colors: {
      primary: config.primaryColor,
      secondary: config.secondaryColor,
      background: brandId === BRANDS.PROJECT_A ? "#f5f5f5" : "#f8f8f8",
      text: brandId === BRANDS.PROJECT_A ? "#333333" : "#222222",
    },
    fonts: {
      main:
        brandId === BRANDS.PROJECT_A
          ? "Roboto, sans-serif"
          : "Open Sans, sans-serif",
      heading:
        brandId === BRANDS.PROJECT_A
          ? "Montserrat, sans-serif"
          : "Poppins, sans-serif",
    },
    borderRadius: brandId === BRANDS.PROJECT_A ? "4px" : "8px",
  };
};
