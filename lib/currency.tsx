"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Currency = "USD" | "SGD" | "MYR" | "IDR" | "PHP" | "THB";

const RATES: Record<Currency, number> = {
  USD: 1,
  SGD: 1.34,
  MYR: 4.47,
  IDR: 16500,
  PHP: 57,
  THB: 35,
};

export const SYMBOLS: Record<Currency, string> = {
  USD: "$",
  SGD: "S$",
  MYR: "RM",
  IDR: "IDR",
  PHP: "₱",
  THB: "฿",
};

export const FLAGS: Record<Currency, string> = {
  USD: "🇺🇸",
  SGD: "🇸🇬",
  MYR: "🇲🇾",
  IDR: "🇮🇩",
  PHP: "🇵🇭",
  THB: "🇹🇭",
};

const TZ_MAP: Record<string, Currency> = {
  "Asia/Singapore": "SGD",
  "Asia/Kuala_Lumpur": "MYR",
  "Asia/Jakarta": "IDR",
  "Asia/Makassar": "IDR",
  "Asia/Jayapura": "IDR",
  "Asia/Manila": "PHP",
  "Asia/Bangkok": "THB",
};

function detectCurrency(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TZ_MAP[tz] ?? "USD";
  } catch {
    return "USD";
  }
}

interface CurrencyCtx {
  currency: Currency;
  detected: Currency;
  setCurrency: (c: Currency) => void;
  format: (usdAmount: number) => string;
}

const CurrencyContext = createContext<CurrencyCtx | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [detected, setDetected] = useState<Currency>("USD");
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const geo = detectCurrency();
    setDetected(geo);
    const saved = localStorage.getItem("m3dsai-currency") as Currency | null;
    setCurrencyState(saved && saved in RATES ? saved : geo);
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("m3dsai-currency", c);
  };

  const format = (usdAmount: number): string => {
    const amount = Math.round(usdAmount * RATES[currency]);
    const sym = SYMBOLS[currency];
    const formatted = new Intl.NumberFormat("en-US").format(amount);
    const sep = currency === "MYR" || currency === "IDR" ? " " : "";
    return `${sym}${sep}${formatted}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, detected, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
