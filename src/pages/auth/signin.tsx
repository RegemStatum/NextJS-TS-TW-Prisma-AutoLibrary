import React, { FC } from "react";
import { Signin } from "@/components/auth";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

interface Props {
  error?: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { req, query } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      props: {},
      redirect: {
        destination: "/",
      },
    };
  }

  if (!query.error) {
    return {
      props: {},
    };
  }

  const error =
    typeof query.error === "string" ? query.error : query.error.join(" ");
  return {
    props: {
      error,
    },
  };
};

const SigninPage: FC<Props> = ({ error }) => {
  return (
    <div className="page-min-height flex items-center">
      <Signin error={error} />
    </div>
  );
};

export default SigninPage;
