import { NextApiResponse } from 'next';
import { Middleware } from 'next-connect';

import configs from '@app/src/_start/config';
import { AppNextApiRequest } from '@app/src/types';
import CryptoUtils from '@app/src/utils/crypto';

const authorization: Middleware<AppNextApiRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  debugger;
  const cryptoUtils = new CryptoUtils();
  const authHeader = (req?.headers?.authorization || '').split("Bearer ")[1];
try {
    // Verifica se a chave de API está no banco de dados ou serviço de autenticação
    // Se a chave de API for válida, prossegue com o handler
    // Caso contrário, retorna uma resposta de erro 401 ou outra adequada
    if (!authHeader) {
      return res.status(401).end('Unauthorized');
    }else if(await cryptoUtils.decryptBack(authHeader) !== await cryptoUtils.decryptBack(configs.API_SECRET)){
      return res.status(401).end('Unauthorized');
    }

    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).end('Internal Server Error');
  }
};

export default authorization;
