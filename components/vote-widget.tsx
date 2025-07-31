"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThumbsUpIcon, ThumbsDownIcon, MinusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ArticleVotes } from "@/lib/types"

// ユーザーの投票状態をシミュレートするためのMap (実際にはバックエンドで管理)
// キー: `${userId}-${articleId}`, 値: 'approve' | 'neutral' | 'disapprove'
const userVotesMap = new Map<string, "approve" | "neutral" | "disapprove">()

/**
 * VoteWidgetコンポーネント
 * 記事の評価（投票）を行うためのUI部品です。
 * 1ユーザー1投票をクライアントサイドでシミュレートします。
 */
interface VoteWidgetProps {
  articleId: string
  userId: string
  initialVotes: ArticleVotes
}

export function VoteWidget({ articleId, userId, initialVotes }: VoteWidgetProps) {
  const [votes, setVotes] = useState(initialVotes)
  // ユーザーがこの記事に既に投票したかどうか、どのタイプに投票したかを追跡
  const [userVotedType, setUserVotedType] = useState<"approve" | "neutral" | "disapprove" | null>(null)

  useEffect(() => {
    // コンポーネントマウント時に、ユーザーが既に投票しているかチェック
    const key = `${userId}-${articleId}`
    if (userVotesMap.has(key)) {
      setUserVotedType(userVotesMap.get(key)!)
    }
  }, [articleId, userId])

  // 投票ハンドラ
  const handleVote = (type: "approve" | "neutral" | "disapprove") => {
    // 既に投票済みの場合は何もしない
    if (userVotedType !== null) {
      return
    }

    setVotes((prevVotes) => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }))

    // ユーザーの投票状態を更新し、Mapに保存 (クライアントサイドシミュレーション)
    setUserVotedType(type)
    userVotesMap.set(`${userId}-${articleId}`, type)

    // TODO: 実際にはここでバックエンドAPIを呼び出して投票を永続化する
    console.log(`User ${userId} voted ${type} on article ${articleId}`)
  }

  const isVoted = (type: "approve" | "neutral" | "disapprove") => userVotedType === type

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      {/* 賛成票 */}
      <div className="flex-1 flex items-center justify-between p-3 border rounded-md bg-card shadow-sm">
        <span className="font-medium text-foreground">賛成</span>
        <div className="flex items-center gap-2">
          <Badge
            className={cn(
              "px-3 py-1 text-sm font-semibold min-w-[30px] justify-center", // min-wとjustify-centerで幅を揃える
              votes.approve > 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
            )}
          >
            {votes.approve}
          </Badge>
          <Button
            variant={isVoted("approve") ? "default" : "outline"} // 投票済みならprimaryカラー
            size="icon"
            onClick={() => handleVote("approve")}
            disabled={userVotedType !== null} // 投票済みなら無効化
            aria-label="賛成票"
          >
            <ThumbsUpIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 中立票 */}
      <div className="flex-1 flex items-center justify-between p-3 border rounded-md bg-card shadow-sm">
        <span className="font-medium text-foreground">中立</span>
        <div className="flex items-center gap-2">
          <Badge
            className={cn(
              "px-3 py-1 text-sm font-semibold min-w-[30px] justify-center",
              votes.neutral > 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
            )}
          >
            {votes.neutral}
          </Badge>
          <Button
            variant={isVoted("neutral") ? "default" : "outline"}
            size="icon"
            onClick={() => handleVote("neutral")}
            disabled={userVotedType !== null}
            aria-label="中立票"
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 反対票 */}
      <div className="flex-1 flex items-center justify-between p-3 border rounded-md bg-card shadow-sm">
        <span className="font-medium text-foreground">反対</span>
        <div className="flex items-center gap-2">
          <Badge
            className={cn(
              "px-3 py-1 text-sm font-semibold min-w-[30px] justify-center",
              votes.disapprove > 0 ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground",
            )}
          >
            {votes.disapprove}
          </Badge>
          <Button
            variant={isVoted("disapprove") ? "default" : "outline"}
            size="icon"
            onClick={() => handleVote("disapprove")}
            disabled={userVotedType !== null}
            aria-label="反対票"
          >
            <ThumbsDownIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
