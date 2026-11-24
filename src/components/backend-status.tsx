"use client";
import { useEffect, useState } from "react";
import { getBackendHealth, type HealthData } from "@/lib/api";
type State = { status: "checking" } | { status: "connected"; data: HealthData } | { status: "disconnected"; message: string };
export function BackendStatus() {
 const [state, setState] = useState<State>({ status: "checking" });
 useEffect(() => {
  const controller = new AbortController();
  getBackendHealth(controller.signal).then(data => setState({ status: "connected", data })).catch((error: unknown) => {
   if (!controller.signal.aborted) setState({ status: "disconnected", message: error instanceof Error ? error.message : "Could not reach the API." });
  });
  return () => controller.abort();
 }, []);
 const connected = state.status === "connected";
 const title = state.status === "checking" ? "Checking backend connection" : connected ? "Backend is connected" : "Backend is not reachable";
 const detail = state.status === "checking" ? "Contacting the local API health endpoint…" : connected ? `API ready · Database ${state.data.database}` : state.message;
 return <section aria-live="polite" className="flex w-full max-w-xl items-start gap-4 rounded-2xl border border-stone-200 bg-white/80 p-5 shadow-sm">
  <span aria-hidden="true" className={`mt-1.5 size-2.5 shrink-0 rounded-full ${state.status === "checking" ? "animate-pulse bg-amber-500" : connected ? "bg-emerald-500" : "bg-rose-500"}`} />
  <div className="min-w-0"><h2 className="font-medium text-stone-900">{title}</h2><p className="mt-1 break-words text-sm leading-6 text-stone-600">{detail}</p></div>
  <span className="ml-auto shrink-0 rounded-full bg-stone-100 px-2.5 py-1 font-mono text-xs text-stone-600">API</span>
 </section>;
}
