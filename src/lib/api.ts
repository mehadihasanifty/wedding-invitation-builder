import { clientEnv } from "@/lib/env";
export interface ApiEnvelope<T> { success: boolean; message: string; data: T }
export interface HealthData { status: "ok" | "degraded"; database: "connected" | "disconnected"; timestamp: string }
export async function getBackendHealth(signal?: AbortSignal) {
 const response = await fetch(new URL("/api/health", clientEnv.NEXT_PUBLIC_API_URL), { cache: "no-store", signal });
 const body = await response.json() as ApiEnvelope<HealthData>;
 if (!response.ok || !body.success) throw new Error(body.message || "The backend health check failed.");
 return body.data;
}
