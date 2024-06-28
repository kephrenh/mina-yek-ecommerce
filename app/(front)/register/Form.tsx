"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "postcss";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Form = () => {
  const { data: session } = useSession();

  const params = useSearchParams();
  const router = useRouter();
  let callbackUrl = params.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;

    const payload = JSON.stringify({ name, email, password });

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });
      if (res.ok) {
        return router.push(`/signin?callbackUrl=${callbackUrl}&success=Compte créé avec succès`);
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (error: any) {
      const err =
        error.message && error.message.indexOf("E11000") === 0
          ? "Un compte avec cet email existe déjà"
          : error.message;
      toast.error(err || "erreur");
    }
  };

  return (
    <div className="max-w-sm mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">Nouveau client ?</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="my-2">
            <label
              className="label"
              htmlFor="name">
              Nom
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Entrer votre nom",
              })}
              className="input input-bordered w-full max-w-sm"
            />
            {errors.name?.message && (
              <div className="text-error my-1 ml-1">{errors.name.message}</div>
            )}
          </div>
          <div className="my-2">
            <label
              className="label"
              htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register("email", {
                required: "Entrer votre adress e-mail",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Email non conforme",
                },
              })}
              className="input input-bordered w-full max-w-sm"
            />
            {errors.email?.message && (
              <div className="text-error my-1 ml-1">{errors.email.message}</div>
            )}
          </div>
          <div className="my-2">
            <label
              className="label"
              htmlFor="password">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Entrer votre mot de passe",
              })}
              className="input input-bordered w-full max-w-sm"
            />
            {errors.password?.message && (
              <div className="text-error my-1 ml-1">{errors.password.message}</div>
            )}
          </div>
          <div className="my-2">
            <label
              className="label"
              htmlFor="confirmPassword">
              Confirmez mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirmer votre mot de passe",
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "Entrez le même mot de passe";
                },
              })}
              className="input input-bordered w-full max-w-sm"
            />
            {errors.confirmPassword?.message && (
              <div className="text-error my-1 ml-1">{errors.confirmPassword.message}</div>
            )}
          </div>
          <div className="my-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full">
              {isSubmitting && <span className="loading loading-spinner"></span>}
              Créer mon compte
            </button>
          </div>
        </form>
        <div className="divider"></div>
        <div>
          {"Déjà client ?"}{" "}
          <Link
            className="link"
            href={`/signin?callbackUrl=${callbackUrl}`}>
            {"Connectez-vous"}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Form;
