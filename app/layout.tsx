import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hoberg Edu — Discover. Apply. Study Abroad.",
  description: "Global education opportunity platform helping Nigerian students and graduates discover international universities, Bachelor's, Master's, PhD programs, and fully funded scholarships.",
  keywords: ["study abroad Nigeria", "scholarships for Nigerians", "Chevening", "Mastercard Foundation", "international universities", "study in Canada", "study in UK"],
  openGraph: {
    title: "Hoberg Edu — Discover. Apply. Study Abroad.",
    description: "Discover verified international universities, academic programs, and fully funded scholarships.",
    url: "https://hobergedu.com",
    siteName: "Hoberg Edu",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-navy-950 antialiased`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
