import Link from "next/link"
import type { Article } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { VoteDisplay } from "./vote-display" // VoteDisplayをインポート
import { Badge } from "@/components/ui/badge"

/**
 * ArticleCardコンポーネント
 * ホームページに表示される記事のサマリーカードです。
 */
interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          {/* 記事詳細ページへのリンク */}
          <Link href={`/articles/${article.id}`} className="hover:underline">
            {article.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          {"著者: "}
          {article.author} {" | "} {new Date(article.date).toLocaleDateString()}
        </CardDescription>
        {/* タグの表示 */}
        <div className="flex flex-wrap gap-2 mt-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {/* 記事の要約 */}
        <p className="text-foreground line-clamp-3">{article.summary}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 pt-4 border-t">
        <h3 className="text-lg font-medium text-foreground">評価</h3>
        {/* 投票数を表示するコンポーネントを使用 */}
        <VoteDisplay votes={article.votes} />
      </CardFooter>
    </Card>
  )
}
