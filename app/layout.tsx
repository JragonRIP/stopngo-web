import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import CartStickyShell from "./components/CartStickyShell";
import PortfolioDisclaimerModal from "./components/PortfolioDisclaimerModal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display-serif",
  subsets: ["latin"],
});

const crispId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2d2420",
};

export const metadata: Metadata = {
  title: "Edelweiss Coffee — Drive-Thru in Iron Mountain, MI",
  description:
    "Exceptional, locally roasted Crimson Cup coffee, two drive-thru windows, and made-to-order drinks in Iron Mountain, Michigan.",
  openGraph: {
    title: "Edelweiss Coffee",
    description:
      "Exceptional coffee to-go in Iron Mountain. Fresh roasted beans, two drive-thru lanes, Crimson Cup Coffee & Tea.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-sn-base text-white">
        <CartStickyShell>
          <div className="flex min-h-full flex-1 flex-col">{children}</div>
        </CartStickyShell>
        <PortfolioDisclaimerModal />
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
