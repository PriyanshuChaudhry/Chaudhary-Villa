"use client";

import { useState, useEffect } from "react";
import { rentalSpaces } from "@/data/propertyData";
import {
  fetchLiveAvailabilityMap,
  applyAvailabilityToSpaces,
} from "./availabilitySync";

/**
 * useLiveAvailability Hook
 * Loads initial static rentalSpaces immediately, then asynchronously checks
 * for live owner overrides without delaying initial render.
 */
export function useLiveAvailability(initialSpaces = rentalSpaces) {
  const [spaces, setSpaces] = useState(initialSpaces);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function syncAvailability() {
      try {
        const liveMap = await fetchLiveAvailabilityMap(initialSpaces);
        if (isMounted && liveMap) {
          const updated = applyAvailabilityToSpaces(initialSpaces, liveMap);
          setSpaces(updated);
          setIsLive(true);
        }
      } catch {
        // Fallback safely to initial static data
      }
    }

    syncAvailability();

    return () => {
      isMounted = false;
    };
  }, [initialSpaces]);

  return { spaces, isLive };
}
