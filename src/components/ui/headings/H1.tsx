import React, { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const H1: FC<Props> = ({ children, ...rest }) => {
  return (
    <h1
      {...rest}
      className="mt-8 mb-3 font-sans text-4xl font-bold md:mt-14 md:mb-5 md:text-5xl"
    >
      {children}
    </h1>
  );
};

export default H1;
