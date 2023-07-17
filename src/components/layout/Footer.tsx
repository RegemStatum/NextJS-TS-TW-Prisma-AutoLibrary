import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="container mt-4 pt-3 pb-4 flex flex-col border-t text-center md:mt-5 md:pt-4 md:pb-5 lg:mt-6 lg:text-lg ">
      <p className="font-medium md:leading-loose lg:text-lg">Autolib</p>
      <div className="flex justify-center gap-1">
        <p>Oleksandr Kondratov</p>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
