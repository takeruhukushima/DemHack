import { getArticleById } from "@/lib/data"
import { notFound } from "next/navigation"
import { VoteWidget } from "@/components/vote-widget"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Article } from "@/lib/types"

// 動的ルーティングの設定
export const dynamic = 'force-dynamic' // 常に動的レンダリングを有効にする

interface ArticleDetailContentProps {
  article: Article
}

/**
 * 記事詳細ページの表示コンポーネント
 */
function ArticleDetailContent({ article }: ArticleDetailContentProps) {
  // ユーザーIDをシミュレート (実際には認証システムから取得)
  const simulatedUserId = "user-123"
  
  // 記事データをデストラクチャリング
  const { id: articleId, title, content, date, author, tags = [], votes } = article

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          記事一覧に戻る
        </Link>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col space-y-1.5">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>投稿日: {new Date(date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{author}</span>
              {tags && tags.length > 0 && (
                <>
                  <span>•</span>
                  <div className="flex flex-wrap gap-1">
                    {tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-medium mb-4">この記事を評価する</h3>
            <VoteWidget 
              articleId={articleId}
              userId={simulatedUserId}
              initialVotes={votes}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * 記事詳細ページ
 */
export default async function ArticleDetailPage({
  params,
}: {
  params: { id: string }
}) {
  // 動的パラメータを安全に取得するために、paramsを一度変数に代入
  const { id } = await params;
  
  // 記事データを取得
  const article = await getArticleById(id)

  // 記事が見つからない場合は404ページを表示
  if (!article) {
    notFound()
  }

  return <ArticleDetailContent article={article} />
}
