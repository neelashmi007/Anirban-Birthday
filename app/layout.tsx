import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#07080c',
};

export const metadata: Metadata = {
  title: 'ANIRBAN.EXE — The Birthday Incident',
  description: "An unauthorized interactive investigation into one man's existence. Built for Anirban.",
  openGraph: {
    title: 'ANIRBAN.EXE — The Birthday Incident',
    description: "An unauthorized interactive investigation into one man's existence. A special tribute to Anirban.",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} dark`}>
      <body className="min-h-screen bg-[#07080c] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}
