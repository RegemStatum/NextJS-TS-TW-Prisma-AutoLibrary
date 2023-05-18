import { AppContextValue } from "@/types/context";
import { InfoMessage, InfoMessageType } from "@/types/context/AppContextValue";
import { HIDE_AFTER_DEFAULT_MILLISECONDS } from "@/utils/constants/misc";
import React, {
  FC,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

type Props = {
  children: React.ReactNode;
};

const hiddenInfoMessage: InfoMessage = {
  isShown: false,
  type: "info",
  msg: "",
  hideAfterMs: HIDE_AFTER_DEFAULT_MILLISECONDS,
};

const AppContextInitialValue: AppContextValue = {
  infoMessage: hiddenInfoMessage,
  showInfoMessage: (
    type: InfoMessageType,
    msg: string,
    hideAfterMs?: number
  ) => {},
  hideInfoMessage: () => {},
  isSidebarOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {},
};

const AppContext = createContext<AppContextValue>(AppContextInitialValue);

const AppContextProvider: FC<Props> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    AppContextInitialValue.isSidebarOpen
  );
  const [infoMessage, setInfoMessage] =
    useState<InfoMessage>(hiddenInfoMessage);

  const showInfoMessage = useCallback(
    (type: InfoMessageType, msg: string, hideAfterMs?: number) => {
      setInfoMessage({
        isShown: true,
        type,
        msg,
        hideAfterMs: hideAfterMs || HIDE_AFTER_DEFAULT_MILLISECONDS,
      });
    },
    []
  );

  const hideInfoMessage = useCallback(() => {
    setInfoMessage(hiddenInfoMessage);
  }, []);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        infoMessage,
        showInfoMessage,
        hideInfoMessage,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
