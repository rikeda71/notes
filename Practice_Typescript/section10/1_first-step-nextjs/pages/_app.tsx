// Custom App
// ここで定義するコンポーネントを使ってページを初期化
// 全てのページコンポーネントで共通する処理を実行できる。
// これにより、ReduxのProviderを設け、Store初期データを注入することなどが可能

import React from 'react';
import App, { AppContext } from 'next/app';

export default class extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
