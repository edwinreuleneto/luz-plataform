import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

// Styles
import "@/styles/globals.css";

// Services
import { ReactQueryProvider } from "@/services/react-query";
import { AuthProvider } from "@/services/auth";

// Components
import { Toaster } from "@/components/ui/sonner";

// Configurando Inter
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "EuAdvoguei",
  description:
    "Donna é sua assistente virtual de alta performance, preparada para atuar com precisão em ambientes corporativos.",
  keywords: [
    "assistente virtual",
    "inteligência artificial",
    "executiva",
    "donna",
    "automação",
    "secretária digital",
  ],
  authors: [{ name: "Equipe Donna" }],
  creator: "Donna AI",
  themeColor: "#ffffff",
  metadataBase: new URL("https://donna.ai"),

  openGraph: {
    title: "Eu Advoguei",
    description:
      "Eu Advoguei é uma plataforma de assistente virtual corporativa de alta performance.",
    siteName: "euadvoguei.com.br",
    images: [
      {
        url: "https://euadvoguei.com.br/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Donna, a assistente virtual corporativa",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Eu Advoguei.",
    description:
      "Eu Advoguei é uma plataforma de assistente virtual corporativa de alta performance.",
    images: ["https://euadvoguei.com.br/og-image.jpg"],
    creator: "@euadvoguei",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="h-full bg-white dark:bg-gray-900">
      <body
        className={`${ubuntu.variable} bg-gradient dark:lg:bg-bg-zinc-950 h-full bg-white antialiased lg:bg-zinc-100 dark:bg-zinc-900`}
      >
        <ReactQueryProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
