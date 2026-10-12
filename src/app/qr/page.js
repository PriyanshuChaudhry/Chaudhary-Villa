"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Printer, Copy, Check, ArrowLeft, QrCode } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { propertyInfo } from "@/data/propertyData";

/**
 * QRPage — Utility page for generating a printable QR code.
 * The owner enters their deployed website URL, and it generates
 * a scannable QR code for the TO-LET board.
 */
export default function QRPage() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="no-print">
        <Header />
      </div>
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-16">
        {/* Back navigation */}
        <div className="no-print">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          {/* Page header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                <QrCode className="w-5 h-5 text-teal-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-charcoal">
                QR Code Generator
              </h1>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Generate a QR code for your TO-LET board. Enter your deployed
              website URL below to create a scannable QR code.
            </p>
          </div>

          {/* URL input */}
          <div className="mb-8">
            <label
              htmlFor="website-url"
              className="block text-sm font-medium text-charcoal mb-2"
            >
              Website URL
            </label>
            <div className="flex gap-2">
              <input
                id="website-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-site.vercel.app"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white"
              />
              <button
                onClick={handleCopy}
                disabled={!url}
                className="px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Copy URL"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Enter the full URL of your deployed website (e.g.,
              https://chaudhary-villa.vercel.app)
            </p>
          </div>
        </div>

        {/* QR Code display */}
        {url && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="inline-block p-6 bg-white rounded-2xl shadow-lg border border-gray-50">
              <QRCodeSVG
                value={url}
                size={220}
                level="H"
                includeMargin={false}
                bgColor="#FFFFFF"
                fgColor="#1C1917"
              />
            </div>
            <div className="mt-6">
              <h2 className="font-bold text-charcoal text-lg">
                {propertyInfo.name}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Scan to view rental spaces
              </p>
              <p className="text-gray-400 text-xs mt-2 break-all">{url}</p>
            </div>

            {/* Print button */}
            <div className="mt-6 no-print">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-sm"
              >
                <Printer className="w-4 h-4" />
                Print QR Code
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 no-print">
          <h3 className="text-sm font-semibold text-charcoal mb-4">
            Instructions
          </h3>
          <div className="space-y-3">
            {[
              "Deploy your website to Vercel (see README for instructions).",
              "Copy your production URL from Vercel's dashboard.",
              "Paste the URL in the field above.",
              "Click \"Print QR Code\" to print it.",
              "Cut out the QR code and attach it to your TO-LET board.",
              "Test the QR code with your phone camera before printing the final version.",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-50 text-teal-700 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-gray-600 text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="no-print">
        <Footer />
      </div>
    </>
  );
}
