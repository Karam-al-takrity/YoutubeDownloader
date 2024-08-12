// app/layout.tsx (or app/layout.js)

import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Labosian',
    description: 'A brief description.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
