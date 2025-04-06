"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getBrandConfig } from "../../brand-config";
import { BrandId, MarketId } from "@game-portal/types";
import { ROUTES } from "@game-portal/constants";
import { useAuth } from "../../context/auth-context";

interface LoginFormProps {
  brandId: BrandId;
  marketId: MarketId;
  onLogin: (username: string, password: string) => Promise<any>;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  brandId,
  marketId,
  onLogin,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();
  const brandConfig = getBrandConfig(brandId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await onLogin(username, password);
      if (user) {
        login(user);
        router.push(`/${marketId}${ROUTES.PRODUCTS}`);
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2
          className="text-2xl font-semibold"
          style={{ color: brandConfig.primaryColor }}
        >
          Login
        </h2>
        <p className="text-sm text-gray-600">
          Enter your credentials to access your account
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="p-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white font-medium rounded-md transition-colors disabled:opacity-50"
            style={{ backgroundColor: brandConfig.primaryColor }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};
