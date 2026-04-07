import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from './components/utils/LenisProvider';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import MarqueeStrip from './components/ui/MarqueeStrip';
import AudioSystem from './components/ui/AudioSystem';
import ShootingStars from './components/ui/ShootingStars';

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
          <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
            <ShootingStars />
          </div>
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
