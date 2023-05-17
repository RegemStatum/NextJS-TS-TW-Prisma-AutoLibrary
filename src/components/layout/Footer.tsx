import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="container mt-4 py-3 flex flex-col border-t text-center md:mt-5 md:py-4 lg:mt-6 lg:text-lg ">
      <p className="font-medium lg:text-lg">Autolib</p>
      <div className="flex justify-center gap-1">
        <p>Oleksandr Kondratov</p>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
