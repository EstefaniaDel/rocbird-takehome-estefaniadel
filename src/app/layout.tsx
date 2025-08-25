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
          <header className="border-b">
            <div className="container flex h-16 items-center">
              <h1 className="font-bold text-xl">Rocbird Talentos</h1>
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