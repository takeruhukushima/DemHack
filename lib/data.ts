import type { Article } from "./types"

/**
 * モックデータ: 記事の配列
 * NOTE: この配列はクライアントサイドで一時的に変更可能にするため `let` で宣言しています。
 * 実際にはバックエンドのデータベースからデータを取得・更新します。
 */
const articles: Article[] = [
  {
    id: "1",
    title: "Next.js App Routerでのデータフェッチ戦略",
    summary:
      "Next.js 13以降のApp Routerにおけるデータフェッチのベストプラクティスについて解説します。サーバーコンポーネントとクライアントコンポーネントでのデータ取得方法、キャッシュ戦略、再検証の仕組みなどを網羅的に説明します。",
    content: `Next.js 13で導入されたApp Routerは、React Server Componentsを基盤としており、データフェッチのパラダイムを大きく変えました。従来のPages Routerでは、getServerSidePropsやgetStaticProps、useEffectフックなどを用いてデータフェッチを行っていましたが、App Routerではサーバーコンポーネントがデフォルトとなり、より柔軟かつ効率的なデータ取得が可能になりました。

### サーバーコンポーネントでのデータフェッチ
サーバーコンポーネントでは、非同期関数としてコンポーネントを定義し、awaitキーワードを使って直接データをフェッチできます。これにより、クライアントサイドでのデータ取得に伴うウォーターフォール問題を回避し、初期ロード時のパフォーマンスを向上させることができます。

\`\`\`tsx
// app/page.tsx (サーバーコンポーネント)
async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Page() {
  const posts = await getPosts();
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
\`\`\`

### クライアントコンポーネントでのデータフェッチ
クライアントコンポーネントでデータフェッチを行う場合は、useEffectフックとuseStateフックを組み合わせるか、SWRやReact Queryのようなデータフェッチライブラリを使用するのが一般的です。これらは、キャッシュ、再検証、エラーハンドリングなどの機能を提供し、クライアントサイドでのデータ管理を容易にします。

### キャッシュと再検証
Next.jsは、fetch APIを拡張し、リクエストのキャッシュと再検証をサポートしています。デフォルトでは、fetchリクエストは自動的にキャッシュされ、ビルド時またはリクエスト時に再検証されます。revalidateオプションを使用することで、特定の時間間隔でデータを再検証するように設定できます。

この新しいデータフェッチ戦略を理解し、適切に活用することで、より高性能でスケーラブルなNext.jsアプリケーションを構築することが可能になります。`,
    author: "DevMaster",
    date: "2025-07-28T10:00:00Z",
    votes: {
      approve: 15,
      neutral: 3,
      disapprove: 2,
    },
    tags: ["Next.js", "データフェッチ", "React", "サーバーコンポーネント"],
  },
  {
    id: "2",
    title: "TypeScriptにおける型安全な状態管理のパターン",
    summary:
      "大規模なTypeScriptプロジェクトで型安全性を保ちながら状態管理を行うための様々なパターンと、それぞれのメリット・デメリットを比較検討します。Redux, Zustand, Jotai, Recoilなどのライブラリに触れながら、実践的なアプローチを提案します。",
    content: `TypeScriptを使用するプロジェクトにおいて、状態管理はアプリケーションの堅牢性と保守性を大きく左右する要素です。特に大規模なアプリケーションでは、状態の型安全性を確保することが開発効率と品質向上に直結します。

### ReduxとRedux Toolkit
Reduxは長年JavaScriptエコシステムで広く使われてきた状態管理ライブラリですが、TypeScriptとの組み合わせではボイラープレートコードが多くなりがちでした。しかし、Redux Toolkitの登場により、型安全性を保ちつつ、より少ないコードでReduxを記述できるようになりました。createSliceやcreateAsyncThunkなどの機能は、型推論を強化し、開発体験を向上させます。

### Zustand
Zustandは、Reduxよりも軽量でシンプルな状態管理ライブラリです。フックベースのAPIを提供し、TypeScriptとの相性も非常に良いです。状態の定義が直感的で、ミドルウェアの追加も容易なため、小〜中規模のプロジェクトや、Reduxの複雑さを避けたい場合に適しています。

\`\`\`typescript
// store.ts
import { create } from 'zustand';

interface BearState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

export default useBearStore;
\`\`\`

### JotaiとRecoil
JotaiとRecoilは、ReactのコンテキストAPIとフックをベースにしたアトミックな状態管理ライブラリです。これらは、状態を小さな「アトム」として定義し、必要なコンポーネントだけがそのアトムを購読することで、レンダリングの最適化を図ります。TypeScriptとの統合もスムーズで、特にRecoilはFacebookが開発しているため、将来的なReactの進化にも対応しやすいと期待されています。

どの状態管理パターンを選択するかは、プロジェクトの規模、チームの習熟度、そして特定の要件によって異なります。重要なのは、選択したパターンが型安全性を確保し、アプリケーションの成長に合わせてスケールできること、そして開発者が効率的に作業できる環境を提供することです。`,
    author: "CodeArchitect",
    date: "2025-07-25T14:30:00Z",
    votes: {
      approve: 18,
      neutral: 5,
      disapprove: 1,
    },
    tags: ["TypeScript", "状態管理", "Redux", "Zustand", "Jotai", "Recoil"],
  },
  {
    id: "3",
    title: "WebAssemblyとRustで高性能なWebアプリケーションを構築する",
    summary:
      "WebAssembly (Wasm) とRustを組み合わせることで、Webブラウザ上でネイティブに近いパフォーマンスを実現する方法を探ります。画像処理やゲーム開発など、計算負荷の高いタスクにおけるWasmの可能性と、Rustでの開発ワークフローを紹介します。",
    content: `WebAssembly (Wasm) は、Webブラウザ上で高性能なコードを実行するためのバイナリ命令フォーマットです。JavaScriptの実行速度の限界を超える必要があるアプリケーション、例えば複雑な画像処理、ビデオ編集、3Dゲーム、科学計算などにおいて、Wasmは強力なソリューションを提供します。そして、RustはWasmのコンパイルターゲットとして非常に優れた言語です。

### なぜRustとWasmなのか？
Rustは、メモリ安全性とパフォーマンスを両立させたシステムプログラミング言語です。ガベージコレクションがなく、コンパイル時にメモリ安全性を保証するため、Wasmにコンパイルされたコードは非常に効率的です。また、Rustの強力な型システムと所有権システムは、大規模なプロジェクトでのバグの発生を抑え、コードの信頼性を高めます。

### 開発ワークフロー
RustでWasmモジュールを開発する一般的なワークフローは以下の通りです。

1.  **Rustコードの記述**: Wasmとして実行したいロジックをRustで記述します。
2.  **wasm-packの利用**: wasm-packツールは、RustコードをWasmにコンパイルし、JavaScriptからWasmモジュールを簡単にインポートして利用できるようにするためのJavaScriptバインディングを生成します。
3.  **JavaScriptからの利用**: 生成されたJavaScriptバインディングをWebアプリケーションからインポートし、Wasmモジュール内の関数を呼び出します。

\`\`\`rust
// src/lib.rs
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
\`\`\`

\`\`\`javascript
// index.js (JavaScript側)
import { greet } from './pkg/my_wasm_lib'; // wasm-packが生成するパス

console.log(greet("World")); // "Hello, World!"
\`\`\`

### Wasmの可能性
Wasmはまだ進化の途上にありますが、その可能性は計り知れません。既存のC/C++ライブラリをWebに持ち込んだり、ブロックチェーン技術やAI/MLの推論をクライアントサイドで実行したりするなど、様々なユースケースが考えられます。RustとWasmの組み合わせは、Webアプリケーションの性能と機能を次のレベルへと引き上げる鍵となるでしょう。`,
    author: "WebInnovator",
    date: "2025-07-20T09:15:00Z",
    votes: {
      approve: 10,
      neutral: 8,
      disapprove: 5,
    },
    tags: ["WebAssembly", "Rust", "パフォーマンス", "Web開発"],
  },
  {
    id: "4",
    title: "CSS-in-JSからTailwind CSSへの移行ガイド",
    summary:
      "CSS-in-JSライブラリからTailwind CSSへの移行を検討している開発者向けに、具体的な移行手順、考慮すべき点、そして移行後のメリットについて詳しく解説します。大規模プロジェクトでの実践的なアプローチを紹介します。",
    content: `近年、Web開発におけるスタイリングのアプローチは多様化しています。特に、CSS-in-JSライブラリ（Styled Components, Emotionなど）とユーティリティファーストなCSSフレームワーク（Tailwind CSS）は、それぞれ異なる哲学を持っています。本記事では、CSS-in-JSからTailwind CSSへの移行を検討している開発者向けに、そのプロセスとメリット・デメリットを解説します。

### なぜ移行を検討するのか？
CSS-in-JSはコンポーネントとスタイルを密接に結合し、JavaScriptの恩恵を受けられる一方で、ランタイムパフォーマンスのオーバーヘッド、バンドルサイズの増加、学習コストなどの課題も指摘されています。一方、Tailwind CSSは、ユーティリティクラスを直接HTMLに記述することで、高速な開発サイクル、一貫性のあるデザインシステム、そしてビルド時の最適化による小さなCSSバンドルサイズを実現します。

### 移行のステップ
1.  **既存スタイルの棚卸し**: まず、既存のCSS-in-JSで定義されているスタイルを洗い出し、デザインシステムとして再整理します。
2.  **Tailwind CSSの導入**: プロジェクトにTailwind CSSをインストールし、設定ファイルを適切に構成します。
3.  **コンポーネントごとの移行**: 小さなコンポーネントから順に、CSS-in-JSのスタイルをTailwind CSSのユーティリティクラスに置き換えていきます。この際、@applyディレクティブを使用して、既存のコンポーネント名をTailwindクラスのセットとして定義することも可能です。
4.  **カスタムCSSの管理**: Tailwind CSSで表現できない、または複雑すぎるスタイルは、通常のCSSファイルや@layerディレクティブを使って管理します。
5.  **テストとリファクタリング**: 移行後も、UIの整合性とパフォーマンスを確保するために、徹底的なテストと継続的なリファクタリングを行います。

### 移行後のメリット
Tailwind CSSへの移行により、開発者はより迅速にUIを構築できるようになり、デザインの一貫性が向上します。また、CSSの肥大化を防ぎ、パフォーマンスの最適化にも貢献します。ただし、初期の学習コストや、HTMLがクラス名で冗長になるというデメリットも理解しておく必要があります。`,
    author: "StyleGuru",
    date: "2025-07-18T11:45:00Z",
    votes: {
      approve: 14,
      neutral: 2,
      disapprove: 0,
    },
    tags: ["CSS", "Tailwind CSS", "CSS-in-JS", "フロントエンド"],
  },
  {
    id: "5",
    title: "マイクロフロントエンドアーキテクチャの導入と課題",
    summary:
      "大規模なWebアプリケーション開発において注目されるマイクロフロントエンドアーキテクチャについて、そのメリット、デメリット、そして導入時の具体的な課題と解決策を解説します。",
    content: `マイクロフロントエンドアーキテクチャは、大規模なモノリシックなフロントエンドアプリケーションを、独立して開発・デプロイ可能な小さなアプリケーションに分割するアプローチです。これにより、複数のチームが並行して作業を進めやすくなり、技術スタックの選択肢も広がります。

### メリット
*   **独立した開発・デプロイ**: 各マイクロフロントエンドは独立しているため、個別に開発、テスト、デプロイが可能です。
*   **技術スタックの自由度**: 各マイクロフロントエンドで異なるフレームワークやライブラリを選択できます。
*   **スケーラビリティ**: チームや機能の増加に合わせて、フロントエンドをスケールアウトしやすくなります。

### デメリットと課題
*   **複雑性の増加**: ルーティング、状態管理、通信、共通コンポーネントの共有など、全体的なアーキテクチャの複雑性が増します。
*   **バンドルサイズの肥大化**: 共通ライブラリの重複により、バンドルサイズが大きくなる可能性があります。
*   **運用コスト**: 複数のアプリケーションを管理・監視する必要があるため、運用コストが増加します。

### 導入時の考慮事項
*   **ルーティング戦略**: シェルアプリケーションが各マイクロフロントエンドへのルーティングをどのように管理するか。
*   **通信方法**: マイクロフロントエンド間でどのようにデータをやり取りするか（例: カスタムイベント、Pub/Subパターン）。
*   **共通コンポーネント**: デザインシステムや共通UIコンポーネントをどのように共有・管理するか。

マイクロフロントエンドは銀の弾丸ではありませんが、適切なユースケースと慎重な設計により、大規模なWebアプリケーション開発の課題を解決する強力なツールとなり得ます。`,
    author: "Architekt",
    date: "2025-07-15T08:00:00Z",
    votes: {
      approve: 12,
      neutral: 4,
      disapprove: 3,
    },
    tags: ["アーキテクチャ", "マイクロフロントエンド", "大規模開発", "Web開発"],
  },
]

/**
 * 全ての記事を取得する関数
 * @returns Article[] 記事の配列
 */
export function getArticles(): Article[] {
  return articles
}

/**
 * IDに基づいて単一の記事を取得する関数
 * @param id 記事のID
 * @returns Article | undefined 記事オブジェクト、または見つからない場合はundefined
 */
export function getArticleById(id: string): Article | undefined {
  return articles.find((article) => article.id === id)
}

/**
 * 新しい記事を追加する関数
 * NOTE: この関数はクライアントサイドでモックデータを更新するために使用されます。
 * 実際にはバックエンドAPIを呼び出してデータベースに保存します。
 * @param newArticle 追加する記事オブジェクト
 */
export function addArticle(newArticle: Article) {
  articles.push(newArticle)
  // 記事が追加されたことをコンソールに表示 (デバッグ用)
  console.log("New article added:", newArticle)
  console.log("Current articles:", articles)
}
