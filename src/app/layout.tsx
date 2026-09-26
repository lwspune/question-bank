import type { Metadata, Viewport } from "next";
import { Inter, Noto_Serif_Devanagari, Source_Serif_4 } from "next/font/google";
import { Toaster } from "sonner";
import OfflineBanner from "@/components/OfflineBanner";
import { Analytics } from "@vercel/analytics/next";
import AcquisitionCapture from "@/components/acquisition/AcquisitionCapture";
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

// Marathi question text (migration 0118). Sits AFTER the Latin faces in both
// Tailwind stacks, so it only ever renders Devanagari glyphs. `preload: false`:
// the @font-face is declared site-wide but a browser only downloads a face for
// characters it actually has to draw — pages with no Marathi pay nothing.
const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  display: "swap",
  preload: false,
  variable: "--font-devanagari",
});

const SITE_URL = "https://www.pyqvault.com";
const SITE_NAME = "PYQ Vault";
const SITE_DESCRIPTION =
  "Free past-year question banks for NDA, JEE Mains, NEET, MHT-CET, CDS and Maharashtra Board. Filter PYQs by chapter, difficulty and year, take timed mock tests, download question papers with answer keys, and learn from strategy guides and concept notes. Browse free, no sign-up.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Past-year questions for Indian entrance & board exams`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "past-year questions",
    "PYQ",
    "MHT-CET PYQ",
    "NDA",
    "NEET",
    "JEE Main",
    "CDS",
    "mock tests",
    "concept notes",
    "previous year questions",
    "question paper builder",
    "MCQ bank",
  ],
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Past-year questions for Indian entrance & board exams`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Past-year questions for Indian entrance & board exams`,
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
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable} ${devanagari.variable}`} suppressHydrationWarning>
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
          {/* Client island: parks first-touch attribution in a cookie. Touches no
              server API, so prerendered routes stay prerendered. */}
          <AcquisitionCapture />
          </MobilePromptProvider>
          </BookmarksProvider>
        </CartProvider>
      </body>
    </html>
  );
}
