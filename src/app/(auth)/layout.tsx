export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}

