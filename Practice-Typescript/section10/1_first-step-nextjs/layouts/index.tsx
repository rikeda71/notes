// Layouts
// HTMLテンプレートとして用意するコンポーネント
import React from 'react';
import { Head, Main, NextScript } from 'next/document';

// Head, Main, NextScriptはNext.jsが
// 自動で必要なアセットを挿入する特別なコンポーネント
export default () => (
  <html>
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </html>
);
