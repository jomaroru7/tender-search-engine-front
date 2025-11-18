'use client';

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import type { ReactNode } from "react";

type LayoutProps = {
    children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="container mx-auto px-4 lg:px-8 mt-24 lg:mt-24 max-w-7xl flex-1 pb-4">
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;