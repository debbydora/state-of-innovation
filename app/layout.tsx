import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* Body: Outfit (self-hosted) */
const outfit = localFont({
  variable: "--font-outfit-local",
  display: "swap",
  src: [
    {
      path: "../public/fonts/Outfit/Outfit-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Outfit/Outfit-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Outfit/Outfit-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Outfit/Outfit-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Outfit/Outfit-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

/* Headings / bold display text: Archivo (self-hosted) */
const archivo = localFont({
  variable: "--font-archivo-local",
  display: "swap",
  src: [
    {
      path: "../public/fonts/Archivo/static/Archivo-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Archivo/static/Archivo-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Archivo/static/Archivo-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

/* Handwritten accent ("build") — self-hosted so it never silently fails */
const kalam = localFont({
  variable: "--font-kalam",
  display: "swap",
  src: [
    {
      path: "../public/fonts/Kalam/Kalam-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "State of Innovation Report",
  description:
    "What does it actually take to build? Insights from builders across Nigeria.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${archivo.variable} ${kalam.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
