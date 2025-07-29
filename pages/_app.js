import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Agami - Exceptional AI Startup Landing Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Agami offers elite Java & AI Solutions for the Next Era. We build high-performance applications and intelligent systems to accelerate business growth." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
} 