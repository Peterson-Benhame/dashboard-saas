# 🚀⚡️🧑‍💻 Dashboard SAAS template Typescript/Next.js/NextAuth.js/Prisma/Stripe/Tailwindcss/Mysql_

_My template to quickstart a SAAS project_

> Stop losing time implementing authentication and payment over and over again.  
> Focus on what brings value to your## Features
> Already have access to authentication and dashboard

- Authentication with NextAuth.js (Own Your Data ✅)
  - Email with magic link
  - Github
  - Many other oauth providers available [check their docs](https://next-auth.js.org/configuration/providers/oauth-provider)
- Payment with Stripe
  - Stripe checkout
  - Stripe billing portal
  - Stripe webhooks (products / prices are synced)
- Hosted on [vercel](https://vercel.com/) for free
- Dashboard

## Stripe

Check the stripe section of this [repo](https://github.com/vercel/nextjs-subscription-payments) as the steps are very similar

## mysql

A mysql db is needed to deploy the app.  
You can have a very small instance for free on [heroku](https://www.heroku.com/pricing#data-services)

---

## Made with

- Typescript
- Next.js
- NextAuth.js
- Prisma
- mysql
- Stripe
- Tailwindcss

## Develop

```
# create .env
cp .env.example .env

# install dependencies
npm

# Launch pgsql and maildev
npm docker:start

# migrate and seed the database
npm prisma:migrate:dev

npm prisma:seed

# install stripe cli
https://stripe.com/docs/webhooks/test

stripe login

stripe listen --forward-to http://localhost:3000/api/stripe/webhook

# start server
npm dev

```

## Inspirations

- https://github.com/themeselection/materio-mui-react-nextjs-admin-template-free
- https://github.com/gmpetrov/ultimate-saas-ts
- https://github.com/vercel/nextjs-subscription-payments
- https://github.com/hexrcs/prisma-next-auth
