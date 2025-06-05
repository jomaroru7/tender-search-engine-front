import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import Contact from "../contact/Contact";

const Footer = () => {
    return (
        <footer className="bg-slate-800 text-white py-6 " data-testid="footer">
            <div className="mx-auto text-center w-full flex flex-col lg:flex-row justify-around px-4 max-w-7xl">
                <div className="container mx-auto flex flex-col justify-between ">
                    <h2 className="text-lg font-semibold pb-4">Sobre nosotros</h2>
                    <div className="flex flex-col justify-between gap-4 mb-9">
                        <div className="flex flex-col" data-testid="footer-antonio">
                            <h2>Antonio José Lucena Gutierrez</h2>
                            <div className="flex space-x-4 mt-2 justify-center">
                                <a
                                    data-testid="antonio-linkedin"
                                    href="https://www.linkedin.com/in/antoniojose-lucena-gutierrez"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-500 transition"
                                >
                                    <FaLinkedin size={24} />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col" data-testid="footer-carlos">
                            <h2>Carlos Perales Gonzales</h2>
                            <div className="flex space-x-4 mt-2 justify-center">
                                <a
                                    data-testid="carlos-linkedin"
                                    href="https://www.linkedin.com/in/carlos-perales-cperales/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-500 transition"
                                >
                                    <FaLinkedin size={24} />
                                </a>
                                <a
                                    data-testid="carlos-github"
                                    href="https://github.com/cperales"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-gray-500 transition"
                                >
                                    <FaGithub size={24} />
                                </a>
                                <a
                                    data-testid="carlos-portfolio"
                                    href="https://cperales.github.io"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-400 hover:text-green-500 transition"
                                    title="Portfolio"
                                >
                                    <FaGlobe size={24} />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col" data-testid="footer-josemaria">
                            <h2>José María Romero Ruiz</h2>
                            <div className="flex space-x-4 mt-2 justify-center">
                                <a
                                    data-testid="josemaria-linkedin"
                                    href="https://www.linkedin.com/in/jomaroru/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-500 transition"
                                >
                                    <FaLinkedin size={24} />
                                </a>
                                <a
                                    data-testid="josemaria-github"
                                    href="https://github.com/jomaroru7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-gray-500 transition"
                                >
                                    <FaGithub size={24} />
                                </a>
                                <a
                                    data-testid="josemaria-portfolio"
                                    href="https://jomaroru.es"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-400 hover:text-green-500 transition"
                                    title="Portfolio"
                                >
                                    <FaGlobe size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <Contact />
            </div>
        </footer>
    );
};

export default Footer;