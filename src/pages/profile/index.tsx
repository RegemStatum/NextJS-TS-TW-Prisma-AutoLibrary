import Profile from "@/components/profile/Profile";
import OrderInfo from "@/types/misc/OrderInfo";
import prisma from "@/utils/prisma";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import Head from "next/head";
import React, { FC, useEffect } from "react";
import { AuthOptions } from "../api/auth/[...nextauth]";
import { useProfileContext } from "@/context/ProfileContext";

type Props = {
  orders?: OrderInfo[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { req, res } = context;
  const session = await getServerSession(req, res, AuthOptions);

  if (!session || !session.user) {
    return {
      props: {},
      redirect: {
        destination: "/books",
        permanent: false,
      },
    };
  }

  if (!session) {
    throw new Error("No session");
  }

  if (!session.user) {
    throw new Error("No user in session");
  }

  const email = session.user.email;
  if (!email) {
    throw new Error("No user email in session");
  }

  const userIdRes = await fetch(
    `${process.env.BASE_URL}/api/profile/getIdByEmail`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    }
  );

  if (!userIdRes.ok) {
    throw new Error("Something went wrong while trying to receive user id");
  }

  const data = await userIdRes.json();
  const userId = data.id;

  const orders = await prisma.order.findMany({
    where: {
      userId,
      status: "ready",
    },
    select: {
      id: true,
      number: true,
      Book: {
        select: {
          id: true,
          title: true,
          author: {
            select: {
              firstName: true,
              secondName: true,
            },
          },
          cabinet: {
            select: {
              id: true,
              number: true,
              isEmpty: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      orders,
    },
  };
};

const ProfilePage: FC<Props> = ({ orders }) => {
  const { setOrders } = useProfileContext();

  // setOrders is memoized
  useEffect(() => {
    setOrders(orders || []);
  }, [orders, setOrders]);

  return (
    <>
      <Head>
        <title>Auto Library | Profile</title>
        <meta name="description" content="Auto Library user profile" />
      </Head>
      <div className="page-min-height">
        <Profile />
      </div>
    </>
  );
};

export default ProfilePage;
