import { getArticleById } from "@/lib/data"
import { notFound } from "next/navigation"
import { VoteWidget } from "@/components/vote-widget"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ReactMarkdown, { Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Article } from "@/lib/types"

type MarkdownComponents = Components & {
  code?: React.ComponentType<{node?: any; inline?: boolean; className?: string; children?: React.ReactNode}>;
}

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
          <div className="prose prose-slate max-w-none dark:prose-invert dark:prose-headings:text-white dark:prose-p:text-slate-300 dark:prose-strong:text-white dark:prose-a:text-blue-400">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node: _, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                h2: ({ node: _, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
                h3: ({ node: _, ...props }) => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
                p: ({ node: _, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                a: ({ node: _, ...props }) => <a className="hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                ul: ({ node: _, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
                ol: ({ node: _, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                li: ({ node: _, ...props }) => <li className="mb-1" {...props} />,
                blockquote: ({ node: _, ...props }) => <blockquote className="border-l-4 border-slate-200 dark:border-slate-600 pl-4 italic my-4" {...props} />,
                code: ({ node, className, children, ...props }: { node?: any; className?: string; children?: React.ReactNode }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return !className ? (
                    <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm" {...props}>
                      {children}
                    </code>
                  ) : (
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto my-4">
                      <pre className="m-0">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  );
                },
                table: ({ node: _, ...props }) => (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse" {...props} />
                  </div>
                ),
                th: ({ node: _, ...props }) => (
                  <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left bg-slate-100 dark:bg-slate-800" {...props} />
                ),
                td: ({ node: _, ...props }) => (
                  <td className="border border-slate-300 dark:border-slate-600 px-4 py-2" {...props} />
                ),
              } as MarkdownComponents}
            >
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
