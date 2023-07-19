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
  BooksFilterContextProvider,
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
                  <BooksFilterContextProvider>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </BooksFilterContextProvider>
                </BooksContextProvider>
              </AuthorsContextProvider>
            </CartContextProvider>
          </OrdersContextProvider>
        </ProfileContextProvider>
      </AppContextProvider>
    </SessionProvider>
  );
}
