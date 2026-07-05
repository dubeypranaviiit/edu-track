import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import UserSyncProvider from "@/components/providers/UserSyncProvider";
import AppLayoutWrapper from "@/components/providers/AppLayoutWrapper";

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
  description: "EduTrack – online learning platform for courses, quizzes and assignments.",
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
          {}
          <UserSyncProvider>
            <AppLayoutWrapper>
              {children}
            </AppLayoutWrapper>
          </UserSyncProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
