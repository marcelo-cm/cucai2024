import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

const IBMPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cucai.ca"),
  title: "Canadian Undergraduate Conference on AI 2024",
  description:
    "March 2-3, 2024 in Kingston, ON | Bringing together the brightest minds in AI",
  openGraph: {
    images: "/opengraph-image.png",
  },
  twitter: {
    images: "/twitter-image.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`h-[100dvh] w-[100dvw] flex flex-col overflow-y-hidden no-scrollbar bg-gradient-to-b from-[#08283F] to-[#18405D]`}
      >
        {children}
        {/* <img
          className="absolute left-1/2 bottom-1/4 -translate-x-1/2 mix-blend-luminosity opacity-10	"
          src="/looping-animation-copy.gif"
        /> */}
        <Analytics />
      </body>
    </html>
  );
}
