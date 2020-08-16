// Custom Document
// pagesディレクトリの全ページの高階コンポーネントとして適応される
// ここには、サーバーサイドのみで実行される共通処理を記述

import React from 'react';
import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import DefaultLayout from '../layouts/index';

export default class extends Document {
  // ctxはサーバーサイドのみで受け取ることができるreq/resがふくまれている
  static async getInitialProps(ctx: DocumentContext) {
    // styled-componentsのSSRの指定
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) =>
          sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return <DefaultLayout />;
  }
}
