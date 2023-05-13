import { AppContextValue } from "@/types/context";
import React, { FC, createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const AppContextInitialValue: AppContextValue = {
  isSidebarOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {},
};

const AppContext = createContext<AppContextValue>(AppContextInitialValue);

const AppContextProvider: FC<Props> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    AppContextInitialValue.isSidebarOpen
  );

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <AppContext.Provider value={{ isSidebarOpen, openSidebar, closeSidebar }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
