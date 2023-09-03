import React, { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const H3: FC<Props> = ({ children, ...rest }) => {
  return (
    <h3
      {...rest}
      className="mt-6 mb-1 font-sans text-2xl font-bold md:mt-10 md:mb-3 md:text-3xl"
    >
      {children}
    </h3>
  );
};

export default H3;
