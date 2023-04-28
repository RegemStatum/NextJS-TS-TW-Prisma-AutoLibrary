import React, { FC } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import PrimaryButton from "../ui/buttons/PrimaryButton";

const Signup: FC = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.name}</p>
        <PrimaryButton onClick={signOut}>
          <p>Sign out</p>
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div>
      <PrimaryButton onClick={() => signIn("google")}>
        <p>Sign in with Google</p>
      </PrimaryButton>
    </div>
  );
};

export default Signup;
