// NextJS core
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
};

const AdminPage = () => {
  return <h1 className="text-2xl font-bold">Dashboard Admin</h1>;
};

export default AdminPage;

