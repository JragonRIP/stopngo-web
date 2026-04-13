import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const crispId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3f3f3f",
};

export const metadata: Metadata = {
  title: "Stop 'N Go 2.0, Coffee & Smash Burgers, Powers, MI",
  description:
    "Locally owned food trailer and coffee in Powers, Michigan. Drive-thru and walk-up from 4:30 AM. Lotus energy, espresso, and fresh Smash Burgers.",
  openGraph: {
    title: "Stop 'N Go 2.0",
    description: "Fueling the U.P. Starting at 4:30 AM.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-sn-base text-white">
        <div className="flex min-h-full flex-1 flex-col">{children}</div>
        {crispId ? (
          <>
            <Script id="crisp-init" strategy="afterInteractive">
              {`window.$crisp=[];window.CRISP_WEBSITE_ID="${crispId}";`}
            </Script>
            <Script
              src="https://client.crisp.chat/l.js"
              strategy="afterInteractive"
            />
          </>
        ) : null}
      </body>
    </html>
  );
}
