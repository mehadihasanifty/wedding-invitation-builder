import { z } from "zod";
export const clientEnv = z.object({ NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:5000") }).parse({ NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL });
