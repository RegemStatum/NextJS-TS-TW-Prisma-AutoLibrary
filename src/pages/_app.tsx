import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { SessionProvider } from "next-auth/react";
import {
  AppContextProvider,
  ProfileContextProvider,
  CartContextProvider,
  OrdersContextProvider,
  AuthorsContextProvider,
} from "@/context";
import BooksContextProvider from "@/context/BooksContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppContextProvider>
        <ProfileContextProvider>
          <OrdersContextProvider>
            <CartContextProvider>
              <AuthorsContextProvider>
                <BooksContextProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </BooksContextProvider>
              </AuthorsContextProvider>
            </CartContextProvider>
          </OrdersContextProvider>
        </ProfileContextProvider>
      </AppContextProvider>
    </SessionProvider>
  );
}
