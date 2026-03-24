# レイアウト担当ガイド — css/style.css

## 概要

`style.css` はサイト全体で唯一のスタイルシートです。
全ページ（index.html, works.html, study.html）から読み込まれています。

## CSS 変数（カラー・フォント）

ファイル冒頭の `:root` でサイト全体の色・フォントを定義しています。
色を変えたいときはここだけ編集してください。

```css
:root {
  --bg-primary: #050505;       /* メイン背景 */
  --bg-secondary: #0a0a0a;    /* セクション背景（About, Study） */
  --bg-card: #0f0f0f;         /* カード背景 */
  --text-primary: #f0f0f0;    /* メインテキスト */
  --text-secondary: #a4a4a4;  /* サブテキスト */
  --text-muted: #a1a1a1;      /* 薄いテキスト */
  --border: #434343;          /* 区切り線 */
  --border-light: #2a2a2a;    /* 薄い区切り線 */
}
```

## 主なセクション構成

| セクション | クラス名 | 用途 |
|---|---|---|
| ナビゲーション | `nav`, `.nav-logo`, `.nav-links` | 上部固定メニュー |
| ヒーロー | `#hero`, `.hero-name` | トップの名前表示 |
| About | `.about-content`, `.about-photo` | プロフィール |
| カード一覧 | `.works-grid`, `.work-card` | Works / Study のカード |
| 詳細ページ | `.detail-container`, `.detail-title` | works.html / study.html |
| コンタクト | `.contact-content`, `.contact-email` | 連絡先 |

## レスポンシブ

- `768px` 以下: モバイルレイアウト（ハンバーガーメニュー、1カラムグリッド）
- `480px` 以下: さらにフォントサイズ調整

## 編集時の注意

- カードの高さ揃え: `.work-card` は `display: flex; flex-direction: column` で、`.work-tools` が `margin-top: auto` で底に固定されている。この構造を崩さないこと
- アニメーション: `.visible` クラスは JS の IntersectionObserver で付与される。CSS 側で `opacity: 0` → `.visible { opacity: 1 }` の遷移を定義
