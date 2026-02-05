# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# 基本方針
- 必ず日本語で応対してください。
- ユーザーは「Takuam」という名前で、開発初心者です。分かりやすく解説して、技術スキルを教育してあげてください。

# プロジェクト概要

中古車販売店向けのWebアプリケーション（MVP）。

- **技術スタック**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase
- **主要機能**:
  - ユーザー向け: 車両閲覧・検索・問い合わせ・お気に入り機能
  - 管理者向け: 車両管理・CSVインポート・問い合わせ管理
- **データベース**: Supabase (PostgreSQL)
- **認証**: Supabase Auth (管理画面のみ)
- **ストレージ**: Supabase Storage (車両画像)
- **メール送信**: Resend
- **デプロイ**: Vercel

# プロジェクト構造

```
.
├── REQUIREMENTS.md      # 詳細な要件定義書（機能要件・非機能要件・データ構造など）
├── TICKETS.md          # 全チケット一覧（自動生成）
├── tickets/            # フェーズ別の開発チケット
│   ├── phase-0/       # プロジェクトセットアップ
│   ├── phase-1/       # インフラ・環境構築
│   ├── phase-2/       # データベース設計・構築
│   ├── phase-3/       # 認証システム
│   ├── phase-4/       # 基本UI・共通コンポーネント
│   ├── phase-5/       # ユーザー向け機能
│   ├── phase-6/       # 管理者向け機能
│   ├── phase-7/       # テスト・最適化
│   ├── phase-8/       # デプロイ・運用準備
│   ├── README.md      # チケット管理の説明
│   └── SETUP.md       # 環境セットアップガイド
└── .claude/
    └── CLAUDE.md       # このファイル
```

**注**: 実装が進むと `src/` または `app/` ディレクトリが作成されます。

# 開発ワークフロー

## 基本的な開発の進め方

1. **チケットベースで開発**: `tickets/` ディレクトリ内のチケットを phase-0 から順番に実行
2. **依存関係の確認**: 各チケットには依存関係が記載されているため、依存チケットを先に完了
3. **要件の参照**: 詳細な仕様は `REQUIREMENTS.md` を参照
4. **環境セットアップ**: `tickets/SETUP.md` に環境構築手順が記載

## チケットの構造

各チケットには以下が含まれます:
- 説明
- タスクリスト（チェックボックス）
- 受入条件
- 依存関係
- 優先度（🔴 High / 🟡 Medium / 🟢 Low）
- 工数見積

## 環境変数

プロジェクトルートの `.env.local` に以下を設定:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Resend
RESEND_API_KEY=
ADMIN_EMAIL=
```

**重要**: `.env.local` は `.gitignore` に含める必要があります。

# データベース設計

主要テーブル:
- `vehicles`: 車両情報（基本スペック・価格・ステータス）
- `vehicle_images`: 車両画像（外部キー: vehicles.id）
- `inquiries`: 問い合わせ（外部キー: vehicles.id）

**Row Level Security (RLS)**:
- `vehicles`: 公開車両は誰でも閲覧可、CRUD操作は認証ユーザーのみ
- `vehicle_images`: 誰でも閲覧可、CRUD操作は認証ユーザーのみ
- `inquiries`: 認証ユーザーのみ閲覧可、INSERT（問い合わせ送信）は誰でも可

詳細は `REQUIREMENTS.md` の「データ構造」セクションを参照。

# アーキテクチャ

## ルーティング構造（予定）

```
/                          # 車両一覧（ユーザー向け）
/vehicles/[id]             # 車両詳細
/favorites                 # お気に入り一覧（LocalStorage使用）
/admin/login               # 管理者ログイン
/admin/dashboard           # ダッシュボード
/admin/vehicles            # 車両管理
/admin/vehicles/new        # 車両新規登録
/admin/vehicles/[id]/edit  # 車両編集
/admin/import              # CSVインポート
/admin/inquiries           # 問い合わせ一覧
```

## 主要なアーキテクチャパターン

- **認証**: Supabase Auth（管理画面のみ、ミドルウェアで保護）
- **データ取得**: Supabase JavaScript Clientを使用（クライアントサイド）
- **画像管理**: Supabase Storage（公開バケット `vehicle-images`）
- **お気に入り**: LocalStorage（ログイン不要）
- **問い合わせ**: `/api/inquiries` エンドポイント → Resendでメール送信

# Claude Code関連

- **コンテキスト節約**: 調査やデバッグにはサブエージェントを積極的に活用
- **重要情報の保存**: スレッドが圧縮要約される前に、定期的に重要な点をマークダウンでプロジェクトディレクトリ内に保存・更新
- **機密情報の取り扱い**: 開発中に生成するドキュメントにAPIキーなどの機密情報を書く場合は、必ず `.gitignore` に追加
- **コミットメッセージ**: 1行の日本語でシンプルに記述

# 開発時の注意点

## セキュリティ
- 環境変数は `.env.local` で管理し、Gitにコミットしない
- Supabase RLSポリシーを必ず設定
- 画像アップロードは許可形式（jpg、png、gif、webp）のみ
- XSS/CSRF対策はReact/Next.jsが自動で行う

## パフォーマンス
- Next.js Image コンポーネントを使用して画像最適化
- データベースクエリは適切なインデックスを使用
- ページ読み込みは3秒以内を目標

## ブラウザ対応
- デスクトップ: Chrome、Firefox、Safari、Edge（最新版）
- モバイル: iOS Safari、Android Chrome（最新版）
- レスポンシブ対応必須

## CSVインポート
- 車両情報の一括登録機能
- 必須列: vehicle_id, manufacturer, model, price, year, mileage, accident_history
- 画像は後から管理画面で個別登録

# 参考ドキュメント

プロジェクト内:
- `REQUIREMENTS.md`: 詳細な要件定義
- `tickets/README.md`: チケット管理の説明
- `tickets/SETUP.md`: 環境セットアップガイド

外部:
- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [Supabase 公式ドキュメント](https://supabase.com/docs)
- [Tailwind CSS 公式ドキュメント](https://tailwindcss.com/docs)
- [TypeScript 公式ドキュメント](https://www.typescriptlang.org/docs/)
