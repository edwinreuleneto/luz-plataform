// NextJS core
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
};

// Components
import PageHeader from "@/components/page-header";

const AdminPage = () => {
  return (
    <div>
      <PageHeader title="Dashboard" description="Visão geral" />
    </div>
  );
};

export default AdminPage;

