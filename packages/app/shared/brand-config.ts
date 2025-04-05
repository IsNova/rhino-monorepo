import { BRANDS } from "@game-portal/constants";
import type { BrandConfig, BrandId } from "@game-portal/types";

// Brand-specific configurations
export const brandConfigs: Record<BrandId, BrandConfig> = {
  [BRANDS.PROJECT_A]: {
    name: "Project A",
    primaryColor: "#4CAF50", // Green
    secondaryColor: "#8BC34A",
    logoUrl: "/logos/project-a-logo.svg",
    menuPosition: "top",
    buttonText: "Green Button",
    alertMessage: "Hello from Project A",
  },
  [BRANDS.PROJECT_B]: {
    name: "Project B",
    primaryColor: "#F44336", // Red
    secondaryColor: "#E91E63",
    logoUrl: "/logos/project-b-logo.svg",
    menuPosition: "left",
    buttonText: "Red Button",
    alertMessage: "Hello from Project B",
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
