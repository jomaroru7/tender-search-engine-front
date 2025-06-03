import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import type { AppDispatch } from "../store";
import { setCompanyData } from "../store/slices/companySlice";
import CompanyForm from "../components/company-form/CompanyForm";


const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <CompanyForm
        title="Registro de empresa"
        submitLabel="Registrar empresa"
        onSubmit={async ({ name, location, budget, description }) => {
          toast.success("Empresa registrada con éxito.");
          setTimeout(() => {
            dispatch(setCompanyData({ name, location, budget, description }));
          }, 1000);

        }}
      />
    </>
  );
};

export default RegisterPage;