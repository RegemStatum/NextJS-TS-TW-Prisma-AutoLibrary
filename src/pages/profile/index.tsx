import Profile from "@/components/profile/Profile";
import OrderInfo from "@/types/OrderInfo";
import getUserId from "@/utils/helpers/getUserId";
import prisma from "@/utils/prisma";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React, { FC } from "react";

type Props = {
  orders?: OrderInfo[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (!session || !session.user) {
    res.statusCode = 401;
    return {
      props: {},
      redirect: {
        destination: "/books",
      },
    };
  }

  const userId = await getUserId(session);

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

  console.log(orders);

  return {
    props: {
      orders,
    },
  };
};

const ProfilePage: FC<Props> = ({ orders }) => {
  return (
    <>
      <Head>
        <title>Auto Library | Profile</title>
        <meta name="description" content="Auto Library user profile" />
      </Head>
      <div className="page-min-height">
        <Profile orders={orders} />
      </div>
    </>
  );
};

export default ProfilePage;
