import Image from "next/image";

import Form from "@app/src/components/form/form";

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <a href="https://dub.sh">
            <Image
              src="/image/logo.png"
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={100}
              height={100}
            />
          </a>
          <h3 className="text-xl font-semibold">Cadastrar</h3>
          <p className="text-sm text-gray-500">
            Crie uma conta com seu e-mail e senha
          </p>
        </div>
        <Form type="register" />
      </div>
    </div>
  );
}
