import Link from "next/link"
import { MountainIcon, LogInIcon } from "lucide-react" // アイコンライブラリ
import { Button } from "@/components/ui/button"

/**
 * Headerコンポーネント
 * アプリケーションのヘッダー部分です。
 */
export function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* アプリケーションロゴとタイトル */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <MountainIcon className="h-6 w-6" />
          {"DevAgora"}
        </Link>
        {/* ナビゲーションリンクとログインボタン */}
        <nav className="flex items-center gap-4">
          <ul className="flex gap-4">
            <li>
              <Link href="/" className="hover:underline">
                {"ホーム"}
              </Link>
            </li>
            {/* 将来的に追加するリンクのプレースホルダー */}
            {/* <li>
              <Link href="/proposals" className="hover:underline">
                {'提案'}
              </Link>
            </li> */}
          </ul>
          <Button asChild variant="secondary" className="hidden sm:flex">
            <Link href="/login">
              {" "}
              {/* ログインページへのリンク (仮) */}
              <LogInIcon className="mr-2 h-4 w-4" />
              {"ログイン"}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
