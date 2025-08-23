import type { Metadata } from "next";
import { Poppins } from "next/font/google";

// Styles
import "@/styles/globals.css";

// Services
import { AuthProvider } from "./services/auth";

// Components
import { Toaster } from "@/components/ui/sonner";

// Configurando Inter
const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Donna. Presente, precisa e inteligente",
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
          className={`${inter.variable} bg-gradient dark:lg:bg-bg-zinc-950 h-full bg-white antialiased lg:bg-zinc-100 dark:bg-zinc-900`}
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </body>
      </html>
    );
  }
