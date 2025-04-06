// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    pathname: "/en",
  }),
  usePathname: () => "/en",
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({ market: "en" }),
  redirect: jest.fn(),
  notFound: jest.fn(),
}));

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href, ...rest }) => (
    <a href={href} {...rest} data-testid="next-link">
      {children}
    </a>
  );
});

// Mock localStorage
Object.defineProperty(window, "localStorage", {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// Mock console methods to keep test output clean
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

// Set environment variables for testing
process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000"; // For ProjectA tests
process.env.NEXT_PUBLIC_PROJECT_B_URL = "http://localhost:3001"; // For ProjectB tests
process.env.CI = "false";

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});
