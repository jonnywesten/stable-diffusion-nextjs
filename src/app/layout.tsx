import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import React from "react";
import Theme from "@/app/theme-provider";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Stable Diffusion NextJS',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <Theme>
            {children}
        </Theme>
        </body>
        </html>
    )
}
