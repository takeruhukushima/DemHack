import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ArticleVotes } from "@/lib/types"

/**
 * VoteDisplayコンポーネント
 * 記事の投票数を表示するだけのUI部品です。
 * 投票ボタンは含まれません。
 */
interface VoteDisplayProps {
  votes: ArticleVotes
}

export function VoteDisplay({ votes }: VoteDisplayProps) {
  return (
    <div className="flex flex-wrap gap-2 w-full">
      {/* 賛成票 */}
      <div className="flex items-center gap-1">
        <span className="text-sm text-muted-foreground">賛成:</span>
        <Badge
          className={cn(
            "px-2 py-0.5 text-xs font-semibold",
            votes.approve > 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          {votes.approve}
        </Badge>
      </div>

      {/* 中立票 */}
      <div className="flex items-center gap-1">
        <span className="text-sm text-muted-foreground">中立:</span>
        <Badge
          className={cn(
            "px-2 py-0.5 text-xs font-semibold",
            votes.neutral > 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          {votes.neutral}
        </Badge>
      </div>

      {/* 反対票 */}
      <div className="flex items-center gap-1">
        <span className="text-sm text-muted-foreground">反対:</span>
        <Badge
          className={cn(
            "px-2 py-0.5 text-xs font-semibold",
            // 反対票が0より大きい場合も、賛成・中立と同じスタイルに設定
            votes.disapprove > 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          {votes.disapprove}
        </Badge>
      </div>
    </div>
  )
}
