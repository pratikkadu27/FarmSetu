import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "FarmSetu | Fresh from Farm to Your Door",
  description: "Connect directly with farmers for fresh grains, fruits, and vegetables at bulk prices.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FarmSetu",
  },
};

export const viewport: Viewport = {
  themeColor: "#4A7C59",
  width: "device-width",
  initialScale: 1,
};

import { AuthProvider } from "@/context/AuthContext";
import { DealProvider } from "@/context/DealContext";
import { ToastProvider } from "@/context/ToastContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.variable}>
        <AuthProvider>
          <DealProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </DealProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
