import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Containers from "@/components/global/Containers";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jobify Dev",
  description: "Job application tracking system for job hunters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
            <Containers className="py-2">{children}</Containers>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
