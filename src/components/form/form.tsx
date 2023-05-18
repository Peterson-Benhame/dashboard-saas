"use client";

import Link from "next/link";
import { useRouter } from "next/router";
// import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

import configs from "@app/src/_start/config";
import {
  ToastError,
  ToastSucess,
} from "@app/src/_start/helpers/components/toast-components";

import LoadingDots from "../loading-dots";

export default function Form({ type }: { type: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        debugger;
        e.preventDefault();
        setLoading(true);
        if (type === "login") {
          login(e);
        } else {
          register(e);
        }
      }}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      {type === "register" && (
        <div>
          <label
            htmlFor="nome"
            className="block text-xs text-gray-600 uppercase"
          >
            Nome
          </label>
          <input
            id="nome"
            name="nome"
            type="nome"
            placeholder="jhon due"
            autoComplete="nome"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="panic@thedis.co"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
        >
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>{type === "login" ? "Entrar" : "Cadastrar"}</p>
        )}
      </button>
      {type === "login" ? (
        <p className="text-center text-sm text-gray-600">
          Não tem uma conta? <Link href="/register">Cadastre-se</Link>{" "}
          gratuitamente.
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600">
          já tem uma conta? clique em <Link href="/login">Entrar</Link>.
        </p>
      )}
    </form>
  );

  function register(e: FormEvent<HTMLFormElement>) {
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${configs.API_SECRET}`,
      },
      body: JSON.stringify({
        name: e.currentTarget.nome.value,
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      }),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        ToastSucess("Conta criada! Redirecionando para login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        ToastError(await res.text());
      }
    });
  }

  function login(e: FormEvent<HTMLFormElement>) {
    signIn("credentials", {
      redirect: false,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      // @ts-ignore
    }).then(({ ok, error }) => {
      setLoading(false);
      if (ok) {
        router.push("/dashboard");
      } else {
        ToastError(error);
      }
    });
  }
}
