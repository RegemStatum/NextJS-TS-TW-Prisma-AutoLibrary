import React, { FC, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import Input from "../ui/forms/Input";
import { SecondaryButton } from "../ui/buttons";
import Link from "next/link";
import { BadgeError, BadgePending } from "../ui/badges";
import AuthForm from "./AuthForm";
import FormSeparator from "./FormSeparator";

interface Props {
  error?: string;
}

const Signup: FC<Props> = ({ error }) => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [validationError, setValidationError] = useState({
    inputName: "email",
    msg: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [serverAuthError, setServerAuthError] = useState(error);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // validation
    if (!userData) {
      setValidationError({
        inputName: "password",
        msg: "Please provide email and password",
      });
      setIsLoading(false);
      return;
    }

    if (
      !userData.email ||
      userData.email === "" ||
      userData.email.trim() === ""
    ) {
      setValidationError({
        inputName: "email",
        msg: "Please provide email",
      });
      setIsLoading(false);
      return;
    }

    if (
      !userData.password ||
      userData.password === "" ||
      userData.password.trim() === ""
    ) {
      setValidationError({
        inputName: "password",
        msg: "Please provide password",
      });
      setIsLoading(false);
      return;
    }

    if (userData.password.length < 8 || userData.password.length > 16) {
      setValidationError({
        inputName: "password",
        msg: "Password must contain between 8 and 16 characters",
      });
      setIsLoading(false);
      return;
    }

    if (!/\d/.test(userData.password)) {
      setValidationError({
        inputName: "password",
        msg: "Password must contain at least one number",
      });
      setIsLoading(false);
      return;
    }

    if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(userData.password)) {
      setValidationError({
        inputName: "password",
        msg: "Password must contain at least one special character",
      });
      setIsLoading(false);
      return;
    }

    await signIn("credentials", {
      callbackUrl: "/",
      email: userData.email,
      password: userData.password,
    });
    setIsLoading(false);
  };

  const handleInputChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const newUserData = {
      ...userData,
      [target.name]: target.value,
    };
    setUserData(newUserData);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (validationError.msg) {
      timer = setTimeout(() => {
        setValidationError({
          inputName: "",
          msg: "",
        });
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [validationError, validationError.msg]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (serverAuthError) {
      timer = setTimeout(() => {
        setServerAuthError("");
      }, 10000);
    }
  }, [serverAuthError]);

  return (
    <div className="w-full mx-auto p-4 bg-stone-100 shadow-lg rounded-sm shrink-0 max-w-[500px] lg:p-8">
      <h2 className="pt-2 pb-6 text-2xl text-center lg:pt-4 lg:pb-12 lg:text-3xl">
        Sign Up
      </h2>
      <AuthForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        userData={userData}
        validationError={validationError}
        serverAuthError={serverAuthError}
        isLoading={isLoading}
      />
      <FormSeparator />
      <SecondaryButton onClick={() => signIn("google")}>
        Sign up with Google
      </SecondaryButton>
      <p className="pt-4 text-sm lg:pt-6 lg:text-base">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-blue-500 underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
