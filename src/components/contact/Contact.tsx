import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
    const email = "info@licico.es"

    const notify = () =>
        toast("Email copiado", {
            style: {
                backgroundColor: "#000000",
                color: "#FFFFFF",
            },
        });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body = (event.currentTarget.elements.namedItem("body") as HTMLTextAreaElement).value;
        const subject = "Contacto con el equipo del buscador de licitaciones";
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        notify();
    };

    return (
        <div className="flex flex-col justify-between mb-5 bg-secondary rounded-4xl w-full" data-testid="contact">
            <h1 className="text-lg font-semibold mb-4">Contacto</h1>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 flex-wrap self-center items-center">
                    <p className="text-lg font-medium">Email:</p>
                    <span data-testid="contact-email">{email}</span>
                    <button
                        onClick={handleCopyEmail}
                        className=" p-1 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 text-center w-max hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] hover:scale-105"
                        data-testid="contact-copy-btn"
                        aria-label="Copiar email"
                    >
                        <FaRegCopy size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" data-testid="contact-form">
                    <label htmlFor="body" className="text-lg font-medium">Mensaje:</label>
                    <textarea
                        id="body"
                        name="body"
                        rows={2}
                        className="p-2 border rounded-md resize-none bg-white text-black"
                        placeholder="Escriba su mensaje aquí"
                        required
                        data-testid="contact-message"
                    ></textarea>
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 text-center w-max hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] hover:scale-105"
                        data-testid="contact-send-btn"
                    >
                        Enviar Email
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;