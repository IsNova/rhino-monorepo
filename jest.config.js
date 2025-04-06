const nextJest = require("next/jest");

// Create a custom Next.js configuration for testing
const createJestConfig = nextJest({
  // Point to the Next.js app directory
  dir: "./packages/app/project-a",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    // Map monorepo packages
    "^@game-portal/constants(.*)$": "<rootDir>/packages/constants$1",
    "^@game-portal/types(.*)$": "<rootDir>/packages/types$1",
    // Map UI components
    "^@/components/ui/(.*)$": "<rootDir>/packages/app/shared/components/ui/$1",
  },
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/e2e/",
  ],
  // Define test roots to include all packages
  roots: [
    "<rootDir>/packages/app/shared",
    "<rootDir>/packages/app/project-a",
    "<rootDir>/packages/app/project-b",
    "<rootDir>/packages/constants",
    "<rootDir>/packages/types",
  ],
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  // Add coverage configuration
  collectCoverageFrom: [
    "packages/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/dist/**",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  // Add test match patterns
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
  // Add verbose output for better debugging
  verbose: true,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
