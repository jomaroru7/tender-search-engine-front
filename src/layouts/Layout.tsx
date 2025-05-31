import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

type LayoutProps = {
    children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {


    return (
        <>
            <Header />
            <main className="container mx-auto px-4 lg:px-8 lg:pt-24 w-full pt-8 max-w-7xl">
                {children || <Outlet />}
            </main>
            <ToastContainer position="bottom-right" autoClose={3000} />
        </>
    );
};

export default Layout;