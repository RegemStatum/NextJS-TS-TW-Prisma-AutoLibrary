import React, { FC } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useAppContext } from "@/context/AppContext";
import InfoMessage from "./InfoMessage";
import { createPortal } from "react-dom";
import SearchModal from "../search/SearchModal";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const { infoMessage } = useAppContext();

  return (
    <div className="relative">
      <Header />
      <Sidebar />
      <main className="container relative">
        <>
          {children}
          {infoMessage.isShown &&
            createPortal(
              <InfoMessage />,
              document.getElementById("infoMessages")!
            )}
          {useAppContext().isSearchModalOpen &&
            createPortal(<SearchModal />, document.getElementById("modals")!)}
        </>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
