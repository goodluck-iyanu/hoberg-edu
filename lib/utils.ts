import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString?: string | null): string {
  if (!dateString) return "Rolling / Open";
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function getDaysRemaining(dateString?: string | null): { days: number; text: string; isClosingSoon: boolean; isExpired: boolean } {
  if (!dateString) return { days: 999, text: "Open deadline", isClosingSoon: false, isExpired: false };
  const target = new Date(dateString).getTime();
  const now = new Date().getTime();
  const diffTime = target - now;
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (days < 0) {
    return { days, text: "Expired", isClosingSoon: false, isExpired: true };
  }
  if (days <= 14) {
    return { days, text: `${days} days left`, isClosingSoon: true, isExpired: false };
  }
  return { days, text: `${days} days left`, isClosingSoon: false, isExpired: false };
}

export function formatCurrency(amount: number, currency: string = "NGN"): string {
  if (currency === "NGN") return `₦${amount.toLocaleString()}`;
  if (currency === "USD") return `$${amount.toLocaleString()}`;
  if (currency === "CAD") return `CAD $${amount.toLocaleString()}`;
  if (currency === "GBP") return `£${amount.toLocaleString()}`;
  if (currency === "EUR") return `€${amount.toLocaleString()}`;
  return `${currency} ${amount.toLocaleString()}`;
}
