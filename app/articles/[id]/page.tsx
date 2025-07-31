import { getArticleById } from "@/lib/data"
import { notFound } from "next/navigation"
import { VoteWidget } from "@/components/vote-widget"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

/**
 * 記事詳細ページコンポーネント
 * 特定のIDの記事の詳細内容を表示します。
 */
export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  // URLパラメータから記事IDを取得し、記事データを取得
  const article = getArticleById(params.id)

  // 記事が見つからない場合は404ページを表示
  if (!article) {
    notFound()
  }

  // ユーザーIDをシミュレート (実際には認証システムから取得)
  const simulatedUserId = "user-123"

  return (
    <div className="space-y-8">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          {"記事一覧へ戻る"}
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground">{article.title}</CardTitle>
          <p className="text-muted-foreground text-sm">
            {"著者: "}
            {article.author} {" | "} {new Date(article.date).toLocaleDateString()}
          </p>
          {/* タグの表示 */}
          <div className="flex flex-wrap gap-2 mt-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 記事の全文を表示 */}
          <div className="prose dark:prose-invert max-w-none text-foreground">
            {article.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          {/* 投票ウィジェット */}
          <div className="border-t pt-6 mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">記事を評価する</h2>
            {/* ユーザーIDを渡して1ユーザー1投票をシミュレート */}
            <VoteWidget articleId={article.id} userId={simulatedUserId} initialVotes={article.votes} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
