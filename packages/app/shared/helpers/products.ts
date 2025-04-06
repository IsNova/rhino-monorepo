import { Product } from "@game-portal/types";

// Sample product data
const products: Product[] = [
  {
    id: "1",
    name: "Adventure Quest Deluxe",
    description:
      "The ultimate adventure game with stunning graphics and immersive gameplay.",
    price: 59.99,
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "adventure",
    stock: 25,
    extendedInfo: {
      manufacturer: "GameCo Studios",
      releaseDate: "2023-05-15",
      specifications: {
        platform: "PC, PlayStation 5, Xbox Series X",
        ageRating: "T for Teen",
        players: "1-4 players",
        onlineFeatures: "Online multiplayer, leaderboards",
      },
      reviews: [
        {
          user: "GameFan123",
          rating: 4.5,
          comment: "Amazing graphics and gameplay!",
        },
        {
          user: "AdventureSeeker",
          rating: 5,
          comment: "Best adventure game I've played this year.",
        },
      ],
    },
  },
  {
    id: "2",
    name: "Strategy Master 2025",
    description:
      "Build your empire and conquer the world in this strategic masterpiece.",
    price: 49.99,
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "strategy",
    stock: 15,
    extendedInfo: {
      manufacturer: "Strategy Games Inc.",
      releaseDate: "2024-01-10",
      specifications: {
        platform: "PC, Mac",
        ageRating: "E for Everyone",
        players: "1-8 players",
        onlineFeatures: "Online multiplayer, custom scenarios",
      },
      reviews: [
        {
          user: "StrategyKing",
          rating: 5,
          comment: "Deep gameplay and excellent AI!",
        },
        {
          user: "EmpireBuilder",
          rating: 4,
          comment: "Great game, but needs more unit variety.",
        },
      ],
    },
  },
  {
    id: "3",
    name: "Puzzle Solver Pro",
    description: "Exercise your brain with hundreds of challenging puzzles.",
    price: 29.99,
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "puzzle",
    stock: 50,
    extendedInfo: {
      manufacturer: "Brain Games Ltd.",
      releaseDate: "2023-11-20",
      specifications: {
        platform: "PC, Mobile, Switch",
        ageRating: "E for Everyone",
        players: "1 player",
        onlineFeatures: "Daily challenges, puzzle sharing",
      },
      reviews: [
        {
          user: "PuzzleMaster",
          rating: 4.5,
          comment: "Addictive puzzles that keep you thinking!",
        },
        {
          user: "BrainTrainer",
          rating: 5,
          comment: "Perfect for daily mental exercise.",
        },
      ],
    },
  },
  {
    id: "4",
    name: "Action Hero Unlimited",
    description:
      "Fast-paced action with stunning graphics and explosive gameplay.",
    price: 54.99,
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "action",
    stock: 20,
    extendedInfo: {
      manufacturer: "Action Games Corp",
      releaseDate: "2023-08-05",
      specifications: {
        platform: "PlayStation 5, Xbox Series X, PC",
        ageRating: "M for Mature",
        players: "1-16 players",
        onlineFeatures: "Online multiplayer, battle royale mode",
      },
      reviews: [
        {
          user: "ActionFan",
          rating: 5,
          comment: "Non-stop action and amazing graphics!",
        },
        {
          user: "GamerPro",
          rating: 4,
          comment: "Great gameplay but story could be better.",
        },
      ],
    },
  },
  {
    id: "5",
    name: "Sports Championship 2025",
    description:
      "The most realistic sports simulation with all major leagues and teams.",
    price: 59.99,
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "sports",
    stock: 30,
    extendedInfo: {
      manufacturer: "Sports Interactive",
      releaseDate: "2024-02-20",
      specifications: {
        platform: "PlayStation 5, Xbox Series X, PC",
        ageRating: "E for Everyone",
        players: "1-4 players locally, up to 22 online",
        onlineFeatures: "Online leagues, tournaments, team management",
      },
      reviews: [
        {
          user: "SportsFanatic",
          rating: 4.5,
          comment: "Most realistic sports game ever!",
        },
        {
          user: "LeagueChamp",
          rating: 5,
          comment: "The career mode is incredibly deep.",
        },
      ],
    },
  },
  {
    id: "6",
    name: "Racing Simulator Elite",
    description:
      "Experience the thrill of high-speed racing with realistic physics.",
    price: 49.99,
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "racing",
    stock: 18,
    extendedInfo: {
      manufacturer: "Speed Games",
      releaseDate: "2023-10-10",
      specifications: {
        platform: "PlayStation 5, Xbox Series X, PC",
        ageRating: "E for Everyone",
        players: "1-16 players",
        onlineFeatures: "Online races, tournaments, car customization",
      },
      reviews: [
        {
          user: "RacingPro",
          rating: 5,
          comment: "The physics are incredibly realistic!",
        },
        {
          user: "SpeedDemon",
          rating: 4.5,
          comment: "Best racing game in years.",
        },
      ],
    },
  },
];

// Get all products
export const getAllProducts = (): Product[] => {
  return products.map((product) => {
    // Don't return extended info in the list view
    const { extendedInfo, ...basicProduct } = product;
    return basicProduct;
  });
};

// Get product by ID
export const getProductById = (
  id: string,
  includeExtendedInfo = false
): Product | null => {
  const product = products.find((p) => p.id === id);
  if (!product) return null;

  if (!includeExtendedInfo) {
    const { extendedInfo, ...basicProduct } = product;
    return basicProduct;
  }

  return product;
};

// Get featured products by IDs
export const getFeaturedProducts = (ids: string[]): Product[] => {
  return ids
    .map((id) => getProductById(id))
    .filter((product): product is Product => product !== null);
};
