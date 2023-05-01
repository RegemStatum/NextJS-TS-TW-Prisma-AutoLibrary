import Profile from "@/components/profile/Profile";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { FC } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};

const ProfilePage: FC = () => {
  return (
    <div className="page-min-height">
      <Profile />
    </div>
  );
};

export default ProfilePage;
