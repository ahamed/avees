import { css, Global } from '@emotion/react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import NextHead from 'next/head';
import { ReactElement, ReactNode } from 'react';

import Layout from '@Components/Layout/Layout';
import { TranslationContextProvider } from '@Context/TranslationContext';

const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  html,
  body {
    height: 100%;
    font-size: 16px;
    margin: unset;
    font-family: 'M PLUS Rounded 1c', sans-serif;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  li {
    margin: 0;
  }
`;

const Head = () => {
  return (
    <>
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
        <style>
          {`
            #__next { height: 100% }
          `}
        </style>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="stylesheet" href="https://fonts.maateen.me/kalpurush/font.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=M+PLUS+Rounded+1c:wght@500&display=swap"
          rel="stylesheet"
        />
      </NextHead>
    </>
  );
};

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface PageProps {
  [key: string]: unknown;
}

interface MyAppProps extends AppProps<PageProps> {
  pageProps: PageProps;
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div>
      <Global styles={globalStyles} />
      <TranslationContextProvider>
        <Head />
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </TranslationContextProvider>
    </div>
  );
}

export default MyApp;
