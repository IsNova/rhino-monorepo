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
  const validBrandId =
    brandId && (brandId === BRANDS.PROJECT_A || brandId === BRANDS.PROJECT_B)
      ? brandId
      : BRANDS.PROJECT_A;

  const brandConfig = getBrandConfig(validBrandId);

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

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
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
