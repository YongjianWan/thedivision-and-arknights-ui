import type { Metadata } from 'next';
import { Roboto_Condensed, JetBrains_Mono, Orbitron, Rajdhani } from 'next/font/google';
import './globals.css';

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-hud',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-tactical',
});

export const metadata: Metadata = {
  title: 'Terminal Interface System',
  description: 'Near-future tactical UI system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${robotoCondensed.variable} ${jetbrainsMono.variable} ${orbitron.variable} ${rajdhani.variable}`}>
      <body className="min-h-screen antialiased overflow-hidden bg-[var(--bg-base)]">
        {/* 扫描线效果 */}
        <div className="scanline-overlay">
          <div className="absolute inset-0" />
        </div>
        
        {/* 主要内容区域 */}
        <main className="relative z-10 w-full h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
