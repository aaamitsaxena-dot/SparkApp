import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SparkApp — Student Study Platform",
  description:
    "Fast-track study programs for students. 30-day plans, quizzes, experiments, and achievement levels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-violet-50 text-indigo-950">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
