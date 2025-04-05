import { redirect } from "next/navigation";
import { MARKETS } from "@game-portal/constants";

// This ensures the page is rendered on the server and redirects immediately
export default function Home() {
  // Using redirect from next/navigation for server-side redirects
  redirect(`/${MARKETS.EN}`);

  // This part won't execute due to the redirect, but is needed for TypeScript
  return null;
}
