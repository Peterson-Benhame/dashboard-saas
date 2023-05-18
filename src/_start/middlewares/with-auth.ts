import { Price, PrismaClient, Product,Subscription } from "@prisma/client";
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";

type ModelName = keyof PrismaClient;

export const getServerSidePropsWithSession = <T extends { [key: string]: any }>(
  callback: (data: (Subscription & { price: Price & { product: Product } } | null)) => T
): GetServerSideProps<T> => {
  const prisma = new PrismaClient();

  return async (context: GetServerSidePropsContext<ParsedUrlQuery>): Promise<GetServerSidePropsResult<T>> => {
  const session = await getSession(context);
  debugger;
  const data = await prisma.subscription.findFirst({
    where: {
      userId: (session?.user as any)?.userId,
      status: {
        in: ["active", "trialing"],
      },
    },
    include: {
      price: {
        include: {
          product: true,
        },
      },
    },
  });

  // if (!data) {
  //   return {
  //     redirect: {
  //       destination: `/plan`,
  //       permanent: false
  //     },
  //   };
  // }

  // const paymentIsLate = data.cancel_at !== null && Date.now() >= data.cancel_at.getTime();
  
  // if (paymentIsLate) {
  //   return {
  //     redirect: {
  //       destination: `/plan`,
  //       permanent: false
  //     },
  //   };
  // }

  return {
    redirect: !session ? {
      destination: `/login`,
      permanent: false
    } : undefined,
    props: {
      ...callback(data),
    },
  };
};
};
