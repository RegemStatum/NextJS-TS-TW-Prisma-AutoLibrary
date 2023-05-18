type InfoMessageType = "info" | "error" | "success" | "pending";

type InfoMessage = {
  isShown: boolean;
  type: InfoMessageType;
  msg: string;
  hideAfterMs: number;
};

type AppContextValue = {
  infoMessage: InfoMessage;
  showInfoMessage: (
    type: InfoMessageType,
    msg: string,
    hideAfterMs?: number
  ) => void;
  hideInfoMessage: () => void;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
};

export default AppContextValue;

export type { InfoMessage, InfoMessageType };
