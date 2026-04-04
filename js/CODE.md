# コード担当ガイド — js/

## ファイル一覧

| ファイル | 読み込み元 | 役割 |
|---|---|---|
| `main.js`  | index.html | ルーティング、アニメーション、カード動的生成 |
| `works.js` | works.html | Work 詳細ページの描画 |
| `study.js` | study.html | Study 詳細ページの描画 |

## main.js の主要機能

1. **パスベースルーティング**: `/works` → `#works` セクションへスクロール（SPA 風）
2. **URL 追従**: スクロール位置に応じて `history.replaceState` でアドレスバーを更新
3. **カード動的生成**: `content/works.json` と `content/studies.json` を `fetch` で読み込み、カード HTML を生成して `.works-grid` に挿入
4. **IntersectionObserver**: セクションやカードがビューポートに入ったら `.visible` を付与してフェードインアニメーション
5. **Hero アニメーション**: テキストを1文字ずつ `<span>` に分割して順番にアニメーション
6. **モバイルメニュー**: ハンバーガーの開閉

## works.js / study.js の構造

```
fetch('content/works.json') → JSON 取得 → URLパラメータ ?id=N の作品を描画
```

描画内容:
- ヒーロー画像 → カテゴリ → タイトル → ツール → 説明 → リンク → ギャラリー → セクション → Prev/Next ナビ

## データの参照関係

```
content/works.json ──→ main.js（カード一覧）
                   └──→ works.js（詳細ページ）

content/studies.json ──→ main.js（カード一覧）
                     └──→ study.js（詳細ページ）
```

## 新しい作品を追加するとき

コード側の変更は不要です。`content/works.json` にデータを追加するだけで、カード一覧と詳細ページの両方に自動反映されます。

## 注意事項

- `fetch` を使っているため、ローカルテストには HTTP サーバーが必要（`npx serve .`）
- `_redirects` ファイルと連携して SPA ルーティングが動作する（Netlify 環境）
