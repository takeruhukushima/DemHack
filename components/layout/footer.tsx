import Link from "next/link"

/**
 * Footerコンポーネント
 * アプリケーションのフッター部分です。
 */
export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-6 px-6 mt-auto border-t">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          {"© "}
          {new Date().getFullYear()}
          {" DemHack. All rights reserved."}
        </p>
        <nav className="flex gap-4 text-sm">
          <Link href="#" className="hover:underline">
            {"プライバシーポリシー"}
          </Link>
          <Link href="#" className="hover:underline">
            {"利用規約"}
          </Link>
        </nav>
      </div>
    </footer>
  )
}
