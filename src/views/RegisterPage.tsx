import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { AppDispatch } from "../store";
import { setCompanyData } from "../store/slices/companySlice";
import CompanyForm from "../components/company-form/CompanyForm";

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <CompanyForm
      title="Registro de empresa"
      submitLabel="Registrar empresa"
      onSubmit={({ name, location, budget, cpvs }) => {
        dispatch(setCompanyData({ name, location, budget, cpvs }));
        toast.success("Empresa registrada con éxito.");
        setTimeout(() => navigate("/"), 100);
      }}
    />
  );
};

export default RegisterPage;