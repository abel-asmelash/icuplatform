import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navigation/navbar";
import { Providers } from "@/components/providers";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ICU Forum",
    template: "%s | ICU Forum",
  },
  description:
    "A multicultural Christian Q&A platform by ICU Church in Gouda, Netherlands. Ask questions, share knowledge, grow in faith, and connect with the community.",
  keywords: [
    "ICU Church",
    "Christian forum",
    "Church Q&A",
    "Bible discussion",
    "Christian community",
    "Multicultural church",
    "Gouda church",
    "Faith platform",
  ],
  authors: [{ name: "ICU Church" }],
  openGraph: {
    title: "ICU Forum",
    description:
      "A multicultural Christian Q&A platform by ICU Church in Gouda, Netherlands.",
    url: "https://your-domain.com",
    siteName: "ICU Forum",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ICU Forum",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        figtree.variable,
        spaceGrotesk.variable,
        geistSans.variable,
        geistMono.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
