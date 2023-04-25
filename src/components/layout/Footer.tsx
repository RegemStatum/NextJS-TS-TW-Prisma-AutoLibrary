import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="container py-4 flex flex-col lg:text-2xl lg:py-8">
      <p className="font-black">AutoLibrary</p>
      <div className="flex gap-2">
        <p>Oleksandr Kondratov</p>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
