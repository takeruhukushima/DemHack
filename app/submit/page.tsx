"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { addArticle } from "@/lib/data" // 記事追加関数をインポート
import type { Article } from "@/lib/types"

/**
 * 記事投稿ページコンポーネント
 * ユーザーが新しい記事を投稿するためのフォームを提供します。
 */
export default function SubmitPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("") // カンマ区切り文字列
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // タグを配列に変換 (空白をトリムし、空の文字列を除外)
    const parsedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "")

    // 新しい記事オブジェクトを作成
    const newArticle: Article = {
      id: String(Date.now()), // ユニークなIDを生成 (実際にはUUIDなどを使用)
      title,
      summary,
      content,
      author: "匿名ユーザー", // 実際には認証ユーザー名
      date: new Date().toISOString(),
      votes: {
        approve: 0,
        neutral: 0,
        disapprove: 0,
      },
      tags: parsedTags,
    }

    // モックデータに追加 (実際にはバックエンドAPIを呼び出す)
    addArticle(newArticle)

    // フォームをリセット
    setTitle("")
    setSummary("")
    setContent("")
    setTags("")
    setIsSubmitting(false)

    // ホームページにリダイレクト
    router.push("/")
  }

  return (
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">新しい記事を投稿</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-foreground">
                タイトル
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="summary" className="text-foreground">
                要約 (最大200文字)
              </Label>
              <Textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                maxLength={200}
                required
                className="mt-1 min-h-[80px]"
              />
            </div>
            <div>
              <Label htmlFor="content" className="text-foreground">
                記事本文
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="mt-1 min-h-[200px]"
              />
            </div>
            <div>
              <Label htmlFor="tags" className="text-foreground">
                タグ (カンマ区切り, 例: Next.js, TypeScript, UI/UX)
              </Label>
              <Input id="tags" type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="mt-1" />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "投稿中..." : "記事を投稿"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
