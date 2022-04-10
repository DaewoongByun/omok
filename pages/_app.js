import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>인간지능 오목봇</title>
        <meta name="description" content="인간지능 오목봇" />
        <meta name="keywords" content="오목,오목봇,omok" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
