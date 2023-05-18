import config from '@app/src/_start/config';
import { createAuthApiHandler, stripe } from '@app/src/utils/ssr';
import { getCustomerId } from '@app/src/utils/ssr/stripe';

const handler = createAuthApiHandler();

handler.post(async (req, res) => {
  const userId = req.session?.userId!;

  const customerId = await getCustomerId(userId);

  const { url } = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${config.NEXTAUTH_URL}/dashboard/assinatura`,
  });

  return res.status(200).json({ url });
});

export default handler;
