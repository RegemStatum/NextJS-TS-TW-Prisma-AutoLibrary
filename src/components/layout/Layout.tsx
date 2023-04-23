import React, { FC } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="container mx-auto">
      <Header />
      <main>{children}</main>
      <Sidebar />
      <Footer />
    </div>
  );
};

export default Layout;
