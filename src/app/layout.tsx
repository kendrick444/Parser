import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
    title: 'Parser News by Kendrick',
    description: 'Parser News by Kendrick',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="uk">
        <body>{children}</body>
        </html>
    );
}
