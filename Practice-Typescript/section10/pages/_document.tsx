// Custom Document
// pagesディレクトリの全ページの高階コンポーネントとして適応される
// ここには、サーバーサイドのみで実行される共通処理を記述

import React from 'react';
import Document, { DocumentContext } from 'next/document';
import DefaultLayout from '../layouts/index';

export default class extends Document {
  // ctxはサーバーサイドのみで受け取ることができるreq/resがふくまれている
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return <DefaultLayout />;
  }
}
