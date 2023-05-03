import React, { FC } from "react";
import Input from "../ui/forms/Input";
import { PrimaryButton } from "../ui/buttons";
import { BadgeError, BadgePending } from "../ui/badges";

interface Props {
  handleSubmit: (e: React.SyntheticEvent) => void;
  handleInputChange: (e: React.SyntheticEvent) => void;
  userData: {
    email: string;
    password: string;
  };
  validationError: {
    inputName: string;
    msg: string;
  };
  serverAuthError: string | undefined;
  isLoading: boolean;
  type: "signin" | "signup";
}

const AuthForm: FC<Props> = ({
  handleSubmit,
  handleInputChange,
  userData,
  validationError,
  serverAuthError,
  isLoading,
  type,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 lg:gap-5">
        <Input
          placeholder="Email"
          name="email"
          type="email"
          minLength={3}
          value={userData.email}
          onChange={handleInputChange}
          errorMsg={
            validationError.inputName === "email" ? validationError.msg : ""
          }
        />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          minLength={8}
          maxLength={16}
          value={userData.password}
          onChange={handleInputChange}
          errorMsg={
            validationError.inputName === "password" ? validationError.msg : ""
          }
        />
        {isLoading && <BadgePending>Loading...</BadgePending>}
        {serverAuthError && <BadgeError>{serverAuthError}</BadgeError>}
      </div>
      <PrimaryButton className="mt-5 lg:mt-7" type="submit">
        {type === "signin" ? "Sign in" : "Sign up"}
      </PrimaryButton>
    </form>
  );
};

export default AuthForm;
