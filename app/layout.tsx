import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import UserSyncProvider from "@/components/providers/UserSyncProvider";
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduTrack",
  description: "created by Pranav",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* Wrap children in client component */}
          <UserSyncProvider>
            <Header />
            {children}'
             <Footer />
            </UserSyncProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
