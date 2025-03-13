import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}
export default function RootLayout({
  children, params: { locale }
}: RootLayoutProps) {
    return (
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <main>{children}</main>
        </body>
      </html>
    );
}