'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, authStatus } = useAuthenticator((context) => [context.user, context.authStatus]);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Esperar a que Amplify termine de verificar la autenticación
    if (authStatus === 'configuring') {
      setIsChecking(true);
      return;
    }

    setIsChecking(false);

    // Solo redirigir si está confirmado que no hay usuario
    if (authStatus === 'unauthenticated') {
      router.replace('/login');
    }
  }, [user, authStatus, router]);

  // Mostrar loading mientras se verifica la autenticación
  if (isChecking || authStatus === 'configuring') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (ya se redirigió)
  if (!user || authStatus === 'unauthenticated') {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;