# 中古車WEBアプリ

中古車販売店向けの在庫管理・顧客問い合わせ対応を行うWebアプリケーション（MVP）

## プロジェクト概要

このプロジェクトは、中古車販売店向けのWebアプリケーションです。

### 主な機能

**ユーザー向け機能**
- 車両一覧表示・検索
- 車両詳細閲覧
- お気に入り機能（LocalStorage使用）
- 問い合わせ/来店予約フォーム

**管理者向け機能**
- 車両管理（登録・編集・削除）
- CSVインポート機能
- 問い合わせ管理
- ダッシュボード

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **データベース**: Supabase (PostgreSQL)
- **認証**: Supabase Auth
- **ストレージ**: Supabase Storage
- **メール送信**: Resend
- **デプロイ**: Vercel

## ディレクトリ構造

```
.
├── app/                    # Next.js App Router
│   ├── page.tsx           # トップページ（車両一覧）
│   ├── vehicles/[id]/     # 車両詳細
│   ├── favorites/         # お気に入り一覧
│   └── admin/             # 管理画面
│       ├── login/         # ログイン
│       ├── dashboard/     # ダッシュボード
│       ├── vehicles/      # 車両管理
│       ├── import/        # CSVインポート
│       └── inquiries/     # 問い合わせ管理
├── components/            # Reactコンポーネント
│   ├── ui/               # 基本UIコンポーネント
│   ├── layout/           # レイアウトコンポーネント
│   └── features/         # 機能別コンポーネント
├── lib/                   # ライブラリ・ユーティリティ
│   ├── utils.ts          # ユーティリティ関数
│   └── constants.ts      # 定数定義
├── types/                 # TypeScript型定義
│   └── index.ts          # 基本型エクスポート
├── public/                # 静的ファイル
│   └── images/           # 画像ファイル
└── tickets/              # 開発チケット（phase-0～phase-8）
```

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルをプロジェクトルートに作成し、以下の環境変数を設定してください：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Resend
RESEND_API_KEY=your-resend-api-key

# 管理者メール
ADMIN_EMAIL=your-admin-email@example.com
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### 4. ビルド

```bash
npm run build
```

### 5. 本番環境で起動

```bash
npm start
```

## 環境変数の取得方法

### Supabase

1. [Supabase](https://supabase.com/) にアクセス
2. プロジェクトを作成
3. Settings → API から以下を取得:
   - `NEXT_PUBLIC_SUPABASE_URL`: Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon public key

### Resend

1. [Resend](https://resend.com/) にアクセス
2. APIキーを発行
3. `RESEND_API_KEY` に設定

## 開発フロー

このプロジェクトはチケットベースで開発を進めます。

1. `tickets/` ディレクトリ内のチケットを phase-0 から順番に実行
2. 各チケットには依存関係が記載されているため、依存チケットを先に完了
3. 詳細な仕様は `REQUIREMENTS.md` を参照

詳しくは [tickets/README.md](tickets/README.md) を参照してください。

## スクリプト

- `npm run dev`: 開発サーバーを起動
- `npm run build`: 本番用ビルド
- `npm start`: 本番サーバーを起動
- `npm run lint`: ESLintを実行

## ライセンス

このプロジェクトは私的利用のためのものです。
