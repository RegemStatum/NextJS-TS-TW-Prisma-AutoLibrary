import React, { FC } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import PrimaryButton from "../ui/buttons/PrimaryButton";

const Login: FC = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
      <p>Signed in as {session.user?.name}</p>
      <PrimaryButton><p></p></PrimaryButton>
      </>
    )
  }

  return <div></div>;
};

export default Login;
