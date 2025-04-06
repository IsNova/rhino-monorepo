"use client";
import { render, screen, fireEvent } from "@testing-library/react";
import { MarketSwitcher } from "../MarketSwitcher/MarketSwitcher";
import { MARKETS } from "@game-portal/constants";
import "@testing-library/jest-dom";

jest.mock("../../context/market-context", () => ({
  useMarket: jest.fn(() => ({
    currentMarket: MARKETS.EN,
    switchMarket: jest.fn(),
  })),
}));

describe("MarketSwitcher", () => {
  it("renders with the current market", () => {
    render(<MarketSwitcher />);

    const selectElement = screen.getByTestId("market-switcher");
    expect(selectElement).toHaveValue(MARKETS.EN);
  });

  it("calls switchMarket when a new market is selected", () => {
    const mockSwitchMarket = jest.fn();
    jest
      .spyOn(require("../../context/market-context"), "useMarket")
      .mockImplementation(() => ({
        currentMarket: MARKETS.EN,
        switchMarket: mockSwitchMarket,
      }));

    render(<MarketSwitcher />);

    const selectElement = screen.getByTestId("market-switcher");
    fireEvent.change(selectElement, { target: { value: MARKETS.CA } });

    expect(mockSwitchMarket).toHaveBeenCalledWith(MARKETS.CA);

    jest.restoreAllMocks();
  });

  it("applies custom className", () => {
    render(<MarketSwitcher className="custom-class" />);

    const selectElement = screen.getByTestId("market-switcher");
    expect(selectElement).toHaveClass("custom-class");
  });
});
