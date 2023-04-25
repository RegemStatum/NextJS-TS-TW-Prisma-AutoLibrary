import React, { FC, createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type AppContextValue = {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
};

const AppContextDefaultValue: AppContextValue = {
  isSidebarOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {},
};

const AppContext = createContext<AppContextValue>(
  AppContextDefaultValue
);

const AppContextProvider: FC<Props> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    AppContextDefaultValue.isSidebarOpen
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
