# Yuri FUJIMURA Portfolio — 全体統括

## フォルダ構成

```
01_website/
  index.html          ← トップページ（HTML骨格のみ）
  works.html          ← Work 詳細ページ
  study.html          ← Study 詳細ページ
  _redirects          ← Netlify 用リライト設定

  css/
    LAYOUT.md         ← レイアウト担当向けガイド
    style.css         ← 全ページ共通スタイル

  js/
    CODE.md           ← コード担当向けガイド
    main.js           ← index.html のロジック（ルーティング、アニメーション、カード生成）
    works.js          ← works.html の詳細ページ表示ロジック
    study.js          ← study.html の詳細ページ表示ロジック

  content/
    TEXT.md           ← テキスト担当向けガイド
    profile.json      ← About 欄のプロフィールデータ
    works.json        ← Works の全データ（カード + 詳細ページ）
    studies.json      ← Study の全データ（カード + 詳細ページ）

  img/
    works/            ← Works 用画像
    study/            ← Study 用画像
```

## データの流れ

```
content/*.json → js/*.js が fetch で読み込み → HTML に動的レンダリング
css/style.css → 全 HTML から <link> で参照
```

- index.html のカード一覧と works.html/study.html の詳細ページは、同じ JSON ファイルをデータソースとして共有する
- テキストを変えたいときは JSON だけ編集すれば、一覧・詳細の両方に反映される

## よくある更新パターン

| やりたいこと | 触るファイル | 担当 |
|---|---|---|
| 作品の追加・編集 | `content/works.json` | テキスト |
| 研究発表の追加・編集 | `content/studies.json` | テキスト |
| プロフィール変更 | `content/profile.json` | テキスト |
| 色・フォント・余白の変更 | `css/style.css` | レイアウト |
| アニメーション・動作の変更 | `js/main.js` | コード |
| 詳細ページの表示ロジック変更 | `js/works.js` / `js/study.js` | コード |
| ページの構造変更 | `*.html` | コード + レイアウト |

## ホスティング

- GitHub にプッシュ → Netlify が自動デプロイ
- カスタムドメイン: yurifujimura.com
- `_redirects` で `/works` `/about` 等のパスを index.html にリライト（SPA 対応）

## 注意事項

- 画像ファイル名に日本語を使わない（Netlify で認識されない）
- JSON を編集するときはカンマの過不足に注意（末尾カンマ NG）
- ローカルで確認する場合は `npx serve .` 等で HTTP サーバーを使う（file:// では fetch が動かない）
