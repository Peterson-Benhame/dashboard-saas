import * as yup from 'yup';
import { Asserts } from 'yup';

import { isSSR } from '@app/src/utils';
import CryptoUtils from '@app/src/utils/crypto';

const cryptoUtils = new CryptoUtils();

const env = {
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET: process.env.SECRET,

  SMTP_SERVER: process.env.SMTP_SERVER,
  SMTP_FROM: process.env.SMTP_FROM,

  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  GITHUB_ID: process.env.GITHUB_ID,
  GITHUB_SECRET: process.env.GITHUB_SECRET,
  FACEBOOK_ID: process.env.FACEBOOK_ID,
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
  GOOGLE_ID: process.env.GOOGLE_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  NEXT_PUBLIC_KEY_CRYPTO_FRONT: process.env.NEXT_PUBLIC_KEY_CRYPTO_FRONT,
  NEXT_PUBLIC_KEY_CRYPTO_BACK: process.env.NEXT_PUBLIC_KEY_CRYPTO_BACK,
  API_SECRET: cryptoUtils.encryptBack(process.env.NEXT_PUBLIC_API_SECRET),
};

const envSchema = yup.object({
  NEXTAUTH_URL: yup.string().when({
    is: () => isSSR(),
    then: yup.string().required(),
  }),
  DATABASE_URL: yup.string().when({
    is: () => isSSR(),
    then: yup.string().required(),
  }),
  SECRET: yup.string().when({
    is: () => isSSR(),
    then: yup.string().required(),
  }),
  SMTP_SERVER: yup.string().when({
    is: () => isSSR(),
    then: yup.string().required(),
  }),
  SMTP_FROM: yup.string().when({
    is: () => isSSR(),
    then: yup.string().required(),
  }),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: yup.string().required(),
  STRIPE_SECRET_KEY: yup.string().when({
    is: () => isSSR(),
    then: yup.string().required(),
  }),
  STRIPE_WEBHOOK_SECRET: yup.string().when({
    is: () => isSSR(),
    then: yup.string().required(),
  }),
  GITHUB_ID: yup.string().when({
    is: () => isSSR(),
    then: yup.string().required(),
  }),
  GITHUB_SECRET: yup.string().when({
    is: () => isSSR(),
    then: yup.string().required(),
  }),
  FACEBOOK_ID: yup.string().when({
    is: () => isSSR(),
    then: yup.string().required(),
  }),
  FACEBOOK_SECRET: yup.string().when({
    is: () => isSSR(),
    then: yup.string().required(),
  }),
  GOOGLE_ID: yup.string().when({
    is: () => isSSR(),
    then: yup.string().required(),
  }),
  GOOGLE_SECRET: yup.string().when({
    is: () => isSSR(),
    then: yup.string().required(),
  }),
  NEXT_PUBLIC_KEY_CRYPTO_FRONT: yup.string().when({
    is: () => isSSR(),
    then: yup.string().required(),
  }),
  NEXT_PUBLIC_KEY_CRYPTO_BACK: yup.string().when({
    is: () => isSSR(),
    then: yup.string().required(),
  }),
  API_SECRET: yup.string().when({
    is: () => isSSR(),
    then: yup.string().required(),
  }),
});

export interface AppConfig extends Asserts<typeof envSchema> {}

const configs: AppConfig = envSchema.validateSync(env);

export default configs;
