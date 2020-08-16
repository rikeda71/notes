// ルーティングに対応するページコンポーネント
// `pages/index.tsx`は`localhost:3000`にアクセスしたときに表示
// `pages/test.tsx`または`pages/test/index.tsx`を設置することで
// `localhost:3000/test`に自動的にルーティングされる

import React from 'react';
import Head from 'next/head';
import Component from '../components/index';

type Props = {
  title: string;
};

class App extends React.Component<Props> {
  static async getInitialProps(): Promise<Props> {
    return { title: 'Hello World' };
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <Component />
      </React.Fragment>
    );
  }
}

export default App;
