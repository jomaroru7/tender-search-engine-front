import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <header className="w-full bg-slate-800">
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl text-white">Buscador de licitaciones</h1>
                    </div>
                    <nav className="flex flex-col md:flex-row gap-4">
                        <NavLink 
                        to="/"
                        className={({isActive})=> 
                            isActive ? 'text-orange-500 uppercase font-bold' : "text-white uppercase font-bold"}
                        >Buscador</NavLink>
                        <NavLink 
                        to="/your-company"
                        className={({isActive})=> 
                            isActive ? 'text-orange-500 uppercase font-bold' : "text-white uppercase font-bold"}
                        >Tu empresa</NavLink>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header