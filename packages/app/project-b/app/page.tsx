import { redirect } from "next/navigation";
import { MARKETS } from "@game-portal/constants";

export default function Home() {
  redirect(`/${MARKETS.CA}`);

  return null;
}
