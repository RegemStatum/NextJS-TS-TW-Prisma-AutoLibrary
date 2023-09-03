import React, { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const H4: FC<Props> = ({ children, ...rest }) => {
  return (
    <h4
      {...rest}
      className="mt-5 mb-1 font-sans text-xl font-bold md:mt-8 md:mb-2 md:text-2xl"
    >
      {children}
    </h4>
  );
};

export default H4;
