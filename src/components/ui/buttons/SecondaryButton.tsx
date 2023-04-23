import React, { FC } from "react";

interface Props {
  name: string;
  onClick: any;
}

const SecondaryButton: FC<Props> = ({ name, onClick }) => {
  return <button onClick={onClick}>{name}</button>;
};

export default SecondaryButton;
