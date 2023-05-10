import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="container mt-3 py-2 flex flex-col  border-t leading-snug text-center md:mt-3 md:py-3 lg:text-lg">
      <h4 className="font-['Open_Sans'] font-bold ">Autolib</h4>
      <div className="flex justify-center gap-1">
        <p>Oleksandr Kondratov</p>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
