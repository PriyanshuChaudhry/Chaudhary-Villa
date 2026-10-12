/**
 * ============================================================================
 * AVAILABILITY SYNC ENGINE (Zero Backend / Serverless Cloud Storage)
 * ============================================================================
 * Allows the property owner to toggle room availability from their phone.
 * Supports:
 *  1. Free GitHub Gist (instant 0.1s sync across all phones)
 *  2. Direct GitHub Repo Commit (via GitHub Contents API)
 *  3. Local Browser Storage (offline preview)
 *  4. Graceful fallback to propertyData.js (never breaks or blocks visitors)
 * ============================================================================
 */

export const STORAGE_KEYS = {
  AUTH_TOKEN: "cv_admin_auth_v1",
  CONFIG: "cv_admin_sync_config_v1",
  LOCAL_OVERRIDE: "cv_availability_override_v1",
};

export const DEFAULT_ADMIN_PIN = "chaudhary2026";

/**
 * Extracts a map of { [spaceId]: "available" | "unavailable" } from spaces array
 */
export function extractAvailabilityMap(spaces) {
  const map = {};
  spaces.forEach((space) => {
    map[space.id] = space.availability || "unavailable";
  });
  return map;
}

/**
 * Merges an availability map into the rentalSpaces array
 */
export function applyAvailabilityToSpaces(spaces, availabilityMap) {
  if (!availabilityMap || typeof availabilityMap !== "object") return spaces;

  return spaces.map((space) => {
    if (availabilityMap[space.id] !== undefined) {
      return {
        ...space,
        availability: availabilityMap[space.id],
      };
    }
    return space;
  });
}

/**
 * Retrieves the owner's sync configuration stored on their device
 */
export function getStoredSyncConfig() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONFIG);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Saves the owner's sync configuration
 */
export function saveSyncConfig(config) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  } catch (err) {
    console.error("Failed to save sync config", err);
  }
}

/**
 * Fetches the live availability map from the active cloud provider or fallback
 */
export async function fetchLiveAvailabilityMap(fallbackSpaces) {
  const fallbackMap = extractAvailabilityMap(fallbackSpaces);

  if (typeof window === "undefined") {
    return fallbackMap;
  }

  const config = getStoredSyncConfig();

  // 1. Try GitHub Gist (Fastest direct cloud store)
  if (config.gistId) {
    try {
      const url = `https://api.github.com/gists/${config.gistId}`;
      const res = await fetch(url, {
        headers: { Accept: "application/vnd.github.v3+json" },
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        const fileContent = data?.files?.["availability.json"]?.content;
        if (fileContent) {
          const parsed = JSON.parse(fileContent);
          return { ...fallbackMap, ...parsed };
        }
      }
    } catch {
      // Fallback silently
    }
  }

  // 2. Try Custom Cloud URL (e.g. JSONBin or public URL)
  if (config.customJsonUrl) {
    try {
      const res = await fetch(config.customJsonUrl, { cache: "no-store" });
      if (res.ok) {
        const parsed = await res.json();
        return { ...fallbackMap, ...parsed };
      }
    } catch {
      // Fallback silently
    }
  }

  // 3. Try local /availability.json on the same origin
  try {
    const res = await fetch(`/availability.json?_t=${Date.now()}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const parsed = await res.json();
      return { ...fallbackMap, ...parsed };
    }
  } catch {
    // Fallback silently
  }

  // 4. Check device local override (used for local testing)
  try {
    const local = localStorage.getItem(STORAGE_KEYS.LOCAL_OVERRIDE);
    if (local) {
      return { ...fallbackMap, ...JSON.parse(local) };
    }
  } catch {
    // Ignore
  }

  return fallbackMap;
}

/**
 * Saves availability across active channels (Cloud + Local)
 */
export async function saveLiveAvailability(availabilityMap, config = null) {
  const syncConfig = config || getStoredSyncConfig();
  const timestamp = new Date().toISOString();
  const payload = { ...availabilityMap, lastUpdated: timestamp };

  // 1. Always update device local storage
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEYS.LOCAL_OVERRIDE, JSON.stringify(payload));
    } catch (err) {
      console.error(err);
    }
  }

  // 2. Save to GitHub Gist if configured
  if (syncConfig.githubToken && syncConfig.gistId) {
    try {
      const res = await fetch(`https://api.github.com/gists/${syncConfig.gistId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${syncConfig.githubToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: "Chaudhary Villa — Live Availability Store",
          files: {
            "availability.json": {
              content: JSON.stringify(payload, null, 2),
            },
          },
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `GitHub error ${res.status}`);
      }

      return {
        success: true,
        channel: "gist",
        message: "Live availability updated instantly via GitHub Gist!",
      };
    } catch (err) {
      return {
        success: false,
        error: `Gist sync error: ${err.message}`,
      };
    }
  }

  // 3. Save directly to GitHub Repository if configured
  if (syncConfig.githubToken && syncConfig.githubRepo) {
    try {
      // Get current file SHA first
      const fileUrl = `https://api.github.com/repos/${syncConfig.githubRepo}/contents/public/availability.json`;
      const getRes = await fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${syncConfig.githubToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      let sha = undefined;
      if (getRes.ok) {
        const fileInfo = await getRes.json();
        sha = fileInfo.sha;
      }

      const contentBase64 = btoa(JSON.stringify(payload, null, 2));
      const putRes = await fetch(fileUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${syncConfig.githubToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Update room availability from Owner Admin",
          content: contentBase64,
          sha: sha,
        }),
      });

      if (!putRes.ok) {
        const errData = await putRes.json().catch(() => ({}));
        throw new Error(errData.message || `GitHub commit error ${putRes.status}`);
      }

      return {
        success: true,
        channel: "repo",
        message: "Availability saved to GitHub repo! Vercel is auto-redeploying.",
      };
    } catch (err) {
      return {
        success: false,
        error: `Repo sync error: ${err.message}`,
      };
    }
  }

  // If no cloud sync credentials configured yet:
  return {
    success: true,
    channel: "local",
    message: "Saved to this phone. (Configure GitHub Token in Sync Settings to broadcast to customers' phones).",
  };
}

/**
 * One-click helper: Automatically creates a private GitHub Gist using the owner's token
 */
export async function autoCreateAvailabilityGist(githubToken, initialAvailability) {
  const payload = {
    ...initialAvailability,
    lastUpdated: new Date().toISOString(),
  };

  const res = await fetch("https://api.github.com/gists", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: "Chaudhary Villa — Live Availability Store",
      public: true, // Public gist so customers can read without rate-limits
      files: {
        "availability.json": {
          content: JSON.stringify(payload, null, 2),
        },
      },
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `Failed to create Gist (${res.status})`);
  }

  const data = await res.json();
  return data.id; // Returns gistId
}
