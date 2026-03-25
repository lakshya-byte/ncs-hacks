import type { Metadata } from 'next';
import { Cinzel } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel',
});

export const metadata: Metadata = {
  title: 'Asgard — Where Gods Build Legends',
  description:
    'A cinematic journey through the gates of Asgard. Scroll to enter the divine realm of the Norse gods.',
  keywords: ['Asgard', 'Norse mythology', 'hackathon', 'cinematic'],
  openGraph: {
    title: 'Asgard — Where Gods Build Legends',
    description: 'Enter the realm of the Norse gods.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cinzel.variable}>
      <body>{children}</body>
    </html>
  );
}
