import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "../components/footer/Footer";

type LayoutProps = {
    children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="container mx-auto px-4 lg:px-8 mt-24 lg:mt-24 max-w-7xl flex-1 pb-4">
                {children || <Outlet />}
            </main>
            <Footer/>
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
};

export default Layout;