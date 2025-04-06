import React from "react";
import { BRANDS } from "@game-portal/constants";
import { MarketId } from "@game-portal/types";
import { LoginForm } from "packages/app/shared/components";
import { AuthProvider } from "packages/app/shared/context/auth-context";
import { authenticateUser } from "packages/app/shared/helpers";

const Page = ({ params }: { params: { market: string } }) => {
  const market = params.market as MarketId;

  // Server action for authentication
  async function handleLogin(username: string, password: string) {
    "use server";
    // In a real app, you would use a more secure authentication method
    return authenticateUser(username, password);
  }
  return (
    <AuthProvider>
      <div className="py-8">
        <h1
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: "#4CAF50" }}
        >
          Login to Your Account
        </h1>
        <LoginForm
          brandId={BRANDS.PROJECT_A}
          marketId={market}
          onLogin={handleLogin}
        />
      </div>
    </AuthProvider>
  );
};

export default Page;
