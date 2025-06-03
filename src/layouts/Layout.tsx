import { Outlet } from "react-router-dom";
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
            <main className="container mx-auto px-4 lg:px-8 mt-24 lg:mt-32 max-w-7xl">
                {children || <Outlet />}
            </main>
            <ToastContainer position="bottom-right" autoClose={3000} />
        </>
    );
};

export default Layout;