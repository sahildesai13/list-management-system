// src/LayoutClient.tsx
"use client";

import { Header } from "@/components/layouts/Header";
import React from "react";

export default function LayoutClient({ children }) {
    return (
        <div className="">
            <header>
                <nav>
                    <Header/>
                </nav>
            </header>
            <main>{children}</main>
            <footer>
                <h1>Footer</h1>
            </footer>
        </div>
    );
}
