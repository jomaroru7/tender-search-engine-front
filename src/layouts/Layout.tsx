import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

type LayoutProps = {
    children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const location = useLocation();
    const hideHeader = location.pathname === "/register";

    return (
        <>
            {!hideHeader && <Header />}
            <main className="container mx-auto px-4 lg:px-8 w-full pt-24 max-w-7xl">
                {children || <Outlet />}
            </main>
            <ToastContainer position="top-center" autoClose={3000} />
        </>
    );
};

export default Layout;