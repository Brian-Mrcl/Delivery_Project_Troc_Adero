import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from 'next/head';  // Ajoutez cette ligne

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}> 
      <Head>
        <title>Troc'Adero</title>
        <link rel="icon" href="/logo.png" />
        <meta name="description" content="Troc'Adero - Échange culturel local" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}