"use client";

import { useEffect } from "react";

/**
 * ServiceWorkerRegistration — Registers the PWA service worker on mount.
 * This enables offline caching, fast loading, and installability.
 */
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered:", registration.scope);
        })
        .catch((err) => {
          console.log("SW registration failed:", err);
        });
    }
  }, []);

  return null;
}
