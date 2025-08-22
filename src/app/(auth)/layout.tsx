export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div className="h-full">{children}</div>;
}

