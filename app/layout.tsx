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
<<<<<<< Updated upstream
        className={`h-[100dvh] w-[100dvw] flex flex-col overflow-y-hidden no-scrollbar bg-[#003C58]`}
=======
        className={`h-[100dvh] w-[100dvw] flex flex-col overflow-y-hidden no-scrollbar bg-[#173A4D]`}
>>>>>>> Stashed changes
      >
        {children}
        <svg
          viewBox="0 0 1728 1117"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full absolute top-0 left-0 z-0 select-none opacity-50"
        >
          <g filter="url(#filter0_f_9_255)">
            <path
              d="M196.715 947.991C-44.9366 1011.78 -224.386 861.548 -204.096 612.444C-183.806 363.34 28.5405 109.693 270.192 45.9066L465.935 -5.76146C707.587 -69.5476 887.037 80.6819 866.746 329.786C846.456 578.889 634.11 832.537 392.458 896.323L196.715 947.991Z"
              fill="url(#paint0_radial_9_255)"
              fillOpacity="0.24"
            />
            <path
              d="M1992.19 897.195C2088.49 1476.07 512.816 1026.37 485.352 1012.08L760.79 496.332C822.959 369.426 1337.36 91.3891 1477.04 370.206C1651.64 718.727 1895.88 318.324 1992.19 897.195Z"
              fill="url(#paint1_radial_9_255)"
              fillOpacity="0.2"
            />
            <path
              d="M1812.25 173.474C2803.85 2577.97 567.853 2079.03 529.933 2083.49L-11.8299 1669.26C-67.3624 1364.23 216.362 151.343 592.164 510.326C1061.92 959.055 1383.33 -866.603 1812.25 173.474Z"
              fill="url(#paint2_radial_9_255)"
              fillOpacity="0.48"
            />
            <path
              d="M1373.24 866.65C851.711 456.445 27.2596 462.559 -319.775 516.892C-309.177 285.697 -24.3768 -181.902 866.303 -157.68C1756.98 -133.458 2025.15 1379.4 1373.24 866.65Z"
              fill="url(#paint3_radial_9_255)"
              fillOpacity="0.2"
            />
            <path
              d="M272.845 273.399C412.702 162.403 659.731 288.57 824.599 555.202C989.467 821.834 1009.74 1127.96 869.885 1238.96C730.028 1349.95 482.999 1223.79 318.131 957.155C153.263 690.523 132.988 384.395 272.845 273.399Z"
              fill="#5493BB"
            />
            <path
              d="M1450.94 -165.408C1507.44 -68.4247 1491.76 55.5423 1415.91 111.48C1340.07 167.417 1232.79 134.143 1176.29 37.1592C1119.79 -59.8244 1135.47 -183.791 1211.31 -239.729C1287.15 -295.666 1394.44 -262.392 1450.94 -165.408Z"
              fill="#286381"
            />
            <path
              d="M1162.5 526.531C1229.51 641.546 1222.34 780.131 1146.5 836.068C1070.66 892.005 954.858 844.114 887.855 729.098C820.851 614.083 828.015 475.499 903.857 419.562C979.699 363.624 1095.5 411.516 1162.5 526.531Z"
              fill="#507F96"
            />
            <path
              d="M247.561 -283.32C398.774 -403.328 671.473 -257.841 856.65 41.6368C1041.83 341.114 1069.36 681.175 918.148 801.183C766.935 921.192 494.237 775.704 309.059 476.227C123.882 176.75 96.3483 -163.311 247.561 -283.32Z"
              fill="#376B89"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_9_255"
              x="-638.965"
              y="-644.582"
              width="3023.8"
              height="3087.3"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="159.595"
                result="effect1_foregroundBlur_9_255"
              />
            </filter>
            <radialGradient
              id="paint0_radial_9_255"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(124.32 1001.6) rotate(87.239) scale(1097.13 610.679)"
            >
              <stop stopColor="#75D7FF" />
              <stop offset="1" stopColor="#2F88AA" />
            </radialGradient>
            <radialGradient
              id="paint1_radial_9_255"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(1576.78 286.785) rotate(146.5) scale(2075.39 6145.13)"
            >
              <stop stopColor="#28526A" />
              <stop offset="1" stopColor="#A2D8EB" />
            </radialGradient>
            <radialGradient
              id="paint2_radial_9_255"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(1384.94 404.598) rotate(142.269) scale(1785.93 5023.49)"
            >
              <stop stopColor="#A2D8EB" />
              <stop offset="0.265625" stopColor="#458CAA" />
              <stop offset="0.869792" stopColor="#1B425C" />
            </radialGradient>
            <radialGradient
              id="paint3_radial_9_255"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(2721.47 -1011.21) rotate(139.106) scale(3724.47 10087.4)"
            >
              <stop offset="0.484375" stopColor="#477E9D" />
              <stop offset="0.930475" stopColor="#76A7C2" />
              <stop offset="1" stopColor="#A2D8EB" />
            </radialGradient>
          </defs>
        </svg>
        <img
          className="absolute left-1/2 bottom-1/4 -translate-x-1/2 mix-blend-luminosity opacity-10	"
          src="/looping-animation-copy.gif"
        />
        <Analytics />
      </body>
    </html>
  );
}
