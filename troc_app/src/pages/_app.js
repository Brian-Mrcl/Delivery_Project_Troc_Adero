import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <SessionProvider session={pageProps.session}> 
      <Head>
        <title>Troc'Adero</title>
        <link rel="icon" href="/logo.png" />
        <meta name="description" content="Troc'Adero - Échange culturel local" />
      </Head>
      {!isHomePage && <Navbar />}
      <Component {...pageProps} />
    </SessionProvider>
  );
}