// NextJS core
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
};

export default function AdminPage(): JSX.Element {
  return <h1 className="text-2xl font-bold">Dashboard Admin</h1>;
}

