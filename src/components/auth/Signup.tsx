import React, { FC, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import SecondaryButton from "../ui/buttons/SecondaryButton";
import Input from "../ui/forms/Input";

const authCredentialsRestrictionsError = {
  email: "Email must be longer than 3 symbols and contain '@'",
  password:
    "Password must be longer than 8 symbols, contain at least one number and special character",
};

const Signup: FC = () => {
  const { data: session } = useSession();
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    console.log(session);
  }, [session]);

  const handleInputChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    console.log(target.name);
    setAuthData({
      ...authData,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {};

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.name || session.user?.email}</p>
        <PrimaryButton onClick={() => signOut()}>Sign out</PrimaryButton>
      </div>
    );
  }

  return (
    <div>
      <PrimaryButton onClick={() => signIn()}>Sign In</PrimaryButton>
    </div>
  );
};

export default Signup;
