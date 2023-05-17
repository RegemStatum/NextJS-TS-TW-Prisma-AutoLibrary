import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { SessionProvider } from "next-auth/react";
import {
  AppContextProvider,
  ProfileContextProvider,
  CartContextProvider,
  OrdersContextProvider,
} from "@/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppContextProvider>
        <ProfileContextProvider>
          <OrdersContextProvider>
            <CartContextProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CartContextProvider>
          </OrdersContextProvider>
        </ProfileContextProvider>
      </AppContextProvider>
    </SessionProvider>
  );
}
