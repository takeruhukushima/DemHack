/**
 * 記事の投票数の型定義
 */
export interface ArticleVotes {
  approve: number // 賛成票の数
  neutral: number // 中立票の数
  disapprove: number // 反対票の数
}

/**
 * 記事の型定義
 */
export interface Article {
  id: string
  title: string
  summary: string
  content: string
  author: string
  date: string // ISO 8601形式の文字列
  votes: ArticleVotes
  tags: string[] // 記事に関連するタグの配列
}
