"use client"

import { useState, useMemo } from "react"
import { ArticleCard } from "@/components/article-card"
import { getArticles } from "@/lib/data"
import type { Article } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

/**
 * ホームページコンポーネント
 * 全ての記事のサマリーを表示し、ソート機能を提供します。
 */
export default function HomePage() {
  const allArticles: Article[] = getArticles()
  const [sortBy, setSortBy] = useState<"totalVotes" | "approveCount" | "date">("date")
  const [searchTerm, setSearchTerm] = useState<string>("")

  // 記事のソートとフィルタリングをメモ化
  const sortedAndFilteredArticles = useMemo(() => {
    const filtered = allArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
    )

    return filtered.sort((a, b) => {
      if (sortBy === "totalVotes") {
        const totalA = a.votes.approve + a.votes.neutral + a.votes.disapprove
        const totalB = b.votes.approve + b.votes.neutral + b.votes.disapprove
        return totalB - totalA // 降順
      } else if (sortBy === "approveCount") {
        return b.votes.approve - a.votes.approve // 降順
      } else {
        // sortBy === "date" (デフォルト)
        return new Date(b.date).getTime() - new Date(a.date).getTime() // 最新順
      }
    })
  }, [allArticles, sortBy, searchTerm])

  return (
    <section className="space-y-8">
      <h1 className="text-4xl font-bold text-foreground">最新の記事</h1>

      {/* 検索バー */}
      <div className="w-full">
        <Input
          type="text"
          placeholder="記事を検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      {/* ソートオプション */}
      <div className="flex items-center gap-4">
        <Label htmlFor="sort-by" className="text-foreground">
          ソート:
        </Label>
        <RadioGroup
          id="sort-by"
          value={sortBy}
          onValueChange={(value: "totalVotes" | "approveCount" | "date") => setSortBy(value)}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="date" id="sort-date" />
            <Label htmlFor="sort-date">最新順</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="totalVotes" id="sort-total-votes" />
            <Label htmlFor="sort-total-votes">総投票数</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="approveCount" id="sort-approve-count" />
            <Label htmlFor="sort-approve-count">賛成数</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedAndFilteredArticles.length > 0 ? (
          sortedAndFilteredArticles.map((article) => (
            // 各記事をArticleCardコンポーネントで表示
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <p className="text-muted-foreground col-span-full">{"該当する記事が見つかりませんでした。"}</p>
        )}
      </div>
    </section>
  )
}
