import Profile from "@/components/profile/Profile";
import prisma from "@/utils/prisma";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import Head from "next/head";
import React, { FC, useEffect } from "react";
import { AuthOptions } from "../api/auth/[...nextauth]";
import { useProfileContext } from "@/context/ProfileContext";
import OrderInfo from "@/types/misc/OrderInfo";
import getUserIdServer from "@/utils/helpers/getUserIdServer";

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

  const userId = await getUserIdServer(session);

  // error occurs if not to provide any type to orders array
  // typeof orders cannot be matched to OrderInfo[] which getServerSideProps is expected to return
  // orders status value is a string type but OrderInfo status value is OrderStatus type
  // in prisma we cannot provide constraints or checks or typing to model field, in our case Order model status field
  // we can map through orders and define a new array of orders in which a status value will be of correct type
  // however it will add unwanted and not really needed processing
  const orders: any[] = await prisma.order.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      number: true,
      status: true,
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
        <title>Autolib | Profile</title>
        <meta name="description" content="Autolib user profile" />
      </Head>
      <div className="page-min-height">
        <Profile />
      </div>
    </>
  );
};

export default ProfilePage;
