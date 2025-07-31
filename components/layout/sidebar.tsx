"use client"

import { useMemo } from "react"
import { getArticles } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircleIcon } from "lucide-react"

/**
 * Sidebarコンポーネント
 * アプリケーションのサイドバー部分です。
 * 人気タグなどを表示します。
 */
export function Sidebar() {
  const allArticles = getArticles()

  // 全ての記事からユニークなタグを抽出し、出現回数でソート
  const popularTags = useMemo(() => {
    const tagCounts: Record<string, number> = {}
    allArticles.forEach((article) => {
      article.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })

    return Object.entries(tagCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .map(([tag]) => tag)
      .slice(0, 10) // 上位10個のタグを表示
  }, [allArticles])

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground p-6 border-r hidden md:block">
      <div className="space-y-6">
        {/* 記事投稿ボタン */}
        <Button asChild className="w-full">
          <Link href="/submit">
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            {"記事を投稿"}
          </Link>
        </Button>

        {/* 人気タグセクション */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-sidebar-primary">人気タグ</h2>
          <div className="flex flex-wrap gap-2">
            {popularTags.length > 0 ? (
              popularTags.map((tag) => (
                <Link key={tag} href={`/?tag=${encodeURIComponent(tag)}`}>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">{"タグがありません。"}</p>
            )}
          </div>
        </div>

        {/* その他のナビゲーション（将来的な拡張用） */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-sidebar-primary">{"その他"}</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="block hover:text-sidebar-primary-foreground">
                {"提案を見る"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
