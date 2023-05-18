/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
    experiments: {
    topLevelAwait: true,
  },
    // configuração de outros parâmetros
  cookies: {
    // configurando o domínio onde o cookie é válido (opcional)
    domain: 'example.com',
    // configurando o caminho do cookie (opcional)
    path: '/',
    // configuração de outras opções do cookie (opcional)
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  }
}
