import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";
import GlobalNav from "@/components/layout/GlobalNav";
import StarField from "@/components/effects/StarField";
import MobileBottomBar from "@/components/layout/MobileBottomBar";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GloryaShine — Heiliges Jahr 2026 | Der Pfad der Pilger",
  description:
    "GloryaShine — ShineHealthCare — Heiliges Jubiläum 2026. Die Übergangs-Frequenz des Inneren Pfades der Pilger. Detmold | Im Namen der gemeinschaftlichen Alchemie.",
  keywords: ["Heiliges Jahr", "GloryaShine", "ShineHealthCare", "Pilger", "2026"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${cinzel.variable} ${cormorant.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-midnight-deep text-glory-shine antialiased">
        <StarField />
        <GlobalNav />
        <div className="relative z-10 flex-1 page-enter">
          {children}
        </div>
        <MobileBottomBar />
      </body>
    </html>
  );
}
