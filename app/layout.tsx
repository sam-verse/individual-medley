import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Individual Medley | Swimming & Fitness Center",
  description:
    "Premier swimming and fitness center offering professional training programs, classes, and facilities for all skill levels.",
  icons: {
    icon: "/images/swimming-logo.png",
    apple: "/images/swimming-logo.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/swimming-logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={inter.className}>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
