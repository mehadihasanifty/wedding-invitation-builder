import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { clientEnv } from "@/lib/env";

const sessionSchema = z.object({
  user: z.object({ id: z.string(), name: z.string(), email: z.string().email(), image: z.string().nullable().optional() }),
}).nullable();

export async function getServerUser() {
  const cookie = (await headers()).get("cookie");
  if (!cookie) return null;
  try {
    const response = await fetch(new URL("/api/auth/get-session", clientEnv.NEXT_PUBLIC_API_URL), {
      headers: { cookie }, cache: "no-store", signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const user = sessionSchema.parse(await response.json())?.user ?? null;
    return user;
  } catch { return null; }
}

export async function requireServerUser() {
  const user = await getServerUser();
  if (!user) redirect("/login?callbackURL=%2Fdashboard");
  return user;
}
