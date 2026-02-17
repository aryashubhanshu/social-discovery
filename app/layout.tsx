import type { Metadata } from 'next';
import { Outfit, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/auth-context';
import Navbar from '@/components/Navbar';

const outfit = Outfit({
    variable: '--font-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Social Discovery',
    description: 'Social Discovery | Find the perfect ones',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body
                className={`${outfit.variable} ${geistMono.variable} antialiased h-full`}
            >
                <AuthProvider>
                    <div className="h-full flex flex-col">
                        <Navbar />
                        {children}
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
