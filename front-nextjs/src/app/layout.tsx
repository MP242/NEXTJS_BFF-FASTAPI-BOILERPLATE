import { ThemeProvider } from '@/components/theme/theme-provider';
import { OpenAPIProvider } from '@/lib/openapi-provider';
import { QueryProvider } from '@/lib/query-provider';
import { NavLinks } from '@/components/nav-links';
import Sidebar from '@/components/sidebar';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'localhost',
  description: 'Full Stack FastAPI Project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <OpenAPIProvider>
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <div className="min-h-screen min-w-max flex flex-row w-full">
                <Sidebar />
                <div className="flex flex-col justify-start items-center w-full h-full">
                  <NavLinks />
                  {children}
                </div>
              </div>
            </ThemeProvider>
          </QueryProvider>
        </OpenAPIProvider>
      </body>
    </html>
  );
}
