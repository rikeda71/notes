// Custom Error
// エラーページを独自に構成するためのコンポーネントを定義

import React from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';

type Props = {
  title: string;
  errorCode: number;
};

class Error extends React.Component<Props> {
  // getInitialPropsはブラウザバックなどでreq, resが参照できないケースがある
  // そのため、req,resを参照できないケースを想定しておく必要がある
  static async getInitialProps({ res }: NextPageContext): Promise<Props> {
    return {
      title: `Error: ${res!.statusCode}`,
      errorCode: res!.statusCode,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        {this.props.errorCode}
      </React.Fragment>
    );
  }
}

export default Error;
