import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Toaster } from "sonner";
import OfflineBanner from "@/components/OfflineBanner";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "@/lib/cart/CartProvider";
import { BookmarksProvider } from "@/lib/bookmarks/BookmarksProvider";
import { MobilePromptProvider } from "@/lib/profile/MobilePromptProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const SITE_URL = "https://www.pyqvault.com";
const SITE_NAME = "PYQ Vault";
const SITE_DESCRIPTION =
  "Build a question paper in 60 seconds. Free past-year questions for entrance exams — filter by exam, chapter, difficulty, and download Question Paper + Answer Key as Word. MHT-CET, NDA and JEE Main live; IPMAT, CUET, NEET coming soon.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Build a question paper in 60 seconds`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "question paper builder",
    "MHT-CET PYQ",
    "NDA",
    "IPMAT",
    "CUET",
    "NEET",
    "JEE Main",
    "previous year questions",
    "free question paper",
    "MCQ bank",
  ],
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Build a question paper in 60 seconds`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Build a question paper in 60 seconds`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

// Synchronous: runs before paint to avoid a flash of the wrong theme.
const themeBootstrap = `
(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <CartProvider>
          <BookmarksProvider>
          <MobilePromptProvider>
          {children}
          <OfflineBanner />
          <Toaster
            position="top-center"
            richColors
            closeButton
            toastOptions={{ duration: 3500 }}
          />
          <Analytics />
          </MobilePromptProvider>
          </BookmarksProvider>
        </CartProvider>
      </body>
    </html>
  );
}
