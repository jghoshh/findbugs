import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "where are the bed bugs",
  description: "Crowd-sourced campus bug sightings with real-time location distribution."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="27f593ae-68a2-4f67-ba59-1b633cf6bde0"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
