import { useAppContext } from "@/context/AppContext";
import React, { FC, useEffect } from "react";

const InfoMessage: FC = () => {
  const {
    infoMessage: { type, msg, hideAfterMs },
    hideInfoMessage,
  } = useAppContext();

  useEffect(() => {
    const timer: NodeJS.Timer = setTimeout(hideInfoMessage, hideAfterMs);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideAfterMs]);

  const textColor =
    type === "info"
      ? "text-sky-900"
      : type === "pending"
      ? "text-yellow-900"
      : type === "success"
      ? "text-green-900"
      : "text-red-900";

  const bgColor =
    type === "info"
      ? "bg-sky-300"
      : type === "pending"
      ? "bg-yellow-300"
      : type === "success"
      ? "bg-green-300"
      : "bg-red-300";

  const borderColor =
    type === "info"
      ? "border-sky-400"
      : type === "pending"
      ? "border-yellow-400"
      : type === "success"
      ? "border-green-400"
      : "border-red-400";

  return (
    <div className="scrollbar fixed bottom-2 right-2 w-fit h-fit max-w-[300px] max-h-[76px] rounded-md overflow-auto md:bottom-4 md:right-4 md:max-w-[400px] animate-slideFromRight">
      <div
        className={`p-3 rounded-md font-medium shadow-lg ${bgColor} ${textColor} border-2 ${borderColor}`}
      >
        {msg}
      </div>
    </div>
  );
};

export default InfoMessage;
