import React from 'react'
import { NextPageContext } from 'next'
import Head from 'next/head'
// ______________________________________________________
//
type Props = {
  title: string
  errorCode: number
}
// ______________________________________________________
//
class Error extends React.Component<Props> {
  static async getInitialProps({ res }: NextPageContext): Promise<Props> {
    return {
      title: `Error: ${res!.statusCode}`,
      errorCode: res!.statusCode
    }
  }
  render() {
    return (
      <>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        {this.props.errorCode}
      </>
    )
  }
}

export default Error
