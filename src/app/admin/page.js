"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  Home,
  Save,
  Cloud,
  Settings,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Eye,
  LogOut,
  Sparkles,
} from "lucide-react";
import { rentalSpaces, propertyInfo } from "@/data/propertyData";
import {
  DEFAULT_ADMIN_PIN,
  STORAGE_KEYS,
  extractAvailabilityMap,
  fetchLiveAvailabilityMap,
  saveLiveAvailability,
  getStoredSyncConfig,
  saveSyncConfig,
  autoCreateAvailabilityGist,
} from "@/lib/availabilitySync";
import { formatPrice } from "@/lib/helpers";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) === "authenticated";
    } catch {
      return false;
    }
  });
  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Availability State
  const [availability, setAvailability] = useState(() =>
    extractAvailabilityMap(rentalSpaces)
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // Sync Settings State
  const [showSettings, setShowSettings] = useState(false);
  const [githubToken, setGithubToken] = useState(() => {
    if (typeof window === "undefined") return "";
    return getStoredSyncConfig().githubToken || "";
  });
  const [gistId, setGistId] = useState(() => {
    if (typeof window === "undefined") return "";
    return getStoredSyncConfig().gistId || "";
  });
  const [githubRepo, setGithubRepo] = useState(() => {
    if (typeof window === "undefined") return "";
    return getStoredSyncConfig().githubRepo || "";
  });
  const [isCreatingGist, setIsCreatingGist] = useState(false);
  const [settingsStatus, setSettingsStatus] = useState(null);

  // Load current live availability from cloud
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const live = await fetchLiveAvailabilityMap(rentalSpaces);
      if (isMounted && live) {
        setAvailability(live);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (enteredPin.trim() === DEFAULT_ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError("");
      if (rememberMe) {
        try {
          localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, "authenticated");
        } catch {
          // Ignore
        }
      }
    } else {
      setPinError("Incorrect PIN. Please try again.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch {
      // Ignore
    }
  };

  // Toggle Space Status
  const handleToggle = (id) => {
    setAvailability((prev) => ({
      ...prev,
      [id]: prev[id] === "available" ? "unavailable" : "available",
    }));
    setSaveStatus(null);
  };

  // Mark all rooms as occupied (House Full)
  const handleMarkAllOccupied = () => {
    const updated = {};
    rentalSpaces.forEach((s) => {
      updated[s.id] = "unavailable";
    });
    setAvailability(updated);
    setSaveStatus(null);
  };

  // Save Availability Changes
  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    const result = await saveLiveAvailability(availability);
    setIsSaving(false);

    if (result.success) {
      setSaveStatus({
        type: "success",
        message: result.message || "Changes published successfully!",
      });
      // Clear notification after 4s
      setTimeout(() => setSaveStatus(null), 4000);
    } else {
      setSaveStatus({
        type: "error",
        message: result.error || "Failed to save changes. Please try again.",
      });
    }
  };

  // Save Sync Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    const config = {
      githubToken: githubToken.trim(),
      gistId: gistId.trim(),
      githubRepo: githubRepo.trim(),
    };
    saveSyncConfig(config);
    setSettingsStatus({
      type: "success",
      message: "Sync settings saved to this phone!",
    });
    setTimeout(() => setSettingsStatus(null), 3000);
  };

  // Auto create Gist
  const handleAutoCreateGist = async () => {
    if (!githubToken.trim()) {
      setSettingsStatus({
        type: "error",
        message: "Please enter your GitHub Personal Access Token first.",
      });
      return;
    }

    setIsCreatingGist(true);
    setSettingsStatus(null);

    try {
      const newGistId = await autoCreateAvailabilityGist(
        githubToken.trim(),
        availability
      );
      setGistId(newGistId);

      const config = {
        githubToken: githubToken.trim(),
        gistId: newGistId,
        githubRepo: githubRepo.trim(),
      };
      saveSyncConfig(config);

      setSettingsStatus({
        type: "success",
        message: `Cloud Gist created successfully! Gist ID: ${newGistId}`,
      });
    } catch (err) {
      setSettingsStatus({
        type: "error",
        message: `Failed to create Gist: ${err.message}`,
      });
    } finally {
      setIsCreatingGist(false);
    }
  };

  // Calculate live stats
  const availableCount = Object.values(availability).filter(
    (status) => status === "available"
  ).length;
  const isHouseFull = availableCount === 0;

  // ─────────────────────────────────────────────
  // 1. PIN LOGIN SCREEN
  // ─────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200">
          <div className="w-14 h-14 bg-teal-50 border border-teal-200/80 rounded-2xl flex items-center justify-center mx-auto mb-4 text-teal-600">
            <Lock className="w-6 h-6" />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-charcoal">
              Owner Control Panel
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Chaudhary Villa Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-pin"
                className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
              >
                Enter Admin PIN
              </label>
              <input
                id="admin-pin"
                type="password"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                placeholder="Enter PIN"
                className="w-full px-4 py-3 text-center text-lg tracking-widest rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-stone-50"
                autoFocus
              />
              {pinError && (
                <p className="text-rose-600 text-xs mt-2 text-center flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {pinError}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                Remember on this device
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl shadow-md transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              Unlock Controls
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-stone-100 text-center">
            <p className="text-[11px] text-gray-400">
              Default owner PIN is <code className="text-teal-700 font-mono font-bold">{DEFAULT_ADMIN_PIN}</code>
            </p>
            <Link
              href="/"
              className="inline-block mt-3 text-xs text-teal-600 hover:underline"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ─────────────────────────────────────────────
  // 2. AUTHENTICATED DASHBOARD
  // ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-stone-100 text-charcoal pb-24">
      {/* Top Mobile Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-3.5">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight">
                {propertyInfo.name}
              </h1>
              <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Admin Active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="p-2 rounded-xl text-stone-500 hover:bg-stone-100 text-xs flex items-center gap-1 border border-stone-200"
              title="Preview Website"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview</span>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-stone-500 hover:bg-stone-100 border border-stone-200"
              title="Lock / Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-5 space-y-4">
        {/* Status Card */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isHouseFull
              ? "bg-amber-50/80 border-amber-200 text-amber-900"
              : "bg-emerald-50/80 border-emerald-200 text-emerald-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                  isHouseFull ? "bg-amber-100" : "bg-emerald-100"
                }`}
              >
                {isHouseFull ? "🏠" : "🟢"}
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold opacity-75">
                  Live Public Status
                </p>
                <h2 className="text-base font-bold">
                  {isHouseFull
                    ? "HOUSE FULL — All Rooms Occupied"
                    : `${availableCount} of ${rentalSpaces.length} Rooms Available`}
                </h2>
              </div>
            </div>

            {!isHouseFull && (
              <button
                onClick={handleMarkAllOccupied}
                className="px-2.5 py-1.5 text-xs font-semibold bg-white rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 shadow-sm active:scale-95 transition-all"
              >
                Mark House Full
              </button>
            )}
          </div>
        </div>

        {/* Save Notifications */}
        {saveStatus && (
          <div
            className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
              saveStatus.type === "success"
                ? "bg-emerald-600 text-white shadow-md animate-in"
                : "bg-rose-600 text-white shadow-md"
            }`}
          >
            {saveStatus.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{saveStatus.message}</span>
          </div>
        )}

        {/* Room Toggles List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Rooms & Rental Spaces ({rentalSpaces.length})
            </h2>
            <span className="text-[11px] text-stone-400">Tap switch to toggle</span>
          </div>

          {rentalSpaces.map((space) => {
            const isAvail = availability[space.id] === "available";
            const priceText = space.pricing.singleOccupancy
              ? `${formatPrice(space.pricing.singleOccupancy.amount)} (Single) • ${formatPrice(space.pricing.doubleOccupancy.amount)} (Double)`
              : formatPrice(space.pricing.monthly.amount);

            return (
              <div
                key={space.id}
                className={`p-4 rounded-2xl border transition-all duration-200 ${
                  isAvail
                    ? "bg-white border-teal-500 shadow-sm ring-1 ring-teal-500/30"
                    : "bg-white border-stone-200/80 opacity-90"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-bold text-charcoal truncate">
                        {space.name}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium">
                        {space.type === "room" ? "Room" : "Utility"}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 truncate">
                      {priceText}
                    </p>
                  </div>

                  {/* Big Touch-Friendly Toggle Switch */}
                  <button
                    onClick={() => handleToggle(space.id)}
                    type="button"
                    className={`relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isAvail ? "bg-emerald-500" : "bg-stone-300"
                    }`}
                    aria-label={`Toggle availability for ${space.name}`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        isAvail ? "translate-x-8" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">Current Status:</span>
                  <span
                    className={`font-semibold ${
                      isAvail ? "text-emerald-600" : "text-stone-500"
                    }`}
                  >
                    {isAvail ? "🟢 VACANT (Visible to customers)" : "⚪ OCCUPIED (Hidden from customers)"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Big Save Button */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-4 bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg shadow-teal-700/20 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Publishing to Website...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save & Broadcast Changes
              </>
            )}
          </button>
        </div>

        {/* Sync Settings Section (Drawer) */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden mt-6">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Cloud className="w-4 h-4 text-teal-600" />
              <div>
                <h3 className="text-xs font-bold text-charcoal">
                  Cloud Broadcast Settings (Zero-Server Sync)
                </h3>
                <p className="text-[11px] text-stone-400">
                  {gistId ? "Connected to Cloud Gist" : "Local mode active"}
                </p>
              </div>
            </div>
            {showSettings ? (
              <ChevronUp className="w-4 h-4 text-stone-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-stone-400" />
            )}
          </button>

          {showSettings && (
            <div className="p-4 pt-1 border-t border-stone-100 space-y-4 text-xs">
              <p className="text-stone-500 leading-relaxed text-[11px]">
                To broadcast your toggles instantly to any customer scanning the
                QR code from their phone without a database, connect your free GitHub Gist:
              </p>

              {settingsStatus && (
                <div
                  className={`p-2.5 rounded-lg text-xs font-medium ${
                    settingsStatus.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                >
                  {settingsStatus.message}
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-3">
                <div>
                  <label className="block font-medium text-stone-600 mb-1">
                    GitHub Personal Access Token (classic with gist scope):
                  </label>
                  <input
                    type="password"
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs font-mono"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAutoCreateGist}
                    disabled={isCreatingGist || !githubToken}
                    className="flex-1 py-2 px-3 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    {isCreatingGist ? "Creating Cloud Gist..." : "1-Click Auto Create Gist"}
                  </button>
                </div>

                <div>
                  <label className="block font-medium text-stone-600 mb-1">
                    Gist ID (filled automatically):
                  </label>
                  <input
                    type="text"
                    value={gistId}
                    onChange={(e) => setGistId(e.target.value)}
                    placeholder="e.g. 7f8e9a2b1c4d..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs font-mono"
                  />
                </div>

                <div className="pt-1 flex gap-2">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-stone-800 text-white font-medium rounded-xl text-xs hover:bg-stone-900 transition-colors"
                  >
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
