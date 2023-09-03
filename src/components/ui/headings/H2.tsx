import React, { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const H2: FC<Props> = ({ children, ...rest }) => {
  return (
    <h2
      {...rest}
      className="mt-7 mb-2 font-sans text-3xl font-bold md:mt-12 md:mb-4 md:text-4xl"
    >
      {children}
    </h2>
  );
};

export default H2;
