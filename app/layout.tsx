import type { Metadata } from "next";
import { Geist, Geist_Mono, Kode_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/sections/footer";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Kode_Mono({
  weight: "400",
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maxi Schäfer - Fullstack Developer",
  description: "I'm a 18y/o Fullstack Developer from Germany, always available for work!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <Toaster position="top-right" />
          {children}
          <Footer />

          <div className="fixed bottom-0 left-0 right-0 h-22 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
        </ThemeProvider>
      </body>
    </html>
  );
}
