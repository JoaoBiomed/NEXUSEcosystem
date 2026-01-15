import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NEXUS Ecosystem - Plataforma Clínica Inteligente',
  description:
    'Sistema determinístico multiagente com governança médica, farmacologia autônoma e geração automatizada de protocolos clínicos via IA.',
  keywords: [
    'medicina',
    'IA médica',
    'protocolos clínicos',
    'CORTEX AI',
    'governança médica',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
