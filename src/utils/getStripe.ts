import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

import config from '@app/src/_start/config';

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(config.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;
