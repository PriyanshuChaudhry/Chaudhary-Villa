"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Key,
  GitBranch,
  CheckCircle2,
  AlertCircle,
  Copy,
  Download,
  UploadCloud,
  ArrowLeft,
  Home,
  Check,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  rentalSpaces as initialSpaces,
  propertyInfo,
  heroContent,
  facilities,
  houseRules,
  charges as initialCharges,
  termsAndConditions,
  footerContent,
  navLinks,
} from "@/data/propertyData";

const OWNER_PIN = "chaudhary2026";

/**
 * Generate formatted JavaScript content for src/data/propertyData.js
 */
function serializePropertyData(spaces, charges) {
  return `/**
 * ============================================================================
 * CHAUDHARY VILLA — CENTRALIZED PROPERTY CONFIGURATION
 * ============================================================================
 *
 * This is the SINGLE SOURCE OF TRUTH for all property information displayed
 * on the website. When you need to change prices, availability, photos,
 * facilities, rules, or terms — edit THIS file only.
 *
 * After editing, push to GitHub and Vercel will automatically redeploy.
 * ============================================================================
 */

export const propertyInfo = ${JSON.stringify(propertyInfo, null, 2)};

export const heroContent = ${JSON.stringify(heroContent, null, 2)};

export const rentalSpaces = ${JSON.stringify(spaces, null, 2)};

export const facilities = ${JSON.stringify(facilities, null, 2)};

export const houseRules = ${JSON.stringify(houseRules, null, 2)};

export const charges = ${JSON.stringify(charges, null, 2)};

export const termsAndConditions = ${JSON.stringify(termsAndConditions, null, 2)};

export const footerContent = ${JSON.stringify(footerContent, null, 2)};

export const navLinks = ${JSON.stringify(navLinks, null, 2)};
`;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("chaudhary_admin_auth") === "true";
    }
    return false;
  });
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // GitHub Settings
  const [ghToken, setGhToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("chaudhary_gh_token") || "";
    }
    return "";
  });
  const [ghOwner, setGhOwner] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("chaudhary_gh_owner") || "";
    }
    return "";
  });
  const [ghRepo, setGhRepo] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("chaudhary_gh_repo") || "";
    }
    return "";
  });
  const [ghBranch, setGhBranch] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("chaudhary_gh_branch") || "master";
    }
    return "master";
  });

  // Editable Property State
  const [spaces, setSpaces] = useState(initialSpaces);
  const [chargesState, setChargesState] = useState(initialCharges);

  // Status & Feedback
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput.trim() === OWNER_PIN) {
      setIsAuthenticated(true);
      localStorage.setItem("chaudhary_admin_auth", "true");
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("chaudhary_admin_auth");
  };

  const saveGitHubSettings = () => {
    localStorage.setItem("chaudhary_gh_token", ghToken.trim());
    localStorage.setItem("chaudhary_gh_owner", ghOwner.trim());
    localStorage.setItem("chaudhary_gh_repo", ghRepo.trim());
    localStorage.setItem("chaudhary_gh_branch", ghBranch.trim());
    setStatusMessage({
      type: "success",
      text: "GitHub settings saved locally on your device.",
    });
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // Toggle Space Availability
  const toggleAvailability = (id) => {
    setSpaces((prev) =>
      prev.map((space) => {
        if (space.id === id) {
          const isCurrentlyAvailable =
            String(space.availability).toLowerCase() === "available";
          return {
            ...space,
            availability: isCurrentlyAvailable ? "unavailable" : "available",
          };
        }
        return space;
      })
    );
  };

  // Mark all rooms as unavailable
  const markHouseFull = () => {
    setSpaces((prev) =>
      prev.map((space) => ({
        ...space,
        availability: "unavailable",
      }))
    );
    setStatusMessage({
      type: "info",
      text: "All spaces marked as Occupied (House Full). Click 'Publish to GitHub' to apply.",
    });
  };

  // Mark all rooms as available
  const markAllAvailable = () => {
    setSpaces((prev) =>
      prev.map((space) => ({
        ...space,
        availability: "available",
      }))
    );
    setStatusMessage({
      type: "info",
      text: "All spaces marked as Available. Click 'Publish to GitHub' to apply.",
    });
  };

  // Update room price
  const handlePriceChange = (id, key, value) => {
    const num = value === "" ? null : parseInt(value, 10);
    setSpaces((prev) =>
      prev.map((space) => {
        if (space.id === id) {
          if (space.type === "room") {
            return {
              ...space,
              pricing: {
                ...space.pricing,
                [key]: {
                  ...space.pricing[key],
                  amount: isNaN(num) ? null : num,
                },
              },
            };
          } else {
            return {
              ...space,
              pricing: {
                monthly: {
                  ...space.pricing.monthly,
                  amount: isNaN(num) ? null : num,
                },
              },
            };
          }
        }
        return space;
      })
    );
  };

  // Copy Code to Clipboard
  const handleCopyCode = async () => {
    const code = serializePropertyData(spaces, chargesState);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setStatusMessage({
        type: "error",
        text: "Could not access clipboard. Please use the Download button instead.",
      });
    }
  };

  // Download propertyData.js File
  const handleDownload = () => {
    const code = serializePropertyData(spaces, chargesState);
    const blob = new Blob([code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "propertyData.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusMessage({
      type: "success",
      text: "Downloaded propertyData.js! Replace src/data/propertyData.js in your project.",
    });
  };

  // Push directly to GitHub via GitHub Contents API
  const handlePublishToGitHub = async () => {
    if (!ghToken || !ghOwner || !ghRepo) {
      setStatusMessage({
        type: "error",
        text: "Please configure your GitHub Token, Owner, and Repository name below.",
      });
      return;
    }

    setIsSaving(true);
    setStatusMessage({
      type: "info",
      text: "Connecting to GitHub API...",
    });

    try {
      const filePath = "src/data/propertyData.js";
      const branch = ghBranch || "master";
      const apiUrl = `https://api.github.com/repos/${ghOwner.trim()}/${ghRepo.trim()}/contents/${filePath}?ref=${branch}`;

      // 1. Fetch current file to get latest SHA
      const getRes = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${ghToken.trim()}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!getRes.ok) {
        throw new Error(
          `GitHub API error (${getRes.status}): ${getRes.statusText}. Check your repository name and branch.`
        );
      }

      const fileData = await getRes.json();
      const currentSha = fileData.sha;

      // 2. Generate updated file content and encode in Base64
      const updatedCode = serializePropertyData(spaces, chargesState);
      const utf8Bytes = new TextEncoder().encode(updatedCode);
      let binary = "";
      for (let i = 0; i < utf8Bytes.length; i++) {
        binary += String.fromCharCode(utf8Bytes[i]);
      }
      const base64Content = btoa(binary);

      // 3. Commit updated file to GitHub
      const putRes = await fetch(
        `https://api.github.com/repos/${ghOwner.trim()}/${ghRepo.trim()}/contents/${filePath}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${ghToken.trim()}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "chore: update room availability via owner admin panel",
            content: base64Content,
            sha: currentSha,
            branch: branch,
          }),
        }
      );

      if (!putRes.ok) {
        const errJson = await putRes.json();
        throw new Error(
          errJson.message || `Failed to update repository (${putRes.status})`
        );
      }

      const result = await putRes.json();

      setStatusMessage({
        type: "success",
        text: `Successfully committed to GitHub (${result.commit?.sha?.slice(0, 7)})! Vercel will rebuild and deploy your site automatically in ~30 seconds.`,
      });
    } catch (err) {
      console.error(err);
      setStatusMessage({
        type: "error",
        text: `Update failed: ${err.message}`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // PIN Login Screen
  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200/80 shadow-md p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-5">
              <Lock className="w-7 h-7 text-teal-700" />
            </div>
            <h1 className="text-2xl font-bold text-charcoal mb-2">
              Owner Admin Portal
            </h1>
            <p className="text-stone-500 text-sm mb-6">
              Enter your owner PIN to manage room availability and prices for Chaudhary Villa.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter Owner PIN (default: chaudhary2026)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-center text-lg tracking-widest bg-stone-50 focus:outline-none focus:ring-2 ${
                    pinError
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-stone-200 focus:ring-teal-200"
                  }`}
                  autoFocus
                />
                {pinError && (
                  <p className="text-rose-600 text-xs mt-2 font-medium">
                    Incorrect PIN. Please try again.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-sm transition-all"
              >
                Access Dashboard
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-stone-100 text-xs text-stone-400">
              <Link href="/" className="hover:text-stone-600 transition-colors">
                ← Return to Public Website
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-20">
        {/* Navigation & Logout */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200/60">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-teal-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Public Website
          </Link>

          <button
            onClick={handleLogout}
            className="text-xs text-stone-400 hover:text-stone-600 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors"
          >
            Lock Dashboard
          </button>
        </div>

        {/* Dashboard Title & Quick Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-6 h-6 text-teal-700" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
                Property Management
              </h1>
            </div>
            <p className="text-stone-500 text-sm">
              Manage room availability, pricing, and push live updates directly to GitHub & Vercel.
            </p>
          </div>

          {/* Quick House Full / Vacant buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={markHouseFull}
              className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl border border-amber-200 transition-colors"
            >
              Mark House Full
            </button>
            <button
              onClick={markAllAvailable}
              className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 transition-colors"
            >
              Mark All Available
            </button>
          </div>
        </div>

        {/* Status Toast Notification */}
        {statusMessage && (
          <div
            className={`p-4 rounded-2xl mb-8 flex items-start gap-3 border ${
              statusMessage.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : statusMessage.type === "error"
                ? "bg-rose-50 border-rose-200 text-rose-900"
                : "bg-blue-50 border-blue-200 text-blue-900"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600 mt-0.5" />
            ) : statusMessage.type === "error" ? (
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 mt-0.5" />
            ) : (
              <RefreshCw className="w-5 h-5 flex-shrink-0 text-blue-600 mt-0.5 animate-spin" />
            )}
            <p className="text-sm font-medium leading-relaxed">
              {statusMessage.text}
            </p>
          </div>
        )}

        {/* Space Availability & Pricing Toggles */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-charcoal">
              Rental Spaces & Occupancy
            </h2>
            <span className="text-xs text-stone-400">
              {spaces.filter((s) => s.availability === "available").length} of {spaces.length} Available
            </span>
          </div>

          <div className="space-y-4">
            {spaces.map((space) => {
              const isAvail = String(space.availability).toLowerCase() === "available";
              return (
                <div
                  key={space.id}
                  className={`p-5 rounded-2xl border transition-all duration-200 ${
                    isAvail
                      ? "bg-white border-emerald-300 shadow-sm ring-1 ring-emerald-500/10"
                      : "bg-stone-50/70 border-stone-200/80 opacity-90"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Space Info */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3.5 h-3.5 rounded-full ${
                          isAvail ? "bg-emerald-500 animate-pulse" : "bg-stone-300"
                        }`}
                      />
                      <div>
                        <h3 className="font-bold text-charcoal text-base">
                          {space.name}
                        </h3>
                        <p className="text-xs text-stone-400">
                          {space.type === "room" ? "Residential Room" : "Shared Utility"} • Slug: /{space.slug}
                        </p>
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${
                          isAvail ? "text-emerald-700" : "text-stone-400"
                        }`}
                      >
                        {isAvail ? "Available (Vacant)" : "Unavailable (Occupied)"}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleAvailability(space.id)}
                        className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          isAvail ? "bg-emerald-600" : "bg-stone-300"
                        }`}
                        role="switch"
                        aria-checked={isAvail}
                      >
                        <span
                          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            isAvail ? "translate-x-7" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Pricing Fields */}
                  <div className="mt-4 pt-3.5 border-t border-stone-100 flex flex-wrap items-center gap-4">
                    {space.type === "room" ? (
                      <>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-stone-500 font-medium">Single Rent (₹):</span>
                          <input
                            type="number"
                            value={space.pricing.singleOccupancy?.amount || ""}
                            onChange={(e) =>
                              handlePriceChange(space.id, "singleOccupancy", e.target.value)
                            }
                            className="w-24 px-2.5 py-1 rounded-lg border border-stone-200 text-charcoal text-xs font-bold bg-white"
                          />
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-stone-500 font-medium">Double Rent (₹):</span>
                          <input
                            type="number"
                            value={space.pricing.doubleOccupancy?.amount || ""}
                            onChange={(e) =>
                              handlePriceChange(space.id, "doubleOccupancy", e.target.value)
                            }
                            className="w-24 px-2.5 py-1 rounded-lg border border-stone-200 text-charcoal text-xs font-bold bg-white"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-stone-500 font-medium">Monthly Rent (₹):</span>
                        <input
                          type="number"
                          value={space.pricing.monthly?.amount || ""}
                          onChange={(e) =>
                            handlePriceChange(space.id, "monthly", e.target.value)
                          }
                          className="w-28 px-2.5 py-1 rounded-lg border border-stone-200 text-charcoal text-xs font-bold bg-white"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Publishing Actions */}
        <section className="mb-12 p-6 sm:p-8 bg-white rounded-3xl border border-stone-200/80 shadow-md">
          <div className="flex items-center gap-2.5 mb-2">
            <UploadCloud className="w-5 h-5 text-teal-700" />
            <h2 className="text-lg font-bold text-charcoal">
              Publish & Deployment Actions
            </h2>
          </div>
          <p className="text-stone-500 text-xs sm:text-sm mb-6 leading-relaxed">
            Choose how you would like to apply your changes. Pushing to GitHub will trigger an automatic Vercel redeployment in ~30 seconds without modifying local files manually.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handlePublishToGitHub}
              disabled={isSaving}
              className="py-3 px-4 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{isSaving ? "Publishing..." : "Push to GitHub"}</span>
            </button>

            <button
              onClick={handleCopyCode}
              className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors border border-stone-200/80"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Copy Code"}</span>
            </button>

            <button
              onClick={handleDownload}
              className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors border border-stone-200/80"
            >
              <Download className="w-4 h-4" />
              <span>Download File</span>
            </button>
          </div>
        </section>

        {/* GitHub Direct Integration Settings */}
        <section className="p-6 sm:p-8 bg-stone-50/90 rounded-3xl border border-stone-200/80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-stone-600" />
              <h2 className="text-base font-bold text-charcoal">
                GitHub Repository Settings
              </h2>
            </div>
            <button
              onClick={saveGitHubSettings}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200 transition-colors"
            >
              Save Credentials
            </button>
          </div>

          <p className="text-stone-500 text-xs mb-5 leading-relaxed">
            These settings are stored <strong>strictly on your device</strong> in your local browser and are never transmitted to any third-party server.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                GitHub Personal Access Token (PAT)
              </label>
              <input
                type="password"
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                value={ghToken}
                onChange={(e) => setGhToken(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">
                Needs <code>repo</code> or <code>contents:write</code> scope.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                Repository Owner (Username / Org)
              </label>
              <input
                type="text"
                placeholder="e.g. your-github-username"
                value={ghOwner}
                onChange={(e) => setGhOwner(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                Repository Name
              </label>
              <input
                type="text"
                placeholder="e.g. Chaudhary-Villa"
                value={ghRepo}
                onChange={(e) => setGhRepo(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                Target Branch
              </label>
              <input
                type="text"
                placeholder="master or main"
                value={ghBranch}
                onChange={(e) => setGhBranch(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
