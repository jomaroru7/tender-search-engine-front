'use client';

import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

type CompanyGuardProps = {
  children: React.ReactNode;
};

const CompanyGuard = ({ children }: CompanyGuardProps) => {
  const company = useSelector((state: RootState) => state.company);
  const router = useRouter();
  const pathname = usePathname();

  const isRegistered = !!company?.name && !!company?.location && !!company?.budget && !!company?.description;

  useEffect(() => {
    if (!isRegistered && pathname !== "/register") {
      router.replace("/register");
    }

    if (isRegistered && pathname === "/register") {
      router.replace("/");
    }
  }, [isRegistered, pathname, router]);

  if (!isRegistered && pathname !== "/register") {
    return null;
  }

  if (isRegistered && pathname === "/register") {
    return null;
  }

  return <>{children}</>;
};

export default CompanyGuard;