import { getGoogleUrl } from "@/lib/google-auth";
import { redirect } from "next/navigation";

export async function GET() {
  const url = getGoogleUrl();
  redirect(url);
}
