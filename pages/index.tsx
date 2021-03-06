import type { NextPage } from 'next';
import Head from 'next/head';

import Editor from '@Components/Editor';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Avees | Write bengali here</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Editor />
    </div>
  );
};

export default Home;
