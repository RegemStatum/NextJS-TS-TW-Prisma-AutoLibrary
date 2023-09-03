import AppContextValue from "@/types/context/AppContextValue";
import { InfoMessage, InfoMessageType } from "@/types/context/AppContextValue";
import { HIDE_AFTER_DEFAULT_MSEC } from "@/utils/constants/misc";
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
  hideAfterMs: HIDE_AFTER_DEFAULT_MSEC,
};

const AppContextInitialValue: AppContextValue = {
  infoMessage: hiddenInfoMessage,
  isSidebarOpen: false,
  isSearchModalOpen: false,
  showInfoMessage: (
    type: InfoMessageType,
    msg: string,
    hideAfterMs?: number
  ) => {},
  hideInfoMessage: () => {},
  openSidebar: () => {},
  closeSidebar: () => {},
  openSearchModal: () => {},
  closeSearchModal: () => {},
};

const AppContext = createContext<AppContextValue>(AppContextInitialValue);

const AppContextProvider: FC<Props> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    AppContextInitialValue.isSidebarOpen
  );
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(
    AppContextInitialValue.isSearchModalOpen
  );
  const [infoMessage, setInfoMessage] =
    useState<InfoMessage>(hiddenInfoMessage);

  // useEffect(() => {
  //   console.log("opening!");

  // }, [isSearchModalOpen]);

  const showInfoMessage = useCallback(
    (type: InfoMessageType, msg: string, hideAfterMs?: number) => {
      setInfoMessage({
        isShown: true,
        type,
        msg,
        hideAfterMs: hideAfterMs || HIDE_AFTER_DEFAULT_MSEC,
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

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        infoMessage,
        isSidebarOpen,
        isSearchModalOpen,
        showInfoMessage,
        hideInfoMessage,
        openSidebar,
        closeSidebar,
        openSearchModal,
        closeSearchModal,
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
