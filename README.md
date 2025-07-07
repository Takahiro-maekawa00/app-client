# app-client

React Native 製の推しうちわデザイン作成アプリです。ダッシュボードから既存デザインを取得し、
編集・プレビュー・エクスポートまでを行えます。

## 主な機能

- **ダッシュボード**: `/designs` エンドポイントからユーザーデザインを取得しグリッド表示
- **エディタ画面**: 画像の取り込みやサイズ指定が可能なデザイン編集機能
- **ビーズガイド生成**: キャンバスサイズから必要なビーズ数を計算
- **PDF エクスポート**: デザインを 300 DPI の PDF に変換し QR コードで共有
- **AR プレビュー**: Viro を用いた拡張現実上でのデザイン確認
- **設定画面**: 言語切替やダークモードのオン／オフ

## 開発方法

```sh
npm install
npm run start
npm run android    # Android 実機／エミュレータ
npm run ios        # iOS シミュレータ
npm test
```

`npm test` は Jest を使用してユーティリティ関数のテストを実行します。

## ディレクトリ構成

```
src/
  atoms/        Recoil ステート定義
  components/   共通 UI コンポーネント
  hooks/        カスタムフック
  navigation/   画面遷移設定
  screens/      各画面コンポーネント
  services/     PDF 生成などのサービス層
  utils/        汎用ユーティリティ
  i18n/         多言語対応
```

TypeScript で実装され、画面遷移には React Navigation、状態管理には Recoil を採用しています。

## Commit Message Guidelines

変更内容を要約したコミットメッセージを記述してください。`feat`、`fix`、`docs` などの接頭辞のあとに
簡潔な説明を続けます。

```text
feat: implement size selector modal
```

コミットメッセージは [commitlint](https://commitlint.js.org/) で検証されます。

進捗管理には `IMPLEMENTATION_STATUS_TEMPLATE.md` を利用できます。

