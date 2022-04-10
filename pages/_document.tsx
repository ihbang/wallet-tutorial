import Document from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

// To fix Warning: useLayoutEffect does nothing on the server on antd
if (typeof window === 'undefined') {
  React.useLayoutEffect = React.useEffect;
}
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
