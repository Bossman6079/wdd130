import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LEXIS — Living Research Intelligence Platform",
  description: "AI-powered academic research intelligence. Explore theories, authors, gaps, and knowledge graphs for any research field.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
