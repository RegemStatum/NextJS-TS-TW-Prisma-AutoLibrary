import React, { FC } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="relative">
      <Header />
      <Sidebar />
      <main className="container">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
