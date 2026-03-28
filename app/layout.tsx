import type { Metadata } from 'next';
import { Cinzel, Skranji, Germania_One, Montserrat, Noto_Sans } from 'next/font/google';
import './globals.css';
import LenisProvider from './components/utils/LenisProvider';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import AudioSystem from './components/ui/AudioSystem';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-cinzel' });
const skranji = Skranji({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-skranji' });
const germania = Germania_One({ subsets: ['latin'], weight: ['400'], variable: '--font-germania' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600', '800'], variable: '--font-montserrat' });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-noto' });

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
    <html lang="en" className={`${cinzel.variable} ${skranji.variable} ${germania.variable} ${montserrat.variable} ${notoSans.variable}`}>
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
