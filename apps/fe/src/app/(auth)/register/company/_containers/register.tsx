"use client";

import { Leaf } from "lucide-react";
import Link from "next/link";
import { GhibliCard } from "@/components/molecules/ghibli-card";
import { RegisterFormSection } from "@/components/page/auth";
import { useState } from "react";
import { PickRegister } from "@repo/types";
import { useRegister } from "@/hooks/auth";
import { GoogleSvg } from "@/components/atoms/svg";
import { useGoogleLogin } from "@react-oauth/google";

export default function RegisterContainer() {
  const [formRegister, setFormRegister] = useState<PickRegister>({
    companyRole: "",
    email: "",
    fullName: "",
    password: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const register = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = formRegister;
    register.mutateAsync(payload);
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeRespone) => {
      console.log("login google");
    },
    onError: (err) => {
      console.log("Google Login Failed", err);
    },
  });
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <GhibliCard className="w-full max-w-md" hover={false}>
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <Leaf className="size-8 text-primary" />
          <h1 className="font-serif text-2xl font-semibold">Buat Akun</h1>
          <p className="text-sm text-muted-foreground">
            Mulai perjalanan produktivitasmu
          </p>
        </div>
        <div className="w-full flex justify-center items-center flex-col space-y-3">
          <button type="button" onClick={() => googleLogin()}>
            <GoogleSvg />
          </button>
          <h1 className="text-sm font-semibold text-muted-foreground">
            Atau Masuk Menggunakan
          </h1>
        </div>
        <RegisterFormSection
          service={{
            isPending: register.isPending,
            onSubmit: handleSubmit,
          }}
          state={{
            formRegister: formRegister,
            setFormRegister: setFormRegister,
            showPassword: showPassword,
            setShowPassword: setShowPassword,
          }}
        />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Masuk di sini
          </Link>
        </p>
        <p className="mt-2 text-center text-sm">
          <Link
            href="/login"
            className="text-muted-foreground hover:text-primary"
          >
            ← Kembali ke masuk
          </Link>
        </p>
      </GhibliCard>
    </div>
  );
}
