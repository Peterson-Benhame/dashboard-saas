import { NextApiRequest } from 'next';
import { Session } from 'next-auth';

export interface MySession extends Session {
  userId?: string;
}

export interface AppNextApiRequest extends NextApiRequest {
  session?: MySession;
}
