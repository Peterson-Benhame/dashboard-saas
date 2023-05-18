import { CheckIcon } from "@heroicons/react/solid";
import { Price, PriceInterval, Product, Subscription } from "@prisma/client";
import classNames from "classnames";
import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

import configs from "@app/src/_start/config";
import { Footer, Navbar } from "@app/src/components/layout";
import { getStripe } from "@app/src/utils";
import { prisma } from "@app/src/utils/ssr";

type Props = {
  products: (Product & { prices: Price[] })[];
};

const Page: NextPage<Props> = ({ products }) => {
  const [subscription, setSubscription] = useState<Subscription>();
  const { status } = useSession();
  const router = useRouter();

  const [billingInterval, setBillingInterval] =
    useState<PriceInterval>("month");

  useEffect(() => {
    (async () => {
      if (status === "authenticated") {
        const res = await fetch("/api/user/subscription", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${configs.API_SECRET}`,
          },
        });

        const data = await res.json();

        if (data.subscription) {
          setSubscription(data.subscription);
        }
      }
    })();
  }, [status]);

  const handlePricingClick = async (priceId: string) => {
    debugger;
    if (status !== "authenticated") {
      return router.push("/login");
    }

    if (subscription) {
      return router.push("/dashboard");
    }
    debugger;
    const res = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${configs.API_SECRET}`,
      },
      body: JSON.stringify({
        price: priceId,
      }),
    });

    const data = await res.json();

    const stripe = await getStripe();

    stripe?.redirectToCheckout({ sessionId: data.sessionId });
  };

  return (
    <div className="bg-white">
      {/* <Navbar /> */}
      <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-6xl font-extrabold text-gray-800 sm:text-center">
            Planos de preços
          </h1>
          <p className="mt-5 text-xl text-gray-500 sm:text-center">
            Start building for free, then add a site plan to go live. Account
            plans unlock additional features.
          </p>
          <div className="relative self-center mt-6 bg-gray-100 rounded-lg p-0.5 flex sm:mt-8">
            <button
              onClick={() => setBillingInterval("month")}
              type="button"
              className={classNames(
                "relative w-1/2  py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8 rounded-lg",
                {
                  "bg-white border-gray-200 shadow-sm rounded-md text-gray-900":
                    billingInterval === "month",
                  "bg-transparent": billingInterval !== "month",
                }
              )}
            >
              Cobrança mensal
            </button>
            <button
              onClick={() => setBillingInterval("year")}
              type="button"
              className={classNames(
                "relative w-1/2 bg-white  py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8 rounded-lg",
                {
                  "bg-white border-gray-200 shadow-sm rounded-md text-gray-900":
                    billingInterval === "year",
                  "bg-transparent": billingInterval !== "year",
                }
              )}
            >
              Faturamento anual
            </button>
          </div>
        </div>
        <div
          className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {products
            .sort(
              (a, b) =>
                a?.prices?.find((one) => one.interval === billingInterval)
                  ?.unitAmount! -
                b?.prices?.find((one) => one.interval === billingInterval)
                  ?.unitAmount!
            )
            .map((product) => {
              const price: Price = (product as any)?.prices?.find(
                (one: Price) => one.interval === billingInterval
              );

              if (!price) {
                return null;
              }

              return (
                <div
                  key={product.name}
                  className={classNames(
                    "border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200",
                    {
                      "ring-indigo-500 ring-2":
                        subscription?.priceId === price.id,
                    }
                  )}
                >
                  <div className="p-6">
                    <h2 className="text-lg font-medium leading-6 text-gray-900">
                      {product.name}
                    </h2>
                    <p className="mt-4 text-sm text-gray-500">
                      {product.description}
                    </p>
                    <p className="mt-8">
                      <span className="text-4xl font-extrabold text-gray-900">
                        R${price.unitAmount! / 100}
                      </span>{" "}
                      <span className="text-base font-medium text-gray-500">
                        /mês
                      </span>
                    </p>
                    <a
                      onClick={() => handlePricingClick(price.id)}
                      className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white bg-gray-900 border border-black rounded-md hover:bg-gray-700 hover:cursor-pointer"
                    >
                      Assinar {product.name}
                    </a>
                  </div>
                  <div className="px-6 pt-6 pb-8">
                    <h3 className="text-xs font-medium tracking-wide text-gray-900 uppercase">
                      {"What's included"}
                    </h3>
                    <ul role="list" className="mt-6 space-y-4">
                      {[
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                        "Cum repellendus libero non expedita quam eligendi",
                        "a deserunt beatae debitis culpa asperiores ipsum facilis,",
                        "excepturi reiciendis accusantium nemo quos id facere!",
                      ].map((feature) => (
                        <li key={feature} className="flex space-x-3">
                          <CheckIcon
                            className="flex-shrink-0 w-5 h-5 text-green-500"
                            aria-hidden="true"
                          />
                          <span className="text-sm text-gray-500">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* <Footer />    '    */}
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const products = await prisma?.product.findMany({
    where: {
      active: true,
    },
    include: {
      prices: {
        where: {
          active: true,
        },
      },
    },
  });

  return {
    props: {
      products,
    },
  };
};

export default Page;
