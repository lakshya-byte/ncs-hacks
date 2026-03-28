import type { Metadata } from 'next';
import { Cinzel, Noto_Sans } from 'next/font/google';
import './globals.css';
import LenisProvider from './components/utils/LenisProvider';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import AudioSystem from './components/ui/AudioSystem';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-cinzel', display: 'swap' });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-noto', display: 'swap' });


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
    <html lang="en" className={`${cinzel.variable} ${notoSans.variable}`}>
      <body>
        <LenisProvider>
          <AudioSystem />
          <Navbar />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
