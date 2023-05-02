import Profile from "@/components/profile/Profile";
import OrderInfo from "@/types/OrderInfo";
import prisma from "@/utils/prisma";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
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
      error: "No session",
      redirect: {
        destination: "/books",
      },
    };
  }

  const getIdRes = await fetch(
    `${process.env.BASE_URL}/api/profile/getIdByEmail`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: session.user.email }),
    }
  );
  const data = await getIdRes.json();
  const userId = data.userId;

  const orders = await prisma.order.findMany({
    where: {
      userId,
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
        },
      },
      Cabinet: {
        select: {
          id: true,
          number: true,
          isEmpty: true,
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
  return (
    <div className="page-min-height">
      <Profile orders={orders} />
    </div>
  );
};

export default ProfilePage;
