import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lensa Arena — Foto Olahraga',
  description: 'Temukan, pilih, dan beli foto momen olahraga kamu.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
