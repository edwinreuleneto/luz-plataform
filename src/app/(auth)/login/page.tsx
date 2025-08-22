// NextJS core
import Link from 'next/link';
import type { Metadata } from 'next';

// Utils/Helpers
import { LoginForm } from '../_components/login-form';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage(): JSX.Element {
  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-6 text-center text-2xl font-bold">Entrar</h1>
      <LoginForm />
      <p className="mt-4 text-center text-sm">
        Não tem conta?{' '}
        <Link href="/register" className="underline">
          Criar conta
        </Link>
      </p>
    </div>
  );
}

