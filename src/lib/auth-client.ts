import { createAuthClient } from "better-auth/react";
import { clientEnv } from "@/lib/env";

export const authClient = createAuthClient({
  baseURL: new URL("/api/auth", clientEnv.NEXT_PUBLIC_API_URL).toString(),
  fetchOptions: { credentials: "include" },
});
