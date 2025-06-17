import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const hideMenu = location.pathname === "/register";
    const [open, setOpen] = useState(false);

    return (
        <header className="bg-slate-800 fixed top-0 left-0 w-screen z-50 overflow-x-hidden">
            <div className="w-full px-4 lg:px-8 py-4 mx-auto max-w-7xl flex flex-row items-center">
                <div className="flex flex-col lg:flex-row w-full justify-between items-center">
                    <div className="flex flex-row justify-between gap-4">
                        <h1 className="text-3xl text-white">Licico</h1>
                        {!hideMenu && <button
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

                    {
                        !hideMenu &&
                        <nav
                            className={`
                            flex flex-col gap-2 box-border rounded-3xl
                            transition-all duration-300 ease-in-out overflow-hidden
                            ${open ? "flex flex-col gap-2 box-border rounded-3xl mt-4 p-4 max-h-96 opacity-100 pointer-events-auto bg-slate-700 border-t border-slate-600" : "max-h-0 opacity-0 pointer-events-none"}
                            lg:opacity-100 lg:pointer-events-auto lg:max-h-none
                            lg:flex lg:flex-row lg:gap-4 lg:mt-0 lg:justify-end
                            lg:bg-transparent lg:border-0
                        `}
                        >
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? 'text-orange-500 uppercase font-bold' : "text-white uppercase font-bold"}
                            >
                                Buscador
                            </NavLink>
                            <div className=" w-full border-2 border-white lg:hidden" />
                            <NavLink
                                to="/your-company"
                                className={({ isActive }) =>
                                    isActive ? 'text-orange-500 uppercase font-bold' : "text-white uppercase font-bold"}
                            >
                                Tu empresa
                            </NavLink>
                            <div className=" w-full border-2 border-white lg:hidden" />

                            <NavLink
                                to="/cpv-list"
                                className={({ isActive }) =>
                                    isActive ? 'text-orange-500 uppercase font-bold' : "text-white uppercase font-bold"}
                            >
                                Lista de CPVs
                            </NavLink>
                        </nav>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;