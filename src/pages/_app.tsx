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
// import { useEffect } from "react";
import { useOrdersContext } from "@/context/OrdersContext";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { orderConfirmationModal, closeCabinets, closeOrderModal } =
    useOrdersContext();

  // if user tries to reload or change page when OrderCabinetsClosedConfirmationModal is open
  // close all related to order cabinets

  // user tries to change page when cabinets is not confirmed to be closed
  // useEffect(() => {
  //   const handleRouteChange = async () => {
  //     if (
  //       orderConfirmationModal.isOpen &&
  //       orderConfirmationModal.modalType === "cabinetsToClose"
  //     ) {
  //       await closeCabinets(orderConfirmationModal.orderCabinetNumbers);
  //       closeOrderModal();
  //     }
  //   };
  //   router.events.on("routeChangeStart", handleRouteChange);
  //   return () => router.events.off("routeChangeStart", handleRouteChange);
  // }, [router, closeCabinets, orderConfirmationModal, closeOrderModal]);

  // // user tries to unload page when cabinets is not confirmed to be closed
  // useEffect(() => {
  //   const handleBeforeUnload = async (e: Event) => {
  //     if (
  //       orderConfirmationModal.isOpen &&
  //       orderConfirmationModal.modalType === "cabinetsToClose"
  //     ) {
  //       e.preventDefault();
  //       await closeCabinets(orderConfirmationModal.orderCabinetNumbers);
  //     }
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  // }, [router, closeCabinets, orderConfirmationModal]);

  // prompt the user if they try and leave with unsaved changes
  // useEffect(() => {
  //   const warningText =
  //     "You have unsaved changes - are you sure you wish to leave this page?";
  //   const handleWindowClose = (e: BeforeUnloadEvent) => {
  //     window.alert(
  //       `orderConfirmationModal is Open ${orderConfirmationModal.isOpen}`
  //     );
  //     if (
  //       !(
  //         orderConfirmationModal.isOpen &&
  //         orderConfirmationModal.modalType === "cabinetsToClose"
  //       )
  //     )
  //       return;
  //     e.preventDefault();
  //     return (e.returnValue = warningText);
  //   };
  //   const handleBrowseAway = () => {
  //     if (
  //       !(
  //         orderConfirmationModal.isOpen &&
  //         orderConfirmationModal.modalType === "cabinetsToClose"
  //       )
  //     )
  //       return;
  //     if (window.confirm(warningText)) return;
  //     router.events.emit("routeChangeError");
  //     throw "routeChange aborted.";
  //   };
  //   const handleVisibilityChange = async () => {
  //     if (document.visibilityState === "hidden") {
  //       console.log("CLosing cabinets");
  //       console.log(
  //         "Is confirmation modal open: ",
  //         orderConfirmationModal.isOpen
  //       );
  //       console.log("modal type: ", orderConfirmationModal.modalType);
  //       console.log(
  //         "Order cabinets: ",
  //         orderConfirmationModal.orderCabinetNumbers
  //       );
  //       if (
  //         orderConfirmationModal.isOpen &&
  //         orderConfirmationModal.modalType === "cabinetsToClose"
  //       ) {
  //         await closeCabinets(orderConfirmationModal.orderCabinetNumbers);
  //         closeOrderModal();
  //       }
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   // window.addEventListener("beforeunload", handleWindowClose);
  //   router.events.on("routeChangeStart", handleBrowseAway);
  //   return () => {
  //     // window.removeEventListener("beforeunload", handleWindowClose);
  //     // router.events.off("routeChangeStart", handleBrowseAway);
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, [router, closeCabinets, orderConfirmationModal, closeOrderModal]);

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
