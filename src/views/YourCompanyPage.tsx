import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import type { RootState, AppDispatch } from "../store";
import { setCompanyData } from "../store/slices/companySlice";
import CompanyForm from "../components/company-form/CompanyForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const YourCompanyPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const company = useSelector((state: RootState) => state.company);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    dispatch(setCompanyData({ name: "", location: "", budget: 0, description: "" }));
    localStorage.removeItem("companyData");
    toast.success("Datos de la empresa eliminados. Serás redirigido a la página de registro.");
    setTimeout(() => {
      navigate("/register");
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto mt-16">
      <CompanyForm
        title="Editar datos de empresa"
        submitLabel="Guardar cambios"
        initialName={company.name}
        initialLocation={company.location}
        initialBudget={company.budget}
        initialDescription={company.description}
        onSubmit={({ name, location, budget, description }) => {
          dispatch(setCompanyData({ name, location, budget, description }));
          toast.success("Datos de empresa actualizados.");
        }}
      />
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition"
      >
        Borrar datos de empresa
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4 text-slate-800">¿Estás seguro?</h3>
            <p className="mb-6 text-slate-700">Esta acción eliminará todos los datos de la empresa. ¿Deseas continuar?</p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 bg-slate-200 text-slate-800 py-2 rounded-lg font-semibold hover:bg-slate-300 transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  handleDelete();
                }}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition"
              >
                Sí, borrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourCompanyPage;