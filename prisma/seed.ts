import { PrismaClient, Role, User, UserRole } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
});

async function seed(): Promise<void> {
  const products = await stripe.products.list();
  const prices = await stripe.prices.list();

  await Promise.all(
    products.data.map((each) =>
      prisma.product.upsert({
        where: {
          id: each.id,
        },
        create: {
          id: each.id,
          name: each.name,
          description: each.description,
          active: each.active,
          image: each.images?.[0],
          metadata: each.metadata,
        },
        update: {
          name: each.name,
          description: each.description,
          active: each.active,
          image: each.images?.[0],
          metadata: each.metadata,
        },
      })
    )
  );

  await Promise.all(
    prices.data.map((each) =>
      prisma.price.upsert({
        where: {
          id: each.id,
        },
        create: {
          id: each.id,
          currency: each.currency,
          active: each.active,
          type: each.type,
          unitAmount: each.unit_amount,
          interval: each.recurring?.interval,
          interval_count: each.recurring?.interval_count,
          trial_period_days: each.recurring?.trial_period_days,
          product: {
            connect: {
              id: each.product as string,
            },
          },
        },
        update: {
          currency: each.currency,
          active: each.active,
          type: each.type,
          unitAmount: each.unit_amount,
          interval: each.recurring?.interval,
          interval_count: each.recurring?.interval_count,
          trial_period_days: each.recurring?.trial_period_days,
        },
      })
    )
  );
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      name: 'admin',
      email: 'admin@admin.com',
      password: '123456',
      emailVerified: new Date(),
    },
  });

  await prisma.role.upsert({
    where: { id: '1' },
    update: {},
    create: { name: 'administrador' },
  });

  await prisma.role.upsert({
    where: { id: '2' },
    update: {},
    create: { name: 'usuario' },
  });

  await prisma.role.upsert({
    where: { id: '3' },
    update: {},
    create: { name: 'colaborador' },
  });    
    
  await prisma.userRole.upsert({
    where: { id: '1' },
    update: {},
    create: { userId: admin.id, roleId: '0' },
  });
}

seed()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
