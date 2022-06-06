import { css, Global } from '@emotion/react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

import Layout from '@Components/Layout/Layout';
import { TranslationContextProvider } from '@Context/TranslationContext';
import { getI18nConfig, Language } from '@Utils/i18n';

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
        <style>
          {`
            #__next { height: 100% }
          `}
        </style>
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
  const router = useRouter();
  const locale = router.locale as Language;

  return (
    <I18nextProvider i18n={getI18nConfig(locale)}>
      <Global styles={globalStyles} />
      <TranslationContextProvider>
        <Head />
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </TranslationContextProvider>
    </I18nextProvider>
  );
}

export default MyApp;
