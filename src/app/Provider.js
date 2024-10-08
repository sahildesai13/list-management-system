// src/AppProvider.tsx
"use client";

import React from "react";
import { Provider as ReduxProvider } from 'react-redux';
import { store } from "@/hooks/redux/store";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

export default function AppProvider({ children }) {
    return (
        <ReduxProvider store={store}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <main>{children}</main>
                <Toaster />
            </ThemeProvider>
        </ReduxProvider>
    );
}
