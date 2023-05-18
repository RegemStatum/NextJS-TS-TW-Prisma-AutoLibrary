import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const Modal: FC<Props> = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-neutral-900 bg-opacity-60">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] p-4 rounded-md shadow-lg bg-neutral-50 md:p-5">
        {children}
      </div>
    </div>
  );
};

export default Modal;
