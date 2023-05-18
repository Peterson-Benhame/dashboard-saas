import { NextApiRequest, NextApiResponse } from 'next';
import nc, { ErrorHandler } from 'next-connect';

import auth from '@app/src/_start/middlewares/auth';
import authorization from '@app/src/_start/middlewares/authorization';
import { AppNextApiRequest } from '@app/src/types';

export const onError: ErrorHandler<NextApiRequest, NextApiResponse> = (
  err,
  req,
  res,
  next
) => {
  console.log(err);
  res.status(500).end(err.toString());
};

export const createApiHandler = () =>
  nc<NextApiRequest, NextApiResponse>({
    onError,
  }).use(authorization);

export const createAuthApiHandler = () =>
  nc<AppNextApiRequest, NextApiResponse>({
    onError,
  }).use(authorization).use(auth);
