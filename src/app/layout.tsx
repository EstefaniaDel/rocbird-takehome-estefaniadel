import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rocbird - Gestión de Talentos",
  description: "Sistema interno de gestión de talentos y staffing para Rocbird",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
            <header className="border-b bg-white">
              <div className="container flex h-20 items-center gap-4 px-6 mx-auto">
                {/* Logo: Simple Lightbulb Icon */}
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {/* Lightbulb shape: bulb, filament, base */}
                    <ellipse cx="12" cy="9" rx="6" ry="7" stroke="currentColor" strokeWidth={2} fill="none"/>
                    <rect x="10" y="16" width="4" height="4" rx="1" stroke="currentColor" strokeWidth={2} fill="none"/>
                    <line x1="12" y1="13" x2="12" y2="16" stroke="currentColor" strokeWidth={2}/>
                  </svg>
                </span>
                <h1 className="font-bold text-2xl text-gray-900">Rocbird Talentos</h1>
              </div>
            </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t py-4">
            <div className="container text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Rocbird - Sistema de Gestión de Talentos
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}