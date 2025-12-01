'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthenticator } from '@aws-amplify/ui-react';

const Header = () => {
    const pathname = usePathname();
    const hideMenu = pathname === "/register" || pathname === "/login";
    const [open, setOpen] = useState(false);
    const { user, authStatus } = useAuthenticator((context) => [context.user, context.authStatus]);

    const isAuthenticated = authStatus === 'authenticated' && user;

    const handleLinkClick = () => {
        setOpen(false);
    };

    return (
        <header data-testid="header" className="bg-slate-800 fixed top-0 left-0 w-screen z-50 overflow-x-hidden">
            <div className="w-full px-4 lg:px-8 py-4 mx-auto max-w-7xl flex flex-row items-center">
                <div className="flex flex-col lg:flex-row w-full justify-between items-center">
                    <div className="flex flex-row justify-between gap-4">
                        <Link href="/" className="flex items-center">
                            <div data-testid="logo" className="h-10 w-auto overflow-hidden flex items-center justify-center rounded">
                                <img
                                    src="/logo_licico_blanco.png"
                                    alt="Logo licico"
                                    className="h-25 w-auto object-cover object-center block"
                                />
                            </div>
                        </Link>
                        {!hideMenu && isAuthenticated && <button
                            className="lg:hidden text-white focus:outline-none"
                            onClick={() => setOpen(!open)}
                            aria-label="Toggle navigation"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                        }
                    </div>

                    {/* Navegación para usuarios autenticados */}
                    {!hideMenu && isAuthenticated && (
                        <nav
                            className={`
                            flex flex-col gap-2 box-border rounded-3xl
                            transition-all duration-300 ease-in-out overflow-hidden
                            ${open ? "flex flex-col gap-2 box-border rounded-3xl mt-4 p-4 max-h-96 opacity-100 pointer-events-auto bg-slate-700 border-t border-slate-600" : "max-h-0 opacity-0 pointer-events-none"}
                            lg:opacity-100 lg:pointer-events-auto lg:max-h-none lg:rounded-none
                            lg:flex lg:flex-row lg:gap-4 lg:mt-0 lg:justify-end lg:items-center
                            lg:bg-transparent lg:border-0
                        `}
                        >
                            <Link
                                href="/"
                                onClick={handleLinkClick}
                                className={pathname === "/" ? 'text-orange-500 uppercase font-bold' : "text-white uppercase font-bold"}
                            >
                                Buscador
                            </Link>
                            <div className=" w-full border-2 border-white lg:hidden" />

                            <Link
                                href="/cpv-list"
                                onClick={handleLinkClick}
                                className={pathname === "/cpv-list" ? 'text-orange-500 uppercase font-bold' : "text-white uppercase font-bold"}
                            >
                                Lista de CPVs
                            </Link>

                            <div className=" w-full border-2 border-white lg:hidden" />
                            <Link
                                href="/user"
                                onClick={handleLinkClick}
                                className={pathname === "/user" ? 'text-orange-500 uppercase font-bold' : "text-white uppercase font-bold"}
                            >
                                Tu cuenta
                            </Link>
                            <div className=" w-full border-2 border-white lg:hidden" />
                        </nav>
                    )}

                    {/* Botón de login para usuarios no autenticados */}
                    {!hideMenu && !isAuthenticated && authStatus !== 'configuring' && (
                        <Link
                            href="/login"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
                        >
                            Iniciar sesión
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;