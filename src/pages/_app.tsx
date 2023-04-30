import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import AppContextProvider from "@/context/AppContext";
import { SessionProvider } from "next-auth/react";
import CartContextProvider from "@/context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppContextProvider>
        <CartContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartContextProvider>
      </AppContextProvider>
    </SessionProvider>
  );
}
