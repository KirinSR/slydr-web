import type { Metadata, Viewport } from "next";
import { type ReactNode } from "react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "slydr - Organizational Slide Memory",
  description:
    "slydr surfaces your organization's presentation knowledge visually, instantly, inside PowerPoint.",
  openGraph: {
    title: "slydr - Organizational Slide Memory",
    description:
      "Search, preview, and insert the slides your organization already made.",
    siteName: "slydr",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const themeScript = `try{const t=localStorage.getItem('slydr-theme');const p=window.matchMedia('(prefers-color-scheme: light)').matches;document.documentElement.setAttribute('data-theme',t||(p?'light':'dark'))}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Geist:wght@300;400;500&display=swap"
          rel="stylesheet"
          data-preserve-original-fonts="true"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
