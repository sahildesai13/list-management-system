// src/LayoutClient.tsx
"use client";

import Footer from "@/components/layouts/Footer";
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
               <Footer/>
            </footer>
        </div>
    );
}
