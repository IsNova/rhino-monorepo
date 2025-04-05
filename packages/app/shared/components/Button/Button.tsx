"use client";

import type React from "react";
import type { BrandId } from "@game-portal/types";
import { BRANDS } from "@game-portal/constants";
import { getBrandConfig } from "../../brand-config";

interface ButtonProps {
  brandId: BrandId;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  brandId,
  children,
  onClick,
  className = "",
}) => {
  // Make sure brandId is valid, default to PROJECT_A if not
  const validBrandId =
    brandId && (brandId === BRANDS.PROJECT_A || brandId === BRANDS.PROJECT_B)
      ? brandId
      : BRANDS.PROJECT_A;

  const brandConfig = getBrandConfig(validBrandId);

  // Ensure we have a valid config
  if (!brandConfig) {
    console.error(`Invalid brand configuration for brandId: ${validBrandId}`);
    return (
      <button
        className={`px-4 py-2 rounded font-medium text-white bg-gray-500 ${className}`}
      >
        Button
      </button>
    );
  }

  // Default onClick handler based on brand
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior shows brand-specific alert
      alert(brandConfig.alertMessage);
    }
  };

  return (
    <button
      className={`px-4 py-2 rounded font-medium text-white transition-colors hover:opacity-90 ${className}`}
      style={{
        backgroundColor: brandConfig.primaryColor,
        borderRadius: validBrandId === BRANDS.PROJECT_A ? "4px" : "8px",
      }}
      onClick={handleClick}
    >
      {children || brandConfig.buttonText}
    </button>
  );
};
