import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from './components/utils/LenisProvider';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import MarqueeStrip from './components/ui/MarqueeStrip';
import AudioSystem from './components/ui/AudioSystem';

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
    <html lang="en">
      <body>
        <LenisProvider>
          <AudioSystem />
          <Navbar />
          {children}
          <Footer />
          <MarqueeStrip />
        </LenisProvider>
      </body>
    </html>
  );
}
