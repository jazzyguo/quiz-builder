"use client";

import './globals.scss'
import { darkTheme } from "@/theme";
import { Roboto } from "next/font/google";

import { ThemeProvider, CssBaseline } from "@mui/material";

import { AuthContextProvider } from "@/contexts/AuthContext";
import { MainLayout } from '@/components/Layout';

import { QueryClientProvider, } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from "@/lib/react-query";

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap",
});

const RootLayout = ({
    children,
}: {
    children: React.ReactNode
}) => (
    <html lang="en">
        <head>
            <title>Quiz Builder</title>
            <meta name="description" content="Create quizzes" />
            <link rel="icon" href="favicon.ico" />
        </head>
        <body className={roboto.className}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <AuthContextProvider>
                    <QueryClientProvider client={queryClient}>
                        {process.env.NODE_ENV === 'development' &&
                            <ReactQueryDevtools initialIsOpen={false} />
                        }
                        <MainLayout>
                            {children}
                        </MainLayout>
                    </QueryClientProvider>
                </AuthContextProvider>
            </ThemeProvider>
        </body>
    </html >
)

export default RootLayout
