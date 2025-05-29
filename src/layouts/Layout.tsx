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
            <main className="container mx-auto py-16">
                {children || <Outlet />}
            </main>
        </>
    )
}

export default Layout