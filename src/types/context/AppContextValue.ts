type InfoMessageType = "info" | "error" | "success" | "pending";

type InfoMessage = {
  isShown: boolean;
  type: InfoMessageType;
  msg: string;
  hideAfterMs: number;
};

type AppContextValue = {
  infoMessage: InfoMessage;
  isSidebarOpen: boolean;
  isSearchModalOpen: boolean;
  showInfoMessage: (
    type: InfoMessageType,
    msg: string,
    hideAfterMs?: number
  ) => void;
  hideInfoMessage: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  openSearchModal: () => void;
  closeSearchModal: () => void;
};

export default AppContextValue;

export type { InfoMessage, InfoMessageType };
