import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KAYYOPP | Create. Connect. Sell.",
  description:
    "A functional digital platform for Kerala artisans with AI-assisted profiles, tourist discovery, direct sales, bookings, and verification.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#0f766e] selection:text-white">
        {children}
      </body>
    </html>
  );
}
