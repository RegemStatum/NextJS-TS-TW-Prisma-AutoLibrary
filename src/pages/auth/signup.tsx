import React, { FC } from "react";
import { Signup } from "@/components/auth";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

interface Props {
  error?: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  if (query.error) {
    return {
      props: {
        error: query.error,
      },
    };
  }

  return {
    props: {},
  };
};

const SigninPage: FC<Props> = ({ error }) => {
  return (
    <div className="page-min-height flex items-center">
      <Signup error={error} />
    </div>
  );
};

export default SigninPage;
