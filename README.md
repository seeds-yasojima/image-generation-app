# Flux Schnell - AI 画像生成アプリ

AI を活用した画像生成 Web アプリケーションです。日本語の指示文を入力すると、OpenAI の翻訳機能と Replicate の Flux Schnell モデルを使用して高品質な画像を生成します。

## 🚀 機能

- **日本語対応**: 日本語の指示文を自然な英語に翻訳して画像生成
- **リアルタイム生成**: 非同期処理による画像生成の進行状況表示
- **スタイル選択**: 複数の画像スタイルから選択可能
- **アスペクト比**: 16:9（横長）と 1:1（正方形）の比率に対応
- **画像ダウンロード**: 生成された画像の保存機能
- **レスポンシブデザイン**: モバイル・デスクトップ対応

## 🛠️ 技術スタック

### フロントエンド

- **Next.js 15.5.0** - React フレームワーク（App Router）
- **React 19.1.0** - UI ライブラリ
- **TypeScript 5** - 型安全な開発
- **Tailwind CSS 4** - ユーティリティファースト CSS
- **Radix UI** - アクセシブルな UI コンポーネント
- **Lucide React** - アイコンライブラリ

### バックエンド・AI

- **OpenAI API** - 日本語 → 英語翻訳（GPT-4o-mini）
- **Replicate API** - Flux Schnell 画像生成モデル
- **Next.js API Routes** - サーバーサイド処理

### 開発・ビルド

- **ESLint** - コード品質管理
- **Turbopack** - 高速開発サーバー
- **PostCSS** - CSS 処理

## 📁 ディレクトリ構造

```
flux-schnell/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── generate/      # 画像生成開始API
│   │   │   └── poll/          # 生成状況確認API
│   │   ├── components/        # ページ固有コンポーネント
│   │   │   ├── ImageGenerator.tsx  # 画像生成フォーム
│   │   │   └── SampleGallery.tsx   # サンプル画像ギャラリー
│   │   ├── globals.css        # グローバルスタイル
│   │   ├── layout.tsx         # ルートレイアウト
│   │   └── page.tsx           # ホームページ
│   ├── components/            # 再利用可能なUIコンポーネント
│   │   └── ui/               # shadcn/uiコンポーネント
│   │       ├── button.tsx    # ボタンコンポーネント
│   │       ├── card.tsx      # カードコンポーネント
│   │       ├── input.tsx     # 入力フィールド
│   │       └── skeleton.tsx  # ローディングスケルトン
│   └── lib/                  # ユーティリティ・設定
│       ├── openai.ts         # OpenAI API設定・翻訳機能
│       ├── replicate.ts      # Replicate API設定・画像生成
│       ├── styles.ts         # 画像スタイル定義
│       └── utils.ts          # 共通ユーティリティ関数
├── public/                    # 静的ファイル
├── components.json           # shadcn/ui設定
├── tailwind.config.ts        # Tailwind CSS設定
├── next.config.ts            # Next.js設定
└── package.json              # 依存関係・スクリプト
```

## 🚀 セットアップ

### 前提条件

- Node.js 18.17.0 以上
- npm, yarn, pnpm, または bun

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd flux-schnell
```

### 2. 依存関係のインストール

```bash
npm install
# または
yarn install
# または
pnpm install
# または
bun install
```

### 3. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
# OpenAI API設定
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_TRANSLATION_MODEL=gpt-4o-mini

# Replicate API設定
REPLICATE_API_TOKEN=your_replicate_api_token_here
REPLICATE_MODEL_SLUG=black-forest-labs/flux-schnell
```

### 4. 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認してください。

## 📝 使用方法

1. **指示文入力**: 生成したい画像の説明を日本語で入力
2. **スタイル選択**: 希望する画像スタイルを選択
3. **アスペクト比選択**: 16:9（横長）または 1:1（正方形）を選択
4. **生成開始**: 「画像を生成」ボタンをクリック
5. **進行状況確認**: 生成状況がリアルタイムで表示
6. **画像確認・ダウンロード**: 生成完了後、画像を確認・保存

## 🔧 開発

### 利用可能なスクリプト

```bash
# 開発サーバー起動（Turbopack使用）
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm run start

# リンター実行
npm run lint
```

### コード品質

- ESLint によるコード品質管理
- TypeScript による型安全性
- Prettier によるコードフォーマット（推奨）

## 🌐 デプロイ

### Vercel（推奨）

```bash
npm run build
vercel --prod
```

### その他のプラットフォーム

- Netlify
- AWS Amplify
- Railway
- Render

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📞 サポート

問題や質問がある場合は、GitHub の Issues ページでお知らせください。

---

**Flux Schnell** - AI 画像生成を簡単に、美しく。
