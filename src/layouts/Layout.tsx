import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"
import type { ReactNode } from "react";

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            <main className="container mx-auto px-4 lg:px-8 w-full pt-24 max-w-7xl">
                {children || <Outlet />}
            </main>
        </>
    )
}

export default Layout