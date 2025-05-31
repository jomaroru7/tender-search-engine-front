import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import type { RootState, AppDispatch } from "../store";
import { setCompanyData } from "../store/slices/companySlice";
import CompanyForm from "../components/company-form/CompanyForm";

const YourCompanyPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const company = useSelector((state: RootState) => state.company);

  return (
    <CompanyForm
      title="Editar datos de empresa"
      submitLabel="Guardar cambios"
      initialName={company.name}
      initialLocation={company.location}
      initialBudget={company.budget}
      initialCpvs={company.cpvs}
      onSubmit={({ name, location, budget, cpvs }) => {
        dispatch(setCompanyData({ name, location, budget, cpvs }));
        toast.success("Datos de empresa actualizados.");
      }}
    />
  );
};

export default YourCompanyPage;