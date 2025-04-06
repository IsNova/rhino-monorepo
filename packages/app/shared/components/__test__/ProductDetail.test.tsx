import type React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductDetail } from "../ProductDetail/ProductDetail";
import { BRANDS, MARKETS } from "@game-portal/constants";
import type { Product } from "@game-portal/types";

jest.mock("../../context/auth-context", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useAuth: () => ({
    isAuthenticated: true,
  }),
}));

jest.mock("../../brand-config", () => ({
  getBrandConfig: jest.fn(() => ({
    primaryColor: "#4CAF50",
    secondaryColor: "#8BC34A",
  })),
}));

describe("ProductDetail", () => {
  const mockProduct: Product = {
    id: 1,
    title: "Test Product",
    description: "Test Description",
    price: 99.99,
    discountPercentage: 10,
    rating: 4.5,
    stock: 5,
    brand: "Test Brand",
    category: "test-category",
    thumbnail: "/test-image.jpg",
    images: ["/image1.jpg", "/image2.jpg"],
    dimensions: {
      width: 10,
      height: 20,
      depth: 5,
    },
    weight: 2,
    warrantyInformation: "1 year warranty",
    returnPolicy: "30 days return",
    reviews: [
      {
        rating: 5,
        comment: "Great product!",
        date: "2023-01-01T00:00:00.000Z",
        reviewerName: "John Doe",
        reviewerEmail: "john@example.com",
      },
    ],
  };

  it("renders product details correctly", () => {
    render(
      <ProductDetail
        product={mockProduct}
        brandId={BRANDS.PROJECT_A}
        marketId={MARKETS.EN}
        formattedPrice="$99.99"
        formattedDiscountedPrice="$89.99"
      />
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("$89.99")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("10% OFF")).toBeInTheDocument();
    expect(screen.getByText(/Low Stock: Only 5 left/)).toBeInTheDocument();
    expect(screen.getByText("Brand:")).toBeInTheDocument();
    expect(screen.getByText("Test Brand")).toBeInTheDocument();
  });

  it("allows switching between product images", () => {
    render(
      <ProductDetail
        product={mockProduct}
        brandId={BRANDS.PROJECT_A}
        marketId={MARKETS.EN}
        formattedPrice="$99.99"
        formattedDiscountedPrice="$89.99"
      />
    );

    const mainImage = screen.getAllByAltText("Test Product")[0];
    expect(mainImage).toHaveAttribute("src", "/test-image.jpg");

    const firstGalleryImage = screen.getAllByAltText(
      "Test Product - Image 1"
    )[0];
    fireEvent.click(firstGalleryImage);

    expect(mainImage).toHaveAttribute("src", "/image1.jpg");
  });

  it("renders product specifications correctly", () => {
    render(
      <ProductDetail
        product={mockProduct}
        brandId={BRANDS.PROJECT_A}
        marketId={MARKETS.EN}
        formattedPrice="$99.99"
        formattedDiscountedPrice="$89.99"
      />
    );

    expect(screen.getByText("Product Specifications")).toBeInTheDocument();
    expect(screen.getByText("Dimensions")).toBeInTheDocument();
    expect(screen.getByText("10 × 20 × 5 cm")).toBeInTheDocument();
    expect(screen.getByText("Weight")).toBeInTheDocument();
    expect(screen.getByText("2 kg")).toBeInTheDocument();
    expect(screen.getByText("Warranty")).toBeInTheDocument();
    expect(screen.getByText("1 year warranty")).toBeInTheDocument();
    expect(screen.getByText("Return Policy")).toBeInTheDocument();
    expect(screen.getByText("30 days return")).toBeInTheDocument();
  });

  it("renders customer reviews for authenticated users", () => {
    render(
      <ProductDetail
        product={mockProduct}
        brandId={BRANDS.PROJECT_A}
        marketId={MARKETS.EN}
        formattedPrice="$99.99"
        formattedDiscountedPrice="$89.99"
      />
    );

    expect(screen.getByText("Customer Reviews")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Great product!")).toBeInTheDocument();

    const date = new Date("2023-01-01T00:00:00.000Z").toLocaleDateString();
    expect(screen.getByText(date)).toBeInTheDocument();
  });

  it("shows login message for unauthenticated users", () => {
    jest
      .spyOn(require("../../context/auth-context"), "useAuth")
      .mockImplementation(() => ({
        isAuthenticated: false,
      }));

    render(
      <ProductDetail
        product={mockProduct}
        brandId={BRANDS.PROJECT_A}
        marketId={MARKETS.EN}
        formattedPrice="$99.99"
        formattedDiscountedPrice="$89.99"
      />
    );

    expect(
      screen.getByText(
        "Log in to see customer reviews and detailed product information."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Login to See Reviews")).toBeInTheDocument();

    jest.restoreAllMocks();
  });
});
