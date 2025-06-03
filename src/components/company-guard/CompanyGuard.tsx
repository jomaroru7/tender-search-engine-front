import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Navigate, useLocation } from "react-router-dom";

type CompanyGuardProps = {
  children: React.ReactNode;
};

const CompanyGuard = ({ children }: CompanyGuardProps) => {
  const company = useSelector((state: RootState) => state.company);
  const location = useLocation();

  const isRegistered = !!company?.name && !!company?.location && !!company?.budget && !!company?.description;

  if (!isRegistered && location.pathname !== "/register") {
    return <Navigate to="/register" replace />;
  }

  if (isRegistered && location.pathname === "/register") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default CompanyGuard;