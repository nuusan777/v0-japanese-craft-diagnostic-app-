import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "伝統工芸診断 - あなたにぴったりの日本の工芸品を見つけよう",
  description: "性格診断であなたに最適な日本の伝統工芸品を発見しましょう",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
  <body className="font-sans bg-[#F7F5E6]">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
