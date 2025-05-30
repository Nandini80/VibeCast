import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vibe Check Quiz - Discover Your True Vibe",
  description:
    "Take our fun 5-question quiz to discover your unique vibe! Share your results and see how you compare with others on the leaderboard.",
  keywords: "vibe check, personality quiz, fun quiz, social sharing, vibe test",
  openGraph: {
    title: "Vibe Check Quiz - What's Your Vibe?",
    description: "Discover your true vibe in just 5 questions! 🌟",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vibe Check Quiz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Check Quiz - What's Your Vibe?",
    description: "Discover your true vibe in just 5 questions! 🌟",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
