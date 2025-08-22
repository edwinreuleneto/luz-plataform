// NextJS core
import Link from 'next/link';
import type { Metadata } from 'next';

// Utils/Helpers
import { RegisterForm } from '../_components/register-form';

export const metadata: Metadata = {
  title: 'Criar conta',
};

export default function RegisterPage(): JSX.Element {
  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-6 text-center text-2xl font-bold">Criar conta</h1>
      <RegisterForm />
      <p className="mt-4 text-center text-sm">
        Já possui conta?{' '}
        <Link href="/login" className="underline">
          Entrar
        </Link>
      </p>
    </div>
  );
}

