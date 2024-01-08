import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { FilterModal } from "@/app/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sports Bar Locator",
  description:
    "Home locations for various sports teams, specifically focused on the NFL, NBA, and NCAA leagues.",
};

const luckiestGuy = localFont({
  src: [
    {
      path: "../../public/fonts/LuckiestGuy.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/LuckiestGuy.ttf",
      weight: "700",
    },
  ],
  variable: "--font-luckiest-guy",
});

const funWood = localFont({
  src: [
    {
      path: "../../public/fonts/Moul-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Moul-Regular.ttf",
      weight: "700",
    },
  ],
  variable: "--font-fun-wood",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${luckiestGuy.variable} ${funWood.variable} font-sans`}
    >
      <body className={inter.className}>
        <div className="flex flex-col h-full min-h-screen">
          {children}
          <FilterModal />
        </div>
      </body>
    </html>
  );
}
