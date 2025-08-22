// NextJS core
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";

// Utils/Helpers
import { LoginForm } from "../_components/login-form";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <div className="flex min-h-full gap-20 bg-gradient-to-b from-white to-gray-100">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
              Entre na sua conta
            </h2>
          </div>

          <div className="mt-10">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 rounded-md py-4 lg:block">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <Image
            alt=""
            src="/images/auth/banner.jpg"
            className="object-cover"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
