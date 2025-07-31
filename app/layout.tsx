import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css" // グローバルCSSのインポート
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Sidebar } from "@/components/layout/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevAgora",
  description: "開発者向けの知識共有プラットフォーム",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {/* ヘッダーコンポーネント */}
        <Header />
        {/* メインコンテンツエリアとサイドバーをflexコンテナで配置 */}
        <div className="flex flex-1">
          {/* サイドバーコンポーネント */}
          <Sidebar />
          {/* メインコンテンツエリア */}
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
        </div>
        {/* フッターコンポーネント */}
        <Footer />
      </body>
    </html>
  )
}
