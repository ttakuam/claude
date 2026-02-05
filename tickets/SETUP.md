# 環境セットアップガイド

このドキュメントでは、チケット実行に必要な環境設定を説明します。

## 🔴 Phase 0開始前に必須の環境

### 1. Node.js と npm のインストール

**必要バージョン**:
- Node.js: v18.17以上 または v20以上
- npm: Node.jsに同梱

**インストール手順（Windows）**:
1. https://nodejs.org/ にアクセス
2. LTS版（推奨版）をダウンロード
3. インストーラーを実行
4. インストール後、ターミナルで確認:
   ```bash
   node --version
   npm --version
   ```

**インストール手順（Mac）**:
```bash
# Homebrewを使用
brew install node

# または nvm を使用（推奨）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
```

### 2. Git のインストール

✅ **現在の状態**: インストール済み

確認コマンド:
```bash
git --version
```

### 3. テキストエディタ/IDE

**推奨**: Visual Studio Code (VSCode)
- https://code.visualstudio.com/

**推奨拡張機能**:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin

---

## 🟡 Phase 1開始前に必要な準備

### 1. Supabaseアカウント作成

**タイミング**: チケット #101-A 実行前

**手順**:
1. https://supabase.com/ にアクセス
2. "Start your project" からサインアップ
3. 新規プロジェクト作成
4. プロジェクトURL と Anon Keyをメモ

**必要な情報**:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Resendアカウント作成

**タイミング**: チケット #103-A 実行前

**手順**:
1. https://resend.com/ にアクセス
2. サインアップ
3. APIキーを発行
4. APIキーをメモ

**必要な情報**:
- `RESEND_API_KEY`

### 3. 環境変数ファイル作成

チケット #003-A で `.env.local` ファイルを作成しますが、以下の内容を設定します:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Resend
RESEND_API_KEY=your-resend-api-key

# 管理者メール
ADMIN_EMAIL=your-admin-email@example.com
```

---

## 🟢 Phase 8開始前に必要な準備

### 1. Vercelアカウント作成

**タイミング**: チケット #801-A 実行前

**手順**:
1. https://vercel.com/ にアクセス
2. GitHubアカウントでサインアップ
3. プロジェクトをインポート

### 2. GitHubアカウント

**タイミング**: Phase 0推奨（バージョン管理のため）

**手順**:
1. https://github.com/ にアクセス
2. サインアップ
3. 新規リポジトリ作成

---

## 📝 セットアップチェックリスト

### Phase 0開始前
- [ ] Node.js v18.17以上がインストールされている
- [ ] npm が使用可能
- [ ] Git がインストールされている
- [ ] テキストエディタ/IDE (VSCode推奨) がインストールされている
- [ ] GitHubアカウントを作成済み（推奨）

### Phase 1開始前
- [ ] Supabaseアカウントを作成済み
- [ ] Supabaseプロジェクトを作成済み
- [ ] Supabase URL と Anon Key を取得済み
- [ ] Resendアカウントを作成済み
- [ ] Resend API Key を取得済み

### Phase 8開始前
- [ ] Vercelアカウントを作成済み
- [ ] GitHubにリポジトリをプッシュ済み
- [ ] 本番用Supabaseプロジェクトを作成済み（オプション）

---

## 🔧 トラブルシューティング

### Node.js / npm が見つからない

**症状**: `node: command not found` または `npm: command not found`

**解決策**:
1. Node.jsをインストール
2. ターミナルを再起動
3. PATH環境変数を確認

### Supabaseに接続できない

**症状**: `supabase is not defined` エラー

**解決策**:
1. `.env.local` ファイルが存在するか確認
2. 環境変数が正しく設定されているか確認
3. 開発サーバーを再起動

### Vercelデプロイが失敗する

**症状**: ビルドエラー

**解決策**:
1. ローカルで `npm run build` が成功するか確認
2. Vercelの環境変数が設定されているか確認
3. Node.jsバージョンがVercelと一致しているか確認

---

## 📚 参考リンク

- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [Supabase 公式ドキュメント](https://supabase.com/docs)
- [Tailwind CSS 公式ドキュメント](https://tailwindcss.com/docs)
- [TypeScript 公式ドキュメント](https://www.typescriptlang.org/docs/)
- [Vercel 公式ドキュメント](https://vercel.com/docs)
