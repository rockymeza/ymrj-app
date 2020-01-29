/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript } from "next/document";

class NextSite extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/static/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default NextSite;
