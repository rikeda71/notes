import React from 'react'
import App, { Container, AppContext } from 'next/app'

export default class extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}
