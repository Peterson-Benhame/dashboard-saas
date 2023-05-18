import { NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { Middleware } from 'next-connect';

import { AppNextApiRequest } from '@app/src/types';

const auth: Middleware<AppNextApiRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  debugger;
  const body = req.body;

  req.body = null; // esvazia o body antes de acessar a sessão
try {
      const session = await getSession({ req });

      if (!session) {
        return res.status(403).end('Forbidden');
      }

      req.session = session;
      req.body = body; // restaura o body após acessar a sessão

      return next();
  } catch (err) {
    console.error(err);
    return res.status(500).end('Internal Server Error');
  }
};

export default auth;
