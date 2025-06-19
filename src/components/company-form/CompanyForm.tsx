import { useState } from "react";
import { setUser } from "../../services/users/usersService";

type CompanyFormProps = {
  initialEmail?: string;
  initialName?: string;
  initialLocation?: string;
  initialBudget?: number | string;
  initialDescription?: string;
  initialAllowRegister?: boolean;
  title: string;
  submitLabel: string;
  onSubmit: (data: {email:string, name: string; location: string; budget: number; description: string, allowRegister:boolean }) => void;
};

const CompanyForm = ({
  initialEmail = "",
  initialName = "",
  initialLocation = "",
  initialBudget = "",
  initialDescription = "",
  initialAllowRegister = false,
  title,
  submitLabel,
  onSubmit,
}: CompanyFormProps) => {
  const [name, setName] = useState(initialName);
  const [location, setLocation] = useState(initialLocation);
  const [budget, setBudget] = useState(initialBudget.toString());
  const [description, setDescription] = useState(initialDescription);
  const [email, setEmail] = useState(initialEmail);
  const [allowRegister, setAllowRegister] = useState(initialAllowRegister);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError("Introduce un email válido.");
      return;
    }

    if (!allowRegister) {
      setError("Debes permitir el registro del email para continuar.");
      return;
    }

    try {
      await setUser({ email, companyName: name, companyLocation: location, companyBudget: budget, companyDescription: description });
    } catch {
      setError("Error al registrar el email.");
      return;
    }

    onSubmit({
      email,
      name,
      location,
      budget: Number(budget),
      description,
      allowRegister
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white/80 backdrop-blur shadow-lg rounded-2xl px-8 py-10 border border-slate-200"
    >
      <h2 className="text-3xl font-bold mb-8 text-slate-800 text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold text-slate-700">Nombre de la empresa</label>
          <input
            data-testid="input-name"
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="location" className="font-semibold text-slate-700">Localización</label>
          <input
            data-testid="input-location"
            id="location"
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="budget" className="font-semibold text-slate-700">Facturación anual (€)</label>
          <input
            data-testid="input-budget"
            id="budget"
            type="number"
            value={budget}
            onChange={e => setBudget(e.target.value)}
            required
            min={0}
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="email" className="font-semibold text-slate-700">Email</label>
          <input
            data-testid="input-email"
            id="email"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
          />
        </div>
        <div className="flex items-center md:col-span-2">
          <input
            data-testid="checkbox-allowRegister"
            id="allowRegister"
            type="checkbox"
            checked={allowRegister}
            onChange={e => setAllowRegister(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="allowRegister" className="text-slate-700">
            Permite el registro de su email en nuestra base de datos. Este dato solo se utilizará para comunicaciones sobre nuestra aplicación.
          </label>
        </div>
        <div className="flex flex-col lg:col-span-2">
          <label htmlFor="description" className="block font-semibold text-slate-700 mb-2">Descripción de la actividad de la empresa</label>
          <textarea
            data-testid="textarea-description"
            id="description"
            onChange={e => setDescription(e.target.value)}
            value={description}
            placeholder="Escriba la descripción de su empresa aquí, esta será utilizada para buscar las licitaciones mas adecuadas para usted"
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 transition w-full min-h-[80px]"
            required
          />
        </div>
      </div>
      {error && <div className="mt-4 text-red-600">{error}</div>}
      <button
        type="submit"
        className="mt-8 w-full bg-slate-800 text-white py-3 rounded-lg font-bold text-lg hover:bg-slate-700 transition"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default CompanyForm;