// NextJS core
import Link from 'next/link';
import type { Metadata } from 'next';

// Utils/Helpers
import { RegisterForm } from '../_components/register-form';

export const metadata: Metadata = {
  title: 'Criar conta',
};

const RegisterPage = () => {
  return (
    <div className="flex min-h-full">
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              alt="Sua Empresa"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-10 w-auto dark:hidden"
            />
            <img
              alt="Sua Empresa"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="hidden h-10 w-auto dark:block"
            />
            <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
              Crie sua conta
            </h2>
            <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-400">
              Já possui conta?{' '}
              <Link
                href="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Entrar
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

