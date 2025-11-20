'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type GuestGuardProps = {
  children: React.ReactNode;
};

const GuestGuard = ({ children }: GuestGuardProps) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  return <>{children}</>;
};

export default GuestGuard;